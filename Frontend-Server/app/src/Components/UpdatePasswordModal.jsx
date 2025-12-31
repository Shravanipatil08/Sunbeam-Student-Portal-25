import React, { useState } from "react";
import { updatePassword } from "../Services/studentServices";
import { useAuth } from "../context/userAuth";

function UpdatePasswordModal() {
 
  const {auth} = useAuth() 
  const [newPass, setNewPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [error, setError] = useState("");

  const handleUpdate = async() => {
    const response = await updatePassword(auth.token,newPass,confirmPass,auth.user.email)
    console.log(auth.email)
    console.log(response)
    if(response.status == "success")
    {
      console.log("Password Changed...")
    }
    else
      console.log("Fail")

    if (!newPass || !confirmPass) {
      setError("Both fields are required");
      return;
    }

    if (newPass !== confirmPass) {
      setError("Passwords do not match");
      return;
    }

    setError("");
    setNewPass("");
    setConfirmPass("");
  };

  return (
    <div
      className="modal fade"
      id="updatePasswordModal"
      tabIndex="-1"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">

          <div className="modal-header">
            <h5 className="modal-title">Update Password</h5>
          </div>

          <div className="modal-body">
            {error && <div className="alert alert-danger">{error}</div>}

            <div className="mb-3">
              <label className="form-label">New Password</label>
              <input
                type="password"
                className="form-control"
                value={newPass}
                onChange={e => setNewPass(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Confirm Password</label>
              <input
                type="password"
                className="form-control"
                value={confirmPass}
                onChange={e => setConfirmPass(e.target.value)}
              />
            </div>
          </div>

          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleUpdate}
              data-bs-dismiss={
                newPass && confirmPass && newPass === confirmPass
                  ? "modal"
                  : ""
              }
            >
              Update Password
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}

export default UpdatePasswordModal;
