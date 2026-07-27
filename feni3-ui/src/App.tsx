import { useEffect, useState } from "react";

export default function App() {
    const [info, setInfo] = useState({
        train: "moment...",
        bus: "moment...",
        joke: "moment...",
    });

    useEffect(() => {
        async function update() {
            const promise_mvv = fetch("https://feni.yan1.de/api/mvv");
            const promise_joke = fetch("https://feni.yan1.de/api/joke");

            const [res_mvv, res_joke] = await Promise.all([
                promise_mvv,
                promise_joke,
            ]);

            const body_mvv = await res_mvv.json();

            setInfo({
                train: body_mvv["trainInfo"],
                bus: body_mvv["busInfo"],
                joke: (await res_joke.json())["text"],
            });
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
                    <pre className="">{info.train}</pre>
                </div>
                <div className="m-5 p-5 h-fit  bg-blue-300 rounded-2xl">
                    <p className="text-center text-2xl underline font-bold">
                        Busse
                    </p>
                    <br />
                    <pre className="">{info.train}</pre>
                </div>
            </div>
            <div className="m-5 p-5 h-fit  bg-red-300 rounded-2xl">
                <p className="text-center text-2xl underline font-bold">Witz</p>
                <br />
                <pre className="">{info.joke}</pre>
            </div>
        </div>
    );
}
