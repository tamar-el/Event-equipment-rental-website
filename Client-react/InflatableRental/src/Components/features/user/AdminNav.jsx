import React from 'react';
import { useNavigate } from 'react-router-dom';
import './users.css'
import { useSelector } from 'react-redux';
import LogoutIcon from '@mui/icons-material/Logout';
import LoginIcon from '@mui/icons-material/Login';

const AdminNav = () => {
  let nav = useNavigate()
  const { isLoggedIn } = useSelector((state) => state.user);
  const goToCategory = (category) => {
    nav(`/viewAll${category}`, {
      state: {
        displayMode: 'grid'
      }
    });
  }
  const about = () => {
    nav("/about/")
  }
  const viewAll = () => {
    nav("/viewAll", {
      state: {
        displayMode: 'grid'
      }
    })
  }
  const cart = () => {
    debugger
    nav("/AllRents/")
  }
  const home = () => {
    nav("/home/")
  }
  const addItem = () => {
    nav("/addNewItem/")
  }
  const users = () => {
    nav("/viewAllUser/")
  }
  const login = () => {
    nav("/login")
  }
  const reloadPage = () => {
    window.location.reload();
  }
  const park = () => {
    nav("/galery/")
  }
  const viewAllFood = () => {
    nav("/viewAll/food")
  }
  return (
    <>
      <div className="user-navbar">
        <button onClick={home}>ראשי</button>
        <button onClick={about}>אודות</button>
        <div className="dropdown">
          <button onClick={viewAll} className="dropbtn">מתנפחים</button>
          {/* <div className="dropdown-content">
            <button onClick={() => goToCategory('wet')}>רטובים</button>
            <button onClick={() => goToCategory('dry')}>יבשים</button>
            <button onClick={() => goToCategory('gymbory')}>ג'ימבורי</button>
            <button onClick={() => goToCategory('park')}>מתקני לונה פארק</button>
          </div> */}
        </div>
        <button onClick={park}>פארק אלעד </button>
        <button onClick={cart}>הזמנות</button>
        <button onClick={viewAllFood}>מכונות מזון </button>
        <button onClick={addItem}>הוספת פריט</button>
        {/* <button onClick={home}>עדכון מוצר</button> */}
        <button onClick={users}>משתמשים</button>
        {/* <LoginIcon onClick={login}></LoginIcon> */}
        <div className="iconWrapper">
          <LoginIcon className="loginIcon" onClick={login} />
          <span className="tooltipText">Login</span>
        </div>

        {isLoggedIn &&
          <div className="iconWrapper">
            <LogoutIcon className="loginIcon" onClick={reloadPage} />
            <span className="tooltipText">Logout</span>
          </div>}
      </div>
    </>
  );
}

export default AdminNav;