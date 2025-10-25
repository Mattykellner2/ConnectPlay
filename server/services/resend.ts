/**
 * Resend Email API Integration
 * Sends automated booking confirmation emails
 */

interface EmailParams {
  to: string;
  subject: string;
  html: string;
}

interface BookingEmailData {
  recipientName: string;
  recipientEmail: string;
  eventTitle: string;
  eventDate: string;
  eventTime: string;
  duration: number;
  professorName: string;
  professionalName: string;
  universityName: string;
  zoomLink: string;
  zoomPassword: string;
  eventType: string;
  className?: string;
  audienceSize?: number;
}

class ResendService {
  private apiKey: string;
  private fromEmail: string;

  constructor() {
    this.apiKey = process.env.RESEND_API_KEY || '';
    this.fromEmail = process.env.RESEND_FROM_EMAIL || 'ConnectPlay <[email protected]>';
  }

  /**
   * Send email via Resend API
   */
  private async sendEmail(params: EmailParams): Promise<void> {
    if (!this.apiKey) {
      console.warn('Resend API key not configured, skipping email send');
      return;
    }

    try {
      const response = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: this.fromEmail,
          to: params.to,
          subject: params.subject,
          html: params.html,
        }),
      });

      if (!response.ok) {
        const errorData = await response.text();
        throw new Error(`Resend API error: ${response.statusText} - ${errorData}`);
      }

      console.log(`Email sent successfully to ${params.to}`);
    } catch (error) {
      console.error('Resend email error:', error);
      throw new Error('Failed to send email');
    }
  }

  /**
   * Generate HTML email template for booking confirmation
   */
  private generateBookingEmailHTML(data: BookingEmailData, isProfessional: boolean): string {
    const greeting = isProfessional 
      ? `Hi ${data.professionalName},`
      : `Hi ${data.professorName},`;

    const message = isProfessional
      ? `You have a new speaking invitation from ${data.universityName}!`
      : `Your speaker booking request has been confirmed!`;

    const details = isProfessional
      ? `Professor ${data.professorName} has invited you to speak`
      : `${data.professionalName} will be speaking`;

    return `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; line-height: 1.6; color: #1e293b; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%); color: white; padding: 30px; border-radius: 12px 12px 0 0; }
    .header h1 { margin: 0; font-size: 24px; font-weight: 800; }
    .content { background: #ffffff; padding: 30px; border: 1px solid #e2e8f0; border-top: none; }
    .detail-box { background: #f8fafc; border-left: 4px solid #2563EB; padding: 16px; margin: 20px 0; border-radius: 8px; }
    .detail-row { margin: 10px 0; }
    .label { font-weight: 700; color: #64748b; font-size: 13px; text-transform: uppercase; letter-spacing: 0.5px; }
    .value { font-size: 16px; color: #1e293b; margin-top: 4px; }
    .zoom-box { background: #f0f9ff; border: 2px solid #3b82f6; padding: 20px; border-radius: 12px; margin: 24px 0; text-align: center; }
    .zoom-button { display: inline-block; background: #2563EB; color: white; padding: 14px 32px; text-decoration: none; border-radius: 10px; font-weight: 700; margin: 12px 0; }
    .zoom-button:hover { background: #1D4ED8; }
    .password { background: #fff; border: 1px dashed #cbd5e1; padding: 8px 16px; border-radius: 8px; font-family: 'Courier New', monospace; font-weight: 700; display: inline-block; margin-top: 8px; }
    .footer { text-align: center; color: #64748b; font-size: 14px; padding: 20px; }
    .divider { border-top: 1px solid #e2e8f0; margin: 24px 0; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>🎯 ${message}</h1>
    </div>
    <div class="content">
      <p style="font-size: 16px; margin-bottom: 24px;">${greeting}</p>
      <p style="font-size: 16px; margin-bottom: 24px;">${details} at the event below:</p>

      <div class="detail-box">
        <div class="detail-row">
          <div class="label">Event</div>
          <div class="value">${data.eventTitle}</div>
        </div>
        
        <div class="divider"></div>
        
        <div class="detail-row">
          <div class="label">Date & Time</div>
          <div class="value">${data.eventDate} at ${data.eventTime} (${data.duration} minutes)</div>
        </div>
        
        <div class="divider"></div>
        
        <div class="detail-row">
          <div class="label">Type</div>
          <div class="value">${data.eventType}</div>
        </div>
        
        ${data.className ? `
        <div class="divider"></div>
        <div class="detail-row">
          <div class="label">Class</div>
          <div class="value">${data.className}</div>
        </div>
        ` : ''}
        
        ${data.audienceSize ? `
        <div class="divider"></div>
        <div class="detail-row">
          <div class="label">Expected Audience</div>
          <div class="value">${data.audienceSize} students</div>
        </div>
        ` : ''}
        
        <div class="divider"></div>
        
        <div class="detail-row">
          <div class="label">University</div>
          <div class="value">${data.universityName}</div>
        </div>
      </div>

      <div class="zoom-box">
        <h3 style="margin: 0 0 12px 0; color: #1e293b;">📹 Join via Zoom</h3>
        <a href="${data.zoomLink}" class="zoom-button">Join Zoom Meeting</a>
        <div style="margin-top: 16px;">
          <div class="label">Meeting Password</div>
          <div class="password">${data.zoomPassword}</div>
        </div>
      </div>

      <p style="font-size: 14px; color: #64748b; margin-top: 24px;">
        ${isProfessional 
          ? 'Please add this to your calendar and prepare for an engaging session with the students!'
          : 'The speaker will receive this same confirmation. Looking forward to a great event!'}
      </p>
    </div>
    
    <div class="footer">
      <p>Sent by <strong>ConnectPlay</strong> - Connecting Universities with Industry Professionals</p>
      <p style="font-size: 12px; margin-top: 8px;">This is an automated message. Please do not reply to this email.</p>
    </div>
  </div>
</body>
</html>
    `;
  }

  /**
   * Send booking confirmation emails to both professor and professional
   */
  async sendBookingConfirmation(data: BookingEmailData): Promise<void> {
    // Send to professional
    await this.sendEmail({
      to: data.professionalEmail,
      subject: `📅 New Speaking Invitation: ${data.eventTitle}`,
      html: this.generateBookingEmailHTML(data, true),
    });

    // Send to professor
    await this.sendEmail({
      to: data.professorEmail,
      subject: `✅ Speaker Booking Confirmed: ${data.eventTitle}`,
      html: this.generateBookingEmailHTML(data, false),
    });

    console.log(`Booking confirmation emails sent to both parties for: ${data.eventTitle}`);
  }

  /**
   * Send single email to either party
   */
  async sendSingleBookingEmail(data: BookingEmailData, isProfessional: boolean): Promise<void> {
    await this.sendEmail({
      to: data.recipientEmail,
      subject: isProfessional 
        ? `📅 New Speaking Invitation: ${data.eventTitle}`
        : `✅ Speaker Booking Confirmed: ${data.eventTitle}`,
      html: this.generateBookingEmailHTML(data, isProfessional),
    });
  }
}

export const resendService = new ResendService();
