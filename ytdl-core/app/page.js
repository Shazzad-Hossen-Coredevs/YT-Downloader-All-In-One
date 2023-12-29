"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import logo from "./assets/logo.png";
import yeii from "./assets/excited.png";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { setData } from "./services/userSlice";
import { IoCheckmarkSharp, IoClose } from "react-icons/io5";
import { BiDownload } from "react-icons/bi";

import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Loading from "./components/Loading";

const Home = () => {
  const [inputVal, setInputVal] = useState("");
  const { isLoading, data } = useSelector(state => state.userInfo);
  const dispatch = useDispatch();

  function isValidYouTubeUrl(url) {
    return /^(https?:\/\/)?(www\.)?(youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/i.test(url);
  }
  const handleDownload = () => {
    const isValid = isValidYouTubeUrl(inputVal);
    if (isValid) {
      dispatch(setData({ target: 'isLoading', value: true }));

      fetch(`/api/downloader?url=${inputVal}`).then(res => {
        if (res?.status === 200) {
          return res.json();
        }
        else {
          toast.error('Invalid video url');
          return null;
        }
      }).then(ytData => {
        dispatch(setData({ target: 'isLoading', value: false }));
        dispatch(setData({ target: 'data', value: ytData }));

      });
    }
    else {
      toast.error('Invalid youtube video url');
    }


  }




  return (
    <div>
      <ToastContainer />
      <div className="bg-sky-100 border-b border-sky-200">
        <div className="p-5 max-w-[500px] w-full mx-auto text-white flex justify-between items-center">
          <Link href='/'><div className="flex items-center gap-3 text-sky-800 text-3xl font-[600]">
            <Image src={logo} className="w-[50px]" alt="logo" /> YT DOWNLOADER
          </div></Link>
          <div>{/* Other Nav Options */}</div>
        </div>
      </div>
      <main className="max-w-[1200px] w-full mx-auto px-10 min-h-[calc(100vh-275px)]">
        <div className="max-w-[500px] w-full mx-auto mt-20">
          <input
            type="text"
            className="border border-sky-300 rounded-lg p-6 w-full outline-sky-600 text-lg text-sky-800"
            placeholder="Youtube video url"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
          />
          <div
            className="flex items-center gap-2 justify-center p-5 rounded-lg bg-sky-300 mt-5 text-sky-800 font-[600] drop-shadow text-xl cursor-pointer active:scale-95 select-none shadow-md"
            onClick={handleDownload}
          >
            <Image src={yeii} alt="Yeii Icon" className="w-[30px]" /> Yeii. I am
            feeling lucky
          </div>
        </div>
        {
          data ? <div className="flex flex-col items-center justify-center gap-10 pt-14 w-full">
            <div>
              <img className="shadow-lg rounded-md border-2" src={data?.videoDetails?.thumbnails[4]?.url} height={200} width={300} alt="Thumbnail" />
            </div>
            <div className="w-full">
              <h1 className="pb-5 text-center"><b>Video Title: &nbsp; &nbsp;</b>{data?.videoDetails?.title}</h1>
              <div className='overflow-x-auto'>
                <table className="w-full ">
                  <thead>
                    <tr className="bg-sky-300 text-white ">
                      <th className="pl-5">SL</th>
                      <th>Type</th>
                      <th>Audio</th>
                      <th>Video</th>
                      <th>Quality</th>
                      <th>Size</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      data?.formats.map((d, index) => <tr key={index} className="even:bg-sky-100 odd:bg-sky-200 ">
                        <td className="p-2 pl-5">{index + 1}</td>
                        <td>{d.container}</td>
                        <td>{d?.hasAudio ? <IoCheckmarkSharp /> : <IoClose />}</td>
                        <td>{d?.hasVideo ? <IoCheckmarkSharp /> : <IoClose />}</td>
                        <td>{d?.qualityLabel ? d?.qualityLabel : '---'}</td>
                        <td>{d?.contentLength ? (d?.contentLength / (1024 * 1024)).toFixed(2) + ' MB' : 'Unknown'}</td>
                        <td className="w-[100px] pr-5"><a href={d?.url} target='blank'><div className='bg-sky-500 p-2 rounded text-white font-[600] flex items-center gap-2 shadow-lg active:scale-95 cursor-pointer select-none w-fit' ><BiDownload />Download</div></a></td>
                      </tr>)
                    }
                  </tbody>
                </table>
              </div>
            </div>

          </div> : ''
        }

      </main>
      {
        isLoading === true ? <Loading /> : ''
      }

      <footer className="bg-sky-950 text-white  text-center p-5 mt-10">All rights reserved by <a href='https://github.com/Shazzad-Hossen' target='blank'><strong>Shazzad Hossen</strong></a></footer>
    </div>
  );
};

export default Home;
