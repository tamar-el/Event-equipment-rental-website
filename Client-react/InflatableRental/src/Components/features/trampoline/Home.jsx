// import React from 'react';
// import { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import OurPartners from '../mainComponantes/OurPartners';
// import ViewAllTrampoline from './ViewAllTrampoline';
// import Testimonials from '../mainComponantes/Testimonials';
// const Home = () => {


//     let nav = useNavigate()

//     return (
//         <>
//             <h1>Home</h1>
//             <div className="homepage-section">
//                 <h2>הטרמפולינות הפופולריות</h2>
//                 <ViewAllTrampoline category="trampoline" displayMode="slider" />
//             </div>
//             <OurPartners></OurPartners>
//             <section className="testimonials-wrapper">
//                 <h2 className="testimonials-title">המלצות</h2>
//                 <Testimonials />
//             </section>
//         </>
//     );
// }

// export default Home;





import React from 'react';
import { useNavigate } from 'react-router-dom';
import OurPartners from '../mainComponantes/OurPartners';
import ViewAllTrampoline from './ViewAllTrampoline';
import Testimonials from '../mainComponantes/Testimonials';
import { useState, useEffect } from 'react';
import './Home.css';

const Home = () => {
    const images = [
        "/pictures/מתקני לונה פארק/L1.jpg",
        "/pictures/מתקני גימבורי/g1.jpg",
        "/pictures/מתקנים רטובים/d1.jpg"
    ];

    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 3000);

        return () => clearInterval(interval);
    }, []);

    const nav = useNavigate();

    return (
        <>
            <div className="home-container">
                <div className="home-wrapper">
                    <header className="hero-section">
                        <div className="hero-text">
                            <h1>ברוכים הבאים ל-חוויות!</h1>
                            <p>השכרת מתנפחים ואטרקציות לאירועים בלתי נשכחים</p>
                            <button className="hero-btn" onClick={() => nav('/viewAll')}>לצפייה בכל המתקנים</button>
                        </div>
                        <div className="hero-image">
                            <img src="\public\pictures\אחר\cd172b27-4f7b-4cb9-8dfd-93df986a90c6.jpg" className='home-image' alt="מתנפחים שמחים" />
                        </div>
                    </header>
                    <div className="quality-section">
                        <div className="quality-image-slider">
                            <div className="quality-image-slider fade">
                                <img
                                    key={currentImageIndex} // גורם לריענון אנימציה
                                    src={images[currentImageIndex]}
                                    alt={`טרמפולינה ${currentImageIndex + 1}`}
                                    className="slide-image"
                                />
                            </div>

                        </div>
                        <div className="quality-text">
                            <h2>💎 איכות, בטיחות ואחריות</h2>
                            <p>
                                כל הטרמפולינות והמתקנים שלנו עוברים בדיקות תקינות קפדניות,
                                מחזיקים בתווי תקן מחמירים ומלווים באחריות מלאה. אנו מתחייבים לספק חוויות בטוחות, מהנות ובלתי נשכחות!
                            </p>
                        </div>
                    </div>

                    <section className="categories-section">
                        {[
                            {
                                title: 'מתנפחים יבשים',
                                image: '/public/pictures/אחר/w16.jpg',
                                description: 'מתקנים לקפיצה והנאה מושלמת באוויר הפתוח.',
                                link: '/viewAll/dry',
                            },
                            {
                                title: 'מתנפחים רטובים',
                                image:  '/public/pictures/אחר/L18.jpg',
                                description: 'כיף מתיז ומרענן לימי הקיץ החמים!',
                                link: '/viewAll/wet',
                            },
                            {
                                title: 'מתקני ג’ימבורי',
                                image: '/public/pictures/אחר/g10.jpg',
                                description: 'לגיל הרך – מרחב בטוח ומשעשע לפעוטות.',
                                link: '/viewAll/gymbory',
                            },
                        ].map((cat, i) => (
                            <div key={i} className="category-card" style={{ backgroundImage: `url(${cat.image})` }}>
                                <div className="overlay">
                                    <button onClick={() => nav(cat.link)}>לצפייה</button>
                                </div>
                                <div className="category-info">
                                    <h3 style={{ color:"orange" }}>{cat.title}</h3>
                                    <p>{cat.description}</p>
                                
                                </div>
                            </div>
                        ))}
                    </section>

                  

                    <OurPartners />

                    <section className="testimonials-wrapper">
                        <h2 className="testimonials-title">⭐️ המלצות מלקוחות</h2>
                        <Testimonials />
                    </section>
                </div>
            </div>
        </>
    );
};

export default Home;
