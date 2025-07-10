import { useState } from "react";
import axios from "axios";

export default function Register() {
    const [user, setUser] = useState({});
    const [error, seterror] = useState();

    const handleSubmit = async (e) => {
        e.preventDefault(); 
    try{
        const url = "https://cafe-backend-two.vercel.app//api/user/register";
        const result = await axios.post(url, user);
        seterror("successfully registered");
    }catch(err){
        console.log(err);
        seterror("Something went wrong")
    }
    };

    return (
        <div>
            <h2>Registration Form</h2>
            {error}
            <form onSubmit={handleSubmit}>
                <p>
                    <input type="text" placeholder="firstname" 
                        onChange={(e) => setUser({ ...user, firstname: e.target.value })} />
                </p>
                <p>
                    <input type="text" placeholder="lastname"
                        onChange={(e) => setUser({ ...user, lastname: e.target.value })} />
                </p>
                <p>
                    <input type="email" placeholder="email"
                        onChange={(e) => setUser({ ...user, email: e.target.value })} />
                </p>
                <p>
                    <input type="password" placeholder="password"
                        onChange={(e) => setUser({ ...user, password: e.target.value })} />
                </p>
                <p>
                    <input type="text" placeholder="role"
                        onChange={(e) => setUser({ ...user, role: e.target.value })} />
                </p>
                <p>
                    <input type="text" placeholder="status"
                        onChange={(e) => setUser({ ...user, status: e.target.value })} />
                </p>
                <p>
                    <button type="submit">Submit</button>
                </p>
            </form>
        </div>
    );
}
