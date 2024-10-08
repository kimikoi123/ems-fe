import React from "react";
import Navbar from "@/components/navbar/Navbar";

const Dashboard = () => {
  return (
    <div>
      <Navbar></Navbar>
      <h1 className="text-2xl font-bold mb-4">Dashboard Page</h1>
      <p>Welcome to your dashboard!</p>
    </div>
  );
};

export default Dashboard;
