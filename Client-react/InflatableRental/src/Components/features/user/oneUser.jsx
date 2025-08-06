// import React from 'react';
// const OneUser = (props) => {
//     const { oneUser } = props;
//     return (
//         <div className="user-details">
//             <img
//                 src={oneUser.profileImage || "https://via.placeholder.com/80"}
//                 alt={oneUser.name}
//                 className="user-avatar"
//             />
//             <h2>{oneUser.name}</h2>
//             <p>{oneUser.email}</p>
//             <p>{oneUser.telephone}</p>
//             <p>{oneUser.password}</p>
//         </div>
//     );
// }
 
// export default OneUser;



import React from 'react';
import './users.css'; // נוודא שיש קובץ CSS תואם

const OneUser = ({ oneUser }) => {
    if (!oneUser) return <p>לא נמצא משתמש</p>;

    return (
        <div className="one-user-card">
            <img
                src={oneUser.profileImage || "/default-user.png"}
                alt={oneUser.name}
                className="one-user-avatar"
            />
            <div className="one-user-info">
                <h2>{oneUser.name}</h2>
                <p><strong>אימייל:</strong> {oneUser.email}</p>
                <p><strong>טלפון:</strong> {oneUser.telephone}</p>
                <p><strong>סיסמה:</strong> {oneUser.password}</p>
            </div>
        </div>
    );
};

export default OneUser;
