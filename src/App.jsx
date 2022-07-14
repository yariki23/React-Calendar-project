import React, { useEffect, useState } from "react";
import Header from "./components/header/Header.jsx";
import Calendar from "./components/calendar/Calendar.jsx";
import moment from "moment";

import { getWeekStartDate, generateWeekRange } from "../src/utils/dateUtils.js";

import "./common.scss";

const App = () => {
  const [date, setDate] = useState(moment());
  const [count, setCount] = useState(0);

  const handlerWeekBack = () => {
    setDate(date.subtract(7, "days"));
    setCount(count + 1);
  };
  const handlerWeekNext = () => {
    setDate(date.add(7, "days"));
    setCount(count - 1);
  };

  const handleToDay = () => {
    setDate(moment());
  };

  const weekDates = generateWeekRange(getWeekStartDate(date._d));

  return (
    <>
      <Header
        handlerWeekBack={handlerWeekBack}
        handlerWeekNext={handlerWeekNext}
        handleToDay={handleToDay}
        weekDates={weekDates}
      />
      <Calendar weekDates={weekDates} />
    </>
  );
};

export default App;
