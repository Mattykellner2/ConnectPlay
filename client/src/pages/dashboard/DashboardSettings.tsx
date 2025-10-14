import { useState, useEffect } from "react";
import { Upload, Users, Trash2 } from "lucide-react";
import Sidebar from "@/components/dashboard/Sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import "@/styles/dashboard.css";
import "@/styles/settings.css";

const NOTIFICATIONS_STORAGE_KEY = "university-notification-preferences";

export default function DashboardSettings() {
  const { toast } = useToast();
  const [notifications, setNotifications] = useState(() => {
    const stored = localStorage.getItem(NOTIFICATIONS_STORAGE_KEY);
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch {
        return {
          newMessages: true,
          newMatches: true,
          bookingConfirmations: false,
        };
      }
    }
    return {
      newMessages: true,
      newMatches: true,
      bookingConfirmations: false,
    };
  });

  useEffect(() => {
    localStorage.setItem(NOTIFICATIONS_STORAGE_KEY, JSON.stringify(notifications));
  }, [notifications]);

  const handleToggle = (key: keyof typeof notifications) => {
    setNotifications((prev: typeof notifications) => {
      const newState = { ...prev, [key]: !prev[key] };
      toast({
        title: "Notification Preferences Updated",
        description: `${key === "newMessages" ? "New Messages" : key === "newMatches" ? "New Matches" : "Booking Confirmations"} notifications ${newState[key] ? "enabled" : "disabled"}.`,
      });
      return newState;
    });
  };

  const handlePhotoUpload = () => {
    toast({
      title: "Upload Photo",
      description: "Photo upload functionality will be available soon.",
    });
  };

  const handleInviteManage = () => {
    toast({
      title: "Invite & Manage",
      description: "Team management interface will open here.",
    });
  };

  const handleDeleteAccount = () => {
    toast({
      title: "Delete Account",
      description: "This action requires additional confirmation.",
      variant: "destructive",
    });
  };

  return (
    <div className="dashboard-shell">
      <Sidebar />
      <main className="main">
        <div className="settings-container">
          <h1 className="settings-title">Settings</h1>
          <p className="settings-subtitle">Manage your account preferences and university profile</p>

          {/* Account Information */}
          <div className="settings-section">
            <h2 className="settings-section-title">Account Information</h2>
            
            <div className="settings-account-header">
              <Avatar className="settings-avatar">
                <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=Jennifer" alt="Profile" />
                <AvatarFallback>JM</AvatarFallback>
              </Avatar>
              <button
                onClick={handlePhotoUpload}
                className="settings-upload-btn"
                data-testid="button-upload-photo"
              >
                <Upload className="w-4 h-4" />
                Change Photo
              </button>
            </div>

            <div className="settings-form">
              <div className="settings-field">
                <label htmlFor="name">Full Name</label>
                <input
                  id="name"
                  type="text"
                  value="Dr. Jennifer Martinez"
                  readOnly
                  data-testid="input-name"
                />
              </div>

              <div className="settings-field">
                <label htmlFor="email">Email Address</label>
                <input
                  id="email"
                  type="email"
                  value="jmartinez@osu.edu"
                  readOnly
                  data-testid="input-email"
                />
                <span className="settings-field-hint">Email address cannot be changed</span>
              </div>
            </div>
          </div>

          {/* Organization */}
          <div className="settings-section">
            <h2 className="settings-section-title">Organization</h2>
            
            <div className="settings-org-info">
              <div className="settings-org-item">
                <span className="settings-org-label">University Name</span>
                <span className="settings-org-value">The Ohio State University</span>
              </div>
              <div className="settings-org-item">
                <span className="settings-org-label">Team Members</span>
                <span className="settings-org-value">12 members</span>
              </div>
            </div>

            <button
              onClick={handleInviteManage}
              className="settings-org-btn"
              data-testid="button-invite-manage"
            >
              <Users className="w-4 h-4" />
              Invite & Manage Team
            </button>
          </div>

          {/* Notifications */}
          <div className="settings-section">
            <h2 className="settings-section-title">Notifications</h2>
            <p className="settings-section-description">
              Choose what notifications you want to receive
            </p>

            <div className="settings-notifications">
              <div className="settings-notification-item">
                <div className="settings-notification-info">
                  <span className="settings-notification-label">New Messages</span>
                  <span className="settings-notification-description">
                    Get notified when you receive new messages
                  </span>
                </div>
                <Switch
                  checked={notifications.newMessages}
                  onCheckedChange={() => handleToggle("newMessages")}
                  data-testid="toggle-new-messages"
                />
              </div>

              <div className="settings-notification-item">
                <div className="settings-notification-info">
                  <span className="settings-notification-label">New Matches</span>
                  <span className="settings-notification-description">
                    Get notified when new speaker matches are available
                  </span>
                </div>
                <Switch
                  checked={notifications.newMatches}
                  onCheckedChange={() => handleToggle("newMatches")}
                  data-testid="toggle-new-matches"
                />
              </div>

              <div className="settings-notification-item">
                <div className="settings-notification-info">
                  <span className="settings-notification-label">Booking Confirmations</span>
                  <span className="settings-notification-description">
                    Get notified when speaker bookings are confirmed
                  </span>
                </div>
                <Switch
                  checked={notifications.bookingConfirmations}
                  onCheckedChange={() => handleToggle("bookingConfirmations")}
                  data-testid="toggle-booking-confirmations"
                />
              </div>
            </div>
          </div>

          {/* Danger Zone */}
          <div className="settings-section settings-danger">
            <h2 className="settings-section-title">Danger Zone</h2>
            <p className="settings-section-description">
              Once you delete your account, there is no going back. Please be certain.
            </p>

            <button
              onClick={handleDeleteAccount}
              className="settings-danger-btn"
              data-testid="button-delete-account"
            >
              <Trash2 className="w-4 h-4" />
              Delete My Account
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
