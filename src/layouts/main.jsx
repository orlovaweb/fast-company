import React from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Main = () => {
    const notify = () => toast("Wow so easy!");
    return (
        <>
            <h2>Main</h2>
            <button onClick={notify}>Notify!</button>
        </>
    );
};

export default Main;
