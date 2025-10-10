import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LucideIcon } from "lucide-react";

interface UserTypeCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  buttonText: string;
  onButtonClick: () => void;
}

export default function UserTypeCard({ 
  icon: Icon, 
  title, 
  description, 
  buttonText, 
  onButtonClick 
}: UserTypeCardProps) {
  return (
    <Card className="hover-elevate transition-all duration-300 hover:-translate-y-1 min-h-[280px] flex flex-col" data-testid={`card-${title.toLowerCase().replace(/\s+/g, '-')}`}>
      <CardHeader className="flex-1">
        <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
          <Icon className="h-6 w-6 text-primary" />
        </div>
        <CardTitle className="text-xl">{title}</CardTitle>
        <CardDescription className="text-base">{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <Button 
          className="w-full" 
          onClick={onButtonClick}
          data-testid={`button-${title.toLowerCase().replace(/\s+/g, '-')}`}
        >
          {buttonText}
        </Button>
      </CardContent>
    </Card>
  );
}
