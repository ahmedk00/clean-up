import { Request, Response, NextFunction } from "express";
import { prisma } from "../config/database";
import { cloudinaryV2 } from "../config/cloudinary";
import {
  createPreviousWorkSchema,
  updatePreviousWorkSchema,
  queryPreviousWorkSchema,
} from "../utils/validation";

// Helper function to extract Cloudinary URL from file object
function getCloudinaryUrl(file: any): string | null {
  // multer-storage-cloudinary stores the URL in different properties
  // Check in order: secure_url, url, path
  return file.secure_url || file.url || file.path || null;
}

// Helper function to extract public_id from Cloudinary URL
function extractPublicIdFromUrl(url: string): string | null {
  try {
    // Cloudinary URL format: https://res.cloudinary.com/{cloud_name}/image/upload/{version}/{folder}/{public_id}.{format}
    // or: https://res.cloudinary.com/{cloud_name}/image/upload/{folder}/{public_id}.{format}
    
    // Parse the URL
    const urlObj = new URL(url);
    const pathParts = urlObj.pathname.split("/");
    
    // Find the index of "upload" in the path
    const uploadIndex = pathParts.indexOf("upload");
    if (uploadIndex === -1) {
      console.error("Invalid Cloudinary URL format:", url);
      return null;
    }
    
    // Get everything after "upload" (skip version if present)
    // Path structure: /image/upload/v1234567890/folder/public_id.format
    // or: /image/upload/folder/public_id.format
    const afterUpload = pathParts.slice(uploadIndex + 1);
    
    // Remove version if present (starts with 'v' followed by numbers)
    const parts = afterUpload[0]?.startsWith("v") && /^v\d+$/.test(afterUpload[0])
      ? afterUpload.slice(1)
      : afterUpload;
    
    // Join remaining parts to get folder/public_id
    const fullPath = parts.join("/");
    
    // Remove file extension
    const publicId = fullPath.replace(/\.[^/.]+$/, "");
    
    return publicId || null;
  } catch (error) {
    console.error("Error extracting public_id from URL:", url, error);
    return null;
  }
}

// Create new previous work (Admin only)
export async function createPreviousWork(req: Request, res: Response, next: NextFunction) {
  try {
    // Validate request body
    const data = createPreviousWorkSchema.parse(req.body);

    // Debug: Log file structure to understand what multer-storage-cloudinary provides
    if (req.files && (req.files as Express.Multer.File[]).length > 0) {
      console.log("Files received:", JSON.stringify((req.files as Express.Multer.File[]).map((f: any) => ({
        fieldname: f.fieldname,
        originalname: f.originalname,
        path: f.path,
        url: f.url,
        secure_url: f.secure_url,
        public_id: f.public_id,
        keys: Object.keys(f),
      })), null, 2));
    }

    // Get uploaded image URLs from Cloudinary
    const images = (req.files as Express.Multer.File[])
      ?.map((file: any) => getCloudinaryUrl(file))
      .filter((url): url is string => url !== null && url !== undefined) || [];

    console.log("Extracted images:", images);

    if (images.length === 0) {
      res.status(400).json({ error: "At least one image is required" });
      return;
    }

    // Create previous work entry
    const previousWork = await prisma.previousWork.create({
      data: {
        ...data,
        images,
      },
    });

    res.status(201).json({
      message: "Previous work created successfully",
      data: previousWork,
    });
  } catch (error) {
    next(error);
  }
}

// Get all previous work (Public)
export async function getAllPreviousWork(req: Request, res: Response, next: NextFunction) {
  try {
    // Validate and parse query parameters
    const { category, featured, limit, offset } = queryPreviousWorkSchema.parse(req.query);

    // Build filter conditions
    const where: any = {};
    if (category) {
      where.category = category;
    }
    if (featured !== undefined) {
      where.featured = featured;
    }

    // Fetch previous work
    const [previousWorks, total] = await Promise.all([
      prisma.previousWork.findMany({
        where,
        orderBy: { createdAt: "desc" },
        take: limit,
        skip: offset,
      }),
      prisma.previousWork.count({ where }),
    ]);

    res.json({
      data: previousWorks,
      pagination: {
        total,
        limit,
        offset,
        hasMore: offset + limit < total,
      },
    });
  } catch (error) {
    next(error);
  }
}

// Get featured previous work (Public)
export async function getFeaturedPreviousWork(req: Request, res: Response, next: NextFunction) {
  try {
    const previousWorks = await prisma.previousWork.findMany({
      where: { featured: true },
      orderBy: { createdAt: "desc" },
    });

    res.json({
      data: previousWorks,
    });
  } catch (error) {
    next(error);
  }
}

// Get single previous work by ID (Public)
export async function getPreviousWorkById(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;

    const previousWork = await prisma.previousWork.findUnique({
      where: { id },
    });

    if (!previousWork) {
      res.status(404).json({ error: "Previous work not found" });
      return;
    }

    res.json({ data: previousWork });
  } catch (error) {
    next(error);
  }
}

// Update previous work (Admin only)
export async function updatePreviousWork(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;

    // Validate request body
    const data = updatePreviousWorkSchema.parse(req.body);

    // Check if previous work exists
    const existingWork = await prisma.previousWork.findUnique({
      where: { id },
    });

    if (!existingWork) {
      res.status(404).json({ error: "Previous work not found" });
      return;
    }

    // Handle new image uploads if provided
    let newImages = existingWork.images;
    if (req.files && (req.files as Express.Multer.File[]).length > 0) {
      const uploadedImages = (req.files as Express.Multer.File[])
        .map((file: any) => getCloudinaryUrl(file))
        .filter((url): url is string => url !== null && url !== undefined);
      newImages = [...existingWork.images, ...uploadedImages];
    }

    // Update previous work
    const updatedWork = await prisma.previousWork.update({
      where: { id },
      data: {
        ...data,
        images: newImages,
      },
    });

    res.json({
      message: "Previous work updated successfully",
      data: updatedWork,
    });
  } catch (error) {
    next(error);
  }
}

// Delete previous work (Admin only)
export async function deletePreviousWork(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;

    // Check if previous work exists
    const existingWork = await prisma.previousWork.findUnique({
      where: { id },
    });

    if (!existingWork) {
      res.status(404).json({ error: "Previous work not found" });
      return;
    }

    // Delete images from Cloudinary
    for (const imageUrl of existingWork.images) {
      try {
        // Extract public_id from Cloudinary URL
        const publicId = extractPublicIdFromUrl(imageUrl);
        if (publicId) {
          const result = await cloudinaryV2.uploader.destroy(publicId);
          console.log(`Deleted image from Cloudinary: ${publicId}`, result);
        } else {
          console.error(`Failed to extract public_id from URL: ${imageUrl}`);
        }
      } catch (error) {
        console.error("Failed to delete image from Cloudinary:", error);
        // Continue with deletion even if Cloudinary deletion fails
      }
    }

    // Delete previous work from database
    await prisma.previousWork.delete({
      where: { id },
    });

    res.json({
      message: "Previous work deleted successfully",
    });
  } catch (error) {
    next(error);
  }
}

// Toggle featured status (Admin only)
export async function toggleFeatured(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;

    // Check if previous work exists
    const existingWork = await prisma.previousWork.findUnique({
      where: { id },
    });

    if (!existingWork) {
      res.status(404).json({ error: "Previous work not found" });
      return;
    }

    // Toggle featured status
    const updatedWork = await prisma.previousWork.update({
      where: { id },
      data: {
        featured: !existingWork.featured,
      },
    });

    res.json({
      message: `Previous work ${updatedWork.featured ? "marked as featured" : "unmarked as featured"}`,
      data: updatedWork,
    });
  } catch (error) {
    next(error);
  }
}

// Delete single image from previous work (Admin only)
export async function deleteImage(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;
    const { imageUrl } = req.body;

    if (!imageUrl) {
      res.status(400).json({ error: "Image URL is required" });
      return;
    }

    // Check if previous work exists
    const existingWork = await prisma.previousWork.findUnique({
      where: { id },
    });

    if (!existingWork) {
      res.status(404).json({ error: "Previous work not found" });
      return;
    }

    // Check if image exists in the work
    if (!existingWork.images.includes(imageUrl)) {
      res.status(404).json({ error: "Image not found in this previous work" });
      return;
    }

    // Don't allow deleting the last image
    if (existingWork.images.length === 1) {
      res.status(400).json({ error: "Cannot delete the last image. At least one image is required." });
      return;
    }

    // Delete image from Cloudinary
    try {
      const publicId = extractPublicIdFromUrl(imageUrl);
      if (publicId) {
        const result = await cloudinaryV2.uploader.destroy(publicId);
        console.log(`Deleted image from Cloudinary: ${publicId}`, result);
      } else {
        console.error(`Failed to extract public_id from URL: ${imageUrl}`);
      }
    } catch (error) {
      console.error("Failed to delete image from Cloudinary:", error);
    }

    // Remove image URL from array
    const updatedImages = existingWork.images.filter((img) => img !== imageUrl);

    // Update previous work
    const updatedWork = await prisma.previousWork.update({
      where: { id },
      data: {
        images: updatedImages,
      },
    });

    res.json({
      message: "Image deleted successfully",
      data: updatedWork,
    });
  } catch (error) {
    next(error);
  }
}
