import { aws_dynamodb as dynamodb, aws_lambda_nodejs, Duration, RemovalPolicy, Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';


export class ScraperStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);
    //DynamoDb
    const table = new dynamodb.Table(this, 'NewsTable', {
      partitionKey: { name: 'id', type: dynamodb.AttributeType.STRING },
      tableName: 'AWSNews',
      billingMode: dynamodb.BillingMode.PAY_PER_REQUEST,
      removalPolicy: RemovalPolicy.DESTROY
    });


    //Lambda
      const scraper = new aws_lambda_nodejs.NodejsFunction(this, 'Scraper', {
        entry: './src/scraper.ts',
  
        timeout: Duration.seconds(300),
        environment: {
          TABLE_NAME: table.tableName,
          NEWS_URL: 'https://aws.amazon.com/api/dirs/items/search?item.directoryId=whats-new&sort_by=item.additionalFields.postDateTime&sort_order=desc&size=25&item.locale=en_US&page=0'
        },
       
      });
    // const newLambda = new lambda.Function(this, 'newLambda',{
    //   runtime: lambda.Runtime.PYTHON_3_8,
    //   code: lambda.Code.fromAsset('functions'),
    //   handler: 'index.handler',
    // });
    // const lambdaTarget = new targets.LambdaFunction(newLambda)
    // const eventRule = new events.Rule(this, 'scheduleRule', {
    //   schedule: events.Schedule.cron({ minute: '0', hour: '1' }),
    //   targets: [lambdaTarget]
    // });



    //table.grantReadData(lambda.grantPrincipal)

    //Target
  }
}
