import "./PrivacyPolicy.css";

const PrivacyPolicy = () => {
  const lastUpdated = "March 19, 2025";

  return (
    <div className="privacy-policy">
      <div className="policy-header">
        <h1>Privacy Policy</h1>
        <p>Last updated: {lastUpdated}</p>
      </div>

      <div className="policy-content">
        <section className="policy-section">
          <h2>Introduction</h2>
          <p>
            At BookNest, we are committed to protecting your privacy and ensuring the security of your personal information. 
            This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our 
            website and services.
          </p>
          <p>
            By using BookNest, you agree to the collection and use of information in accordance with this policy.
          </p>
        </section>

        <section className="policy-section">
          <h2>Information We Collect</h2>
          <div className="subsection">
            <h3>Personal Information</h3>
            <p>We may collect the following types of personal information:</p>
            <ul>
              <li>Name, email address, phone number</li>
              <li>Billing and payment information</li>
              <li>Travel preferences and booking history</li>
              <li>Communication preferences</li>
              <li>Account credentials (encrypted)</li>
            </ul>
          </div>
          <div className="subsection">
            <h3>Automatically Collected Information</h3>
            <p>We automatically collect certain information when you use our services:</p>
            <ul>
              <li>IP address and device information</li>
              <li>Browser type and version</li>
              <li>Pages visited and time spent on our site</li>
              <li>Click patterns and navigation behavior</li>
              <li>Location information (with your consent)</li>
            </ul>
          </div>
        </section>

        <section className="policy-section">
          <h2>How We Use Your Information</h2>
          <p>We use your information for the following purposes:</p>
          <ul>
            <li><strong>Service Provision:</strong> To process bookings, provide customer support, and deliver our services</li>
            <li><strong>Personalization:</strong> To customize your experience and provide relevant recommendations</li>
            <li><strong>Communication:</strong> To send booking confirmations, updates, and marketing communications</li>
            <li><strong>Security:</strong> To protect against fraud and ensure the security of our platform</li>
            <li><strong>Improvement:</strong> To analyze usage patterns and improve our services</li>
            <li><strong>Legal Compliance:</strong> To comply with applicable laws and regulations</li>
          </ul>
        </section>

        <section className="policy-section">
          <h2>Information Sharing</h2>
          <p>We do not sell your personal information. We may share your information only in the following circumstances:</p>
          <ul>
            <li><strong>Property Partners:</strong> With accommodation providers to fulfill your bookings</li>
            <li><strong>Service Providers:</strong> With trusted third-party service providers (payment processors, email services)</li>
            <li><strong>Legal Requirements:</strong> When required by law, court order, or government regulation</li>
            <li><strong>Business Transfers:</strong> In connection with mergers, acquisitions, or asset sales</li>
          </ul>
        </section>

        <section className="policy-section">
          <h2>Data Security</h2>
          <p>
            We implement appropriate security measures to protect your personal information, including:
          </p>
          <ul>
            <li>SSL encryption for data transmission</li>
            <li>Secure storage of payment information</li>
            <li>Regular security assessments and updates</li>
            <li>Access controls and authentication systems</li>
            <li>Employee training on data protection</li>
          </ul>
          <p>
            However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.
          </p>
        </section>

        <section className="policy-section">
          <h2>Cookies and Tracking</h2>
          <p>
            We use cookies and similar tracking technologies to enhance your experience and analyze website usage:
          </p>
          <ul>
            <li><strong>Essential Cookies:</strong> Required for basic website functionality</li>
            <li><strong>Performance Cookies:</strong> Help us understand how our website is used</li>
            <li><strong>Functional Cookies:</strong> Remember your preferences and settings</li>
            <li><strong>Marketing Cookies:</strong> Show relevant advertisements and content</li>
          </ul>
          <p>
            You can control cookie settings through your browser preferences.
          </p>
        </section>

        <section className="policy-section">
          <h2>Your Rights</h2>
          <p>Depending on your location, you may have the following rights regarding your personal information:</p>
          <ul>
            <li><strong>Access:</strong> Request access to your personal information</li>
            <li><strong>Correction:</strong> Request correction of inaccurate information</li>
            <li><strong>Deletion:</strong> Request deletion of your personal information</li>
            <li><strong>Portability:</strong> Request transfer of your data to another service</li>
            <li><strong>Objection:</strong> Object to processing of your information</li>
          </ul>
        </section>

        <section className="policy-section">
          <h2>Children's Privacy</h2>
          <p>
            Our services are not intended for children under 18 years of age. We do not knowingly collect 
            personal information from children. If we become aware that we have collected information 
            from a child, we will take steps to delete it immediately.
          </p>
        </section>

        <section className="policy-section">
          <h2>International Data Transfers</h2>
          <p>
            Your information may be transferred to and processed in countries other than your own. 
            We ensure appropriate safeguards are in place to protect your information in accordance 
            with applicable data protection laws.
          </p>
        </section>

        <section className="policy-section">
          <h2>Changes to This Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. We will notify you of any changes by:
          </p>
          <ul>
            <li>Posting the updated policy on our website</li>
            <li>Sending email notifications for significant changes</li>
            <li>Displaying prominent notices on our platform</li>
          </ul>
          <p>
            Your continued use of our services after any changes constitutes acceptance of the updated policy.
          </p>
        </section>

        <section className="policy-section">
          <h2>Contact Us</h2>
          <p>
            If you have questions about this Privacy Policy or how we handle your information, 
            please contact us:
          </p>
          <div className="contact-info">
            <p><strong>Email:</strong> privacy@booknest.com</p>
            <p><strong>Phone:</strong> +27 11 234 5678</p>
            <p><strong>Address:</strong> 123 Sandton Drive, Sandton, Johannesburg, 2196, South Africa</p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
