import { v2 as cloudinary } from "cloudinary";
import { env } from "./env";

// Configure Cloudinary
cloudinary.config({
  cloud_name: env.CLOUDINARY_CLOUD_NAME,
  api_key: env.CLOUDINARY_API_KEY,
  api_secret: env.CLOUDINARY_API_SECRET,
});

// Upload image to Cloudinary
export async function uploadToCloudinary(
  buffer: Buffer,
  folder: string = "cleaning-services/previous-work"
): Promise<{ secure_url: string; public_id: string }> {
  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream(
        {
          folder,
          allowed_formats: ["jpg", "jpeg", "png", "webp"],
          transformation: [{ width: 1200, height: 800, crop: "limit" }],
        },
        (error, result) => {
          if (error) {
            reject(error);
          } else if (result) {
            resolve({
              secure_url: result.secure_url,
              public_id: result.public_id,
            });
          } else {
            reject(new Error("Upload failed"));
          }
        }
      )
      .end(buffer);
  });
}

export { cloudinary };
