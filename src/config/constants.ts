import * as dotenv from 'dotenv';

dotenv.config();

// PORT
export const PORT = process.env.PORT;

// DB_HOST
if (!process.env.DB_HOST) process.exit();
export const DB_HOST = process.env.DB_HOST;

// DB_NAME
if (!process.env.DB_NAME) process.exit();
export const DB_NAME = process.env.DB_NAME;

// DB_USERNAME
if (!process.env.DB_USERNAME) process.exit();
export const DB_USERNAME = process.env.DB_USERNAME;

export const DB_PASSWORD = process.env.DB_PASSWORD;

// CLOUDINARY UPLOAD IMAGE
if (!process.env.CLOUDINARY_CLOUD_NAME) process.exit();
export const CLOUDINARY_CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME;

if (!process.env.CLOUDINARY_API_KEY) process.exit();
export const CLOUDINARY_API_KEY = process.env.CLOUDINARY_API_KEY;

if (!process.env.CLOUDINARY_API_SECRET) process.exit();
export const CLOUDINARY_API_SECRET = process.env.CLOUDINARY_API_SECRET;
