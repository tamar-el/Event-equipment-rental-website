
import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUser } from './userSlice';
import './users.css';
import OneUser from './oneUser';

const ViewUsers = () => {
    const dispatch = useDispatch();
    const { id } = useParams();

    const { userList, isLoading, error } = useSelector((state) => state.user);

    useEffect(() => {
        dispatch(fetchUser());
    }, [dispatch]);

    // if (isLoading) return <div className="loading">טוען משתמשים...</div>;
    // if (error) return <div className="error">שגיאה: {error}</div>;
    
    return (
        // <div className="user-page">
        <div>
           {!id&&<h1 className="title">רשימת משתמשים</h1>}
          
            <div className="user-list">
                 
                {userList?.length > 0 &&!id? (
                    userList.map((item) => (
                        <div key={item.id} className="user-row">
                            <img
                                src={item.profileImage || "https://via.placeholder.com/80"}
                                alt={item.name}
                                className="user-avatar"
                            />
                            <div className="user-details">
                                <h2>{item.name}</h2>
                                <p>{item.email}</p>
                                <p>{item.telephone}</p>
                            </div>
                            <Link to={`/viewAllUser/${item.id}`} className="view-button">
                                הצג פרטים
                            </Link>
                        </div>
                    ))
                    
                ) : !id?(
                    <p className="no-users">לא נמצאו משתמשים</p>
                ):<OneUser oneUser={userList.find((item) => item.id.toString() === id)}></OneUser>}
            </div>
         </div>
    );
};

export default ViewUsers;
