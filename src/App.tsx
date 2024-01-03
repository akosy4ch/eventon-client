import React, {FC, useContext, useEffect, useState} from 'react';
import logo from './logo.svg';
import { observer } from 'mobx-react-lite';
import './App.css';
import LoginForm from './components/LoginForm';
import { Context } from '.';
import { count } from 'console';
import UserService from './services/UserService';


const App: FC = () => {

  const {} = useContext(Context);
  const [users,setUsers] = useState<IUser[]>([]);
  useEffect(() => {
    if (localStorage.getItem('token')){
      store.checkAuth()
    }
  }, [])

  async function getUsers() {
    try{
        const response = await UserService.fetchUsers();
        setUsers(response.data);
    }catch(e) {
      console.log(e);
    }
  }

  if (store.isLoading){
    return <div>Loading...</div>
  }

  if (!store.isAuth) {
    return (
      <div>
        <LoginForm/>
        <button onClick={getUsers}>Get users</button>
        </div>
      
    )
  }

  return (
      <div>
        <h1>{store.isAuth ? `You are already registered ${store.user.email}` : 'SIGN UP' }</h1>
        <h1>{store.user.isActivated ?  'Account has been verified by mail' : 'Verify youre account ' }</h1>
        <button onClick={()=> store.logout()}></button>
        <div>
          <button onClick={getUsers}>Get users</button>
        </div>
        {users.map(user =>
            <div key= {user.email}> {user.email}</div>   
        )}
      </div>

  );
;}
export default observer(App);
