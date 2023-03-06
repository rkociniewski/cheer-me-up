import { RemovalPolicy, Stack } from 'aws-cdk-lib';
import { Table } from '@serverless-stack/resources';

export const SupportTable = (stack: Stack) =>
  new Table(stack, 'Support', {
    fields: {
      entryId: 'string',
      userId: 'string',
      title: 'string',
      text: 'string',
      createdDate: 'number',
      pointsValue: 'number',
    },
    primaryIndex: {
      partitionKey: 'entryId',
      sortKey: 'userId',
    },
    cdk: {
      table: {
        pointInTimeRecovery: true,
        removalPolicy: RemovalPolicy.DESTROY,
      },
    },
  });
