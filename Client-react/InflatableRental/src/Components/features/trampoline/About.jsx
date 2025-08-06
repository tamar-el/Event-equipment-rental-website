
import React from 'react';
import './trampoline.css'

const About= () => {
  return (
    <section className="aboutSection">
      <div className="Aboutcontainer">
        
        {/* טקסט */}
        <div className="textContent">
          <h2 className="title">ברוכים הבאים ל<strong>חוויות</strong></h2>
          <h3 className="subtitle">הפקת אירועי מתנפחים ואטרקציות</h3>

          <p className="paragraph">
            אנו מספקים שירותי השכרה של טרמפולינות, מתקנים מתנפחים, מכונות מזון ואטרקציות נוספות – 
            לאירועים פרטיים ומוסדיים ברחבי הארץ.
          </p>

          <p className="paragraph">
            עם ניסיון עשיר, צוות מקצועי, בטיחות מקסימלית ומגוון צבעוני של מתקנים, אנחנו כאן כדי להפוך כל אירוע
            לחוויה בלתי נשכחת.
          </p>

          <p className="paragraph">
            בין אם אתם חוגגים יום הולדת, מסיבת גן, אירוע בית ספר או חג קהילתי – <strong>חוויות</strong> מביאה את הכיף עד אליכם.
          </p>
        </div>

        {/* תמונה */}
        <div className="imageContainer">
          <img
            src="..\public\pictures\פינות ישיבה והצללות\z1.jpg"
            alt="חוויות - מתקנים מתנפחים"
            className="image"
          />
        </div>

      </div>
    </section>
  );
};

export default About;
