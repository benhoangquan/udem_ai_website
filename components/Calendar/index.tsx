import React, { useState, useEffect } from "react";
import {
    addMonths,
    subMonths,
    format,
    startOfMonth,
    endOfMonth,
    startOfWeek,
    endOfWeek,
    eachDayOfInterval,
    parseISO,
} from "date-fns";
import { getEvents } from "@/lib/service";

// Define TypeScript interface for the event data structure with optional fields
interface EventType {
    title: string | null;
    eventDetails?: {
        eventDateTime?: string | null;
        eventType?: {
            nodes?: Array<{
                name?: string | null;
            }> | null;
        } | null;
        registrationLink?: string | null;
        location?: {
            city?: string | null;
            streetAddress?: string | null;
        } | null;
        description?: string | null;
    } | null;
}

const CalendarPrototype: React.FC = () => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [events, setEvents] = useState<EventType[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                setIsLoading(true);
                const eventsData = await getEvents();
                // Filter out events with invalid data
                const validEvents = eventsData?.filter((event: EventType) => 
                    event && event.title && event.eventDetails?.eventDateTime
                ) || [];
                setEvents(validEvents);
                setError(null);
            } catch (err) {
                setError('Failed to fetch events. Please try again later.');
                console.error('Error fetching events:', err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchEvents();
    }, []); // Fetch events when component mounts

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
    const currentMonthEvents = events.filter((event) => {
        try {
            if (!event?.eventDetails?.eventDateTime) return false;
            const eventDate = parseISO(event.eventDetails.eventDateTime);
            return (
                eventDate.getMonth() === currentDate.getMonth() &&
                eventDate.getFullYear() === currentDate.getFullYear()
            );
        } catch (err) {
            console.error('Error parsing event date:', err);
            return false;
        }
    });

    if (isLoading) {
        return <div className="text-center py-8 text-white">Loading events...</div>;
    }

    if (error) {
        return <div className="text-center py-8 text-red-500">{error}</div>;
    }

    return (
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-4 p-4">
                {/* Left side: Monthly calendar */}
                <div className="w-full lg:w-1/2 rounded-lg shadow-md p-4 bg-gray-800">
                    <div className="flex justify-between items-center mb-4">
                        <button onClick={goToPrevMonth} className="px-3 py-1.5 hover:bg-gray-700 rounded-md transition-colors text-white">
                            Previous
                        </button>
                        <h2 className="text-lg font-bold text-white">{format(currentDate, "MMMM yyyy")}</h2>
                        <button onClick={goToNextMonth} className="px-3 py-1.5 hover:bg-gray-700 rounded-md transition-colors text-white">
                            Next
                        </button>
                    </div>
                    <div className="grid grid-cols-7 gap-2">
                        {/* Weekday Headers */}
                        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                            <div key={day} className="font-bold text-center py-2 text-white">
                                {day}
                            </div>
                        ))}
                        {/* Calendar Days */}
                        {days.map((day, index) => {
                            const isCurrentMonth = day.getMonth() === currentDate.getMonth();
                            const hasEvent = currentMonthEvents.some(
                                event => {
                                    try {
                                        if (!event?.eventDetails?.eventDateTime) return false;
                                        const eventDate = parseISO(event.eventDetails.eventDateTime);
                                        return eventDate.getDate() === day.getDate() &&
                                               eventDate.getMonth() === day.getMonth();
                                    } catch {
                                        return false;
                                    }
                                }
                            );
                            return (
                                <div
                                    key={index}
                                    className={`p-2 text-center rounded-md ${
                                        isCurrentMonth ? "text-white" : "text-gray-500"
                                    } ${hasEvent ? "ring-2 ring-blue-500 font-semibold" : ""}`}
                                >
                                    {format(day, "d")}
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Right side: Scrollable events list */}
                <div className="w-full lg:w-1/2 rounded-lg shadow-md p-4 bg-gray-800">
                    <h2 className="text-xl font-bold mb-4 text-white">Events</h2>
                    <div className="h-[400px] overflow-y-auto">
                        {currentMonthEvents.length === 0 ? (
                            <p className="text-center py-4 text-white">No events for this month.</p>
                        ) : (
                            <div className="space-y-4">
                                {currentMonthEvents.map((event, index) => (
                                    <div key={index} className="p-4 bg-gray-900 rounded-lg">
                                        <h3 className="font-semibold text-lg text-white">
                                            {event.title || 'Untitled Event'}
                                        </h3>
                                        {event.eventDetails?.eventDateTime && (
                                            <p className="text-sm text-gray-300">
                                                {format(parseISO(event.eventDetails.eventDateTime), "PPP")}
                                            </p>
                                        )}
                                        {event.eventDetails?.description && (
                                            <div 
                                            className="text-gray-300 mb-4"
                                            dangerouslySetInnerHTML={{ __html: event.eventDetails?.description}}
                                            />
                                        )}
                                        {(event.eventDetails?.location?.city || event.eventDetails?.location?.streetAddress) && (
                                            <p className="text-sm text-gray-400 mt-2">
                                                {[
                                                    event.eventDetails.location.city,
                                                    event.eventDetails.location.streetAddress
                                                ].filter(Boolean).join(', ')}
                                            </p>
                                        )}
                                        {event.eventDetails?.eventType?.nodes?.[0]?.name && (
                                            <span className="inline-block mt-2 px-2 py-1 bg-blue-900 text-blue-200 text-xs rounded-full">
                                                {event.eventDetails.eventType.nodes[0].name}
                                            </span>
                                        )}
                                        {event.eventDetails?.registrationLink && (
                                            <a
                                                href={event.eventDetails.registrationLink}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="block mt-3 text-sm text-blue-400 hover:text-blue-300"
                                            >
                                                Register for event
                                            </a>
                                        )}
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