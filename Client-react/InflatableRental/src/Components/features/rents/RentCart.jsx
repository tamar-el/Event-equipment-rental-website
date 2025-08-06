
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { deleteItemFromCartAndUpdate } from '../user/userSlice'
import { fetchRents, deleteRent, setRentById, deleteItemFromLocalCart, deleteRentById, setCurrentRent } from '../rents/rentSlice';
import { useNavigate } from 'react-router-dom';
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import Stack from '@mui/material/Stack';
import { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import './rent.css';


///
import { useRef } from 'react';
///


function RentCart({ isPopup = false }) {
  // const RentCart = () => {
  const nav = useNavigate();
  const dispatch = useDispatch();
  const { listRents, currentRent } = useSelector((state) => state.rent);
  const { user, isLoggedIn, isAdmin, currentUserCart, setListRents } = useSelector((state) => state.user);
  ///
  const cartItemsRef = useRef(null); // רפרנס לרשימת הפריטים
  ////

  ///
  useEffect(() => {
    dispatch(fetchRents());
    restartCart();
    totalPriceRent()
    // בכל שינוי בעגלה – גלול לתחתית
    if (cartItemsRef.current) {
      cartItemsRef.current.scrollTo({
        top: cartItemsRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [listRents, currentUserCart]);
  ////


  const { id } = useParams()

  const payment = () => {
    if (isLoggedIn) {
      alert("Payment successful!");
      nav("/order-summary")
    } else {
      alert("Please log in to proceed with payment.");
    }
  };

  const Edit = (id, category) => {
    nav(`/viewAll/${category}/${id}`);
  };
  const deleteItem = (cartId, id) => {
    console.log("cartId", cartId, "id", id)
    dispatch(deleteItemFromLocalCart(cartId, id))
  }
  const restartCart = () => {
    debugger
    if (isLoggedIn) {
      dispatch(setRentById(user.id))
    } else if (!isAdmin) {
      if (currentUserCart === undefined)
        setCurrentRent([])
      else dispatch(setCurrentRent(currentUserCart))
    }
  }
  const deleteItemFromCurrent = (id) => {
    dispatch(deleteItemFromCartAndUpdate(id))
  }
const [totalPrice, setTotalPrice] = useState(0);

  // חישוב סכום כולל
 const totalPriceRent = () => {
  const total = (currentUserCart || []).reduce((acc, item) => {
    return acc + (item.pricePerHour * 3); 
  }, 0);
  setTotalPrice(total);
};

  // const totalPrice = listRents.reduce((acc, rent) => acc + rent.totalPrice, 0);

  return (
    <div>
      <h2 className="cart-title">Rent Cart</h2>
      {listRents.length === 0 ? (
        <p className="empty-cart">Your cart is empty</p>
      )
        : (
          <>
            {/* /// */}
            <div className="cart-items" ref={cartItemsRef}>
              {/* /// */}
            
              {/* אם זה משתמש וזה עמוד עגלה-יוצגו לו המוצרים */}
              {!isAdmin && !id && (currentUserCart || []).map((item) => (
                <div key={item.id} className="cart-subitem">
                  <img src={item.image} alt={item.name} className="subitem-image" />
                  <div className="subitem-details">
                    <h4>{item.name}</h4>
                    <p>Price: ${item.pricePerHour}</p>
                    <p>Quantity: {item.quantity}</p>
                  </div>
                  <div className="subitem-actions">
                    <Stack direction="row" spacing={1}>
                      <IconButton color="primary" aria-label="add to shopping cart">
                        <AddShoppingCartIcon />
                      </IconButton>
                    </Stack>
                    <button className="btn-remove" onClick={() => deleteItemFromCurrent(item.id)}>
                      Remove
                    </button>
                    <button className="btn-edit" onClick={() => Edit(item.id, item.category)}>
                      עריכה
                    </button>
                  </div>
                </div>
              ))}
             
            </div>

            <div className="cart-total">
              <h3>Total: ש"ח{totalPrice.toFixed(2)}</h3>
              <button onClick={payment} className="checkout-button">Checkout</button>
            </div>

          </>
        )}
    </div>
    
  );
};

export default RentCart;
