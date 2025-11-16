import cloudinary from "cloudinary";
import CloudinaryStorage from "multer-storage-cloudinary";
import { env } from "./env";

// Configure Cloudinary
cloudinary.v2.config({
  cloud_name: env.CLOUDINARY_CLOUD_NAME,
  api_key: env.CLOUDINARY_API_KEY,
  api_secret: env.CLOUDINARY_API_SECRET,
});

// Create storage for previous work images
export const previousWorkStorage = CloudinaryStorage({
  cloudinary: cloudinary.v2,
  params: {
    folder: "cleaning-services/previous-work",
    allowed_formats: ["jpg", "jpeg", "png", "webp"],
    transformation: [{ width: 1200, height: 800, crop: "limit" }],
  } as any,
});

export { cloudinary };
export const cloudinaryV2 = cloudinary.v2;
