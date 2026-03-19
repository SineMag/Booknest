import { Link } from "react-router-dom";
import { 
  FaEnvelope, 
  FaQuestionCircle, 
  FaHotel, 
  FaListAlt,
  FaPhone, 
  FaComments,
  FaShieldAlt,
  FaTools,
  FaCreditCard,
  FaUser,
  FaHome
} from "react-icons/fa";
import "./HelpCenter.css";

const HelpCenter = () => {
  const helpCategories = [
    {
      title: "Booking & Reservations",
      icon: <FaHotel />,
      articles: [
        "How to make a booking",
        "Modifying or canceling reservations",
        "Payment methods and security",
        "Booking confirmation details"
      ]
    },
    {
      title: "Account Management",
      icon: <FaUser />,
      articles: [
        "Creating an account",
        "Updating profile information",
        "Password reset and security",
        "Managing favorites"
      ]
    },
    {
      title: "Property Information",
      icon: <FaHome />,
      articles: [
        "Finding the right accommodation",
        "Understanding property amenities",
        "Room types and descriptions",
        "Location and directions"
      ]
    },
    {
      title: "Payment & Billing",
      icon: <FaCreditCard />,
      articles: [
        "Accepted payment methods",
        "Refund policies",
        "Invoice and receipt requests",
        "Currency and pricing"
      ]
    },
    {
      title: "Technical Support",
      icon: <FaTools />,
      articles: [
        "Website troubleshooting",
        "Mobile app issues",
        "Browser compatibility",
        "Performance optimization"
      ]
    },
    {
      title: "Safety & Security",
      icon: <FaShieldAlt />,
      articles: [
        "Data protection policies",
        "Safe booking practices",
        "Verification processes",
        "Reporting suspicious activity"
      ]
    }
  ];

  return (
    <div className="help-center">
      <div className="help-header">
        <h1>Help Center</h1>
        <p>Find answers to common questions and get the support you need</p>
      </div>

      <div className="help-content">
        <div className="quick-actions">
          <h2>Quick Actions</h2>
          <div className="action-grid">
            <Link to="/contact" className="action-card">
              <div className="action-icon"><FaEnvelope /></div>
              <h3>Contact Support</h3>
              <p>Get help from our support team</p>
            </Link>
            <Link to="/faq" className="action-card">
              <div className="action-icon"><FaQuestionCircle /></div>
              <h3>View FAQ</h3>
              <p>Frequently asked questions</p>
            </Link>
            <Link to="/dashboard" className="action-card">
              <div className="action-icon"><FaHotel /></div>
              <h3>Browse Hotels</h3>
              <p>Find your perfect accommodation</p>
            </Link>
            <Link to="/my-bookings" className="action-card">
              <div className="action-icon"><FaListAlt /></div>
              <h3>My Bookings</h3>
              <p>Manage your reservations</p>
            </Link>
          </div>
        </div>

        <div className="help-categories">
          <h2>Browse by Category</h2>
          <div className="category-grid">
            {helpCategories.map((category, index) => (
              <div key={index} className="category-card">
                <div className="category-header">
                  <span className="category-icon">{category.icon}</span>
                  <h3>{category.title}</h3>
                </div>
                <ul className="article-list">
                  {category.articles.map((article, articleIndex) => (
                    <li key={articleIndex} className="article-item">
                      <Link to="#" className="article-link">{article}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="contact-support">
          <h2>Still Need Help?</h2>
          <p>Our support team is here to assist you with any questions or concerns.</p>
          <div className="contact-options">
            <div className="contact-option">
              <h3><FaEnvelope /> Email Support</h3>
              <p>support@booknest.com</p>
              <span className="response-time">Response within 24 hours</span>
            </div>
            <div className="contact-option">
              <h3><FaPhone /> Phone Support</h3>
              <p>+27 11 234 5678</p>
              <span className="response-time">Mon-Fri: 8AM-6PM</span>
            </div>
            <div className="contact-option">
              <h3><FaComments /> Live Chat</h3>
              <p>Available 24/7</p>
              <span className="response-time">Instant responses</span>
            </div>
          </div>
          <Link to="/contact" className="contact-button">
            Contact Support Team
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HelpCenter;
