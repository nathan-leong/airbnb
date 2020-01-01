instance_id=$1

aws ssm send-command \
    --document-name "AWS-RunShellScript" \
    --parameters commands=["sudo docker stop $(docker ps -aq) && docker rm $(docker ps -aq)"] \
    --instance-ids $instance_id \
    --comment "stop containers" \
    --output text

aws ssm send-command \
    --document-name "AWS-RunShellScript" \
    --parameters commands=["git pull origin master"] \
    --instance-ids $instance_id \
    --comment "pull git repo" \
    --output text

aws ssm send-command \
    --document-name "AWS-RunShellScript" \
    --parameters commands=["sudo docker build -t airbnb . && sudo docker run -p 80:80 airbnb"] \
    --instance-ids $instance_id \
    --comment "build and deploy docker" \
    --output text