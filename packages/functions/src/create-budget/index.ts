import { APIGatewayProxyEvent } from "aws-lambda";

export async function handler(event: APIGatewayProxyEvent){
    return {
        statusCode: 200,
        body: JSON.stringify({
            "name": "FooBar",
            "id": "b-abc4567890123456",
        }),
};
}