// src/app/api/contact/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

function getResendClient() {
    const apiKey = process.env.RESEND_API_KEY;

    if (!apiKey) {
        throw new Error('RESEND_API_KEY is not configured.');
    }

    return new Resend(apiKey);
}

export async function POST(req: NextRequest) {
    try {
        const { name, email, organisation, country, subject, message } = await req.json();

        if (!name || !email || !subject || !message) {
            return NextResponse.json({ success: false, message: 'Please fill in all required fields.' }, { status: 400 });
        }

        await getResendClient().emails.send({
            from: 'AfrONet Contact Form <noreply@afronet.bio>',
            to: 'info@afronet.bio',
            replyTo: email,
            subject: `[Contact] ${subject}`,
            text: `
Name:         ${name}
Email:        ${email}
Organisation: ${organisation || 'N/A'}
Country:      ${country || 'N/A'}
Subject:      ${subject}

Message:
${message}
      `.trim(),
        });

        return NextResponse.json({ success: true, message: 'Your message has been sent. We will get back to you soon.' });
    } catch {
        return NextResponse.json({ success: false, message: 'Server error. Please try again.' }, { status: 500 });
    }
}
