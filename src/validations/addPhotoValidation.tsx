import { z } from 'zod'

export const PhotoSchema = z.object({
    label: z.string().min(2).max(100),
    url: z.string().url(),
})

export type Photo = z.infer<typeof PhotoSchema>
