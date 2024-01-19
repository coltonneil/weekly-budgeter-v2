import {ApiDefinition, AuthorizationType, CognitoUserPoolsAuthorizer, HttpIntegration, SpecRestApi} from "aws-cdk-lib/aws-apigateway";
import {UserPool, VerificationEmailStyle} from "aws-cdk-lib/aws-cognito";
import {Stack} from "aws-cdk-lib/core";
import {Construct} from "constructs";

export class ApiStack extends Stack {

    constructor(scope: Construct, id: string) {
        super(scope, id);
        
        const api = new SpecRestApi(this, "test", {
            apiDefinition: ApiDefinition.fromAsset('./model/weekly-budgeter-v2.json')
        })
    
    
        // Create a new Cognito User Pool
        const userPool = new UserPool(this, 'MyUserPool', {
            selfSignUpEnabled: true,
            userVerification: {
              emailSubject: 'Verify your email for our awesome app!',
              emailBody: 'Hello {username}, Thanks for signing up to our awesome app! Your verification code is {####}',
              emailStyle: VerificationEmailStyle.CODE,
              smsMessage: 'Hello {username}, Thanks for signing up to our awesome app! Your verification code is {####}',
            },
            signInAliases: {
              email: true,
            },
          });
    
        const authorizer = new CognitoUserPoolsAuthorizer(this, "cognito-authorizer", {
                cognitoUserPools: [userPool]
        });
    
        api.root.addMethod("ANY", new HttpIntegration('http://amazon.com'), {
            authorizer,
            authorizationType: AuthorizationType.COGNITO
          })
    }
}