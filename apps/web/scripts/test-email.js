// Test script for email functionality
// Run with: node scripts/test-email.js

const testEmailData = {
  fullName: "Test User",
  email: "test@example.com",
  messageType: "general",
  subject: "Test Contact Form Submission",
  message: "This is a test message to verify the email functionality is working correctly.\n\nBest regards,\nTest User"
};

async function testEmailAPI() {
  try {
    console.log('Testing email API...');
    
    const response = await fetch('http://localhost:3000/api/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testEmailData),
    });

    const result = await response.json();
    
    if (response.ok) {
      console.log('✅ Email sent successfully!');
      console.log('Response:', result);
    } else {
      console.log('❌ Email sending failed');
      console.log('Error:', result.error);
      console.log('Status:', response.status);
    }
  } catch (error) {
    console.log('❌ Network error:', error.message);
  }
}

// Only run if this file is executed directly
if (require.main === module) {
  testEmailAPI();
}

module.exports = { testEmailAPI, testEmailData };
