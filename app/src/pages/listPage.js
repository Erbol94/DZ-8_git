import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux'
import { listUsers, postUser } from '../store/listSlice';


function ListPage(props) {
    const dispatch = useDispatch()
    // const users = useSelector(state => state.listReducer.users)
    const message = useSelector(state => state.listReducer.message)
    const error = useSelector(state => state.listReducer.error)
    useEffect(()=> {
        dispatch(listUsers())
    }, [])

    const [data, setData] = useState({
        name: '',
        userName: '',
        email: ''
    })
    const onChangeInput = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value
            
        })
    }
    const submit = (e) => {
        // e.preventDefault();
        dispatch(postUser(data))
    }
    return (
        <div>
            Hello
            {/* {users.slice(0,4).map(user => 
                <ul key={user.id}>
                    <li>name:  {user.name}</li>
                    <li>userName:  {user.username}</li>
                    <li>email:  {user.email}</li>
                </ul>
            )} */}
            <br />
            {error ? <h4> {error} </h4> : <h4>{message}</h4>}
            <input 
            type="text" 
            placeholder='name'
            name='name'
            onChange={onChangeInput}
            />
            <input 
            type="text" 
            placeholder='userName'
            name='userName'
            onChange={onChangeInput}
            />
            <input 
            type="email" 
            placeholder='Email'
            name='email'
            onChange={onChangeInput}
            />
            <button onClick={submit}>send</button>
        </div>
    );
}

export default ListPage;