import React from "react";
import Link from "next/link";

const ExampleUser = () => {
  return (
    <div className="flex gap-4">
      <div className="w-[100px] h-[100px] bg-cyan-300 rounded-lg" />
      <div>
        <h1 className="text-lg font-bold">John Doe</h1>
        <div>Employee #1</div>

        <div>johndoe@email.com</div>
        <div>+6376961485</div>
      </div>
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
      <div className="mt-4 flex flex-col gap-4">
        <ExampleUser />
        <ExampleUser />
        <ExampleUser />
      </div>
    </div>
  );
};

export default UserPage;
