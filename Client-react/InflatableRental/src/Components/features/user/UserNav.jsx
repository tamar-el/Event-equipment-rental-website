import { List } from 'material';
import React from 'react';
import MyRentsList from './MyRentsList';
import { useNavigate } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import './users.css'
import { useSelector } from 'react-redux';
import LogoutIcon from '@mui/icons-material/Logout';
import OneUser from './oneUser';
import LoginIcon from '@mui/icons-material/Login';
const UserNav = () => {
    let nav = useNavigate()
    const userSlice = useSelector((state) => state.user);
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
    const viewAllFood=()=>{
        nav("/viewAll/food")
    }
    const cart = () => {
        nav("/RentCart/")
    }
    const home = () => {
        nav("/home/")
    }
    const GoMyRentsList = () => {
        nav("/MyRentsList/")
    }
    const goToCategory = (category) => {
        nav(`/viewAll/${category}`, {
            state: {
                displayMode: 'grid'
            }
        });
    }
    const park = () => {
        nav("/galery/")
    }
    const GoOneUser = () => {
        nav(`/viewAllUser/${userSlice.user.id}`, {
            state: {
                displayMode: 'grid'
            }
        })
    }
    const reloadPage = () => {
        window.location.reload();
    }
    const login = () => {
        nav("/login")
    }
    const Rents = () => {
        debugger
        if (userSlice.isLoggedIn)
            nav(`/AllRents/${userSlice.user.id}`)
        else {
            nav(`/AllRents/`)
        }
    }
    return (
        <>
            <div className="user-navbar">
                <button onClick={about}>אודות</button>
                <div className="dropdown">
                    <button onClick={viewAll} className="dropbtn">מתנפחים</button>
                    <div className="dropdown-content">
                        <button onClick={() => goToCategory('wet')}>רטובים</button>
                        <button onClick={() => goToCategory('dry')}>יבשים</button>
                        <button onClick={() => goToCategory('gymbory')}>ג'ימבורי</button>
                        <button onClick={() => goToCategory('park')}>מתקני לונה פארק</button>
                    </div>
                </div>

                <button onClick={park}>פארק אלעד </button>
               
                <button onClick={viewAllFood}>מכונות מזון </button>
                <button onClick={Rents}>ההזמנות שלי</button>
                <button onClick={cart}>עגלה</button>
                <button onClick={home}>דף הבית</button>
                <Avatar onClick={GoOneUser} alt="Travis Howard" src={userSlice.user ? userSlice.user.profileImage : "../pictures/מתקני גימבורי/g7.jpg"} />
                <div className="iconWrapper">
                    <LoginIcon className="loginIcon" onClick={login} />
                    <span className="tooltipText">Login</span>
                </div>
                {userSlice.isLoggedIn &&
                    <div className="iconWrapper">
                        <LogoutIcon className="loginIcon" onClick={reloadPage} />
                        <span className="tooltipText">Logout</span>
                    </div>}


            </div>
        </>
    );
}

export default UserNav;