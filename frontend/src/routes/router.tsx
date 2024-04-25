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
const AdminUserList = lazy(()=>import ("../pages/admin/userList"));
const AdminDoctorList = lazy(()=>import ("../pages/admin/doctorList"));
const AdminDoctorDetails = lazy(()=>import ("../pages/admin/doctorDetails"));
const ProfileUser = lazy(()=>import("../pages/user/Profile"));
const ProfileDoctor = lazy(()=>import("../pages/doctor/Profile"));
const DoctorList = lazy(()=>import("../pages/user/DoctorPage"));
const AboutPage = lazy(()=>import("../pages/user/AboutPage"));
const DoctorDetailsUser = lazy(()=>import("../pages/user/singleDoctorDetails"));
const DoctorSlotPage = lazy(()=>import("../pages/doctor/SlotPage"));
const AppoinmentBookingPage = lazy(()=>import("../pages/user/Appoinment"));
const PatientListPage = lazy(()=>import("../pages/doctor/patientListPages"));
const SinglePagePatient =lazy(()=>import("../pages/doctor/singlePagePatient"));

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
                     <Route path="/user/aboutus" element={<AboutPage />} />
                     <Route path="/user/doctor/:id" element={<DoctorDetailsUser />} />
                     <Route path="/user/appoinment/:id" element={<AppoinmentBookingPage />} />

                    

                    {/*Doctor Routes*/ }
                    <Route path="/doctor" element={<DoctorhomePage/>}/>
                    <Route path="/doctor/register" element={<DoctorSignup/>}/>
                    <Route path="/doctor/verify_token/:token" element ={<EmailVerificationPage/>}/>
                    <Route path="/doctor/login" element={<DoctorLogin/>}/>
                    <Route path="/doctor/Profile" element ={<ProfileDoctor/>}/>
                    <Route path="/doctor/slot" element ={<DoctorSlotPage/>}/>
                    <Route path="/doctor/patientList" element={<PatientListPage/>}/>
                    <Route path="/doctor/patient-details/:id" element={<SinglePagePatient/>} />

                    {/*Admin Routes*/}
                    <Route path="/admin/login" element={<AdminLogin/>}/>
                    <Route path="/admin" element={<AdminDashboard/>}/>
                    <Route path="/admin/users" element={<AdminUserList/>}/>
                    <Route path="/admin/doctors" element={<AdminDoctorList/>}/>
                    <Route path="/admin/doctors/:id" element={<AdminDoctorDetails/>}/>

                    
                </Routes>
            </Suspense> 
        </>
    );
};