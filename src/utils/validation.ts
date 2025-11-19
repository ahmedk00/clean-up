import { z } from "zod";

// Admin login validation
export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

// Helper to transform string to boolean for form data
const stringToBoolean = z
  .union([z.boolean(), z.string()])
  .optional()
  .transform((val) => {
    if (typeof val === "boolean") return val;
    if (val === "true") return true;
    if (val === "false") return false;
    return undefined;
  });

// Previous Work validation
export const createPreviousWorkSchema = z.object({
  title: z.string().min(1, "Title is required").max(200, "Title is too long"),
  description: z.string().min(1, "Description is required"),
  category: z.string().min(1, "Category is required"),
  featured: stringToBoolean.default(false),
});

export const updatePreviousWorkSchema = z.object({
  title: z.string().min(1).max(200).optional(),
  description: z.string().min(1).optional(),
  category: z.string().min(1).optional(),
  featured: stringToBoolean,
});

export const queryPreviousWorkSchema = z.object({
  category: z.string().optional(),
  featured: z
    .string()
    .optional()
    .transform((val) => (val === "true" ? true : val === "false" ? false : undefined)),
  limit: z.coerce.number().min(1).max(100).optional().default(20),
  offset: z.coerce.number().min(0).optional().default(0),
});

export type LoginInput = z.infer<typeof loginSchema>;
export type CreatePreviousWorkInput = z.infer<typeof createPreviousWorkSchema>;
export type UpdatePreviousWorkInput = z.infer<typeof updatePreviousWorkSchema>;
export type QueryPreviousWorkInput = z.infer<typeof queryPreviousWorkSchema>;
