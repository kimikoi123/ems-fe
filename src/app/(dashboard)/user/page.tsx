import React from "react";
import Link from "next/link";

//TODO: Move this in interfaces folder. Properties need to be changed once api comes
export interface User {
  id: number;
  firstName: string;
  lastName: string;
  middleName?: string;
  preferredName?: string;
  email: string;
  phoneNumber?: string;
  dateOfBirth?: string;
  gender?: string;
  address?: string;
  userType?: string;
}

//TODO: Need to paginate users and pass only the needed data. No need to pass full as we can do another backend call for every user detail on edit user page
const mockUsers: User[] = [
  {
    id: 1,
    firstName: "John",
    lastName: "Doe1",
    email: "johndoe1@email.com",
    phoneNumber: "+6376961481",
  },
  {
    id: 2,
    firstName: "John",
    lastName: "Doe2",
    email: "johndoe2@email.com",
    phoneNumber: "+6376961482",
  },
  {
    id: 3,
    firstName: "John",
    lastName: "Doe3",
    email: "johndoe3@email.com",
    phoneNumber: "+6376961483",
  },
];

//Move this to components as UserCard
const UserCard = ({ userData }: { userData: User }) => {
  return (
    <div className="flex gap-4">
      <div className="w-[100px] h-[100px] bg-cyan-300 rounded-lg" />
      <div className="flex-1">
        <h1 className="text-lg font-bold">
          {userData.firstName} {userData.lastName}
        </h1>
        <div>Employee #{userData.id}</div>

        <div>{userData.email}</div>
        <div>{userData.phoneNumber}</div>
      </div>
      <Link href={`/user/${userData.id}`}>
        <button className="bg-blue-500 text-white p-2 rounded">
          Edit Details
        </button>
      </Link>
    </div>
  );
};

const UserPage = () => {
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
        {mockUsers.map((user) => (
          <UserCard key={user.id} userData={user} />
        ))}
      </div>
    </div>
  );
};

export default UserPage;
