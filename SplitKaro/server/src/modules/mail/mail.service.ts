import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createTransport, type Transporter } from 'nodemailer';

type Person = { name: string | null; email: string };

const escapeHtml = (text: string) =>
  text.replace(/[&<>"']/g, (c) => `&#${c.charCodeAt(0)};`);

const displayName = (person: Person) => person.name ?? person.email;

// Sends transactional email over SMTP (e.g. Gmail with an app password).
// If SMTP isn't configured, emails are skipped with a log line so local dev still works.
@Injectable()
export class MailService {
  private readonly logger = new Logger(MailService.name);
  private readonly transporter: Transporter | null;
  private readonly from: string;
  private readonly clientUrl: string;

  constructor(config: ConfigService) {
    const host = config.get<string>('SMTP_HOST');
    const user = config.get<string>('SMTP_USER');
    const pass = config.get<string>('SMTP_PASS');
    const port = Number(config.get<string>('SMTP_PORT') ?? 465);

    this.clientUrl = config.get<string>('CLIENT_URL') ?? 'http://localhost:3000';
    this.from = config.get<string>('MAIL_FROM') ?? `SplitKaro <${user}>`;
    this.transporter =
      host && user && pass
        ? createTransport({ host, port, secure: port === 465, auth: { user, pass } })
        : null;
  }

  // Tells someone who hasn't signed up yet who invited them.
  sendFriendInvite(to: string, inviter: Person) {
    const who = displayName(inviter);
    return this.send(
      to,
      `${who} invited you to SplitKaro`,
      `${who} (${inviter.email}) invited you to split expenses on SplitKaro.\n\n` +
        `Sign up with this email address (${to}) and you'll be connected automatically:\n` +
        `${this.clientUrl}/signup\n`,
      `<p><strong>${escapeHtml(who)}</strong> (${escapeHtml(inviter.email)}) invited you to split expenses on SplitKaro.</p>` +
        `<p>Sign up with this email address (${escapeHtml(to)}) and you'll be connected automatically.</p>` +
        `<p><a href="${this.clientUrl}/signup">Join SplitKaro</a></p>`,
    );
  }

  // Tells someone already on SplitKaro that they were added as a friend.
  sendFriendAdded(to: string, adder: Person) {
    const who = displayName(adder);
    return this.send(
      to,
      `${who} added you as a friend on SplitKaro`,
      `${who} (${adder.email}) added you as a friend on SplitKaro.\n\n${this.clientUrl}/dashboard\n`,
      `<p><strong>${escapeHtml(who)}</strong> (${escapeHtml(adder.email)}) added you as a friend on SplitKaro.</p>` +
        `<p><a href="${this.clientUrl}/dashboard">Open SplitKaro</a></p>`,
    );
  }

  // A failed email must never fail the request that triggered it.
  private async send(to: string, subject: string, text: string, html: string) {
    if (!this.transporter) {
      this.logger.warn(`SMTP is not configured; skipped email "${subject}" to ${to}`);
      return;
    }
    try {
      await this.transporter.sendMail({ from: this.from, to, subject, text, html });
    } catch (error) {
      this.logger.error(`Could not send "${subject}" to ${to}`, error as Error);
    }
  }
}
