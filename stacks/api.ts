import {ApiDefinition, SpecRestApi} from "aws-cdk-lib/aws-apigateway";
import { ServicePrincipal } from "aws-cdk-lib/aws-iam";
import { Function } from "aws-cdk-lib/aws-lambda";
import {Stack} from "aws-cdk-lib/core";
import {Construct} from "constructs";
import { readFileSync } from "fs"

interface ApiStackProperties {
  lambdaHandlers: Map<string, Function>;
  region: string;
  userPoolArn: string;
}
export class ApiStack extends Stack {

    static API_GATEWAY_CUSTOM_OPEN_API_KEY: string = 'x-amazon-apigateway-integration';
    static OPERATION_NAME_KEY: string = "operationId";

    

    constructor(scope: Construct, id: string, properties: ApiStackProperties) {
        super(scope, id);
        
        const api = new SpecRestApi(this, "WeeklyBudgeterApiV001", {
            apiDefinition: ApiDefinition.fromInline(ApiStack.getSwaggerDefinition(properties.lambdaHandlers, properties.region, properties.userPoolArn))
        })

        const servicePrincipal = new ServicePrincipal('apigateway.amazonaws.com', {
          conditions: {
            'ArnLike': {
              'aws:SourceArn': api.arnForExecuteApi,
            },
          },
        });

        properties.lambdaHandlers.forEach(lambda => lambda.addPermission('api-invoke', {
          principal: servicePrincipal,
        }));

        

        // const authorizer = new CognitoUserPoolsAuthorizer(this, "cognito-authorizer", {
        //         cognitoUserPools: [userPool]
        // });
    }

    static getSwaggerDefinition(lambdaHandlers: Map<string, Function>, region: string, userPoolArn: string): Record<string, unknown> {
      const openApiModel = JSON.parse(readFileSync('./model/weekly-budgeter-v2.json', {encoding: "utf-8"}))

      Object.keys(openApiModel.paths).forEach(route => {
        Object.keys(openApiModel.paths[route])
          .filter(verb => 'options' !== verb)
          .forEach(verb => {
            const lambdaHandler: Function = lambdaHandlers.get(openApiModel.paths[route][verb][ApiStack.OPERATION_NAME_KEY])!;

            openApiModel.paths[route][verb][ApiStack.API_GATEWAY_CUSTOM_OPEN_API_KEY] = {
              ...openApiModel.paths[route][verb][ApiStack.API_GATEWAY_CUSTOM_OPEN_API_KEY],
              httpMethod: "POST",
              timeoutInMillis: 20_000,
              uri: `arn:aws:apigateway:${region}:lambda:path/2015-03-31/functions/${lambdaHandler.functionArn}/invocations`,
              // credentials: lambdaHandler,
            }
          })
      })

      openApiModel["components"]["securitySchemes"]["cognito-authorizer"]["x-amazon-apigateway-authorizer"]["providerARNs"] = [
        userPoolArn,
      ]




      return openApiModel;
    }
}