import React from "react";

const AddEditUserForm = () => {
  //   const handleSubmit = (e: React.SyntheticEvent) => {
  //     e.preventDefault();
  //     // TODO: Handle Add user functionality here
  //     console.log("SUBMITTED");
  //   };

  return (
    <div>
      <h1 className="font-semibold mt-4">Details</h1>
      <form className="grid grid-cols-2 pt-4 gap-4">
        <div className="flex flex-col">
          <label>First Name</label>
          <input
            className="outline-none border rounded-lg bg-transparent p-2"
            type="text"
          />
        </div>
        <div className="flex flex-col">
          <label>Last Name</label>
          <input
            className="outline-none border rounded-lg bg-transparent p-2"
            type="text"
          />
        </div>
        <div className="flex flex-col">
          <label>Middle Name</label>
          <input
            className="outline-none border rounded-lg bg-transparent p-2"
            type="text"
          />
        </div>
        <div className="flex flex-col">
          <label>Preferred Name</label>
          <input
            className="outline-none border rounded-lg bg-transparent p-2"
            type="text"
          />
        </div>
        <div className="flex flex-col">
          <label>Phone Number</label>
          <input
            className="outline-none border rounded-lg bg-transparent p-2"
            type="text"
          />
        </div>
        <div className="flex flex-col">
          <label>Date of Birth</label>
          <input
            className="outline-none border rounded-lg bg-transparent p-2"
            type="date"
          />
        </div>
        <div className="flex flex-col">
          <label>Gender</label>
          <input
            className="outline-none border rounded-lg bg-transparent p-2"
            type="text"
          />
        </div>
        <div className="flex flex-col">
          <label>Email</label>
          <input
            className="outline-none border rounded-lg bg-transparent p-2"
            type="text"
          />
        </div>
        <div className="flex flex-col">
          <label>Address</label>
          <input
            className="outline-none border rounded-lg bg-transparent p-2"
            type="text"
          />
        </div>
        <div className="flex flex-col">
          <label>User Type</label>
          <select className="outline-none border rounded-lg bg-transparent p-2">
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
          Add
        </button>
      </form>
    </div>
  );
};

export default AddEditUserForm;
