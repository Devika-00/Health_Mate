import {Suspense, lazy} from "react";
import { Routes, Route } from "react-router-dom";
import PublicRoute from "./PublicRoutes";
import ProtectedRoute from "./ProtectedRoute";




const Register = lazy(()=>import("../pages/user/Register"));
const Login = lazy(()=>import("../pages/user/Login"));
const VerifyOtp = lazy(()=>import("../pages/user/VerifyOTP"));
const ForgotPassword = lazy(() => import("../pages/user/forgotPassword"));
const ResetPassword = lazy(()=>import("../pages/user/resetPassword"));
const DoctorhomePage = lazy(()=>import("../pages/doctor/doctordashbord"))
const DoctorSignup = lazy(()=>import("../pages/doctor/doctorSignup"))
const DoctorLogin = lazy(()=>import("../pages/doctor/doctorLogin"))
const Home = lazy(() => import("../pages/Home"));
const EmailVerificationPage = lazy(() => import("../pages/doctor/emailVerification")); 
const AdminLogin = lazy(()=>import("../pages/admin/AdminLogin"));
const AdminDashboard = lazy(()=>import ("../pages/admin/AdminDashboard"));
const ProfileUser = lazy(()=>import("../pages/user/Profile"));
const ProfileDoctor = lazy(()=>import("../pages/doctor/Profile"));
const DoctorList = lazy(()=>import("../pages/user/DoctorCard"))

export const MainRouter = () => {
    return (
        <>
            <Suspense fallback={<h1>Loading</h1>}> 
                <Routes>
                    {/* userRoutes */}
                    <Route path="/" element={<Home />} />
                    <Route path="" element={<PublicRoute />}/>
                    <Route path="/user/register" element={<Register />} />
                    <Route path ="user/verify_otp" element={<VerifyOtp/>}/>
                    <Route path="/user/login" element={<Login/>}/>
                    <Route path="/user/forgot-password" element ={<ForgotPassword/>} />
                    <Route path="/user/reset_password/:id" element ={<ResetPassword/>}/>

                     
                     {/* Protected user  route */}
                     <Route path="" element={<ProtectedRoute />}/>
                     <Route path="/user/Profile" element={<ProfileUser />} />
                     <Route path="/user/doctor" element={<DoctorList />} />
                    

                    {/*Doctor Routes*/ }
                    <Route path="/doctor" element={<DoctorhomePage/>}/>
                    <Route path="/doctor/register" element={<DoctorSignup/>}/>
                    <Route path="/doctor/verify_token/:token" element ={<EmailVerificationPage/>}/>
                    <Route path="/doctor/login" element={<DoctorLogin/>}/>
                    <Route path="/doctor/Profile" element ={<ProfileDoctor/>}/>

                    {/*Admin Routes*/}
                    <Route path="/admin/login" element={<AdminLogin/>}/>
                    <Route path="/admin" element={<AdminDashboard/>}/>
                </Routes>
            </Suspense> 
        </>
    );
};