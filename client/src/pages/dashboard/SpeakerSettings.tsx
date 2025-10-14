import { useState } from "react";
import { useLocation } from "wouter";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Link2, RefreshCw, CheckCircle2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function SpeakerSettings() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  
  // LinkedIn state
  const [linkedinConnected, setLinkedinConnected] = useState(false);
  const [linkedinData, setLinkedinData] = useState({
    profileUrl: "",
    lastSync: "",
  });
  
  // Toggle states
  const [networkingOpen, setNetworkingOpen] = useState(true);
  const [guestSpeaking, setGuestSpeaking] = useState(true);

  const handleLinkedInConnect = () => {
    // Simulate OAuth connection
    setLinkedinConnected(true);
    setLinkedinData({
      profileUrl: "https://www.linkedin.com/in/demo-profile",
      lastSync: new Date().toLocaleString(),
    });
    
    toast({
      title: "LinkedIn Connected ✅",
      description: "Your profile data has been synced successfully!",
    });
  };

  const handleLinkedInRefresh = () => {
    setLinkedinData({
      ...linkedinData,
      lastSync: new Date().toLocaleString(),
    });
    
    toast({
      title: "Profile Refreshed",
      description: "Your LinkedIn data has been updated.",
    });
  };

  const handleNetworkingToggle = (checked: boolean) => {
    setNetworkingOpen(checked);
    toast({
      title: checked ? "Networking Enabled" : "Networking Disabled",
      description: checked 
        ? "Students can now connect with you"
        : "Student connection requests are now hidden",
    });
  };

  const handleGuestSpeakingToggle = (checked: boolean) => {
    setGuestSpeaking(checked);
    toast({
      title: checked ? "Guest Speaking Enabled" : "Guest Speaking Disabled",
      description: checked 
        ? "Universities can now invite you to speak"
        : "Speaking invitations are now disabled",
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <button
          onClick={() => setLocation("/speakers/dashboard")}
          className="btn-link"
          style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}
          data-testid="button-back-to-dashboard"
        >
          <ArrowLeft size={16} />
          Back to Dashboard
        </button>
        <h2 style={{ margin: "0 0 8px" }}>Profile Settings</h2>
        <p style={{ color: "#64748B", margin: 0 }}>
          Manage your LinkedIn connection and availability preferences
        </p>
      </div>

      {/* LinkedIn Quick Setup */}
      <Card data-testid="card-linkedin-setup">
        <CardHeader>
          <CardTitle>LinkedIn Quick Setup</CardTitle>
          <CardDescription>
            Connect your LinkedIn profile to auto-fill and sync your professional information
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {!linkedinConnected ? (
            <Button 
              onClick={handleLinkedInConnect}
              style={{ background: '#0A66C2', borderColor: '#0A66C2' }}
              className="w-full"
              data-testid="button-linkedin-connect"
            >
              <Link2 size={16} className="mr-2" />
              Quick Setup with LinkedIn
            </Button>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-4 bg-green-50 dark:bg-green-950 rounded-lg border border-green-200 dark:border-green-800">
                <CheckCircle2 className="text-green-600 dark:text-green-400" size={24} />
                <div className="flex-1">
                  <p className="font-medium text-green-900 dark:text-green-100">LinkedIn Connected</p>
                  <p className="text-sm text-green-700 dark:text-green-300">
                    Last synced: {linkedinData.lastSync}
                  </p>
                </div>
              </div>
              
              <div className="flex gap-3">
                <Button 
                  onClick={handleLinkedInRefresh}
                  variant="outline"
                  className="flex-1"
                  data-testid="button-linkedin-refresh"
                >
                  <RefreshCw size={16} className="mr-2" />
                  Refresh Data
                </Button>
                <Button 
                  variant="outline"
                  className="flex-1"
                  data-testid="button-linkedin-edit"
                >
                  Edit Profile
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Availability Settings */}
      <Card data-testid="card-availability-settings">
        <CardHeader>
          <CardTitle>Availability Settings</CardTitle>
          <CardDescription>
            Control your visibility and availability on the ConnectPlay platform
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Networking Toggle */}
          <div className="flex items-start justify-between space-x-4 pb-6 border-b">
            <div className="space-y-1 flex-1">
              <Label htmlFor="networking-toggle" className="text-base font-medium">
                Open to Networking
              </Label>
              <p className="text-sm text-muted-foreground">
                Control whether students can connect with you and send connection requests
              </p>
              <div className="pt-2">
                <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm ${
                  networkingOpen 
                    ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-100' 
                    : 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-100'
                }`}>
                  <span className={`w-2 h-2 rounded-full ${networkingOpen ? 'bg-green-600' : 'bg-red-600'}`} />
                  {networkingOpen ? 'Open to Networking' : 'Networking Closed'}
                </span>
              </div>
            </div>
            <Switch
              id="networking-toggle"
              checked={networkingOpen}
              onCheckedChange={handleNetworkingToggle}
              data-testid="switch-networking"
            />
          </div>

          {/* Guest Speaking Toggle */}
          <div className="flex items-start justify-between space-x-4">
            <div className="space-y-1 flex-1">
              <Label htmlFor="speaking-toggle" className="text-base font-medium">
                Guest Speaking Availability
              </Label>
              <p className="text-sm text-muted-foreground">
                Allow universities and professors to invite you for guest lectures, panels, and events
              </p>
              <div className="pt-2">
                <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm ${
                  guestSpeaking 
                    ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-100' 
                    : 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-100'
                }`}>
                  <span className={`w-2 h-2 rounded-full ${guestSpeaking ? 'bg-green-600' : 'bg-red-600'}`} />
                  {guestSpeaking ? 'Guest Speaking Active' : 'Guest Speaking Closed'}
                </span>
              </div>
            </div>
            <Switch
              id="speaking-toggle"
              checked={guestSpeaking}
              onCheckedChange={handleGuestSpeakingToggle}
              data-testid="switch-speaking"
            />
          </div>
        </CardContent>
      </Card>

      {/* Impact Notice */}
      <Card>
        <CardContent className="pt-6">
          <div className="space-y-3 text-sm text-muted-foreground">
            <p><strong>What happens when you toggle these settings:</strong></p>
            <ul className="list-disc list-inside space-y-2 ml-2">
              <li><strong>Networking OFF:</strong> Your "Connect" button will be hidden from students, and no new connection requests can be submitted</li>
              <li><strong>Guest Speaking OFF:</strong> Universities cannot send you event invitations, and you won't appear in speaking opportunity searches</li>
              <li>Your current connections and bookings remain active regardless of these settings</li>
              <li>Changes take effect immediately across the platform</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
