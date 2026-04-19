// src/app/api/contact/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
    try {
        const { name, email, organisation, country, subject, message } = await req.json();

        if (!name || !email || !subject || !message) {
            return NextResponse.json({ success: false, message: 'Please fill in all required fields.' }, { status: 400 });
        }

        await resend.emails.send({
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