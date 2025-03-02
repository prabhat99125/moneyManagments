"use client"
import React, { useState } from 'react'
import style from "../../styale/ragi.module.css"
import Link from 'next/link'
import { useForm } from 'react-hook-form';
import axios from "axios";
import Cookies from 'js-cookie'
import { useRouter } from 'next/navigation';
function Ragistar() {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const [respons, setRespons] = useState({ data: { message: "" }, status: 0 });
  const [loading, setLoading] = useState(false);
  const password = watch("password");
  const router = useRouter();
  const onsubmit = (data) => {
    console.log(data);

    setLoading(true);
    axios.post(`/api/signup`, data, { withCredentials: true })
      .then((res) => {
        setRespons(res);
        console.log(res);

        // router.push("/login");
        setLoading(false);

      }).catch((e) => {
        setRespons((prev) => ({
          data: { message: e.response?.data?.message || "Something went wrong" },
          status: 500
        }));
        setLoading(false);
      });
    const Cookie = Cookies.get("authorized");

  }
  return (<>
    <div className={`${style.contenar}`}>
      <form method='post' onSubmit={handleSubmit(onsubmit)}>
        <div className={`${style.ragiFrom}`}>
          <h1 className={style.heding}>Ragistetion Here</h1>
          <label className="input input-bordered flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-4 w-4 opacity-70">
              <path
                d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
            </svg>
            <input type="text" className="grow" name='username' placeholder="Username"
              {...register("username", { required: "Username is required", minLength: { value: 4, message: "minimum 3 characters" }, maxLength: { value: 10, message: "maximum 10 character" } })} />
          </label>
          {errors.userName && <p className='text-red-400 -mt-1 text-[14px]'>{errors.userName.message}</p>}
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
            <input type="email" className="grow" name='email' placeholder="Email"
              {...register("email", { required: "email required" })} />
          </label>
          {errors.email && <p className='text-red-400 -mt-1 text-[14px]'>{errors.email.message}</p>}
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
              {...register("password", { required: "password required", minLength: { value: 4, message: "minimum 4 character password" } })} />
          </label>
          {errors.password && <p className='text-red-400 -mt-1 text-[14px]'>{errors.password.message}</p>}

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
            <input type="password" className="grow" name='confumPassword' placeholder="Confirm Password"
              {...register("confumPassword", { required: "confirm Password required", validate: (val) => val === password || "Passwords do not match" })} />

          </label>
          {errors.confumPassword && <p className='text-red-400 -mt-1 text-[14px]'>{errors.confumPassword.message}</p>}
          <p className={`text-center ${respons.status === 201 ? "text-green-600" : respons.status === 209 ? "text-yellow-400" : "text-red-600"}`}>{respons.data.message}</p>
          <div className={style.btnControl}>
            <button className={respons.status === 201 ? "btn btn-success mb-4 mt-4 pr-12 pl-12" : respons.status === 209 ? "btn btn-warning mb-4 mt-4 pr-12 pl-12" : respons.status === 500 ? "btn btn-error mb-4 mt-4 pr-12 pl-12" : "btn btn-primary mb-4 mt-4 pr-12 pl-12"}>{loading ? <span className="loading loading-spinner text-neutral"></span> : <span></span>}Submit</button>
          </div>
          <p>Already have an account? {<Link href={"/login"} className="link link-info">sign in</Link>}</p>
        </div>
      </form >
    </div >
  </>)
}

export default Ragistar