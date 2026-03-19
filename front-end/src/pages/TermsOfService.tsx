import "./TermsOfService.css";

const TermsOfService = () => {
  const lastUpdated = "March 19, 2025";

  return (
    <div className="terms-of-service">
      <div className="terms-header">
        <h1>Terms of Service</h1>
        <p>Last updated: {lastUpdated}</p>
      </div>

      <div className="terms-content">
        <section className="terms-section">
          <h2>1. Acceptance of Terms</h2>
          <p>
            By accessing and using BookNest, you accept and agree to be bound by the terms and provision of this agreement. 
            If you do not agree to abide by the above, please do not use this service.
          </p>
        </section>

        <section className="terms-section">
          <h2>2. Description of Service</h2>
          <p>
            BookNest is an online platform that connects travelers with accommodation providers. Our service includes:
          </p>
          <ul>
            <li>Search and discovery of accommodations</li>
            <li>Online booking and reservation management</li>
            <li>Payment processing for bookings</li>
            <li>Review and rating system</li>
            <li>Customer support and dispute resolution</li>
          </ul>
        </section>

        <section className="terms-section">
          <h2>3. User Accounts</h2>
          <div className="subsection">
            <h3>3.1 Account Registration</h3>
            <p>
              To use certain features of BookNest, you must register for an account. You agree to:
            </p>
            <ul>
              <li>Provide accurate, current, and complete information</li>
              <li>Maintain and update your information promptly</li>
              <li>Maintain the security of your password</li>
              <li>Accept responsibility for all activities under your account</li>
            </ul>
          </div>
          <div className="subsection">
            <h3>3.2 Account Termination</h3>
            <p>
              BookNest reserves the right to suspend or terminate accounts for violations of these terms or 
              for any other reason at our sole discretion.
            </p>
          </div>
        </section>

        <section className="terms-section">
          <h2>4. Bookings and Payments</h2>
          <div className="subsection">
            <h3>4.1 Booking Process</h3>
            <p>
              When you make a booking through BookNest, you agree to:
            </p>
            <ul>
              <li>Provide accurate booking information</li>
              <li>Comply with the property's specific policies</li>
              <li>Pay all applicable fees and taxes</li>
              <li>Follow check-in and check-out procedures</li>
            </ul>
          </div>
          <div className="subsection">
            <h3>4.2 Payment Terms</h3>
            <p>
              All payments are processed securely through our payment partners. You agree to:
            </p>
            <ul>
              <li>Provide valid payment information</li>
              <li>Authorize charges for your bookings</li>
              <li>Pay any additional fees or charges as required</li>
            </ul>
          </div>
          <div className="subsection">
            <h3>4.3 Cancellation and Refunds</h3>
            <p>
              Cancellation policies vary by property and rate type. You are responsible for reviewing 
              and understanding the specific cancellation terms before booking.
            </p>
          </div>
        </section>

        <section className="terms-section">
          <h2>5. Property Listings</h2>
          <div className="subsection">
            <h3>5.1 Property Owner Responsibilities</h3>
            <p>
              Property owners and managers agree to:
            </p>
            <ul>
              <li>Provide accurate and complete property information</li>
              <li>Maintain properties to advertised standards</li>
              <li>Honor confirmed bookings and rates</li>
              <li>Comply with all applicable laws and regulations</li>
            </ul>
          </div>
          <div className="subsection">
            <h3>5.2 Content Standards</h3>
            <p>
              Property listings must not contain:
            </p>
            <ul>
              <li>False or misleading information</li>
              <li>Illegal or prohibited content</li>
              <li>Infringing content of any kind</li>
              <li>Discriminatory language or practices</li>
            </ul>
          </div>
        </section>

        <section className="terms-section">
          <h2>6. User Conduct</h2>
          <p>You agree not to use BookNest to:</p>
          <ul>
            <li>Violate any applicable laws or regulations</li>
            <li>Infringe on intellectual property rights</li>
            <li>Transmit harmful, offensive, or inappropriate content</li>
            <li>Interfere with or disrupt the service</li>
            <li>Attempt to gain unauthorized access to our systems</li>
            <li>Use the service for fraudulent or illegal purposes</li>
            <li>Harass, abuse, or harm other users</li>
          </ul>
        </section>

        <section className="terms-section">
          <h2>7. Reviews and Ratings</h2>
          <div className="subsection">
            <h3>7.1 Review Guidelines</h3>
            <p>
              When submitting reviews, you agree to:
            </p>
            <ul>
              <li>Provide honest and accurate feedback</li>
              <li>Base reviews on personal experience</li>
              <li>Refrain from false or defamatory statements</li>
              <li>Respect privacy and confidentiality</li>
            </ul>
          </div>
          <div className="subsection">
            <h3>7.2 Review Moderation</h3>
            <p>
              BookNest reserves the right to remove or edit reviews that violate our guidelines or terms of service.
            </p>
          </div>
        </section>

        <section className="terms-section">
          <h2>8. Intellectual Property</h2>
          <p>
            All content on BookNest, including text, graphics, logos, images, and software, is owned by 
            BookNest or our licensors and is protected by intellectual property laws.
          </p>
          <p>
            You may not use, reproduce, or distribute our content without our prior written consent.
          </p>
        </section>

        <section className="terms-section">
          <h2>9. Limitation of Liability</h2>
          <p>
            To the fullest extent permitted by law, BookNest shall not be liable for any indirect, incidental, 
            special, or consequential damages resulting from your use of our service.
          </p>
          <p>
            Our total liability for any claims arising from or related to these terms shall not exceed 
            the amount you paid for the relevant booking.
          </p>
        </section>

        <section className="terms-section">
          <h2>10. Indemnification</h2>
          <p>
            You agree to indemnify and hold BookNest harmless from any claims, damages, or expenses 
            arising from your use of our service or violation of these terms.
          </p>
        </section>

        <section className="terms-section">
          <h2>11. Dispute Resolution</h2>
          <div className="subsection">
            <h3>11.1 Good Faith Negotiation</h3>
            <p>
              If a dispute arises, we encourage both parties to first attempt to resolve it through 
              good faith negotiation.
            </p>
          </div>
          <div className="subsection">
            <h3>11.2 Governing Law</h3>
            <p>
              These terms are governed by the laws of South Africa, without regard to conflict of law principles.
            </p>
          </div>
        </section>

        <section className="terms-section">
          <h2>12. Service Availability</h2>
          <p>
            BookNest strives to maintain high service availability but does not guarantee uninterrupted access. 
            We may temporarily suspend the service for maintenance, updates, or other technical reasons.
          </p>
        </section>

        <section className="terms-section">
          <h2>13. Modifications to Terms</h2>
          <p>
            We reserve the right to modify these terms at any time. Changes will be effective immediately 
            upon posting. Your continued use of the service constitutes acceptance of any modifications.
          </p>
        </section>

        <section className="terms-section">
          <h2>14. Contact Information</h2>
          <p>
            If you have questions about these Terms of Service, please contact us:
          </p>
          <div className="contact-info">
            <p><strong>Email:</strong> legal@booknest.com</p>
            <p><strong>Phone:</strong> +27 11 234 5678</p>
            <p><strong>Address:</strong> 123 Sandton Drive, Sandton, Johannesburg, 2196, South Africa</p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default TermsOfService;
