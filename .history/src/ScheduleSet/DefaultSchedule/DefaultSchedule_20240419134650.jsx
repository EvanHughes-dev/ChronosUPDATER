import { Console } from "console";
import {
  GetNeededSchedule,
  SaveDay,
  IncrementWeek,
  GetWeekInt,
  GetDayOfWeek,
  SendAllData,
} from "../ScheduleHandle.js"; //used for support funcs

import { useLocation, useNavigate as useHistory } from "react-router-dom";

const Prefixes = ["Senior", "Freshman", ""];

const StartBase = "PeriodStart";
const EndBase = "PeriodEnd";
const NameBase = "NamePeriod";

class TimeObjects {
  //id values for diffrent input fields
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

const DefaultTimeObject = new TimeObjects(Prefixes[2]);

const PeriodNum = [1, 2, 3, 4, 5, 6, 7, 8];
const LetterDays = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L"];

const DefaultSchedule = () => {
  let location = useLocation();
  let history = useHistory();

  var inputs = (
    <div>
      {PeriodNum.map((number) => {
        return (
          <div key={number} className="inputFieldHolder">
            <label htmlFor={DefaultTimeObject.PeriodName[number - 1]}>
              Period {number}{" "}
            </label>
            <input
              className="inputField"
              type="text"
              id={DefaultTimeObject.PeriodName[number - 1]}
              readOnly
            />
            <input
              className="inputField"
              type="time"
              id={DefaultTimeObject.TimeStart[number - 1]}
              readOnly
            />
            <input
              className="inputField"
              type="time"
              id={DefaultTimeObject.TimeEnd[number - 1]}
              readOnly
            />
          </div>
        );
      })}
    </div>
  );

  var submitValues = (
    <div>
      <button onClick={NextDay} id="NextDay">
        Next Day
      </button>
      <button onClick={AutoFillWeek} id="NextDay">
        Auto-Fill
      </button>
      <button onClick={SendData} name="SendIt" value="Set">
        Send It!
      </button>
    </div>
  );

  var body = (
    <div>
      <div name="HeaderForm"></div>

      <div className="DayOfWeek" id="DayOfWeek" name="DayOfWeek">
        Day of week: Monday
      </div>

      <div>
        <select onChange={SetSchedule} id="letterDay" defaultValue={"X"}>
          <option value="X">Off School</option>

          {LetterDays.map((LetterDayIn) => {
            return (
              <option key={LetterDayIn} value={LetterDayIn}>
                {" "}
                {LetterDayIn}
              </option>
            );
          })}
        </select>
        <br />
        {inputs}

        {submitValues}
      </div>
    </div>
  );

  return body;
};

function NextDay() {
  const GradeLevel = ["Fresh", "Sen"];
  GradeLevel.map((Level) => {
    SaveDay(Level);
    return 0;
  });

  ClearSchedule();
  IncrementWeek();

  if (GetWeekInt() < 5) {
    document.getElementById("DayOfWeek").innerHTML =
      "Day of week: " + GetDayOfWeek();
  } else {
    //Day is Friday. Set schedule
    document.getElementById("DayOfWeek").innerHTML = "Send it";
    document.getElementById("NextDay").style.display = "none";
  }
}
//used when week has normal schedule
function AutoFillWeek() {
  if (document.getElementById("letterDay").value !== "X") {
    for (var i = 0; i < 5; i++) {
      SetDefault();
      NextDay();
      if (i !== 4) {
        NextLetterDay();
      } else {
        document.getElementById("letterDay").value = "X";
      }
    }
    SendData();
  } else {
    alert("Can not auto fill. Start day not defined");
  }
}

async function SendData() {
  var target = ["Sen", "Fresh"];

  target.map((targetGrade) => {
    SendAllData(targetGrade);
    return 0;
  });

  ClearSchedule();
  return 0;
}

function ClearSchedule() {
  try {
    for (var index = 0; index < DefaultTimeObject.PeriodName.length; index++) {
      document.getElementById(DefaultTimeObject.PeriodName[index]).value = "";
      document.getElementById(DefaultTimeObject.TimeStart[index]).value =
        "00:00";
      document.getElementById(DefaultTimeObject.TimeEnd[index]).value = "00:00";
    }
  } catch (e) {
    console.log(e);
  }
}

function SetDefault() {
  var LetterDay = document.getElementById("letterDay").value;

  var StartTime = [];
  var EndTime = [];
  var PeriodNames = [];

  var Schedule = GetNeededSchedule(LetterDay, "Fresh");

  StartTime = Schedule.PeriodStart;
  EndTime = Schedule.PeriodEnd;
  PeriodNames = Schedule.Period;

  for (var index = 0; index < PeriodNames.length; index++) {
    document.getElementById(DefaultTimeObject.PeriodName[index]).value =
      PeriodNames[index];
    document.getElementById(DefaultTimeObject.TimeStart[index]).value =
      StartTime[index];
    document.getElementById(DefaultTimeObject.TimeEnd[index]).value =
      EndTime[index];
  }
}

function NextLetterDay() {
  var LetterOrder = [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
  ];

  for (var i = 0; i < 12; i++) {
    if (LetterOrder[i] === document.getElementById("letterDay").value) {
      var NewNumber = i + 1;
      if (NewNumber === 12) {
        NewNumber = 0;
      }
      document.getElementById("letterDay").value = LetterOrder[NewNumber];
      break;
    }
  }
}

function SetSchedule() {
  if (document.getElementById("letterDay").value !== "X") {
    ClearSchedule();
    SetDefault();
  } else if (document.getElementById("letterDay").value === "X") {
    ClearSchedule();
  }
}

export default DefaultSchedule;
