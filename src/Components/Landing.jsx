import React from 'react'
import SignUp from '../assets/Signup.svg'
import SignIn from '../assets/SignIn.png';
import { PiEyes } from "react-icons/pi";
import { FcGoogle } from "react-icons/fc";


const Landing = () => {
    return (
        <section className='bg-cyan-100 min-h-screen flex items-center justify-center'>
            {/* Login container */}
            <div className='bg-gray-50 flex rounded-2xl shadow-lg max-w-3xl p-5 items-center'>

                {/* form */}
                <div className='md:w-1/2 px-16 '>
                    <h2 className='font-bold text-2xl text-[#002D74] text-center' >Login</h2>
                    {/* <p className='text-sm mt-4 text-[#002D74]'>If you already a member, easily log in</p> */}

                    <form action='' className='flex flex-col gap-4'>
                        <input className='p-2 mt-8 rounded-xl border' type='email' name='email' placeholder='Email' />

                        <div className='relative'>

                            <input className='w-full p-2 rounded-xl border' type='password' name='password' placeholder='Password' />

                            <PiEyes className='absolute top-1 right-3 translate-y-1/2 text-gray-500'/>

                        </div>

                        <button className='bg-[#002D74] rounded-xl text-white py-2 hover:scale-105 duration-300'>Login</button>
                    </form>

                    <div className='mt-10 grid grid-cols-3 items-center text-gray-500'>
                        <hr className='border-gray-400' />
                        <p className='text-center text-sm'>
                            OR
                        </p>
                        <hr className='border-gray-400' />
                    </div>

                    <button className='bg-white border w-full rounded-xl mt-5 py-2 flex justify-center items-center text-sm hover:scale-105 duration-300'>
                    <FcGoogle className=' w-5 h-5 mr-2 '/>
                    Login with Google
                    </button>

                    <div className='mt-2 text-xs border-b py-4 border-gray-400 cursor-pointer text-center'>Forgot your password?</div>

                    <div className='mt-3 text-xs flex justify-between items-center'>
                        <p className=''>Don't have an account?</p>
                        <button className='py-2 px-5 bg-white border rounded-xl hover:scale-110 duration-300'>Register</button>
                    </div>


                </div>
                {/* image */}
                <div className=' md:block hidden w-1/2'>
                    <img className="rounded-2xl px-2" src={SignIn} />
                </div>
            </div>

        </section>
    )
}

export default Landing