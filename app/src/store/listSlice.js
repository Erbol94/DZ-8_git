import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'

export const listUsers = createAsyncThunk(
    'listUsers',
    async(data, {rejectWithValue}) => {
        try {
            const response = await fetch('https://jsonplaceholder.typicode.com/users')
        if(response.status === 200){
            const data = await response.json()
            return data
        }else {
            throw Error('Ошибка')
        }
        }
        catch (err) {
            return rejectWithValue(err.message)
        }
        
    }
)

export const postUser = createAsyncThunk(
    'postUser',
    async (data, {rejectWithValue}) => {
        try {
            const options = {
                method: "POST",
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(data)
            }
            const response = await fetch('https://jsonplaceholder.typicode.com/users', options)
            if(response.status === 201){
                console.log('Запрос успешен')
                return "Запрос успешен"
            }else if (response.status === 404) {
                throw Error('Ошибка запроса')
            }
        }
        catch (e) {
            return rejectWithValue(e.message)
        }
        
    }
)
const listSlice = createSlice({
    name: 'userList',
    initialState: {
        users: [],
        user: {},
        message: null,
        error: null,
    },
    extraReducers:builder => {
        builder.addCase(listUsers.fulfilled, (state, action)=>{
            state.users = action.payload
        })
        builder.addCase(postUser.fulfilled, (state, action)=> {
            state.message = action.payload
        })
        builder.addCase(postUser.rejected, (state, action)=> {
            state.error = action.payload
        })
        
    }
})

export default listSlice.reducer