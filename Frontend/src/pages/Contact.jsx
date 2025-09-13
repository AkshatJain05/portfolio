import axios from "axios";
import { useState } from "react";
import {  FaHome } from "react-icons/fa";
import { Link } from "react-router-dom";
import api from "../utils/axios";
import Loading from "../components/Loading";

const Contact = () => {
  const [name ,setName] = useState("");
  const [email ,setEmail] = useState("");
  const [message ,setMessage] = useState("");
  const [loading,setLoading] = useState(false);
  const [notification,setNotification] = useState("")

    const handleSendMessage =()=>{
        setLoading(true)
        api.post("/contacts",{name,email,message}).then((res)=>{
             setNotification("Your message successfully deliverd");
             setLoading(false);
    }).catch((err)=>{
      console.error("Error",err);
      setNotification("Your message not deliverd");
      setLoading(false)
    })
  }
  

  if(loading){
    return <Loading/>
  }


  
  return (
    <>
       {/* HOME BUTTON */}
      <div className="w-full flex justify-center my-2 text-left bg-transparent">
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-6 py-2 rounded-full text-white font-medium shadow-lg hover:shadow-xl hover:scale-105 transform transition-all duration-300"
        >
          <FaHome /> Home
        </Link>
      </div>
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-900 text-gray-100 flex flex-col items-center justify-center py-10 px-4">

     {notification && <h1 className="text-white p-5 m-3 bg-gray-950 border-1 rounded-2xl border-white">{notification}</h1>}

      {/* CONTACT CARD */}
      <div className="max-w-4xl w-full bg-white/5 backdrop-blur-md p-6 rounded-3xl shadow-xl border border-gray-700">
        
        {/* HEADER */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-blue-400 mb-4">Contact Me</h1>
          <p className="text-gray-300 mb-6">
            Have a project in mind or want to collaborate? Drop me a message and I’ll get back to you soon!
          </p>
          {/* <div className="inline-flex items-center justify-center space-x-3">
            <FaEnvelope className="text-blue-400 text-2xl" />
            <p className="text-gray-300 font-medium">your.email@example.com</p>
          </div> */}
        </div>

        {/* CONTACT FORM */}
        <form className="flex flex-col space-y-4">
          <input
            type="text"
            placeholder="Your Name"
            className="w-full p-4 rounded-xl bg-white/10 placeholder-gray-300 text-gray-100 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            onChange={(e)=>{setName(e.target.value)}}
            required
          />
          <input
            type="email"
            placeholder="Your Email"
            className="w-full p-4 rounded-xl bg-white/10 placeholder-gray-300 text-gray-100 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            onChange={(e)=>{setEmail(e.target.value)}}
            required
          />
          <textarea
            rows="5"
            placeholder="Your Message"
            className="w-full p-4 rounded-xl bg-white/10 placeholder-gray-300 text-gray-100 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            onChange={(e)=>{setMessage(e.target.value)}}
            required
          ></textarea>
          <button
            type="submit" onClick={handleSendMessage}
            className="w-full py-3 mt-2 rounded-xl bg-gradient-to-r from-blue-950 to-slate-950  border-1 border-white text-white font-semibold hover:scale-105 transform transition-all shadow-lg hover:shadow-blue-500/50"
             
          >
          Send Message
          </button>
        </form>
      </div>
    </div>
    </>
  );
};

export default Contact;
