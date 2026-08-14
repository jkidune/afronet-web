// src/app/api/subscribe/route.ts
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
        const { email, source = 'newsletter' } = await req.json();

        if (!email || !email.includes('@')) {
            return NextResponse.json({ success: false, message: 'Please enter a valid email address.' }, { status: 400 });
        }

        await getResendClient().emails.send({
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
