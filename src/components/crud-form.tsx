/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from "react";

interface CrudFormProps {
  onAddUser: (user: any) => void;
  onUpdateUser: (user: any) => void;
  editingUser: any | null;
}

const CrudForm: React.FC<CrudFormProps> = ({
  onAddUser,
  onUpdateUser,
  editingUser,
}) => {
  const [formData, setFormData] = useState({
    id: 0,
    name: "",
    email: "",
    age: "",
    membershipStatus: "inactive",
  });
  const [errors, setErrors] = useState<any>({});

  useEffect(() => {
    if (editingUser) {
      setFormData({
        ...editingUser,
        age: editingUser.age.toString(), // Mengubah age ke tipe string
      });
    }
  }, [editingUser]);

  const validateForm = () => {
    const errors: any = {};
    if (!formData.name) errors.name = "Name is required.";
    if (!formData.email) errors.email = "Email is required.";
    else if (!/^\S+@\S+\.\S+$/.test(formData.email))
      errors.email = "Invalid email format.";
    if (
      !formData.age ||
      isNaN(Number(formData.age)) ||
      Number(formData.age) <= 0
    )
      errors.age = "Age must be a positive number.";
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    if (editingUser) {
      onUpdateUser({
        ...formData,
        age: Number(formData.age),
      });
    } else {
      onAddUser({
        ...formData,
        id: Date.now(),
        age: Number(formData.age),
      });
    }
    setFormData({
      id: 0,
      name: "",
      email: "",
      age: "",
      membershipStatus: "inactive",
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 p-4 border rounded-lg bg-white"
    >
      <div>
        <label>Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full border p-2 rounded-lg"
        />
        {errors.name && <p className="text-red-500">{errors.name}</p>}
      </div>
      <div>
        <label>Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="w-full border p-2 rounded-lg"
        />
        {errors.email && <p className="text-red-500">{errors.email}</p>}
      </div>
      <div>
        <label>Age</label>
        <input
          type="number"
          name="age"
          value={formData.age}
          onChange={(e) => setFormData({ ...formData, age: e.target.value })}
          className="w-full border p-2 rounded-lg"
        />
        {errors.age && <p className="text-red-500">{errors.age}</p>}
      </div>
      <div>
        <label>Status</label>
        <select
          name="membershipStatus"
          value={formData.membershipStatus}
          onChange={(e) =>
            setFormData({ ...formData, membershipStatus: e.target.value })
          }
          className="w-full border p-2 rounded-lg"
        >
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
      </div>
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        {editingUser ? "Update User" : "Add User"}
      </button>
    </form>
  );
};

export default CrudForm;
