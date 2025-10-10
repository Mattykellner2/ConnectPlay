import { useState } from "react";
import Navigation from "@/components/Navigation";
import MetricCard from "@/components/MetricCard";
import ContentLibraryCard from "@/components/ContentLibraryCard";
import { Users, BookOpen, Calendar, Award } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function StudentDashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const [speakerFilter, setSpeakerFilter] = useState<'upcoming' | 'past'>('upcoming');

  const mockContent = [
    { id: 1, title: "Leadership in Tech", description: "Essential leadership skills for technology professionals", type: "Course", price: 49.99 },
    { id: 2, title: "Data Science Fundamentals", description: "Introduction to data science and analytics", type: "Workshop", price: 29.99 },
  ];

  return (
    <div className="min-h-screen">
      <Navigation />
      <div className="pt-20">
        <div className="bg-gradient-to-r from-[hsl(var(--gradient-student))] to-[hsl(var(--gradient-professional))] text-white py-12">
          <div className="max-w-7xl mx-auto px-6">
            <h1 className="text-3xl font-bold mb-2">Welcome back, Alex Johnson</h1>
            <p className="text-lg text-white/90">Business Analytics • Class of 2025</p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <MetricCard icon={Users} label="Speakers Connected" value="12" iconColor="text-[hsl(var(--chart-5))]" />
            <MetricCard icon={BookOpen} label="Content Purchased" value="8" iconColor="text-[hsl(var(--chart-5))]" />
            <MetricCard icon={Calendar} label="Events Attended" value="5" iconColor="text-[hsl(var(--chart-5))]" />
            <MetricCard icon={Award} label="Certificates Earned" value="3" iconColor="text-[hsl(var(--chart-5))]" />
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-6">
              <TabsTrigger value="overview" data-testid="tab-overview">Overview</TabsTrigger>
              <TabsTrigger value="speakers" data-testid="tab-speakers">My Speakers</TabsTrigger>
              <TabsTrigger value="library" data-testid="tab-library">Content Library</TabsTrigger>
              <TabsTrigger value="events" data-testid="tab-events">Events Calendar</TabsTrigger>
              <TabsTrigger value="connect" data-testid="tab-connect">Speaker Connect</TabsTrigger>
            </TabsList>

            <TabsContent value="overview">
              <div className="grid gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Upcoming Events</CardTitle>
                    <CardDescription>Your scheduled events and workshops</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 border rounded-lg hover-elevate" data-testid="upcoming-event-1">
                        <div>
                          <p className="font-medium">AI in Business - Dr. Sarah Johnson</p>
                          <p className="text-sm text-muted-foreground">Virtual Workshop</p>
                        </div>
                        <span className="text-sm text-muted-foreground">Tomorrow, 2 PM</span>
                      </div>
                      <div className="flex items-center justify-between p-4 border rounded-lg hover-elevate" data-testid="upcoming-event-2">
                        <div>
                          <p className="font-medium">Career Development Panel</p>
                          <p className="text-sm text-muted-foreground">Lecture Hall B</p>
                        </div>
                        <span className="text-sm text-muted-foreground">Mar 15, 3 PM</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="speakers">
              <Card>
                <CardHeader>
                  <CardTitle>My Speakers</CardTitle>
                  <CardDescription>Manage your speaker connections</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <Input placeholder="Search by name or organization..." className="flex-1" data-testid="input-search-speakers" />
                      <div className="flex gap-2">
                        <Button 
                          variant={speakerFilter === 'upcoming' ? 'default' : 'outline'}
                          onClick={() => setSpeakerFilter('upcoming')}
                          data-testid="button-filter-upcoming"
                        >
                          Upcoming
                        </Button>
                        <Button 
                          variant={speakerFilter === 'past' ? 'default' : 'outline'}
                          onClick={() => setSpeakerFilter('past')}
                          data-testid="button-filter-past"
                        >
                          Past Speakers
                        </Button>
                      </div>
                    </div>
                    <p className="text-muted-foreground text-center py-8">
                      {speakerFilter === 'upcoming' ? 'No upcoming speakers' : 'No past speakers'}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="library">
              <Card>
                <CardHeader>
                  <CardTitle>Content Library</CardTitle>
                  <CardDescription>Browse and purchase educational content</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="mb-6">
                    <Input placeholder="Search content..." data-testid="input-search-content" />
                  </div>
                  <div className="grid md:grid-cols-2 gap-6">
                    {mockContent.map((content) => (
                      <ContentLibraryCard
                        key={content.id}
                        {...content}
                        onPurchase={() => console.log('Purchase:', content.title)}
                      />
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="events">
              <Card>
                <CardHeader>
                  <CardTitle>Events Calendar</CardTitle>
                  <CardDescription>View all scheduled events and workshops</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">Calendar view coming soon...</p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="connect">
              <Card>
                <CardHeader>
                  <CardTitle>Speaker Connect</CardTitle>
                  <CardDescription>Discover and connect with industry professionals</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">Speaker directory coming soon...</p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
