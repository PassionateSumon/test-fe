import { useEffect, useRef, useState } from "react";
import FlimActors from "./films/FlimActors"
import FlimInfo from "./films/FlimInfo"

const tabs = ["Info", "Actor"]

const FlimModal = ({ open, id, handleClose }) => {
    const [activeTab, setActiveTab] = useState("Info");
    const ref = useRef(null)

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (ref.current && !ref.current.contains(event.target)) {
                handleClose();
            }
        }
        const timeoutId = setTimeout(() => {
            document.addEventListener("click", handleClickOutside, true);
        }, 0)
        return () => {
            clearTimeout(timeoutId);
            document.removeEventListener("click", handleClickOutside, true);
        }
    }, [open])

    const rendertabs = () => {
        switch (activeTab) {
            case "Info":
                return <FlimInfo id={id} />
            case "Actor":
                return <FlimActors id={id} />
            default:
                return <FlimInfo />
        }
    }

    console.log(id)

    if (!open) return null;
    return (
        <div className='fixed inset-0 bg-black/80 z-50 flex justify-end'>
            <div ref={ref} className='w-full max-w-md bg-white transform transition-all duration-500 translate-x-0 flex flex-col space-y-3 '>
                <div className="flex text-md mt-15 justify-evenly items-center ">
                    {
                        tabs.map(t => {
                            return (
                                <button className={`text-black cursor-pointer ${activeTab === t ? "border-b-2 border-black" : ""}`} key={t} onClick={() => setActiveTab(t)}>{t}</button>
                            )
                        })
                    }
                </div>
                <div>{rendertabs()}</div>
                <div className="flex items-center justify-center">
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer " onClick={handleClose} >Close</button>
                </div>
            </div>
        </div>
    )
}

export default FlimModal