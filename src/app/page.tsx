"use client";
import { useEffect, useState } from "react";

const states = ["UP", "DOWN", "LEFT", "RIGHT", "SELECT"];

export default function Home() {
  const [EditMode, setEditMode] = useState(false);
  const [state, setState] = useState("NONE");
  const [linkUP, setLinkUP] = useState("https://www.youm7.com/");
  const [linkDOWN, setLinkDOWN] = useState("https://www.cairo24.com/");
  const [linkLEFT, setLinkLEFT] = useState("https://9090streaming.mobtada.com/9090FMEGYPT");
  const [linkRIGHT, setLinkRIGHT] = useState("https://www.accuweather.com/en/eg/cairo/127164/weather-forecast/127164");
  const [iframeSrc, setIframeSrc] = useState("");


  const openLink = (link: string) => {
    setIframeSrc(link);
    // setTimeout(() => {
    //   window.open(link, "_blank");
    // }, 1000);
  };

  const handleStateChange = (inputState: any) => {
    setState((prevState) => {
      // console.log("State changed from:", prevState, "->", inputState);

      if (inputState === "SELECT") {
        if (prevState === "UP") {
          console.log("UP");
          openLink(linkUP);
        }
        if (prevState === "DOWN") {
          console.log("DOWN");
          openLink(linkDOWN);
        }
        if (prevState === "LEFT") {
          console.log("LEFT");
          openLink(linkLEFT);
        }
        if (prevState === "RIGHT") {
          console.log("RIGHT");
          openLink(linkRIGHT);
        }
        setTimeout(() => {
          setState("NONE");
        }, 1000);
      }

      return inputState;
    });
  };

  const handleKeyDown = (event: any) => {
    if (event.key === "ArrowUp") {
      handleStateChange("UP");
    } else if (event.key === "ArrowDown") {
      handleStateChange("DOWN");
    } else if (event.key === "ArrowLeft") {
      handleStateChange("LEFT");
    } else if (event.key === "ArrowRight") {
      handleStateChange("RIGHT");
    } else if (event.key === "Enter") {
      handleStateChange("SELECT");
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  // Websocket
  useEffect(() => {

    const ws = new WebSocket("ws://localhost:8080");

    ws.onopen = () => {
      console.log("Connected to the WS Server");
    };

    ws.onmessage = (message) => {
      console.log("Message from server:", message.data);
      handleStateChange(message.data);
    };

    ws.onclose = () => {
      console.log("Disconnected from the WS Server");
    };

    return () => {
      ws.close();
    };
  }, []);

  return (
    <main className="flex w-screen h-screen items-center justify-center p-24 gap-[24px]">
      <div className="w-full h-full flex flex-col justify-center items-center border">
        {/* فوق */}
        <div className="flex-col w-[128px] h-[128px] flex justify-center items-center">
          <p className={`text-[64px] ${state === "UP" && "text-lime-500"}`}>
            فوق
          </p>
          {EditMode && (
            <input
              type="text"
              placeholder={linkUP}
              onChange={(e) => setLinkUP(e.target.value)}
              className=" text-black  opacity-100 focus:animate-pulse"
            />
          )}
        </div>
        <div
          className={`bg-lime-500 w-[2px] h-[128px] opacity-0 ${
            state === "UP" && "opacity-100"
          }`}
        />
        <div className="flex items-center">
          {/* شمال */}
          <div className=" flex-col w-[128px] h-[128px] flex justify-center items-center mr-[8px]">
            <p className={`text-[64px] ${state === "LEFT" && "text-lime-500"}`}>
              شمال
            </p>
            {EditMode && (
              <input
                type="text"
                placeholder={linkLEFT}
                onChange={(e) => setLinkLEFT(e.target.value)}
                className=" text-black  opacity-100 focus:animate-pulse"
              />
            )}
          </div>
          {/* Arrow Left */}
          <div
            className={`bg-lime-500 w-[128px] h-[2px] opacity-0 ${
              state === "LEFT" && "opacity-100"
            }`}
          />
          {/* اختر */}
          <div className=" w-[128px] h-[128px] flex justify-center items-center">
            <p
              className={`text-[32px] ${
                state === "SELECT" &&
                "text-lime-500 p-4 border-lime-500 border-2"
              }`}
            >
              اختر
            </p>
          </div>
          {/* Arrow Right */}
          <div
            className={`bg-lime-500 w-[128px] h-[2px] opacity-0 ${
              state === "RIGHT" && "opacity-100"
            }`}
          />
          {/* يمين */}
          <div className=" flex-col w-[128px] h-[128px] flex justify-center items-center">
            <p
              className={`text-[64px] ${state === "RIGHT" && "text-lime-500"}`}
            >
              يمين
            </p>
            {EditMode && (
              <input
                type="text"
                placeholder={linkRIGHT}
                onChange={(e) => setLinkRIGHT(e.target.value)}
                className=" text-black  opacity-100 focus:animate-pulse"
              />
            )}
          </div>
        </div>
        {/* Arrow Down */}
        <div
          className={`bg-lime-500 w-[2px] h-[128px] opacity-0 ${
            state === "DOWN" && "opacity-100"
          }`}
        />
        {/* تحت */}
        <div className=" flex-col w-[128px] h-[128px] flex justify-center items-center">
          <p className={`text-[64px] ${state === "DOWN" && "text-lime-500"}`}>
            تحت
          </p>
          {EditMode && (
            <input
              type="text"
              placeholder={linkDOWN}
              onChange={(e) => setLinkDOWN(e.target.value)}
              className=" text-black  opacity-100 focus:animate-pulse"
            />
          )}
        </div>
        <button
          onClick={() => setEditMode(!EditMode)}
          className=" absolute left-8 top-8 text-white p-2 mt-4 hover:opacity-50"
        >
          {EditMode ? "Save" : "Edit"}
        </button>
      </div>
      <iframe src={iframeSrc} className=" border w-full h-full" />
    </main>
  );
}
