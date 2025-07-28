import React from "react";
import { Route, Routes } from "react-router";
import Register from "./validation/register/register";
import Login from "./validation/login/login";
import Validation from "./validation/validation";
import LeaveLayout from "./user/userlayout";
import { LeaveApply } from "./worker/leaveapply/leaveapply";
import LeaveHistory from "./worker/leavehistory/leavehistory";
import Dashboard from "./admin/Dashbord/dashbord";
import ViewLeave from "./admin/ViewLeave/viewleave";
import Profile from "./user/profile/Profile";
import ProtectedRoute from  "./protectedRouter/protectedRouter";

function App() {
  return (
   <Routes>
  <Route path="/" element={<Validation />}>
    <Route index element={<Register />} />
    <Route path="login" element={<Login />} />
  </Route>

 <Route
  path="/employee"
  element={
    <ProtectedRoute>
      <LeaveLayout />
    </ProtectedRoute>
  }
>
  <Route index element={<Dashboard />} />
  <Route path="leaveapply" element={<LeaveApply />} />
  <Route path="leavehistory" element={<LeaveHistory />} />
  <Route path="profile" element={<Profile />} />
</Route>

<Route
  path="/manager"
  element={
    <ProtectedRoute>
      <LeaveLayout />
    </ProtectedRoute>
  }
>
  <Route index element={<Dashboard />} />
  <Route path="viewleave" element={<ViewLeave />} />
  <Route path="leavehistory" element={<LeaveHistory />} />
  <Route path="profile" element={<Profile />} />
</Route>



</Routes>

  );
}

export default App;
