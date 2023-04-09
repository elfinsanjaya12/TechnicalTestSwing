import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
  destination: function (req: any, file: any, cb: any) {
    cb(null, 'public/images/');
  },
  filename: function (req: any, file: any, cb: any) {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

const fileFilter = function (_req: any, file: any, cb: any) {
  // Allowed ext
  const fileTypes = /jpeg|jpg|png/;
  // Check ext
  const extName = fileTypes.test(path.extname(file.originalname).toLowerCase());
  // Check mime
  const mimeType = fileTypes.test(file.mimetype);

  if (mimeType && extName) {
    return cb(null, true);
  }

  return cb('Error: Images Only !!!');
};

const uploadImageMiddleware = multer({
  storage,
  limits: {
    fileSize: 3000000,
  },
  fileFilter,
});

export default uploadImageMiddleware;
