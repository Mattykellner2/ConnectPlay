import { useState } from "react";
import { useLocation } from "wouter";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Link2, RefreshCw, CheckCircle2, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Mock LinkedIn data fetcher (simulates API call)
const fetchLinkedInData = async (profileUrl: string) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  // Generate mock data based on URL
  const username = profileUrl.split('/in/')[1]?.replace('/', '') || 'user';
  
  return {
    name: "Dr. Sarah Martinez",
    headline: "Marketing Professor & Brand Strategy Expert",
    company: "Stanford Graduate School of Business",
    location: "Palo Alto, California",
    bio: "20+ years of experience in brand marketing, consumer insights, and digital transformation. Passionate about bridging academic theory with real-world business practices. Former CMO at Fortune 500 companies, now teaching the next generation of marketing leaders.",
    skills: ["Brand Strategy", "Marketing Analytics", "Consumer Behavior", "Digital Marketing", "Leadership"],
  };
};

export default function SpeakerSettings() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  
  // LinkedIn state
  const [linkedinConnected, setLinkedinConnected] = useState(false);
  const [linkedinUrl, setLinkedinUrl] = useState("");
  const [isImporting, setIsImporting] = useState(false);
  const [linkedinData, setLinkedinData] = useState({
    profileUrl: "",
    lastSync: "",
  });
  
  // Profile data state
  const [profileData, setProfileData] = useState({
    name: "",
    headline: "",
    company: "",
    location: "",
    bio: "",
    skills: [] as string[],
  });
  
  // Toggle states
  const [networkingOpen, setNetworkingOpen] = useState(true);
  const [guestSpeaking, setGuestSpeaking] = useState(true);

  const handleLinkedInImport = async () => {
    if (!linkedinUrl.trim()) {
      toast({
        title: "LinkedIn URL Required",
        description: "Please enter your LinkedIn profile URL",
        variant: "destructive",
      });
      return;
    }
    
    if (!linkedinUrl.includes('linkedin.com/in/')) {
      toast({
        title: "Invalid URL",
        description: "Please enter a valid LinkedIn profile URL",
        variant: "destructive",
      });
      return;
    }
    
    setIsImporting(true);
    console.log("Importing from LinkedIn URL:", linkedinUrl);
    
    try {
      // Fetch LinkedIn data
      const data = await fetchLinkedInData(linkedinUrl);
      
      // Auto-fill profile fields
      setProfileData(data);
      setLinkedinConnected(true);
      setLinkedinData({
        profileUrl: linkedinUrl,
        lastSync: new Date().toLocaleString(),
      });
      
      toast({
        title: "LinkedIn Connected ✅",
        description: "Your profile data has been auto-filled successfully!",
      });
    } catch (error) {
      toast({
        title: "Import Failed",
        description: "Unable to import LinkedIn data. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsImporting(false);
    }
  };

  const handleLinkedInRefresh = async () => {
    setIsImporting(true);
    
    try {
      const data = await fetchLinkedInData(linkedinData.profileUrl);
      setProfileData(data);
      setLinkedinData({
        ...linkedinData,
        lastSync: new Date().toLocaleString(),
      });
      
      toast({
        title: "Profile Refreshed",
        description: "Your LinkedIn data has been updated.",
      });
    } finally {
      setIsImporting(false);
    }
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
            <>
              <div className="space-y-2">
                <Label htmlFor="linkedin-url">LinkedIn Profile URL</Label>
                <Input
                  id="linkedin-url"
                  type="url"
                  placeholder="https://www.linkedin.com/in/your-profile"
                  value={linkedinUrl}
                  onChange={(e) => setLinkedinUrl(e.target.value)}
                  data-testid="input-linkedin-url"
                />
              </div>
              <Button 
                onClick={handleLinkedInImport}
                disabled={isImporting}
                style={{ background: '#0A66C2', borderColor: '#0A66C2' }}
                className="w-full"
                data-testid="button-linkedin-import"
              >
                {isImporting ? (
                  <>
                    <Loader2 size={16} className="mr-2 animate-spin" />
                    Importing...
                  </>
                ) : (
                  <>
                    <Link2 size={16} className="mr-2" />
                    Import from LinkedIn
                  </>
                )}
              </Button>
            </>
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
              
              <Button 
                onClick={handleLinkedInRefresh}
                disabled={isImporting}
                variant="outline"
                className="w-full"
                data-testid="button-linkedin-refresh"
              >
                {isImporting ? (
                  <>
                    <Loader2 size={16} className="mr-2 animate-spin" />
                    Refreshing...
                  </>
                ) : (
                  <>
                    <RefreshCw size={16} className="mr-2" />
                    Refresh Data
                  </>
                )}
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Auto-filled Profile Data */}
      {linkedinConnected && (
        <Card data-testid="card-profile-data">
          <CardHeader>
            <CardTitle>Your Profile</CardTitle>
            <CardDescription>
              Auto-filled from LinkedIn - you can edit these fields
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="profile-name">Full Name</Label>
              <Input
                id="profile-name"
                value={profileData.name}
                onChange={(e) => setProfileData({...profileData, name: e.target.value})}
                data-testid="input-profile-name"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="profile-headline">Professional Headline</Label>
              <Input
                id="profile-headline"
                value={profileData.headline}
                onChange={(e) => setProfileData({...profileData, headline: e.target.value})}
                data-testid="input-profile-headline"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="profile-company">Company / Organization</Label>
              <Input
                id="profile-company"
                value={profileData.company}
                onChange={(e) => setProfileData({...profileData, company: e.target.value})}
                data-testid="input-profile-company"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="profile-location">Location</Label>
              <Input
                id="profile-location"
                value={profileData.location}
                onChange={(e) => setProfileData({...profileData, location: e.target.value})}
                data-testid="input-profile-location"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="profile-bio">Bio</Label>
              <Textarea
                id="profile-bio"
                value={profileData.bio}
                onChange={(e) => setProfileData({...profileData, bio: e.target.value})}
                rows={5}
                data-testid="textarea-profile-bio"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="profile-skills">Skills (comma-separated)</Label>
              <Input
                id="profile-skills"
                value={profileData.skills.join(", ")}
                onChange={(e) => setProfileData({...profileData, skills: e.target.value.split(",").map(s => s.trim())})}
                data-testid="input-profile-skills"
              />
            </div>
            
            <Button 
              className="w-full"
              data-testid="button-save-profile"
            >
              Save Profile
            </Button>
          </CardContent>
        </Card>
      )}

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
