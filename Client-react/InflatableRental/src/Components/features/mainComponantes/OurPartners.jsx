import React from 'react';
import './mainCom.css';

const partners = [
  { name: 'Microsoft', logo: 'https://trampolino.co.il/wp-content/uploads/2017/03/logo-6.png' },
  { name: 'Google', logo: 'https://trampolino.co.il/wp-content/uploads/2017/03/logo-141.png' },
  { name: 'Amazon', logo: 'https://trampolino.co.il/wp-content/uploads/2017/03/logo-5.png' },
  { name: 'Intel', logo: 'https://trampolino.co.il/wp-content/uploads/2017/03/logo-4.png' },
  { name: 'Apple', logo: 'https://trampolino.co.il/wp-content/uploads/2017/03/logo-1.png' },
  { name: 'Facebook', logo: 'https://trampolino.co.il/wp-content/uploads/2017/03/logo-6.png' },
  { name: 'IBM', logo: 'https://trampolino.co.il/wp-content/uploads/2017/03/logo-4.png' },
];

export default function OurPartners() {
  return (
    <section className="partners-section">
      <h2 className="partners-title">🤝 החברות שאיתנו</h2>
      <div className="partners-marquee">
        <div className="partners-track">
          {/* //שיראה הרבה זה מוכפל בשניים */}
          {[...partners, ...partners].map((partner, index) => (
            <div key={index} className="partner-logo-box">
              <img src={partner.logo} alt={partner.name} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
