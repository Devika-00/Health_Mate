import React from 'react';
import UserData from "../../components/admin/userData";
import useUsers from "../../hooks/useUsers";
import AdminHeader from '../../components/admin/Header&Sidebar/Header';
import AdminSidebar from '../../components/admin/Header&Sidebar/Sidebar';

const UserList: React.FC = () => {
  const { users } = useUsers();

  return (
    <div className="flex h-screen">
      <AdminSidebar />
      <div className="flex flex-col w-full">
        <AdminHeader />
        <div className="p-6">
          <h1 className="text-2xl font-bold mb-4">User List</h1>
          <div className="overflow-x-auto">
            <table className="table-auto w-full">
              <thead>
                <tr className="bg-gray-200">
                  <th className="px-6 py-3 text-left">Serial No</th>
                  <th className="px-6 py-3 text-left">Name</th>
                  <th className="px-6 py-3 text-left">Email</th>
                  <th className="px-6 py-3 text-left">Status</th>
                  <th className="px-6 py-3 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, index) => {
                  return <UserData {...user} index={index} key={user._id} />;
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserList;
