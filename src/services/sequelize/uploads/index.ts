import { Request } from 'express';
import fs from 'fs';
import path from 'path';
import { cloudinary } from '../../cloudinary';
import { Upload } from '../../../database/models';
import { DefaultResponse } from './interfaces/uploads.response';
import { NotFoundError } from '../../../errors/not-found-error';

export const uploadCloudinary = async (req: Request) => {
  const cloudinaryResponse = await cloudinary.v2.uploader.upload(
    req.file!.path
  );

  fs.unlinkSync(req.file!.path);

  const result = await Upload.create({
    cloudinaryId: cloudinaryResponse.public_id,
    url: cloudinaryResponse.secure_url,
  });

  const response: DefaultResponse = {
    id: result.id,
    url: result.url,
    cloudinaryId: result.cloudinaryId,
  };

  return { data: response };
};

export const checkingUpload = async (id: string) => {
  const result = await Upload.findOne({ where: { id } });

  if (!result) throw new NotFoundError('UPLOAD_NOT_FOUND');
  return { data: result };
};
