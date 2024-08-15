/* eslint-disable react/no-unescaped-entities */
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { updateProfile } from "firebase/auth";
import { Helmet } from "react-helmet";
import { FaRegEyeSlash } from "react-icons/fa";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import toast from "react-hot-toast";
import { AuthContext } from "../../provider/AuthProvider";
import { TiTick } from "react-icons/ti";
// import logo from '../../assets/images/logo blue.png'
import { motion } from "framer-motion";


const Register = () => {
    const { createUser, setReload } = useContext(AuthContext)
    const navigate = useNavigate()

    const [eye, setEye] = useState(false)

    const togglePassword = () => {
        setEye(!eye)
    }

    const handleRegister = e => {
        e.preventDefault();
        const form = new FormData(e.currentTarget)
        const name = form.get('name');
        const email = form.get('email');
        const photoUrl = form.get('photoUrl');
        const password = form.get('password');

        console.log(name, email, photoUrl, password);

        createUser(email, password)
            .then(res => {
                // update the profile with current name and photoUrl
                updateProfile(res.user, {
                    displayName: name, photoURL: photoUrl
                })
                    .then(() => {
                        setReload(true)
                    })
                    .catch(error => {
                        console.log(error)
                    })
                toast.success("Registration Successful", {
                    position: "top-right",
                    duration: 5000,
                    style: { width: '250px', height: '70px' },
                });
                setTimeout(() => {
                    navigate('/')
                }, 1600);
                // console.log(res.user);
            })
            .catch(error => {
                toast.error("Something is went wrong!", {
                    position: "top-right",
                    duration: 5000,
                    style: { width: '250px', height: '70px' },
                });
                console.log(error);
            })

        // console.log(name,email,photoUrl,password);
    }

    return (
        <div className='max-w-sm px-6 md:max-w-3xl md:px-8 lg:max-w-7xl mx-auto lg:mt-12'>
            <Helmet>
                <title>volunnet | Register</title>
            </Helmet>
            <div className="">
                <div  className="grid md:grid-cols-2 gap-7">
                    <motion.div initial={{opacity:.7, scale:0.7, x:-200}} whileInView={{opacity:1, scale:1, x:0}} transition={{duration: 0.6}} viewport={{once:true}} className="lg:py-0 py-4 ">
                        <div className='flex justify-center lg:justify-start my-6'>
                            <img className='lg:w-[40%] w-1/2' src={''} alt="" />
                        </div>
                        <div >
                            <h1 className='font-bold text-xl md:text-3xl lg:text-4xl text-center lg:text-left'>Create your Volunnet account</h1>
                            <p className='flex items-center gap-1 my-4 lg:text-xl'><span className='text-2xl text-[#68D2E8]'><TiTick /></span>Create a post to find volunteer in minutes</p>
                            <p className='flex items-center gap-1 my-4 lg:text-xl'><span className='text-2xl text-[#68D2E8]'><TiTick /></span>Work as volunteer with any org</p>
                            <p className='flex items-center gap-1 my-4 lg:text-xl'><span className='text-2xl text-[#68D2E8]'><TiTick /></span>Join us in shaping a brighter tomorrow!</p>
                        </div>
                    </motion.div>
                    <motion.div initial={{opacity:.7, scale:0.7, x:200}} whileInView={{opacity:1, scale:1, x:0}} transition={{duration: 0.6}} viewport={{once:true}} className="card shrink-0 w-full shadow-2xl bg-base-100">
                        <h1 className="text-center text-5xl font-bold py-4">Register</h1>
                        <form onSubmit={handleRegister} className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Name</span>
                                </label>
                                <input name="name" type="text" placeholder="Enter name" className="input input-bordered" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input name="email" type="email" placeholder="Enter email" className="input input-bordered" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">PhotoUrl</span>
                                </label>
                                <input name="photoUrl" type="text" placeholder="Enter PhotoUrl" className="input input-bordered" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <label className="input input-bordered flex items-center gap-2 label">
                                    <input name="password" type={eye ? "text" : "password"} className="grow" placeholder="Password" />
                                    <span onClick={togglePassword} className="text-xl -ml-10 md:-ml-0">{eye ? <MdOutlineRemoveRedEye /> : <FaRegEyeSlash />}</span>
                                </label>
                                <label className="label">
                                    <p className="pt-2 text-sm">Already have an account? <span className="text-blue-400"><Link to='/login'>Login</Link></span></p>
                                </label>
                            </div>
                            <div className="form-control mt-6">
                                <button type="submit" className="btn bg-[#FF6D60] text-white">Create an account</button>
                            </div>
                        </form>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default Register;