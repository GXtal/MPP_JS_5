import React from 'react';
import { AuthContext } from "../contexts/AuthContext";
import { useContext, useEffect, useState } from "react";


function Home() {


    const { user } = useContext(AuthContext)

    
    return (
        <div className="d-flex flex-wrap justify-content-center ">
            <span className="py-5 w-100 text-center mx-4">
                <h1 className="">
                    Welcome to <span className="text-primary">Arknights Manager</span>
                </h1>
                <h3>
                    i dunno why are here lol
                </h3>
            </span>
        </div>
    );
}


export default Home;