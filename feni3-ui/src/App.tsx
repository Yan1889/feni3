import { useEffect, useState } from "react";

export default function App() {
    const [info, setTrainInfo] = useState(["hold on...", "hold on..."]);

    useEffect(() => {
        async function update() {
            const res = await fetch("http://localhost:8080/api/mvv");
            const body = await res.json();
            setTrainInfo([body["trainInfo"], body["busInfo"]]);
        }
        update();
        const interval = setInterval(update, 60 * 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="p-5 bg-yellow-100 w-screen h-screen flex flex-col justify-start items-center">
            <h1 className="text-6xl">Dashboard</h1>
            <div className="w-full flex flex-row justify-evenly">
                <div className="m-5 p-5 h-fit  bg-blue-300 rounded-2xl">
                    <p className="text-center text-2xl underline font-bold">
                        Z&uuml;ge
                    </p>
                    <br />
                    <pre className="">{info[0]}</pre>
                </div>
                <div className="m-5 p-5 h-fit  bg-blue-300 rounded-2xl">
                    <p className="text-center text-2xl underline font-bold">
                        Busse
                    </p>
                    <br />
                    <pre className="">{info[1]}</pre>
                </div>
            </div>
        </div>
    );
}
