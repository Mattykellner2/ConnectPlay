/**
 * Zoom API Integration
 * Creates instant meeting links for speaker bookings
 */

interface ZoomMeetingResponse {
  id: number;
  join_url: string;
  start_url: string;
  password: string;
  created_at: string;
}

interface CreateMeetingParams {
  topic: string;
  start_time?: string; // ISO 8601 format
  duration?: number; // minutes
  agenda?: string;
}

class ZoomService {
  private accountId: string;
  private clientId: string;
  private clientSecret: string;
  private accessToken: string | null = null;
  private tokenExpiry: number = 0;

  constructor() {
    this.accountId = process.env.ZOOM_ACCOUNT_ID || '';
    this.clientId = process.env.ZOOM_CLIENT_ID || '';
    this.clientSecret = process.env.ZOOM_CLIENT_SECRET || '';
  }

  /**
   * Get OAuth access token using Server-to-Server OAuth
   */
  private async getAccessToken(): Promise<string> {
    // Return cached token if still valid
    if (this.accessToken && Date.now() < this.tokenExpiry) {
      return this.accessToken;
    }

    const credentials = Buffer.from(`${this.clientId}:${this.clientSecret}`).toString('base64');
    const tokenUrl = `https://zoom.us/oauth/token?grant_type=account_credentials&account_id=${this.accountId}`;

    try {
      const response = await fetch(tokenUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': `Basic ${credentials}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Zoom auth failed: ${response.statusText}`);
      }

      const data = await response.json() as { access_token: string; expires_in: number };
      this.accessToken = data.access_token;
      // Set expiry 5 minutes before actual expiry for safety
      this.tokenExpiry = Date.now() + (data.expires_in - 300) * 1000;

      return this.accessToken;
    } catch (error) {
      console.error('Zoom authentication error:', error);
      throw new Error('Failed to authenticate with Zoom');
    }
  }

  /**
   * Create an instant Zoom meeting
   */
  async createMeeting(params: CreateMeetingParams): Promise<ZoomMeetingResponse> {
    const accessToken = await this.getAccessToken();

    const meetingData = {
      topic: params.topic,
      type: params.start_time ? 2 : 1, // 1 = instant, 2 = scheduled
      start_time: params.start_time,
      duration: params.duration || 60,
      agenda: params.agenda || '',
      settings: {
        host_video: true,
        participant_video: true,
        join_before_host: false,
        mute_upon_entry: true,
        auto_recording: 'none',
        waiting_room: true,
      },
    };

    try {
      const response = await fetch('https://api.zoom.us/v2/users/me/meetings', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(meetingData),
      });

      if (!response.ok) {
        const errorData = await response.text();
        throw new Error(`Zoom API error: ${response.statusText} - ${errorData}`);
      }

      const meeting = await response.json() as ZoomMeetingResponse;
      return meeting;
    } catch (error) {
      console.error('Zoom meeting creation error:', error);
      throw new Error('Failed to create Zoom meeting');
    }
  }

  /**
   * Create a meeting for a speaker booking
   * Returns simplified meeting data
   */
  async createBookingMeeting(eventTitle: string, eventDate: string, eventTime: string, duration: number = 60) {
    // Combine date and time into ISO 8601 format
    const startTime = `${eventDate}T${eventTime}:00`;

    const meeting = await this.createMeeting({
      topic: eventTitle,
      start_time: startTime,
      duration: duration,
      agenda: 'Guest speaker session organized through ConnectPlay',
    });

    return {
      meetingId: meeting.id.toString(),
      joinUrl: meeting.join_url,
      password: meeting.password,
      startUrl: meeting.start_url,
    };
  }
}

export const zoomService = new ZoomService();
