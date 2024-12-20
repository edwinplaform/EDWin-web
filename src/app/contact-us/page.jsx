"use client";

import React from "react";
import { IoLocationOutline } from "react-icons/io5";
import { IoCallOutline } from "react-icons/io5";
import { motion } from "motion/react";
import { Input } from "antd";

function ContactUs() {
  const { textArea } = Input;
  return (
    <div className="flex flex-col min-h-screen">
      <div className="text-center bg-[url('/contactUsNew.jpg')] bg-cover bg-center bg-no-repeat h-64 md:h-96 flex flex-col justify-center items-center">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="text-3xl md:text-5xl font-bold text-white drop-shadow-lg"
        >
          Need Some Help?
        </motion.p>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
          className="text-xl md:text-2xl mt-3 text-white drop-shadow-lg"
        >
          Let's Have a Talk
        </motion.p>
      </div>

      <div className="flex-grow p-5 md:p-10 bg-gray-50">
        <p className="text-center text-base md:text-lg mb-6">
          If you have any questions or need help, please fill out the form
          below. We do our best to respond within 1 business day.
        </p>
        <div className="flex flex-col items-center max-w-2xl mx-auto bg-white shadow-lg rounded-lg p-6 md:p-10">
          <div className="w-full mb-4">
            <input
              type="text"
              placeholder="Enter your name..."
              className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="w-full mb-4">
            <input
              type="email"
              placeholder="Enter your email address..."
              className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="w-full mb-4">
            <textarea
              placeholder="Enter your message..."
              rows="4"
              className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            ></textarea>
          </div>
          <button className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400">
            Submit
          </button>
        </div>
        <div className="flex flex-col lg:flex-row justify-between mt-20 items-center gap-6">
          <div className="w-full lg:w-1/3 flex justify-center">
            <img
              src="/contactUsMap.png"
              alt="Contact Us Map"
              className="w-full h-60 lg:h-80 object-cover rounded-md shadow-lg"
            />
          </div>

          <div className="w-full lg:w-1/3 flex flex-col items-start p-6 bg-white rounded-md shadow-lg">
            <p className="text-2xl font-bold mb-4">Meet Us</p>
            <div className="flex items-center">
              <IoLocationOutline size={24} className="text-blue-500" />
              <p className="ml-3 text-sm">
                274/4 Rajasinghe Mawatha, Hewagama, Kaduwela
              </p>
            </div>
          </div>

          <div className="w-full lg:w-1/3 flex flex-col items-start p-6 bg-slate-200 rounded-md shadow-lg">
            <p className="text-2xl font-bold mb-4">Call Us</p>
            <div className="flex items-center">
              <IoCallOutline size={24} className="text-green-500" />
              <p className="ml-3 text-sm">077-6601088</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactUs;