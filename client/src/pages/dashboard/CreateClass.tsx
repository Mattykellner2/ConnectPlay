import { useState } from "react";
import { useLocation } from "wouter";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const createClassSchema = z.object({
  className: z.string().min(1, "Class name is required"),
  academicTerm: z.string().min(1, "Academic term is required"),
  department: z.string().min(1, "Department is required"),
  courseCode: z.string().min(1, "Course code is required"),
  instructor: z.string().min(1, "Instructor name is required"),
  enrollmentSize: z.string().min(1, "Estimated enrollment is required"),
  description: z.string().optional(),
});

type CreateClassFormData = z.infer<typeof createClassSchema>;

export default function CreateClass() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  const form = useForm<CreateClassFormData>({
    resolver: zodResolver(createClassSchema),
    defaultValues: {
      className: "",
      academicTerm: "",
      department: "",
      courseCode: "",
      instructor: "",
      enrollmentSize: "",
      description: "",
    },
  });

  const handleSubmit = (data: CreateClassFormData) => {
    console.log('Creating class:', data);
    
    toast({
      title: "Class Created!",
      description: `${data.className} has been successfully created.`,
    });

    // Navigate back to student management
    setTimeout(() => {
      setLocation("/universities/dashboard/students");
    }, 1000);
  };

  return (
    <div className="panel">
      <div style={{ marginBottom: 24 }}>
        <button
          onClick={() => setLocation("/universities/dashboard/students")}
          className="btn-link"
          style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}
          data-testid="button-back-to-students"
        >
          <ArrowLeft size={16} />
          Back to Student Management
        </button>
        <h2 style={{ margin: "0 0 8px" }}>Create New Class</h2>
        <p style={{ color: "#64748B", margin: 0 }}>
          Set up a new class cohort for ConnectPlay access
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="className"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Class Name</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="e.g., Business Analytics 101" data-testid="input-class-name" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="academicTerm"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Academic Term</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger data-testid="select-academic-term">
                        <SelectValue placeholder="Select term" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="fall-2024">Fall 2024</SelectItem>
                      <SelectItem value="spring-2025">Spring 2025</SelectItem>
                      <SelectItem value="summer-2025">Summer 2025</SelectItem>
                      <SelectItem value="fall-2025">Fall 2025</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="department"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Department</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="e.g., College of Business" data-testid="input-department" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="courseCode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Course Code</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="e.g., BUS-301" data-testid="input-course-code" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="instructor"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Instructor Name</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="e.g., Dr. Jane Smith" data-testid="input-instructor" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="enrollmentSize"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Estimated Enrollment</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger data-testid="select-enrollment-size">
                        <SelectValue placeholder="Select size" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="1-25">1-25 students</SelectItem>
                      <SelectItem value="26-50">26-50 students</SelectItem>
                      <SelectItem value="51-100">51-100 students</SelectItem>
                      <SelectItem value="101-200">101-200 students</SelectItem>
                      <SelectItem value="200+">200+ students</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description (Optional)</FormLabel>
                <FormControl>
                  <Textarea 
                    {...field} 
                    rows={3} 
                    placeholder="Brief description of the class objectives and ConnectPlay usage..."
                    data-testid="textarea-description"
                  />
                </FormControl>
                <FormDescription>
                  Describe how ConnectPlay will be used in this class
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex gap-4 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setLocation("/universities/dashboard/students")}
              data-testid="button-cancel"
            >
              Cancel
            </Button>
            <Button 
              type="submit"
              style={{ background: '#BB0000', borderColor: '#BB0000' }}
              data-testid="button-create-class-submit"
            >
              Create Class
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
