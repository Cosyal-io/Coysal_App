import { NextApiRequest, NextApiResponse } from "next";
import { Resend } from 'resend';

const resend = new Resend("");

interface EmailRequestBody {
    from: string;
    to: string;
    subject: string;
    html: string;
}

export  async function POST(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        try {
            const { from, to, subject, html } = req.body as EmailRequestBody;

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

