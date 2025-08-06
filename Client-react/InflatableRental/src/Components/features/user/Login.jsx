


import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginOrRegisterUser } from './userSlice';
import { fetchUser } from './userSlice'
import { useEffect } from 'react';
import './users.css';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const users = useSelector((state) => state.user.userList);
  const { connect } = useParams()
  const [user, setUser] = useState({
    id: '',
    email: '',
    name: '',
    password: '',
    telephone: '',
    profileImage: '../pictures/מתקני גימבורי/g7.jpg',
    cart: []
  });

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  useEffect(() => {
    dispatch(fetchUser());
  }, []);
  const check = () => {
    debugger
    if (connect) {
      if (!users.some(
        u => u.name === user.name && u.password === user.password
      )) {
        alert("משתמש לא קיים אנא נסה שוב או בצע התחברות מחדש")
        navigate("/login/")
      }
      else {
        dispatch(loginOrRegisterUser(user));
        navigate('/home');
      }
    } else {
      dispatch(loginOrRegisterUser(user));
      navigate('/home');
    }
  };

  return (
    <div className="signup-wrapper">

      <div className="signup-card">
        <div className="signup-image">
          <img src={user.profileImage} alt="ברוך הבא" />
        </div>
        <div className="signup-form">
          <h2>הצטרף לאתר המתנפחים</h2>
          <p>הרשמה מהירה וקלה להשכרת מתנפחים בקליק!</p>

          <div className="input-group">
            <input type="text" name="name" placeholder="שם מלא*" onChange={handleChange} />
          </div>
          <div className="input-group">
            <input type="password" name="password" placeholder="סיסמה*" onChange={handleChange} />
          </div>
          {!connect &&
            (<>
              <div className="input-group">
                <input type="email" name="email" placeholder="דואר אלקטרוני*" onChange={handleChange} />
              </div>
              <div className="input-group">
                <input type="tel" name="telephone" placeholder="טלפון" onChange={handleChange} />
              </div>
              <div className="input-group">
                <input type="text" name="profileImage" placeholder="קישור לתמונת פרופיל" value={user.profileImage} onChange={handleChange} />
              </div>
            </>)}
          <button className="signup-button" onClick={check}>הרשמה עכשיו!</button>

          {!connect && <Link to="/login/connect" className="connect-link"> יש כבר חשבון?</Link>}

        </div>


      </div>
    </div>
  );
};

export default Login;
