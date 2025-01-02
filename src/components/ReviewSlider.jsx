import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import ReviewCard from "./ReviewCard";

const ReviewSlider = () => {
  const [positionIndexes, setPositionIndexes] = useState([0, 1, 2, 3, 4, 5, 6, 7]);

  const Reviews = [
    {
      name: "Kaveesha Hewage",
      country: "Sri Lanka",
      image: "https://images.pexels.com/photos/1520760/pexels-photo-1520760.jpeg?cs=srgb&dl=pexels-doquyen-1520760.jpg&fm=jpg&_gl=1*wjp9cu*_ga*MTg2Njc3MjIyMS4xNzMzNzM0ODU3*_ga_8JE65Q40S6*MTczNTY1NDUwNy41LjEuMTczNTY1NDUwOC4wLjAuMA..",
      role: "Tutor",
      review: "As a teacher, I never felt teaching was this easy. The EDWin platform is very flexible and always thinks about the quality of education. With the platform, I can do tutoring to a large number of students. Since the platform maintains its transparency with users there are no hidden fees.",
      flagSrc:"/lanka.png",
  },
  {
      name: "John Doe",
      country: "USA",
      image: "https://images.pexels.com/photos/3119215/pexels-photo-3119215.jpeg?cs=srgb&dl=pexels-whynugrohou-3119215.jpg&fm=jpg&_gl=1*1srwo3r*_ga*MTg2Njc3MjIyMS4xNzMzNzM0ODU3*_ga_8JE65Q40S6*MTczNTY1MTc3Ny40LjEuMTczNTY1MjMwMi4wLjAuMA..",
      review: "As a tutor, EDWin has transformed the way I teach. The interactive tools allow me to engage with students like never before, ensuring they understand the concepts thoroughly. Plus, the ability to schedule classes and share resources seamlessly makes my job so much easier.",
      flagSrc:"/usa.png",
      role:"Tutor"
  },
  {
      name: "Jane Smith",
      country: "UK",
      image: "https://images.pexels.com/photos/1820559/pexels-photo-1820559.jpeg?cs=srgb&dl=pexels-mwabonje-1820559.jpg&fm=jpg&_gl=1*wqa2ty*_ga*MTg2Njc3MjIyMS4xNzMzNzM0ODU3*_ga_8JE65Q40S6*MTczNTY2NjMzOC44LjEuMTczNTY2NjM0Ni4wLjAuMA..",
      review: "Learning on EDWin is such an amazing experience. The platform is easy to use, and the variety of tools and resources makes every subject interesting. I love how I can revisit recorded lessons whenever I need to.",
      role:"Student",
      flagSrc:"/uk.png",
  },
  {
      name: "Seo Jun",
      country: "South Korea",
      image: "https://images.pexels.com/photos/3394658/pexels-photo-3394658.jpeg?cs=srgb&dl=pexels-sound-on-3394658.jpg&fm=jpg&_gl=1*diukwo*_ga*MTg2Njc3MjIyMS4xNzMzNzM0ODU3*_ga_8JE65Q40S6*MTczNTY2OTk4Ni45LjEuMTczNTY2OTk4Ni4wLjAuMA..",
      review: "EDWin is a game-changer for educators. It enables me to focus more on delivering quality lessons instead of worrying about administrative tasks. The platform's analytics also help me track student progress, allowing me to adapt my teaching methods for better outcomes.",
      role:"Tutor",
      flagSrc:"/korea.png",
  },
  {
      name: "Arshad Ahamed",
      country: "Bangladesh",
      image: "https://images.pexels.com/photos/3649765/pexels-photo-3649765.jpeg?cs=srgb&dl=pexels-artisticakshay-3649765.jpg&fm=jpg&_gl=1*232zgc*_ga*MTg2Njc3MjIyMS4xNzMzNzM0ODU3*_ga_8JE65Q40S6*MTczNTY2OTk4Ni45LjEuMTczNTY3MDk1My4wLjAuMA..",
      review: "EDWin has made studying more efficient and enjoyable. The ability to directly ask questions during live sessions and get instant feedback helps me grasp concepts faster. It's like having a tutor available all the time.",
      role:"Student",
      flagSrc:"/bangl.png",
  },
  {
      name: "Jade Mael",
      country: "France",
      image: "https://images.pexels.com/photos/3370021/pexels-photo-3370021.jpeg?cs=srgb&dl=pexels-israel-oliveira-1733015-3370021.jpg&fm=jpg&_gl=1*1o6ebtp*_ga*MTg2Njc3MjIyMS4xNzMzNzM0ODU3*_ga_8JE65Q40S6*MTczNTY2OTk4Ni45LjEuMTczNTY2OTk4Ni4wLjAuMA..",
      review: "With EDWin, teaching feels like a breeze. The platform's intuitive interface and robust support ensure I can focus solely on educating my students. Its inclusive features make it easy to cater to students with different learning styles, truly enhancing the learning experience.",
      role:"Tutor",
      flagSrc:"/france.png",
  },
  {
      name: "Raja Kapoor",
      country: "India",
      image: "https://images.pexels.com/photos/4129015/pexels-photo-4129015.jpeg?cs=srgb&dl=pexels-roseleon-4129015.jpg&fm=jpg&_gl=1*a7lrs1*_ga*MTg2Njc3MjIyMS4xNzMzNzM0ODU3*_ga_8JE65Q40S6*MTczNTY2OTk4Ni45LjEuMTczNTY3MDgwMS4wLjAuMA..",
      review: "As a student, EDWin feels like a classroom in my pocket. Whether it's live classes, practice quizzes, or downloadable resources, everything I need is just a click away. The platform motivates me to stay on top of my studies.",
      role:"Student",
      flagSrc:"/indian.png",
  },
  
  ];

  const positions = ["hidden", "left", "left1", "center", "right1", "right", "hidden"];

  const cardVariants = {
    hidden: { x: "-100%", scale: 0, opacity: 0, zIndex: 0 },
    left: { x: "-90%", scale: 0.7, opacity: 0.5, zIndex: 1 },
    left1: { x: "-50%", scale: 0.8, opacity: 0.8, zIndex: 2 },
    center: { x: "0%", scale: 1, opacity: 1, zIndex: 5 },
    right1: { x: "50%", scale: 0.8, opacity: 0.8, zIndex: 2 },
    right: { x: "90%", scale: 0.7, opacity: 0.5, zIndex: 1 },
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setPositionIndexes((prevIndexes) =>
        prevIndexes.map((index) => (index + 1) % Reviews.length)
      );
    }, 3000);

    return () => clearInterval(interval);
  }, [Reviews.length]);

  return (
    <div className="relative flex items-center justify-center bg-blue-100 h-screen overflow-hidden">
      <div className="flex justify-center items-center w-full max-w-5xl h-full relative">
        {Reviews.map((review, index) => (
          <motion.div
            key={index}
            initial="center"
            animate={positions[positionIndexes[index]]}
            variants={cardVariants}
            transition={{ duration: 0.5 }}
            className="absolute"
          >
            <ReviewCard
              imageSrc={review.image}
              name={review.name}
              country={review.country}
              role={review.role}
              review={review.review}
              flagSrc={review.flagSrc}
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ReviewSlider;
