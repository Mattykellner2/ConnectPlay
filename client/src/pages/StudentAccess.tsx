import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { insertStudentProfileSchema, type InsertStudentProfile } from "@shared/schema";
import { CheckCircle2 } from "lucide-react";
import { z } from "zod";

const accessCodeSchema = z.object({
  code: z.string().min(1, "Access code is required"),
});

export default function StudentAccess() {
  const [step, setStep] = useState<'code' | 'profile' | 'complete'>('code');
  const [accessCode, setAccessCode] = useState("");

  const codeForm = useForm<z.infer<typeof accessCodeSchema>>({
    resolver: zodResolver(accessCodeSchema),
    defaultValues: { code: "" },
  });

  const profileForm = useForm<InsertStudentProfile>({
    resolver: zodResolver(insertStudentProfileSchema),
    defaultValues: {
      name: "",
      email: "",
      major: "",
      graduationYear: "",
      studentId: "",
      accessCode: "",
    },
  });

  const handleCodeSubmit = (data: z.infer<typeof accessCodeSchema>) => {
    console.log('Validating access code:', data.code);
    setAccessCode(data.code);
    profileForm.setValue('accessCode', data.code);
    setStep('profile');
  };

  const handleProfileSubmit = (data: InsertStudentProfile) => {
    console.log('Creating student profile:', data);
    setStep('complete');
  };

  if (step === 'complete') {
    return (
      <div className="min-h-screen">
        <Navigation />
        <div className="pt-20 max-w-2xl mx-auto px-6 py-16">
          <div className="text-center space-y-6">
            <CheckCircle2 className="h-16 w-16 text-green-500 mx-auto" data-testid="icon-success" />
            <h1 className="text-3xl font-bold">Welcome to ConnectPlay!</h1>
            <p className="text-lg text-muted-foreground">
              Your profile has been created successfully. You can now access all the features available through your institution.
            </p>
            <Button onClick={() => window.location.href = "/student-dashboard"} data-testid="button-access-dashboard">
              Access Dashboard
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navigation />
      <div className="pt-20">
        <section className="max-w-md mx-auto px-6 py-16">
          {step === 'code' && (
            <>
              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold mb-4">Student Access</h1>
                <p className="text-muted-foreground">
                  Enter the access code provided by your university
                </p>
              </div>

              <Form {...codeForm}>
                <form onSubmit={codeForm.handleSubmit(handleCodeSubmit)} className="space-y-6">
                  <FormField
                    control={codeForm.control}
                    name="code"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Access Code</FormLabel>
                        <FormControl>
                          <Input 
                            {...field} 
                            className="text-center text-2xl font-mono tracking-wider"
                            placeholder="XXXX-XXXX-XXXX"
                            data-testid="input-access-code"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button type="submit" className="w-full" data-testid="button-verify-code">
                    Verify Code
                  </Button>
                </form>
              </Form>
            </>
          )}

          {step === 'profile' && (
            <>
              <div className="text-center mb-8">
                <CheckCircle2 className="h-12 w-12 text-green-500 mx-auto mb-4" />
                <h1 className="text-3xl font-bold mb-4">Complete Your Profile</h1>
                <p className="text-muted-foreground">
                  Tell us a bit about yourself
                </p>
              </div>

              <Form {...profileForm}>
                <form onSubmit={profileForm.handleSubmit(handleProfileSubmit)} className="space-y-6">
                  <FormField
                    control={profileForm.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                          <Input {...field} data-testid="input-name" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={profileForm.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input type="email" {...field} data-testid="input-email" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={profileForm.control}
                    name="major"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Major</FormLabel>
                        <FormControl>
                          <Input {...field} data-testid="input-major" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={profileForm.control}
                    name="graduationYear"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Graduation Year</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="2025" data-testid="input-graduation-year" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={profileForm.control}
                    name="studentId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Student ID</FormLabel>
                        <FormControl>
                          <Input {...field} data-testid="input-student-id" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button type="submit" className="w-full" data-testid="button-complete-profile">
                    Complete Profile
                  </Button>
                </form>
              </Form>
            </>
          )}
        </section>
      </div>
    </div>
  );
}
