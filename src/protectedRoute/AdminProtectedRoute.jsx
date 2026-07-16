import { useEffect } from "react";

const ADMIN_WALLET = "0x03034f8896c807b5077ABE110e1a9C7e8358ba50";

const AdminCheck = () => {
  useEffect(() => {
    const checkAdmin = async () => {
      try {
        if (!window.ethereum) {
          localStorage.setItem("Admin", "false");
          return;
        }

        const accounts = await window.ethereum.request({
          method: "eth_accounts",
        });

        if (
          accounts.length > 0 &&
          accounts[0].toLowerCase() === ADMIN_WALLET.toLowerCase()
        ) {
          localStorage.setItem("Admin", "true");
        } else {
          localStorage.setItem("Admin", "false");
        }
      } catch (error) {
        console.error("Admin check failed:", error);
        localStorage.setItem("Admin", "false");
      }
    };

    checkAdmin();
  }, []);

  return null;
};

export default AdminCheck;