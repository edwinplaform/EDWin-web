"use client";

import React, { useRef } from "react";
import { IoCallSharp } from "react-icons/io5";
import { FaLocationDot } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { motion } from "framer-motion";
import { Input } from "antd";
const { TextArea } = Input;

function ContactUs() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <div className="text-center bg-[url('/contactUsAi.jpg')] bg-cover bg-center bg-no-repeat h-64 md:h-96 flex flex-col justify-center items-center">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="text-3xl md:text-5xl font-bold drop-shadow-lg bg-gradient-to-t from-blue-300 to-white bg-clip-text text-transparent"
        >
          Need Some Help?
        </motion.p>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 3 }}
          className="text-xl md:text-2xl mt-3 text-white drop-shadow-lg"
        >
          Let's Have a Talk
        </motion.p>
      </div>

      {/* Contact Section */}
      <div className="flex flex-col sm:flex-row  items-center py-10 bg-gray-50">
        {/* Left Side */}
        <div className="w-full sm:w-1/2 flex flex-col items-start sm:ml-56 sm:items-center justify-center px-10">
          <motion.div
            className="flex items-start py-4 w-full"
            initial={{ opacity: 0, x: -275 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.75, delay: 0.25 }}
          >
            <FaLocationDot className="text-blue-800 bg-blue-200 rounded-full p-2 w-10 h-10" />
            <div className="ml-4">
              <p className="font-bold text-lg">Meet us</p>
              <p className="text-sm text-gray-600">
                Keenagahena, Dalkada, Bombuwala, Kalutara South, Sri Lanka
              </p>
            </div>
          </motion.div>

          <motion.div
            className="flex items-start py-4 w-full"
            initial={{ opacity: 0, x: -275 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.75, delay: 0.25 }}
          >
            <IoCallSharp className="text-blue-800 bg-blue-200 rounded-full p-2 w-10 h-10" />
            <div className="ml-4">
              <p className="font-bold text-lg">Call us</p>
              <p className="text-sm text-gray-600">+94 71-3084265</p>
            </div>
          </motion.div>

          <motion.div
            className="flex items-start py-4 w-full"
            initial={{ opacity: 0, x: -275 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.75, delay: 0.25 }}
          >
            <MdEmail className="text-blue-800 bg-blue-200 rounded-full p-2 w-10 h-10" />
            <div className="ml-4">
              <p className="font-bold text-lg">Mail us</p>
              <p className="text-sm text-gray-600">edwinedu@gmail.com</p>
            </div>
          </motion.div>
        </div>

        {/* Right Side */}
        <motion.div
          className="w-full sm:w-1/2 flex justify-center items-center px-3 sm:mr-56"
          initial={{ opacity: 0, x: 275 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.75, delay: 0.25 }}
        >
          {/* <div className="w-full"><iframe width="100%" height="600" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=Keenagahena,Dalkada,%20Bombuwala,%20Kalutara%20South,%20Sri%20Lanka+(EDWin)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"><a href="https://www.gps.ie/">gps tracker sport</a></iframe></div> */}
          {/* <div class="mapswrapper"><iframe width="600" height="450" loading="lazy" allowfullscreen src="https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=keenagahena%2C%20dalkada%2C%20bombuwala&zoom=14&maptype=roadmap"></iframe><a href="https://www.fluxaiimagegenerator.net" rel="nofollow">flux ai image generator</a></div> */}
          <img
            src="/contactUsBlue2.jpg"
            alt="Contact Us Visual"
            className="w-full shadow-lg shadow-blue-200"
          />
        </motion.div>
      </div>
      <div className="flex flex-col items-center justify-center mt-2 sm:mt-10">
        <motion.div
          className="flex items-center justify-center"
          initial={{ opacity: 0, y: 72 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.5, delay: 0.25 }}
        >
          <MdEmail className="w-12 h-12 p-2 text-blue-900" />
          <p className="font-bold text-4xl bg-gradient-to-r from-blue-900 to-blue-500 bg-clip-text text-transparent">
            Send Your Message to us{" "}
          </p>
        </motion.div>
        <motion.p
          className="text-md px-2 sm:p-1 mt-10"
          initial={{ opacity: 0, y: 70 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.3 }}
        >
          If you have any questions or need help, please fill out the form
          below. We do our best to respond within 1 business day.
        </motion.p>
        ;
        <motion.div
          initial={{ opacity: 0, y: 75 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 1, delay: 0.25 }}
          className="flex flex-col items-center w-full sm:w-1/2 bg-white border border-blue-800 rounded-lg p-6 md:p-10 mx-4"
        >
          {/* <p className="m-3 text-2xl font-bold">Send Your Message to us </p> */}
          <div className="w-full mb-4">
            <Input
              type="text"
              variant="filled"
              placeholder="Enter your name..."
              className="w-full rounded-md bg-white px-3.5 py-2 text-sm outline-none ring-1 ring-inset ring-zinc-300 hover:ring-zinc-400 focus:ring-[1.5px] focus:ring-zinc-950 data-[invalid]:ring-red-400"
              // className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="w-full mb-4">
            <Input
              type="email"
              variant="filled"
              placeholder="Enter your email address..."
              className="w-full rounded-md bg-white px-3.5 py-2 text-sm outline-none ring-1 ring-inset ring-zinc-300 hover:ring-zinc-400 focus:ring-[1.5px] focus:ring-zinc-950 data-[invalid]:ring-red-400"
              // className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="w-full mb-4">
            <TextArea
              placeholder="Enter your message..."
              variant="filled"
              rows="4"
              className="w-full rounded-md bg-white px-3.5 py-2 text-sm outline-none ring-1 ring-inset ring-zinc-300 hover:ring-zinc-400 focus:ring-[1.5px] focus:ring-zinc-950 data-[invalid]:ring-red-400 resize-none"
              // className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            ></TextArea>
          </div>
          <button className="bg-blue-800 text-white font-bold px-6 py-2 rounded-lg hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-400">
            Submit
          </button>
        </motion.div>
      </div>
      <div className="flex flex-col justify-center items-center mt-3 sm:mt-10 bg-gray-50">
        <motion.div
          initial={{ opacity: 0, y: 75 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="flex items-center justify-center"
        >
          <FaLocationDot className="w-10 h-10 p-2 text-blue-900" />
          <p className="font-bold text-4xl bg-gradient-to-r from-blue-900 to-blue-500 bg-clip-text text-transparent">
            Meet us here
          </p>
        </motion.div>

        {/* <div className="sm:w-1/2 w-full rounded-xl p-5 sm:p-10">
          <iframe
            width="100%"
            height="600"
            frameborder="0"
            scrolling="no"
            marginheight="0"
            marginwidth="0"
            src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=Keenagahena,Dalkada,%20Bombuwala,%20Kalutara%20South,%20Sri%20Lanka+(EDWin)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
          >
            <a href="https://www.gps.ie/">gps tracker sport</a>
          </iframe>
        </div> */}
        <motion.div
          className="sm:w-1/2 w-full rounded-xl p-5 sm:p-10"
          initial={{ opacity: 0, y: 75 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.5, delay: 0.25 }}
        >
          <iframe
            width="100%"
            height="600"
            style={{ border: "0" }} // Use CSS for the border
            scrolling="no"
            src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=Keenagahena,Dalkada,%20Bombuwala,%20Kalutara%20South,%20Sri%20Lanka+(EDWin)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
            allowFullScreen
            loading="lazy"
          ></iframe>
        </motion.div>
      </div>
    </div>
  );
}

export default ContactUs;

// "use client";

// import React from "react";
// import { IoLocationOutline } from "react-icons/io5";
// import { FaLocationDot } from "react-icons/fa6";
// import { IoCallSharp } from "react-icons/io5";
// import { IoCallOutline } from "react-icons/io5";
// import { motion } from "framer-motion";
// import { Input } from "antd";

// function ContactUs() {
//   const { textArea } = Input;
//   return (
//     <div className="flex flex-col min-h-screen">
//       <div className="text-center bg-[url('/contactUsNew.jpg')] bg-cover bg-center bg-no-repeat h-64 md:h-96 flex flex-col justify-center items-center">
//         <motion.p
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ duration: 1 }}
//           className="text-3xl md:text-5xl font-bold text-white drop-shadow-lg"
//         >
//           Need Some Help?
//         </motion.p>
//         <motion.p
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ duration: 2 }}
//           className="text-xl md:text-2xl mt-3 text-white drop-shadow-lg"
//         >
//           Let's Have a Talk
//         </motion.p>
//       </div>
//       {/*
//       <div className="flex-grow p-5 md:p-10 bg-gray-50">
//         <p className="text-center text-base md:text-lg mb-6">
//           If you have any questions or need help, please fill out the form
//           below. We do our best to respond within 1 business day.
//         </p>
// <div className="flex flex-col items-center max-w-2xl mx-auto bg-white shadow-lg rounded-lg p-6 md:p-10">
//   <div className="w-full mb-4">
//     <input
//       type="text"
//       placeholder="Enter your name..."
//       className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//     />
//   </div>
//   <div className="w-full mb-4">
//     <input
//       type="email"
//       placeholder="Enter your email address..."
//       className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//     />
//   </div>
//   <div className="w-full mb-4">
//     <textarea
//       placeholder="Enter your message..."
//       rows="4"
//       className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//     ></textarea>
//   </div>
//   <button className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400">
//     Submit
//   </button>
//         </div>
//         <div className="flex flex-col lg:flex-row justify-between mt-20 items-center gap-6">
//           <div className="w-full lg:w-1/3 flex justify-center">
//             <img
//               src="/contactUsMap.png"
//               alt="Contact Us Map"
//               className="w-full h-60 lg:h-80 object-cover rounded-md shadow-lg"
//             />
//           </div>

//           <div className="w-full lg:w-1/3 flex flex-col items-start p-6 bg-white rounded-md shadow-lg">
//             <p className="text-2xl font-bold mb-4">Meet Us</p>
//             <div className="flex items-center">
//               <IoLocationOutline size={24} className="text-blue-500" />
//               <p className="ml-3 text-sm">
//                 274/4 Rajasinghe Mawatha, Hewagama, Kaduwela
//               </p>
//             </div>
//           </div>

//           <div className="w-full lg:w-1/3 flex flex-col items-start p-6 bg-slate-200 rounded-md shadow-lg">
//             <p className="text-2xl font-bold mb-4">Call Us</p>
//             <div className="flex items-center">
//               <IoCallOutline size={24} className="text-green-500" />
//               <p className="ml-3 text-sm">077-6601088</p>
//             </div>
//           </div>
//         </div>
//       </div> */}
//       <div className="flex flex-col sm:flex-row border border-gray-400 py-10">
//         {/* Lest side  */}
//         <div className="w-full sm:w-1/2 flex flex-col items-center justify-center py-10 sm:py-3">
//           <div className="flex py-4">
//             <FaLocationDot className="bg-blue-200 rounded-md w-5 items-center justify-center " />
//             <div className="flex flex-col text-sm ">
//               <p>Address</p>
//               <p>Keenagahena, Dalkada , Bombuwala</p>
//             </div>
//           </div>
//           <div className="flex py-4">
//             <IoCallSharp className="bg-blue-200 rounded-md w-5 items-center justify-center " />
//             <div className="flex flex-col text-sm ">
//               <p>Call</p>
//               <p>071-3084265</p>
//             </div>
//           </div>
//           <div className="flex py-4">
//             <IoCallSharp className="bg-blue-200 rounded-md w-5 items-center justify-center " />
//             <div className="flex flex-col text-sm ">
//               <p>Call</p>
//               <p>071-3084265</p>
//             </div>
//           </div>
//         </div>
//         <div>
//           <img src="contactusright.jpeg" className="w-full" />
//         </div>
//         {/* Right Side */}
//         {/* <img src={assets.hero_img} className="w-full sm:w-1/2 " alt="" /> */}
//       </div>
//     </div>
//   );
// }

// export default ContactUs;
