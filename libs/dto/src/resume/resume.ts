import { defaultResumeData, idSchema, resumeDataSchema } from "@reactive-resume/schema";
import { createZodDto } from "nestjs-zod/dto";
import { z } from "nestjs-zod/z";

import { userSchema } from "../user";

// Define the specific structure for the summary section
const summarySectionSchema = z.object({
  name: z.string(),
  columns: z.number(),
  visible: z.boolean(),
  id: z.literal("summary"), // Ensure the id is the literal type "summary"
  separateLinks: z.boolean(),
  content: z.string(),
});

// Update the resumeDataSchema to include the specific summary section schema
const updatedResumeDataSchema = resumeDataSchema.extend({
  sections: resumeDataSchema.shape.sections.extend({
    summary: summarySectionSchema,
  }),
});

export const resumeSchema = z.object({
  id: idSchema,
  title: z.string(),
  slug: z.string(),
  data: updatedResumeDataSchema.default(defaultResumeData),
  visibility: z.enum(["private", "public"]).default("private"),
  locked: z.boolean().default(false),
  userId: idSchema,
  user: userSchema.optional(),
  createdAt: z.date().or(z.dateString()),
  updatedAt: z.date().or(z.dateString()),
});

export class ResumeDto extends createZodDto(resumeSchema) {}
