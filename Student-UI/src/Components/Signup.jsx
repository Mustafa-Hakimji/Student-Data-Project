import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import signupPic from '../images/signup.png'
import './Styles/Signup.css';

const Signup = () => {
    const navigate = useNavigate();

    const [user, setUser] = useState({
        name: '', email: '', phone: '', work: '', password: '', cpassword: ''
    })



    let name, value;

    const handleInput = (event) => {
        name = event.target.name;
        value = event.target.value;

        setUser({ ...user, [name]: value });
    }

    const PostData = async (event)=>{
        event.preventDefault();
        const {name, email, phone, work, password, cpassword} = user;

        const res = await fetch(`http://localhost:4000/register`,{
            method:'POST',
            headers:{
                'Content-Type' : 'application/json'
            },body:JSON.stringify({
                name, email, phone, work, password, cpassword
            })
        });

        const  data = await res.json();

        if (res.status === 422 || !data){
            window.alert("Email is already registered please try again with another email")
            console.log("Email is already registered please try again with another email")
        }else{
            window.alert("User registered successfully now please Login");
            console.log("User registered successfully now please Login");
            navigate('/login')
        }

    }


    return (
        <>

            <section className='signup'>
                <div className='container mt-5'>
                    <div className='signup-content'>
                        <div className='signup-form'>
                            <h2 className='form-title'>Sign-Up</h2>
                            <form method='POST' className='register-form' id='register-from'>

                                <div className='form-group'>
                                    <label className='label' htmlFor="name">
                                        <i className="zmdi zmdi-account "></i>

                                    </label>
                                    <input className='input-data' type="text" name='name' id='name' autoComplete='off'
                                        value={user.name}
                                        onChange={handleInput}

                                        placeholder='Your Name' />
                                </div>

                                <div className='form-group'>
                                    <label className='label' htmlFor='email'>
                                        <i className="zmdi zmdi-email "></i>

                                    </label>
                                    <input className='input-data' type="email" name='email' id='email' autoComplete='off'
                                        value={user.email}
                                        onChange={handleInput}

                                        placeholder='Your Email' />
                                </div>

                                <div className='form-group'>
                                    <label className='label' htmlFor='phone'>
                                        <i className="zmdi zmdi-phone-in-talk "></i>
                                    </label>
                                    <input className='input-data' type="number" name='phone' id='phone' autoComplete='off'
                                        value={user.phone}
                                        onChange={handleInput}

                                        placeholder='Your Phone ' />
                                </div>

                                <div className='form-group'>
                                    <label className='label' htmlFor='work'>
                                        <i className="zmdi zmdi-slideshow "></i>

                                    </label>
                                    <input className='input-data' type="text" name='work' id='work' autoComplete='off'
                                        value={user.work}
                                        onChange={handleInput}

                                        placeholder='Your Work/Profession' />
                                </div>

                                <div className='form-group'>
                                    <label className='label' htmlFor='password'>
                                        <i className="zmdi zmdi-key "></i>

                                    </label>
                                    <input className='input-data' type="password" name='password' id='password' autoComplete='off'
                                        value={user.password}
                                        onChange={handleInput}

                                        placeholder='Enter Your Password' />
                                </div>

                                <div className='form-group'>
                                    <label className='label' htmlFor="confirm-password">
                                        <i className="zmdi zmdi-lock "></i>

                                    </label>
                                    <input className='input-data' type="password" name='cpassword' id='cpassword' autoComplete='off'
                                        value={user.cpassword}
                                        onChange={handleInput}

                                        placeholder='Your confirm-password' />
                                </div>
                                <div className='form-group'>
                                    <input className=' form-submit' type="submit" name="signup" id='signup' value={"Register"}
                                        onClick={PostData}
                                    />

                                </div>

                            </form>
                        </div>

                        <div className='signup-image'>
                            <figure>
                                <img src={signupPic} height={"300px"} width={"300px"} alt="registrationPic" />
                            </figure>
                            <Link to="/login" className='signup-page-link '>Already registered ? / (Login)</Link>
                        </div>
                    </div>
                </div>
            </section>
        </>


    )
}

export default Signup