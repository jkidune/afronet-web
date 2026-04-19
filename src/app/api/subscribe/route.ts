// src/app/api/subscribe/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
    try {
        const { email, source = 'newsletter' } = await req.json();

        if (!email || !email.includes('@')) {
            return NextResponse.json({ success: false, message: 'Please enter a valid email address.' }, { status: 400 });
        }

        await resend.emails.send({
            from: 'AfrONet <noreply@afronet.bio>',
            to: 'info@afronet.bio',
            subject: `New Newsletter Subscriber`,
            text: `New subscriber: ${email}\nSource: ${source}`,
        });

        return NextResponse.json({ success: true, message: "You're subscribed! Welcome to AfrONet updates." });
    } catch {
        return NextResponse.json({ success: false, message: 'Server error. Please try again.' }, { status: 500 });
    }
}