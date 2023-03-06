import { Support } from '../SupportSchema';
import { Converter } from '../../../common/utils/Converter';

export const convertToSupport: Converter<Record<string, any>, Support> = (response) => ({
  entryId: response.entryId,
  userId: response.userId,
  title: response.title,
  text: response.text,
  createdDate: +response.createdDate,
});
