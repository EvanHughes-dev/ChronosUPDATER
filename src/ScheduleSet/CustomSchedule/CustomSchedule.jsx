import "./CustomSchedule.css";

import { useEffect, useState } from "react";

import { db } from "../ScheduleHandle";
import { getDoc, doc } from "firebase/firestore";

const LetterDays = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L"];

const DaysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

const DayOfWeek = {
  Monday: "Mon",
  Tuesday: "Tue",
  Wednesday: "Wen",
  Thursday: "Thu",
  Friday: "Fri",
};

const StartBase = "PeriodStart";
const EndBase = "PeriodEnd";
const NameBase = "NamePeriod";

const Prefixes = ["Senior", "Freshman", ""];
class TimeObjects {
  //id values for different input fields
  constructor(prefix) {
    this.TimeStart = [];
    this.TimeEnd = [];
    this.PeriodName = [];
    this.Prefix = prefix;
    for (var i = 1; i < 9; i++) {
      this.TimeStart[i - 1] = prefix + StartBase + i;
      this.TimeEnd[i - 1] = prefix + EndBase + i;
      this.PeriodName[i - 1] = prefix + NameBase + i;
    }
  }
}
const PeriodNum = [1, 2, 3, 4, 5, 6, 7, 8];
const LevelTimeObjects = [
  new TimeObjects(Prefixes[1]),
  new TimeObjects(Prefixes[0]),
];

const DefaultTimeObject = new TimeObjects(Prefixes[2]);

/**
 * Design
 * Want to pull a give day's schedule
 * Be able to add new periods anywhere
 * Save changed schedule
 */

const Inputs = async (selectedDay) => {
  if (selectedDay === null) {
    return null;
  }
  return GetDayData(selectedDay).then((value) => {
    return (
      <center>
        <select defaultValue={value[0].LetterDay} id="LetterDaySelect">
          <option value="X">No School</option>
          {LetterDays.map((value) => {
            return <option value={value}>{value}</option>;
          })}
          {() => {
            try {
              document.getElementById("LetterDaySelect").value =
                value[0].LetterDay;
            } catch {}
          }}
        </select>
        <table>
          <thead>
            <tr>
              {value.map((level) => {
                return (
                  <th key={level.Prefix}>
                    <div>{level.Prefix}</div>

                    {level.PeriodNames.map((PeriodName, index) => {
                      return (
                        <div key={PeriodName} className="inputFieldHolder">
                          <label htmlFor={PeriodName}>
                            Period {index + 1}{" "}
                          </label>
                          <input
                            className="inputField"
                            type="text"
                            id={PeriodName}
                            defaultValue={PeriodName}
                          />
                          <input
                            className="inputField"
                            type="time"
                            id={level.PeriodTimes[index]}
                            defaultValue={level.PeriodTimes[index].slice(0, 5)}
                          />
                          <input
                            className="inputField"
                            type="time"
                            id={level.PeriodTimes[index].slice(6, 10)}
                            defaultValue={level.PeriodTimes[index].slice(6, 11)}
                          />
                        </div>
                      );
                    })}
                  </th>
                );
              })}
            </tr>
          </thead>
        </table>
      </center>
    );
  });
};

const CustomSchedule = () => {
  const [selectedDay, setDay] = useState(null);
  const [bodyMain, setBody] = useState(null);

  useEffect(() => {
    var InputPromise = Inputs(selectedDay);
    InputPromise.then((InputValue) => {
      setBody(
        <div>
          <div className="HeaderObject">
            {DaysOfWeek.map((DayOfWeek) => {
              return (
                <div key={DayOfWeek}>
                  <input
                    onChange={() => {
                      setDay({ DayOfWeek });
                    }}
                    name="DayOfWeekInputSelect"
                    id={DayOfWeek}
                    type="radio"
                  ></input>
                  <label htmlFor={DayOfWeek}>{DayOfWeek}</label>
                </div>
              );
            })}
          </div>
          {InputValue}
        </div>
      );
    });
  }, [selectedDay]);

  return bodyMain;
};

async function GetDayData(day) {
  var YearData = [];
  const dayAbbreviation = DayOfWeek[day.DayOfWeek];
  await getDoc(doc(db, "Schedule", "Fresh")).then((foundDoc) => {
    if (foundDoc.exists) {
      const TempData = {
        PeriodNames: foundDoc.data()[dayAbbreviation + "Periods"],
        PeriodTimes: foundDoc.data()[dayAbbreviation + "Times"],
        LetterDay: foundDoc.data()[dayAbbreviation + "Letter"],
        Prefix: "Fresh",
      };

      YearData[0] = TempData;
    }
  });
  return await getDoc(doc(db, "Schedule", "Sen")).then((foundDoc) => {
    if (foundDoc.exists) {
      const TempData = {
        PeriodNames: foundDoc.data()[dayAbbreviation + "Periods"],
        PeriodTimes: foundDoc.data()[dayAbbreviation + "Times"],
        LetterDay: foundDoc.data()[dayAbbreviation + "Letter"],
        Prefix: "Sen",
      };

      YearData[1] = TempData;
    }
    return YearData;
  });
}
export default CustomSchedule;
