'use client';

import React, { useState, useEffect } from 'react';
import styles from '@/app/page.module.css';
import Modal from './home/AddData';
import { MdEdit } from "react-icons/md";

export default function HomePage() {
    // State to hold the creditors data, loading status, and error messages
    const [creditorsData, setCreditorsData] = useState([]);
    const [debtorsData, setDeptorsData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [creditor, setCreditors] = useState(0);
    const [deptors, setDeptors] = useState(0);

    useEffect(() => {
        let isCreditors = true; // Flag to prevent state update if the component is unmounted
        async function fetchCreditors() {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_servarURL}/creditors`, {
                    method: 'GET',
                    credentials: 'include', // Include cookies in the request
                });
                console.log(response);

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                console.log(data);

                if (isCreditors) {
                    setCreditorsData(data);
                    setLoading(false);
                    data.user.map((val, idx) => {
                        setCreditors((prw) => prw + Number(val.Payment))
                    })
                }
            } catch (err) {
                console.log(err);

                if (isCreditors) {
                    setError(err);
                    setLoading(false);
                }
            }
        }
        fetchCreditors();

        let isDeptors = true; // Flag to prevent state update if the component is unmounted
        async function fetchDeptors() {


            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_servarURL}/debtors`, {
                    method: 'GET',
                    credentials: 'include', // Include cookies in the request
                });
                console.log(response);

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();

                if (isDeptors) {
                    setDeptorsData(data);
                    setLoading(false);
                    data.user.map((val, idx) => {
                        setDeptors((prw) => prw + Number(val.Payment))
                    })
                }
            } catch (err) {
                console.log(err)
                if (isDeptors) {
                    setError(err);
                    setLoading(false);
                }
            }
        }
        fetchDeptors();
    }, []);
    if (loading) return <div className="h-full w-full flex justify-center items-center"><span className="loading loading-spinner text-neutral"></span></div>;
    if (error) return <div>Error loading data</div>;

    return (
        <div className={`${styles.manageLeyout} mr-2 ml-2`}>
            <div className={`${styles.stats}`}>
                <div className={`${styles.stat}`}>
                    <div className={`${styles.statTitle}`}>Creditors</div>
                    <div className={`${styles.statValue}`}>{creditor}</div>
                    <div className={`${styles.statVdesc}`}>ઉધાર પૈસા આપે છે</div>
                </div>
                <div className={`${styles.stat}`}>
                    <div className={`${styles.statTitle}`}>Debtors</div>
                    <div className={`${styles.statValue}`}>{deptors}</div>
                    <div className={`${styles.statVdesc}`}>ઉધાર પૈસા લે છે</div>
                </div>
                <div className={`${styles.stat}`}>
                    <div className={`${styles.statTitle}`}>{creditor > deptors ? "Profit" : "Loss"}</div>
                    <div className={`${styles.statValue}`}>{creditor - deptors}</div>
                    <div className={`${styles.statVdesc}`}>21% more than last month</div>
                </div>

                <div className={`${styles.stat}`}>
                    <div className={`${styles.statTitle}`}>Last Month</div>
                    <div className={`${styles.statValue}`}>0</div>
                    <div className={`${styles.statVdesc}`}>21% more than last month</div>
                </div>
                <div className={`${styles.stat}`}>
                    <div className={`${styles.statTitle}`}>2025</div>
                    <div className={`${styles.statValue}`}>0</div>
                    <div className={`${styles.statVdesc}`}>21% more than last month</div>
                </div>
                <div className={`${styles.stat}`}>
                    <div className={`${styles.statTitle}`}>2024</div>
                    <div className={`${styles.statValue}`}>0</div>
                    <div className={`${styles.statVdesc}`}>21% more than last month</div>
                </div>
            </div>
            <div className="overflow-x-auto">
                <Modal />
                <div role="tablist" className="tabs tabs-lifted">
                    <input
                        type="radio"
                        name="my_tabs_2"
                        role="tab"
                        className="tab"
                        aria-label="creditors"
                        defaultChecked
                    />
                    <div
                        role="tabpanel"
                        className="tab-content bg-base-100 border-base-300 rounded-box p-6"
                    >
                        <table className="table bg-slate-800">
                            <thead>
                                <tr>
                                    <th>No</th>
                                    <th>Price</th>
                                    <th>Name</th>
                                    <th>Village</th>
                                    <th>Edit</th>
                                </tr>
                            </thead>
                            <tbody>
                                {Array.isArray(creditorsData.user) && creditorsData.user.length > 0 ? (
                                    creditorsData.user.map((val, idx) => (
                                        <tr key={idx}>
                                            <th>{idx + 1}</th>
                                            <td>{val.Payment}</td>
                                            <td>{val.Name}</td>
                                            <td>{val.Village}</td>
                                            <td><MdEdit /></td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="4">No creditor data available.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    <input
                        type="radio"
                        name="my_tabs_2"
                        role="tab"
                        className="tab"
                        aria-label="debtors"

                    />
                    <div
                        role="tabpanel"
                        className="tab-content bg-base-100 border-base-300 rounded-box p-6"
                    >
                        <table className="table bg-slate-800">
                            <thead>
                                <tr>
                                    <th>No</th>
                                    <th>Price</th>
                                    <th>Name</th>
                                    <th>Village</th>
                                </tr>
                            </thead>
                            <tbody>
                                {Array.isArray(debtorsData.user) && debtorsData.user.length > 0 ? (
                                    debtorsData.user.map((val, idx) => (
                                        <tr key={idx}>
                                            <th>{idx + 1}</th>
                                            <td>{val.Payment}</td>
                                            <td>{val.Name}</td>
                                            <td>{val.Village}</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="4">No creditor data available.</td>
                                    </tr>
                                )}

                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
