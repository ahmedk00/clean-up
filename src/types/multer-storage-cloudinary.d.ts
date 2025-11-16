declare module 'multer-storage-cloudinary' {
  import { StorageEngine } from 'multer';
  import { v2 as cloudinary } from 'cloudinary';

  interface CloudinaryStorageOptions {
    cloudinary: typeof cloudinary;
    params: {
      folder?: string;
      allowed_formats?: string[];
      transformation?: any;
      resource_type?: string;
      [key: string]: any;
    };
  }

  function CloudinaryStorage(options: CloudinaryStorageOptions): StorageEngine;

  export = CloudinaryStorage;
}
