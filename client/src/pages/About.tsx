import Navigation from "@/components/Navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Building2, Briefcase, GraduationCap } from "lucide-react";

export default function About() {
  return (
    <div className="min-h-screen">
      <Navigation />
      <div className="pt-20">
        <section className="max-w-7xl mx-auto px-6 py-16">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">About ConnectPlay</h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Bridging the gap between education and industry through meaningful connections
            </p>
          </div>

          <div className="max-w-3xl mx-auto mb-16">
            <p className="text-lg mb-6">
              ConnectPlay is a three-sided platform designed to create seamless connections between 
              universities, industry professionals, and students. We believe that real-world expertise 
              should be accessible to every student, and that professionals should have a structured 
              way to share their knowledge and build their personal brand.
            </p>
            <p className="text-lg">
              Our platform enables universities to provide their students with verified guest speakers, 
              curated educational content, and professional development experiences—all managed through 
              a single, easy-to-use system.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <Building2 className="h-12 w-12 text-primary mb-4" />
                <CardTitle>For Universities</CardTitle>
                <CardDescription>
                  Scalable access to real-world experts with comprehensive analytics and reporting
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <Briefcase className="h-12 w-12 text-primary mb-4" />
                <CardTitle>For Professionals</CardTitle>
                <CardDescription>
                  Structured platform to mentor, speak, and monetize your expertise
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <GraduationCap className="h-12 w-12 text-primary mb-4" />
                <CardTitle>For Students</CardTitle>
                <CardDescription>
                  Secure access to verified industry experts and exclusive content
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </section>
      </div>
    </div>
  );
}
