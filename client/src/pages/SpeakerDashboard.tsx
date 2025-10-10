import { useState } from "react";
import Navigation from "@/components/Navigation";
import MetricCard from "@/components/MetricCard";
import { DollarSign, ShoppingBag, Calendar, Star } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function SpeakerDashboard() {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="min-h-screen">
      <Navigation />
      <div className="pt-20">
        <div className="bg-[hsl(var(--gradient-professional))] text-white py-12">
          <div className="max-w-7xl mx-auto px-6">
            <h1 className="text-3xl font-bold mb-2">Welcome back, Dr. Emily Carter</h1>
            <p className="text-lg text-white/90">Senior Director, Global Partnerships at Nike</p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <MetricCard icon={DollarSign} label="Total Revenue" value="$12,450" iconColor="text-[hsl(var(--chart-3))]" />
            <MetricCard icon={ShoppingBag} label="Content Sales" value="89" iconColor="text-[hsl(var(--chart-3))]" />
            <MetricCard icon={Calendar} label="Speaking Events" value="15" iconColor="text-[hsl(var(--chart-3))]" />
            <MetricCard icon={Star} label="Average Rating" value="4.9" iconColor="text-[hsl(var(--chart-3))]" />
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-6">
              <TabsTrigger value="overview" data-testid="tab-overview">Overview</TabsTrigger>
              <TabsTrigger value="content" data-testid="tab-content">Content Library</TabsTrigger>
              <TabsTrigger value="bookings" data-testid="tab-bookings">Bookings</TabsTrigger>
              <TabsTrigger value="messages" data-testid="tab-messages">Messages</TabsTrigger>
              <TabsTrigger value="settings" data-testid="tab-settings">Settings</TabsTrigger>
            </TabsList>

            <TabsContent value="overview">
              <div className="grid gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Upcoming Events</CardTitle>
                    <CardDescription>Your scheduled speaking engagements</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 border rounded-lg hover-elevate" data-testid="event-item-1">
                        <div>
                          <p className="font-medium">Leadership Workshop - Stanford GSB</p>
                          <p className="text-sm text-muted-foreground">Virtual Event • 45 attendees expected</p>
                        </div>
                        <span className="text-sm text-muted-foreground">Mar 15, 2024</span>
                      </div>
                      <div className="flex items-center justify-between p-4 border rounded-lg hover-elevate" data-testid="event-item-2">
                        <div>
                          <p className="font-medium">Career Panel - MIT Sloan</p>
                          <p className="text-sm text-muted-foreground">In-Person • 120 attendees expected</p>
                        </div>
                        <span className="text-sm text-muted-foreground">Mar 22, 2024</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="content">
              <Card>
                <CardHeader>
                  <CardTitle>Your Content Library</CardTitle>
                  <CardDescription>Manage and create content for sale</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">Content management coming soon...</p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="bookings">
              <Card>
                <CardHeader>
                  <CardTitle>Booking Requests</CardTitle>
                  <CardDescription>Manage incoming speaking requests</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">Booking management coming soon...</p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="messages">
              <Card>
                <CardHeader>
                  <CardTitle>Messages</CardTitle>
                  <CardDescription>Communicate with universities and students</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">Messaging coming soon...</p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="settings">
              <Card>
                <CardHeader>
                  <CardTitle>Account Settings</CardTitle>
                  <CardDescription>Manage your speaker profile</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">Settings coming soon...</p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
