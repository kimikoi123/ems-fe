"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import getAxiosClient from "@/services/axiosInstance";
import UserCard from "@/components/card/userCard/UserCard";
import { User } from "@/app/interfaces/user";

const UserPage: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      const axiosClient = getAxiosClient();
      try {
        const response = await axiosClient.get("/users");
        setUsers(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Error");
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) return <p>Loading users...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">USER PAGE</h1>
        <Link
          href="/user/add"
          className="bg-indigo-500 text-white p-2 rounded-lg font-semibold"
        >
          + ADD USER
        </Link>
      </div>
      <div className="mt-8 flex flex-col gap-4">
        {users.map((user) => (
          <UserCard key={user.id} userData={user} />
        ))}
      </div>
    </div>
  );
};

export default UserPage;
