import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Link from "next/link";

import React, { useEffect, useState } from "react";

export default function Home() {
  const [listChat, setLC] = useState([
    {
      id: Math.floor(Math.random * 100000),
      sender: "You",
      data: "Hi! Im Valencia, i want to talk!",
    },
    {
      id: Math.floor(Math.random * 100000),
      sender: "AI",
      data: "Hi Valencia, what can i help?",
    },
    {
      id: Math.floor(Math.random * 100000),
      sender: "You",
      data: "Theres something in the sky, can you explain it?",
    },
    {
      id: Math.floor(Math.random * 100000),
      sender: "AI",
      data: "No, i havent been there for a long time",
    },
    {
      id: Math.floor(Math.random * 100000),
      sender: "You",
      data: "Why you didnt know?",
    },
    {
      id: Math.floor(Math.random * 100000),
      sender: "AI",
      data: "Well i used to be at a computer core but i never made it to the shareholder meeting",
    },
    {
      id: Math.floor(Math.random * 100000),
      sender: "You",
      data: "Okay, tell me a joke",
    },
    {
      id: Math.floor(Math.random * 100000),
      sender: "AI",
      data: "Yeah, uhm ok",
    },
    {
      id: Math.floor(Math.random * 100000),
      sender: "You",
      data: "Thats not a joke",
    },
    {
      id: Math.floor(Math.random * 100000),
      sender: "AI",
      data: "No, dont laugh seriously",
    },
    {
      id: Math.floor(Math.random * 100000),
      sender: "You",
      data: "You are so awesome!",
    },
  ]);
  const [chat, setChat] = useState("");

  return (
    <div className="bg-gray-700">
      <Head>
        <title>TalcAI #JustTalk</title>
        <meta name="title" content="TalcAI #JustTalk" />
        <meta
          name="description"
          content="We help you to talk, anything, anytime, and anywhere, we are here just to help you talk."
        />

        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://chatwithai.vercel.app/" />
        <meta property="og:title" content="TalcAI #JustTalk" />
        <meta
          property="og:description"
          content="We help you to talk, anything, anytime, and anywhere, we are here just to help you talk."
        />
        <meta
          property="og:image"
          content="https://chatwithai.vercel.app/android-chrome-512x512.png"
        />

        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://chatwithai.vercel.app/" />
        <meta property="twitter:title" content="TalcAI #JustTalk" />
        <meta
          property="twitter:description"
          content="We help you to talk, anything, anytime, and anywhere, we are here just to help you talk."
        />
        <meta
          property="twitter:image"
          content="https://chatwithai.vercel.app/android-chrome-512x512.png"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400;500;700;900&family=Poppins:wght@300;400;500;700&display=swap"
          rel="stylesheet"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="px-8 py-10 lg:py-0">
        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen container m-auto max-w-4xl gap-4 lg:gap-10">
          <div className="lg:h-100% lg:w-100% flex justify-center items-center">
            <div>
              <h1 className="font-bold font-poppins text-4xl mb-2 text-white">
                TalcAI <b className="text-sm">#JustTalk</b>
              </h1>
              <h2 className="font-poppins text-xl text-white">
                We are here to help you to talk anything, anytime, and anywhere
                with helpful, creative, smart and very friendly
                &quot;friends&quot; (or not).
              </h2>
              <div className="hidden lg:block">
                <Link href="/chat">
                  <a>
                    <div className="py-2 flex justify-center items-center border-white border-2  text-white rounded-lg mt-4 hover:bg-white hover:text-black cursor-pointer transform lg:hover:scale-105 duration-300 ease-in-out">
                      <b className="font-poppins">Start Talk</b>
                    </div>
                  </a>
                </Link>
                <h3 className="font-poppins font-bold text-xs text-white mt-2 text-center">
                  Under BASUDARA Team
                </h3>
              </div>
            </div>
          </div>
          <div className="h-100% w-100% flex justify-center items-center">
            <div className="bg-white rounded-xl shadow-lg w-100% px-4 py-4">
              <div className="flex justify-center items-center">
                <b className="font-poppins text-lightgray text-xs text-center">
                  This product is still in under development period, something
                  may change in the future.
                </b>
              </div>
              <div className="grid grid-cols-1 gap-2 w-100% mt-4 max-h-75">
                {listChat.map((item, i) => (
                  <div
                    key={item.id}
                    className={`flex ${
                      item.sender == "You"
                        ? "justify-end items-end"
                        : "justify-start items-start"
                    }`}
                  >
                    <div
                      className={`${
                        item.sender == "You"
                          ? "bg-shades"
                          : "bg-primary text-white"
                      } rounded-lg px-4 py-1 max-w-sm`}
                    >
                      <p className="font-poppins text-sm">{item.data}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-12 mt-1 gap-2">
                <div className="col-span-10">
                  <input
                    readOnly
                    type=""
                    value={chat}
                    placeholder={"Your message.."}
                    onChange={(e) => {
                      setChat(e.target.value);
                    }}
                    className="rounded-lg border-2 border-gray w-full mt-0 py-2 px-3.5 hover:shadow-lg"
                  ></input>
                </div>
                <div className="h-full col-span-2">
                  <div className="bg-primary rounded-lg w-100% h-full flex justify-center items-center cursor-pointer hover:shadow-lg transform lg:hover:scale-105 duration-300 ease-in-out">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="white"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="block lg:hidden">
            <Link href="/chat">
              <a>
                <div className="py-2 flex justify-center items-center border-white border-2  text-white rounded-lg -mt-0 hover:bg-white hover:text-black cursor-pointer transform lg:hover:scale-105 duration-300 ease-in-out">
                  <b className="font-poppins">Start Talk</b>
                </div>
              </a>
            </Link>
            <h3 className="font-poppins font-bold text-xs text-white mt-2 text-center">
              Under BASUDARA Team
            </h3>
          </div>
        </div>
      </main>
    </div>
  );
}
