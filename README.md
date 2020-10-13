# sns-webserver
NodeJS webserver to support SNS http subscriptions

- Create t2.micro Amazon Linux EC2 instance in us-east-1 with Role-EC2-AdministratorAccess, a public IP and port 80 open (Name=**sns-demo**)
- Connect to **sns-demo** with Session Manager and start the webserver as follows
```
sudo curl --silent --location https://rpm.nodesource.com/setup_14.x | sudo bash -
sudo yum -y install nodejs git
git clone https://github.com/amcginlay/sns-webserver.git ~/sns-webserver
cd ~/sns-webserver
npm update
sudo PORT=80 npm start
```
- Now the webserver is running, duplicate the browser tab containing the **sns-demo** session
- Create the topic
```
export AWS_DEFAULT_REGION=us-east-1
topic=$(aws sns create-topic \
  --name sns-demo-topic \
  --output text \
)
```
- Subscribe the webserver to the SNS topic using its public IP address
```
subscription=$(aws sns subscribe \
  --topic-arn ${topic} \
  --protocol http \
  --return-subscription-arn \
  --notification-endpoint http://$(curl --silent  http://169.254.169.254/latest/meta-data/public-ipv4/) \
  --output text \
)
```
- Look in the first browser tab. The webserver will have output the **SNS Subscription Token**. You'll need it for the next command
- Confirm the subscription
```
aws sns confirm-subscription --topic-arn ${topic} --token <SNS_SUBSCRIPTION_TOKEN>
```
- Create a publication event
```
aws sns publish --topic-arn ${topic} --message "this is a test"
```
- The webserver output will display the published message
- If you repeat the `subscribe` and `confirm-subscription` steps for another webserver then both will be notified of any publications
- You can remove a subscription as follows
```
aws sns unsubscribe
```
