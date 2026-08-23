import { useEffect } from "react";

const ADMIN_WALLET = "0x03034f8896c807b5077ABE110e1a9C7e8358ba50";

const AdminCheck = () => {
  useEffect(() => {
    if (!window.ethereum) {
      localStorage.setItem("isAdmin", "false");
      return;
    }

    const checkAdmin = (accounts) => {
      try {
        const account = accounts?.[0]?.toLowerCase();
        const userType = localStorage.getItem("userType");

        const isAdmin =
          userType === "organization" && account === ADMIN_WALLET.toLowerCase();

        localStorage.setItem("isAdmin", String(isAdmin));

        window.dispatchEvent(new Event("adminStatusChanged"));
      } catch (error) {
        console.error("Admin check failed:", error);
        localStorage.setItem("isAdmin", "false");
      }
    };

    const initializeAdmin = async () => {
      try {
        const accounts = await window.ethereum.request({
          method: "eth_accounts",
        });

        checkAdmin(accounts);
      } catch (error) {
        console.error("Admin check failed:", error);
        localStorage.setItem("isAdmin", "false");
      }
    };

    initializeAdmin();

    window.ethereum.on("accountsChanged", checkAdmin);

    return () => {
      window.ethereum.removeListener("accountsChanged", checkAdmin);
    };
  }, []);

  return null;
};

export default AdminCheck;
