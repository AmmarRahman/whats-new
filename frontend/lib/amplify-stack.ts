import * as amplify from '@aws-cdk/aws-amplify-alpha';
import { Fn, SecretValue, Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';


// TODO: figure out a smarter way to get this information

export class AmplifyStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);
    const owner = "AmmarRahman";
    const repository = "whats-new";
    const amplifyApp = new amplify.App(this, 'AWSNews', {
      sourceCodeProvider: new amplify.GitHubSourceCodeProvider({
        owner,
        repository,
        oauthToken: SecretValue.secretsManager('my-github-token'),
      }),
        
     });

     amplifyApp.addEnvironment("REACT_APP_API_URL",  Fn.importValue("GraphQLApiURL"))
  }
}
