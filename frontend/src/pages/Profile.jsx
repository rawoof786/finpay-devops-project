import React from "react";

function Profile() {
  return (
    <div className="profile-page">

      <div className="profile-header">
        <div className="profile-avatar">
          U
        </div>

        <div>
          <h2>My Profile</h2>
          <p>Manage your FinPay profile information</p>
        </div>
      </div>

      <div className="profile-card">

        <div className="profile-row">
          <span>Name</span>
          <strong>FinPay User</strong>
        </div>

        <div className="profile-row">
          <span>Email</span>
          <strong>user@finpay.com</strong>
        </div>

        <div className="profile-row">
          <span>Phone</span>
          <strong>+91 9876543210</strong>
        </div>

        <div className="profile-row">
          <span>Customer ID</span>
          <strong>CUST10001</strong>
        </div>

        <div className="profile-row">
          <span>Status</span>
          <strong className="profile-active">
            ACTIVE
          </strong>
        </div>

      </div>

    </div>
  );
}

export default Profile;
