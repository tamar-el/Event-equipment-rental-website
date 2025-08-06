
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { deleteItemFromCartAndUpdate } from '../user/userSlice'
import { fetchRents, setListRents, deleteItemFromRents, deleteItemFromLocalCart, deleteRentById, setCurrentRent } from '../rents/rentSlice';
import { useNavigate } from 'react-router-dom';
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import './rent.css';
const AllRents = () => {
    const nav = useNavigate();
    const dispatch = useDispatch();
    const { listRents, currentRent } = useSelector((state) => state.rent);
    const { userList, isLoggedIn, isAdmin, currentUserCart } = useSelector((state) => state.user);

    useEffect(() => {
        console.log("admin")
        dispatch(fetchRents()).then((res) => {
            const allRents = res.payload || [];

            if (!isAdmin && id) {
                const filtered = allRents.filter(x => x.userId == id);
                dispatch(setListRents(filtered));
            } else {
                // מנהל מקבל את כל ההזמנות
                dispatch(setListRents(allRents));
            }
        });
    }, [isAdmin]);


    const GoOneUser = (id) => {
        nav(`/viewAllUser/${id}`, {
            state: {
                displayMode: 'grid'
            }
        })
    }
const deleteRent=(id)=>{
    debugger
    dispatch(deleteItemFromRents(id))
}
    const { id } = useParams()



  
    return (
        <>
            <div className="cart-items">
                {isLoggedIn ? (listRents.map((rent) => (
                    <>

                        <div key={rent.id} className="cart-item">
                            {userList
                                .filter((u) => u.id == rent.userId)
                                .map(rentuser => (
                                    <Avatar
                                        key={rentuser.id}
                                        onClick={() => GoOneUser(rent.userId)}
                                        alt="Travis Howard"
                                        src={rentuser.profileImage}
                                    />
                                ))}
                            <div className="rent-main-info">
                                <h3 className="rent-name">{rent.name}</h3>
                                {/* <p className="rent-price">Price: ${rent.totalPrice.toFixed(2)}</p> */}
                                <p className="rent-quantity">Date: {rent.orderDate}</p>
                            </div>

                            <div className="rent-subitems">
                                {rent.cart.map((item) => (
                                    <div key={item.id} className="cart-subitem">
                                        <img src={item.image} alt={item.name} className="subitem-image" />
                                        <div className="subitem-details">
                                            <h4>{item.name}</h4>
                                            <p>Price: ${item.pricePerHour}</p>
                                            {/* <p>Price: ${item.pricePerHour.toFixed(2)}</p> */}
                                            <p>Quantity: {item.quantity}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <h3>totalPrice:{rent.totalPrice}</h3>
                          <button onClick={()=>{deleteRent(rent.id)}}>delete</button>
                        </div>
                    </>
                ))) : <h2>אין הזמנות במאגר</h2>}
            </div>


        </>
    );
}

export default AllRents;