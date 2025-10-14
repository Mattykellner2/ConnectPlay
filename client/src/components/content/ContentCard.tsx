import { Star, Users, Play, Lock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

type Item = {
  id: string;
  title: string;
  description: string;
  type: "video" | "document" | "masterclass";
  priceType: "free" | "paid";
  price?: number;
  topic: "PR" | "Marketing" | "Operations" | "Partnerships";
  sponsored?: boolean;
  rating?: number;
  students?: number;
  cover?: string;
  creator: { name: string; title: string; avatar?: string };
};

export default function ContentCard({ item }: { item: Item }) {
  const { toast } = useToast();

  const badgeType = item.type === "video" ? "Video Lecture"
    : item.type === "document" ? "Document" : "Masterclass";

  const handleUnlock = () => {
    if (item.priceType === "free") {
      toast({
        title: "Access Granted!",
        description: `You now have access to "${item.title}". Enjoy learning!`,
      });
    } else {
      toast({
        title: "Checkout Required",
        description: `This content costs $${item.price}. In production, this would open a payment flow.`,
      });
    }
  };

  return (
    <article className="card">
      <img
        className="card-img"
        src={item.cover || "https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=1200&auto=format"}
        alt={item.title}
      />
      <div className="card-body">
        <div className="badges">
          <span className={`badge ${item.type === "video" ? "b-video" : item.type === "document" ? "b-doc" : "b-master"}`}>
            {badgeType}
          </span>
          {item.sponsored && <span className="badge b-spon">Sponsored</span>}
          {item.priceType === "free"
            ? <span className="badge b-free">Free</span>
            : <span className="badge b-price" data-testid={`price-${item.id}`}>${item.price}</span>}
        </div>

        <div className="card-title" data-testid={`title-${item.id}`}>{item.title}</div>
        <div className="card-desc">{item.description}</div>

        <div className="creator">
          <img
            src={item.creator.avatar || "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=300&auto=format"}
            alt={item.creator.name}
          />
          <div>
            <div style={{ fontWeight: 700 }}>{item.creator.name}</div>
            <div className="meta">{item.creator.title}</div>
          </div>
        </div>

        <div className="stats">
          {typeof item.rating === "number" && (
            <div data-testid={`rating-${item.id}`}>
              <Star className="w-4 h-4 inline text-amber-500 fill-amber-500" /> {item.rating.toFixed(1)}
            </div>
          )}
          {typeof item.students === "number" && (
            <div data-testid={`students-${item.id}`}>
              <Users className="w-4 h-4 inline" /> {item.students.toLocaleString()} students
            </div>
          )}
        </div>
      </div>

      <div className="card-foot">
        {item.priceType === "free" ? (
          <button
            className="cta free"
            onClick={handleUnlock}
            data-testid={`button-access-${item.id}`}
          >
            <Play className="w-4 h-4 inline mr-1" />
            Access Free
          </button>
        ) : (
          <button
            className="cta"
            onClick={handleUnlock}
            data-testid={`button-unlock-${item.id}`}
          >
            <Lock className="w-4 h-4 inline mr-1" />
            Unlock for ${item.price}
          </button>
        )}
      </div>
    </article>
  );
}
