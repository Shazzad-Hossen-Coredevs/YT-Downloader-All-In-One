"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import logo from "../assets/logo.png";
import yeii from "../assets/excited.png";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { setData } from "../services/userSlice";
import Loading from "./Loading";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const Ui = ({ data }) => {
  const [inputVal, setInputVal] = useState("");
  const { isLoading} = useSelector(state=> state.userInfo);
  const router = useRouter();
  const dispatch= useDispatch();

  function isValidYouTubeUrl(url) {
    return /^(https?:\/\/)?(www\.)?(youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/i.test(url);
  }
  const handleDownload = () => {
    const isValid = isValidYouTubeUrl(inputVal);
    if(isValid) {
      router.replace(`/?url=${inputVal}&rand=${Math.random()}`);
      dispatch(setData({target:'isLoading', value: true}));
    }
    else {
      toast.error('Invalid youtube video url');
      router.replace('/');
    }

   
  }

  useEffect(()=>{
    dispatch(setData({target:'isLoading', value: false}));
    setInputVal('');
  }, [data]);


  return (
    <div>
      <ToastContainer />
      <div className="bg-sky-100 border-b border-sky-200">
        <div className="p-5 max-w-[1200px] w-full mx-auto text-white flex justify-between items-center">
          <Link href='/'><div className="flex items-center gap-3 text-sky-800 text-3xl font-[600]">
            <Image src={logo} className="w-[50px]" alt="logo" /> YT DOWNLOADER
          </div></Link>
          <div>{/* Other Nav Options */}</div>
        </div>
      </div>
      <main className="max-w-[1200px] w-full mx-auto">
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
          data? <div className="flex justify-center gap-10 pt-14">
          <img src={data?.thumbUrl} height={200} width={300} alt="Thumbnail" />
          <div className="">
            <h1 className="pb-5"><b>Video Title: &nbsp; &nbsp;</b>{data?.title}</h1>
            <a href={data?.url} target="blank">
            <button className="bg-sky-400 p-2 rounded-md font-[600] text-white drop-shadow-md">Download</button>
            </a>
          </div>
  
          </div>:''
        }

      </main>
      {
        isLoading===true? <Loading /> :''
      }
    </div>
  );
};

export default Ui;
