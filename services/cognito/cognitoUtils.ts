import {
  AuthenticationDetails,
  CognitoUserPool,
  CognitoUser,
  ICognitoUserAttributeData,
  CognitoUserAttribute,
} from 'amazon-cognito-identity-js';
import { PoolData } from './CognitoSchema';

export const getAuthenticationDetails = (username: string, password: string): AuthenticationDetails =>
  new AuthenticationDetails({
    Username: username,
    Password: password,
  });

export const getCognitoUser = (userPool: CognitoUserPool, username: string): CognitoUser => {
  const userData = {
    Username: username,
    Pool: userPool,
  };
  const cognitoUser = new CognitoUser(userData);
  return cognitoUser;
};

export const getUserPool = (poolData: PoolData): CognitoUserPool => new CognitoUserPool(poolData);

export const getUserAttributes = (attributes: ICognitoUserAttributeData[]) =>
  attributes.map((attribute) => new CognitoUserAttribute(attribute));
