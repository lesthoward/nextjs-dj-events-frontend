import { IUniqueEventResponse } from 'types/interface';

export const getCloudinaryImage = (getEvent?: IUniqueEventResponse) => {
  const localEvent = getEvent;
  let imageUrl = '';
  if (localEvent) {
    const imageAttr = localEvent.data?.attributes.image;
    const formats = imageAttr?.data?.attributes.formats;
    if (imageAttr) {
      if (formats?.medium) {
        imageUrl = formats.medium.url;
      } else if (formats?.small) {
        imageUrl = formats.small.url;
      } else if (formats?.thumbnail) {
        imageUrl = formats.thumbnail.url;
      } else if (imageAttr?.data) {
        imageUrl = imageAttr.data.attributes.url;
      }
    }
  }
  return imageUrl;
};