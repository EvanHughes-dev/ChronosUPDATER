import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import {
  GetNeededSchedule,
  SaveDay,
  IncrementWeek,
  GetWeekInt,
  GetDayOfWeek,
  SendAllData,
} from "../ScheduleHandle.jsx"; // External support functions

const PeriodNum = [1, 2, 3, 4, 5, 6, 7, 8];
const LetterDays = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L"];

/**
 * Main schedule component
 */
const DefaultSchedule = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Redirect if on root path
  useEffect(() => {
    if (location.pathname === "/") {
      navigate("/Default");
    }
  }, [location, navigate]);

  // State to track schedule for each period
  const [scheduleData, setScheduleData] = useState(
    Array(8).fill({ name: "", start: "00:00", end: "00:00" })
  );

  // Track current letter day
  const [letterDay, setLetterDay] = useState("X");

  // Track current week day (display only)
  const [weekDayText, setWeekDayText] = useState("Day of week: Monday");

  // Handle letter day changes
  useEffect(() => {
    if (letterDay === "X") {
      clearSchedule();
    } else {
      setDefault();
    }
  }, [letterDay]);

  /**
   * Clears the schedule state
   */
  function clearSchedule() {
    setScheduleData(Array(8).fill({ name: "", start: "00:00", end: "00:00" }));
  }

  /**
   * Loads the default schedule for the selected letter day
   */
  function setDefault() {
    const schedule = GetNeededSchedule(letterDay, "Fresh");
    const periods = Object.keys(schedule);

    const updated = periods.map((period) => ({
      name: period,
      start: schedule[period][0],
      end: schedule[period][1],
    }));

    // Fill any missing periods with blank values
    while (updated.length < 8) {
      updated.push({ name: "", start: "00:00", end: "00:00" });
    }

    setScheduleData(updated);
  }

  /**
   * Move to the next day of the week and update UI
   */
  function nextDay() {
    ["Fresh", "Sen"].forEach((level) => SaveDay(level));
    clearSchedule();
    IncrementWeek();

    const weekInt = GetWeekInt();
    if (weekInt < 5) {
      setWeekDayText("Day of week: " + GetDayOfWeek());
    } else {
      setWeekDayText("Send it");
    }
  }

  /**
   * Auto-fill the whole week based on selected letter day
   */
  function autoFillWeek() {
    if (letterDay !== "X") {
      for (let i = 0; i < 5; i++) {
        setDefault();
        ["Fresh", "Sen"].forEach((level) => SaveDay(level));
        IncrementWeek();
        if (i !== 4) {
          nextLetterDay();
        } else {
          setLetterDay("X");
        }
      }
      sendData();
    } else {
      alert("Cannot auto-fill. Start day not defined.");
    }
  }

  /**
   * Submits all schedule data
   */
  function sendData() {
    ["Fresh", "Sen"].forEach((grade) => SendAllData(grade));
    clearSchedule();
  }

  /**
   * Select next letter day in the cycle
   */
  function nextLetterDay() {
    const currentIndex = LetterDays.indexOf(letterDay);
    const nextIndex = (currentIndex + 1) % LetterDays.length;
    setLetterDay(LetterDays[nextIndex]);
  }

  return (
    <div>
      <div className='DayOfWeek'>{weekDayText}</div>

      <div>
        <select
          onChange={(e) => setLetterDay(e.target.value)}
          value={letterDay}
        >
          <option value='X'>Off School</option>
          {LetterDays.map((d) => (
            <option key={d} value={d}>
              {d}
            </option>
          ))}
        </select>

        <div>
          {PeriodNum.map((number, index) => (
            <div key={number} className='inputFieldHolder'>
              <label>Period {number}</label>
              <input
                className='inputField'
                type='text'
                value={scheduleData[index]?.name || ""}
                readOnly
              />
              <input
                className='inputField'
                type='time'
                value={scheduleData[index]?.start || "00:00"}
                readOnly
              />
              <input
                className='inputField'
                type='time'
                value={scheduleData[index]?.end || "00:00"}
                readOnly
              />
            </div>
          ))}
        </div>

        <div>
          <button onClick={nextDay} id='NextDay'>
            Next Day
          </button>
          <button onClick={autoFillWeek} id='Autofill'>
            Auto-Fill
          </button>
          <button onClick={sendData} name='SendIt' value='Set'>
            Submit data
          </button>
        </div>
      </div>
    </div>
  );
};

export default DefaultSchedule;
