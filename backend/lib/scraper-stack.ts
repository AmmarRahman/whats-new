import * as appsync from '@aws-cdk/aws-appsync-alpha';
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
   
   
    //appSync

    const api = new appsync.GraphqlApi(this, 'NewsApi', {
      name: 'NewsApi',
      schema: appsync.Schema.fromAsset('./src/whatsNew.graphql'),
      authorizationConfig: {
        defaultAuthorization: {
          authorizationType: appsync.AuthorizationType.IAM,
        },
      }
    });

    const dataSource = api.addDynamoDbDataSource("NewsDataSource", table)
    dataSource.createResolver({
      typeName: 'Query',
      fieldName: 'getAWSNews',
      requestMappingTemplate: appsync.MappingTemplate.dynamoDbScanTable(),
      responseMappingTemplate: appsync.MappingTemplate.dynamoDbResultList(),
    });
    dataSource.createResolver({
      typeName: 'Query',
      fieldName: 'listAWSNews',
      requestMappingTemplate: appsync.MappingTemplate.dynamoDbScanTable(),
      responseMappingTemplate: appsync.MappingTemplate.dynamoDbResultList(),
    });
    
  }



}