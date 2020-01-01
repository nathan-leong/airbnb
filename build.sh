instance_id=$1

aws ssm send-command \
    --document-name "AWS-RunShellScript" \
    --parameters commands=["sudo docker stop airbnbcontainer && sudo docker rm airbnbcontainer"] \
    --instance-ids $instance_id \
    --comment "stop containers" \
    --output text

# sleep 15;
# aws ssm send-command \
#     --document-name "AWS-RunShellScript" \
#     --parameters commands=["cd /home/ec2-user/airbnb && git pull origin master"] \
#     --instance-ids "i-02802fe96404ca8c3" \
#     --comment "pull git repo" \
#     --output text

sleep 15;
aws ssm send-command \
    --document-name "AWS-RunShellScript" \
    --parameters commands=["cd /home/ec2-user/airbnb && bash remotescript.sh"] \
    --instance-ids $instance_id \
    --comment "build and deploy docker" \
    --output text