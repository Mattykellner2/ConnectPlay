import type { Express } from "express";
import { createServer, type Server } from "http";
import { db } from "./db";
import { speakerBookings, insertSpeakerBookingSchema } from "@shared/schema";
import { eq, or, and } from "drizzle-orm";
import { zoomService } from "./services/zoom";
import { resendService } from "./services/resend";

export async function registerRoutes(app: Express): Promise<Server> {
  
  // ============================================
  // SPEAKER BOOKING ROUTES
  // ============================================

  // Create a new speaker booking request
  app.post("/api/bookings", async (req, res) => {
    try {
      const validatedData = insertSpeakerBookingSchema.parse(req.body);
      
      const [booking] = await db.insert(speakerBookings).values({
        ...validatedData,
        status: "pending",
      }).returning();

      res.json(booking);
    } catch (error: any) {
      console.error("Error creating booking:", error);
      res.status(400).json({ 
        error: "Failed to create booking", 
        details: error.message 
      });
    }
  });

  // Get bookings (filtered by professionalId or professorId)
  app.get("/api/bookings", async (req, res) => {
    try {
      const { professionalId, professorId, status } = req.query;

      let conditions = [];
      if (professionalId) conditions.push(eq(speakerBookings.professionalId, professionalId as string));
      if (professorId) conditions.push(eq(speakerBookings.professorId, professorId as string));
      if (status) conditions.push(eq(speakerBookings.status, status as string));

      const bookings = conditions.length > 0
        ? await db.select().from(speakerBookings).where(and(...conditions))
        : await db.select().from(speakerBookings);

      res.json(bookings);
    } catch (error: any) {
      console.error("Error fetching bookings:", error);
      res.status(500).json({ error: "Failed to fetch bookings" });
    }
  });

  // Get single booking
  app.get("/api/bookings/:id", async (req, res) => {
    try {
      const [booking] = await db
        .select()
        .from(speakerBookings)
        .where(eq(speakerBookings.id, req.params.id));

      if (!booking) {
        return res.status(404).json({ error: "Booking not found" });
      }

      res.json(booking);
    } catch (error: any) {
      console.error("Error fetching booking:", error);
      res.status(500).json({ error: "Failed to fetch booking" });
    }
  });

  // Accept a booking (creates Zoom meeting and sends emails)
  app.patch("/api/bookings/:id/accept", async (req, res) => {
    try {
      const [booking] = await db
        .select()
        .from(speakerBookings)
        .where(eq(speakerBookings.id, req.params.id));

      if (!booking) {
        return res.status(404).json({ error: "Booking not found" });
      }

      if (booking.status !== "pending") {
        return res.status(400).json({ error: "Booking is not in pending status" });
      }

      // Step 1: Create Zoom meeting (can fail, no state change yet)
      let zoomMeeting;
      try {
        zoomMeeting = await zoomService.createBookingMeeting(
          booking.eventTitle,
          booking.eventDate,
          booking.eventTime,
          booking.eventDuration
        );
      } catch (zoomError: any) {
        console.error("Zoom meeting creation failed:", zoomError);
        return res.status(500).json({ 
          error: "Failed to create Zoom meeting", 
          details: zoomError.message 
        });
      }

      // Step 2: Update booking with Zoom details and accepted status
      const [updatedBooking] = await db
        .update(speakerBookings)
        .set({
          status: "accepted",
          zoomMeetingId: zoomMeeting.meetingId,
          zoomMeetingLink: zoomMeeting.joinUrl,
          zoomMeetingPassword: zoomMeeting.password,
          updatedAt: new Date(),
        })
        .where(eq(speakerBookings.id, req.params.id))
        .returning();

      // Step 3: Send confirmation emails to both parties
      // If this fails, booking is already accepted but emails not sent
      // We'll mark emailSentAt only after successful send
      try {
        await resendService.sendBookingConfirmation({
          recipientName: booking.professionalName,
          recipientEmail: booking.professionalEmail,
          professorEmail: booking.professorEmail,
          professionalEmail: booking.professionalEmail,
          eventTitle: booking.eventTitle,
          eventDate: booking.eventDate,
          eventTime: booking.eventTime,
          duration: booking.eventDuration,
          professorName: booking.professorName,
          professionalName: booking.professionalName,
          universityName: booking.universityName,
          zoomLink: zoomMeeting.joinUrl,
          zoomPassword: zoomMeeting.password,
          eventType: booking.eventType,
          className: booking.className || undefined,
          audienceSize: booking.audienceSize || undefined,
        });

        // Mark emails as sent
        await db
          .update(speakerBookings)
          .set({ emailSentAt: new Date() })
          .where(eq(speakerBookings.id, req.params.id));

      } catch (emailError: any) {
        console.error("Email sending failed (booking already accepted):", emailError);
        // Booking is accepted and has Zoom link, but emails failed
        // Return success with a warning - users can still see the Zoom link
        return res.json({
          ...updatedBooking,
          warning: "Booking accepted but email notifications failed. Please inform both parties manually."
        });
      }

      res.json(updatedBooking);
    } catch (error: any) {
      console.error("Error accepting booking:", error);
      res.status(500).json({ 
        error: "Failed to accept booking", 
        details: error.message 
      });
    }
  });

  // Decline a booking
  app.patch("/api/bookings/:id/decline", async (req, res) => {
    try {
      const [booking] = await db
        .select()
        .from(speakerBookings)
        .where(eq(speakerBookings.id, req.params.id));

      if (!booking) {
        return res.status(404).json({ error: "Booking not found" });
      }

      if (booking.status !== "pending") {
        return res.status(400).json({ error: "Booking is not in pending status" });
      }

      const [updatedBooking] = await db
        .update(speakerBookings)
        .set({
          status: "declined",
          updatedAt: new Date(),
        })
        .where(eq(speakerBookings.id, req.params.id))
        .returning();

      res.json(updatedBooking);
    } catch (error: any) {
      console.error("Error declining booking:", error);
      res.status(500).json({ error: "Failed to decline booking" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
