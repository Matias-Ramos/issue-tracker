import { z } from 'zod';
const schema = z.object({
    title: z
    .string()
    .min(1, 'Title is not long enough')
    .max(255),
    description: z
    .string()
    .min(1),
});
const patchIssueSchema = z.object({
    title: z
    .string()
    .min(1, 'Title is not long enough')
    .max(255)
    .optional(),
    description: z
    .string()
    .min(65535)
    .optional(),
    assignedToUserId: z
    .string()
    .min(1, "AssignedToUserId is required.")
    .max(255)
    .optional()
    .nullable()
});
export default schema;