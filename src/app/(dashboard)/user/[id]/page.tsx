"use client";

import React, { useEffect, useState } from "react";

import AddEditUserForm from "@/components/form/AddEditUserForm";
import { User } from "@/app/interfaces/user";
import axios from "axios";
import { API_CONFIG } from "@/app/constants/config";
import { useParams } from "next/navigation";

const EditUser = () => {
  const [user, setUser] = useState<User>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const params = useParams();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          `${API_CONFIG.url}/user/${params?.id}`,
        );
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
