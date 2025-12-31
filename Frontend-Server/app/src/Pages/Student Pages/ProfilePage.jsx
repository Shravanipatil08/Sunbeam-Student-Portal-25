import React, { useEffect } from "react";
import { useAuth } from "../../context/userAuth";
import UpdatePasswordModal from '../../Components/UpdatePasswordModal'
import Navbar from "../../Components/Navbar";

function ProfilePage() {
  const { auth } = useAuth();

  useEffect(()=>{
    if(!auth.token) return
  })

  return (
    <div>
    <Navbar/>
    <div
      className="d-flex justify-content-center align-items-start"
      style={{
        minHeight: "100vh",
        background: "#f8f9fa",
        paddingTop: "40px"
      }}
    >
      <div className="container">
        <h2 className="mb-4 text-center">My Profile</h2>

        <div
          className="card p-4 mx-auto"
          style={{
            maxWidth: "800px",
            width: "100%",
            borderRadius: "14px"
          }}
        >

          <div className="mb-4">
            <h4 className="mb-1">{auth?.user?.name}</h4>
            <p className="text-muted mb-0">{auth?.user?.email}</p>
          </div>

          <table className="table">
            <tbody>
              <tr>
                <th style={{ width: "150px" }}>Name</th>
                <td>{auth?.user?.name}</td>
              </tr>
              <tr>
                <th>Email</th>
                <td>{auth?.user?.email}</td>
              </tr>
              <tr>
                <th>Role</th>
                <td className="text-capitalize">{auth?.role}</td>
              </tr>
            </tbody>
          </table>

          <div
            className="mt-5 d-flex justify-content-center"
            style={{ gap: "20px" }}
          >
            <button className="btn btn-outline-secondary px-5" data-toggle="modal"
              data-target="#updatePasswordModal">
              Change Password
            </button>
            <UpdatePasswordModal/>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}

export default ProfilePage;
