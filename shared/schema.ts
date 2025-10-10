import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp } from "drizzle-orm/pg-core";
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
  email: z.string().email().refine((email) => email.endsWith('.edu'), {
    message: 'Email must be from a .edu domain',
  }),
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
});

export type InsertStudentProfile = z.infer<typeof insertStudentProfileSchema>;
export type StudentProfile = typeof studentProfiles.$inferSelect;
