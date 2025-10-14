import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { ArrowLeft, Upload, Users, Trash2 } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

// Dummy user data (to be replaced with real data)
const dummyUser = {
  fullName: "Dr. Sarah Martinez",
  email: "sarah.martinez@stanford.edu",
  photoUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah",
  company: "Stanford GSB",
  teamMemberCount: 1,
};

// Load notification preferences from localStorage
function loadNotificationPreferences() {
  const stored = localStorage.getItem('speaker-notification-preferences');
  if (!stored) {
    return {
      newMessages: true,
      newBookings: true,
      contentPurchases: true,
    };
  }
  
  try {
    return JSON.parse(stored);
  } catch {
    return {
      newMessages: true,
      newBookings: true,
      contentPurchases: true,
    };
  }
}

export default function SpeakerSettings() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  
  const [notifications, setNotifications] = useState(loadNotificationPreferences);

  // Save to localStorage whenever notifications change
  useEffect(() => {
    localStorage.setItem('speaker-notification-preferences', JSON.stringify(notifications));
  }, [notifications]);

  const handleToggle = (key: string) => {
    setNotifications((prev: any) => ({
      ...prev,
      [key]: !prev[key],
    }));
    
    toast({
      title: "Settings Updated",
      description: "Your notification preferences have been saved.",
    });
  };

  const handleDeleteAccount = () => {
    toast({
      title: "Account Deletion Requested",
      description: "Your account deletion request has been received. You will receive a confirmation email shortly.",
      variant: "destructive",
    });
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: '#F6F8FB',
      padding: '40px 24px'
    }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        <button
          onClick={() => setLocation('/speakers/dashboard')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            background: 'transparent',
            border: 'none',
            color: '#2563EB',
            fontWeight: '700',
            cursor: 'pointer',
            marginBottom: '24px',
            fontSize: '14px'
          }}
          data-testid="button-back-to-dashboard"
        >
          <ArrowLeft size={18} />
          Back to Dashboard
        </button>

        <h1 style={{ 
          fontSize: '32px', 
          fontWeight: '900', 
          color: '#0F172A',
          marginBottom: '32px'
        }}>
          Settings
        </h1>

        {/* Account Information */}
        <div style={{
          background: 'white',
          borderRadius: '16px',
          padding: '32px',
          border: '1px solid #E5E7EB',
          boxShadow: '0 2px 14px rgba(2, 6, 23, 0.06)',
          marginBottom: '24px'
        }}>
          <h2 style={{ 
            fontSize: '20px', 
            fontWeight: '800', 
            color: '#0F172A',
            marginBottom: '24px'
          }}>
            Account Information
          </h2>

          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '20px',
            marginBottom: '24px'
          }}>
            <img 
              src={dummyUser.photoUrl} 
              alt={dummyUser.fullName}
              style={{
                width: '80px',
                height: '80px',
                borderRadius: '50%',
                border: '2px solid #E5E7EB'
              }}
              data-testid="img-profile-photo"
            />
            <button
              style={{
                background: '#2563EB',
                color: 'white',
                border: 'none',
                borderRadius: '10px',
                padding: '10px 20px',
                fontWeight: '700',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                cursor: 'pointer',
                fontSize: '14px'
              }}
              data-testid="button-upload-photo"
            >
              <Upload size={16} />
              Upload New Photo
            </button>
          </div>

          <div style={{ display: 'grid', gap: '16px' }}>
            <div>
              <label style={{ 
                display: 'block', 
                fontSize: '14px', 
                fontWeight: '600', 
                color: '#64748B',
                marginBottom: '8px'
              }}>
                Full Name
              </label>
              <input
                type="text"
                value={dummyUser.fullName}
                readOnly
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  border: '1px solid #E5E7EB',
                  borderRadius: '10px',
                  fontSize: '14px',
                  background: '#F8FAFC',
                  color: '#64748B'
                }}
                data-testid="input-full-name"
              />
            </div>

            <div>
              <label style={{ 
                display: 'block', 
                fontSize: '14px', 
                fontWeight: '600', 
                color: '#64748B',
                marginBottom: '8px'
              }}>
                Email
              </label>
              <input
                type="email"
                value={dummyUser.email}
                readOnly
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  border: '1px solid #E5E7EB',
                  borderRadius: '10px',
                  fontSize: '14px',
                  background: '#F8FAFC',
                  color: '#64748B'
                }}
                data-testid="input-email"
              />
            </div>
          </div>
        </div>

        {/* Organization */}
        <div style={{
          background: 'white',
          borderRadius: '16px',
          padding: '32px',
          border: '1px solid #E5E7EB',
          boxShadow: '0 2px 14px rgba(2, 6, 23, 0.06)',
          marginBottom: '24px'
        }}>
          <h2 style={{ 
            fontSize: '20px', 
            fontWeight: '800', 
            color: '#0F172A',
            marginBottom: '20px'
          }}>
            Professional Information
          </h2>

          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            padding: '16px',
            background: '#F8FAFC',
            borderRadius: '12px',
            marginBottom: '16px'
          }}>
            <div>
              <div style={{ 
                fontSize: '16px', 
                fontWeight: '700', 
                color: '#0F172A',
                marginBottom: '4px'
              }}>
                {dummyUser.company}
              </div>
              <div style={{ fontSize: '14px', color: '#64748B' }}>
                {dummyUser.teamMemberCount} team member{dummyUser.teamMemberCount !== 1 ? 's' : ''}
              </div>
            </div>
            <button
              onClick={() => toast({ title: "Feature Coming Soon", description: "Team management will be available soon." })}
              style={{
                background: '#2563EB',
                color: 'white',
                border: 'none',
                borderRadius: '10px',
                padding: '10px 20px',
                fontWeight: '700',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                cursor: 'pointer',
                fontSize: '14px'
              }}
              data-testid="button-manage-team"
            >
              <Users size={16} />
              Manage Team
            </button>
          </div>
        </div>

        {/* Notifications */}
        <div style={{
          background: 'white',
          borderRadius: '16px',
          padding: '32px',
          border: '1px solid #E5E7EB',
          boxShadow: '0 2px 14px rgba(2, 6, 23, 0.06)',
          marginBottom: '24px'
        }}>
          <h2 style={{ 
            fontSize: '20px', 
            fontWeight: '800', 
            color: '#0F172A',
            marginBottom: '20px'
          }}>
            Notifications
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center',
              paddingBottom: '20px',
              borderBottom: '1px solid #F1F5F9'
            }}>
              <div>
                <div style={{ fontWeight: '600', color: '#0F172A', marginBottom: '4px' }}>
                  New Messages
                </div>
                <div style={{ fontSize: '14px', color: '#64748B' }}>
                  Receive notifications when students or universities message you
                </div>
              </div>
              <Switch
                checked={notifications.newMessages}
                onCheckedChange={() => handleToggle('newMessages')}
                data-testid="switch-new-messages"
              />
            </div>

            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center',
              paddingBottom: '20px',
              borderBottom: '1px solid #F1F5F9'
            }}>
              <div>
                <div style={{ fontWeight: '600', color: '#0F172A', marginBottom: '4px' }}>
                  New Bookings
                </div>
                <div style={{ fontSize: '14px', color: '#64748B' }}>
                  Get notified when universities book you for speaking events
                </div>
              </div>
              <Switch
                checked={notifications.newBookings}
                onCheckedChange={() => handleToggle('newBookings')}
                data-testid="switch-new-bookings"
              />
            </div>

            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center'
            }}>
              <div>
                <div style={{ fontWeight: '600', color: '#0F172A', marginBottom: '4px' }}>
                  Content Purchases
                </div>
                <div style={{ fontSize: '14px', color: '#64748B' }}>
                  Receive alerts when students purchase your content
                </div>
              </div>
              <Switch
                checked={notifications.contentPurchases}
                onCheckedChange={() => handleToggle('contentPurchases')}
                data-testid="switch-content-purchases"
              />
            </div>
          </div>
        </div>

        {/* Danger Zone */}
        <div style={{
          background: '#FEF2F2',
          borderRadius: '16px',
          padding: '32px',
          border: '1px solid #FEE2E2',
          boxShadow: '0 2px 14px rgba(2, 6, 23, 0.06)'
        }}>
          <h2 style={{ 
            fontSize: '20px', 
            fontWeight: '800', 
            color: '#DC2626',
            marginBottom: '12px'
          }}>
            Danger Zone
          </h2>
          <p style={{ 
            fontSize: '14px', 
            color: '#DC2626',
            marginBottom: '20px'
          }}>
            Once you delete your account, there is no going back. Please be certain.
          </p>

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <button
                style={{
                  background: '#DC2626',
                  color: 'white',
                  border: 'none',
                  borderRadius: '10px',
                  padding: '12px 24px',
                  fontWeight: '700',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  cursor: 'pointer',
                  fontSize: '14px'
                }}
                data-testid="button-delete-account"
              >
                <Trash2 size={16} />
                Delete My Account
              </button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete your account,
                  all your content, earnings history, and remove all your data from our servers.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel data-testid="button-cancel-delete">Cancel</AlertDialogCancel>
                <AlertDialogAction 
                  onClick={handleDeleteAccount}
                  className="bg-destructive hover:bg-destructive/90"
                  data-testid="button-confirm-delete"
                >
                  Delete Account
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
    </div>
  );
}
