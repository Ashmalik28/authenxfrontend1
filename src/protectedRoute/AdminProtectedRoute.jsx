import { useState , useEffect } from "react"
import {createReadOnlyContract } from '../context/TransactionContext'

const AdminCheck = () => {
    
    useEffect(() => {
        const checkAdmin = async () => {
            try {
                const contract = await createReadOnlyContract();
                const owner = await contract.owner();
                const accounts = await window.ethereum.request({method : "eth_accounts"});

                if(accounts.length > 0 && typeof owner === "string" && accounts[0].toLowerCase() === owner.toLowerCase()){
                    localStorage.setItem("Admin" , true );
                }else {
                    localStorage.setItem("Admin" , false);
                }
            } catch (error){
                console.log("Admin check failed: " , error);
                localStorage.setItem("Admin" , false);
                
            }
        }
        checkAdmin();
    }, []);
}

export default AdminCheck;