import {
  AuthenticationDetails,
  CognitoUserPool,
  CognitoUser,
  ICognitoUserAttributeData,
  CognitoUserAttribute,
} from 'amazon-cognito-identity-js';
import { getAuthenticationDetails, getCognitoUser, getUserAttributes, getUserPool } from './cognitoUtils';
import { PoolData } from './CognitoSchema';

describe('The method ', () => {
  test('getAuthenticationDetails should return AuthenticationDetails object with details', () => {
    const authenticationDetails: AuthenticationDetails = getAuthenticationDetails(
      'john.doe@testmail.com',
      'stronkPassword',
    );
    expect(authenticationDetails).toMatchObject({
      authParameters: {},
      clientMetadata: {},
      password: 'stronkPassword',
      username: 'john.doe@testmail.com',
      validationData: {},
    });
  });

  test('getCognitoUser should return CognitoUser object with not empty uer pool and username', () => {
    const userPool = new CognitoUserPool({
      UserPoolId: 'COGNITO_USER_POOL_ID',
      ClientId: 'COGNITO_CLIENT_ID',
    });

    const authenticationDetails: CognitoUser = getCognitoUser(userPool, 'testName');

    expect(authenticationDetails.getUsername()).equals('testName');
  });

  test('getUserPool should return CognitoUserPool with PoolData', () => {
    const poolData: PoolData = {
      UserPoolId: 'COGNITO_USER_POOL_ID',
      ClientId: 'COGNITO_CLIENT_ID',
    };

    const userPool = getUserPool(poolData);

    expect(userPool.getUserPoolId()).toEqual('COGNITO_USER_POOL_ID');
    expect(userPool.getClientId()).toEqual('COGNITO_CLIENT_ID');
    expect(userPool).toBeInstanceOf(CognitoUserPool);
  });

  test('getUserAttributes should return CognitoUserAttribute[] with attributes', () => {
    const userAttributes: ICognitoUserAttributeData[] = [
      {
        Name: 'name',
        Value: 'John Doe',
      },
      {
        Name: 'sub',
        Value: '12345',
      },
    ];

    const attributes = getUserAttributes(userAttributes);

    expect(attributes).toMatchObject([
      { Name: 'name', Value: 'John Doe' },
      { Name: 'sub', Value: '12345' },
    ]);
    expect(attributes[0]).toBeInstanceOf(CognitoUserAttribute);
  });
});
