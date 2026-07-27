import smtplib
from email.message import EmailMessage
from email.utils import formataddr
from pathlib import Path

from app.config import settings

LOGO_PATH = Path(__file__).resolve().parent.parent.parent / "frontend" / "public" / "valley_log_logo_lt.png"


class EmailNotConfigured(Exception):
    pass


def _verification_html(verify_url: str) -> str:
    return f"""\
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
                    <a href="{verify_url}"
                       style="display:inline-block; padding:12px 28px; font-size:15px; font-weight:600;
                              color:#ffffff; text-decoration:none;">
                      Verify My Email
                    </a>
                  </td>
                </tr>
              </table>
              <p style="margin:24px 0 0; font-size:13px; color:#6b6375;">
                Or paste this link into your browser:<br>
                <a href="{verify_url}" style="color:#485795; word-break:break-all;">{verify_url}</a>
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
"""


def send_verification_email(to_email: str, token: str) -> None:
    if not settings.smtp_username or not settings.smtp_password:
        raise EmailNotConfigured(
            "SMTP_USERNAME/SMTP_PASSWORD are not set in backend/.env"
        )

    verify_url = f"{settings.frontend_base_url}/verify-email?token={token}"

    msg = EmailMessage()
    msg["Subject"] = "Verify your Valley Log account"
    msg["From"] = formataddr(("Valley Log", settings.smtp_from_email or settings.smtp_username))
    msg["To"] = to_email
    msg.set_content(
        "Welcome to Valley Log!\n\n"
        "Please verify your email address by visiting the link below:\n"
        f"{verify_url}\n\n"
        "This link expires in 24 hours."
    )

    msg.add_alternative(_verification_html(verify_url), subtype="html")
    html_part = msg.get_payload()[-1]
    if LOGO_PATH.exists():
        html_part.add_related(
            LOGO_PATH.read_bytes(), maintype="image", subtype="png", cid="logo"
        )

    with smtplib.SMTP(settings.smtp_host, settings.smtp_port) as server:
        server.starttls()
        server.login(settings.smtp_username, settings.smtp_password)
        server.send_message(msg)
