import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";



const initialState = {
    listTrampoline: [],
    trampolinesTypes: ["dry", "wet", "park", "gymbory"],
    loading: false,
    error: null,
    trampoline: {}


}
export const fetchTrampolines = createAsyncThunk("getAllTrampolines", async () => {
    try {
        const response = await axios.get("http://localhost:4000/trampoline")
        return response.data
    } catch (error) {
        throw error
    }
})
export const deleteItemFromStore = createAsyncThunk(
    "trampoline/deleteItemFromStore",
    async (itemId, { state, dispatch }) => {
        debugger
        // שלב 1: מחיקת הפריט מהעגלה בסטייט
        dispatch(deleteItemFromcurrentStore(itemId));
        // שלב 2: עדכון המשתמש בצד השרת
        await dispatch(deleteTrampoline(itemId));
        // return state.listTrampoline;
    }
);
// export const updateItemFromStore = createAsyncThunk(
//     "trampoline/updateItemFromStore",
//     async (itemId, { state, dispatch }) => {
//         debugger
//         // שלב 1: מחיקת הפריט מהעגלה בסטייט
//         dispatch(updateItemFromcurrentStore(itemId));
//         // שלב 2: עדכון המשתמש בצד השרת
//         await dispatch(putTrampoline(itemId));
//         // return state.listTrampoline;
//     }
// );

export const addNewTrampoline = createAsyncThunk("addNewTrampoline", async (item) => {
    try {
        const response = await axios.post("http://localhost:4000/trampoline", item)
        return response.data
    } catch (error) {
        throw error
    }
})
// export const fetchTrampolineById=createAsyncThunk("trampoline/fetchTrampolineById",async(id)=>{
//     try{
//         const response=await axios.get(`http://localhost:5000/api/trampoline/${id}`)
//         return response.data
//     }catch(error){
//         throw error
//     }
// })
export const deleteTrampoline = createAsyncThunk("trampoline/deleteTrampoline", async (id) => {
    try {
        const response = await axios.delete(`http://localhost:4000/trampoline/${id}`)
        return response.data
    } catch (error) {
        throw error
    }
})
export const putTrampoline = createAsyncThunk("trampoline/putTrampoline", async (item) => {
    debugger
    try {
        const response = await axios.put(`http://localhost:4000/trampoline/${item.id}`,item.updateItem)
        return response.data
    } catch (error) {
        throw error
    }
})


export const TrampolineSlice = createSlice({
    name: "trampoline",
    initialState,
    reducers: {
        setListTrampoline: (state, action) => {
            state.listTrampoline = action.payload
        },
        addTrampoline: (state, action) => {
            state.listTrampoline.push(action.payload)
        },
        deleteTrampoline: (state, action) => {
            state.listTrampoline = state.listTrampoline.filter((trampoline) => trampoline.id !== action.payload)
        },
        updateTrampoline: (state, action) => {
            const index = state.listTrampoline.findIndex((trampoline) => trampoline.id === action.payload.id)
            if (index !== -1) {
                state.listTrampoline[index] = action.payload
            }
        },
        setTrampolineById: (state, action) => {
            const index = state.listTrampoline.findIndex((trampoline) => trampoline.id === action.payload.id)
            if (index !== -1) {
                state.trampoline = action.payload
            }
        },
        setLoading: (state, action) => {
            state.loading = action.payload
        },
        setError: (state, action) => {
            state.error = action.payload
        },
        setTrampoline: (state, action) => {
            state.trampoline = action.payload
        }, deleteItemFromcurrentStore: (state, action) => {
            state.listTrampoline = state.listTrampoline.filter(item => item.id !== action.payload);
        }

    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchTrampolines.pending, (state) => {
                state.loading = true

            })
            .addCase(fetchTrampolines.fulfilled, (state, action) => {
                state.loading = false
                state.listTrampoline = action.payload
                console.log("listTrampoline", state.listTrampoline)
            })
            .addCase(fetchTrampolines.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            }).addCase(addNewTrampoline.pending, (state) => {
                state.loading = true

            })
            .addCase(addNewTrampoline.fulfilled, (state, action) => {
                state.loading = false
                state.listTrampoline = action.payload
                console.log("listTrampoline", state.listTrampoline)
            })
            .addCase(addNewTrampoline.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
            // .addCase(fetchTrampolineById.pending,(state)=>{
            //     state.loading=true
            // })
            // .addCase(fetchTrampolineById.fulfilled,(state,action)=>{
            //     state.loading=false
            //     state.trampoline=action.payload
            // })
            // .addCase(fetchTrampolineById.rejected,(state,action)=>{
            //     state.loading=false
            //     state.error=action.payload
            // })
            .addCase(deleteTrampoline.pending, (state) => {
                state.loading = true
            }).addCase(deleteTrampoline.fulfilled, (state, action) => {
                state.loading = false
                state.listTrampoline = action.payload
            })
            .addCase(deleteTrampoline.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            }) .addCase(putTrampoline.pending, (state) => {
                state.loading = true
            }).addCase(putTrampoline.fulfilled, (state, action) => {
                state.loading = false
                state.listTrampoline = action.payload
            })
            .addCase(putTrampoline.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
    }
})

export const { deleteItemFromcurrentStore, setListTrampoline, addTrampoline, updateTrampoline, setTrampolineById, setLoading, setError, setTrampoline } = TrampolineSlice.actions
export default TrampolineSlice.reducer

