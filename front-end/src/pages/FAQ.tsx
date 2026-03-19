import { useState } from "react";
import "./FAQ.css";

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const faqData = [
    {
      category: "Booking & Reservations",
      questions: [
        {
          question: "How do I make a booking on BookNest?",
          answer: "Making a booking is simple! Browse our available accommodations, select your dates, choose your preferred room, and follow the checkout process. You'll receive a confirmation email once your booking is complete."
        },
        {
          question: "Can I modify or cancel my booking?",
          answer: "Yes, you can modify or cancel your booking through your account dashboard. Go to 'My Bookings' and select the booking you want to change. Please note that cancellation policies vary by property."
        },
        {
          question: "What payment methods are accepted?",
          answer: "We accept all major credit cards, debit cards, and digital payment methods including PayPal. All payments are processed securely through our encrypted payment gateway."
        },
        {
          question: "When will I be charged for my booking?",
          answer: "Payment policies vary by property. Some require full payment at booking, while others allow a deposit with the balance due closer to your stay date. Check the specific property's policy before booking."
        }
      ]
    },
    {
      category: "Account & Profile",
      questions: [
        {
          question: "Do I need an account to make a booking?",
          answer: "While you can browse without an account, you'll need to create one to make a booking. Having an account allows you to manage your bookings, save favorites, and enjoy a personalized experience."
        },
        {
          question: "How do I reset my password?",
          answer: "Click on 'Forgot Password' on the login page, enter your email address, and we'll send you a password reset link. Follow the instructions in the email to create a new password."
        },
        {
          question: "Can I change my personal information?",
          answer: "Yes! Log into your account and go to 'Profile' to update your personal information, including name, email, and contact details."
        },
        {
          question: "How do I delete my account?",
          answer: "If you wish to delete your account, please contact our support team at support@booknest.com. We'll guide you through the process and ensure your data is handled according to our privacy policy."
        }
      ]
    },
    {
      category: "Properties & Accommodations",
      questions: [
        {
          question: "How do I search for accommodations?",
          answer: "Use our search bar to enter your destination and dates. You can filter results by price, property type, amenities, and more. Click on any property to view detailed information and photos."
        },
        {
          question: "What's the difference between hotels and apartments?",
          answer: "Hotels typically offer daily housekeeping, on-site amenities, and front desk services. Apartments provide more space, kitchen facilities, and a home-like experience, ideal for longer stays."
        },
        {
          question: "Are the photos on the website accurate?",
          answer: "Yes, we require property owners to provide accurate, recent photos of their accommodations. However, we recommend reading reviews and contacting the property if you have specific questions."
        },
        {
          question: "How do I know if a property is available?",
          answer: "Our real-time availability system shows you which dates are available for each property. The calendar will display available dates in green and unavailable dates in red."
        }
      ]
    },
    {
      category: "Pricing & Fees",
      questions: [
        {
          question: "Are there any hidden fees?",
          answer: "We believe in transparent pricing. The price you see during booking includes all mandatory fees. However, some properties may charge additional fees for specific services, which will be clearly disclosed."
        },
        {
          question: "Do you offer discounts for long-term stays?",
          answer: "Many properties offer discounts for stays of 7 nights or more. These discounts are automatically applied when you search for extended dates. Look for the 'Long Stay Discount' badge on eligible properties."
        },
        {
          question: "What is your cancellation policy?",
          answer: "Cancellation policies vary by property and rate type. Common policies include free cancellation up to 24-48 hours before check-in, partial refunds, or non-refundable rates. Always check the specific policy before booking."
        },
        {
          question: "How do taxes work on BookNest?",
          answer: "Taxes are included in the displayed price where required by law. The final price breakdown will show any applicable taxes and fees before you complete your booking."
        }
      ]
    },
    {
      category: "Support & Safety",
      questions: [
        {
          question: "How can I contact customer support?",
          answer: "You can reach our support team via email at support@booknest.com, phone at +27 11 234 5678, or through our live chat feature available 24/7 on the website."
        },
        {
          question: "Is my personal information secure?",
          answer: "Absolutely! We use industry-standard encryption and security measures to protect your personal and payment information. Our privacy policy details how we handle and protect your data."
        },
        {
          question: "What should I do if I have a problem with my booking?",
          answer: "First, contact the property directly as they can often resolve issues quickly. If you need further assistance, our support team is here to help mediate and find a solution."
        },
        {
          question: "How do I report a suspicious listing?",
          answer: "If you encounter a suspicious listing, please report it immediately through our contact form or by emailing support@booknest.com. We investigate all reports thoroughly."
        }
      ]
    }
  ];

  const toggleQuestion = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="faq-page">
      <div className="faq-header">
        <h1>Frequently Asked Questions</h1>
        <p>Find answers to common questions about BookNest</p>
        <div className="faq-search">
          <input 
            type="text" 
            placeholder="Search FAQ..." 
            className="faq-search-input"
          />
        </div>
      </div>

      <div className="faq-content">
        {faqData.map((category, categoryIndex) => (
          <div key={categoryIndex} className="faq-category">
            <h2 className="category-title">{category.category}</h2>
            <div className="questions-list">
              {category.questions.map((item, questionIndex) => {
                const index = categoryIndex * 100 + questionIndex;
                return (
                  <div key={index} className="faq-item">
                    <button
                      className={`faq-question ${activeIndex === index ? 'active' : ''}`}
                      onClick={() => toggleQuestion(index)}
                    >
                      <span className="question-text">{item.question}</span>
                      <span className="faq-toggle">
                        {activeIndex === index ? '−' : '+'}
                      </span>
                    </button>
                    <div className={`faq-answer ${activeIndex === index ? 'show' : ''}`}>
                      <p>{item.answer}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <div className="faq-footer">
        <div className="still-need-help">
          <h2>Still Need Help?</h2>
          <p>Can't find the answer you're looking for? Our support team is here to help.</p>
          <div className="help-actions">
            <a href="/contact" className="help-button primary">Contact Support</a>
            <a href="/help" className="help-button secondary">Visit Help Center</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
