"use client"
import React, { useEffect, useState } from 'react'
import style from '@/styale/closeBtn.module.css'
import { FiMenu } from "react-icons/fi";
import { Flamenco } from 'next/font/google';
import Drawer from '../Drawer';
import { IoClose } from "react-icons/io5";

function CloseBtn() {
    const [iscolse, setIsCose] = useState(false);
    useEffect(() => {
        if (iscolse === true) {
            const body = document.querySelector("#blure");
            body.addEventListener("click", () => {
                setIsCose(false);
            });
        }
    }, [iscolse])
    return (<>
        {iscolse ? <IoClose className={`${style.fiMenu}`} onClick={() => { setIsCose(false) }} /> : <FiMenu className={`${style.fiMenu}`} onClick={() => setIsCose((prew) => !prew)} />}

        {iscolse ? <Drawer /> : ""}
    </>)
}

export default CloseBtn