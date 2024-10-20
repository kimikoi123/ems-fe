"use client";

import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin, { DateClickArg } from "@fullcalendar/interaction";
import { EventClickArg, EventInput } from "@fullcalendar/core";
import Modal from "@/components/modal/Modal";
import getAxiosClient from "@/services/axiosInstance";

const DAYS_OF_WEEK = [
  { id: "monday", label: "Monday", value: 1 },
  { id: "tuesday", label: "Tuesday", value: 2 },
  { id: "wednesday", label: "Wednesday", value: 3 },
  { id: "thursday", label: "Thursday", value: 4 },
  { id: "friday", label: "Friday", value: 5 },
  { id: "saturday", label: "Saturday", value: 6 },
  { id: "sunday", label: "Sunday", value: 0 },
];

const SCHEDULING: React.FC = () => {
  const [events, setEvents] = useState<EventInput[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentEvent, setCurrentEvent] = useState<Partial<EventInput> | null>(
    null
  );
  const [repeatDays, setRepeatDays] = useState<string[]>([]);

  useEffect(() => {
    const fetchEvents = async () => {
      const axiosClient = getAxiosClient();

      try {
        const response = await axiosClient.get("/schedules");

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const allFutureEvents = response.data.flatMap((event: any) =>
          generateRecurringEvents(event, event.availability, 12)
        );

        setEvents(allFutureEvents);
      } catch (error) {
        console.error("Failed to fetch events:", error);
      }
    };

    fetchEvents();
  }, []);

  const generateRecurringEvents = (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    event: any,
    availability: number[],
    monthsAhead: number
  ) => {
    const futureEvents = [];
    const today = new Date();

    for (let i = 0; i < monthsAhead; i++) {
      const firstDayOfMonth = new Date(
        today.getFullYear(),
        today.getMonth() + i,
        1
      );

      while (firstDayOfMonth.getMonth() === (today.getMonth() + i) % 12) {
        if (availability.includes(firstDayOfMonth.getDay())) {
          const startDate = new Date(
            firstDayOfMonth.getFullYear(),
            firstDayOfMonth.getMonth(),
            firstDayOfMonth.getDate(),
            new Date(event.shiftStart).getHours(),
            new Date(event.shiftStart).getMinutes()
          );

          const endDate = new Date(
            firstDayOfMonth.getFullYear(),
            firstDayOfMonth.getMonth(),
            firstDayOfMonth.getDate(),
            new Date(event.shiftEnd).getHours(),
            new Date(event.shiftEnd).getMinutes()
          );

          futureEvents.push({
            id: `${event.id}-${firstDayOfMonth.getTime()}`,
            title: `Shift (${event.availability.join(", ")})`,
            start: startDate,
            end: endDate,
          });
        }

        firstDayOfMonth.setDate(firstDayOfMonth.getDate() + 1);
      }
    }

    return futureEvents;
  };

  const openModal = (event?: Partial<EventInput>) => {
    setCurrentEvent(
      event || { start: new Date(), end: new Date(), allDay: false }
    );
    setRepeatDays([]);
    setIsModalOpen(true);
  };

  const handleDayToggle = (dayId: string) => {
    setRepeatDays((prev) =>
      prev.includes(dayId)
        ? prev.filter((day) => day !== dayId)
        : [...prev, dayId]
    );
  };

  const transformDaysToNumbers = () => {
    return repeatDays
      .map((dayId) => DAYS_OF_WEEK.find((day) => day.id === dayId)?.value)
      .filter((value) => value !== undefined) as number[];
  };

  const handleConfirm = async () => {
    if (currentEvent) {
      const axiosClient = getAxiosClient();
      //TODO: This might change
      const newEvent = {
        availability: transformDaysToNumbers(),
        shiftStart: currentEvent.start,
        shiftEnd: currentEvent.end,
        user_id: 1,
      };

      try {
        await axiosClient.post("/schedules", newEvent);
        setEvents((prev) => [
          ...prev,
          { ...newEvent, id: Date.now().toString() },
        ]);
      } catch (error) {
        console.error("Failed to save event:", error);
      }
    }
    setIsModalOpen(false);
  };

  const handleDateClick = (arg: DateClickArg) => {
    openModal({ start: arg.date, end: new Date(arg.date.getTime() + 3600000) });
  };

  const handleEventClick = (arg: EventClickArg) => {
    const { id, title, start, end } = arg.event;
    openModal({
      id,
      title,
      start: start ? new Date(start.toString()) : undefined,
      end: end ? new Date(end.toString()) : undefined,
    });
  };

  const handleDelete = async () => {
    if (currentEvent) {
      const axiosClient = getAxiosClient();
      try {
        await axiosClient.delete(`/schedules/${currentEvent.id}`); // Adjust the endpoint as needed
        setEvents((prev) =>
          prev.filter((event) => event.id !== currentEvent.id)
        );
      } catch (error) {
        console.error("Failed to delete event:", error);
      }
      setIsModalOpen(false);
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Scheduling Page</h1>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        editable={true}
        selectable={true}
        events={events}
        dateClick={handleDateClick}
        eventClick={handleEventClick}
        height="auto"
      />
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirm}
      >
        <div>
          <label className="block mb-2">
            Start Time:
            <input
              type="time"
              value={
                currentEvent?.start
                  ? new Date(currentEvent.start as string).toLocaleTimeString(
                      [],
                      {
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: false,
                      }
                    )
                  : ""
              }
              onChange={(e) => {
                const timeParts = e.target.value.split(":");
                const hours = parseInt(timeParts[0]);
                const minutes = parseInt(timeParts[1]);
                setCurrentEvent((prev) => ({
                  ...prev,
                  start: new Date(
                    new Date().setHours(hours, minutes)
                  ).toISOString(),
                }));
              }}
              className="w-full p-2 mt-1 border rounded"
            />
          </label>
          <label className="block mb-2">
            End Time:
            <input
              type="time"
              value={
                currentEvent?.end
                  ? new Date(currentEvent.end as string).toLocaleTimeString(
                      [],
                      {
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: false,
                      }
                    )
                  : ""
              }
              onChange={(e) => {
                const timeParts = e.target.value.split(":");
                const hours = parseInt(timeParts[0]);
                const minutes = parseInt(timeParts[1]);
                setCurrentEvent((prev) => ({
                  ...prev,
                  end: new Date(
                    new Date().setHours(hours, minutes)
                  ).toISOString(),
                }));
              }}
              className="w-full p-2 mt-1 border rounded"
            />
          </label>
          <div className="mt-4">
            <span className="block mb-2 font-medium">Repeat on:</span>
            <div className="grid grid-cols-2 gap-2">
              {DAYS_OF_WEEK.map((day) => (
                <label key={day.id} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={repeatDays.includes(day.id)}
                    onChange={() => handleDayToggle(day.id)}
                    className="h-4 w-4"
                  />
                  <span>{day.label}</span>
                </label>
              ))}
            </div>
          </div>
          {currentEvent?.id && (
            <button
              onClick={handleDelete}
              className="mt-4 px-4 py-2 bg-red-500 text-white rounded"
            >
              Delete Event
            </button>
          )}
        </div>
      </Modal>
    </div>
  );
};

export default SCHEDULING;
