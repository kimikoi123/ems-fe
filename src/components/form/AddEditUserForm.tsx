"use client";

import { API_CONFIG } from "@/app/constants/config";
import { User } from "@/app/interfaces/user";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Snackbar from "../snackbar/Snackbar";
import Spinner from "../spinner/Spinner";
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
  const [errorMessage, setErrorMessage] = useState("");
  const [snackbar, setSnackbar] = useState({ isOpen: false, message: "" });
  const [loading, setLoading] = useState(false); // Loading state

  const emailPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i;

  useEffect(() => {
    if (user) {
      setFormData({ ...user });
    }
  }, [user]);

  const handleEmailAddress = (value: string): string => {
    if (!emailPattern.test(value)) {
      setErrorMessage("Please enter a valid email address.");
    } else {
      setErrorMessage("");
    }
    return value;
  };

  const handleValue = (name: string, value: string): string | boolean => {
    switch (name) {
      case "gender":
        return handleGender(value);
      case "emailAddress":
        return handleEmailAddress(value);
      default:
        return value;
    }
  };

  const handleGender = (value: string): boolean => value === "true";

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: handleValue(name, value),
    }));
  };

  const handleAddUser = async (): Promise<void> => {
    setLoading(true);
    try {
      await axios.post(`${API_CONFIG.url}/users`, formData);
      handleSnackbar("User created successfully!");
      resetForm();
    } finally {
      setLoading(false);
    }
  };

  const handleEditUser = async (): Promise<void> => {
    setLoading(true);
    try {
      await axios.put(`${API_CONFIG.url}/user/${formData.id}`, formData);
      handleSnackbar("User updated successfully!");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (formData.id === 0) {
      await handleAddUser();
    } else {
      await handleEditUser();
    }
  };

  const resetForm = () => {
    setFormData({
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
  };

  const handleSnackbar = (message: string) => {
    setSnackbar({ isOpen: true, message });
  };

  const closeSnackbar = () => setSnackbar({ isOpen: false, message: "" });

  return (
    <div className="relative">
      <Spinner isVisible={loading} message="Saving..." />
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
            disabled={loading}
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
            disabled={loading}
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
          <label>Email Address</label>
          <input
            name="emailAddress"
            value={formData.emailAddress}
            onChange={handleChange}
            className="outline-none border rounded-lg bg-transparent p-2"
            type="email"
          />
          {errorMessage && (
            <p className="text-red-500 text-sm pt-1">{errorMessage}</p>
          )}
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
          className={`bg-indigo-500 text-white p-2 rounded-lg font-semibold col-span-full ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
          type="submit"
          disabled={loading}
        >
          {loading ? "Saving..." : user ? "Update" : "Add"}
        </button>
      </form>

      <Snackbar
        message={snackbar.message}
        isOpen={snackbar.isOpen}
        onClose={closeSnackbar}
      />
    </div>
  );
};

export default AddEditUserForm;
