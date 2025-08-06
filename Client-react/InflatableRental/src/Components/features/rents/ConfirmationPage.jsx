import React from 'react';
import { Link } from 'react-router-dom';
import './Rent.css';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const ConfirmationPage = () => {
  return (
    <div className="confirmation-container">
      <CheckCircleIcon style={{ fontSize: 80, color: 'green' }} />
      <h2>תודה על ההזמנה!</h2>
      <p>ההזמנה התקבלה. נציג יצור איתך קשר בקרוב להשלמת ההשכרה.</p>
      <Link to="/home" className="home-link">חזרה לדף הבית</Link>
    </div>
  );
};

export default ConfirmationPage;
