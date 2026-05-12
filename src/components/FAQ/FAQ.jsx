import { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './FAQ.css';

const faqData = [
  {
    question: 'What is the delivery time?',
    answer: 'Standard delivery takes 3-5 business days. Express shipping is available for 1-2 business days delivery across all major cities.',
  },
  {
    question: 'Do you offer international shipping?',
    answer: 'Yes, we ship worldwide. International shipping times vary between 7-14 business days depending on the destination country.',
  },
  {
    question: 'What is your return policy?',
    answer: 'We offer a hassle-free 30-day return policy for unworn items with all original tags attached. Custom or personalized items are final sale.',
  },
  {
    question: 'How can I track my order?',
    answer: 'Once your order is shipped, you will receive an email with a unique tracking number to monitor your delivery status in real-time.',
  },
];

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const faqRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    if (faqRef.current) {
      const items = faqRef.current.querySelectorAll('.faq-item');
      
      gsap.fromTo(
        items,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          scrollTrigger: {
            trigger: faqRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }
    
    return () => {
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.vars.trigger === faqRef.current) {
          trigger.kill();
        }
      });
    };
  }, []);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section ref={faqRef} className="faq-section section-padding">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Frequently Asked Questions</h2>
          <p className="section-subtitle">Everything you need to know about our products and services</p>
        </div>
        
        <div className="faq-container">
          {faqData.map((item, index) => (
            <div 
              key={index} 
              className={`faq-item ${activeIndex === index ? 'active' : ''}`}
            >
              <button 
                className="faq-question"
                onClick={() => toggleAccordion(index)}
              >
                <span>{item.question}</span>
                <span className="faq-icon">
                  {activeIndex === index ? '−' : '+'}
                </span>
              </button>
              <div 
                className="faq-answer-wrapper"
                style={{
                  maxHeight: activeIndex === index ? '200px' : '0',
                  opacity: activeIndex === index ? 1 : 0
                }}
              >
                <div className="faq-answer">
                  {item.answer}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
