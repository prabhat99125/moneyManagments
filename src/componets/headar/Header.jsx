"use client";
import Link from "next/link";
import style from "@/styale/header.module.css"
import CloseBtn from "./CloseBtn/CloseBtn";
export const Navbar = () => {


  return (<>
    <header>
      <nav className={`${style.navBar}`}>
        <CloseBtn />
        <div className={`${style.logo}`}>Money Management</div>
        <div className={style.navValue}>
          <ul className="flex gap-2">
            <Link href={"/"}><li className={style.value}>Home</li></Link>
            <Link href={"/login"}><li className={style.value}>Login</li></Link>
            <Link href={"/ragistar"}><li className={style.value}>Ragistor</li></Link>
          </ul>
        </div>
      </nav>
    </header>
  </>);
};
