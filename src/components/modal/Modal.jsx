import moment from "moment";
import React, { useEffect, useState } from "react";
import "./modal.scss";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  getTimeFromDate,
  getDateTime,
  getQuarter,
  calculateMinTime,
} from "../../utils/dateUtils.js";

const Modal = ({ trigger, hideModalCreateEvent, addEvent }) => {
  const defaultDateEvent = {
    date: new Date(),
    startTime: getQuarter(new Date()),
    endTime: getQuarter(
      new Date(new Date().setHours(new Date().getHours() + 1))
    ),
  };
  const [date, setDate] = useState(defaultDateEvent.date);
  const [startTime, setStartTime] = useState(defaultDateEvent.startTime);
  const [endTime, setEndTime] = useState(defaultDateEvent.endTime);
  const [dataEvent, setDataEvent] = useState({
    title: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setDataEvent((prev) => {
      return { ...prev, [name]: value };
    });
  };

  useEffect(() => {
    setDataEvent((prev) => {
      return {
        ...prev,
        date: moment(date).format("YYYY M DD"),
        dateFrom: getTimeFromDate(startTime),
        dateTo: getTimeFromDate(endTime),
      };
    });
  }, [date, startTime, endTime]);

  const resetStateModal = () => {
    setDate(defaultDateEvent.date);
    setStartTime(defaultDateEvent.startTime);
    setEndTime(defaultDateEvent.endTime);
    setDataEvent({ title: "" });
  };

  const createEvent = (e) => {
    e.preventDefault();
    const event = {
      title: dataEvent.title,
      description: dataEvent.description,
      dateFrom: getDateTime(dataEvent.date, dataEvent.dateFrom),
      dateTo: getDateTime(dataEvent.date, dataEvent.dateTo),
    };

    addEvent(event);
  };

  const getEndTime = (startTime, endTime) => {
    if (startTime >= endTime) {
      return startTime;
    }
    return endTime;
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
            resetStateModal();
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
              required
            />
            <div className="event-form__time">
              <DatePicker
                className="event-form__field date-picker"
                closeOnScroll={true}
                selected={date}
                minDate={new Date()}
                onChange={(date) => setDate(date)}
                name="date"
                onKeyDown={(e) => e.preventDefault()}
              />
              <DatePicker
                selected={startTime}
                onChange={(timeFrom) => setStartTime(timeFrom)}
                showTimeSelect
                showTimeSelectOnly
                timeIntervals={15}
                minTime={calculateMinTime(date)}
                maxTime={moment().endOf("day").toDate()}
                timeCaption="Time"
                dateFormat="p"
                className="event-form__field time-picker"
                name="startTime"
                onKeyDown={(e) => e.preventDefault()}
              />
              <span>-</span>
              <DatePicker
                selected={getEndTime(startTime, endTime)}
                onChange={(timeTo) => setEndTime(timeTo)}
                showTimeSelect
                showTimeSelectOnly
                timeIntervals={15}
                minTime={startTime}
                maxTime={moment().endOf("day").toDate()}
                dateFormat="p"
                className="event-form__field time-picker"
                name="endTime"
                onKeyDown={(e) => e.preventDefault()}
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
