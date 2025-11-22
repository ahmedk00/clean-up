import { Request, Response } from "express";
import { prisma } from "../config/database";
import { contactCreateSchema, contactPatchSchema } from "../utils/validation";

export const getContact = async (req: Request, res: Response) => {
  const contact = await prisma.contact.findFirst();

  if (!contact) {
    return res.status(404).json({
      status: "error",
      message: "Contact information not configured yet"
    });
  }

  res.json({ status: "ok", data: contact });
};

export const postContact = async (req: Request, res: Response) => {
  const parsed = contactCreateSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ status: "error", errors: parsed.error.issues });
  }

  // Check if contact already exists
  const existing = await prisma.contact.findFirst();
  if (existing) {
    return res.status(409).json({
      status: "error",
      message: "Contact information already exists. Use PATCH to update."
    });
  }

  const created = await prisma.contact.create({ data: parsed.data });
  res.status(201).json({ status: "ok", data: created });
};

export const patchContact = async (req: Request, res: Response) => {
  const parsed = contactPatchSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ status: "error", errors: parsed.error.issues });
  }

  const existing = await prisma.contact.findFirst();
  if (!existing) {
    return res.status(404).json({
      status: "error",
      message: "Contact information not found. Use POST to create."
    });
  }

  const updated = await prisma.contact.update({
    where: { id: existing.id },
    data: parsed.data,
  });

  res.json({ status: "ok", data: updated });
};