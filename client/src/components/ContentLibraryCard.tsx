import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DollarSign } from "lucide-react";

interface ContentLibraryCardProps {
  title: string;
  description: string;
  type: string;
  price: number;
  thumbnail?: string;
  onPurchase: () => void;
}

export default function ContentLibraryCard({ 
  title, 
  description, 
  type, 
  price,
  thumbnail,
  onPurchase 
}: ContentLibraryCardProps) {
  return (
    <Card className="hover-elevate transition-all duration-300 hover:-translate-y-1" data-testid={`card-content-${title.toLowerCase().replace(/\s+/g, '-')}`}>
      {thumbnail && (
        <div className="aspect-video bg-muted relative overflow-hidden">
          <img src={thumbnail} alt={title} className="w-full h-full object-cover" />
        </div>
      )}
      <CardHeader>
        <div className="flex items-start justify-between gap-2 mb-2">
          <Badge variant="secondary" data-testid="badge-content-type">{type}</Badge>
          <div className="flex items-center gap-1 text-primary font-mono font-medium">
            <DollarSign className="h-4 w-4" />
            <span data-testid="text-price">{price.toFixed(2)}</span>
          </div>
        </div>
        <CardTitle className="text-lg">{title}</CardTitle>
        <CardDescription className="line-clamp-2">{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <Button 
          className="w-full" 
          onClick={onPurchase}
          data-testid="button-purchase"
        >
          Purchase
        </Button>
      </CardContent>
    </Card>
  );
}
