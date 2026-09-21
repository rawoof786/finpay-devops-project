import { useState } from "react";

const defaultProfile = {
  name: "",
  email: "",
  phone: "",
  customerId: "",
  status: "ACTIVE",
};

function Profile() {
  const [profile, setProfile] = useState(() => {
    const savedProfile = localStorage.getItem("finpayProfile");

    if (savedProfile) {
      return JSON.parse(savedProfile);
    }

    return defaultProfile;
  });

  const [isEditing, setIsEditing] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;

    setProfile((currentProfile) => ({
      ...currentProfile,
      [name]: value,
    }));
  };

  const handleSave = (event) => {
    event.preventDefault();

    localStorage.setItem("finpayProfile", JSON.stringify(profile));

    setIsEditing(false);
    setMessage("Profile updated successfully.");

    setTimeout(() => {
      setMessage("");
    }, 3000);
  };

  const handleCancel = () => {
    const savedProfile = localStorage.getItem("finpayProfile");

    if (savedProfile) {
      setProfile(JSON.parse(savedProfile));
    } else {
      setProfile(defaultProfile);
    }

    setIsEditing(false);
    setMessage("");
  };

  const avatarLetter = profile.name
    ? profile.name.charAt(0).toUpperCase()
    : "U";

  return (
    <div className="profile-page">
      <div className="profile-header">
        <div className="profile-avatar">
          {avatarLetter}
        </div>

        <div>
          <h2>My Profile</h2>
          <p>Manage your FinPay profile information</p>
        </div>
      </div>

      {message && (
        <div className="profile-success">
          {message}
        </div>
      )}

      {!isEditing ? (
        <>
          <div className="profile-card">
            <div className="profile-row">
              <span>Name</span>
              <strong>{profile.name || "Not provided"}</strong>
            </div>

            <div className="profile-row">
              <span>Email</span>
              <strong>{profile.email || "Not provided"}</strong>
            </div>

            <div className="profile-row">
              <span>Phone</span>
              <strong>{profile.phone || "Not provided"}</strong>
            </div>

            <div className="profile-row">
              <span>Customer ID</span>
              <strong>{profile.customerId || "Not provided"}</strong>
            </div>

            <div className="profile-row">
              <span>Status</span>
              <strong className="profile-active">
                {profile.status}
              </strong>
            </div>
          </div>

          <button
            className="profile-edit-button"
            onClick={() => setIsEditing(true)}
          >
            ✏️ Edit Profile
          </button>
        </>
      ) : (
        <form
          className="profile-card profile-form"
          onSubmit={handleSave}
        >
          <div className="profile-field">
            <label>Name</label>
            <input
              type="text"
              name="name"
              value={profile.name}
              onChange={handleChange}
              placeholder="Enter your name"
              required
            />
          </div>

          <div className="profile-field">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={profile.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="profile-field">
            <label>Phone</label>
            <input
              type="tel"
              name="phone"
              value={profile.phone}
              onChange={handleChange}
              placeholder="Enter your phone number"
              required
            />
          </div>

          <div className="profile-field">
            <label>Customer ID</label>
            <input
              type="text"
              name="customerId"
              value={profile.customerId}
              onChange={handleChange}
              placeholder="Enter customer ID"
              required
            />
          </div>

          <div className="profile-buttons">
            <button
              type="submit"
              className="profile-save-button"
            >
              💾 Save Profile
            </button>

            <button
              type="button"
              className="profile-cancel-button"
              onClick={handleCancel}
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

export default Profile;
