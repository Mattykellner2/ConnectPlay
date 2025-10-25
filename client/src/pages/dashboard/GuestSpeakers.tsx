import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BookSpeakerDialog } from "@/components/BookSpeakerDialog";
import { Building, MapPin, Calendar, Search } from "lucide-react";

// Sample speaker data - will be replaced with real API data
const sampleSpeakers = [
  {
    id: "spk-1",
    name: "Dr. Emily Carter",
    company: "Google",
    title: "Head of AI Research",
    location: "San Francisco, CA",
    expertise: ["Artificial Intelligence", "Machine Learning", "Data Science"],
    email: "emily.carter@google.com",
    openToSpeaking: true,
    openToNetworking: true,
  },
  {
    id: "spk-2",
    name: "Marcus Johnson",
    company: "Microsoft",
    title: "Senior Product Manager",
    location: "Seattle, WA",
    expertise: ["Product Strategy", "Cloud Computing", "DevOps"],
    email: "marcus.johnson@microsoft.com",
    openToSpeaking: true,
    openToNetworking: false,
  },
  {
    id: "spk-3",
    name: "Sarah Chen",
    company: "Amazon",
    title: "VP of E-commerce",
    location: "New York, NY",
    expertise: ["E-commerce", "Digital Marketing", "Customer Experience"],
    email: "sarah.chen@amazon.com",
    openToSpeaking: true,
    openToNetworking: true,
  },
  {
    id: "spk-4",
    name: "James Wilson",
    company: "Meta",
    title: "Director of Analytics",
    location: "Menlo Park, CA",
    expertise: ["Social Media", "Analytics", "User Research"],
    email: "james.wilson@meta.com",
    openToSpeaking: true,
    openToNetworking: false,
  },
  {
    id: "spk-5",
    name: "Dr. Patricia Lee",
    company: "IBM",
    title: "Chief Data Scientist",
    location: "Austin, TX",
    expertise: ["Business Intelligence", "Big Data", "AI Strategy"],
    email: "patricia.lee@ibm.com",
    openToSpeaking: true,
    openToNetworking: true,
  },
];

export default function GuestSpeakers() {
  return (
    <div className="panel" style={{ maxWidth: "100%" }}>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold" data-testid="heading-guest-speakers">Guest Speakers Directory</h2>
          <p className="text-muted-foreground mt-1">
            Browse and book industry professionals for your classes
          </p>
        </div>
        <Button variant="outline" data-testid="button-search-speakers">
          <Search className="h-4 w-4 mr-2" />
          Search
        </Button>
      </div>

      <div className="grid gap-4">
        {sampleSpeakers.map((speaker) => (
          <Card key={speaker.id} data-testid={`speaker-card-${speaker.id}`} className="hover-elevate">
            <CardHeader>
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <CardTitle className="text-xl">{speaker.name}</CardTitle>
                    {speaker.openToSpeaking && (
                      <Badge variant="default" className="bg-purple-600" data-testid={`badge-speaking-${speaker.id}`}>
                        Open to Speaking
                      </Badge>
                    )}
                    {speaker.openToNetworking && (
                      <Badge variant="default" className="bg-green-600" data-testid={`badge-networking-${speaker.id}`}>
                        Open to Networking
                      </Badge>
                    )}
                  </div>
                  <CardDescription className="flex flex-col gap-1">
                    <span className="flex items-center gap-2">
                      <Building className="h-4 w-4" />
                      {speaker.title} at {speaker.company}
                    </span>
                    <span className="flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      {speaker.location}
                    </span>
                  </CardDescription>
                </div>
                <BookSpeakerDialog
                  professionalId={speaker.id}
                  professionalName={speaker.name}
                  professionalEmail={speaker.email}
                >
                  <Button data-testid={`button-book-speaker-${speaker.id}`}>
                    <Calendar className="h-4 w-4 mr-2" />
                    Book Speaker
                  </Button>
                </BookSpeakerDialog>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {speaker.expertise.map((skill, index) => (
                  <Badge
                    key={index}
                    variant="outline"
                    data-testid={`skill-${speaker.id}-${index}`}
                  >
                    {skill}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
