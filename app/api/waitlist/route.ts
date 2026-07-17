import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

function getResendClient() {
  const apiKey = process.env.RESEND_API_KEY;
  if (apiKey) {
    return new Resend(apiKey);
  }
  return null;
}

// Configurable so you can update the sending address without a code change,
// once you've confirmed which domain is actually verified for sending in Resend.
const FROM_ADDRESS =
  process.env.RESEND_FROM_EMAIL || "VOANIQUÉ <hello@voanique.com>";

const WELCOME_SUBJECT = "Welcome to the House.";

const WELCOME_TEXT = `Welcome to the House.

Your invitation has been received.

Before you go, we would like you to remember one thing.

You have never needed permission to be beautiful.

We hope you will always appreciate the beauty that is already yours while embracing the quiet rituals that help it flourish.

We are honored to welcome you.

Refinement Begins With Intention.

The House of VOANIQUÉ`;

const WELCOME_HTML = `
<!DOCTYPE html>
<html>
  <body style="margin:0; padding:0; background-color:#FAFAF9; font-family: Georgia, 'Times New Roman', serif;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#FAFAF9; padding: 48px 24px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" style="max-width: 480px;" cellpadding="0" cellspacing="0">
            <tr>
              <td align="center" style="padding-bottom: 32px;">
                <span style="font-size: 11px; letter-spacing: 3px; text-transform: uppercase; color: #8B8D8F; font-family: Helvetica, Arial, sans-serif;">
                  The Invitation
                </span>
              </td>
            </tr>
            <tr>
              <td align="center" style="padding-bottom: 28px;">
                <h1 style="margin:0; font-size: 30px; font-weight: normal; color: #17181A; font-style: italic;">
                  Welcome to the House.
                </h1>
              </td>
            </tr>
            <tr>
              <td align="center" style="color:#3A3B3D; font-size: 15px; line-height: 1.9; padding-bottom: 8px;">
                Your invitation has been received.
                <br /><br />
                Before you go, we would like you to remember one thing.
                <br /><br />
                <em>You have never needed permission to be beautiful.</em>
                <br /><br />
                We hope you will always appreciate the beauty that is already yours while embracing the quiet rituals that help it flourish.
                <br /><br />
                We are honored to welcome you.
              </td>
            </tr>
            <tr>
              <td align="center" style="padding-top: 32px;">
                <div style="width: 60px; height: 1px; background-color: #C0C2C4; margin: 0 auto 24px;"></div>
                <p style="margin:0; font-style: italic; color:#17181A; font-size: 15px;">
                  Refinement Begins With Intention.
                </p>
                <p style="margin: 6px 0 0; font-family: Helvetica, Arial, sans-serif; font-size: 11px; letter-spacing: 2px; text-transform: uppercase; color:#8B8D8F;">
                  The House of VOANIQUÉ
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>
`;

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
      const message = result.error.message?.toLowerCase() || "";
      if (message.includes("already exists") || message.includes("duplicate")) {
        return NextResponse.json({
          success: true,
          alreadyRegistered: true,
        });
      }
      throw result.error;
    }

    // Fire the instant welcome email — only for genuinely new signups.
    // Wrapped separately so a failure here never breaks the actual signup,
    // which has already succeeded at this point.
    try {
      await resend.emails.send({
        from: FROM_ADDRESS,
        to: sanitizedEmail,
        subject: WELCOME_SUBJECT,
        html: WELCOME_HTML,
        text: WELCOME_TEXT,
      });
    } catch (emailErr) {
      console.error("Welcome email failed to send:", emailErr);
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