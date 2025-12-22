import React from 'react';

interface ContactFormData {
  fullName: string;
  email: string;
  messageType: string;
  subject: string;
  message: string;
}

export const AdminNotificationEmail: React.FC<ContactFormData> = ({
  fullName,
  email,
  messageType,
  subject,
  message
}) => (
  <div style={{ fontFamily: 'Arial, sans-serif', maxWidth: '600px', margin: '0 auto' }}>
    <h2 style={{ 
      color: '#7c3aed', 
      borderBottom: '2px solid #7c3aed', 
      paddingBottom: '10px',
      marginBottom: '20px'
    }}>
      New Contact Form Submission
    </h2>
    
    <div style={{ 
      backgroundColor: '#f8fafc', 
      padding: '20px', 
      borderRadius: '8px', 
      margin: '20px 0' 
    }}>
      <h3 style={{ color: '#374151', marginTop: '0' }}>Contact Details</h3>
      <p><strong>Name:</strong> {fullName}</p>
      <p><strong>Email:</strong> {email}</p>
      <p><strong>Message Type:</strong> {messageType || 'Not specified'}</p>
      <p><strong>Subject:</strong> {subject}</p>
    </div>
    
    <div style={{ 
      backgroundColor: '#fefefe', 
      padding: '20px', 
      borderRadius: '8px', 
      borderLeft: '4px solid #7c3aed' 
    }}>
      <h3 style={{ color: '#374151', marginTop: '0' }}>Message</h3>
      <p style={{ whiteSpace: 'pre-wrap', lineHeight: '1.6' }}>{message}</p>
    </div>
    
    <div style={{ 
      marginTop: '30px', 
      paddingTop: '20px', 
      borderTop: '1px solid #e5e7eb', 
      color: '#6b7280', 
      fontSize: '14px' 
    }}>
      <p>This message was sent from the Newy Enterprise contact form.</p>
      <p>Submitted on: {new Date().toLocaleString('en-MY', { 
        timeZone: 'Asia/Kuala_Lumpur',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })}</p>
    </div>
  </div>
);

export const UserConfirmationEmail: React.FC<ContactFormData> = ({
  fullName,
  email,
  messageType,
  subject,
  message
}) => (
  <div style={{ fontFamily: 'Arial, sans-serif', maxWidth: '600px', margin: '0 auto' }}>
    <h2 style={{ 
      color: '#7c3aed', 
      borderBottom: '2px solid #7c3aed', 
      paddingBottom: '10px',
      marginBottom: '20px'
    }}>
      Thank you for reaching out!
    </h2>
    
    <p>Dear {fullName},</p>
    
    <p>Thank you for contacting Newy Enterprise. We have received your message and will get back to you within 24 hours.</p>
    
    <div style={{ 
      backgroundColor: '#f8fafc', 
      padding: '20px', 
      borderRadius: '8px', 
      margin: '20px 0' 
    }}>
      <h3 style={{ color: '#374151', marginTop: '0' }}>Your Message Summary</h3>
      <p><strong>Subject:</strong> {subject}</p>
      <p><strong>Message Type:</strong> {messageType || 'General Inquiry'}</p>
    </div>
    
    <p>If you have any urgent questions, please don't hesitate to call us at <strong>+60 12-345 6789</strong>.</p>
    
    <p>Best regards,<br />
    The Newy Enterprise Team</p>
    
    <div style={{ 
      marginTop: '30px', 
      paddingTop: '20px', 
      borderTop: '1px solid #e5e7eb', 
      color: '#6b7280', 
      fontSize: '14px' 
    }}>
      <p>Newy Enterprise<br />
      Malaysia<br />
      Phone: +60 12-345 6789<br />
      Email: hello@newy.com.my</p>
    </div>
  </div>
);

// Helper function to convert React component to HTML string
export const renderEmailTemplate = (component: React.ReactElement): string => {
  // This is a simplified version - in production, you'd use a proper HTML renderer
  // For now, we'll use the inline HTML templates in the API route
  return '';
};
