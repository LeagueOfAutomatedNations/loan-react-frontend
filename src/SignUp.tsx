import React, {useState, Fragment} from "react";
import feathersClient from './feathers';

export function SignUp() {
    const [credentials, setCredentials] = useState({email:'',password:''});
    const [result, setResult] = useState(null);

    const handleEmailInputChange = (event:any) => {
        setCredentials((credentials) => ({...credentials,email:event.target.value}));
    };

    const handlePasswordInputChange = (event:any) => {
        setCredentials((credentials) => ({...credentials,password:event.target.value}));
    };

    const handleSubmit = async(e:any) => {
        e.preventDefault();
        try {
            console.log('calling feathers endpoint')
            const result = await feathersClient.service('users').create(credentials);
            console.log(result)
            setResult(result);
        } catch (error) {
            throw new Error(error);
        }
    }

    return (
        <Fragment>
            <h1>Sign Up</h1>
            <div>
                <form method='POST' onSubmit={handleSubmit}>
                <input id='email' type='text' name='email' value={credentials.email} onChange={handleEmailInputChange} />
                <input id='password' type='password' name='password' value={credentials.password} onChange={handlePasswordInputChange} />
                <button type='submit'>Sign Up</button>
                {result && (<Fragment><h1>Signed Up</h1></Fragment>)}
                </form>
            </div>
        </Fragment>
    )
}