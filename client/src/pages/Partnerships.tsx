import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { insertUniversityApplicationSchema, type InsertUniversityApplication } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { CheckCircle2 } from "lucide-react";

export default function Partnerships() {
  const [submitted, setSubmitted] = useState(false);
  const { toast } = useToast();

  const form = useForm<InsertUniversityApplication>({
    resolver: zodResolver(insertUniversityApplicationSchema),
    defaultValues: {
      fullName: "",
      title: "",
      universityName: "",
      email: "",
      programSize: "",
      goals: "",
      timeline: "",
    },
  });

  const submitMutation = useMutation({
    mutationFn: (data: InsertUniversityApplication) =>
      apiRequest("POST", "/api/university-applications", data),
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

  if (submitted) {
    return (
      <div className="min-h-screen">
        <Navigation />
        <div className="pt-20 max-w-2xl mx-auto px-6 py-16">
          <div className="text-center space-y-6">
            <CheckCircle2 className="h-16 w-16 text-green-500 mx-auto" data-testid="icon-success" />
            <h1 className="text-3xl font-bold">Thank You!</h1>
            <p className="text-lg text-muted-foreground">
              We've received your partnership request. Our team will review your application and get back to you within 2 business days.
            </p>
            <Button 
              onClick={() => window.location.href = "/universities/partner-dashboard"} 
              data-testid="button-preview-dashboard"
              style={{ background: '#2563EB', borderColor: '#2563EB' }}
            >
              Continue to Preview Dashboard
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
        <section className="max-w-7xl mx-auto px-6 py-16">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">University Partnerships</h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Enable scalable access to real-world experts and enhance your students' 
              educational experience with industry-leading professionals
            </p>
          </div>

          <div id="demo-form" className="max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold mb-6">Request Partnership Demo</h2>
            <Form {...form}>
              <form onSubmit={form.handleSubmit((data) => submitMutation.mutate(data))} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="fullName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                          <Input {...field} data-testid="input-full-name" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Title</FormLabel>
                        <FormControl>
                          <Input {...field} data-testid="input-title" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="universityName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>University Name</FormLabel>
                      <FormControl>
                        <Input {...field} data-testid="input-university-name" />
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
                      <FormLabel>Email Address (.edu required)</FormLabel>
                      <FormControl>
                        <Input type="email" {...field} data-testid="input-email" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="programSize"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Program Size</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger data-testid="select-program-size">
                            <SelectValue placeholder="Select size" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="1-500">1-500 students</SelectItem>
                          <SelectItem value="501-1000">501-1,000 students</SelectItem>
                          <SelectItem value="1001-5000">1,001-5,000 students</SelectItem>
                          <SelectItem value="5000+">5,000+ students</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="goals"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Goals and Objectives</FormLabel>
                      <FormControl>
                        <Textarea {...field} rows={4} data-testid="textarea-goals" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="timeline"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Implementation Timeline</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger data-testid="select-timeline">
                            <SelectValue placeholder="Select timeline" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="immediate">Immediate (1-2 weeks)</SelectItem>
                          <SelectItem value="short">Short-term (1-3 months)</SelectItem>
                          <SelectItem value="medium">Medium-term (3-6 months)</SelectItem>
                          <SelectItem value="long">Long-term (6+ months)</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button 
                  type="submit" 
                  className="w-full" 
                  style={{ background: '#2563EB', borderColor: '#2563EB' }}
                  disabled={submitMutation.isPending}
                  data-testid="button-submit"
                >
                  {submitMutation.isPending ? "Submitting..." : "Submit Request"}
                </Button>
              </form>
            </Form>
          </div>
        </section>
      </div>
    </div>
  );
}
