"use client";
import React from "react";
import BigCalendar from "@/components/BigCalendar";
import {useCreateUser} from "@/hooks/useUsers";
import {usePaidSessionByStudentId, useSessionsByTutorId} from "@/hooks/useSessions";
import {Spin} from "antd";

const Schedule = () => {

    const user = useCreateUser();
    const userId = user?.id;
    const userRole = user?.role || "STUDENT";

    const {data: tutorSessions, isLoading: tutorLoading} = useSessionsByTutorId(
        userRole === "TUTOR" ? userId : null
    );

    const {data: studentSessions, isLoading: studentLoading} = usePaidSessionByStudentId(
        userRole === "STUDENT" ? userId : null
    );

    const formatEvents = (sessions) => {
        if (!sessions) return [];
        return sessions.map((session) => ({
            id: session.id,
            title: `${session.subject} ${userRole === "TUTOR" ? `(Student: ${session.student?.firstName})` : `(Tutor: ${session.tutor?.firstName})`}`,
            start: new Date(`${session.date}T${session.startTime}`),
            end: new Date(`${session.date}T${session.endTime}`),
            resource: {
                zoomLink: session.zoomLink,
                materialUrl: session.materialUrl,
            },
        }));
    };

    const events = userRole === "TUTOR"
        ? formatEvents(tutorSessions)
        : formatEvents(studentSessions);

    if (tutorLoading || studentLoading) {
        return <div className="flex justify-center items-center min-h-screen">
            <Spin size="large"/>
        </div>;
    }

    return (
        <div className="p-4">
            <div className="w-full h-full bg-white p-4 rounded-md">
                <h1 className="text-xl font-semibold">Schedule</h1>
                <BigCalendar events={events}/>
            </div>
        </div>
    );
};

export default Schedule;
