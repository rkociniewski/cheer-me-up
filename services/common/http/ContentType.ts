export const HEADER_CONTENT_TYPE = 'Content-Type';

export const ContentType = {
  APPLICATION_JSON: 'application/json',
  TEXT_CSV: 'text/csv',
  TEXT_PLAIN: 'text/plain',
};

export const ContentTypeHeader = {
  APPLICATION_JSON: { [HEADER_CONTENT_TYPE]: ContentType.APPLICATION_JSON },
};
