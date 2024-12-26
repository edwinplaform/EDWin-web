"use client";

import Link from "next/link";
import { UserButton } from "@clerk/nextjs";

import React, { useState } from "react";
import { Button } from "antd";
import { AiOutlineCaretUp, AiOutlineCaretDown } from "react-icons/ai";
import { motion } from "framer-motion";

export const features = [
  {
    image: "/WorkFromHome.png",
    title: "Tutor anytime, anywhere",
    description:
      "Decide when and how many hours you want to teach. No minimum time commitment or fixed schedule. Be your own boss!",
  },
  {
    image: "/Money.png",
    title: "Earn for every lesson",
    description: "Choose your hourly rate and change it anytime. Earn while you are studying.",
  },
  {
    image: "/KnowledgeGrowth.png",
    title: "Knowledge Growth",
    description:
      "EDWin encourages tutors to improve new skill sets through continuous learning.",
  },
];

export const questions = [
  {
    quiz: "What is EDWin?",
    answer:
      "EDWin is the future of tutoring. Our vision is to help students reach their full potential and replace traditional (often unpopular) tutoring through innovative online teaching.",
  },
  {
    quiz: "Which subjects do your tutors cover?",
    answer:
      "We offer tutoring in all school subjects, especially Maths, Physics, and English. We are currently expanding our offering for university students as well. If you cannot see a subject you would like, please contact us.",
  },
  {
    quiz: "Is it difficult to become a tutor?",
    answer:
      "Not with our support! We’ve been providing online tutoring jobs for university students for a little while now, and are always here to help. As well as offering training and resources, we also have an awesome tutor community that you can share ideas and advice with.",
  },
  {
    quiz: "Why choose online tutoring?",
    answer:
      "Travel time and costs are eliminated. With the recording function, the lesson can be recorded and played back at any time. Short-term bookings and changes of tutors are possible thanks to the variety of tutors.",
  },
  {
    quiz: "Who are EDWin's lessons for?",
    answer:
      "The offer is suitable for pupils and students of all ages who either need help with learning or want to reach their full potential with our support.",
  },
];

const BecomeTutor = () => {
  const [expandedIndex, setExpandedIndex] = useState(null);

  const toggleQuestion = (index) => {
    setExpandedIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <div>
        <div className="mt-8 flex flex-col items-center lg:flex-row lg:justify-center">
          <div className="lg:w-1/2 p-10 text-center">
            <motion.h1
              className="text-7xl font-bold leading-tight mb-4"
              initial={{ y: -250, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1 }}
            >
              Each one <br />
              Teach one
            </motion.h1>
            <p className="text-lg mb-6 font-medium">
              Flexible, fulfilling, and fits into your schedule
            </p>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 2 }}
            >
              <Button
                type="primary"
                className="p-8 bg-sky-500 text-xl text-white rounded-lg font-semibold hover:bg-sky-600 transition duration-200 shadow-md"
              >
                Become a Tutor
              </Button>
            </motion.div>
          </div>
          <motion.div
            className="lg:w-1/2 p-6 flex justify-center lg:justify-end"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2, delay: 0.5 }}
          >
            <img
              src="/tutors.png"
              alt="Tutor Image"
              className="rounded-lg lg:w-4/5 sm:w-2/3"
            />
          </motion.div>
        </div>

        <div>
          <p className="text-2xl text-center font-semibold text-indigo-900 mt-10">
            Enjoy a world of perks while tutoring
          </p>
          <div className="flex flex-wrap mt-5 lg:mt-10 p-5">
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