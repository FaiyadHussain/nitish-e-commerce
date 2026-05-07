import { useState } from 'react';
import { motion } from 'framer-motion';
import AnimatedBackground from '../../components/AnimatedBackground/AnimatedBackground';
import AnimatedButton from '../../components/AnimatedButton/AnimatedButton';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
    alert('Thank you for your message! We will get back to you soon.');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div className="contact-page">
      <AnimatedBackground variant="about" intensity="low" />
      <div className="contact-hero">
        <h1>Get in Touch</h1>
        <p>We'd love to hear from you</p>
      </div>

      <div className="container">
        <div className="contact-content">
          <div className="contact-info">
            <h2>Contact Information</h2>
            <div className="info-item">
              <h3>Email</h3>
              <p>hello@luxury.com</p>
            </div>
            <div className="info-item">
              <h3>Phone</h3>
              <p>+91 -7799111701 </p>
            </div>
            <div className="info-item">
              <h3>Address</h3>
              <p>
                123 Fashion Street
                <br />
                New York, NY 10001
                <br />
                United States
              </p>
            </div>
            <div className="info-item">
              <h3>Hours</h3>
              <p>
                Monday - Friday: 9:00 AM - 6:00 PM
                <br />
                Saturday: 10:00 AM - 4:00 PM
                <br />
                Sunday: Closed
              </p>
            </div>
          </div>

          <motion.form
            className="contact-form"
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="form-group">
              <label htmlFor="name">Name</label>
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
              <label htmlFor="email">Email</label>
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
              <label htmlFor="subject">Subject</label>
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
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                rows="6"
                value={formData.message}
                onChange={handleChange}
                required
              ></textarea>
            </div>
            <AnimatedButton type="submit" variant="primary" size="lg">
              Send Message
            </AnimatedButton>
          </motion.form>
        </div>
      </div>
    </div>
  );
};

export default Contact;

