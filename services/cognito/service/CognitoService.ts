import { CognitoUserAttribute } from 'amazon-cognito-identity-js';
import { logger } from 'services/common/logger/logger';
import { getUserPool, getAuthenticationDetails, getCognitoUser, getUserAttributes } from '../cognitoUtils';
import { UserDataAttributesRequest, UserDataRequest } from '../CognitoSchema';

const COGNITO_USER_POOL_ID = process.env.COGNITO_USER_POOL_ID!;
const COGNITO_CLIENT_ID = process.env.COGNITO_CLIENT_ID!;

export const authenticateUser = async (userData: UserDataRequest): Promise<string> => {
  const { username, password } = userData;
  const userPool = getUserPool({
    UserPoolId: COGNITO_USER_POOL_ID,
    ClientId: COGNITO_CLIENT_ID,
  });
  const authenticationDetails = getAuthenticationDetails(username, password);

  const cognitoUser = getCognitoUser(userPool, username);
  return new Promise((resolve, reject) => {
    try {
      cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess(result) {
          logger.debug(`Successfully authenticate the user ${username}`);
          resolve(result.getAccessToken().getJwtToken());
        },
        onFailure(error) {
          logger.error(`Cognito authenticate user failure: ${error}`);
          reject();
        },
      });
    } catch (error) {
      logger.error(`Cognito authenticate user failure: ${error}`);
      reject();
    }
  });
};

export const registerUser = async (userData: UserDataRequest): Promise<string> => {
  const { username, password } = userData;
  const userPool = getUserPool({
    UserPoolId: COGNITO_USER_POOL_ID,
    ClientId: COGNITO_CLIENT_ID,
  });
  return new Promise((resolve, reject) => {
    userPool.signUp(username, password, [], [], (error, result) => {
      if (error) {
        logger.error(`Cognito register user failure: ${error}`);
        reject();
      } else {
        logger.debug(`User ${result?.user.getUsername()} has been registered!`);
        resolve(`User ${result?.user.getUsername()} has been registered!`);
      }
    });
  });
};

export const updateUser = async (userData: UserDataAttributesRequest): Promise<string> => {
  const { username, password, attributes } = userData;
  const userPool = getUserPool({
    UserPoolId: COGNITO_USER_POOL_ID,
    ClientId: COGNITO_CLIENT_ID,
  });

  const cognitoUser = getCognitoUser(userPool, username);

  const userAttributes: CognitoUserAttribute[] = getUserAttributes(attributes);
  const authenticationDetails = getAuthenticationDetails(username, password);

  return new Promise((resolve, reject) => {
    cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess() {
        cognitoUser.updateAttributes(userAttributes, (error, result) => {
          if (error) {
            logger.error(`Cognito update user data failure: ${error}`);
            reject();
          } else {
            resolve(`User data has been updated! ${result}`);
          }
        });
      },
      onFailure(error: any) {
        logger.error(`Cognito update user data failure: ${error}`);
        reject();
      },
    });
  });
};

export const deleteUser = async (userData: UserDataRequest): Promise<string> => {
  const { username, password } = userData;
  const userPool = getUserPool({
    UserPoolId: COGNITO_USER_POOL_ID,
    ClientId: COGNITO_CLIENT_ID,
  });
  const cognitoUser = getCognitoUser(userPool, username);

  const authenticationDetails = getAuthenticationDetails(username, password);
  return new Promise((resolve, reject) => {
    cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess() {
        cognitoUser.deleteUser((error, result) => {
          if (error) {
            logger.error(`Cognito delete user failure: ${error}`);
            reject();
          } else {
            resolve(`Successfully deleted the user. ${result}`);
          }
        });
      },
      onFailure(error: any) {
        logger.error(`Cognito delete user failure: ${error}`);
        reject();
      },
    });
  });
};
