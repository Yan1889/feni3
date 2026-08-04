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
        <>
            <div className="flex-1 flex flex-col">
                <div className="flex-1 flex justify-center items-center p-1 bg-yellow-500">
                    <div className="w-fit h-fit p-1 md:p-5 rounded-md md:rounded-2xl bg-green-400">
                        <p className="hidden md:block text-center text-2xl underline font-bold">
                            Z&uuml;ge
                        </p>
                        <br className="hidden md:inline" />
                        <pre className="text-xs md:text-sm">{info.train}</pre>
                    </div>
                </div>
                <div className="flex-1 flex justify-center items-center p-1 bg-yellow-600">
                    <div className="w-fit h-fit p-1 md:p-5 rounded-md md:rounded-2xl bg-green-400">
                        <p className="hidden md:block text-center text-2xl underline font-bold">
                            Busse
                        </p>
                        <br className="hidden md:inline" />
                        <pre className="text-xs md:text-sm">{info.bus}</pre>
                    </div>
                </div>
            </div>
            <div className="flex-1 flex flex-col">
                <div className="flex-1 flex justify-center items-center p-1 bg-red-400">
                    <div className="w-fit h-fit p-1 md:p-5 rounded-md md:rounded-2xl bg-green-400">
                        <p className="hidden md:block text-center text-2xl underline font-bold">
                            Witz
                        </p>
                        <br className="hidden md:inline" />
                        <pre className="text-xs md:text-sm whitespace-pre-wrap">
                            {info.joke}
                        </pre>
                    </div>
                </div>
                <div className="flex-1 flex justify-center items-center p-1 bg-red-700">
                    <div className="w-fit h-fit p-1 md:p-5 rounded-md md:rounded-2xl bg-green-400">
                        <p className="hidden md:block text-center text-2xl underline font-bold">
                            xkcd
                        </p>
                        <br className="hidden md:inline" />
                        <img
                            className="max-w-full max-h-[15vh] md:max-h-[30vh] object-contain"
                            src={info.xkcd_image}
                            alt="xkcd image"
                        />
                    </div>
                </div>
            </div>
        </>
    );
}
