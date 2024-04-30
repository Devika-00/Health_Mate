import AdminHeader from '../../components/admin/Header&Sidebar/Header';
import AdminSidebar from '../../components/admin/Header&Sidebar/Sidebar';
import DoctorVerificationPage from '../../components/admin/verification';

const verificationDoctor = () => {
  return (
    <>
    <div className="flex h-screen">
    <AdminSidebar/>
    <div className="flex flex-col w-full">
    <AdminHeader/>
    <div className="p-6">
    <h1 className="text-2xl font-bold mb-4 text-blue-950 mt-5 text-center">Verification Page</h1>
    <DoctorVerificationPage/>

    </div>
    </div>
    </div>
    </>
  )
}

export default verificationDoctor