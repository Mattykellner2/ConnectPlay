import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

interface PartnershipTierCardProps {
  title: string;
  description: string;
  features: string[];
  isPopular?: boolean;
  onSelect: () => void;
}

export default function PartnershipTierCard({ 
  title, 
  description, 
  features, 
  isPopular = false,
  onSelect 
}: PartnershipTierCardProps) {
  return (
    <Card 
      className={`relative hover-elevate transition-all duration-300 hover:-translate-y-1 min-h-[400px] flex flex-col ${
        isPopular ? 'border-primary' : ''
      }`}
      data-testid={`card-tier-${title.toLowerCase().replace(/\s+/g, '-')}`}
    >
      {isPopular && (
        <Badge 
          className="absolute -top-3 right-4 bg-[hsl(var(--chart-4))] text-black"
          data-testid="badge-most-popular"
        >
          Most Popular
        </Badge>
      )}
      <CardHeader>
        <CardTitle className="text-2xl">{title}</CardTitle>
        <CardDescription className="text-base">{description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col">
        <ul className="space-y-3 mb-6 flex-1">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start gap-2" data-testid={`feature-${index}`}>
              <Check className="h-5 w-5 text-primary shrink-0 mt-0.5" />
              <span className="text-sm">{feature}</span>
            </li>
          ))}
        </ul>
        <Button 
          className="w-full" 
          variant={isPopular ? "default" : "outline"}
          onClick={onSelect}
          data-testid={`button-select-${title.toLowerCase().replace(/\s+/g, '-')}`}
        >
          Select Plan
        </Button>
      </CardContent>
    </Card>
  );
}
