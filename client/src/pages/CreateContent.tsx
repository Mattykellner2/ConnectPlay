import { useLocation } from "wouter";
import { ArrowLeft, Upload, FileText } from "lucide-react";

export default function CreateContent() {
  const [, setLocation] = useLocation();

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

        <div style={{
          background: 'white',
          borderRadius: '16px',
          padding: '48px 40px',
          border: '1px solid #E5E7EB',
          boxShadow: '0 2px 14px rgba(2, 6, 23, 0.06)',
          textAlign: 'center'
        }}>
          <div style={{
            width: '80px',
            height: '80px',
            background: '#EEF2F7',
            borderRadius: '16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 24px',
            color: '#2563EB'
          }}>
            <FileText size={40} />
          </div>

          <h1 style={{ 
            fontSize: '32px', 
            fontWeight: '900', 
            color: '#0F172A',
            margin: '0 0 12px 0'
          }}>
            Create Content
          </h1>

          <p style={{ 
            color: '#64748B', 
            fontSize: '16px',
            margin: '0 0 32px 0',
            maxWidth: '600px',
            marginLeft: 'auto',
            marginRight: 'auto'
          }}>
            Share your expertise with students by creating educational content. Upload lessons, 
            workbooks, guides, or any valuable resources.
          </p>

          <div style={{
            background: '#F8FAFC',
            border: '2px dashed #CBD5E1',
            borderRadius: '12px',
            padding: '48px 24px',
            marginBottom: '24px'
          }}>
            <Upload size={32} style={{ color: '#64748B', margin: '0 auto 16px' }} />
            <p style={{ color: '#64748B', margin: 0, fontWeight: '600' }}>
              Content upload functionality coming soon
            </p>
          </div>

          <p style={{ 
            fontSize: '14px', 
            color: '#9CA3AF',
            margin: 0
          }}>
            This page will allow you to upload and manage your educational content
          </p>
        </div>
      </div>
    </div>
  );
}
