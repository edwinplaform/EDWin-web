"use client";
import { useEffect, useState } from "react";
import BigCalendar from "@/components/BigCalendar";

const Schedule = () => {
  const [events, setEvents] = useState([]);

  // Assume you have the logged-in user's id (from context, props, etc.)
  const userId = "123"; // Replace with dynamic user id

  useEffect(() => {
    fetch(`http://localhost:5000/api/sessions/${userId}`)
      .then((response) => response.json())
      .then((data) => setEvents(data))
      .catch((error) => console.error("Error fetching sessions:", error));
  }, [userId]);

  return (
    <div className="p-4">
      <div className="w-full h-full bg-white p-4 rounded-md">
        <h1 className="text-xl font-semibold">Schedule</h1>
        <BigCalendar events={events} />
      </div>
    </div>
  );
};

export default Schedule;
