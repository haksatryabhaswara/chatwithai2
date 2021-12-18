import Head from "next/head";
import Image from "next/image";
import React, { useEffect, useState, useRef } from "react";
import { Dialog } from "@headlessui/react";
import ReCAPTCHA from "react-google-recaptcha";

export default function Home({ siteKey }) {
  const [listChat, setLC] = useState([]);
  const [chat, setChat] = useState("");
  const [nama, setNama] = useState("");
  const [stage, setStage] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const recaptchaRef = React.createRef();

  const [prosesChat, setPC] = useState(false);
  const [nomor, setNomor] = useState(Math.floor(Math.random() * 8 + 1));

  const newUser = async () => {
    const dataNEWLINE = {
      id: Math.floor(Math.random * 100000),
      sender: "Human",
      data: `Hello, is someone here?`,
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
          if (responseJson.choices[0].text.length > 140) {
            dataAI = responseJson.choices[0].text + " (cont)";
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

  const handleCap = async () => {
    recaptchaRef.current.execute();
    // setIsOpen(true);
  };

  const onReCAPTCHAChange = (captchaCode) => {
    // If the reCAPTCHA code is null or undefined indicating that
    // the reCAPTCHA was expired then return early
    if (!captchaCode) {
      return;
    }
    // Else reCAPTCHA was executed successfully so proceed with the
    // alert
    setIsOpen(true);
    // Reset the reCAPTCHA so that it can be executed again if user
    // submits another email.
    recaptchaRef.current.reset();
  };
  return (
    <div className="bg-gray-700">
      <Head>
        <title>Chat Room | TokkuAI</title>
        <meta name="title" content="TokkuAI | JustTalk" />
        <meta
          name="description"
          content="We help you to talk, anything, anytime, and anywhere, we are here just to help you to talk."
        />

        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.tokkuai.com//" />
        <meta property="og:title" content="TokkuAI #JustTalk" />
        <meta
          property="og:description"
          content="We help you to talk, anything, anytime, and anywhere, we are here just to help you to talk."
        />
        <meta
          property="og:image"
          content="https://www.tokkuai.com//android-chrome-512x512.png"
        />

        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://www.tokkuai.com//" />
        <meta property="twitter:title" content="TokkuAI #JustTalk" />
        <meta
          property="twitter:description"
          content="We help you to talk, anything, anytime, and anywhere, we are here just to help you to talk."
        />
        <meta
          property="twitter:image"
          content="https://www.tokkuai.com//android-chrome-512x512.png"
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
                        maxLength={"100"}
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
                    handleCap();
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
                    maxLength={"15"}
                    value={nama}
                    placeholder={""}
                    onChange={(e) => {
                      setNama(e.target.value);
                    }}
                    className="rounded-lg border-2 border-gray w-full mt-0 py-2 px-3.5"
                  ></input>
                  <ReCAPTCHA
                    ref={recaptchaRef}
                    size="invisible"
                    sitekey={siteKey}
                    onChange={onReCAPTCHAChange}
                  />
                </div>
                <div className="w-100%">
                  <div
                    onClick={(e) => {
                      e.preventDefault();
                      nama == ""
                        ? alert("Please fill in your name first")
                        : handleCap();
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
          <Dialog
            open={isOpen}
            onClose={() => {
              setIsOpen(false);
              newUser();
            }}
            className="fixed z-10 inset-0 overflow-y-auto"
          >
            <Dialog.Overlay className="fixed inset-0 bg-black opacity-30"></Dialog.Overlay>
            <div className="w-100% h-screen flex justify-center items-center px-4">
              <div className="bg-white w-96 py-8 px-10 rounded-md z-20">
                {nomor % 2 == 0 ? (
                  <div>
                    <iframe
                      src="https://embed.lottiefiles.com/animation/68783"
                      className="w-100% h-30"
                    ></iframe>
                    <b className="font-poppins">Bad Behavior AI</b>
                    <p className="font-poppins">
                      Your friend is a chatbot that reluctantly answers
                      questions. This means that your conversation will not be
                      directed and follow the mood of your conversing
                    </p>
                    <b className="font-poppins text-xs text-gray mt-2">
                      NOTE: Please remember, this model is still under training,
                      so there is a possibility of misscommunication.
                    </b>
                    <div
                      onClick={() => {
                        setIsOpen(false);
                        newUser();
                      }}
                      className="bg-primary rounded-lg w-100% h-full flex justify-center items-center cursor-pointer hover:shadow-lg transform duration-300 ease-in-out mt-2 py-3"
                    >
                      <div>
                        <b className="font-poppins text-white mr-2">
                          Talk Now!
                        </b>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div>
                    <iframe
                      src="https://embed.lottiefiles.com/animation/87944"
                      className="w-100% h-40"
                    ></iframe>
                    <b className="font-poppins">Good Behavior AI</b>
                    <p className="font-poppins">
                      Your friend is helpful, creative, clever, and very
                      friendly. This means that your conversation is directed
                      and will follow where you take this conversation
                    </p>
                    <b className="font-poppins text-xs text-gray mt-2">
                      NOTE: Please remember, this model is still under training,
                      so there is a possibility of misscommunication.
                    </b>
                    <div
                      onClick={() => {
                        setIsOpen(false);
                        newUser();
                      }}
                      className="bg-primary rounded-lg w-100% h-full flex justify-center items-center cursor-pointer hover:shadow-lg transform duration-300 ease-in-out mt-2 py-3"
                    >
                      <div>
                        <b className="font-poppins text-white mr-2">
                          Talk Now!
                        </b>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </Dialog>
        </main>
      )}
    </div>
  );
}

export async function getServerSideProps() {
  // Fetch data from external API
  const siteKey = process.env.CAPSITEK;
  // Pass data to the page via props
  return { props: { siteKey } };
}
