"use client"
import { useRef, useState } from "react";
import style from "../../../styale/addData.module.css"
import { MdOutlineAdd } from "react-icons/md";
import { useForm } from 'react-hook-form';
import axios from "axios";

export default function Modal() {
    const { register, handleSubmit, reset, watch, formState: { errors } } = useForm();
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState(0);
    const modalRef = useRef(null);

    const openModal = () => {
        if (modalRef.current) {
            modalRef.current.showModal();
        }
    };
    const onsubmit = (data) => {
        console.log(data);

        setLoading(true);
        axios.post(`/api/${data.sundry === 'debtors' ? 'debtor' : 'creditor'}`, data)
            .then((res) => {
                console.log(res);

                setStatus(res.status)
                setTimeout(() => { setStatus(0); reset(); }, 2000);

            })
            .catch((e) => { })
            .finally(() => setLoading(false))
    }
    return (
        <div className="w-full border-1 flex justify-center mt-3 mb-3">
            <button className="btn text-4xl bg-gray-600 text-blue-500" onClick={openModal}><MdOutlineAdd /></button>
            <dialog ref={modalRef} className="modal">
                <div className="modal-box justify-center flex">
                    <form method="dialog">
                        {/* Close button inside the form automatically closes the modal */}
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 text-2xl">✕</button>
                    </form>
                    <form method='post' onSubmit={handleSubmit(onsubmit)}>
                        <div className={style.addName}>
                            <input
                                type="number"
                                placeholder="Payment"
                                name="amount"
                                className="input input-bordered input-info w-full max-w-xs"
                                {...register("amount")} />
                            <input
                                type="text"
                                placeholder="Name"
                                name="name"
                                className="input input-bordered input-success w-full max-w-xs"
                                {...register("name")} />
                            <input
                                type="text"
                                placeholder="Village"
                                name="village"
                                className="input input-bordere
                            d input-primary w-full max-w-xs"
                                {...register("village")} />

                            <input
                                type="date"
                                onChange={((e) => setDate(e.target.value))}

                                name="date"
                                className="input input-bordered input-secondary w-full max-w-xs"
                                {...register("date", { required: "Date is required" })}
                                defaultValue={new Date().toISOString().split("T")[0]} />

                            <div className="flex justify-evenly">
                                <label className="label gap-2  cursor-pointer" style={{ justifyContent: "start" }}>
                                    <input type="radio" name="sundry" value="creditors" className="radio h-5 w-5"
                                        {...register("sundry")} />
                                    <span className="label-text">creditors</span>
                                </label>
                                <label className="label gap-2 cursor-pointer " style={{ justifyContent: "start" }}>
                                    <input type="radio" name="sundry" value="debtors" className="radio h-5 w-5"
                                        {...register("sundry")} />
                                    <span className="label-text">debtors</span>
                                </label>
                            </div>
                            <button className={status === 200 ? "btn btn-success" : `btn btn-info max-w-xs `} >
                                {loading ? <span className="loading loading-spinner text-neutral"></span> : <span></span>} {status === 200 ? "Success" : "Add"}</button>
                        </div>
                    </form>

                </div>
            </dialog>
        </div>
    );
}
