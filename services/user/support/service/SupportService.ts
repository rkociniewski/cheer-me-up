import dynamodbHandler, { nowEpoch } from 'services/common/handlers/dynamodbHandler';
import { v4 } from 'uuid';
import { Support } from '../SupportSchema';
import { convertToSupport } from '../utils/SupportConverter';

const TableName = process.env.USER_SUPPORT_TABLE as string;

export const create = async (userId: string, title: string, text: string) => {
  const support: Support = {
    userId,
    entryId: v4(),
    title,
    text,
    createdDate: nowEpoch(),
  };

  const params = {
    TableName,
    Item: support,
  };

  await dynamodbHandler.put(params);
  return support;
};

export const get = async (userId: string, entryId: String) => {
  const params = {
    TableName,
    Key: {
      primaryKey: entryId,
      sortKey: userId,
    },
  };

  const result = await dynamodbHandler.get(params);
  return result.Item ? convertToSupport(result.Item) : undefined;
};

export const list = async () => {
  const params = {
    TableName,
  };

  return (await dynamodbHandler.scan(params)).Items?.map(convertToSupport) ?? [];
};
