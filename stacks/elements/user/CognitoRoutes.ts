import { ApiRouteProps } from '@serverless-stack/resources';

export function CognitoRoutes(): Record<string, ApiRouteProps<'jwt'>> {
  return {
    'POST /session/token': {
      function: {
        handler: 'auth/cognito/lambda/authorize.handler',
      },
    },
    'POST /users': {
      function: {
        handler: 'auth/cognito/lambda/register.handler',
      },
    },
    'PUT /users': {
      function: {
        handler: 'auth/cognito/lambda/update.handler',
      },
    },
    'DELETE /users': {
      function: {
        handler: 'auth/cognito/lambda/delete.handler',
      },
    },
  };
}
