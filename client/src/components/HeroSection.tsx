import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative min-h-[600px] flex items-center justify-center bg-gradient-to-br from-[hsl(var(--gradient-university))] to-[hsl(var(--gradient-professional))] text-white">
      <div className="absolute inset-0 bg-black/40" />
      
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <h1 className="text-5xl md:text-6xl font-bold mb-6 tracking-tight">
          Bridge Universities, Professionals & Students
        </h1>
        <p className="text-xl md:text-2xl mb-8 text-white/90">
          ConnectPlay creates seamless connections between educational institutions, 
          industry experts, and students through verified speakers, curated content, 
          and professional development experiences.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <Button 
            variant="outline" 
            size="lg" 
            className="bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20"
            data-testid="button-get-started"
          >
            Get Started <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
          <Button 
            variant="outline" 
            size="lg" 
            className="bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20"
            data-testid="button-learn-more"
          >
            Learn More
          </Button>
        </div>
      </div>
    </section>
  );
}
