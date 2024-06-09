import {Suspense, lazy} from "react";
import { Routes, Route } from "react-router-dom";
import PublicRoute, { PublicRouteAdmin, PublicRouteDoctor } from "./PublicRoutes";
import ProtectedRoute, {
    AdminProtectedRoute,
    DoctorProtectedRoute} from "./ProtectedRoute"
import PublicRouteUser from "./PublicRoutes";
import CommonLayout from "../components/user/commonLayout";
import CommonLayoutDoctor from "../components/doctor/commonLayout";




const Register = lazy(()=>import("../pages/user/Register"));
const Login = lazy(()=>import("../pages/user/Login"));
const VerifyOtp = lazy(()=>import("../pages/user/VerifyOTP"));
const ForgotPassword = lazy(() => import("../pages/user/forgotPassword"));
const ResetPassword = lazy(()=>import("../pages/user/resetPassword"));
const NotFoundPage = lazy(() => import("../pages/Error404"));
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
const AppoinmentOnlineBookingPage = lazy(()=>import("../pages/user/OnlineAppoinment"));
const PatientListPage = lazy(()=>import("../pages/doctor/patientListPages"));
const SinglePagePatient =lazy(()=>import("../pages/doctor/singlePagePatient"));
const RequestedDoctors = lazy(()=>import("../pages/admin/requestedDoctors"))
const VerificationDoctor = lazy(()=>import("../pages/admin/verificationDoctor"));
const DoctorStatus = lazy(()=>import("../pages/doctor/DoctorStatus"));
const OnlineDoctors = lazy(()=>import('../pages/user/OnlinePage'));
const OfflineDoctors = lazy(()=>import('../pages/user/OfflinePage'));
const PaymentCompleted = lazy(() => import("../pages/user/PayementCompleted"));
const AppoinmentDetails = lazy(()=>import("../pages/user/AppoinmentDetails"));
const AppoinmentListPage = lazy(()=>import("../pages/user/getAppoinmentsAll"));
const Chat = lazy(()=>import("../pages/user/Chat"));
const DoctorChat=lazy(()=>import("../pages/doctor/Chat"));
const UploadForm = lazy(()=>import("../pages/user/labRecord"));
const DocumentListPage = lazy(()=>import("../pages/user/documentsListPage"));
const WalletPage = lazy(()=>import("../pages/user/wallet"));
const Transaction = lazy(()=>import("../pages/user/walletTransation"));
const DepartmentManagement = lazy(()=>import("../pages/admin/departmentPage"));


export const MainRouter = () => {
    return (
        <>
            <Suspense fallback={<h1>Loading</h1>}> 
                <Routes>
                    {/* userRoutes */}
                    <Route element={<CommonLayout />}>
                    <Route path="/" element={<Home />} />
                    </Route>
                     <Route path="/user/aboutus" element={<AboutPage />} />
                    <Route path="" element={<PublicRouteUser />}>
                    <Route path="/user/register" element={<Register />} />
                    <Route path ="user/verify_otp" element={<VerifyOtp/>}/>
                    <Route path="/user/login" element={<Login/>}/>
                    <Route path="/user/forgot-password" element ={<ForgotPassword/>} />
                    <Route path="/user/reset_password/:id" element ={<ResetPassword/>}/>
                    </Route>

                     
                     {/* Protected user  route */}
                     <Route path="" element={<ProtectedRoute />}>
                     <Route element={<CommonLayout />}>
                     <Route path="/user/Profile" element={<ProfileUser />} />
                     <Route path="/user/doctor" element={<DoctorList />} />
                     <Route path="/user/doctor/:id" element={<DoctorDetailsUser />} />
                     <Route path="/user/appoinmentOffline/:id" element={<AppoinmentBookingPage />} />
                     <Route path="/user/appoinmentOnline/:id" element={<AppoinmentOnlineBookingPage />} />
                     <Route path="/payment_status/:id" element={<PaymentCompleted />} />
                     <Route path="/appoinmentDetails/:id" element={<AppoinmentDetails/>} />
                     <Route path ="/user/appoinmentlist" element={<AppoinmentListPage/>}/>
                     <Route path ="/user/labrecord" element={<UploadForm/>}/>
                     <Route path ="/user/documents/:id" element={<DocumentListPage/>}/>
                     <Route path="/user/online-consultation" element={<OnlineDoctors/>}/>
                     <Route path="/user/offline-consultation" element={<OfflineDoctors/>}/>
                     <Route path="/user/wallet" element={<WalletPage/>}/>
                     <Route path="/user/walletHistory" element={<Transaction/>}/>
                     </Route>
                     <Route path="/user/chat" element={<Chat />} />
                     </Route>
            
                     

                    {/*Doctor Routes*/ }
                    <Route path="" element={<PublicRouteDoctor />}>  
                    <Route path="/doctor/register" element={<DoctorSignup/>}/>
                    <Route path="/doctor/verify_token/:token" element ={<EmailVerificationPage/>}/>
                    <Route path="/doctor/login" element={<DoctorLogin/>}/>
                    </Route>

                    {/* Doctor private routes  */}
                    <Route path="" element={<DoctorProtectedRoute />}>
                    <Route element={<CommonLayoutDoctor />}>
                    <Route path="/doctor" element={<DoctorhomePage/>}/>
                    <Route path="/doctor/Profile" element ={<ProfileDoctor/>}/>
                    <Route path="/doctor/slot" element ={<DoctorSlotPage/>}/>
                    <Route path="/doctor/patientList" element={<PatientListPage/>}/>
                    <Route path="/patient-details/:id" element={<SinglePagePatient/>} />
                    <Route path="/doctor/status/:doctorId" element={<DoctorStatus/>}/>
                    </Route>
                    <Route path="/doctor/chat" element={<DoctorChat/>}/>
                    </Route>

                    {/*Admin Routes*/}
                    <Route path="" element={<PublicRouteAdmin />}>
                    <Route path="/admin/login" element={<AdminLogin/>}/>
                    </Route>

                     {/* admin protected Route  */}
                     <Route path="" element={<AdminProtectedRoute />}>
                    <Route path="/admin" element={<AdminDashboard/>}/>
                    <Route path="/admin/users" element={<AdminUserList/>}/>
                    <Route path="/admin/department" element={<DepartmentManagement/>}/>
                    <Route path="/admin/doctors" element={<AdminDoctorList/>}/>
                    <Route path="/admin/requesteddoctors" element={<RequestedDoctors/>}/>
                    <Route path="/admin/doctors/:id" element={<AdminDoctorDetails/>}/>
                    <Route path="/admin/doctors/:id/verification" element={<VerificationDoctor/>}/>
                    </Route>

                    <Route path="*" element={<NotFoundPage />} />
                </Routes>
            </Suspense> 
        </>
    );
};