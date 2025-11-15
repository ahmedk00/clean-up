import multer from "multer";
import { previousWorkStorage } from "../config/cloudinary";

// Configure multer with Cloudinary storage
export const uploadPreviousWorkImages = multer({
  storage: previousWorkStorage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB max file size
    files: 10, // Maximum 10 images per upload
  },
  fileFilter: (req, file, cb) => {
    // Accept only image files
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Only image files are allowed"));
    }
  },
});
