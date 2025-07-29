import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios';

const initialState = {
    isAuthenticated: false,
    isLoading : true,
    user : null
}

export const registerUserAct = createAsyncThunk('/auth/signup',
    async(formData)=>{
        // here you can put 5173 also 
        const response = await axios.post('http://localhost:5000/api/auth/signup', formData, {
            withCredentials : true,
        });
        return response.data;
    }
)

export const checkAuth = createAsyncThunk('/auth/check-auth',
    async()=>{
        const response = await axios.get('http://localhost:5000/api/auth/check-auth',{
            withCredentials : true,
            headers : {
                'Cache-Control' : 'no-store,no-cache , must-revalidate , proxy-revalidate',
            }
        });
        return response.data;
    }
)

export const loginUserAct = createAsyncThunk('/auth/login',
    async(formData)=>{
        const response = await axios.post('http://localhost:5000/api/auth/login', formData, {
            withCredentials : true,
        })
        return response.data;
    }
)
export const logOutUserAct = createAsyncThunk('/auth/logout',
    async()=>{
        const response = await axios.post('http://localhost:5000/api/auth/logout',{}, {
            withCredentials : true,
        })
        return response.data;
    }
)


const authSlice = createSlice({
    name:'auth',
    initialState,
    reducers :{
        setUser : (state,action)=>{},
    },
    extraReducers: (builder) =>{
        builder.addCase(registerUserAct.pending,(state)=>{
           state.isLoading = true;
        })
        .addCase(registerUserAct.fulfilled,(state,action)=>{            
            state.isLoading = false;
            state.user = null;
            state.isAuthenticated = false;
        })
        .addCase(registerUserAct.rejected,(state,action)=>{
            state.isLoading = false;
            state.user = null;
            state.isAuthenticated = false;
        })

        

        .addCase(loginUserAct.pending,(state)=>{
           state.isLoading = true;
        })
        .addCase(loginUserAct.fulfilled,(state,action)=>{            
            state.isLoading = false;
            state.user = action.payload.success ? action.payload.user : null;
            state.isAuthenticated = action.payload.success;
        })
        .addCase(loginUserAct.rejected,(state,action)=>{
            state.isLoading = false;
            state.user =  null;
            state.isAuthenticated = false;
        })



        .addCase(checkAuth.pending,(state)=>{
           state.isLoading = true;
        })
        .addCase(checkAuth.fulfilled,(state,action)=>{
            state.isLoading = false;
            state.user = action.payload.success ?action.payload.user :null;
            state.isAuthenticated = action.payload.success;
        })
        .addCase(checkAuth.rejected,(state,action)=>{
            state.isLoading = false;
            state.user =  null;
            state.isAuthenticated = false;
        })



        .addCase(logOutUserAct.fulfilled,(state,action)=>{
            state.isLoading = false;
            state.user = null;
            state.isAuthenticated = false;
        });
    }
})

export const {setUser} = authSlice.actions;
export default authSlice.reducer;



