import React, { useState } from "react";
import {
    addMonths,
    subMonths,
    format,
    startOfMonth,
    endOfMonth,
    startOfWeek,
    endOfWeek,
    eachDayOfInterval,
} from "date-fns";

// Local calendar data sample
const localEvents = [
    { id: 1, title: "Team Meeting", date: "2025-03-12", description: "Discuss project progress" },
    { id: 2, title: "React Workshop", date: "2025-03-15", description: "Learn about React hooks" },
    { id: 3, title: "Networking Event", date: "2025-03-20", description: "Meet industry professionals" },
    { id: 4, title: "Hackathon", date: "2025-04-05", description: "Build innovative projects" },
];

const CalendarPrototype: React.FC = () => {
    const [currentDate, setCurrentDate] = useState(new Date());

    // Get the start and end of the month to build the calendar grid
    const monthStart = startOfMonth(currentDate);
    const monthEnd = endOfMonth(currentDate);
    const startDate = startOfWeek(monthStart, { weekStartsOn: 0 });
    const endDate = endOfWeek(monthEnd, { weekStartsOn: 0 });

    // Create an array for each day to display in the grid
    const days = eachDayOfInterval({ start: startDate, end: endDate });

    // Month navigation handlers
    const goToPrevMonth = () => setCurrentDate(subMonths(currentDate, 1));
    const goToNextMonth = () => setCurrentDate(addMonths(currentDate, 1));

    // Filter events for the current month
    const currentMonthEvents = localEvents.filter((event) => {
        const eventDate = new Date(event.date);
        return (
            eventDate.getMonth() === currentDate.getMonth() &&
            eventDate.getFullYear() === currentDate.getFullYear()
        );
    });

    return (
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-4 p-4">
                {/* Left side: Monthly calendar */}
                <div className="w-full lg:w-1/2 rounded-lg shadow-md p-4">
                    <div className="flex justify-between items-center mb-4">
                        <button onClick={goToPrevMonth} className="px-3 py-1.5 hover:bg-gray-300 rounded-md transition-colors">
                            Previous
                        </button>
                        <h2 className="text-lg font-bold">{format(currentDate, "MMMM yyyy")}</h2>
                        <button onClick={goToNextMonth} className="px-3 py-1.5 hover:bg-gray-300 rounded-md transition-colors">
                            Next
                        </button>
                    </div>
                    <div className="grid grid-cols-7 gap-2">
                        {/* Weekday Headers */}
                        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                            <div key={day} className="font-bold text-center py-2">
                                {day}
                            </div>
                        ))}
                        {/* Calendar Days */}
                        {days.map((day, index) => {
                            const isCurrentMonth = day.getMonth() === currentDate.getMonth();
                            const hasEvent = currentMonthEvents.some(
                                event => new Date(event.date).getDate() === day.getDate() &&
                                        new Date(event.date).getMonth() === day.getMonth()
                            );
                            return (
                                <div
                                    key={index}
                                    className={`p-2 text-center rounded-md ${
                                        isCurrentMonth ? "" : "text-gray-400 bg-gray-700"
                                    } ${hasEvent ? "ring-2 ring-blue-500 font-semibold" : ""}`}
                                >
                                    {format(day, "d")}
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Right side: Scrollable events list */}
                <div className="w-full lg:w-1/2 rounded-lg shadow-md p-4">
                    <h2 className="text-xl font-bold mb-4">Events</h2>
                    <div className="h-[400px] overflow-y-auto">
                        {currentMonthEvents.length === 0 ? (
                            <p className="text-center py-4">No events for this month.</p>
                        ) : (
                            <div className="space-y-4">
                                {currentMonthEvents.map((event) => (
                                    <div key={event.id} className="p-4 bg-gray-900 rounded-lg">
                                        <h3 className="font-semibold text-lg">{event.title}</h3>
                                        <p className="text-sm text-gray-600">{format(new Date(event.date), "PPP")}</p>
                                        <p className="text-sm text-gray-700 mt-2">{event.description}</p>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CalendarPrototype;