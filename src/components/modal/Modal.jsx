import React, { useState } from "react";
import events from "../../gateway/events.js";
import "./modal.scss";

const Modal = ({ trigger, hideModalCreateEvent, addEvent }) => {
  const [dataEvent, setDataEvent] = useState({});

  const handleChange = (event) => {
    const { name, value } = event.target;
    setDataEvent((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const resetStateModal = () => {
    setDataEvent({});
  };

  const createEvent = (e) => {
    e.preventDefault();
    const event = {
      id: events.length + 1,
      title: dataEvent.title,
      description: dataEvent.description,
      dateFrom: new Date(`${dataEvent.date} ${dataEvent.startTime}`),
      dateTo: new Date(`${dataEvent.date} ${dataEvent.endTime}`),
    };

    addEvent(event);
  };

  if (!trigger) {
    return null;
  }
  return (
    <div className="modal overlay">
      <div className="modal__content">
        <div
          className="create-event"
          onSubmit={(e) => {
            createEvent(e);
            hideModalCreateEvent();
          }}
        >
          <button
            className="create-event__close-btn"
            onClick={() => {
              hideModalCreateEvent();
              resetStateModal();
            }}
          >
            +
          </button>
          <form className="event-form">
            <input
              type="text"
              name="title"
              placeholder="Title"
              className="event-form__field"
              value={dataEvent.title}
              onChange={handleChange}
            />
            <div className="event-form__time">
              <input
                type="date"
                name="date"
                className="event-form__field"
                value={dataEvent.date}
                onChange={handleChange}
              />
              <input
                type="time"
                name="startTime"
                className="event-form__field"
                value={dataEvent.dateFrom}
                onChange={handleChange}
              />
              <span>-</span>
              <input
                type="time"
                name="endTime"
                className="event-form__field"
                value={dataEvent.dateFrom}
                onChange={handleChange}
              />
            </div>
            <textarea
              name="description"
              placeholder="Description"
              className="event-form__field"
              value={dataEvent.description}
              onChange={handleChange}
            ></textarea>
            <button type="submit" className="event-form__submit-btn">
              Create
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Modal;
