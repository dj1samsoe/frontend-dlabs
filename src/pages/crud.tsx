// src/pages/CrudPage.tsx
import React, { useState, useEffect } from "react";
import CrudForm from "../components/crud-form";
import UserTable from "../components/user-table";

interface User {
  id: number;
  name: string;
  email: string;
  age: number;
  membershipStatus: "active" | "inactive";
}

const CrudPage: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [sortBy, setSortBy] = useState<"name" | "age" | "membershipStatus">(
    "name"
  );
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [filterStatus, setFilterStatus] = useState<
    "all" | "active" | "inactive"
  >("all");

  // Mengambil data user dari local storage
  useEffect(() => {
    const savedUsers = localStorage.getItem("users");
    if (savedUsers) setUsers(JSON.parse(savedUsers));
  }, []);

  // Menyimpan user di local storage
  useEffect(() => {
    localStorage.setItem("users", JSON.stringify(users));
  }, [users]);

  const addUser = (user: User) => {
    setUsers([...users, user]);
  };

  const updateUser = (updatedUser: User) => {
    setUsers(
      users.map((user) => (user.id === updatedUser.id ? updatedUser : user))
    );
    setEditingUser(null); // Reset edit mode
  };

  const deleteUser = (id: number) => {
    setUsers(users.filter((user) => user.id !== id));
  };

  const handleEditUser = (user: User) => {
    setEditingUser(user);
  };

  const handleSort = (column: "name" | "age" | "membershipStatus") => {
    const newSortOrder =
      sortBy === column && sortOrder === "asc" ? "desc" : "asc";
    setSortBy(column);
    setSortOrder(newSortOrder);
  };

  const handleFilter = (status: "all" | "active" | "inactive") => {
    setFilterStatus(status);
  };

  const filteredUsers = users
    .filter(
      (user) => filterStatus === "all" || user.membershipStatus === filterStatus
    )
    .sort((a, b) => {
      if (sortBy === "name") {
        return sortOrder === "asc"
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name);
      }
      if (sortBy === "age") {
        return sortOrder === "asc" ? a.age - b.age : b.age - a.age;
      }
      if (sortBy === "membershipStatus") {
        return sortOrder === "asc"
          ? a.membershipStatus.localeCompare(b.membershipStatus)
          : b.membershipStatus.localeCompare(a.membershipStatus);
      }
      return 0;
    });

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-center">Manage Users</h1>

      <div className="flex md:flex-row flex-col md:gap-0 gap-5 justify-between mb-4">
        <div>
          <label className="mr-2">Filter by Membership Status:</label>
          <select
            value={filterStatus}
            onChange={(e) =>
              handleFilter(e.target.value as "all" | "active" | "inactive")
            }
            className="border p-2 rounded-lg"
          >
            <option value="all">All</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>

        <div>
          <label className="mr-2">Sort by:</label>
          <select
            value={sortBy}
            onChange={(e) =>
              handleSort(e.target.value as "name" | "age" | "membershipStatus")
            }
            className="border p-2 rounded-lg"
          >
            <option value="name">Name</option>
            <option value="age">Age</option>
            <option value="membershipStatus">Membership Status</option>
          </select>
          <button
            onClick={() => handleSort(sortBy)}
            className="ml-2 bg-white text-neutral-800 px-3 py-2 rounded-lg border"
          >
            {sortOrder === "asc" ? "↑" : "↓"}
          </button>
        </div>
      </div>

      <CrudForm
        onAddUser={addUser}
        onUpdateUser={updateUser}
        editingUser={editingUser}
      />
      <UserTable
        users={filteredUsers}
        onUpdateUser={handleEditUser}
        onDeleteUser={deleteUser}
      />
    </div>
  );
};

export default CrudPage;
