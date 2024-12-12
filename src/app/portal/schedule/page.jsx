import BigCalendar from "@/components/BigCalendar";

const Schedule = () => {
    return(
        <div className="p-4">
                <div className="w-full h-full bg-white p-4 rounded-md">
                    <h1 className="text-xl font-semibold">Schedule</h1>
                    <BigCalendar/>
                </div>
        </div>
    )
}

export default Schedule;