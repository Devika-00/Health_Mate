import AdminHeader from '../../components/admin/Header&Sidebar/Header';
import AdminSidebar from '../../components/admin/Header&Sidebar/Sidebar';
import DepartmentManagement from '../../components/admin/department';


const departmentPage = () => {
  return (
    <>
    <div className="flex h-screen">
    <AdminSidebar/>
    <div className="flex flex-col w-full">
    <AdminHeader/>
    <div className="p-6">
    <DepartmentManagement/>

    </div>
    </div>
    </div>
    </>
  )
}

export default departmentPage