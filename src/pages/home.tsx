// src/pages/Home.tsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import UserTable from "../components/user-table";

const Home: React.FC = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then((response) => {
        setUsers(response.data);
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to fetch users ");
        setLoading(false);
        console.log(err);
      });
  }, []);

  if (loading) return <p className="text-center">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="max-w-4xl mx-auto overflow-hidden">
      <h1 className="text-2xl font-bold mb-4 text-center">User List</h1>
      <UserTable users={users} />
    </div>
  );
};

export default Home;
