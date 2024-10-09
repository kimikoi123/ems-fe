"use client";

import React, { useEffect, useState } from "react";

import { User } from "@/app/(dashboard)/user/page";

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
    gender: "",
    email: "",
    address: "",
    userType: "",
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
        gender: user.gender || "",
        email: user.email || "",
        address: user.address || "",
        userType: user.userType || "",
      });
    }
  }, [user]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    // TODO: Handle Add user functionality here
    console.log("SUBMITTED");
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
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="outline-none border rounded-lg bg-transparent p-2"
          >
            <option value="" disabled>
              -- Select an option --
            </option>
            <option value="admin">Male</option>
            <option value="employee">Female</option>
          </select>
        </div>
        <div className="flex flex-col">
          <label>Email</label>
          <input
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="outline-none border rounded-lg bg-transparent p-2"
            type="email"
          />
        </div>
        <div className="flex flex-col">
          <label>Address</label>
          <input
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="outline-none border rounded-lg bg-transparent p-2"
            type="text"
          />
        </div>
        <div className="flex flex-col">
          <label>User Type</label>
          <select
            name="userType"
            value={formData.userType}
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
