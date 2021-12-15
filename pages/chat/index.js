import Head from "next/head";
import Image from "next/image";
import React, { useEffect, useState, useRef } from "react";

export default function Home() {
  const [listChat, setLC] = useState([]);
  const [chat, setChat] = useState("");
  const [nama, setNama] = useState("");
  const [stage, setStage] = useState(false);

  const [prosesChat, setPC] = useState(false);
  const [nomor, setNomor] = useState(Math.floor(Math.random() * 8 + 1));

  const newUser = async () => {
    const dataNEWLINE = {
      id: Math.floor(Math.random * 100000),
      sender: "Human",
      data: `Hello my name is ${nama}, anybody in this room?`,
    };
    // e.preventDefault();
    setLC((listChat) => [...listChat, dataNEWLINE]);
    setStage(true);
  };

  const newLine = async () => {
    const dataNEWLINE = {
      id: Math.floor(Math.random * 100000),
      sender: "Human",
      data: chat,
    };
    if (listChat.length > 19) {
      setLC((listChat) => [...listChat.slice(1), dataNEWLINE]);
    } else {
      setLC((listChat) => [...listChat, dataNEWLINE]);
    }
    setChat("");
  };

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [listChat]);

  // useEffect(() => {
  //   console.log(
  //     listChat.map(({ sender, data }) => sender + ": " + data).join("\\n")
  //   );
  //   testSend({
  //     dataX: listChat
  //       .map(({ sender, data }) => sender + ": " + data)
  //       .join("\\n"),
  //   });
  // }, []);

  useEffect(() => {
    if (listChat.length > 0) {
      //   console.log(listChat[listChat.length - 1].sender);
      if (listChat.length == 1) {
        // console.log(`${listChat[0].sender}: ${listChat[0].data}\nAI:DISINI`);
      } else {
        // console.log(
        //   listChat.map(({ sender, data }) => sender + ": " + data).join("\\n") +
        // "\\nAI:"
        // );
      }
      if (listChat[listChat.length - 1].sender == "Human") {
        testSend();
      }
    }
  }, [listChat]);

  const testSend = async () => {
    setPC(true);
    let chooseAI;
    if (nomor % 2 == 0) {
      chooseAI = "Marv is a chatbot that reluctantly answers questions.";
    } else {
      chooseAI =
        "The following is a conversation with an AI assistant. The assistant is helpful, creative, clever, and very friendly.";
    }
    let dataPrompt;
    if (listChat.length == 1) {
      dataPrompt = `${chooseAI}\\n${listChat[0].sender}: ${listChat[0].data}\nAI:`;
    } else {
      dataPrompt =
        "Marv is a chatbot that reluctantly answers questions.\\n" +
        listChat.map(({ sender, data }) => sender + ": " + data).join("\\n") +
        "\nAI:";
    }
    const data = {
      prompt: dataPrompt,
    };
    const url = "api/chat";
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Token: "eb11b5397527d8c2dfef407f98ba831a",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        // console.log(responseJson.choices[0].text);
        let dataAI;
        if (responseJson.choices[0] == undefined) {
          AILine({ responseText: "Please talk to us later.." });
        } else {
          if (responseJson.choices[0].text.length > 110) {
            dataAI = responseJson.choices[0].text + "...";
          } else {
            dataAI = responseJson.choices[0].text;
          }
          AILine({ responseText: dataAI });
        }

        setPC(false);
      });
  };

  const AILine = async ({ responseText }) => {
    let textResponse;
    if (responseText == "") {
      textResponse =
        "Im sorry, i didnt understand what do you mean, please repeat.";
    } else {
      textResponse = responseText;
    }
    const dataNEWLINE = {
      id: Math.floor(Math.random * 100000),
      sender: "AI",
      data: responseText,
    };
    if (listChat.length > 18) {
      setLC((listChat) => [...listChat.slice(1), dataNEWLINE]);
    } else {
      setLC((listChat) => [...listChat, dataNEWLINE]);
    }
    setChat("");
  };
  return (
    <div className="bg-gray-700">
      <Head>
        <title>TalcAI | Just Talk</title>
        <meta
          name="description"
          content="We help you to talk, anything, anytime, and anywhere, we are here just to help you talk."
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400;500;700;900&family=Poppins:wght@300;400;500;700&display=swap"
          rel="stylesheet"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {stage != "" ? (
        <main className="px-8 py-0 lg:py-0">
          <div className="grid grid-cols-1 min-h-screen container m-auto max-w-4xl gap-6">
            <div className="h-100% w-100% flex justify-center items-center">
              <div className="bg-white rounded-xl shadow-lg w-100% px-4 py-4 max-w-sm">
                <div className="flex justify-center items-center">
                  <b className="font-poppins text-lightgray text-xs text-center">
                    This product is still in under development period, something
                    may change in the future.
                  </b>
                </div>

                <div className="w-100% mt-4 overflow-auto max-h-70 lg:max-h-65 min-h-65">
                  {listChat.map((item, i) => (
                    <div
                      key={item.id}
                      className={`flex ${
                        item.sender == "Human"
                          ? "justify-end items-end"
                          : "justify-start items-start"
                      } ${i == 0 ? "mt-0" : "mt-1"} ${
                        i == listChat.length - 1 ? "mb-2" : "mb-1"
                      }`}
                    >
                      <div
                        className={`${
                          item.sender == "Human"
                            ? "bg-shades"
                            : "bg-primary text-white"
                        } rounded-lg px-4 py-1 max-w-sm`}
                      >
                        <p className="font-poppins text-sm">{item.data}</p>
                      </div>
                    </div>
                  ))}
                  <div ref={messagesEndRef} className="h-1" />
                </div>
                <div className="">
                  <form
                    className="grid grid-cols-12 mt-1 gap-2"
                    onSubmit={(e) => {
                      e.preventDefault();
                      if (prosesChat) {
                      } else {
                        if (chat == "") {
                        } else {
                          newLine();
                        }
                      }
                    }}
                  >
                    <div className="col-span-10">
                      <input
                        autoFocus
                        type=""
                        value={chat}
                        placeholder={"Your message.."}
                        onChange={(e) => {
                          setChat(e.target.value);
                        }}
                        className="rounded-lg border-2 border-gray w-full mt-0 py-2 px-3.5 hover:shadow-lg"
                      ></input>
                    </div>
                    <div
                      className="h-full col-span-2"
                      onClick={(e) => {
                        e.preventDefault();
                        if (prosesChat) {
                        } else {
                          if (chat == "") {
                          } else {
                            newLine();
                          }
                        }
                      }}
                    >
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
                  </form>
                </div>
                <div className="flex justify-center items-center mt-2">
                  <b className="font-poppins text-gray text-xs text-center">
                    Version 0.0.1
                  </b>
                </div>
              </div>
            </div>
          </div>
        </main>
      ) : (
        <main className="px-8">
          <div className="grid grid-cols-1 min-h-screen container m-auto max-w-sm gap-6 justify-center items-center">
            <div className="bg-white rounded-xl shadow-lg px-4 py-4 max-h-80 justify-center items-center">
              <form
                className="w-100%"
                onSubmit={(e) => {
                  e.preventDefault();
                  if (nama == "") {
                    alert("Please fill in your name first");
                  } else {
                    newUser();
                  }
                }}
              >
                <div className="w-100%">
                  <h1 className="font-poppins font-bold text-base text-lightgray mt-0 text-left">
                    Before you continue, we need your name to be processed into
                    the chat session
                  </h1>
                  <h1 className="font-poppins font-bold text-base text-black mt-2 text-left">
                    Your name
                  </h1>
                  <input
                    autoFocus
                    type=""
                    value={nama}
                    placeholder={""}
                    onChange={(e) => {
                      setNama(e.target.value);
                    }}
                    className="rounded-lg border-2 border-gray w-full mt-0 py-2 px-3.5"
                  ></input>
                </div>
                <div className="w-100%">
                  <div
                    onClick={(e) => {
                      e.preventDefault();
                      nama == ""
                        ? alert("Please fill in your name first")
                        : newUser();
                    }}
                    className="bg-primary rounded-lg w-100% h-full flex justify-center items-center cursor-pointer hover:shadow-lg transform duration-300 ease-in-out mt-2 py-3"
                  >
                    <div>
                      <b className="font-poppins text-white mr-2">
                        Start Session
                      </b>
                    </div>
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
              </form>
            </div>
          </div>
        </main>
      )}
    </div>
  );
}
