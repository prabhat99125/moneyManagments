import React from 'react'
import style from "../../styale/drawer.module.css"
import Link from 'next/link'
function Drawer() {
    return (
        <div className={style.mngDrawer}>
            <div className={style.drawer}>
                <ul className={style.drawerList}>
                    <Link href={"/"}><li className={style.value}>Home</li></Link>
                    <Link href={"/login"}><li className={style.value}>Login</li></Link>
                    <Link href={"/ragistar"}><li className={style.value}>Ragistor</li></Link>
                </ul>
            </div>
        </div>
    )
}

export default Drawer