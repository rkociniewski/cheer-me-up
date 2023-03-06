import { APIGatewayProxyStructuredResultV2 } from 'aws-lambda';
import { ContentType, ContentTypeHeader, HEADER_CONTENT_TYPE } from './ContentType';
import { HttpStatusCode } from './http';

export const getBodyFromData = (data: any, headers: Record<string, string>): string => {
  let body;
  if (typeof data === 'string') {
    body = headers[HEADER_CONTENT_TYPE] === ContentType.APPLICATION_JSON ? JSON.stringify({ message: data }) : data;
  } else {
    body = JSON.stringify(data);
  }

  return body;
};

export const ok = (data: any, headers: Record<string, string> = {}): APIGatewayProxyStructuredResultV2 => {
  headers = {
    ...ContentTypeHeader.APPLICATION_JSON,
    ...headers,
  };

  return {
    statusCode: HttpStatusCode.OK,
    headers,
    body: getBodyFromData(data, headers),
  };
};

export const notFound = (data: any, headers: Record<string, string> = {}): APIGatewayProxyStructuredResultV2 => {
  headers = {
    ...ContentTypeHeader.APPLICATION_JSON,
    ...headers,
  };

  return {
    statusCode: HttpStatusCode.NOT_FOUND,
    headers,
    body: getBodyFromData(data, headers),
  };
};

export const created = (data: any) => ({
  ...ok(data),
  statusCode: HttpStatusCode.CREATED,
});

export const noContent = () => ({
  statusCode: HttpStatusCode.NO_CONTENT,
});

export const badRequest = (message: string): APIGatewayProxyStructuredResultV2 => ({
  statusCode: HttpStatusCode.BAD_REQUEST,
  body: JSON.stringify({ message }),
  headers: {
    ...ContentTypeHeader.APPLICATION_JSON,
  },
});

export const internalServerError = (message: string): APIGatewayProxyStructuredResultV2 => ({
  statusCode: HttpStatusCode.INTERNAL_SERVER_ERROR,
  body: JSON.stringify({ message }),
  headers: {
    ...ContentTypeHeader.APPLICATION_JSON,
  },
});

export const forbidden = (body: string | object): APIGatewayProxyStructuredResultV2 => {
  let object: object;
  if (typeof body === 'string') {
    object = { message: body };
  }

  if (typeof body === 'object') {
    object = body;
  }

  return {
    statusCode: HttpStatusCode.FORBIDDEN,
    body: JSON.stringify(object!),
    headers: {
      ...ContentTypeHeader.APPLICATION_JSON,
    },
  };
};
