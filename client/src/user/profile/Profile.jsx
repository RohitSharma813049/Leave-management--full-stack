import React from "react";
import { useSelector } from "react-redux";

const Profile = () => {
  // Assuming user data is in Redux store
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Profile</h2>
      {user ? (
        <div className="bg-gray-100 p-4 rounded shadow">
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Role:</strong> {user.role}</p>
        </div>
      ) : (
        <p>No user data found.</p>
      )}
    </div>
  );
};

export default Profile;
