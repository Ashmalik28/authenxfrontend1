import { useEffect } from "react";

const ADMIN_WALLET = "0x03034f8896c807b5077ABE110e1a9C7e8358ba50";

const AdminCheck = () => {
  useEffect(() => {
    if (!window.ethereum) {
      return;
    }

    const checkAdmin = (accounts) => {
      try {
        if (
          accounts.length > 0 &&
          accounts[0].toLowerCase() === ADMIN_WALLET.toLowerCase()
        ) {
          localStorage.setItem("userType", "admin");
        } else {
          if (localStorage.getItem("userType") === "admin") {
            localStorage.setItem("userType", "");
          }
        }

        window.dispatchEvent(new Event("userTypeChanged"));
      } catch (error) {
        console.error("Admin check failed:", error);
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