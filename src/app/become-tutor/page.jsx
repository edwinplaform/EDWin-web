"use client";

import { features } from "../constants";
import { questions } from "../constants";
import Navbar from "@components/components/Navbar";
import React, { useState } from "react";
import { Button } from "antd";
import { AiOutlineCaretUp, AiOutlineCaretDown } from "react-icons/ai";
import { motion } from "motion/react";

const BecomeTutor = () => {
  const [expandedIndex, setExpandedIndex] = useState(null);

  const toggleQuestion = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <Navbar />
      <div>
        {/* Header Section */}
        <div className="mt-8 flex flex-col items-center lg:flex-row lg:justify-center">
          <div className="lg:w-1/2 p-10 text-center">
            <motion.h1
              className="text-7xl font-bold leading-tight mb-4"
              initial={{ y:-250,opacity:0}}
              animate={{ y:0,opacity:1 }}
              transition={{ duration: 1 }}
            >
              Each one <br />
              Teach one
            </motion.h1>
            <p className="text-lg mb-6 font-medium">
              Flexible, fulfilling and fits into your schedule
            </p>
            <Button
              type="primary"
              className="p-8 bg-sky-500 text-xl text-white rounded-lg font-semibold hover:bg-sky-600 transition duration-200 shadow-md"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{duration:2}}>
              Become a Tutor
            </Button>
          </div>
          <motion.div
            className="lg:w-1/2 p-6 flex justify-center lg:justify-end"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2,delay:0.5 }}
          >
            <img
              src="/tutors.png"
              alt="Tutor Image"
              className="rounded-lg lg:w-4/5 sm:w-2/3"
            />
          </motion.div>
        </div>

        {/* Features Section */}
        <div>
          <p className="text-2xl text-center font-semibold text-indigo-900 mt-10">
            Enjoy a world of perks while tutoring
          </p>
          <div className="flex flex-wrap mt-5 lg:mt-10 p-5" >
            {features.map((feature, index) => (
              <div key={index} className="w-full sm:w-1/2 lg:w-1/3">
                <div className="flex">
                  <div>
                    <img src={feature.image} className="p-5" />
                    <h5 className="text-2xl font-semibold text-center mt-1 mb-6">
                      {feature.title}
                    </h5>
                    <p className="text-lg mb-20 p-2 text-neutral-500 text-center ">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <p className="text-2xl text-center font-semibold text-indigo-900">
            Become a tutor in three simple steps
          </p>
          <div className="flex flex-wrap mt-5 lg:mt-8 p-5">
            <div className="w-full sm:w-1/2 lg:w-1/3 text-center p-4">
              <div className="inline-flex items-center justify-center w-10 h-10 mb-2 text-white text-xl font-bold bg-blue-500 rounded-full">
                1
              </div>
              <p className="text-lg font-semibold">Sign Up</p>
              <p className="text-sm">To create your tutor profile</p>
            </div>

            <div className="w-full sm:w-1/2 lg:w-1/3 text-center p-4">
              <div className="inline-flex items-center justify-center w-10 h-10 mb-2 text-white text-xl font-bold bg-blue-500 rounded-full">
                2
              </div>
              <p className="text-lg font-semibold">Get approved</p>
              <p className="text-sm">by our team in 5 business days</p>
            </div>

            <div className="w-full sm:w-1/2 lg:w-1/3 text-center p-4">
              <div className="inline-flex items-center justify-center w-10 h-10 mb-2 text-white text-xl font-bold bg-blue-500 rounded-full">
                3
              </div>
              <p className="text-lg font-semibold">Start Teaching</p>
              <p className="text-sm">Begin your tutoring journey</p>
            </div>
          </div>
          <div className="flex justify-center">
            <Button
              type="primary"
              className="p-7 bg-sky-500 text-xl text-white rounded-lg font-semibold hover:bg-sky-600 transition duration-200 shadow-md"
            >
              Become a Tutor
            </Button>
          </div>
          <hr className="my-10 border-neutral-500 mx-2"></hr>
        </div>

        {/* FAQ Section */}
        <div>
          <p className="text-2xl text-center font-semibold text-indigo-900">
            Frequently Asked Questions
          </p>
          <div className="flex flex-col items-center mt-5 lg:mt-10 p-5 space-y-4 lg:space-y-6">
            {questions.map((question, index) => (
              <div
                key={index}
                className="w-full p-5 rounded-lg shadow-lg lg:w-1/2 cursor-pointer"
                onClick={() => toggleQuestion(index)}
              >
                <div className="flex justify-between items-center">
                  <h5 className="text-xl font-semibold">{question.quiz}</h5>
                  {expandedIndex === index ? (
                    <AiOutlineCaretUp className="text-xl text-blue-600" />
                  ) : (
                    <AiOutlineCaretDown className="text-xl text-blue-600" />
                  )}
                </div>
                {expandedIndex === index && (
                  <p className="text-md mt-4 text-neutral-700 p-3 border-t border-gray-300">
                    {question.answer}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default BecomeTutor;