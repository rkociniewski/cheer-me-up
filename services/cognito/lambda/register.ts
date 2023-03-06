import { APIGatewayProxyEventV2, APIGatewayProxyStructuredResultV2 } from 'aws-lambda';
import { badRequest, created, internalServerError } from 'services/common/http/responses';
import { UserDataRequest } from '../CognitoSchema';
import CognitoFacade from '../facade/CognitoFacade';

export const handler = async (event: APIGatewayProxyEventV2): Promise<APIGatewayProxyStructuredResultV2> => {
  if (!event.body) {
    return badRequest("Request doesn't contains username or password");
  }
  const userData: UserDataRequest = JSON.parse(event.body);

  try {
    const response = await CognitoFacade.register(userData);
    return created(response);
  } catch (error: any) {
    return internalServerError(error);
  }
};
