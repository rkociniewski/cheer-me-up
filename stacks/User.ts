import { StackContext, Api } from '@serverless-stack/resources';
import { SupportTable } from './elements/user/SupportTable';

export function UserStack({ stack }: StackContext) {
  const supportTable = SupportTable(stack);

  const api = new Api(stack, 'UserApi', {
    defaults: {
      authorizer: 'jwt',
      function: {
        environment: {
          USER_SUPPORT_TABLE: supportTable.tableName,
        },
      },
    },
    authorizers: {
      jwt: {
        type: 'user_pool',
        userPool: {
          id: process.env.COGNITO_USER_POOL_ID as string,
          clientIds: [process.env.COGNITO_CLIENT_ID as string],
        },
      },
    },
  });

  stack.addOutputs({
    API: api.url,
  });

  return api;
}
