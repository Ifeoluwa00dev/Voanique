import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

function getResendClient() {
  const apiKey = process.env.RESEND_API_KEY;
  if (apiKey) {
    return new Resend(apiKey);
  }
  return null;
}

export async function POST(req: NextRequest) {
  let body: { email?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid request body." },
      { status: 400 }
    );
  }

  const { email } = body;

  if (!email || typeof email !== "string") {
    return NextResponse.json(
      { error: "Email address is required." },
      { status: 400 }
    );
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return NextResponse.json(
      { error: "Please enter a valid email address." },
      { status: 400 }
    );
  }

  const sanitizedEmail = email.trim().toLowerCase();
  const resend = getResendClient();
  const audienceId = process.env.RESEND_AUDIENCE_ID;

  if (!resend || !audienceId) {
    console.error(
      "Resend is not configured — RESEND_API_KEY or RESEND_AUDIENCE_ID missing."
    );
    return NextResponse.json(
      { error: "Unable to connect to the server. Please try again." },
      { status: 500 }
    );
  }

  try {
    const result = await resend.contacts.create({
      email: sanitizedEmail,
      audienceId,
      unsubscribed: false,
      firstName: "Pre-Launch",
      lastName: "Subscriber",
    });

    if (result.error) {
      // Resend returns a specific error when the contact already exists
      const message = result.error.message?.toLowerCase() || "";
      if (message.includes("already exists") || message.includes("duplicate")) {
        return NextResponse.json({
          success: true,
          alreadyRegistered: true,
        });
      }
      throw result.error;
    }

    return NextResponse.json({
      success: true,
      alreadyRegistered: false,
    });
  } catch (err) {
    console.error("Resend sync failure:", err);
    return NextResponse.json(
      { error: "Unable to connect to the server. Please try again." },
      { status: 500 }
    );
  }
}
