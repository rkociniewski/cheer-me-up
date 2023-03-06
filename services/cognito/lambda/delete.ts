import { APIGatewayProxyEventV2, APIGatewayProxyStructuredResultV2 } from 'aws-lambda';
import { badRequest, internalServerError, noContent } from 'services/common/http/responses';
import { logger } from 'services/common/logger/logger';
import { UserDataRequest } from '../CognitoSchema';
import CognitoFacade from '../facade/CognitoFacade';

export const handler = async (event: APIGatewayProxyEventV2): Promise<APIGatewayProxyStructuredResultV2> => {
  if (!event.body) {
    return badRequest("Request doesn't contains username or password");
  }
  const userData: UserDataRequest = JSON.parse(event.body);

  try {
    const response = await CognitoFacade.delete(userData);
    logger.debug(`User successfully deleted. ${response}`);
    return noContent();
  } catch (error: any) {
    return internalServerError(error);
  }
};
