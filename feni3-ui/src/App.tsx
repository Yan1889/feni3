import { useEffect, useState } from "react";

import image404 from "./assets/image404.png";

export default function App() {
    const [info, setInfo] = useState({
        train: "moment...",
        bus: "moment...",
        joke: "moment...",
        xkcd_image: image404,
    });

    useEffect(() => {
        async function update() {
            const responses = await Promise.all([
                fetch("/api/mvv"),
                fetch("/api/xkcd"),
                fetch("https://witzapi.de/api/joke"),
            ]);

            const [mvv, xkcd, joke] = await Promise.all(
                responses.map((r) => r.json()),
            );

            setInfo({
                train: mvv["trainInfo"],
                bus: mvv["busInfo"],
                joke: joke[0]["text"],
                xkcd_image: xkcd["img"],
            });
        }
        update();
        const interval = setInterval(update, 60 * 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="p-5 bg-yellow-100 w-screen h-full flex flex-row justify-around items-center">
            <div className="h-full flex flex-col justify-around">
                <div className="m-5 p-5 h-fit bg-blue-300 rounded-2xl">
                    <p className="text-center text-2xl underline font-bold">
                        Z&uuml;ge
                    </p>
                    <br />
                    <pre className="">{info.train}</pre>
                </div>
                <div className="m-5 p-5 h-fit bg-blue-300 rounded-2xl">
                    <p className="text-center text-2xl underline font-bold">
                        Busse
                    </p>
                    <br />
                    <pre className="">{info.bus}</pre>
                </div>
            </div>
            <div className="h-full flex flex-col justify-around items-center">
                <div className="m-5 p-5 h-fit bg-red-300 rounded-2xl">
                    <p className="text-center text-2xl underline font-bold">
                        Witz
                    </p>
                    <br />
                    <pre className="whitespace-pre-wrap">{info.joke}</pre>
                </div>
                <div className="m-5 p-5 h-1/2 w-fit bg-orange-300 rounded-2xl">
                    <p className="text-center text-2xl underline font-bold">
                        xkcd
                    </p>
                    <br />
                    <img
                        className="h-3/4"
                        src={info.xkcd_image}
                        alt="xkcd image"
                    />
                </div>
            </div>
        </div>
    );
}
