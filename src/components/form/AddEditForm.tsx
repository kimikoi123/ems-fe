import React from "react";

const AddEditForm = () => {
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
          <label>Phone</label>
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
          <label>Country</label>
          <input
            className="outline-none border rounded-lg bg-transparent p-2"
            type="text"
          />
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

export default AddEditForm;
