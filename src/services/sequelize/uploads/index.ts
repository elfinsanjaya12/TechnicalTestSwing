import { Request } from 'express';
import fs from 'fs';
import { cloudinary } from '../../cloudinary';
import { DefaultResponse } from './interfaces/uploads.response';

export const uploadCloudinary = async (req: Request) => {
  const cloudinaryResponse = await cloudinary.v2.uploader.upload(
    req.file!.path
  );

  fs.unlinkSync(req.file!.path);

  const response: DefaultResponse = {
    url: cloudinaryResponse.secure_url,
  };

  return { data: response };
};
