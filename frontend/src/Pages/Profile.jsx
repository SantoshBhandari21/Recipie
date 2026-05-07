import React, { useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Profile = () => {
  const { currentUser, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  if (!currentUser) {
    return (
      <div style={{ maxWidth: "600px", margin: "50px auto", textAlign: "center", padding: "20px" }}>
        <h2 style={{ fontSize: "24px", fontWeight: "bold", color: "#555", marginBottom: "20px" }}>
          Please login to view your profile
        </h2>
        <Link
          to="/signin"
          style={{
            display: "inline-block",
            backgroundColor: "#ff9800",
            color: "white",
            padding: "10px 20px",
            borderRadius: "5px",
            textDecoration: "none",
            cursor: "pointer"
          }}
        >
          Go to Login
        </Link>
      </div>
    );
  }

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  return (
    <div style={{ maxWidth: "600px", margin: "30px auto", padding: "20px" }}>
      <div style={{
        backgroundColor: "white",
        boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
        borderRadius: "8px",
        padding: "30px",
        textAlign: "center"
      }}>
        <div style={{ marginBottom: "30px" }}>
          <img
            src={currentUser.avatar || "https://via.placeholder.com/128"}
            alt={currentUser.username}
            style={{
              width: "120px",
              height: "120px",
              borderRadius: "50%",
              objectFit: "cover",
              border: "4px solid #ff9800",
              marginBottom: "15px"
            }}
          />
          <h1 style={{ fontSize: "32px", fontWeight: "bold", color: "#333" }}>
            {currentUser.username}
          </h1>
        </div>

        <div style={{ marginBottom: "30px", borderTop: "1px solid #ddd", paddingTop: "15px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", padding: "15px 0", borderBottom: "1px solid #eee" }}>
            <span style={{ color: "#666", fontWeight: "bold" }}>Email:</span>
            <span style={{ color: "#333" }}>{currentUser.email}</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", padding: "15px 0", borderBottom: "1px solid #eee" }}>
            <span style={{ color: "#666", fontWeight: "bold" }}>User ID:</span>
            <span style={{ color: "#333", fontSize: "12px" }}>{currentUser._id}</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", padding: "15px 0" }}>
            <span style={{ color: "#666", fontWeight: "bold" }}>Member Since:</span>
            <span style={{ color: "#333" }}>
              {new Date(currentUser.createdAt).toLocaleDateString()}
            </span>
          </div>
        </div>

        <div style={{ display: "flex", gap: "10px", justifyContent: "center" }}>
          <Link
            to="/edit-profile"
            style={{
              backgroundColor: "#2196F3",
              color: "white",
              padding: "10px 20px",
              borderRadius: "5px",
              textDecoration: "none",
              cursor: "pointer",
              border: "none"
            }}
          >
            Edit Profile
          </Link>
          <button
            onClick={handleLogout}
            style={{
              backgroundColor: "#f44336",
              color: "white",
              padding: "10px 20px",
              borderRadius: "5px",
              cursor: "pointer",
              border: "none"
            }}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
