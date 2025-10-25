import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BookSpeakerDialog } from "@/components/BookSpeakerDialog";
import { BookOpen, Users, Calendar, TrendingUp, Plus, UserPlus } from "lucide-react";
import { useLocation } from "wouter";

// Mock professor data
const professorData = {
  name: "Dr. Jennifer Martinez",
  department: "College of Business",
  universityName: "Ohio State University",
  classes: [
    { id: "1", name: "Business Analytics 101", students: 45, term: "Fall 2024" },
    { id: "2", name: "Marketing Strategy", students: 32, term: "Fall 2024" },
    { id: "3", name: "Operations Management", students: 28, term: "Fall 2024" },
  ],
  speakers: [
    { id: "1", name: "Dr. Emily Carter", company: "Google", topic: "AI & Marketing" },
    { id: "2", name: "Marcus Johnson", company: "Microsoft", topic: "Data Analytics" },
    { id: "3", name: "Sarah Chen", company: "Amazon", topic: "E-commerce Strategy" },
    { id: "4", name: "James Wilson", company: "Meta", topic: "Social Media Analytics" },
    { id: "5", name: "Dr. Patricia Lee", company: "IBM", topic: "Business Intelligence" },
  ],
  analytics: {
    totalConnections: 12,
    totalEventsHosted: 4,
    engagementThisMonth: 87,
  },
};

export default function ProfessorDashboard() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white dark:from-purple-950 dark:to-gray-900">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-purple-800 text-white p-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold mb-2" data-testid="heading-professor-name">
            Welcome back, {professorData.name.split(' ').slice(0, 2).join(' ')}!
          </h1>
          <p className="text-purple-100">
            {professorData.department} · {professorData.universityName}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6 space-y-6">
        {/* Quick Stats */}
        <div className="grid md:grid-cols-4 gap-4">
          <Card data-testid="card-active-classes">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Classes</CardTitle>
              <BookOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{professorData.classes.length}</div>
              <p className="text-xs text-muted-foreground">
                {professorData.classes.reduce((sum, c) => sum + c.students, 0)} total students
              </p>
            </CardContent>
          </Card>

          <Card data-testid="card-speakers-connected">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Speakers Connected</CardTitle>
              <UserPlus className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{professorData.speakers.length}</div>
              <p className="text-xs text-muted-foreground">
                Industry professionals
              </p>
            </CardContent>
          </Card>

          <Card data-testid="card-events-hosted">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Events This Month</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{professorData.analytics.totalEventsHosted}</div>
              <p className="text-xs text-muted-foreground">
                Guest lectures & panels
              </p>
            </CardContent>
          </Card>

          <Card data-testid="card-student-engagement">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Engagement Score</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{professorData.analytics.engagementThisMonth}%</div>
              <p className="text-xs text-muted-foreground">
                Student participation
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* My Classes */}
          <Card data-testid="card-my-classes">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>My Classes</CardTitle>
                  <CardDescription>Manage your active courses</CardDescription>
                </div>
                <Button 
                  size="sm"
                  style={{ background: '#7C3AED', borderColor: '#7C3AED' }}
                  data-testid="button-add-class"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Class
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {professorData.classes.map((classItem) => (
                  <div 
                    key={classItem.id}
                    className="p-4 rounded-lg border hover-elevate"
                    data-testid={`class-item-${classItem.id}`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="font-medium">{classItem.name}</h4>
                        <div className="flex items-center gap-3 mt-1 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Users className="h-3 w-3" />
                            {classItem.students} students
                          </span>
                          <span>·</span>
                          <span>{classItem.term}</span>
                        </div>
                      </div>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        data-testid={`button-view-class-${classItem.id}`}
                      >
                        View
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Connected Speakers */}
          <Card data-testid="card-connected-speakers">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Connected Speakers</CardTitle>
                  <CardDescription>Industry professionals you work with</CardDescription>
                </div>
                <Button 
                  size="sm"
                  style={{ background: '#7C3AED', borderColor: '#7C3AED' }}
                  data-testid="button-invite-speaker"
                >
                  <UserPlus className="h-4 w-4 mr-2" />
                  Invite Speaker
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {professorData.speakers.slice(0, 5).map((speaker) => (
                  <div 
                    key={speaker.id}
                    className="flex items-center justify-between p-3 rounded-lg border hover-elevate"
                    data-testid={`speaker-item-${speaker.id}`}
                  >
                    <div className="flex-1">
                      <p className="font-medium">{speaker.name}</p>
                      <p className="text-sm text-muted-foreground">{speaker.company} · {speaker.topic}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">Connected</Badge>
                      <BookSpeakerDialog
                        professionalId={speaker.id}
                        professionalName={speaker.name}
                        professionalEmail={`${speaker.name.toLowerCase().replace(/[.\s]+/g, '.').replace(/^\.+|\.+$/g, '')}@${speaker.company.toLowerCase()}.com`}
                      >
                        <Button size="sm" variant="default" data-testid={`button-book-speaker-${speaker.id}`}>
                          <Calendar className="h-4 w-4 mr-1" />
                          Book
                        </Button>
                      </BookSpeakerDialog>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Student Engagement Analytics */}
        <Card data-testid="card-engagement-analytics">
          <CardHeader>
            <CardTitle>Student Engagement Analytics</CardTitle>
            <CardDescription>
              Track how your students are interacting with industry professionals
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">Total Connections</p>
                <p className="text-3xl font-bold">{professorData.analytics.totalConnections}</p>
                <p className="text-xs text-muted-foreground">Student-speaker connections made</p>
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">Content Views</p>
                <p className="text-3xl font-bold">248</p>
                <p className="text-xs text-muted-foreground">Video & article engagements</p>
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">Event Attendance</p>
                <p className="text-3xl font-bold">94%</p>
                <p className="text-xs text-muted-foreground">Average attendance rate</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-2 gap-4">
          <Button 
            variant="outline" 
            className="h-auto py-4"
            data-testid="button-view-class-analytics"
          >
            <div className="text-left">
              <p className="font-medium">View Class Analytics</p>
              <p className="text-sm text-muted-foreground">Detailed breakdown by class</p>
            </div>
          </Button>
          <Button 
            variant="outline" 
            className="h-auto py-4"
            data-testid="button-upcoming-events"
          >
            <div className="text-left">
              <p className="font-medium">Upcoming Events</p>
              <p className="text-sm text-muted-foreground">Scheduled guest lectures & panels</p>
            </div>
          </Button>
        </div>
      </div>
    </div>
  );
}
