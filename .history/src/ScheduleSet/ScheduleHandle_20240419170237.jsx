/*
 * EHughes
 * This files controls all firebase schedule fetches and sets
 * Use as main call a file
 */

/**** BEGIN DECLARATIONS *****/
/**** BEGINNING OF FIREBASE CONFIGURATION AND DATABASE SETUP ****/
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  doc,
  setDoc,
  updateDoc,
  deleteField,
} from "firebase/firestore";
const admin = require("firebase-admin");
// Firebase configuration

const admin = {
  type: "service_account",
  project_id: "chronos-96d4f",
  private_key_id: "db4bdbaaf70dfaba52e1fc79fa253244364ed448",
  private_key:
    "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCeYqg7hHSrvSYg\nIahfsQEE/y2J2ToCyR0mU9eQNNRJO9ybjW69ABhcOnAjzJ2VWK0LpduFdmvfm06i\nxxUJGbZAWRYo/ijYtGUT06QNAV2rZzrzA+HLVF0ab3Es9BWJ6cnx9yHlTxRWbGNh\nH9dRrplEDKCTlGNeLABqsu6TG6BJ/gINoUbVmMwwvAiyOimuAdMp3TLuOdqgxxGi\n6nZfSF1JppwNFB4TljGu4Og7PVo3QUf86gM4dYF+SE/YiSliL/WecCVcjdQf2WT9\n7BouuVjna7pChtP7qTpUiSi8pvm8X12/cM7DHedVSscUBIFUFuqdlvyef0FOJd6g\nEnhpZcMrAgMBAAECggEADCpZcAI2Be+dizqamLMF+DDIz32YbO4D/QApSWHNa8yb\nHsrnwRZN8149DnrhIGoIbKHHhpejJIXk2IWVx4uqidnDOnsp1Fn9fjQzixjaQtfx\n2V2od7ovUTWodJf7mYq+tgT8nQThyTDtFzY0ud5BK86+fLzD6c/+aN5SizPEMDqh\nPV3OUpwq8gJ5ad7GZAVjrB5mJ8c3ivow+o3kWAAAhjpxJ2Bgwlxp4/KSz/Hal32C\njBFY0xh53rj9bh6MpHH0xPjtrdFgBasFgTG7XJKLPv8yiSd4y26LbWaWpmDh4ASZ\n4FUHNQxbjty2U4Zc2KK+KpR2H1N66asz46ZIOYDDWQKBgQDZ0bKjbpob/CcuV5HG\noPl1DjgXKn6ON3TVasOnOeRHsbxotD0gEchRxTyzG1S5IJFndTiQV+omi6D/tMzD\nt7ia8lUZ/uHFS85MzpoCuy6SIQqltef7F3V3MjXm5E4KRp2ZEjwEPyHKrf6pqD7f\nSGLdw2JJP25JOJyErfKixTiu4wKBgQC6JfXKdsK8IWvd9LL396AEunbXUgzA1gfc\nWhzqFpUxZDI1w3DKWcsDkdcxu7srtEjBo77c+3uQ9rH8KZozQEQDQ13LI608Wb/r\ns04YuWW+4+MQ9F24bMImHo13uFlUT/A0fr7p48brdMrLudWq6WNVxZGe+wCMJLg4\ndvfXwRjFGQKBgGnaf67u7BPXiY763Ywi5LgfLeEMNK6Wgr/If8a/2pGA7agQl3gD\nTE94w9Pi31yMWD1n+RIkt1T+HELIMY6XtS4PwI2+kSeZfGtVKAFVx/8Z8ZuweElN\nEDfZ/dn0b3yM7r/Z3bLOn3Ro9E6sxckq22kcL6KbIdSRn3bXNggmQjKzAoGBAKry\nW2OAZttQMfgWVRjFbk2JU8PvlMiuhW+FzdHnxUEji7y16+nYRkjT8PS6O2wqVzqE\n/q1/wX1iIBe7uOFiHlOE1SjNbbTjkw2Ij6rC7747F3algz/vmOha3H3abSaxdp0u\n3HJ8fFwU2Hv5AFDBnjjRhCakyV7qBcfM8VRQ/0dZAoGBALzNFVKE/MHBBZ3Fv/+j\n3bpDeTxShSljB4cBTZdrkzn3tRXhYEKWa7V90pUYeyxggz60O/vmfg0NpX0B00S4\nLGBuTcyViA81myw7J9qCRaNIVrlckhLiZFdOlaN3CL+OF3nI6ziKz3qMVxFZTkUJ\njT4yEqe7Q+PCWO95Qh9m1IwS\n-----END PRIVATE KEY-----\n",
  client_email: "firebase-adminsdk-mkdak@chronos-96d4f.iam.gserviceaccount.com",
  client_id: "116064334499656447647",
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  client_x509_cert_url:
    "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-mkdak%40chronos-96d4f.iam.gserviceaccount.com",
  universe_domain: "googleapis.com",
};
const firebase_creds = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: "chronos-96d4f.firebaseapp.com",
  databaseURL: "https://chronos-96d4f.firebaseio.com",
  projectId: "chronos-96d4f",
  storageBucket: "chronos-96d4f.appspot.com",
  messagingSenderId: "866705537581",
  appId: "1:866705537581:web:5ba4523272685649c116a4",
  measurementId: "G-RK77WZHGE9",
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
  console.log(LetterDay);

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
    await setDoc(doc(db, "Schedule", targetGrade), {
      MonTimes: Schedules.Monday.time,
      MonPeriods: Schedules.Monday.name,
      MonLetter: Schedules.Monday.LetterName,

      TueTimes: Schedules.Tuesday.time,
      TuePeriods: Schedules.Tuesday.name,
      TueLetter: Schedules.Tuesday.LetterName,

      WenTimes: Schedules.Wednesday.time,
      WenPeriods: Schedules.Wednesday.name,
      WenLetter: Schedules.Wednesday.LetterName,

      ThuTimes: Schedules.Thursday.time,
      ThuPeriods: Schedules.Thursday.name,
      ThuLetter: Schedules.Thursday.LetterName,

      FriTimes: Schedules.Friday.time,
      FriPeriods: Schedules.Friday.name,
      FriLetter: Schedules.Friday.LetterName,
    });
  } catch (e) {
    console.log(e);
  }
}

async function SendNewData(data, day) {
  try {
    data.map(async (level) => {
      var PeriodTimes = [];

      var PeriodName = [];
      var LetterDay;

      LetterDay = document.getElementById("LetterDaySelect").value;
      level.PeriodNames.map(async (value, index) => {
        PeriodTimes[index] =
          document.getElementById(level + "Period" + index + "Start") +
          "" +
          document.getElementById(level + "Period" + index + "End");

        PeriodName[index] = PeriodName;
      });

      const ref = doc(db, "Schedule", level.Prefix);

      switch (day.DayOfWeek) {
        case "Monday":
          await updateDoc(ref, {
            MonTimes: { PeriodTimes },
            MonPeriods: PeriodName,
            MonLetter: LetterDay,
          });
          break;
        case "Tuesday":
          await updateDoc(ref, {
            TueTimes: deleteField(),
            TuePeriods: deleteField(),
          });
          await updateDoc(ref, {
            TueTimes: PeriodTimes,
            TuePeriods: PeriodName,
            TueLetter: LetterDay,
          });
          break;
        case "Wednesday":
          await updateDoc(ref, {
            WenTimes: PeriodTimes,
            WenPeriods: PeriodName,
            WenLetter: LetterDay,
          });
          break;
        case "Thursday":
          await updateDoc(ref, {
            ThuTimes: PeriodTimes,
            ThuPeriods: PeriodName,
            ThuLetter: LetterDay,
          });
          break;
        case "Friday":
          await updateDoc(ref, {
            FriTimes: PeriodTimes,
            FriPeriods: PeriodName,
            FriLetter: LetterDay,
          });
          break;
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