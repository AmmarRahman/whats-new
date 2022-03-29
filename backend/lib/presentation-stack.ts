import * as appsync from '@aws-cdk/aws-appsync-alpha';
import { aws_dynamodb as dynamodb, CfnOutput, Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';

//TODO: This needs a lot of work. 
// Hgit aving a scan for list items is not sustainable once AWS start making thousands of announcements per day.

export class PresentationStack extends Stack {

    constructor(scope: Construct, id: string, dbTable: dynamodb.Table, props?: StackProps) {
        super(scope, id, props);

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


        const dataSource = api.addDynamoDbDataSource("NewsDataSource", dbTable)


        //todo: review the getAWS resolver
        // dataSource.createResolver({
        //     typeName: 'Query',
        //     fieldName: 'getAWSNews',
        //     requestMappingTemplate: appsync.MappingTemplate.dynamoDbScanTable(),
        //     //autogenerated response using $ctx.result is not working 
        //     // responseMappingTemplate: appsync.MappingTemplate.dynamoDbResultList(),
        //     responseMappingTemplate: appsync.MappingTemplate.fromString("$util.toJson($context.result)")
        // });

        //todo: adjust the request Mapping Template
        dataSource.createResolver({
            typeName: 'Query',
            fieldName: 'listAWSNews',
            requestMappingTemplate: appsync.MappingTemplate.fromString(`{
        "version": "2018-05-29",
        "operation": "Scan",
        "filter": #if($context.args.filter) $util.transform.toDynamoDBFilterExpression($context.args.filter) #else null #end,
        "limit": $util.defaultIfNull($context.args.limit, 20),
        "nextToken": $util.toJson($util.defaultIfNullOrEmpty($context.args.nextToken, null)),
      }`),
            //autogenerated response using $ctx is not working 
            // responseMappingTemplate: appsync.MappingTemplate.dynamoDbResultList(),
            responseMappingTemplate: appsync.MappingTemplate.fromString("$util.toJson($context.result)")
        });
        new CfnOutput(this, 'GraphQLApiId', {
            value: api.apiId,
            exportName: 'GraphQLApiId'
        });

        new CfnOutput(this, 'GraphQLApiURL', {
            value: api.graphqlUrl,
            exportName: 'GraphQLApiURL'
        });

    }



}