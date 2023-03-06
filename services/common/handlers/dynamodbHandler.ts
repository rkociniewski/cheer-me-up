import { DynamoDB } from 'aws-sdk';
import { DocumentClient } from 'aws-sdk/clients/dynamodb';

const client = new DynamoDB.DocumentClient();

export default {
  get: (params: DocumentClient.GetItemInput) => client.get(params).promise(),
  put: (params: DocumentClient.PutItemInput) => client.put(params).promise(),
  scan: (params: DocumentClient.ScanInput) => client.scan(params).promise(),
  query: (params: DocumentClient.QueryInput) => client.query(params).promise(),
  update: (params: DocumentClient.UpdateItemInput) => client.update(params).promise(),
  delete: (params: DocumentClient.DeleteItemInput) => client.delete(params).promise(),
};

export const nowEpoch = () => Math.floor(new Date().getTime() / 1000);
