import { NextApiHandler } from "next";

import { Resend } from 'resend';
import env  from "@/env";
const resend = new Resend(env.schema.RESEND_URL);

const handler: NextApiHandler = async (req, res) => {
    if (req.method === 'POST') {
        try {
            const { from,to, subject, html } = req.body;

            const email = await resend.emails.send({
                from: from,
                to: to,
                subject: subject,
                html: html,
            });

            res.status(200).json({ message: 'Email sent successfully', email });
        } catch (error) {
            res.status(500).json({ message: 'Failed to send email', error });
        }
    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }
};

export default handler;