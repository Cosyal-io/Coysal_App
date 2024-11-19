import * as z from "zod";

export const clientAuthSchema = z.object({
    email: z.string().email(),
    personal_investor_pdf: z
    .instanceof(FileList)
    .refine((file) => file?.length == 1, 'File is required.'),
    username: z.string(),
    wallet_address: z.string()
})

export const adminAuthSchema = z.object({
    email: z.string().email(),
    organisation_name: z.string(),
    wallet_address: z.string()
})
