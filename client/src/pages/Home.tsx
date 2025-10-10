import { useLocation } from "wouter";
import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import UserTypeCard from "@/components/UserTypeCard";
import { Building2, Briefcase, GraduationCap } from "lucide-react";

export default function Home() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen">
      <Navigation />
      <div className="pt-20">
        <HeroSection />
        
        <section className="max-w-7xl mx-auto px-6 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Who We Serve</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              ConnectPlay creates value for everyone in the educational ecosystem
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <UserTypeCard
              icon={Building2}
              title="For Universities"
              description="Partner with ConnectPlay to provide your students with access to industry-leading professionals and curated content."
              buttonText="Explore Partnerships"
              onButtonClick={() => setLocation("/partnerships")}
            />
            <UserTypeCard
              icon={Briefcase}
              title="For Industry Professionals"
              description="Share your expertise, build your personal brand, and monetize your knowledge through speaking engagements and content."
              buttonText="Become a Speaker"
              onButtonClick={() => setLocation("/become-speaker")}
            />
            <UserTypeCard
              icon={GraduationCap}
              title="For Students"
              description="Access verified industry experts, exclusive content, and professional development opportunities through your institution."
              buttonText="Student Access"
              onButtonClick={() => setLocation("/student-access")}
            />
          </div>
        </section>
      </div>
    </div>
  );
}
