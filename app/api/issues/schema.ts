import { z } from 'zod';
const schema = z.object({
    title: z.string().min(1, 'Title is not long enough').max(255),
    description: z.string().min(1),
});
export default schema;