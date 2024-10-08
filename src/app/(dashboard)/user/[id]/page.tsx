import React from "react";

import AddEditUserForm from "@/components/form/AddEditUserForm";

import { User } from "../page";

//TODO: Remove and fetch from DB via userId on URL
const mockUser: User = {
  id: 1,
  firstName: "John",
  lastName: "Doe",
  middleName: "A",
  preferredName: "JD",
  phoneNumber: "+639000000",
  dateOfBirth: "2024-10-04",
  gender: "Male",
  email: "johndoe@email.com",
  address: "Philippines",
  userType: "Administrator",
};

const EditUser = () => {
  return (
    <div>
      <h1 className="font-bold text-2xl">Edit User</h1>
      {/* TODO: Change data from DB via userId on URL */}
      <AddEditUserForm user={mockUser} />
    </div>
  );
};

export default EditUser;
