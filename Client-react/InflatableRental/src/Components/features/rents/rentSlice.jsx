// פה נגדיר את כל המשתנים באתר  המטפלים בנושא יוזר
// וכן הפונקציות שדואגות לעדכן את המשתנים האלה
import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const initialState = {
    listRents: []
}

export const fetchRents = createAsyncThunk("fetchRents", async () => {
    try {
        const response = await axios.get("http://localhost:4000/order")
        return response.data
    } catch (error) {
        throw error
    }
})
export const deleteItemFromRents = createAsyncThunk(
    "rent/deleteItemFromRents",
    async (itemId, { state, dispatch }) => {
        debugger
        // שלב 1: מחיקת הפריט מהעגלה בסטייט
        dispatch(deleteRent(itemId));
        // שלב 2: עדכון המשתמש בצד השרת
        await dispatch(deleteRentById(itemId));
      
    }
);

export const deleteRentById = createAsyncThunk("deleteRentById", async (id) => {
    
    try {
        
        const response = await axios.delete(`http://localhost:4000/order/${id}`)
        return response.data
    } catch (error) {
        throw error
    }
}
)
export const addRentDB = createAsyncThunk("addRentDB", async (cart) => {
    try {
        const response = await axios.post(`http://localhost:4000/order`, cart)
        return response.data
    } catch (error) {
        throw error
    }
}
)

export const rentSlice = createSlice({
    name: "rent",
    initialState,
    reducers: {
        setListRents: (state, action) => {
            state.listRents = action.payload
        },
        addRent: (state, action) => {
            state.listRents.push(action.payload)
        },
        deleteRent: (state, action) => {
            state.listRents = state.listRents.filter((rent) => rent.id !== action.payload)
        },
        updateRent: (state, action) => {
            const index = state.listRents.findIndex((rent) => rent._id === action.payload._id)
            if (index !== -1) {
                state.listRents[index] = action.payload
            }
        },
        setRentById: (state, action) => {
            const index = state.listRents.findIndex((rent) => rent._id === action.payload)
            if (index !== -1) {
                state.rent = action.payload
            }
        }, deleteItemFromLocalCart: (state, action) => {
            const index = state.listRents.findIndex((rent) => rent._id === action.payload.cartId)
            if (index !== -1) {
                state.listRents[index].cart = state.listRents[index].cart.filter((item) => item._id !== action.payload.id)
                console.log("delete item from local cart")
                console.log("state.listRents[index].cart", "action", action, state.listRents[index].cart)
            }
        }, setCurrentRent: (state, action) => {
            state.currentRent = action.payload;
        }

    },
    extraReducers: (builder) => {
        builder.addCase(fetchRents.pending, (state, action) => {

        }),
            builder.addCase(fetchRents.fulfilled, (state, action) => {
                state.listRents = action.payload
            }),
            builder.addCase(fetchRents.rejected, (state, action) => {
                console.log("error")
            }), builder.addCase(deleteRentById.rejected, (state, action) => {
                console.log("error delete")
            }), builder.addCase(deleteRentById.fulfilled, (state, action) => {
                const deletedId = action.payload.deletedId;
                 state.listRents = state.listRents.filter(r => r.id !== deletedId);
            })

            , builder.addCase(deleteRentById.pending, (state, action) => {
                console.log("loading delete")
            }), builder.addCase(addRentDB.rejected, (state, action) => {
                console.log("error delete")
            }), builder.addCase(addRentDB.fulfilled, (state, action) => {
                state.listRents = action.payload
            }), builder.addCase(addRentDB.pending, (state, action) => {
                console.log("loading delete")
            })
    }
    // איזה פונקציות בהשכרה
    // למשל- צור השכרה, קבל את כל ההשכרות הקיימות, הסר השכרה
    // ....
})
export const { setListRents, addRent, deleteRent, updateRent, setRentById, deleteItemFromLocalCart, setCurrentRent } = rentSlice.actions
export default rentSlice.reducer