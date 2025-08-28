import { ScrollReveal } from "../../components/scroll-reveal";

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen py-24">
      <div className="container max-w-4xl">
        <ScrollReveal>
          <h1 className="text-4xl font-bold font-display mb-8">Terms of Service</h1>
          <p className="text-muted-foreground mb-8">
            <strong>Last updated:</strong> {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </ScrollReveal>

        <ScrollReveal className="space-y-8">
          <section>
            <h2 className="text-2xl font-semibold mb-4">1. Acceptance of Terms</h2>
            <p className="text-muted-foreground mb-4">
              By accessing and using the services provided by Digital Linked ("we," "our," or "us"), including our website, applications, and any related services (collectively, the "Services"), you accept and agree to be bound by these Terms of Service ("Terms").
            </p>
            <p className="text-muted-foreground">
              If you do not agree to these Terms, you must not use our Services. These Terms apply to all users, customers, and visitors of our Services.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">2. Description of Services</h2>
            <p className="text-muted-foreground mb-4">
              Digital Linked provides digital services including but not limited to:
            </p>
            <ul className="list-disc list-inside text-muted-foreground mb-4 space-y-2">
              <li>Website development and design services</li>
              <li>Mobile application development</li>
              <li>Digital marketing and SEO services</li>
              <li>AI automation and chatbot development</li>
              <li>Consulting and advisory services</li>
              <li>Technical support and maintenance</li>
            </ul>
            <p className="text-muted-foreground">
              We reserve the right to modify, suspend, or discontinue any part of our Services at any time without notice.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">3. User Accounts and Registration</h2>
            <p className="text-muted-foreground mb-4">
              To access certain features of our Services, you may be required to create an account. You agree to:
            </p>
            <ul className="list-disc list-inside text-muted-foreground mb-4 space-y-2">
              <li>Provide accurate, current, and complete information during registration</li>
              <li>Maintain and update your account information to keep it accurate and current</li>
              <li>Maintain the security of your account credentials</li>
              <li>Accept responsibility for all activities that occur under your account</li>
              <li>Notify us immediately of any unauthorized use of your account</li>
            </ul>
            <p className="text-muted-foreground">
              We reserve the right to terminate or suspend accounts that violate these Terms or for any other reason at our sole discretion.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">4. Pricing and Project Estimates</h2>
            <p className="text-muted-foreground mb-4">
              <strong>Important Notice:</strong> All pricing, duration estimates, and project timelines displayed on our website, provided through our chatbot, or mentioned in any marketing materials are for informational purposes only and should be considered as rough estimates.
            </p>
            <p className="text-muted-foreground mb-4">
              <strong>Final Pricing and Timeline:</strong> The actual pricing, project duration, and delivery timeline will be determined only after:
            </p>
            <ul className="list-disc list-inside text-muted-foreground mb-4 space-y-2">
              <li>Detailed discussion of your specific requirements</li>
              <li>Analysis of project complexity and scope</li>
              <li>Review of your existing systems and infrastructure</li>
              <li>Assessment of any third-party integrations or dependencies</li>
              <li>Consideration of your timeline and budget constraints</li>
            </ul>
            <p className="text-muted-foreground mb-4">
              <strong>Official Quotation:</strong> Only pricing and timelines provided in a formal written quotation after our initial consultation will be considered binding. We reserve the right to adjust estimates based on actual project requirements discovered during the consultation process.
            </p>
            <p className="text-muted-foreground">
              <strong>No Guarantees:</strong> We cannot guarantee that website estimates, chatbot responses, or marketing materials will accurately reflect the final project cost or timeline. These are provided solely for preliminary planning purposes.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">5. Payment Terms</h2>
            <p className="text-muted-foreground mb-4">
              For paid services, the following terms apply:
            </p>
            <ul className="list-disc list-inside text-muted-foreground mb-4 space-y-2">
              <li>All fees are quoted in Australian Dollars (AUD) unless otherwise specified</li>
              <li>Payment is due upon receipt of invoice unless otherwise agreed in writing</li>
              <li>We reserve the right to change our pricing with 30 days' notice</li>
              <li>Late payments may result in suspension of services</li>
              <li>All payments are non-refundable unless otherwise specified in writing</li>
              <li>You are responsible for any taxes associated with your use of our Services</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">6. Intellectual Property Rights</h2>
            <p className="text-muted-foreground mb-4">
              <strong>Our Rights:</strong> All content, features, and functionality of our Services, including but not limited to text, graphics, logos, images, software, and code, are owned by Digital Linked or its licensors and are protected by copyright, trademark, and other intellectual property laws.
            </p>
            <p className="text-muted-foreground mb-4">
              <strong>Your Rights:</strong> Upon full payment, you retain ownership of your content and we grant you a limited, non-exclusive license to use the deliverables created specifically for your project.
            </p>
            <p className="text-muted-foreground">
              <strong>Restrictions:</strong> You may not copy, modify, distribute, sell, or lease any part of our Services without our prior written consent.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">7. User Conduct and Prohibited Activities</h2>
            <p className="text-muted-foreground mb-4">
              You agree not to use our Services to:
            </p>
            <ul className="list-disc list-inside text-muted-foreground mb-4 space-y-2">
              <li>Violate any applicable laws or regulations</li>
              <li>Infringe upon the rights of others</li>
              <li>Transmit harmful, offensive, or inappropriate content</li>
              <li>Attempt to gain unauthorized access to our systems</li>
              <li>Interfere with or disrupt our Services</li>
              <li>Use our Services for any illegal or unauthorized purpose</li>
              <li>Attempt to reverse engineer or decompile our software</li>
              <li>Use automated systems to access our Services without permission</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">8. Privacy and Data Protection</h2>
            <p className="text-muted-foreground mb-4">
              Your privacy is important to us. Our collection and use of personal information is governed by our Privacy Policy, which is incorporated into these Terms by reference.
            </p>
            <p className="text-muted-foreground">
              By using our Services, you consent to the collection and use of your information as described in our Privacy Policy.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">9. Disclaimers and Limitations of Liability</h2>
            <p className="text-muted-foreground mb-4">
              <strong>Service Availability:</strong> We strive to provide reliable Services but cannot guarantee uninterrupted or error-free operation. Our Services are provided "as is" and "as available" without warranties of any kind.
            </p>
            <p className="text-muted-foreground mb-4">
              <strong>Limitation of Liability:</strong> To the maximum extent permitted by law, Digital Linked shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including but not limited to loss of profits, data, or use, arising out of or relating to your use of our Services.
            </p>
            <p className="text-muted-foreground">
              <strong>Maximum Liability:</strong> Our total liability to you for any claims arising from these Terms or your use of our Services shall not exceed the amount you paid us in the 12 months preceding the claim.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">10. Indemnification</h2>
            <p className="text-muted-foreground">
              You agree to indemnify, defend, and hold harmless Digital Linked and its officers, directors, employees, and agents from and against any claims, damages, losses, costs, and expenses (including reasonable attorneys' fees) arising out of or relating to your use of our Services, violation of these Terms, or violation of any rights of another party.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">11. Termination</h2>
            <p className="text-muted-foreground mb-4">
              We may terminate or suspend your access to our Services immediately, without prior notice, for any reason, including but not limited to:
            </p>
            <ul className="list-disc list-inside text-muted-foreground mb-4 space-y-2">
              <li>Violation of these Terms</li>
              <li>Non-payment of fees</li>
              <li>Fraudulent or illegal activity</li>
              <li>At our sole discretion for any other reason</li>
            </ul>
            <p className="text-muted-foreground">
              Upon termination, your right to use our Services will cease immediately, and we may delete your account and data.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">12. Governing Law and Dispute Resolution</h2>
            <p className="text-muted-foreground mb-4">
              These Terms shall be governed by and construed in accordance with the laws of Australia, without regard to conflict of law principles.
            </p>
            <p className="text-muted-foreground mb-4">
              Any disputes arising from these Terms or your use of our Services shall be resolved through binding arbitration in accordance with the rules of the Australian Centre for International Commercial Arbitration (ACICA).
            </p>
            <p className="text-muted-foreground">
              You agree to submit to the personal jurisdiction of the courts located in Australia for any legal proceedings that may arise.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">13. Force Majeure</h2>
            <p className="text-muted-foreground">
              We shall not be liable for any failure to perform our obligations under these Terms due to circumstances beyond our reasonable control, including but not limited to acts of God, natural disasters, war, terrorism, riots, fire, labor disputes, government actions, or technical failures.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">14. Severability</h2>
            <p className="text-muted-foreground">
              If any provision of these Terms is found to be unenforceable or invalid, that provision will be limited or eliminated to the minimum extent necessary so that these Terms will otherwise remain in full force and effect.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">15. Entire Agreement</h2>
            <p className="text-muted-foreground">
              These Terms, together with our Privacy Policy and any other agreements referenced herein, constitute the entire agreement between you and Digital Linked regarding your use of our Services and supersede all prior agreements and understandings.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">16. Changes to Terms</h2>
            <p className="text-muted-foreground mb-4">
              We reserve the right to modify these Terms at any time. We will notify you of any changes by posting the new Terms on this page and updating the "Last updated" date.
            </p>
            <p className="text-muted-foreground">
              Your continued use of our Services after any changes constitutes acceptance of the updated Terms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">17. Contact Information</h2>
            <p className="text-muted-foreground mb-4">
              If you have any questions about these Terms of Service, please contact us:
            </p>
            <div className="bg-muted/30 p-6 rounded-lg">
              <p className="text-muted-foreground mb-2">
                <strong>Digital Linked</strong><br />
                Email: legal@digitallinked.com.au<br />
                Phone: +61 (0) 400 000 000<br />
                Address: [Your Business Address]<br />
                Website: www.digitallinked.com.au
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">18. Service-Specific Terms</h2>
            
                         <h3 className="text-xl font-semibold mb-3">18.1 Website Development Services</h3>
            <ul className="list-disc list-inside text-muted-foreground mb-4 space-y-2">
              <li>Project timelines are estimates and may vary based on complexity and client feedback</li>
              <li>Final deliverables are provided upon full payment</li>
              <li>We retain the right to showcase completed work in our portfolio</li>
              <li>Client is responsible for providing necessary content and materials</li>
            </ul>

                         <h3 className="text-xl font-semibold mb-3">18.2 Digital Marketing Services</h3>
            <ul className="list-disc list-inside text-muted-foreground mb-4 space-y-2">
              <li>Results may vary and are not guaranteed</li>
              <li>Client is responsible for providing access to necessary accounts and platforms</li>
              <li>We may use third-party tools and platforms as part of our services</li>
              <li>Monthly reporting is provided as part of ongoing services</li>
            </ul>

                         <h3 className="text-xl font-semibold mb-3">18.3 Support and Maintenance</h3>
            <ul className="list-disc list-inside text-muted-foreground space-y-2">
              <li>Support is provided during business hours unless otherwise agreed</li>
              <li>Emergency support may incur additional charges</li>
              <li>Updates and maintenance are performed as needed</li>
              <li>Client is responsible for backing up their data</li>
            </ul>
          </section>
        </ScrollReveal>
      </div>
    </div>
  );
}
