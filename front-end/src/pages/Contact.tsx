import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Contact.css";

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      setSubmitMessage(
        "Thank you for your message! We'll get back to you within 24 hours.",
      );
      setFormData({ name: "", email: "", subject: "", message: "" });
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <div className="contact-container">
      <div className="contact-content">
        <h1>Contact Us</h1>

        <div className="contact-grid">
          <div className="contact-info">
            <h2>Get in Touch</h2>
            <p>
              We're here to help! Whether you have questions about bookings,
              need support with your account, or want to partner with us, our
              team is ready to assist you.
            </p>

            <div className="contact-details">
              <div className="contact-item">
                <h3>Email</h3>
                <p>support@booknest.com</p>
                <p>partnerships@booknest.com</p>
              </div>

              <div className="contact-item">
                <h3>Phone</h3>
                <p>+27 11 234 5678</p>
                <p>Mon-Fri: 8AM-6PM, Sat: 9AM-2PM</p>
              </div>

              <div className="contact-item">
                <h3>Office</h3>
                <p>123 Sandton Drive</p>
                <p>Sandton, Johannesburg</p>
                <p>2196, South Africa</p>
              </div>
            </div>

            <div className="contact-hours">
              <h3>Response Times</h3>
              <ul>
                <li>Email: Within 24 hours</li>
                <li>Phone: Immediate during business hours</li>
                <li>Social Media: Within 2-4 hours</li>
              </ul>
            </div>
          </div>

          <div className="contact-form">
            <h2>Send us a Message</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Full Name *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email Address *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="subject">Subject *</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="message">Message *</label>
                <textarea
                  id="message"
                  name="message"
                  rows={6}
                  value={formData.message}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                className="submit-btn"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </button>

              {submitMessage && (
                <div className="submit-message">{submitMessage}</div>
              )}
            </form>
          </div>
        </div>

        <div className="contact-faq">
          <h2>Frequently Asked Questions</h2>
          <div className="faq-grid">
            <div className="faq-item">
              <h3>How do I make a booking?</h3>
              <p>
                Browse our accommodations, select your dates, and follow the
                simple checkout process.
              </p>
            </div>
            <div className="faq-item">
              <h3>Can I cancel my booking?</h3>
              <p>
                Yes, cancellation policies vary by property. Check the specific
                terms before booking.
              </p>
            </div>
            <div className="faq-item">
              <h3>How do I list my property?</h3>
              <p>
                Contact our partnerships team or visit our "List Your Property"
                page to get started.
              </p>
            </div>
            <div className="faq-item">
              <h3>Is my payment information secure?</h3>
              <p>
                Yes, we use industry-standard encryption to protect all payment
                transactions.
              </p>
            </div>
          </div>
        </div>

        <div className="contact-back">
          <Link to="/" className="back-link">
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Contact;
