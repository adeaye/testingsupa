"use client"
import AuthService from '@/service/auth';
import {getAll, postData} from '@/service/testtable';

const Home = () => {
    
    return (
        <div style={{display: 'flex', gap:'16px'}}>
            <button style={{backgroundColor: 'white', color: 'black'}} onClick={AuthService.signUp} >Register</button>
            <button style={{backgroundColor: 'white', color: 'black'}} onClick={AuthService.login}>Login</button>
            <button style={{backgroundColor: 'white', color: 'black'}} onClick={AuthService.logout}>Logout</button>
            <button style={{backgroundColor: 'white', color: 'black'}} onClick={getAll}>Get data</button>
            <button style={{backgroundColor: 'white', color: 'black'}} onClick={postData}>Post data</button>

        </div>
    );
}

export default Home;