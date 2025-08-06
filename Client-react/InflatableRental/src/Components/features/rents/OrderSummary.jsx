import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import './Rent.css';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { SetcurrentUserCart } from '../user/userSlice';
import { addRentDB } from './rentSlice';
import { updateUserFromDB, setUser } from '../user/userSlice';
const OrderSummary = () => {
    //אתחול תאריך נוכחי
    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0');
    const rentRecieve = String(today.getDate() + 2).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0'); // ינואר = 0
    const year = today.getFullYear();

    const formattedDate = `${day}-${month}-${year}`;
    const RecieveformattedDate = `${rentRecieve}-${month}-${year}`;


    const { user, isLoggedIn, currentUserCart } = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const total = currentUserCart?.reduce((acc, item) => acc + (item.pricePerHour * 3), 0);
    const order = {
        orderDate: formattedDate,
        dueDate: RecieveformattedDate,
        userId: user.id,
        cart: currentUserCart,
        totalPrice:total
    };


    

    const confirmOrder = async () => {
        debugger
        const response = await dispatch(addRentDB(order))
        if (response.meta.requestStatus == "fulfilled") {
            dispatch(SetcurrentUserCart([])); // ניקוי העגלה
           const updatedUser={
            ...user,
            cart:[]
           }
            dispatch(setUser(updatedUser))
            const response2 = await dispatch(updateUserFromDB({ id: user.id,updatedUser:updatedUser }));
            if (response2.meta.requestStatus == "fulfilled") {
                navigate('/confirmation');
            } else {
                alert("error")
            }


        } else {
            alert("error")
        }
    }

    return (
        <div className="order-summary-container">
            <h2>סיכום הזמנה</h2>
            {currentUserCart?.length > 0 ? (
                <>
                    <div className="summary-items">
                        {currentUserCart.map((item) => (
                            <div key={item.id} className="summary-item">
                                <img src={item.image} alt={item.name} />
                                <div>
                                    <h4>{item.name}</h4>
                                    <p>כמות: {item.quantity}</p>
                                    <p>מחיר לשעה: ₪{item.pricePerHour}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="summary-footer">
                        <h3>סה"כ לתשלום (בעת יצירת קשר): ₪{total.toFixed(2)}</h3>
                        <button onClick={confirmOrder} className="confirm-button">אישור הזמנה</button>
                    </div>
                </>
            ) : (
                <p>העגלה שלך ריקה</p>
            )}
        </div>
    );
};

export default OrderSummary;
