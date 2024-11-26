import * as z from "zod";

export const clientAuthSchema = z.object({
    email: z.string().email(),
    username: z.string(),
    personal_investor_pdf: z.instanceof(File).refine(file => file.type === "application/pdf" && file.size <= 50 * 1024 * 1024, {
        message: "File must be a PDF and less than 50MB"
    }),
    wallet_address: z.string()
})

export const adminAuthSchema = z.object({
    email: z.string().email(),
    organisation_name: z.string(),
    wallet_address: z.string()
})
