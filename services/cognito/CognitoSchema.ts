import { ICognitoUserAttributeData } from 'amazon-cognito-identity-js';

export type PoolData = {
  UserPoolId: string;
  ClientId: string;
};
export type UserDataRequest = {
  username: string;
  password: string;
};

export type UserDataAttributesRequest = UserDataRequest & {
  attributes: ICognitoUserAttributeData[];
};

export type Response = {
  message: string;
};

export type ResponseToken = {
  token: string;
};
