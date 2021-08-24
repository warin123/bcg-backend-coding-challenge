import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";

export function lambdaApiGatewayResponse<T extends object>(
    statusCode: number,
    result: T
): APIGatewayProxyResult {
    return {
        statusCode: statusCode,
        body: JSON.stringify(result),
    };
}

export function lambdaApiGatewayEvent(body: object, httpMethod: string): APIGatewayProxyEvent {
    return {
        body: JSON.stringify(body),
        headers: {},
        multiValueHeaders: {},
        httpMethod: httpMethod,
        isBase64Encoded: false,
        path: "",
        pathParameters: null,
        queryStringParameters: null,
        multiValueQueryStringParameters: null,
        stageVariables: null,
        requestContext: {
            path: "",
            requestTime: undefined,
            requestTimeEpoch: 0,
            resourceId: "",
            resourcePath: "",
            accountId: "",
            apiId: "",
            domainName: "",
            domainPrefix: "",
            requestId: "",
            routeKey: "",
            stage: "",
            protocol: "",
            httpMethod: "",
            identity: {
                accessKey: null,
                accountId: null,
                apiKey: null,
                apiKeyId: null,
                caller: null,
                clientCert: null,
                cognitoAuthenticationProvider: null,
                cognitoAuthenticationType: null,
                cognitoIdentityId: null,
                cognitoIdentityPoolId: null,
                principalOrgId: null,
                sourceIp: null,
                user: null,
                userAgent: null,
                userArn: null,
            },
            authorizer: null,
        },
        resource: "",
    };
}
