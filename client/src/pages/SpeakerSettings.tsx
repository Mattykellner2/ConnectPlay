import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { ArrowLeft, Upload, Users, Trash2, Plus, X } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
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
  connectQuestions: [
    { id: "q1", prompt: "What do you hope to learn from me?", required: true },
    { id: "q2", prompt: "Share a link to your LinkedIn profile", required: false },
  ],
  acceptsCodes: ["STANFORD-MKTG-2025", "1234"],
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

type ConnectQuestion = {
  id: string;
  prompt: string;
  required: boolean;
};

export default function SpeakerSettings() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  
  const [notifications, setNotifications] = useState(loadNotificationPreferences);
  const [connectQuestions, setConnectQuestions] = useState<ConnectQuestion[]>(dummyUser.connectQuestions);
  const [accessCodes, setAccessCodes] = useState<string[]>(dummyUser.acceptsCodes);
  const [newCode, setNewCode] = useState("");

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

  const handleAddQuestion = () => {
    if (connectQuestions.length >= 5) {
      toast({
        title: "Maximum Questions Reached",
        description: "You can only add up to 5 questions.",
        variant: "destructive",
      });
      return;
    }

    const newQuestion: ConnectQuestion = {
      id: `q${Date.now()}`,
      prompt: "",
      required: false,
    };
    setConnectQuestions([...connectQuestions, newQuestion]);
  };

  const handleUpdateQuestion = (id: string, field: keyof ConnectQuestion, value: any) => {
    setConnectQuestions(questions => 
      questions.map(q => q.id === id ? { ...q, [field]: value } : q)
    );
  };

  const handleDeleteQuestion = (id: string) => {
    setConnectQuestions(questions => questions.filter(q => q.id !== id));
  };

  const handleSaveQuestions = () => {
    // TODO: Save to backend
    toast({
      title: "Questions Saved",
      description: "Your connect questions have been updated.",
    });
  };

  const handleAddAccessCode = () => {
    if (!newCode.trim()) return;
    
    if (accessCodes.includes(newCode.trim())) {
      toast({
        title: "Code Already Exists",
        description: "This access code is already in your list.",
        variant: "destructive",
      });
      return;
    }

    setAccessCodes([...accessCodes, newCode.trim()]);
    setNewCode("");
    toast({
      title: "Code Added",
      description: "New access code has been added.",
    });
  };

  const handleRemoveAccessCode = (code: string) => {
    setAccessCodes(codes => codes.filter(c => c !== code));
    toast({
      title: "Code Removed",
      description: "Access code has been removed.",
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
                fontWeight: '700', 
                color: '#0F172A', 
                marginBottom: '8px',
                fontSize: '14px'
              }}>
                Full Name
              </label>
              <input
                type="text"
                defaultValue={dummyUser.fullName}
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  borderRadius: '10px',
                  border: '1px solid #E5E7EB',
                  fontSize: '15px',
                  fontWeight: '600',
                  color: '#0F172A'
                }}
                data-testid="input-full-name"
              />
            </div>

            <div>
              <label style={{ 
                display: 'block', 
                fontWeight: '700', 
                color: '#0F172A', 
                marginBottom: '8px',
                fontSize: '14px'
              }}>
                Email Address
              </label>
              <input
                type="email"
                value={dummyUser.email}
                disabled
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  borderRadius: '10px',
                  border: '1px solid #E5E7EB',
                  fontSize: '15px',
                  color: '#64748B',
                  background: '#F8FAFC',
                  cursor: 'not-allowed'
                }}
                data-testid="input-email"
              />
            </div>
          </div>
        </div>

        {/* Professional Information */}
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
            Professional Information
          </h2>

          <div style={{ display: 'grid', gap: '16px' }}>
            <div>
              <label style={{ 
                display: 'block', 
                fontWeight: '700', 
                color: '#0F172A', 
                marginBottom: '8px',
                fontSize: '14px'
              }}>
                Company/Institution
              </label>
              <input
                type="text"
                defaultValue={dummyUser.company}
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  borderRadius: '10px',
                  border: '1px solid #E5E7EB',
                  fontSize: '15px',
                  fontWeight: '600',
                  color: '#0F172A'
                }}
                data-testid="input-company"
              />
            </div>

            <div>
              <label style={{ 
                display: 'block', 
                fontWeight: '700', 
                color: '#0F172A', 
                marginBottom: '8px',
                fontSize: '14px'
              }}>
                Team Member Count
              </label>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '12px 16px',
                borderRadius: '10px',
                border: '1px solid #E5E7EB',
                background: '#F8FAFC'
              }}>
                <Users size={18} color="#64748B" />
                <span style={{
                  fontSize: '15px',
                  fontWeight: '600',
                  color: '#0F172A'
                }} data-testid="text-team-count">
                  {dummyUser.teamMemberCount} team member
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Connect Questions */}
        <div style={{
          background: 'white',
          borderRadius: '16px',
          padding: '32px',
          border: '1px solid #E5E7EB',
          boxShadow: '0 2px 14px rgba(2, 6, 23, 0.06)',
          marginBottom: '24px'
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '16px'
          }}>
            <div>
              <h2 style={{ 
                fontSize: '20px', 
                fontWeight: '800', 
                color: '#0F172A',
                marginBottom: '8px'
              }}>
                Connect Questions
              </h2>
              <p style={{ fontSize: '14px', color: '#64748B' }}>
                Set up to 5 questions for students when they request to connect
              </p>
            </div>
            <Button
              onClick={handleAddQuestion}
              disabled={connectQuestions.length >= 5}
              data-testid="button-add-question"
            >
              <Plus size={16} />
              Add Question
            </Button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginTop: '24px' }}>
            {connectQuestions.map((question, index) => (
              <div
                key={question.id}
                style={{
                  padding: '20px',
                  borderRadius: '12px',
                  border: '1px solid #E5E7EB',
                  background: '#F8FAFC'
                }}
                data-testid={`question-${question.id}`}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                  <label style={{ fontWeight: '700', color: '#0F172A', fontSize: '14px' }}>
                    Question {index + 1}
                  </label>
                  <button
                    onClick={() => handleDeleteQuestion(question.id)}
                    style={{
                      background: 'transparent',
                      border: 'none',
                      cursor: 'pointer',
                      color: '#DC2626'
                    }}
                    data-testid={`button-delete-question-${question.id}`}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
                <Textarea
                  value={question.prompt}
                  onChange={(e) => handleUpdateQuestion(question.id, 'prompt', e.target.value)}
                  placeholder="Enter your question..."
                  className="mb-3"
                  data-testid={`input-question-prompt-${question.id}`}
                />
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Switch
                    checked={question.required}
                    onCheckedChange={(checked) => handleUpdateQuestion(question.id, 'required', checked)}
                    data-testid={`switch-question-required-${question.id}`}
                  />
                  <label style={{ fontSize: '14px', fontWeight: '600', color: '#0F172A' }}>
                    Required
                  </label>
                </div>
              </div>
            ))}
          </div>

          <Button
            onClick={handleSaveQuestions}
            className="w-full mt-6"
            data-testid="button-save-questions"
          >
            Save Questions
          </Button>
        </div>

        {/* Access Codes */}
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
            marginBottom: '8px'
          }}>
            Priority Access Codes
          </h2>
          <p style={{ fontSize: '14px', color: '#64748B', marginBottom: '24px' }}>
            Codes that give students priority when connecting with you
          </p>

          <div style={{ display: 'flex', gap: '12px', marginBottom: '20px' }}>
            <Input
              value={newCode}
              onChange={(e) => setNewCode(e.target.value)}
              placeholder="Enter new access code..."
              className="font-mono"
              data-testid="input-new-access-code"
            />
            <Button
              onClick={handleAddAccessCode}
              data-testid="button-add-access-code"
            >
              <Plus size={16} />
              Add
            </Button>
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
            {accessCodes.map((code) => (
              <div
                key={code}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '8px 16px',
                  borderRadius: '8px',
                  background: '#EEF2FF',
                  border: '1px solid #C7D2FE',
                  fontFamily: 'monospace',
                  fontSize: '14px',
                  fontWeight: '600',
                  color: '#4338CA'
                }}
                data-testid={`access-code-${code}`}
              >
                {code}
                <button
                  onClick={() => handleRemoveAccessCode(code)}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    color: '#4338CA'
                  }}
                  data-testid={`button-remove-code-${code}`}
                >
                  <X size={14} />
                </button>
              </div>
            ))}
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
            marginBottom: '24px'
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
          border: '1px solid #FECACA'
        }}>
          <h2 style={{ 
            fontSize: '20px', 
            fontWeight: '800', 
            color: '#DC2626',
            marginBottom: '8px'
          }}>
            Danger Zone
          </h2>
          <p style={{ fontSize: '14px', color: '#991B1B', marginBottom: '20px' }}>
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
                  cursor: 'pointer',
                  fontSize: '14px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
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
                  This action cannot be undone. This will permanently delete your account
                  and remove your data from our servers.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel data-testid="button-cancel-delete">Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={handleDeleteAccount}
                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
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
