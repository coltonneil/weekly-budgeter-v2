import {Stack} from "aws-cdk-lib/core";
import {Construct} from "constructs";
import {UserPool, VerificationEmailStyle} from "aws-cdk-lib/aws-cognito";

interface CognitoStackProperties {
  stage: string;
}
export class CognitoStack extends Stack {
    userPoolArn: string;


    

    constructor(scope: Construct, id: string, properties: CognitoStackProperties) {
        super(scope, id);

        // Create a new Cognito User Pool
        const userPool = new UserPool(this, 'WeeklyBudgeterUserPoolV001', {
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

          this.userPoolArn = userPool.userPoolArn;
    }

}