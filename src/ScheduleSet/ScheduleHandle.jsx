/*
 * EHughes
 * This files controls all firebase schedule fetches and sets
 * Use as main call a file
 */

/**** BEGIN DECLARATIONS *****/
/**** BEGINNING OF FIREBASE CONFIGURATION AND DATABASE SETUP ****/
import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc, updateDoc } from "firebase/firestore";

// Firebase configuration
const firebase_creds = {
  apiKey: process.env.API_KEY,

  authDomain: "chronosdb.firebaseapp.com",
  projectId: "chronosdb",
  storageBucket: "chronosdb.appspot.com",
  messagingSenderId: "590754783806",
  appId: "1:590754783806:web:bd1360bf42c9711ff0e76f",
  measurementId: "G-JX1T2P9LDV",
};

// Initialize Firebase app
const app = initializeApp(firebase_creds);

// Get Firestore database instance
const db = getFirestore(app);
/**** END OF FIREBASE CONFIGURATION AND DATABASE SETUP ****/

/**** BEGIN SCHEDULE DECLARATION ****/
class DaySchedule {
  constructor(time, names, letterName) {
    this.time = time;
    this.name = names;
    this.LetterName = letterName;
  }
}

class WeekSchedule {
  //class used to store week
  constructor(Monday, Tuesday, Wednesday, Thursday, Friday) {
    this.Monday = Monday;
    this.Tuesday = Tuesday;
    this.Wednesday = Wednesday;
    this.Thursday = Thursday;
    this.Friday = Friday;
  }
  SetMonday(Monday) {
    //used to assign each day
    this.Monday = Monday;
  }
  SetTuesday(Tuesday) {
    this.Tuesday = Tuesday;
  }
  SetWednesDay(Wednesday) {
    this.Wednesday = Wednesday;
  }
  SetThursday(Thursday) {
    this.Thursday = Thursday;
  }
  SetFriday(Friday) {
    this.Friday = Friday;
  }
}

const OneThroughSeven = {
  //Full schedule for 1-7 days
  Period: ["1st", "2nd", "3rd", "4th", "L&L", "5th", "6th", "7th"],
  PeriodStart: [
    "07:40",
    "08:35",
    "09:25",
    "10:15",
    "11:03",
    "12:08",
    "12:58",
    "13:48",
  ],
  PeriodEnd: [
    "08:31",
    "09:21",
    "10:11",
    "11:01",
    "12:06",
    "12:54",
    "13:44",
    "14:35",
  ],
};

const OneThroughFourSen = {
  //1-4 schedule for Juniors/Seniors
  Period: ["1st", "2nd", "3rd", "Lunch", "4th"],
  PeriodStart: ["07:40", "09:19", "10:53", "12:27", "13:01"],
  PeriodEnd: ["09:15", "10:49", "12:23", "12:57", "14:35"],
};
const OneThroughFourFresh = {
  //1-4 schedule for Freshman/Sophomores
  Period: ["1st", "2nd", "Lunch", "3rd", "4th"],
  PeriodStart: ["07:40", "09:19", "10:53", "11:27", "13:01"],
  PeriodEnd: ["09:15", "10:49", "11:23", "12:57", "14:35"],
};

const FiveThroughSevenSen = {
  Period: ["5th", "Advisory", "6th", "7th", "Lunch", "Seminar"],
  PeriodStart: ["07:40", "09:19", "09:58", "11:32", "13:06", "13:40"],
  PeriodEnd: ["09:15", "09:54", "11:28", "13:02", "13:36", "14:35"],
};
const FiveThroughSevenFresh = {
  Period: ["5th", "Advisory", "6th", "Lunch", "7th", "Seminar"],
  PeriodStart: ["07:40", "09:19", "09:58", "11:32", "12:05", "13:40"],
  PeriodEnd: ["09:15", "09:54", "11:28", "12:02", "13:36", "14:35"],
};

const SenSchedules = {
  OneToSeven: OneThroughSeven,
  OneToFour: OneThroughFourSen,
  FiveToSeven: FiveThroughSevenSen,
};

const FreshSchedules = {
  OneToSeven: OneThroughSeven,
  OneToFour: OneThroughFourFresh,
  FiveToSeven: FiveThroughSevenFresh,
};

const ScheduleMap = new Map([
  ["Sen", SenSchedules],
  ["Fresh", FreshSchedules],
]);
/**** END SCHEDULE DECLARATION ****/

const OneThroughSevenLetter = ["A", "D", "E", "H", "I", "L"];
const OneThroughFourLetter = ["B", "F", "J"];
const FiveThroughSevenLetter = ["C", "G", "K"];

const DayOfWeek = ["Mon", "Tues", "Wen", "Thu", "Fri"];
const DaysOfWeekFull = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

var DayOfWeekInt = 0;

const WeekMap = new Map([
  ["Sen", new WeekSchedule(null, null, null, null, null)],
  ["Fresh", new WeekSchedule(null, null, null, null, null)],
]);
/**** END DECLARATIONS *****/

/**** BEGIN FUNCTIONS *****/
function GetNeededSchedule(LetterDay, level) {
  var ClassLevel = level;

  var ClassLevelSchedules = ScheduleMap.get(ClassLevel);

  if (OneThroughSevenLetter.includes(LetterDay)) {
    return ClassLevelSchedules.OneToSeven;
  } else if (OneThroughFourLetter.includes(LetterDay)) {
    return ClassLevelSchedules.OneToFour;
  } else if (FiveThroughSevenLetter.includes(LetterDay)) {
    return ClassLevelSchedules.FiveToSeven;
  }
}

function SaveDay(Level) {
  var NameArray = [];
  var TimeArray = [];
  var LetterDay = document.getElementById("letterDay").value;

  var Schedule = GetNeededSchedule(LetterDay, Level);

  try {
    for (var i = 0; i < Schedule.Period.length; i++) {
      if (LetterDay === "X") {
        break;
      }

      //get the actual values from the array for each year
      NameArray[i] = Schedule.Period[i];
      TimeArray[i] = Schedule.PeriodStart[i] + "-" + Schedule.PeriodEnd[i];
    }
  } catch (e) {
    console.log(e);
  }

  const newDay = new DaySchedule(TimeArray, NameArray, LetterDay);

  switch (DayOfWeek[DayOfWeekInt]) {
    case "Mon":
      WeekMap.get(Level).SetMonday(newDay);
      break;
    case "Tues":
      WeekMap.get(Level).SetTuesday(newDay);
      break;
    case "Wen":
      WeekMap.get(Level).SetWednesDay(newDay);
      break;
    case "Thu":
      WeekMap.get(Level).SetThursday(newDay);
      break;
    case "Fri":
      WeekMap.get(Level).SetFriday(newDay);
      break;
    default:
      break;
  }
}

function IncrementWeek() {
  DayOfWeekInt++;
}

function GetWeekInt() {
  return DayOfWeekInt;
}

function GetDayOfWeek() {
  return DaysOfWeekFull[DayOfWeekInt];
}

/** Send Schedule Generated by DefaultSchedule.jsk */
async function SendAllData(targetGrade) {
  var Schedules = WeekMap.get(targetGrade);

  try {
    const CreateObject = (day) => {
      const Object = {
        PeriodTimes: day.time.join("/"),
        PeriodNames: day.name.join("/"),
        LetterDay: day.LetterName,
      };
      return Object;
    };

    // const Monday = CreateObject(Schedules.Monday);

    // console.log(Monday);
    /**
     * Send all data
     * CreateObject returns the object Firebase stores
     * Print Monday above if needed example
     */
    await setDoc(doc(db, "Schedule", targetGrade), {
      Monday: CreateObject(Schedules.Monday),
      Tuesday: CreateObject(Schedules.Tuesday),
      Wednesday: CreateObject(Schedules.Wednesday),
      Thursday: CreateObject(Schedules.Thursday),
      Friday: CreateObject(Schedules.Friday),
    });
  } catch (e) {
    console.log(e);
  }
}

async function SendNewData(data, day) {
  try {
    data.map(async (level) => {
      var PeriodTimes = [];
      console.log(level);
      var PeriodNames = [];

      var LetterDay = document.getElementById("LetterDaySelect").value;
      level.PeriodNames.map(async (value, index) => {
        PeriodTimes[index] =
          document.getElementById(level.Prefix + "Period" + index + "Start")
            .value +
          "-" +
          document.getElementById(level.Prefix + "Period" + index + "End")
            .value;

        PeriodNames[index] = value;
      });

      const ref = doc(db, "Schedule", level.Prefix);
      const TimeObject = {
        PeriodTimes: PeriodTimes.join("/"),
        PeriodNames: PeriodNames.join("/"),
        LetterDay: LetterDay,
      };
      console.log(TimeObject);

      if (DaysOfWeekFull.includes(day.DayOfWeek)) {
        await updateDoc(ref, {
          [day.DayOfWeek]: TimeObject,
        });
      }
    });
  } catch {}
}

/**** END FUNCTIONS *****/

export {
  GetDayOfWeek,
  SendAllData,
  GetWeekInt,
  IncrementWeek,
  SaveDay,
  GetNeededSchedule,
  SendNewData,
  db,
};
