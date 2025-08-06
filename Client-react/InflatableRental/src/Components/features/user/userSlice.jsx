// פה נגדיר את כל המשתנים באתר  המטפלים בנושא יוזר
// וכן הפונקציות שדואגות לעדכן את המשתנים האלה
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios";
const initialState = {
    isLoggedIn: false
    , isAdmin: false
    , isLoading: false
    , error: null
    , user: {}
    , userList: []
    , currentUserCart: []
    , AdminList: [
        { name: "admin", password: "admin" },
        { name: "user", password: "user" },
        { name: "guest", password: "guest" }
    ]

}
export const deleteItemFromCartAndUpdate = createAsyncThunk(
    "user/deleteItemFromCartAndUpdate",
    async (itemId, { getState, dispatch }) => {
        // שלב 1: מחיקת הפריט מהעגלה בסטייט
        dispatch(deleteItemFromcurrentUserCart(itemId));

        // שלב 2: עדכון המשתמש בצד השרת
        const { user } = getState().user;
        console.log("STATE:", getState());
        const state = getState();
        const id = user.id;
        const updatedUser = {
            ...state.user.user,
            cart: state.user.currentUserCart
        };
        console.log("userToUpdateDB", updatedUser)
        await dispatch(updateUserFromDB({ id, updatedUser }));
    }
);
export const addItemToCartAndUpdate = createAsyncThunk("user/addItemToCartAndUpdate",
    async (item, { getState, dispatch }) => {
        debugger
        //  הוספת הפריט לעגלה בסטייט
        dispatch(addItemTocurrentUserCart(item));

        //  עדכון המשתמש בצד השרת

        const login = getState().user.isLoggedIn;
        if (login) {
            const { user } = getState().user;
            console.log("STATE:", getState());
            const state = getState();
            const id = user.id;
            const updatedUser = {
                ...state.user.user,
                cart: state.user.currentUserCart
            };
            console.log("userToUpdateDB", updatedUser)
            await dispatch(updateUserFromDB({ id, updatedUser }));
        }
    }
);

export const loginOrRegisterUser = createAsyncThunk(
    'user/loginOrRegisterUser',
    async (userInput, { getState, dispatch }) => {
        debugger
        const state = getState().user;

        const { AdminList, userList, currentUserCart } = state;

        // 1. בדיקה אם המשתמש הוא מנהל
        const isAdmin = AdminList.some(
            u => u.name === userInput.name && u.password === userInput.password
        );

        if (isAdmin) {
            debugger
            console.log("isAdminLogin",isAdmin)
            dispatch(setIsAdmin(true));
            dispatch(setUser(userInput));
            dispatch(setIsLoggedIn(true));
            return userInput;
        }

        // 2. בדיקה אם המשתמש כבר קיים במערכת
        const existingUser = userList.find(
            u => u.name === userInput.name && u.password === userInput.password
        );

        if (existingUser) {
            dispatch(setIsAdmin(false));
            dispatch(setUser(existingUser));
            dispatch(setIsLoggedIn(true));
            return existingUser;
        }

        // 3. המשתמש חדש - נרשם עכשיו
        let newUser = {
            ...userInput,
            cart: currentUserCart.length > 0 ? currentUserCart : []
        };
        const response = await dispatch(addUserToList(newUser)).unwrap();

        alert("ברוך הבא משתמש חדש!");
        dispatch(setUser(response));
        dispatch(setIsLoggedIn(true));
        dispatch(setIsAdmin(false));
        return response;

    }
);






export const fetchUser = createAsyncThunk("fetchUsers", async () => {
    try {
        const response = await axios.get("http://localhost:4000/user")
        return response.data
    } catch (error) {
        throw error
    }
})
export const deleteUserById = createAsyncThunk("deleteUserById", async (id) => {
    try {
        const response = await axios.delete(`http://localhost:4000/user/${id}`)
        return response.data
    } catch (error) {
        throw error
    }
}
)
export const addUserToList = createAsyncThunk("addUserToList", async (user) => {
    try {
        console.log("user", user)
        const response = await axios.post("http://localhost:4000/user", user)
        console.log("response", response)
        return response.data
    } catch (error) {
        throw error
    }
})
export const updateUserFromDB = createAsyncThunk("updateUser", async (user) => {
    try {
        debugger
        console.log("userToUpdate", user.updatedUser)
        const response = await axios.put(`http://localhost:4000/user/${user.id}`, user.updatedUser)
        console.log("response", response)
        return response.data
    } catch (error) {
        throw error
    }
})
export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        addUser: (state, action) => {
            state.userList.push(action.payload)
        },
        setUserList: (state, action) => {
            state.userList = action.payload
        },
        setIsLoggedIn: (state, action) => {
            state.isLoggedIn = action.payload
        },
        setIsAdmin: (state, action) => {
            state.isAdmin = action.payload
        },
        setLoading: (state, action) => {
            state.isLoading = action.payload
        },
        setError: (state, action) => {
            state.error = action.payload
        },
        deleteUser: (state, action) => {
            state.userList = state.userList.filter((user) => user.id !== action.payload)
        },
        setUser: (state, action) => {
            state.user = action.payload
            state.currentUserCart = action.payload.cart
        },
        updateUser: (state, action) => {
            const index = state.userList.findIndex((user) => user.id === action.payload.id)
            if (index !== -1) {
                state.userList[index] = action.payload
            }
        }, deleteItemFromcurrentUserCart: (state, action) => {
            state.currentUserCart = state.currentUserCart.filter((item) => String(item.id) !== action.payload)

        }, addItemTocurrentUserCart: (state, action) => {
            state.currentUserCart = [...state.currentUserCart, action.payload];
        },SetcurrentUserCart: (state, action) => {
            state.currentUserCart= action.payload
        }

    }, extraReducers: (builder) => {
        builder
            .addCase(fetchUser.pending, (state) => {
                state.isLoading = true
            })
            .addCase(fetchUser.fulfilled, (state, action) => {
                state.isLoading = false
                state.userList = action.payload
            })
            .addCase(fetchUser.rejected, (state, action) => {
                state.isLoading = false
                state.error = action.error.message
            }).addCase(deleteUserById.pending, (state) => {
                state.isLoading = true
            })
            .addCase(deleteUserById.fulfilled, (state, action) => {
                state.isLoading = false
                state.userList = state.userList.filter((user) => user.id !== action.payload.id)
            }).addCase(deleteUserById.rejected, (state, action) => {
                state.isLoading = false
                state.error = action.error.message
            }).addCase(addUserToList.pending, (state) => {
                state.isLoading = true
                console.log("loading add user")
            })
            .addCase(addUserToList.fulfilled, (state, action) => {
                state.isLoading = false
                state.userList.push(action.payload)
                console.log("state.userList", state.userList)
                console.log("action.payload", action.payload)
            }).addCase(addUserToList.rejected, (state, action) => {
                state.isLoading = false
                state.error = action.error.message
            }).addCase(loginOrRegisterUser.pending, (state) => {
                state.isLoading = true
            })
            .addCase(loginOrRegisterUser.fulfilled, (state, action) => {
                state.isLoading = false
                state.user = action.payload
            }).addCase(loginOrRegisterUser.rejected, (state, action) => {
                state.isLoading = false
                state.error = action.error.message
            }).addCase(updateUserFromDB.pending, (state) => {
                state.isLoading = true
            })
            .addCase(updateUserFromDB.fulfilled, (state, action) => {
                state.isLoading = false
                state.user = action.payload
            }).addCase(updateUserFromDB.rejected, (state, action) => {
                state.isLoading = false
                state.error = action.error.message
            })
    }
})
// ....איזה פעולות יהיו ליוזר לדוגמא-
// התחברות למערכת, התנתקות, הוסף משתמש חדש ,  מחיקת משתמש
export const {SetcurrentUserCart, addItemTocurrentUserCart, deleteItemFromcurrentUserCart, addUser, setUserList, setIsLoggedIn, setIsAdmin, setLoading, setError, setUser } = userSlice.actions
export default userSlice.reducer