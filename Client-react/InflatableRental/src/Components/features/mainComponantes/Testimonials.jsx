import React from 'react';
import { FaStar } from 'react-icons/fa';
import './mainCom.css';

const testimonials = [
  {
    name: 'מירית גרפי',
    date: '28/04/16',
    rating: 5,
    text: 'מעולים, צוות מקסים יחס אדיב מתנפחים בטיחותיים ביותר, אחלה שירות, ממליצה בחוםםםםםם',
  },
  {
    name: 'אביחי ויריעות קירט',
    date: '27/03/17',
    rating: 5,
    text: 'שירות איכותי ואדיב. מתקנים ברמה גבוהה איכותיים וגדולים. תודה רבה! הילדים נהנו מאוד.',
  },
  {
    name: 'CAN CHEN',
    date: '18/01/16',
    rating: 5,
    text: 'חוויה נהדרת! הכל עבד בצורה חלקה.',
  },
  {
    name: 'כוכבה שפנ',
    date: '28/01/17',
    rating: 5,
    text: 'אלופים! מקצוענים, מתקנים איכותיים, שירות אדיב ומצוין.',
  },
];

const Testimonials = () => {
  return (
    <div className="testimonials-container">
      {testimonials.map((t, i) => (
        <div key={i} className="testimonial-box">
          <p className="quote">“</p>
          <p className="testimonial-text">{t.text}</p>
          <div className="stars">
            {[...Array(t.rating)].map((_, idx) => (
              <FaStar key={idx} className="star" />
            ))}
          </div>
          <p className="name">{t.name}</p>
          <p className="date">{t.date}</p>
        </div>
      ))}
    </div>
  );
};

export default Testimonials;
