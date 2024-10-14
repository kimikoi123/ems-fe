"use client";
import React, { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin, { DateClickArg } from "@fullcalendar/interaction";
import { EventClickArg, EventInput, DateInput } from "@fullcalendar/core";
import Modal from "@/components/modal/Modal";

const SCHEDULING: React.FC = () => {
  const [events, setEvents] = useState<EventInput[]>([
    { id: "1", title: "Meeting with Team", start: new Date(), allDay: false },
    {
      id: "2",
      title: "Lunch Break",
      start: new Date(),
      end: new Date(new Date().getTime() + 2 * 60 * 60 * 1000),
    },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentEvent, setCurrentEvent] = useState<Partial<EventInput> | null>(
    null
  );

  const openModal = (event?: Partial<EventInput>) => {
    setCurrentEvent(
      event || { title: "", start: new Date(), end: new Date(), allDay: false }
    );
    setIsModalOpen(true);
  };

  const handleConfirm = () => {
    if (currentEvent) {
      if (currentEvent.id) {
        setEvents((prev) =>
          prev.map((evt) =>
            evt.id === currentEvent.id ? { ...evt, ...currentEvent } : evt
          )
        );
      } else {
        const newEvent = { ...currentEvent, id: `${Date.now()}` };
        setEvents((prev) => [...prev, newEvent as EventInput]);
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
            Event Title:
            <input
              type="text"
              value={currentEvent?.title || ""}
              onChange={(e) =>
                setCurrentEvent((prev) => ({
                  ...prev,
                  title: e.target.value,
                }))
              }
              className="w-full p-2 mt-1 border rounded"
            />
          </label>
          <label className="block mb-2">
            Start Time:
            <input
              type="datetime-local"
              value={
                currentEvent?.start
                  ? new Date(currentEvent.start as string)
                      .toISOString()
                      .slice(0, 16)
                  : ""
              }
              onChange={(e) =>
                setCurrentEvent((prev) => ({
                  ...prev,
                  start: e.target.value as DateInput,
                }))
              }
              className="w-full p-2 mt-1 border rounded"
            />
          </label>
          <label className="block mb-2">
            End Time:
            <input
              type="datetime-local"
              value={
                currentEvent?.end
                  ? new Date(currentEvent.end as string)
                      .toISOString()
                      .slice(0, 16)
                  : ""
              }
              onChange={(e) =>
                setCurrentEvent((prev) => ({
                  ...prev,
                  end: e.target.value as DateInput,
                }))
              }
              className="w-full p-2 mt-1 border rounded"
            />
          </label>
        </div>
      </Modal>
    </div>
  );
};

export default SCHEDULING;
