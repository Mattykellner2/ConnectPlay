import { useState } from "react";
import Navigation from "@/components/Navigation";
import MetricCard from "@/components/MetricCard";
import { Users, UserCheck, Calendar, TrendingUp } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function UniversityDashboard() {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="min-h-screen">
      <Navigation />
      <div className="pt-20">
        <div className="bg-gradient-to-r from-[hsl(var(--gradient-university))] to-[hsl(var(--gradient-professional))] text-white py-12">
          <div className="max-w-7xl mx-auto px-6">
            <h1 className="text-3xl font-bold mb-2">The Ohio State University — Fisher College of Business</h1>
            <p className="text-lg text-white/90">Welcome back, Dean Anderson</p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <MetricCard icon={Users} label="Active Students" value="1,248" />
            <MetricCard icon={UserCheck} label="Speakers Booked" value="24" />
            <MetricCard icon={Calendar} label="Events This Month" value="8" />
            <MetricCard icon={TrendingUp} label="Engagement Rate" value="94%" />
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-6">
              <TabsTrigger value="overview" data-testid="tab-overview">Overview</TabsTrigger>
              <TabsTrigger value="students" data-testid="tab-students">Students</TabsTrigger>
              <TabsTrigger value="speakers" data-testid="tab-speakers">Speakers</TabsTrigger>
              <TabsTrigger value="reports" data-testid="tab-reports">Reports</TabsTrigger>
              <TabsTrigger value="settings" data-testid="tab-settings">Settings</TabsTrigger>
            </TabsList>

            <TabsContent value="overview">
              <div className="grid gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Activity</CardTitle>
                    <CardDescription>Latest events and engagement metrics</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 border rounded-lg hover-elevate" data-testid="activity-item-1">
                        <div>
                          <p className="font-medium">Leadership Workshop with Sarah Chen</p>
                          <p className="text-sm text-muted-foreground">145 students attended</p>
                        </div>
                        <span className="text-sm text-muted-foreground">2 days ago</span>
                      </div>
                      <div className="flex items-center justify-between p-4 border rounded-lg hover-elevate" data-testid="activity-item-2">
                        <div>
                          <p className="font-medium">Tech Career Panel Discussion</p>
                          <p className="text-sm text-muted-foreground">98 students attended</p>
                        </div>
                        <span className="text-sm text-muted-foreground">5 days ago</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="students">
              <Card>
                <CardHeader>
                  <CardTitle>Student Management</CardTitle>
                  <CardDescription>Manage student access and track engagement</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">Student management features coming soon...</p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="speakers">
              <Card>
                <CardHeader>
                  <CardTitle>Speaker Directory</CardTitle>
                  <CardDescription>Browse and book industry professionals</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">Speaker directory coming soon...</p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="reports">
              <Card>
                <CardHeader>
                  <CardTitle>Analytics & Reports</CardTitle>
                  <CardDescription>View detailed engagement analytics</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">Analytics dashboard coming soon...</p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="settings">
              <Card>
                <CardHeader>
                  <CardTitle>Account Settings</CardTitle>
                  <CardDescription>Manage your partnership settings</CardDescription>
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
