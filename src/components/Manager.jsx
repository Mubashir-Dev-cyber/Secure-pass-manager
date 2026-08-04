import React from 'react'
import { useRef, useState, useEffect } from 'react'

import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { v4 as uuidv4 } from 'uuid';

const Manager = () => {
    const ref = useRef()
    const passwordRef = useRef()
    const [form, setform] = useState({ site: "", username: "", password: "" })
    const [passwordArray, setpasswordArray] = useState([])

    useEffect(() => {
        const passwords = localStorage.getItem("passwords")

        if (!passwords) return

        try {
            const parsedPasswords = JSON.parse(passwords)
            setpasswordArray(Array.isArray(parsedPasswords) ? parsedPasswords : [])
        } catch {
            localStorage.removeItem("passwords")
            setpasswordArray([])
        }
    }, [])

    const copyText = async (text) => {
        try {
            await navigator.clipboard.writeText(text)
            toast('Copied to clipboard!', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progressClassName: 'rainbow-progress-bar',
                style: {
                    background: 'linear-gradient(135deg, #1f2937, #111827)',
                    color: '#f9fafb',
                },
                icon: () => <span style={{ color: '#4cd964', fontSize: '18px', fontWeight: '700' }}>✓</span>,
                theme: "dark",
            });
        } catch {
            toast.error('Failed to copy to clipboard.', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        }
    }

    const showPassword = () => {
        passwordRef.current.type = "text"
        console.log(ref.current.src)
        if (ref.current.src.includes("icons/eyecross.png")) {
            ref.current.src = "icons/eye.png"
            passwordRef.current.type = "password"
        }
        else {
            ref.current.src = "icons/eyecross.png"
            passwordRef.current.type = "text"
        }
    }

    const savePassword = () => {
        if (form.site.length > 3 && form.username.length > 3 && form.password.length > 3) {
            const newPassword = { ...form, id: uuidv4() }
            const updatedPasswords = [...passwordArray, newPassword]
            setpasswordArray(updatedPasswords)
            localStorage.setItem("passwords", JSON.stringify(updatedPasswords))
            setform({ site: "", username: "", password: "" })
            toast.success("Password saved!", {
                position: "top-right",
                autoClose: 3000,
                theme: "dark",
            })
        } else {
            toast("Error: Password not saved!", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progressClassName: 'error-progress-bar',
                style: {
                    background: 'linear-gradient(135deg, #1f2937, #111827)',
                    color: '#f9fafb',
                },
                icon: () => <span style={{ color: '#ff4d4f', fontSize: '18px', fontWeight: '700' }}>✕</span>,
                theme: "dark",
            })
        }
    }

    const deletePassword = (id) => {
        let c = confirm("Do you really want to delete this pasword?")
        if (c) {
            const updatedPasswords = passwordArray.filter(item => item.id !== id)
            setpasswordArray(updatedPasswords)
            localStorage.setItem("passwords", JSON.stringify(updatedPasswords))
            toast.success("Password Deleted!", {
                position: "top-right",
                autoClose: 3000,
                theme: "dark",
            })
        }
    }

    const editPassword = (id) => {
        console.log("Editing password with id", id)
        setform(passwordArray.filter(i => i.id === id)[0])
        setpasswordArray(passwordArray.filter(item => item.id !== id))

    }

    const handleChange = (e) => {
        setform({ ...form, [e.target.name]: e.target.value })
    }

    return (
        <>
            <style>{`
                .rainbow-progress-bar {
                    background: linear-gradient(90deg, #ff4d4f 0%, #ff7a00 20%, #ffd54f 40%, #4cd964 60%, #4fc3f7 80%, #8b5cf6 100%) !important;
                }

                .error-progress-bar {
                    background: linear-gradient(90deg, #ff4d4f, #ff7a00) !important;
                }
            `}</style>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                transition={Bounce}
            />
            <div className="relative flex-1 w-full bg-[#e3f0e7] bg-[linear-gradient(to_right,#80808014_1px,transparent_1px),linear-gradient(to_bottom,#80808014_1px,transparent_1px)] bg-size-[14px_24px]">
                <div className="relative min-h-full w-full">
                    <div className="pointer-events-none absolute left-0 top-0 -z-10 m-auto h-77.5 w-77.5 rounded-full bg-fuchsia-400 opacity-10 blur-[100px]"></div>

                    <div className="relative z-10  md:mycontainer p-2 md:px-40">
                        <h1 className='text-4xl font-bold text-center'>
                            <span className='text-green-500'> &lt;</span>
                            <span>Pass</span>
                            <span className='text-green-500'>OP/&gt;</span>
                        </h1>
                        <p className='text-green-900 text-lg text-center '>Your own Password Manager</p>
                        <div className=" flex flex-col p-4 text-black gap-8 items-center">
                            <input value={form.site} onChange={handleChange} className='rounded-full  border border-green-500 w-full text-black p-4 py-1' type="text" name="site" placeholder="Enter Website URL" id='site' />
                            <div className='flex flex-col md:flex-row w-full gap-8'>
                                <input value={form.username} onChange={handleChange} className='flex-1 min-w-0 rounded-full border border-green-500 text-black p-4 py-1' type="text" name="username" placeholder="Enter Username" id='username' />

                                <div className="relative flex-1 min-w-0">
                                    <input ref={passwordRef} value={form.password} onChange={handleChange} className='password-input rounded-full border border-green-500 w-full text-black p-4 py-1 pr-10' type="password" name="password" placeholder="Enter Password" id='password' />
                                    <span className="absolute right-2 inset-y-0 flex items-center cursor-pointer" onClick={showPassword}>
                                        <img ref={ref} className='p-1' width={26} src="icons/eye.png" alt="eye" />
                                    </span>
                                </div>

                            </div>
                            <button onClick={savePassword} className='flex justify-center items-center bg-green-400 px-4 py-2 rounded-full w-fit hover:bg-green-300 cursor-pointer gap-2 border border-green-900 '>
                                <lord-icon
                                    src="https://cdn.lordicon.com/efxgwrkc.json"
                                    trigger="hover"
                                >
                                </lord-icon>
                                Save</button>
                        </div>


                        <div className="passwords">
                            <h2 className='text-2xl font-bold py-4'>Your Passwords</h2>
                            {passwordArray.length === 0 && <div>No passwords to show</div>}
                            {passwordArray.length !== 0 &&
                                <table className="table-fixed w-full rounded-md overflow-hidden mb-3">
                                    <thead className='bg-green-800 text-white'>
                                        <tr>
                                            <th className='w-[40%] py-2'>Site</th>
                                            <th className='w-[20%] py-2'>Username</th>
                                            <th className='w-[25%] py-2'>Password</th>
                                            <th className='w-[15%] py-2'>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className='bg-green-100'>
                                        {passwordArray.map((item, index) => {
                                            return <tr key={index}>
                                                <td className='text-center py-2 border border-white'>
                                                    <div className='flex min-w-0 items-center justify-center gap-1'>
                                                        <a className='break-all' href={item.site} target='_blank'>{item.site}</a>
                                                        <div className='lordIconCopy size-7 cursor-pointer' onClick={() => copyText(item.site)}>
                                                            <span title='copy'>
                                                                <lord-icon className={"cursor-pointer w-5"}
                                                                    style={{ " width": "25px", "height": "25px", "paddingTop": "3px", "paddingLeft": "3px" }}
                                                                    src="https://cdn.lordicon.com/xuoapdes.json"
                                                                    trigger="hover">

                                                                </lord-icon>
                                                            </span>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className='text-center py-2 border border-white'>
                                                    <div className='flex items-center justify-center gap-1'>
                                                        <span>{item.username}</span>
                                                        <div className='lordIconCopy size-7 cursor-pointer' onClick={() => copyText(item.username)}>
                                                            <span title='copy'>
                                                                <lord-icon className={"cursor-pointer w-5"}
                                                                    style={{ " width": "25px", "height": "25px", "paddingTop": "3px", "paddingLeft": "3px" }}
                                                                    src="https://cdn.lordicon.com/xuoapdes.json"
                                                                    trigger="hover">

                                                                </lord-icon>
                                                            </span>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className='text-center py-2 border border-white'>
                                                    <div className='flex items-center justify-center gap-1'>
                                                        <span className='break-all'>{"*".repeat(item.password.length)}</span>
                                                        <div className='lordIconCopy size-7 cursor-pointer' onClick={() => copyText(item.password)}>
                                                            <span title='copy'>
                                                                <lord-icon className={"cursor-pointer w-5"}
                                                                    style={{ " width": "25px", "height": "25px", "paddingTop": "3px", "paddingLeft": "3px" }}
                                                                    src="https://cdn.lordicon.com/xuoapdes.json"
                                                                    trigger="hover">

                                                                </lord-icon>
                                                            </span>
                                                        </div>
                                                    </div>
                                                </td>


                                                <td className='text-center py-2 border border-white'>
                                                    <div className='flex items-center justify-center gap-3 cursor-pointer'>
                                                        <span className='cursor-pointer' title='edit' onClick={() => editPassword(item.id)}>
                                                            <lord-icon
                                                                src="https://cdn.lordicon.com/gwlusjdu.json"
                                                                trigger="hover"
                                                                style={{ width: "25px", height: "25px" }}
                                                            >
                                                            </lord-icon>
                                                        </span>
                                                        <span className='cursor-pointer' title='delete' onClick={() => deletePassword(item.id)}>
                                                            <lord-icon
                                                                src="https://cdn.lordicon.com/xyfswyxf.json"
                                                                trigger="hover"
                                                                style={{ width: "25px", height: "25px" }}
                                                            >
                                                            </lord-icon>
                                                        </span>
                                                    </div>
                                                </td>
                                            </tr>
                                        })}

                                    </tbody>
                                </table>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Manager
