import React, { useEffect, useState } from "react";
import Header from "./components/header/Header.jsx";
import Calendar from "./components/calendar/Calendar.jsx";

import { getWeekStartDate, generateWeekRange } from "../src/utils/dateUtils.js";

import "./common.scss";

const App = () => {
  const [date, setDate] = useState({
    weekStartDate: new Date(),
    weekBack: null,
  });

  useEffect(() => {
    function handlerWeekBack() {
      const weekDates = generateWeekRange(getWeekStartDate(weekStartDate));
    }
  });

  const { weekStartDate } = date;
  getWeekStartDate(weekStartDate);
  const weekDates = generateWeekRange(getWeekStartDate(weekStartDate));
  return (
    <>
      <Header />
      <Calendar weekDates={weekDates} />
    </>
  );
};

export default App;
