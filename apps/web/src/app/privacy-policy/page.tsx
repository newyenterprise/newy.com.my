import { ScrollReveal } from "../../components/scroll-reveal";

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen py-24">
      <div className="container max-w-4xl">
        <ScrollReveal>
          <h1 className="text-4xl font-bold font-display mb-8">Privacy Policy</h1>
          <p className="text-muted-foreground mb-8">
            <strong>Last updated:</strong> {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </ScrollReveal>

        <ScrollReveal className="space-y-8">
          <section>
            <h2 className="text-2xl font-semibold mb-4">1. Introduction</h2>
            <p className="text-muted-foreground mb-4">
              Newy Enterprise ("we," "our," or "us") is committed to protecting your privacy in accordance with Malaysia's Personal Data Protection Act 2010 (PDPA). This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website, use our services, or interact with us in any way.
            </p>
            <p className="text-muted-foreground">
              By using our services, you consent to the data practices described in this policy. If you do not agree with our policies and practices, please do not use our services.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">2. Information We Collect</h2>
            
            <h3 className="text-xl font-semibold mb-3">2.1 Personal Information</h3>
            <p className="text-muted-foreground mb-4">
              We may collect personal information that you voluntarily provide to us, including but not limited to:
            </p>
            <ul className="list-disc list-inside text-muted-foreground mb-4 space-y-2">
              <li>Name, email address, phone number, and mailing address</li>
              <li>Company name, job title, and business information</li>
              <li>Payment and billing information</li>
              <li>Communication preferences and marketing preferences</li>
              <li>Information provided through contact forms, consultations, or support requests</li>
            </ul>

            <h3 className="text-xl font-semibold mb-3">2.2 Automatically Collected Information</h3>
            <p className="text-muted-foreground mb-4">
              When you visit our website, we automatically collect certain information, including:
            </p>
            <ul className="list-disc list-inside text-muted-foreground mb-4 space-y-2">
              <li>IP address, browser type, and operating system</li>
              <li>Pages visited, time spent on pages, and navigation patterns</li>
              <li>Device information and unique device identifiers</li>
              <li>Cookies and similar tracking technologies</li>
              <li>Referral sources and search terms</li>
            </ul>

            <h3 className="text-xl font-semibold mb-3">2.3 Third-Party Information</h3>
            <p className="text-muted-foreground">
              We may receive information about you from third parties, such as business partners, service providers, and publicly available sources, to supplement the information we collect directly from you.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">3. How We Use Your Information</h2>
            <p className="text-muted-foreground mb-4">
              We use the information we collect for various purposes in compliance with Malaysia's PDPA, including:
            </p>
            <ul className="list-disc list-inside text-muted-foreground mb-4 space-y-2">
              <li>Providing and maintaining our digital services (website development, mobile apps, AI automation, digital marketing)</li>
              <li>Processing transactions and managing payments</li>
              <li>Communicating with you about our services and responding to inquiries</li>
              <li>Sending marketing and promotional materials (only with your explicit consent)</li>
              <li>Providing technical support and customer service</li>
              <li>Improving our website and services based on user feedback</li>
              <li>Analyzing usage patterns and trends for service enhancement</li>
              <li>Preventing fraud and ensuring security of our systems</li>
              <li>Complying with legal obligations under Malaysian law</li>
              <li>Maintaining business records as required by Malaysian regulations</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">4. Information Sharing and Disclosure</h2>
            <p className="text-muted-foreground mb-4">
              We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except in the following circumstances permitted under Malaysia's PDPA:
            </p>
            <ul className="list-disc list-inside text-muted-foreground mb-4 space-y-2">
              <li><strong>Service Providers:</strong> We may share information with trusted third-party service providers who assist us in operating our website, conducting business, or servicing you, subject to strict confidentiality agreements</li>
              <li><strong>Legal Requirements:</strong> We may disclose information if required by Malaysian law, court orders, or government authorities</li>
              <li><strong>Business Transfers:</strong> In the event of a merger, acquisition, or sale of assets, your information may be transferred as part of the transaction, with prior notice to affected individuals</li>
              <li><strong>Protection of Rights:</strong> We may disclose information to protect our rights, property, or safety, or that of our users or others, as permitted by law</li>
              <li><strong>Explicit Consent:</strong> We may share information with your explicit written consent for specific purposes</li>
              <li><strong>Public Interest:</strong> We may disclose information when necessary for public interest, national security, or law enforcement purposes as permitted under Malaysian law</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">5. Data Security</h2>
            <p className="text-muted-foreground mb-4">
              We implement appropriate technical and organizational security measures in compliance with Malaysia's PDPA to protect your personal information against unauthorized access, alteration, disclosure, or destruction. Our security measures include:
            </p>
            <ul className="list-disc list-inside text-muted-foreground mb-4 space-y-2">
              <li>SSL encryption for data transmission</li>
              <li>Secure data storage with access controls</li>
              <li>Regular security audits and updates</li>
              <li>Employee training on data protection</li>
              <li>Incident response procedures</li>
              <li>Regular backup and recovery systems</li>
            </ul>
            <p className="text-muted-foreground">
              However, no method of transmission over the internet or electronic storage is 100% secure, and we cannot guarantee absolute security. We will notify you promptly of any data breaches as required by Malaysian law.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">6. Cookies and Tracking Technologies</h2>
            <p className="text-muted-foreground mb-4">
              We use cookies and similar tracking technologies to enhance your experience on our website. For detailed information about our use of cookies, please see our <a href="/cookie-policy" className="text-purple-400 hover:text-purple-300 underline">Cookie Policy</a>.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">7. Your Rights and Choices</h2>
            <p className="text-muted-foreground mb-4">
              Under Malaysia's Personal Data Protection Act 2010 (PDPA), you have the following rights regarding your personal information:
            </p>
            <ul className="list-disc list-inside text-muted-foreground mb-4 space-y-2">
              <li><strong>Right to Access:</strong> Request access to your personal information that we hold</li>
              <li><strong>Right to Correction:</strong> Request correction of inaccurate, incomplete, or outdated personal information</li>
              <li><strong>Right to Withdraw Consent:</strong> Withdraw your consent for the processing of your personal information at any time</li>
              <li><strong>Right to Prevent Processing:</strong> Request that we stop processing your personal information for direct marketing purposes</li>
              <li><strong>Right to Data Portability:</strong> Request a copy of your personal information in a structured, commonly used format</li>
              <li><strong>Right to Complain:</strong> Lodge a complaint with the Personal Data Protection Commissioner if you believe your rights have been violated</li>
            </ul>
            <p className="text-muted-foreground mb-4">
              To exercise these rights, please contact us using the information provided below. We will respond to your request within 21 days as required by Malaysian law.
            </p>
            <p className="text-muted-foreground">
              <strong>Note:</strong> We may charge a reasonable fee for processing your request, as permitted under the PDPA.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">8. Data Retention</h2>
            <p className="text-muted-foreground mb-4">
              We retain your personal information for as long as necessary to fulfill the purposes outlined in this Privacy Policy, in compliance with Malaysia's PDPA. Our retention periods are as follows:
            </p>
            <ul className="list-disc list-inside text-muted-foreground mb-4 space-y-2">
              <li><strong>Customer Data:</strong> Retained for the duration of our business relationship plus 7 years for legal and tax compliance</li>
              <li><strong>Marketing Data:</strong> Retained until you withdraw consent or for 3 years of inactivity</li>
              <li><strong>Website Analytics:</strong> Retained for 26 months as per standard industry practice</li>
              <li><strong>Support Records:</strong> Retained for 3 years after case closure</li>
              <li><strong>Financial Records:</strong> Retained for 7 years as required by Malaysian tax law</li>
            </ul>
            <p className="text-muted-foreground">
              When we no longer need your information, we will securely delete or anonymize it in accordance with PDPA requirements.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">9. International Data Transfers</h2>
            <p className="text-muted-foreground mb-4">
              Your information may be transferred to and processed in countries other than Malaysia. We ensure that such transfers comply with Malaysia's PDPA and implement appropriate safeguards to protect your information, including:
            </p>
            <ul className="list-disc list-inside text-muted-foreground mb-4 space-y-2">
              <li>Standard contractual clauses approved by the Personal Data Protection Commissioner</li>
              <li>Adequacy decisions by the Commissioner for specific countries</li>
              <li>Explicit consent from data subjects for specific transfers</li>
              <li>Binding corporate rules for intra-group transfers</li>
            </ul>
            <p className="text-muted-foreground">
              We will only transfer your personal data to countries that provide adequate protection or with appropriate safeguards in place.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">10. Children's Privacy</h2>
            <p className="text-muted-foreground">
              Our services are not intended for children under the age of 13. We do not knowingly collect personal information from children under 13 without parental consent, as required by Malaysia's PDPA. If you believe we have collected information from a child under 13 without proper consent, please contact us immediately so we can take appropriate action.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">11. Changes to This Privacy Policy</h2>
            <p className="text-muted-foreground mb-4">
              We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date.
            </p>
            <p className="text-muted-foreground">
              Your continued use of our services after any changes constitutes acceptance of the updated Privacy Policy.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">12. Contact Us</h2>
            <p className="text-muted-foreground mb-4">
              If you have any questions about this Privacy Policy or our data practices, please contact us:
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
            <h2 className="text-2xl font-semibold mb-4">13. Malaysian Personal Data Protection Act 2010 Compliance</h2>
            <p className="text-muted-foreground mb-4">
              This Privacy Policy is designed to comply with Malaysia's Personal Data Protection Act 2010 (PDPA). Our data processing activities are based on the following principles:
            </p>
            <ul className="list-disc list-inside text-muted-foreground mb-4 space-y-2">
              <li><strong>Consent:</strong> We obtain your explicit consent before processing your personal data</li>
              <li><strong>Purpose Limitation:</strong> We only process personal data for specified, explicit, and legitimate purposes</li>
              <li><strong>Data Minimization:</strong> We collect only the personal data that is necessary for our purposes</li>
              <li><strong>Accuracy:</strong> We take reasonable steps to ensure personal data is accurate and up-to-date</li>
              <li><strong>Security:</strong> We implement appropriate security measures to protect personal data</li>
              <li><strong>Transparency:</strong> We provide clear information about our data processing activities</li>
            </ul>
          </section>

          
        </ScrollReveal>
      </div>
    </div>
  );
}
