/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";

interface User {
  id: number;
  name: string;
  email: string;
  age: number;
  membershipStatus: string;
}

interface UserTableProps {
  users: User[];
  onDeleteUser?: (id: number) => void;
  onUpdateUser?: (user: any) => void;
}

const UserTable: React.FC<UserTableProps> = ({
  users,
  onDeleteUser,
  onUpdateUser,
}) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full bg-white border rounded-lg">
        <thead>
          <tr>
            <th className="px-4 py-2 border">Name</th>
            <th className="px-4 py-2 border">Email</th>
            <th className="px-4 py-2 border">Age</th>
            <th className="px-4 py-2 border">Status</th>
            {onDeleteUser && onUpdateUser && (
              <th className="px-4 py-2 border">Actions</th>
            )}
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td className="px-4 py-2 border">{user.name}</td>
              <td className="px-4 py-2 border">{user.email}</td>
              <td className="px-4 py-2 border">{user.age}</td>
              <td className="px-4 py-2 border">{user.membershipStatus}</td>
              {onDeleteUser && onUpdateUser && (
                <td className="px-4 py-2 border">
                  <button
                    onClick={() => onUpdateUser(user)}
                    className="text-blue-600 mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onDeleteUser(user.id)}
                    className="text-red-600"
                  >
                    Delete
                  </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
