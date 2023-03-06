import { Api, Cognito, StackContext } from '@serverless-stack/resources';
import { UserPool, UserPoolClient } from 'aws-cdk-lib/aws-cognito';
import { CognitoRoutes } from './elements/user/CognitoRoutes';

export interface UserConstruct {
  api: Api;
  auth: Cognito;
}

export const AuthStack = ({ stack }: StackContext): UserConstruct => {
  const api = new Api(stack, 'AuthApi');

  const auth: Cognito = new Cognito(stack, 'Auth', {
    cdk: {
      userPool: UserPool.fromUserPoolId(stack, 'IUserPool', 'pool-id'),
      userPoolClient: UserPoolClient.fromUserPoolClientId(stack, 'IUserPoolClient', 'pool-client-id'),
    },
  });

  stack.addDefaultFunctionEnv({
    COGNITO_USER_POOL_ID: process.env.COGNITO_USER_POOL_ID || '',
    COGNITO_CLIENT_ID: process.env.COGNITO_CLIENT_ID || '',
  });

  api.addRoutes(stack, CognitoRoutes());

  stack.addOutputs({
    AuthApiEndpoint: api.url,
  });

  return {
    api,
    auth,
  };
};
