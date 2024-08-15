import { createContext, useEffect, useState } from "react";
import PropTypes from 'prop-types';
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import auth from "../firebase/firebase.config";
import toast from "react-hot-toast";
import axios from "axios";
import baseUrl from "../services/helper";



export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true)
    const [reload, setReload] = useState(false)


    const createUser = (email, password) => {
        // password Verification
        if (password.length < 6) {
            toast.error('Password should have at least 6 characters', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                });
            return
        }else if (!/[A-Z]/.test(password)) {
            toast.error('Password need at least one Uppercase letter', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                });
            return
        } else if (!/[a-z]/.test(password)) {
            toast.error('Password need at least one Lowercase letter', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                });
            return
        }
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password);
    }

    const signInUser = (email,password)=>{
        setLoading(true)
        return signInWithEmailAndPassword(auth,email,password);
    }

    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth, currentUser=>{
            const userEmail = currentUser?.email || user?.email
            const loggedUser = { email: userEmail }
            setUser(currentUser)
            // console.log(currentUser);
            setLoading(false)
            //if current user exit
            if (currentUser) {
                axios.post(`${baseUrl}/jwt`, loggedUser, { withCredentials: true })
                    .then(res => {
                        console.log(res.data);
                    })
            } else {
                axios.post(`${baseUrl}/logout`, loggedUser, { withCredentials: true })
                .then(res => {
                    console.log(res.data);
                })
            }
        })

        return ()=>{
            unsubscribe()
        }

    },[reload, user?.email])


    const authInfo = {
        user,
        setUser,
        createUser,
        signInUser,
        loading,
        setLoading,
        setReload
    }

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

AuthProvider.propTypes = {
    children: PropTypes.node
};

export default AuthProvider;