instance_id=$1

aws ssm send-command \
    --document-name "AWS-RunShellScript" \
    --parameters commands=["cd /home/ec2-user/airbnb && bash remotescript.sh"] \
    --instance-ids $instance_id \
    --comment "build and deploy docker" \
    --output text