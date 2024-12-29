import React from "react";
import Image from "next/image";

const WhyEDWin = () => {
  const features = [
    {
      title: "One-to-One Education",
      description:
        "EDWin delivers one-to-one education tailored to students' unique needs. Our student-focused platform empowers individuals to achieve their goals through a personalized, supportive, and engaging educational experience designed for success.",
      icon: "/onetoone.svg",
    },
    {
      title: "Qualified Tutors",
      description:
        "At EDWin, we onboard qualified, highly-educated tutors. Prioritizing excellence, we ensure students receive expert guidance for a focused and impactful learning journey tailored to their individual needs, fostering growth and academic success effectively.",
      icon: "/qualified.svg",
    },
    {
      title: "Flexible Schedules",
      description:
        "EDWin empowers users with flexibility to choose preferred tutors and schedule sessions at convenient times, providing a personalized and seamless education experience designed to meet individual learning goals effectively and efficiently.",
      icon: "/flexible.svg",
    },
    {
      title: "In-platform storage",
      description:
        "EDWin features interactive classrooms connecting tutors and students seamlessly. Each classroom offers secure online storage, enabling easy access to shared resources and materials for an effective, streamlined, and personalized learning experience.",
      icon: "/files.svg",
    },
  ];

  return (
    <div className="bg-white py-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {features.map((feature, index) => (
            <div key={index} className="">
              
              <div className="flex justify-center mb-4">
                <img
                  src={feature.icon}
                  alt={feature.title}
                  className="h-16 w-16" 
                />
              </div>
              {/* Title */}
              <h3 className="text-xl font-semibold text-blue-900 mb-2 text-center">
                {feature.title}
              </h3>
              {/* Description */}
              <p className="text-black text-justify">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WhyEDWin;
