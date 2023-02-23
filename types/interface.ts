export interface IEventResponse {
  data: IEvent[];
}

export interface IEvent {
  id:number;
  attributes: {
    id: string;
    name: string;
    slug: string;
    venue: string;
    address: string;
    performers: string;
    date: string;
    time: string;
    description: string;
    image?: ICloudinaryImage;
  };
}


interface ICloudinaryImage {
  data: ICloudinaryImageData;
}

interface ICloudinaryImageData {
  id: number;
  attributes: ICloudinaryAttributes;
}

interface ICloudinaryAttributes {
  name: string;
  alternativeText?: any;
  caption?: any;
  width: number;
  height: number;
  formats: ICloudinaryFormats;
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl?: any;
  provider: string;
  provider_metadata: ICloudinaryProviderMetadata;
  createdAt: string;
  updatedAt: string;
}

interface ICloudinaryFormats {
  thumbnail: ICloudinaryThumbnail;
  small: ICloudinaryThumbnail;
  large: ICloudinaryThumbnail;
  medium: ICloudinaryThumbnail;
}

interface ICloudinaryThumbnail {
  name: string;
  hash: string;
  ext: string;
  mime: string;
  path?: any;
  width: number;
  height: number;
  size: number;
  url: string;
  provider_metadata: ICloudinaryProviderMetadata;
}

interface ICloudinaryProviderMetadata {
  public_id: string;
  resource_type: string;
}