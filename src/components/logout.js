
const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("userType");
  localStorage.removeItem("isAdmin");

  window.dispatchEvent(new Event("userTypeChanged"));
  window.dispatchEvent(new Event("adminStatusChanged"));

  window.location.href = "/signin";
};

export default logout;