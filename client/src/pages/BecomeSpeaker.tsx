import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { insertProfessionalApplicationSchema, type InsertProfessionalApplication } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { CheckCircle2, Linkedin } from "lucide-react";
import { z } from "zod";

export default function BecomeSpeaker() {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const { toast } = useToast();

  const form = useForm<InsertProfessionalApplication>({
    resolver: zodResolver(insertProfessionalApplicationSchema),
    defaultValues: {
      name: "",
      email: "",
      jobTitle: "",
      company: "",
      industry: "",
      location: "",
      bio: "",
      topics: [],
      formats: [],
      feeStructure: "",
    },
  });

  const submitMutation = useMutation({
    mutationFn: (data: InsertProfessionalApplication) =>
      apiRequest("/api/professional-applications", {
        method: "POST",
        body: JSON.stringify(data),
      }),
    onSuccess: () => {
      setSubmitted(true);
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const handleLinkedInQuickSetup = () => {
    console.log('LinkedIn Quick Setup clicked');
    toast({
      title: "LinkedIn Quick Setup",
      description: "This feature will autofill your profile from LinkedIn in the full version.",
    });
  };

  if (submitted) {
    return (
      <div className="min-h-screen">
        <Navigation />
        <div className="pt-20 max-w-2xl mx-auto px-6 py-16">
          <div className="text-center space-y-6">
            <CheckCircle2 className="h-16 w-16 text-green-500 mx-auto" data-testid="icon-success" />
            <h1 className="text-3xl font-bold">Application Submitted!</h1>
            <p className="text-lg text-muted-foreground">
              Thank you for applying to become a speaker on ConnectPlay. We'll review your application and get back to you within 3-5 business days.
            </p>
            <div className="flex gap-4 justify-center">
              <Button variant="outline" onClick={() => window.location.href = "/"} data-testid="button-return-home">
                Return Home
              </Button>
              <Button onClick={() => window.location.href = "/speaker-dashboard"} data-testid="button-preview-dashboard">
                Preview Dashboard
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navigation />
      <div className="pt-20">
        <section className="max-w-3xl mx-auto px-6 py-16">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-4">Become a Speaker</h1>
            <div className="flex gap-2 mb-6">
              {[1, 2, 3].map((s) => (
                <div
                  key={s}
                  className={`h-2 flex-1 rounded-full ${
                    s <= step ? 'bg-primary' : 'bg-muted'
                  }`}
                  data-testid={`progress-step-${s}`}
                />
              ))}
            </div>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit((data) => submitMutation.mutate(data))} className="space-y-6">
              {step === 1 && (
                <>
                  <h2 className="text-2xl font-semibold mb-4">Basic Information</h2>
                  
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full border-[#0077B5] text-[#0077B5] hover:bg-[#0077B5]/10"
                    onClick={handleLinkedInQuickSetup}
                    data-testid="button-linkedin-setup"
                  >
                    <Linkedin className="mr-2 h-4 w-4" />
                    Quick Setup with LinkedIn
                  </Button>

                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <span className="w-full border-t" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                      <span className="bg-background px-2 text-muted-foreground">Or fill manually</span>
                    </div>
                  </div>

                  <FormField
                    control={form.control}
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
                    control={form.control}
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

                  <div className="grid md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="jobTitle"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Job Title</FormLabel>
                          <FormControl>
                            <Input {...field} data-testid="input-job-title" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="company"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Company</FormLabel>
                          <FormControl>
                            <Input {...field} data-testid="input-company" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="industry"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Industry</FormLabel>
                          <FormControl>
                            <Input {...field} data-testid="input-industry" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="location"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Location</FormLabel>
                          <FormControl>
                            <Input {...field} data-testid="input-location" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="bio"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Professional Bio</FormLabel>
                        <FormControl>
                          <Textarea {...field} rows={4} data-testid="textarea-bio" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button type="button" onClick={() => setStep(2)} className="w-full" data-testid="button-next-step-1">
                    Next: Speaking Details
                  </Button>
                </>
              )}

              {step === 2 && (
                <>
                  <h2 className="text-2xl font-semibold mb-4">Speaking Details</h2>

                  <FormField
                    control={form.control}
                    name="topics"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Speaking Topics</FormLabel>
                        <FormDescription>Select all that apply</FormDescription>
                        <div className="space-y-2">
                          {['Leadership', 'Technology', 'Entrepreneurship', 'Marketing', 'Finance', 'Healthcare'].map((topic) => (
                            <div key={topic} className="flex items-center space-x-2">
                              <Checkbox
                                checked={field.value?.includes(topic)}
                                onCheckedChange={(checked) => {
                                  const current = field.value || [];
                                  if (checked) {
                                    field.onChange([...current, topic]);
                                  } else {
                                    field.onChange(current.filter((t) => t !== topic));
                                  }
                                }}
                                data-testid={`checkbox-topic-${topic.toLowerCase()}`}
                              />
                              <label className="text-sm">{topic}</label>
                            </div>
                          ))}
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="formats"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Speaking Formats</FormLabel>
                        <FormDescription>Select all that apply</FormDescription>
                        <div className="space-y-2">
                          {['Virtual', 'In-Person', 'Hybrid', 'Workshops', 'Panel Discussions'].map((format) => (
                            <div key={format} className="flex items-center space-x-2">
                              <Checkbox
                                checked={field.value?.includes(format)}
                                onCheckedChange={(checked) => {
                                  const current = field.value || [];
                                  if (checked) {
                                    field.onChange([...current, format]);
                                  } else {
                                    field.onChange(current.filter((f) => f !== format));
                                  }
                                }}
                                data-testid={`checkbox-format-${format.toLowerCase().replace(/\s+/g, '-')}`}
                              />
                              <label className="text-sm">{format}</label>
                            </div>
                          ))}
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="feeStructure"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Fee Structure</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger data-testid="select-fee-structure">
                              <SelectValue placeholder="Select fee structure" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="pro-bono">Pro Bono</SelectItem>
                            <SelectItem value="standard">Standard Rate ($500-$1,000)</SelectItem>
                            <SelectItem value="premium">Premium Rate ($1,000-$2,500)</SelectItem>
                            <SelectItem value="enterprise">Enterprise Rate ($2,500+)</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="flex gap-4">
                    <Button type="button" variant="outline" onClick={() => setStep(1)} className="flex-1" data-testid="button-back">
                      Back
                    </Button>
                    <Button type="button" onClick={() => setStep(3)} className="flex-1" data-testid="button-next-step-2">
                      Next: Review
                    </Button>
                  </div>
                </>
              )}

              {step === 3 && (
                <>
                  <h2 className="text-2xl font-semibold mb-4">Review & Submit</h2>
                  
                  <div className="space-y-4 bg-muted/30 p-6 rounded-lg">
                    <div>
                      <h3 className="font-semibold mb-2">Basic Information</h3>
                      <p className="text-sm text-muted-foreground">
                        {form.getValues('name')} - {form.getValues('jobTitle')} at {form.getValues('company')}
                      </p>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">Speaking Topics</h3>
                      <p className="text-sm text-muted-foreground">
                        {form.getValues('topics')?.join(', ') || 'None selected'}
                      </p>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">Speaking Formats</h3>
                      <p className="text-sm text-muted-foreground">
                        {form.getValues('formats')?.join(', ') || 'None selected'}
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <Button type="button" variant="outline" onClick={() => setStep(2)} className="flex-1" data-testid="button-back-to-step-2">
                      Back
                    </Button>
                    <Button 
                      type="submit" 
                      className="flex-1"
                      disabled={submitMutation.isPending}
                      data-testid="button-submit"
                    >
                      {submitMutation.isPending ? "Submitting..." : "Submit Application"}
                    </Button>
                  </div>
                </>
              )}
            </form>
          </Form>
        </section>
      </div>
    </div>
  );
}
