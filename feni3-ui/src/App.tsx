import { useEffect, useState } from "react";

export default function App() {
    const [info, setInfo] = useState("wait...\nassd\nasd");

    useEffect(() => {
        async function updateTrains() {
            const res = await fetch("http://localhost:8080/api/train");
            const body = await res.json();
            setInfo(body["trainInfo"]);
        }
        updateTrains();
        const interval = setInterval(updateTrains, 60 * 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="p-5 bg-yellow-100 w-screen h-screen flex flex-col justify-start items-center">
            <h1 className="text-6xl">Home Dashboard</h1>
            <div className="w-full flex flex-row justify-evenly">
                <div className="m-5 p-5 h-fit  bg-blue-300">
                    <p className="text-2xl underline font-bold">Z&uuml;ge</p>
                    <br />
                    <pre className=" ">{info}</pre>
                </div>
                <div className="m-5 p-5 h-fit  bg-blue-300">
                    <p className="text-2xl underline font-bold">Busse</p>
                    <br />
                    <pre className=" ">{info}</pre>
                </div>
            </div>
        </div>
    );
}
