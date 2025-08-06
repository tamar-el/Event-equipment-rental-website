
import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import OneTrampoline from './OneTrampoline';
import './trampoline.css';
import { fetchTrampolines } from './trampolineSlice';
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import { addItemToCartAndUpdate } from '../user/userSlice'
import RentCart from '../rents/RentCart'
import { useState } from 'react';
import AspectRatioIcon from '@mui/icons-material/AspectRatio';
import { useNavigate } from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import { deleteItemFromStore } from '../trampoline/trampolineSlice'
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import SearchIcon from '@mui/icons-material/Search'; // ← להוסיף לייבוא



const ViewAllTrampoline = () => {
  const dispatch = useDispatch();
  const nav = useNavigate()
  const { category, id } = useParams();
  const allTrampoline = useSelector((state) => state.trampoline);
  const userRd = useSelector((state) => state.user);
  const [showCart, setshowCart] = useState(false);
  const goCart = () => {
    nav("/RentCart/")
  }
  useEffect(() => {
    dispatch(fetchTrampolines());
    console.log("userAdmin???", userRd.isAdmin)
  }, [dispatch]);

  const getAllTrampolineByCategory = (category) => {
    return allTrampoline.listTrampoline.filter((item) => item.category === category);
  };


  const getTrampolineById = (id) => {
    return allTrampoline.listTrampoline.find((item) => item.id === id);
  };
  const addToCart = (item) => {
    dispatch(addItemToCartAndUpdate(item))


    setshowCart(true)
    setTimeout(() => {
      setshowCart(false);
    }, 3000);
  }
  const deleteForever = (id) => {
    dispatch(deleteItemFromStore(id));
  };

  const editItem = (item) => {
    //state מעביר לקומפוננטה אובייקט שלם
    nav("/updateItem/", { state: { EditItem: item } })
  }

  const trampolineListRaw = id
    ? [getTrampolineById(id)].filter(Boolean)
    : category
      ? getAllTrampolineByCategory(category)
      : allTrampoline.listTrampoline;



const [showSearch, setShowSearch] = useState(false);

  // const trampolineList = Array.isArray(trampolineListRaw) ? trampolineListRaw : [];
  const [searchTerm, setSearchTerm] = useState('');
  const trampolineList = Array.isArray(trampolineListRaw)
    ? trampolineListRaw.filter((item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    : [];


  return (

    <>
      {/* <div className="search-bar">
        <input
          type="text"
          placeholder="חפש טרמפולינה לפי שם..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </div> */}
<div className="search-icon-container">
  <SearchIcon className="search-icon" onClick={() => setShowSearch(!showSearch)} />
  {showSearch && (
    <input
      type="text"
      placeholder="חפש לפי שם..."
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      className="search-input-fly"
    />
  )}
</div>




      <div className="container">
        {trampolineList.map((item) => (
          <div key={item.id} className={id ? "trampoline-single" : "trampoline-item"}>
            <OneTrampoline oneTrampoline={item} />

            {!id && !userRd?.isAdmin ? (

              <>
                <button>
                  <Link to={`/viewAll/${category}/${item.id}`}>תצוגה מפורטת</Link>
                </button>
                <button onClick={() => addToCart(item)}>הוסף לסל</button>


                {userRd?.isAdmin && (
                  <>

                    <DeleteForeverIcon onClick={() => deleteForever(item.id)} />
                    <EditIcon onClick={() => editItem(item)} />

                  </>
                )}
              </>
            ) : (
              // מצב של תצוגת פריט בודד
              <>
                {!userRd?.isAdmin ? (
                  <div className='AddCartDiv'>
                    <Stack direction="row" spacing={1}>
                      <IconButton color="primary" aria-label="add to shopping cart">
                        <AddShoppingCartIcon />
                      </IconButton>
                    </Stack>
                    <button onClick={() => addToCart(item)}>הוסף לסל</button>
                  </div>
                ) : (
                  // מנהל בתצוגת פריט בודד
                  <>
                    {/* <ButtonGroup variant="text" aria-label="Basic button group">
                      <Button>
                        <DeleteForeverIcon onClick={() => deleteForever(item.id)} />
                        delete
                      </Button>
                      <Button>
                        <EditIcon onClick={() => editItem(item)} />
                        edit
                      </Button>
                    </ButtonGroup> */}
                      <DeleteForeverIcon onClick={() => deleteForever(item.id)} />
                    <EditIcon onClick={() => editItem(item)} />

                  </>
                )}
              </>
            )}



          </div>
        ))}
        {showCart && (
          <div className="floating-sidebar">
            <div className="rent-cart popup-mode">
              <RentCart isPopup={true} />
            </div>
            <CloseIcon className="close-btn" onClick={() => setshowCart(false)}></CloseIcon>
            <AspectRatioIcon className="open-btn" onClick={goCart}></AspectRatioIcon>
          </div>
        )}

      </div>
    </>
  );
};

export default ViewAllTrampoline;
