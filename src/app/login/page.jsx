"use client"
import React, { useState } from 'react'
import style from "@/styale/ragi.module.css"
import Link from 'next/link'
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useRouter } from "next/navigation"

function Ragistar() {
  console.log(process.env.NEXT_PUBLIC_servarURL);

  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const onsubmit = (data) => {
    setLoading(true)
    axios.post(`https://momey-managments.onrender.com/login`, JSON.stringify(data), {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    })
      .then((res) => {
        console.log(res);

        if (res.status === 200) {
          // router.push("/");
        }
        setLoading(false)
      })
      .catch((e) => {
        console.log(e);

        setLoading(false);
      })
  }
  return (<>
    <div className={`${style.contenar}`}>
      <form method='post' onSubmit={handleSubmit(onsubmit)}>
        <div className={`${style.ragiFrom}`}>
          <h1 className={style.heding}>Login Here</h1>

          <label className="input input-bordered flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-4 w-4 opacity-70">
              <path
                d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
              <path
                d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
            </svg>
            <input type="text" className="grow" name='email' placeholder="Email"
              {...register("email")} />
          </label>

          <label className="input input-bordered flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-4 w-4 opacity-70">
              <path
                fillRule="evenodd"
                d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                clipRule="evenodd" />
            </svg>
            <input type="password" className="grow" name='password' placeholder="Password"
              {...register("password")} />
          </label>

          <div className={style.btnControl}>
            <button className=" btn btn-primary mb-4 mt-4 pr-12 pl-12"> {loading ? <span className="loading loading-spinner text-neutral"></span> : <span></span>} Submit</button>
          </div>

          <p>Don't have an account? {<Link href={"/ragistar"} className="link link-info">sign up</Link>}</p>
          <p style={{ textAlign: "end", fontSize: "15px" }}>
            {<Link href={"login/forgotPassword"} className='link link-warning'>
              Forgot Password</Link>}
          </p>
        </div>
      </form>
    </div>
  </>)
}

export default Ragistar