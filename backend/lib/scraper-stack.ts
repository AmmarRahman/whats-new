import { aws_dynamodb as dynamodb, aws_events, aws_events_targets, aws_lambda_nodejs, Duration, RemovalPolicy, Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';


export class ScraperStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    //DynamoDb
    const table = new dynamodb.Table(this, 'NewsTable', {
      partitionKey: { name: 'pk', type: dynamodb.AttributeType.STRING },
      sortKey: { name: 'sk', type: dynamodb.AttributeType.STRING },
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
        SEARCH_URL: 'https://aws.amazon.com/api/dirs/items/search'
      },

    });

    //Role
    table.grantReadWriteData(scraper.grantPrincipal)


    //Scheudler
    const eventRule = new aws_events.Rule(this, 'ScrapingSchedule', {
      schedule: aws_events.Schedule.rate(Duration.hours(6)),
    });
    eventRule.addTarget(new aws_events_targets.LambdaFunction(scraper))

  }
}
