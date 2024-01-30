import { APIGatewayProxyEvent } from "aws-lambda";

export async function handler(event: APIGatewayProxyEvent){
    return {
        statusCode: 200,
        body: JSON.stringify({
            "expense": {
                "expenseId": "e-1234567890123456",
                "expenseDate": 0,
                "expenseDescription": "Beer",
                "exenseAmoundCents": 500,
                "expenseState": "PAID",
            },
        }),
    };
}