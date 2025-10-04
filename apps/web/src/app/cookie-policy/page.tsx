import { ScrollReveal } from "../../components/scroll-reveal";

export default function CookiePolicyPage() {
  return (
    <div className="min-h-screen py-24">
      <div className="container max-w-4xl">
        <ScrollReveal>
          <h1 className="text-4xl font-bold font-display mb-8">Cookie Policy</h1>
          <p className="text-muted-foreground mb-8">
            <strong>Last updated:</strong> {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </ScrollReveal>

        <ScrollReveal className="space-y-8">
          <section>
            <h2 className="text-2xl font-semibold mb-4">1. Introduction</h2>
            <p className="text-muted-foreground mb-4">
              This Cookie Policy explains how Newy Enterprise ("we," "our," or "us") uses cookies and similar technologies when you visit our website, use our services, or interact with us online, in compliance with Malaysia's Personal Data Protection Act 2010 (PDPA).
            </p>
            <p className="text-muted-foreground">
              By using our website and services, you consent to the use of cookies in accordance with this policy. If you do not agree to our use of cookies, you should set your browser settings accordingly or refrain from using our website.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">2. What Are Cookies?</h2>
            <p className="text-muted-foreground mb-4">
              Cookies are small text files that are stored on your device (computer, tablet, or mobile phone) when you visit a website. They help websites remember information about your visit, such as your preferred language and other settings, which can make your next visit easier and more useful.
            </p>
            <p className="text-muted-foreground">
              We also use similar technologies such as web beacons, pixel tags, and local storage to collect and store information about your use of our website.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">3. Types of Cookies We Use</h2>
            
            <h3 className="text-xl font-semibold mb-3">3.1 Essential Cookies</h3>
            <p className="text-muted-foreground mb-4">
              These cookies are necessary for the website to function properly and cannot be disabled. They include:
            </p>
            <ul className="list-disc list-inside text-muted-foreground mb-4 space-y-2">
              <li>Authentication cookies that keep you logged in</li>
              <li>Security cookies that protect against fraud and abuse</li>
              <li>Session cookies that maintain your session during your visit</li>
              <li>Load balancing cookies that distribute traffic across servers</li>
            </ul>

            <h3 className="text-xl font-semibold mb-3">3.2 Performance and Analytics Cookies</h3>
            <p className="text-muted-foreground mb-4">
              These cookies help us understand how visitors interact with our website by collecting and reporting information anonymously. They include:
            </p>
            <ul className="list-disc list-inside text-muted-foreground mb-4 space-y-2">
              <li>Google Analytics cookies to analyze website traffic and usage</li>
              <li>Performance monitoring cookies to track page load times</li>
              <li>Error tracking cookies to identify and fix technical issues</li>
              <li>User behavior cookies to understand how users navigate our site</li>
            </ul>

            <h3 className="text-xl font-semibold mb-3">3.3 Functionality Cookies</h3>
            <p className="text-muted-foreground mb-4">
              These cookies enable enhanced functionality and personalization. They include:
            </p>
            <ul className="list-disc list-inside text-muted-foreground mb-4 space-y-2">
              <li>Language preference cookies</li>
              <li>Theme and display preference cookies</li>
              <li>Form auto-fill cookies</li>
              <li>User interface customization cookies</li>
            </ul>

            <h3 className="text-xl font-semibold mb-3">3.4 Marketing and Advertising Cookies</h3>
            <p className="text-muted-foreground mb-4">
              These cookies are used to track visitors across websites to display relevant and engaging advertisements. They include:
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2">
              <li>Google Ads cookies for remarketing campaigns</li>
              <li>Facebook Pixel cookies for social media advertising</li>
              <li>LinkedIn Insight Tag cookies for B2B marketing</li>
              <li>Conversion tracking cookies to measure ad effectiveness</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">4. Third-Party Cookies</h2>
            <p className="text-muted-foreground mb-4">
              We may use third-party services that place cookies on your device. These services include:
            </p>
            <ul className="list-disc list-inside text-muted-foreground mb-4 space-y-2">
              <li><strong>Google Analytics:</strong> For website analytics and performance monitoring</li>
              <li><strong>Google Ads:</strong> For advertising and remarketing purposes</li>
              <li><strong>Facebook Pixel:</strong> For social media advertising and conversion tracking</li>
              <li><strong>LinkedIn Insight Tag:</strong> For B2B marketing and lead generation</li>
              <li><strong>Hotjar:</strong> For user behavior analysis and heat mapping</li>
              <li><strong>Stripe:</strong> For payment processing and security</li>
              <li><strong>SendGrid:</strong> For email delivery and tracking</li>
            </ul>
            <p className="text-muted-foreground">
              These third-party services have their own privacy policies and cookie practices. We encourage you to review their policies for more information.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">5. How We Use Cookies</h2>
            <p className="text-muted-foreground mb-4">
              We use cookies for the following purposes:
            </p>
            <ul className="list-disc list-inside text-muted-foreground mb-4 space-y-2">
              <li><strong>Website Functionality:</strong> To ensure our website works properly and securely</li>
              <li><strong>User Experience:</strong> To remember your preferences and provide personalized content</li>
              <li><strong>Analytics:</strong> To understand how our website is used and improve our services</li>
              <li><strong>Marketing:</strong> To deliver relevant advertisements and measure campaign effectiveness</li>
              <li><strong>Security:</strong> To protect against fraud and unauthorized access</li>
              <li><strong>Performance:</strong> To optimize website speed and functionality</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">6. Cookie Duration</h2>
            <p className="text-muted-foreground mb-4">
              Cookies have different lifespans:
            </p>
            <ul className="list-disc list-inside text-muted-foreground mb-4 space-y-2">
              <li><strong>Session Cookies:</strong> These are temporary cookies that are deleted when you close your browser</li>
              <li><strong>Persistent Cookies:</strong> These remain on your device for a set period or until you delete them</li>
              <li><strong>First-Party Cookies:</strong> Set by our website and typically last for 1-2 years</li>
              <li><strong>Third-Party Cookies:</strong> Set by external services and may have different expiration periods</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">7. Managing Your Cookie Preferences</h2>
            <p className="text-muted-foreground mb-4">
              You have several options for managing cookies:
            </p>
            
            <h3 className="text-xl font-semibold mb-3">7.1 Browser Settings</h3>
            <p className="text-muted-foreground mb-4">
              Most web browsers allow you to control cookies through their settings. You can:
            </p>
            <ul className="list-disc list-inside text-muted-foreground mb-4 space-y-2">
              <li>Block all cookies</li>
              <li>Allow only first-party cookies</li>
              <li>Delete existing cookies</li>
              <li>Set preferences for different types of cookies</li>
            </ul>

            <h3 className="text-xl font-semibold mb-3">7.2 Cookie Consent</h3>
            <p className="text-muted-foreground mb-4">
              When you first visit our website, you will see a cookie consent banner that allows you to:
            </p>
            <ul className="list-disc list-inside text-muted-foreground mb-4 space-y-2">
              <li>Accept all cookies</li>
              <li>Reject non-essential cookies</li>
              <li>Customize your cookie preferences</li>
              <li>Learn more about our cookie practices</li>
            </ul>

            <h3 className="text-xl font-semibold mb-3">7.3 Third-Party Opt-Outs</h3>
            <p className="text-muted-foreground">
              You can opt out of certain third-party cookies through their respective opt-out mechanisms:
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2">
              <li>Google Analytics: <a href="https://tools.google.com/dlpage/gaoptout" className="text-purple-400 hover:text-purple-300 underline" target="_blank" rel="noopener noreferrer">Google Analytics Opt-out</a></li>
              <li>Google Ads: <a href="https://adssettings.google.com/" className="text-purple-400 hover:text-purple-300 underline" target="_blank" rel="noopener noreferrer">Google Ads Settings</a></li>
              <li>Facebook: <a href="https://www.facebook.com/settings?tab=ads" className="text-purple-400 hover:text-purple-300 underline" target="_blank" rel="noopener noreferrer">Facebook Ad Preferences</a></li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">8. Impact of Disabling Cookies</h2>
            <p className="text-muted-foreground mb-4">
              If you choose to disable cookies, please be aware that:
            </p>
            <ul className="list-disc list-inside text-muted-foreground mb-4 space-y-2">
              <li>Some website features may not function properly</li>
              <li>You may need to re-enter information more frequently</li>
              <li>Your user experience may be less personalized</li>
              <li>Some services may not be available</li>
              <li>Security features may be compromised</li>
            </ul>
            <p className="text-muted-foreground">
              Essential cookies cannot be disabled as they are necessary for the website to function.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">9. Updates to This Cookie Policy</h2>
            <p className="text-muted-foreground mb-4">
              We may update this Cookie Policy from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons. We will notify you of any material changes by:
            </p>
            <ul className="list-disc list-inside text-muted-foreground mb-4 space-y-2">
              <li>Posting the updated policy on our website</li>
              <li>Updating the "Last updated" date</li>
              <li>Sending you an email notification (if required by law)</li>
            </ul>
            <p className="text-muted-foreground">
              Your continued use of our website after any changes constitutes acceptance of the updated Cookie Policy.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">10. Contact Us</h2>
            <p className="text-muted-foreground mb-4">
              If you have any questions about this Cookie Policy or our use of cookies, please contact us:
            </p>
            <div className="bg-muted/30 p-6 rounded-lg">
              <p className="text-muted-foreground mb-2">
                <strong>Newy Enterprise</strong><br />
                Email: hello@newy.com.my<br />
                Phone: +60 11 2890 8472<br />
                Address: Bandar Baru Bangi, Selangor, Malaysia<br />
                Website: www.newy.com.my
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">11. Legal Compliance</h2>
            
            <h3 className="text-xl font-semibold mb-3">11.1 GDPR Compliance</h3>
            <p className="text-muted-foreground mb-4">
              For users in the European Economic Area (EEA), we comply with the General Data Protection Regulation (GDPR):
            </p>
            <ul className="list-disc list-inside text-muted-foreground mb-4 space-y-2">
              <li>We obtain explicit consent before setting non-essential cookies</li>
              <li>You can withdraw consent at any time</li>
              <li>We provide clear information about cookie purposes and duration</li>
              <li>You have the right to access, rectify, and delete your data</li>
            </ul>

            <h3 className="text-xl font-semibold mb-3">11.2 CCPA Compliance</h3>
            <p className="text-muted-foreground mb-4">
              For California residents, we comply with the California Consumer Privacy Act (CCPA):
            </p>
            <ul className="list-disc list-inside text-muted-foreground mb-4 space-y-2">
              <li>We disclose what personal information is collected through cookies</li>
              <li>You have the right to opt-out of the sale of personal information</li>
              <li>We provide notice of cookie usage and data collection</li>
              <li>You can request deletion of your personal information</li>
            </ul>

            <h3 className="text-xl font-semibold mb-3">11.3 Malaysian Personal Data Protection Act 2010</h3>
            <p className="text-muted-foreground">
              We comply with Malaysia's Personal Data Protection Act 2010 (PDPA):
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2">
              <li>We collect personal information only for lawful purposes and with consent</li>
              <li>We take reasonable steps to protect personal information from unauthorized access</li>
              <li>We provide access to personal information upon request within 21 days</li>
              <li>We use personal information only for the purposes for which it was collected</li>
              <li>We obtain explicit consent before setting non-essential cookies</li>
              <li>We allow users to withdraw consent for cookie usage at any time</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">12. Cookie List</h2>
            <p className="text-muted-foreground mb-4">
              Below is a detailed list of cookies we use:
            </p>
            
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-purple-500/20">
                <thead>
                  <tr className="bg-purple-500/10">
                    <th className="border border-purple-500/20 p-3 text-left">Cookie Name</th>
                    <th className="border border-purple-500/20 p-3 text-left">Purpose</th>
                    <th className="border border-purple-500/20 p-3 text-left">Duration</th>
                    <th className="border border-purple-500/20 p-3 text-left">Type</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-purple-500/20 p-3">session_id</td>
                    <td className="border border-purple-500/20 p-3">Maintains user session</td>
                    <td className="border border-purple-500/20 p-3">Session</td>
                    <td className="border border-purple-500/20 p-3">Essential</td>
                  </tr>
                  <tr>
                    <td className="border border-purple-500/20 p-3">_ga</td>
                    <td className="border border-purple-500/20 p-3">Google Analytics tracking</td>
                    <td className="border border-purple-500/20 p-3">2 years</td>
                    <td className="border border-purple-500/20 p-3">Analytics</td>
                  </tr>
                  <tr>
                    <td className="border border-purple-500/20 p-3">_fbp</td>
                    <td className="border border-purple-500/20 p-3">Facebook Pixel tracking</td>
                    <td className="border border-purple-500/20 p-3">3 months</td>
                    <td className="border border-purple-500/20 p-3">Marketing</td>
                  </tr>
                  <tr>
                    <td className="border border-purple-500/20 p-3">preferences</td>
                    <td className="border border-purple-500/20 p-3">User preferences</td>
                    <td className="border border-purple-500/20 p-3">1 year</td>
                    <td className="border border-purple-500/20 p-3">Functional</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">13. Malaysian Cookie Compliance</h2>
            <p className="text-muted-foreground mb-4">
              In compliance with Malaysia's Personal Data Protection Act 2010 (PDPA), we implement the following cookie practices:
            </p>
            
            <h3 className="text-xl font-semibold mb-3">13.1 Consent Management</h3>
            <ul className="list-disc list-inside text-muted-foreground mb-4 space-y-2">
              <li>We obtain explicit consent before setting non-essential cookies</li>
              <li>Our cookie consent banner provides clear information about cookie usage</li>
              <li>Users can withdraw consent at any time through our cookie settings</li>
              <li>We maintain records of consent for audit purposes</li>
            </ul>

            <h3 className="text-xl font-semibold mb-3">13.2 Data Minimization</h3>
            <ul className="list-disc list-inside text-muted-foreground mb-4 space-y-2">
              <li>We only collect data necessary for the stated purposes</li>
              <li>Cookie data is automatically deleted after the specified retention period</li>
              <li>We regularly review and minimize the data collected through cookies</li>
            </ul>

            <h3 className="text-xl font-semibold mb-3">13.3 User Rights</h3>
            <ul className="list-disc list-inside text-muted-foreground mb-4 space-y-2">
              <li>Right to access cookie data we hold about you</li>
              <li>Right to correct inaccurate cookie data</li>
              <li>Right to delete cookie data (subject to legal requirements)</li>
              <li>Right to object to processing of cookie data for marketing purposes</li>
            </ul>

            <h3 className="text-xl font-semibold mb-3">13.4 Contact for Cookie Inquiries</h3>
            <p className="text-muted-foreground">
              For any questions about our cookie practices or to exercise your rights under the PDPA, please contact our Data Protection Officer at dpo@newy.com.my or use the contact information provided above.
            </p>
          </section>
        </ScrollReveal>
      </div>
    </div>
  );
}
