import {APIGatewayProxyEvent} from "aws-lambda";

export async function handler(event: APIGatewayProxyEvent){
    return {
        statusCode: 200,
        body: JSON.stringify({
            "expenseDescription": "The new Nickleback Album",
            "expenseId": "e-1234567890123456"
        }),
    };
}