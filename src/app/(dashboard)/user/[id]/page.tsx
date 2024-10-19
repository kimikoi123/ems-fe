"use client";

import React, { useEffect, useState } from "react";

import AddEditUserForm from "@/components/form/AddEditUserForm";
import { User } from "@/app/interfaces/user";
import { useParams } from "next/navigation";
import getAxiosClient from "@/services/axiosInstance";

const EditUser = () => {
  const [user, setUser] = useState<User>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const params = useParams();

  useEffect(() => {
    const fetchUsers = async () => {
      const axiosClient = getAxiosClient();
      try {
        const response = await axiosClient.get(`/user/${params?.id}`);
        setUser(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Error");
        setLoading(false);
      }
    };

    fetchUsers();
  }, [params?.id]);

  if (loading) return <p>Loading user...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1 className="font-bold text-2xl">Edit User</h1>
      <AddEditUserForm user={user} />
    </div>
  );
};

export default EditUser;
