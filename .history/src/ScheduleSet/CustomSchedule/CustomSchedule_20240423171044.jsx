import "./CustomSchedule.css";

import { useEffect, useState } from "react";

import { db, SendNewData } from "../ScheduleHandle";
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

/**
 * Design
 * Want to pull a give day's schedule
 * Be able to add new periods anywhere
 * Save changed schedule
 */

const CustomSchedule = () => {
  const [selectedDay, setDay] = useState(null);
  const [bodyMain, setBody] = useState(null);
  const [inputObjects, setInputs] = useState(null);
  const [data, setData] = useState(null);
  const [arrayOfData, setDataArray] = useState(null);
  const [AddedFields, setAddedFields] = useState([0, 0]);
  const GetData = () => {
    GetDayData(selectedDay).then((value) => {
      if (value === data) {
        return;
      }
      setData(value);
    });
  };

  const setLetterDrop = (value) => {
    try {
      document.getElementById("LetterDaySelect").value = value.LetterDay;
    } catch {}
  };

  const setDataArrayValue = () => {
    if (data == null) {
      return;
    }

    setDataArray(
      data.map((level) => {
        return (
          <th key={level.Prefix}>
            <div>{level.Prefix}</div>

            {level.PeriodNames.map((PeriodName, index) => {
              return (
                <div key={PeriodName} className="inputFieldHolder">
                  <label htmlFor={PeriodName}>Period {index + 1} </label>
                  <input
                    className="inputField"
                    type="text"
                    id={PeriodName + level}
                    defaultValue={PeriodName}
                  />
                  <input
                    className="inputField"
                    type="time"
                    id={level + "Period" + index + "Start"}
                    defaultValue={level.PeriodTimes[index].slice(0, 5)}
                  />
                  <input
                    className="inputField"
                    type="time"
                    id={level + "Period" + index + "End"}
                    defaultValue={level.PeriodTimes[index].slice(6, 11)}
                  />
                </div>
              );
            })}
          </th>
        );
      })
    );
  };

  useEffect(() => {
    GetData();
  }, [selectedDay]);

  const Inputs = () => {
    if (selectedDay === null) {
      return null;
    }
    const value = data;

    if (value == null) {
      setInputs(null);
      return null;
    }
    setInputs(
      <center key={value}>
        <select defaultValue={value[0].LetterDay} id="LetterDaySelect">
          <option value="X">No School</option>
          {LetterDays.map((value) => {
            return (
              <option key={value} value={value}>
                {value}
              </option>
            );
          })}
          {setLetterDrop(value[0])}
        </select>
        <table>
          <thead>
            <tr>{arrayOfData}</tr>
          </thead>
        </table>
        <button
          onClick={() => {
            SendNewData(data, selectedDay);
          }}
        >
          Send
        </button>
      </center>
    );
  };
  useEffect(() => {
    Inputs();
  }, [arrayOfData]);
  useEffect(() => {
    setDataArrayValue();
  }, [data, AddedFields]);
  useEffect(() => {
    setBody(
      <div>
        <div className="HeaderObject">
          {DaysOfWeek.map((DayOfWeek) => {
            return (
              <div key={DayOfWeek} className="radioButtonObject">
                <center>
                  <input
                    onChange={() => {
                      setDay({ DayOfWeek });
                    }}
                    name="DayOfWeekInputSelect"
                    id={DayOfWeek}
                    type="radio"
                  ></input>
                  <label htmlFor={DayOfWeek}>{DayOfWeek}</label>
                </center>
              </div>
            );
          })}
        </div>
        {inputObjects}
      </div>
    );
  }, [inputObjects]);
  return bodyMain;
};

async function GetDayData(day) {
  if (day === null) {
    return;
  }
  var YearData = [];
  const dayAbbreviation = DayOfWeek[day.DayOfWeek];
  console.log("Ran");
  await getDoc(doc(db, "Schedule", "Fresh")).then((foundDoc) => {
    if (foundDoc.exists) {
      var currentDatafound = foundDoc.data()[day.DayOfWeek];

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
