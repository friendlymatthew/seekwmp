import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { useRouter } from "next/router";
import NavBarComponent from "../components/NavBar";
import react, { useEffect, useState, useRef } from "react";
import ReactPlayer from "react-player";

export default function Home() {
  const { query } = useRouter();
  let market = query.market;
  let station = query.station;
  let title = query.title;
  let snippet = query.snippet;
  let coder = query.coder;
  let seek = query.seek;
  let id = String(query.id);

  const reference = useRef();

  let videourl = `https://wesmedia.wesleyan.edu/${query.url}`;

  //action button states
  //state for coder inputted start time in HH:MM:SS
  const [start, setStart] = useState("00:00:00");
  //state for start time in seconds
  const [startSec, setStartSec] = useState(0);

  //state for coder inputted stop time in HH:MM:SS
  const [stop, setStop] = useState("00:00:00");
  //state for stop time in seconds
  const [stopSec, setStopSec] = useState(0);

  const [startFlag, setStartFlag] = useState(false);
  const [stopFlag, setStopFlag] = useState(false);

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [pressSubmit, setPressSubmit] = useState(false);

  useEffect(() => {
    //packaging url params into postData state
  }, []);

  const handleSeek = () => {
    reference.current.seekTo(Number(query.seek));
  };

  const handleStart = () => {
    let seconds = reference.current.getCurrentTime();
    setStartSec(seconds);
    var dateStart = new Date(seconds * 1000).toISOString().substr(11, 8);
    setStart(dateStart);
    setStartFlag(true);
  };

  const handleStop = () => {
    let seconds = reference.current.getCurrentTime();
    setStopSec(seconds);
    var dateStop = new Date(seconds * 1000).toISOString().substr(11, 8);

    setStop(dateStop);
    setStopFlag(true);
  };

  const handleSubmit = () => {
    if (!success) {
      setPressSubmit(!pressSubmit);
      const postData = {
        market: String(market),
        station: String(station),
        videoSrc: String(videourl),
        title: String(title),
        snippet: String(snippet),
        coder: String(coder),
        seek: String(seek),
        start: Number(startSec),
        stop: Number(stopSec),
        id: Number(id),
      };

      fetch("https://seekserverwmp.herokuapp.com/api/v1/post", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postData),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Success: ", data);
          setSuccess(true);
        })
        .catch((error) => {
          console.log("Error: ", error);
          setErrorMessage(error.message);
          setError(true);
        });
    }
  };

  const handleSeekStart = () => {
    reference.current.seekTo(Number(startSec));
  };

  const handleSeekStop = () => {
    reference.current.seekTo(Number(stopSec));
  };

  return (
    <div>
      <Head>
        <title>Seek</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header>
        <NavBarComponent coder={query.coder} />
      </header>

      <main className="px-2 mt-4 pb-12 min-h-screen">
        <div className="grid grid-cols-1 place-items-center">
          <section
            id="desc"
            className="grid grid-cols-1 lg:grid-cols-2 place-items-center w-11/12 lg:max-w-7xl lg:place-items"
          >
            <ReactPlayer
              url={videourl}
              ref={reference}
              playing
              controls
              width={450}
              height={360}
            />
            <section className="mt-12 lg:mt-0 ">
              <ul className="font-medium text-black text-opacity-70">
                <li className="text-black text-opacity-100 text-xl">
                  Video Title: {query.title}
                </li>
                <li>Video Id: {query.id}</li>
                <li>Market: {query.market}</li>
                <li>Station: {query.station}</li>
                <li className="w-11/12 lg:max-w-4xl mt-6 text-lg text-opacity-80 font-medium text-black">
                  <div className="text-opacity-100 text-black">Snippet:</div>
                  {query.snippet}
                </li>
              </ul>
            </section>
          </section>

          <section
            id="actions"
            className="w-11/12 lg:max-w-4xl grid grid-cols-1 place-items-center mt-12"
          >
            <div className="flex wrap w-full justify-around bg-gray-300 rounded-t-md px-2 py-0">
              <button
                onClick={handleSeek}
                className="flex space-x-2 items-center bg-gray-300 rounded-md px-2 py-1 hover:bg-gray-400 transition ease-in duration-300"
              >
                <div className="text-lg  font-semibold">Seek</div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
              </button>

              <button
                onClick={handleStart}
                className="flex space-x-2 items-center bg-gray-300 rounded-md px-2 py-1 hover:bg-gray-400 transition ease-in duration-300"
              >
                <div className="text-lg font-semibold">Mark Start</div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 5l7 7-7 7M5 5l7 7-7 7"
                  />
                </svg>
              </button>

              <button
                onClick={handleStop}
                className="flex space-x-2 items-center bg-gray-300 rounded-md px-2 py-1 hover:bg-gray-400 transition ease-in duration-300"
              >
                <div className="text-lg font-semibold">Mark Stop</div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 10a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4z"
                  />
                </svg>
              </button>
            </div>
          </section>

          <section className="w-11/12 lg:max-w-4xl">
            <div className="bg-gray-100 rounded-b-md py-8 px-6">
              <div className="text-2xl font-semibold">Submission Details</div>
              <div className="text-md opacity-80 italic mb-4">
                Press below to seek to specified time
              </div>

              <ul>
                <li>
                  <button
                    onClick={handleSeekStart}
                    className="flex space-x-2 items-center group text-black hover:text-blue-600 hover:font-medium hover:scale-105 transition ease-in duration-300"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="ml-2 h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M13 5l7 7-7 7M5 5l7 7-7 7"
                      />
                    </svg>
                    <div className="text-xl">{start}</div>
                  </button>
                </li>

                <li onClick={handleSeekStop}>
                  <button className="flex space-x-2 items-center group text-black hover:text-blue-600 hover:font-medium hover:scale-105 transition ease-in duration-300">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="ml-2 h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 10a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4z"
                      />
                    </svg>
                    <div className="text-xl">{stop}</div>
                  </button>
                </li>
              </ul>

              {startFlag && stopFlag ? (
                <div className="flex space-x-4 items-center justify-end">
                  {pressSubmit ? (
                    <button className="my-4 bg-green-400 hover:bg-green-300 px-2 py-1 rounded-sm flex items-center space-x-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                        />
                      </svg>
                    </button>
                  ) : (
                    <button
                      onClick={handleSubmit}
                      className="my-4 bg-orange-400 hover:bg-orange-300 px-2 py-1 rounded-sm flex items-center space-x-2"
                    >
                      <div className="font-bold">Post</div>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                        />
                      </svg>
                    </button>
                  )}

                  <a
                    href="https://forms.gle/adhB5GFFUGn1FT46A"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <div className="text-sm opacity-80 italic font-medium hover:underline transition ease-in duration-300">
                      Report Issue
                    </div>
                  </a>
                </div>
              ) : (
                <div className="flex justify-end">
                  <a
                    href="https://forms.gle/adhB5GFFUGn1FT46A"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <div className="text-sm opacity-80 italic font-medium hover:underline transition ease-in duration-300">
                      Report Issue
                    </div>
                  </a>
                </div>
              )}

              {success ? (
                <div className="alert alert-success">
                  <div className="flex-1 items-center space-x-2">
                    <label>Clip has been successfully posted</label>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                </div>
              ) : null}

              {error ? (
                <div className="alert alert-error">
                  <div className="flex-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      className="w-6 h-6 mx-2 stroke-current"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"
                      ></path>
                    </svg>
                    <div>
                      Something went wrong
                    </div>
                  </div>

                  <a
                    href="https://forms.gle/adhB5GFFUGn1FT46A"
                    target="_blank"
                    rel="noreferrer"
                    className="text-md text-gray-700 text-opacity-100 lg:hover:text-opacity-80 lg:hover:underline lg:ease-in lg:duration-100 lg:transition"
                  >
                    Report Issue
                  </a>
                </div>
              ) : null}
            </div>
          </section>
        </div>
      </main>

      <footer>
        <a
          href="https://github.com/matthewkim0/seekwmp"
          target="_blank"
          rel="noreferrer"
        >
          <div className="group items-center flex space-x-4 bg-gray-700 py-4 px-6 mt-20 items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4"
              />
            </svg>

            <div className="text-md text-white group-hover:text-opacity-90 transition ease-in duration-200 italic font-medium">
              Source Code
            </div>
          </div>
        </a>
      </footer>
    </div>
  );
}
