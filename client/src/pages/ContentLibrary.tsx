import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import Sidebar from "@/components/dashboard/Sidebar";
import "../styles/content-library.css";
import "../styles/dashboard.css";
import FilterDropdown from "../components/content/FilterDropdown";
import ContentCard from "../components/content/ContentCard";

type Item = Parameters<typeof ContentCard>[0]["item"];

const SEED: Item[] = [
  {
    id: "1",
    title: "How to Break Into Sports PR (30-Min Primer)",
    description: "A concise walkthrough of resumes, outreach, and first 90 days.",
    type: "video",
    priceType: "paid",
    price: 29,
    topic: "PR",
    rating: 4.9,
    students: 215,
    creator: { name: "Jamie Rivera", title: "PR Director, Metro FC" },
    cover: "https://images.unsplash.com/photo-1492724441997-5dc865305da7?q=80&w=1200&auto=format"
  },
  {
    id: "2",
    title: "Sponsorship Outreach Email Pack (12 Templates)",
    description: "Cold outreach, warm intros, follow-ups, and post-meeting recaps.",
    type: "document",
    priceType: "paid",
    price: 19,
    topic: "Marketing",
    rating: 5.0,
    students: 431,
    creator: { name: "Alex Chen", title: "Sr. Partnerships Manager, City United" },
    cover: "https://images.unsplash.com/photo-1551033406-611cf9a28f67?q=80&w=1200&auto=format"
  },
  {
    id: "3",
    title: "Wilson Sporting Goods: The Future of Equipment",
    description: "Go behind the scenes at Wilson and see how we're innovating.",
    type: "video",
    priceType: "free",
    topic: "Partnerships",
    sponsored: true,
    rating: 4.8,
    students: 1250,
    creator: { name: "Rachel Kim", title: "Global Sports Marketing Director, Nike" },
    cover: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=1200&auto=format"
  },
  {
    id: "4",
    title: "Game-Day Communications Bootcamp (3 modules)",
    description: "Run of show, media coordination, crisis basics.",
    type: "masterclass",
    priceType: "paid",
    price: 79,
    topic: "Operations",
    rating: 4.8,
    students: 980,
    creator: { name: "Dana Brooks", title: "Comms Lead, FC Seattle" },
    cover: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=1200&auto=format"
  },
  {
    id: "5",
    title: "Digital Sports Marketing Masterclass",
    description: "Advanced strategies for digital campaigns in sports.",
    type: "masterclass",
    priceType: "paid",
    price: 89,
    topic: "Marketing",
    rating: 4.7,
    students: 640,
    creator: { name: "Tom Green", title: "Head of Growth, GoalCo" },
    cover: "https://images.unsplash.com/photo-1557800636-894a64c1696f?q=80&w=1200&auto=format"
  },
  {
    id: "6",
    title: "Crisis Communication Playbook",
    description: "Step-by-step guide for handling PR crises in professional sports.",
    type: "document",
    priceType: "free",
    topic: "PR",
    rating: 4.9,
    students: 1200,
    creator: { name: "Nora Patel", title: "Director of Comms, Titans" },
    cover: "https://images.unsplash.com/photo-1556157382-97eda2d62296?q=80&w=1200&auto=format"
  },
];

export default function ContentLibrary() {
  const [q, setQ] = useState("");
  const [type, setType] = useState<"all" | "video" | "document" | "masterclass">("all");
  const [price, setPrice] = useState<"all" | "free" | "paid">("all");
  const [topic, setTopic] = useState<"all" | "PR" | "Marketing" | "Operations" | "Partnerships">("all");

  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase();
    return SEED.filter(it => {
      const okType = type === "all" || it.type === type;
      const okPrice = price === "all" || it.priceType === price;
      const okTopic = topic === "all" || it.topic === topic;
      const okSearch = !term || (
        it.title.toLowerCase().includes(term) ||
        it.description.toLowerCase().includes(term) ||
        it.creator.name.toLowerCase().includes(term) ||
        it.creator.title.toLowerCase().includes(term)
      );
      return okType && okPrice && okTopic && okSearch;
    });
  }, [q, type, price, topic]);

  return (
    <div className="dashboard-shell">
      <Sidebar />
      <main className="main">
        <div className="cl-wrap">
          <h1 className="cl-title">Content Library</h1>
          <div className="cl-sub">Discover premium courses, templates, and insights from industry experts.</div>

          <div className="cl-toolbar">
            <div className="cl-search">
              <Search className="icon w-5 h-5" />
              <input
                type="text"
                placeholder="Search content, creators, or topics…"
                value={q}
                onChange={e => setQ(e.target.value)}
                aria-label="Search content"
                data-testid="input-search-content"
              />
            </div>

            <FilterDropdown
              label="All Types"
              value={type}
              onChange={v => setType(v as any)}
              options={[
                { label: "All Types", value: "all" },
                { label: "Video", value: "video" },
                { label: "PDF/Document", value: "document" },
                { label: "Masterclass", value: "masterclass" },
              ]}
            />

            <FilterDropdown
              label="All Prices"
              value={price}
              onChange={v => setPrice(v as any)}
              options={[
                { label: "All Prices", value: "all" },
                { label: "Free", value: "free" },
                { label: "Paid", value: "paid" },
              ]}
            />

            <FilterDropdown
              label="All Topics"
              value={topic}
              onChange={v => setTopic(v as any)}
              options={[
                { label: "All Topics", value: "all" },
                { label: "PR", value: "PR" },
                { label: "Marketing", value: "Marketing" },
                { label: "Operations", value: "Operations" },
                { label: "Partnerships", value: "Partnerships" },
              ]}
            />
          </div>

          <div className="cl-grid">
            {filtered.map(item => <ContentCard key={item.id} item={item} />)}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-12 text-muted-foreground">
              No content matches your search criteria. Try adjusting your filters.
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
