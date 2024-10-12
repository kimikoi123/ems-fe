"use client";

import { API_CONFIG } from "@/app/constants/config";
import { User } from "@/app/interfaces/user";
import axios from "axios";
import React, { useEffect, useState } from "react";

interface AddEditUserFormProps {
  user?: User;
}

const AddEditUserForm: React.FC<AddEditUserFormProps> = ({ user }) => {
  const [formData, setFormData] = useState<User>({
    id: 0,
    firstName: "",
    lastName: "",
    middleName: "",
    preferredName: "",
    phoneNumber: "",
    dateOfBirth: "",
    gender: true,
    emailAddress: "",
    homeAddress: "",
    role: "",
  });

  useEffect(() => {
    if (user) {
      setFormData({
        id: user.id || 0,
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        middleName: user.middleName || "",
        preferredName: user.preferredName || "",
        phoneNumber: user.phoneNumber || "",
        dateOfBirth: user.dateOfBirth || "",
        gender: user.gender || true,
        emailAddress: user.emailAddress || "",
        homeAddress: user.homeAddress || "",
        role: user.role || "",
      });
    }
  }, [user]);

  const handleGender = (name: string, value: string): string | boolean =>
    name === "gender" ? value === "true" : value;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: handleGender(name, value),
    }));
  };

  const handleAddUser = async (): Promise<void> => {
    await axios.post(`${API_CONFIG.url}/users`, formData);
  };

  const handleEditUser = async (): Promise<void> => {
    await axios.put(`${API_CONFIG.url}/user/${formData.id}`, formData);
  };

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();

    if (formData.id === 0) {
      return handleAddUser();
    }

    handleEditUser();
  };

  return (
    <div>
      <h1 className="font-semibold mt-4">Details</h1>
      <form className="grid grid-cols-2 pt-4 gap-4" onSubmit={handleSubmit}>
        <div className="flex flex-col">
          <label>First Name</label>
          <input
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            className="outline-none border rounded-lg bg-transparent p-2"
            type="text"
            required
          />
        </div>
        <div className="flex flex-col">
          <label>Last Name</label>
          <input
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            className="outline-none border rounded-lg bg-transparent p-2"
            type="text"
            required
          />
        </div>
        <div className="flex flex-col">
          <label>Middle Name</label>
          <input
            name="middleName"
            value={formData.middleName}
            onChange={handleChange}
            className="outline-none border rounded-lg bg-transparent p-2"
            type="text"
          />
        </div>
        <div className="flex flex-col">
          <label>Preferred Name</label>
          <input
            name="preferredName"
            value={formData.preferredName}
            onChange={handleChange}
            className="outline-none border rounded-lg bg-transparent p-2"
            type="text"
          />
        </div>
        <div className="flex flex-col">
          <label>Phone Number</label>
          <input
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            className="outline-none border rounded-lg bg-transparent p-2"
            type="text"
          />
        </div>
        <div className="flex flex-col">
          <label>Date of Birth</label>
          <input
            name="dateOfBirth"
            value={formData.dateOfBirth}
            onChange={handleChange}
            className="outline-none border rounded-lg bg-transparent p-2"
            type="date"
          />
        </div>
        <div className="flex flex-col">
          <label>Gender</label>
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="gender"
              value="true"
              checked={formData.gender === true}
              onChange={handleChange}
            />
            Male
          </label>
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="gender"
              value="false"
              checked={formData.gender === false}
              onChange={handleChange}
            />
            Female
          </label>
        </div>
        <div className="flex flex-col">
          <label>Email</label>
          <input
            name="emailAddress"
            value={formData.emailAddress}
            onChange={handleChange}
            className="outline-none border rounded-lg bg-transparent p-2"
            type="email"
          />
        </div>
        <div className="flex flex-col">
          <label>Address</label>
          <input
            name="homeAddress"
            value={formData.homeAddress}
            onChange={handleChange}
            className="outline-none border rounded-lg bg-transparent p-2"
            type="text"
          />
        </div>
        <div className="flex flex-col">
          <label>Role</label>
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="outline-none border rounded-lg bg-transparent p-2"
          >
            <option value="" disabled>
              -- Select an option --
            </option>
            <option value="admin">Administrator</option>
            <option value="employee">Employee</option>
            <option value="candidate">Candidate</option>
          </select>
        </div>

        <button
          className="bg-indigo-500 text-white p-2 rounded-lg font-semibold col-span-full"
          type="submit"
        >
          {user ? "Update" : "Add"}
        </button>
      </form>
    </div>
  );
};

export default AddEditUserForm;
