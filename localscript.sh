# ensure localscript and pem file in same directory, and script file is in git repo top level
DEFAULT_REPO="https://github.com/nathan-leong/airbnb.git"
GIT_REPO=${1:-$DEFAULT_REPO}

echo "Using repo $GIT_REPO"
if echo $PATH | grep ~/bin; then
    echo "~/bin is already in path"
else
    echo "~/bin not in PATH, adding to path..."
    export PATH=~/bin:$PATH
fi

if hash aws 2>/dev/null; then
    echo "aws cli is installed";
else
        echo >&2 "aws cli not installed.  Installing..."; 

    curl "https://s3.amazonaws.com/aws-cli/awscli-bundle.zip" -o "awscli-bundle.zip"
    unzip awscli-bundle.zip
    ./awscli-bundle/install -b ~/bin/aws
    rm awscli-bundle.zip
    rm -r awscli-bundle
fi

if aws configure get aws_access_key_id 2>/dev/null; then
    echo "aws already configured"
else
    echo "aws not configured. Configuring..."
    aws configure set default.region ap-southeast-2
    aws configure
fi

if  [ -f airbnbKey.pem ]; then
    echo "Key pair found. Using key pair to create instance."
else
    echo "Key pair not found. Creating key pair to create instance."
    aws ec2 create-key-pair --key-name MyKeyPair --query 'KeyMaterial' --output text > MyKeyPair.pem
fi

instance_id=$(aws ec2 run-instances \
    --image-id ami-0dc96254d5535925f \
    --count 1 \
    --instance-type t2.micro \
    --iam-instance-profile Name=adminrole \
    --key-name airbnbKey \
    --output text \
    --query 'Instances[0].InstanceId'
)

echo "Instance_id = $instance_id"
echo "Instance is initializing"

while status=$(aws ec2 describe-instance-status \
    --instance-ids $instance_id \
    --output text \
    --query 'InstanceStatuses[0].SystemStatus.Status'
    );  [ "$status" = "None" ] || [ "$status" = "initializing" ]; 
do
    sleep 10; 
    echo -n '.'
done; 

echo "Instance status is $status"

aws ssm send-command \
    --document-name "AWS-RunShellScript" \
    --parameters commands=["sudo yum install git -y && sudo yum install -y docker"] \
    --instance-ids $instance_id \
    --comment "installing git & docker" \
    --output text

sleep 10;

aws ssm send-command \
    --document-name "AWS-RunShellScript" \
    --parameters commands=["git clone $GIT_REPO"] \
    --instance-ids $instance_id \
    --comment "cloning git repos" \
    --output text

sleep 5;

aws ssm send-command \
    --document-name "AWS-RunShellScript" \
    --parameters commands=["bash /home/ec2-user/airbnb/remotescript.sh"] \
    --instance-ids $instance_id \
    --comment "run remotescript" \
    --output text

ip_address=$(aws ec2 describe-instances \
    --instance-ids $instance_id \
    --output text \
    --query 'Reservations[*].Instances[*].PublicIpAddress' \
    )

ssh_address=$(aws ec2 describe-instances \
    --instance-ids $instance_id \
    --output text \
    --query 'Reservations[*].Instances[0].PublicDnsName' \
    )

echo "From within the instance, after the node packages have been installed you can see the images/ containers being made as it builds the prod container"
echo "Run the command below to ssh into the instance."
echo "ssh -i MyKeyPair.pem ec2-user@$ssh_address"

echo "The website will be deployed to the below url as soon as it has finished building, this may take up to 5 minutes"
echo http://$ip_address:80