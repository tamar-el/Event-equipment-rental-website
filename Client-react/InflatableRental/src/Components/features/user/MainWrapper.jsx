import React, { useEffect } from 'react';
import AdminNavbar from './AdminNav';
import { BrowserRouter, Link, Routes, Route } from 'react-router-dom';
import ViewAllTrampoline from '../trampoline/ViewAllTrampoline';
import About from '../trampoline/About'
import AdminNav from '../user/AdminNav'
import UserNav from './UserNav'
import Home from '../trampoline/Home'
import MyRentsList from './MyRentsList'
import AddProductCard from '../trampoline/AddProductCard'
import { useDispatch, useSelector } from 'react-redux';
import Park from '../trampoline/Park'
import ViewUsers from './viewUsers';
import RentCart from '../rents/RentCart';
import EditProduct from '../trampoline/EditProduct';
import ConfirmationPage from '../rents/ConfirmationPage'
import OrderSummary from '../rents/OrderSummary';
import Galery from '../mainComponantes/galery';
import AllRents from '../rents/AllRents';
const MainWrapper = () => {
    const dispatch = useDispatch();
    const userData = useSelector((state) => state.user);
    return (
        <>
            <div>
                {userData.isAdmin ? <AdminNavbar /> : <UserNav />}

                <main>
                    <Routes>
                        <Route path={"home"} element={<Home></Home>}></Route>
                        <Route path={"/"} element={<Home></Home>}></Route>
                        <Route path={"AllRents/:id"} element={<AllRents></AllRents>}></Route>
                        <Route path={"AllRents"} element={<AllRents></AllRents>}></Route>
                        <Route path={"RentCart"} element={<RentCart></RentCart>}></Route>
                        <Route path={"RentCart/:id"} element={<RentCart></RentCart>}></Route>
                        <Route path={"about"} element={<About></About>}></Route>
                        <Route path={"admin"} element={<AdminNav></AdminNav>}></Route>
                        <Route path={"user"} element={<UserNav></UserNav>}></Route>
                        <Route path={"viewAll"} element={<ViewAllTrampoline></ViewAllTrampoline>}></Route>
                        <Route path={"viewAllUser/:id"} element={<ViewUsers></ViewUsers>}></Route>
                        <Route path={"viewAllUser"} element={<ViewUsers></ViewUsers>}></Route>
                        <Route path={"MyRentsList"} element={<MyRentsList></MyRentsList>}></Route>
                        <Route path={"park"} element={<Park></Park>}></Route>
                        <Route path={"/viewAll/:category/:id"} element={<ViewAllTrampoline></ViewAllTrampoline>}></Route>
                        <Route path={"/viewAll/:category"} element={<ViewAllTrampoline></ViewAllTrampoline>}></Route>
                        <Route path={"addNewItem"} element={<AddProductCard></AddProductCard>}></Route>
                        <Route path={"updateItem"} element={<EditProduct></EditProduct>}></Route>
                        <Route path={"/order-summary"} element={<OrderSummary />} />
                        <Route path={"/confirmation"} element={<ConfirmationPage />} />
                        <Route path={"galery"} element={<Galery />} />
                    </Routes>

                </main>
            </div>
        </>
    );

}
export default MainWrapper;
