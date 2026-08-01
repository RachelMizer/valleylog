// Verification email, sent over Gmail SMTP via nodemailer.
//
// Sending is best-effort at every call site except /auth/resend-verification,
// where the user explicitly asked for it and deserves to hear that it failed.

import fs from "node:fs";
import path from "node:path";

import nodemailer from "nodemailer";

export class EmailNotConfigured extends Error {}

function frontendBaseUrl() {
  return (process.env.FRONTEND_BASE_URL || "http://localhost:8888").replace(/\/$/, "");
}

// Bundling flattens the function directory, so the logo's location at runtime
// doesn't match its location in the repo. netlify.toml declares it under
// [functions].included_files; these are the places that lands in practice, and
// a miss is survivable — the email still sends, just without the header image.
const LOGO_CANDIDATES = [
  "public/images/valley_log_logo_lt.png",
  "frontend/public/images/valley_log_logo_lt.png",
  "images/valley_log_logo_lt.png",
];

function findLogo() {
  for (const candidate of LOGO_CANDIDATES) {
    const resolved = path.resolve(process.cwd(), candidate);
    if (fs.existsSync(resolved)) return resolved;
  }
  return null;
}

function verificationHtml(verifyUrl) {
  return `\
<body style="margin:0; padding:0; background:#f0f2f9; font-family:'Segoe UI',Roboto,sans-serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f0f2f9; padding:32px 0;">
    <tr>
      <td align="center">
        <table role="presentation" width="480" cellpadding="0" cellspacing="0" style="background:#ffffff; border-radius:12px; overflow:hidden; border:1px solid #e5e4e7;">
          <tr>
            <td align="center" style="background:#2a344f; padding:24px 16px;">
              <img src="cid:logo" alt="Valley Log" width="320" style="display:block; max-width:100%; height:auto;">
            </td>
          </tr>
          <tr>
            <td style="padding:32px; color:#333333;">
              <h1 style="margin:0 0 16px; font-size:22px; color:#08060d;">Verify your email</h1>
              <p style="margin:0 0 24px; font-size:15px; line-height:1.5;">
                Thanks for signing up for Valley Log! Click the button below to verify your
                email address and activate your account.
              </p>
              <table role="presentation" cellpadding="0" cellspacing="0">
                <tr>
                  <td align="center" style="border-radius:6px; background:#485795;">
                    <a href="${verifyUrl}"
                       style="display:inline-block; padding:12px 28px; font-size:15px; font-weight:600;
                              color:#ffffff; text-decoration:none;">
                      Verify My Email
                    </a>
                  </td>
                </tr>
              </table>
              <p style="margin:24px 0 0; font-size:13px; color:#6b6375;">
                Or paste this link into your browser:<br>
                <a href="${verifyUrl}" style="color:#485795; word-break:break-all;">${verifyUrl}</a>
              </p>
              <p style="margin:24px 0 0; font-size:13px; color:#6b6375;">
                This link expires in 24 hours.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
`;
}

export async function sendVerificationEmail(toEmail, token) {
  const user = process.env.SMTP_USERNAME;
  const pass = process.env.SMTP_PASSWORD;
  if (!user || !pass) {
    throw new EmailNotConfigured(
      "SMTP_USERNAME/SMTP_PASSWORD are not set in the site environment"
    );
  }

  const verifyUrl = `${frontendBaseUrl()}/verify-email?token=${token}`;

  const transport = nodemailer.createTransport({
    host: process.env.SMTP_HOST || "smtp.gmail.com",
    port: Number(process.env.SMTP_PORT || 587),
    secure: false,
    requireTLS: true,
    auth: { user, pass },
  });

  const logoPath = findLogo();

  await transport.sendMail({
    from: { name: "Valley Log", address: process.env.SMTP_FROM_EMAIL || user },
    to: toEmail,
    subject: "Verify your Valley Log account",
    text:
      "Welcome to Valley Log!\n\n" +
      "Please verify your email address by visiting the link below:\n" +
      `${verifyUrl}\n\n` +
      "This link expires in 24 hours.",
    html: verificationHtml(verifyUrl),
    attachments: logoPath
      ? [{ filename: "valley_log_logo_lt.png", path: logoPath, cid: "logo" }]
      : [],
  });
}
