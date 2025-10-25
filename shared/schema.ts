import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp, boolean, integer, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// University Partnership Applications
export const universityApplications = pgTable("university_applications", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  fullName: text("full_name").notNull(),
  title: text("title").notNull(),
  universityName: text("university_name").notNull(),
  email: text("email").notNull(),
  programSize: text("program_size").notNull(),
  goals: text("goals").notNull(),
  timeline: text("timeline").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertUniversityApplicationSchema = createInsertSchema(universityApplications).omit({
  id: true,
  createdAt: true,
}).extend({
  fullName: z.string().min(1, "Full name is required"),
  title: z.string().min(1, "Title is required"),
  universityName: z.string().min(1, "University name is required"),
  email: z.string().email("Invalid email address").refine((email) => email.endsWith('.edu'), {
    message: 'Email must be from a .edu domain',
  }),
  programSize: z.string().min(1, "Program size is required"),
  goals: z.string().min(1, "Goals and objectives are required"),
  timeline: z.string().min(1, "Implementation timeline is required"),
});

export type InsertUniversityApplication = z.infer<typeof insertUniversityApplicationSchema>;
export type UniversityApplication = typeof universityApplications.$inferSelect;

// Industry Professional Applications
export const professionalApplications = pgTable("professional_applications", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  email: text("email").notNull(),
  jobTitle: text("job_title").notNull(),
  company: text("company").notNull(),
  industry: text("industry").notNull(),
  location: text("location").notNull(),
  bio: text("bio").notNull(),
  topics: text("topics").array().notNull(),
  formats: text("formats").array().notNull(),
  feeStructure: text("fee_structure").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertProfessionalApplicationSchema = createInsertSchema(professionalApplications).omit({
  id: true,
  createdAt: true,
}).extend({
  name: z.string().min(1, "Full name is required"),
  email: z.string().email("Invalid email address"),
  jobTitle: z.string().min(1, "Job title is required"),
  company: z.string().min(1, "Company is required"),
  industry: z.string().min(1, "Industry is required"),
  location: z.string().min(1, "Location is required"),
  bio: z.string().min(1, "Professional bio is required"),
  topics: z.array(z.string()).min(1, "Select at least one speaking topic"),
  formats: z.array(z.string()).min(1, "Select at least one speaking format"),
  feeStructure: z.string().min(1, "Fee structure is required"),
});

export type InsertProfessionalApplication = z.infer<typeof insertProfessionalApplicationSchema>;
export type ProfessionalApplication = typeof professionalApplications.$inferSelect;

// Student Access Codes
export const accessCodes = pgTable("access_codes", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  code: text("code").notNull().unique(),
  universityName: text("university_name").notNull(),
  isActive: text("is_active").notNull().default("true"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertAccessCodeSchema = createInsertSchema(accessCodes).omit({
  id: true,
  createdAt: true,
});

export type InsertAccessCode = z.infer<typeof insertAccessCodeSchema>;
export type AccessCode = typeof accessCodes.$inferSelect;

// Student Profiles
export const studentProfiles = pgTable("student_profiles", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  email: text("email").notNull(),
  major: text("major").notNull(),
  graduationYear: text("graduation_year").notNull(),
  studentId: text("student_id").notNull(),
  accessCode: text("access_code").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertStudentProfileSchema = createInsertSchema(studentProfiles).omit({
  id: true,
  createdAt: true,
}).extend({
  name: z.string().min(1, "Full name is required"),
  email: z.string().email("Invalid email address"),
  major: z.string().min(1, "Major is required"),
  graduationYear: z.string().min(1, "Graduation year is required"),
  studentId: z.string().min(1, "Student ID is required"),
  accessCode: z.string().min(1, "Access code is required"),
});

export type InsertStudentProfile = z.infer<typeof insertStudentProfileSchema>;
export type StudentProfile = typeof studentProfiles.$inferSelect;

// Industry Professional Profiles (Extended)
export const professionalProfiles = pgTable("professional_profiles", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  email: text("email").notNull(),
  jobTitle: text("job_title").notNull(),
  company: text("company").notNull(),
  industry: text("industry").notNull(),
  location: text("location").notNull(),
  bio: text("bio").notNull(),
  profileImage: text("profile_image"),
  networkingOpen: boolean("networking_open").notNull().default(true),
  guestSpeaking: boolean("guest_speaking").notNull().default(true),
  linkedinConnected: boolean("linkedin_connected").notNull().default(false),
  linkedinProfileUrl: text("linkedin_profile_url"),
  linkedinLastSync: timestamp("linkedin_last_sync"),
  linkedinData: jsonb("linkedin_data"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertProfessionalProfileSchema = createInsertSchema(professionalProfiles).omit({
  id: true,
  createdAt: true,
});

export type InsertProfessionalProfile = z.infer<typeof insertProfessionalProfileSchema>;
export type ProfessionalProfile = typeof professionalProfiles.$inferSelect;

// Professors
export const professors = pgTable("professors", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  email: text("email").notNull(),
  department: text("department").notNull(),
  universityId: varchar("university_id").notNull(),
  universityName: text("university_name").notNull(),
  classes: text("classes").array().notNull().default(sql`'{}'::text[]`),
  speakers: text("speakers").array().notNull().default(sql`'{}'::text[]`),
  totalConnections: integer("total_connections").notNull().default(0),
  totalEventsHosted: integer("total_events_hosted").notNull().default(0),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertProfessorSchema = createInsertSchema(professors).omit({
  id: true,
  createdAt: true,
}).extend({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  department: z.string().min(1, "Department is required"),
  universityId: z.string().min(1, "University ID is required"),
  universityName: z.string().min(1, "University name is required"),
});

export type InsertProfessor = z.infer<typeof insertProfessorSchema>;
export type Professor = typeof professors.$inferSelect;

// Speaking Events
export const speakingEvents = pgTable("speaking_events", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  professionalId: varchar("professional_id").notNull(),
  professionalName: text("professional_name").notNull(),
  eventName: text("event_name").notNull(),
  universityId: varchar("university_id"),
  professorId: varchar("professor_id"),
  eventDate: timestamp("event_date").notNull(),
  eventType: text("event_type").notNull(),
  attendeeCount: integer("attendee_count").notNull().default(0),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertSpeakingEventSchema = createInsertSchema(speakingEvents).omit({
  id: true,
  createdAt: true,
});

export type InsertSpeakingEvent = z.infer<typeof insertSpeakingEventSchema>;
export type SpeakingEvent = typeof speakingEvents.$inferSelect;

// Leaderboard Entries
export const leaderboardEntries = pgTable("leaderboard_entries", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  professionalId: varchar("professional_id").notNull(),
  professionalName: text("professional_name").notNull(),
  month: text("month").notNull(),
  year: integer("year").notNull(),
  eventCount: integer("event_count").notNull().default(0),
  rank: integer("rank"),
  rewardGranted: boolean("reward_granted").notNull().default(false),
  rewardAmount: text("reward_amount"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertLeaderboardEntrySchema = createInsertSchema(leaderboardEntries).omit({
  id: true,
  createdAt: true,
});

export type InsertLeaderboardEntry = z.infer<typeof insertLeaderboardEntrySchema>;
export type LeaderboardEntry = typeof leaderboardEntries.$inferSelect;

// Speaker Bookings (for Zoom + Email integration)
export const speakerBookings = pgTable("speaker_bookings", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  professionalId: varchar("professional_id").notNull(),
  professionalName: text("professional_name").notNull(),
  professionalEmail: text("professional_email").notNull(),
  professorId: varchar("professor_id"),
  professorName: text("professor_name").notNull(),
  professorEmail: text("professor_email").notNull(),
  universityId: varchar("university_id"),
  universityName: text("university_name").notNull(),
  eventTitle: text("event_title").notNull(),
  eventDescription: text("event_description"),
  eventDate: text("event_date").notNull(), // YYYY-MM-DD
  eventTime: text("event_time").notNull(), // HH:MM
  eventDuration: integer("event_duration").notNull().default(60), // minutes
  eventType: text("event_type").notNull(), // guest-lecture, workshop, panel, ama
  audienceSize: integer("audience_size"),
  className: text("class_name"),
  status: text("status").notNull().default("pending"), // pending, accepted, declined, cancelled
  zoomMeetingId: text("zoom_meeting_id"),
  zoomMeetingLink: text("zoom_meeting_link"),
  zoomMeetingPassword: text("zoom_meeting_password"),
  emailSentAt: timestamp("email_sent_at"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const insertSpeakerBookingSchema = createInsertSchema(speakerBookings).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  emailSentAt: true,
  zoomMeetingId: true,
  zoomMeetingLink: true,
  zoomMeetingPassword: true,
}).extend({
  professionalId: z.string().min(1, "Professional ID is required"),
  professionalName: z.string().min(1, "Professional name is required"),
  professionalEmail: z.string().email("Invalid professional email"),
  professorName: z.string().min(1, "Professor name is required"),
  professorEmail: z.string().email("Invalid professor email"),
  universityName: z.string().min(1, "University name is required"),
  eventTitle: z.string().min(1, "Event title is required"),
  eventDescription: z.string().optional(),
  eventDate: z.string().min(1, "Event date is required"),
  eventTime: z.string().min(1, "Event time is required"),
  eventDuration: z.number().min(15, "Duration must be at least 15 minutes").default(60),
  eventType: z.string().min(1, "Event type is required"),
  audienceSize: z.number().optional(),
  className: z.string().optional(),
  status: z.string().default("pending"),
});

export type InsertSpeakerBooking = z.infer<typeof insertSpeakerBookingSchema>;
export type SpeakerBooking = typeof speakerBookings.$inferSelect;
