instance_id=$1

aws ssm send-command \
    --document-name "AWS-RunShellScript" \
    --parameters commands=["sudo docker stop airbnbcontainer && sudo docker rm airbnbcontainer"] \
    --instance-ids $instance_id \
    --comment "stop containers" \
    --output text

sleep 5;
aws ssm send-command \
    --document-name "AWS-RunShellScript" \
    --parameters commands=["cd airbnb && git pull origin master"] \
    --instance-ids $instance_id \
    --comment "pull git repo" \
    --output text

sleep 5;
aws ssm send-command \
    --document-name "AWS-RunShellScript" \
    --parameters commands=["cd airbnb && sudo docker build --rm -t airbnb . && sudo docker run --name airbnbcontainer -p 80:80 airbnb"] \
    --instance-ids $instance_id \
    --comment "build and deploy docker" \
    --output text