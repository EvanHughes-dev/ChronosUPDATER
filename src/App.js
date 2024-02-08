import logo from './logo.svg';
import './App.css';
import { initializeApp } from "firebase/app";


import { getFirestore, doc, setDoc } from "firebase/firestore";


const TimeStartObjects = [];
const TimeEndObjects = [];
const PeriodNameObjects = [];
const StartBase = "PeriodStart";
const EndBase = "PeriodEnd";
const NameBase = "NamePeriod";


const OneThroughSevenLetter = ['A', 'D', 'E', 'H', 'I', 'L'];
const OneThroughFourLetter = ['B', 'F', 'J'];
const FiveThroughSevenLetter = ['C', 'G', 'K'];


class DaySchedule {
    constructor(time, names, letterName) {
        this.time = time;
        this.name = names;
        this.LetterName = letterName;
    }
}

class WeekSchedule {
    constructor(Monday, Tuesday, Wednesday, Thursday, Friday) {
        this.Monday = Monday
        this.Tuesday = Tuesday
        this.Wednesday = Wednesday
        this.Thursday = Thursday
        this.Friday = Friday

    }
    SetMonday(Monday) {
        this.Monday = Monday
    }
    SetTuesday(Tuesday) {
        this.Tuesday = Tuesday
    }
    SetWednesDay(Wednesday) {
        this.Wednesday = Wednesday
    }
    SetThursday(Thursday) {
        this.Thursday = Thursday
    }
    SetFriday(Friday) {
        this.Friday = Friday
    }
}

const WeekMap = new Map([["Sen", new WeekSchedule(null, null, null, null, null)], ["Fresh", new WeekSchedule(null, null, null, null, null)]])

//#region SavedDays
var DayOfWeekInt = 0;

var DayOfWeek = ["Mon", "Tues", "Wen", "Thu", "Fri"]
var DaysOfWeekFull = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]
//#endregion

//#region Schedules



const OneThroughSeven = {
    Period: ["1st", "2nd", "3rd", "4th", "L&L", "5th", "6th", "7th"],
    PeriodStart: ["07:40", "08:35", "09:25", "10:15", "11:03", "12:08", "12:58", "13:48"],
    PeriodEnd: ["08:31", "09:21", "10:11", "11:01", "12:06", "12:54", "13:44", "14:35"],

}

const OneThroughFourSen = {
    Period: ["1st", "2nd", "3rd", "Lunch", "4th"],
    PeriodStart: ["07:40", "09:19", "10:53", "12:27", "13:01"],
    PeriodEnd: ["09:15", "10:49", "12:23", "12:57", "14:35"],
}
const OneThroughFourFresh = {
    Period: ["1st", "2nd", "Lunch", "3rd", "4th"],
    PeriodStart: ["07:40", "09:19", "10:53", "11:27", "13:01"],
    PeriodEnd: ["09:15", "10:49", "11:23", "12:57", "14:35"],
}

const FiveThroughSevenSen = {
    Period: ["5th", "Advisory", "6th", "7th", "Lunch", "Seminar"],
    PeriodStart: ["07:40", "09:19", "09:58", "11:32", "13:06", "13:40"],
    PeriodEnd: ["09:15", "09:54", "11:28", "13:02", "13:36", "14:35"],
}
const FiveThroughSevenFresh = {
    Period: ["5th", "Advisory", "6th", "Lunch", "7th", "Seminar"],
    PeriodStart: ["07:40", "09:19", "09:58", "11:32", "12:05", "13:40"],
    PeriodEnd: ["09:15", "09:54", "11:28", "12:02", "13:36", "14:35"],
}

const SenSchedules = {
    OneToSeven: OneThroughSeven,
    OneToFour: OneThroughFourSen,
    FiveToSeven: FiveThroughSevenSen
}

const FreshSchedules = {
    OneToSeven: OneThroughSeven,
    OneToFour: OneThroughFourFresh,
    FiveToSeven: FiveThroughSevenFresh
}

const ScheduleMap = new Map([["Sen", SenSchedules], ["Fresh", FreshSchedules]])
//#endregion

function App() {

    var PeriodNum = [1, 2, 3, 4, 5, 6, 7, 8];
    var Div = (
        <div>

            {PeriodNum.map((number) => {

                return (<div name={"Period" + number}>
                    <label for={"Period" + number}>Period {number} </label>
                    <input type="text" id={"NamePeriod" + number} />
                    <input type="time" id={"PeriodStart" + number} />
                    <input type="time" id={"PeriodEnd" + number} />

                </div>);
            })
            }
        </div>);


    return (
        <div>
            <div name="HeaderForm">

            </div>

            <div class="DayOfWeek" id="DayOfWeek" name="DayOfWeek">Day of week: Monday</div>
            <div>
                <label for="ForWho">Who is this for</label>
                <select id="ForWho" name="ForWho" onChange={SetSchedule}>

                    <option value="Fresh">Feshman/Sophmore</option>
                    <option value="Sen">Junior/Senior</option>
                    <option value="Both">Both</option>

                </select>
            </div>

            <div>
                <div>

                    <div name="UseDefaultSchedule">
                        <label for="UseDefaultSchedule">Do you want to use the default schedule?</label>

                        <label for="DefaultSchedule"> Yes</label>
                        <input id="UseSchedule" type="radio" name="DefaultSchedule" value="Yes" onChange={SetSchedule} />

                        <label for="DefaultSchedule"> No</label>
                        <input type="radio" id="DontUseDefault" name="DefaultSchedule" value="No" onChange={SetSchedule} />
                    </div>
                </div>
                <select onChange={SetSchedule} id="letterDay">
                    <option value="X" selected>Off School</option>
                    <option value="A">A</option>
                    <option value="B">B</option>
                    <option value="C">C</option>
                    <option value="D">D</option>
                    <option value="E">E</option>
                    <option value="F">F</option>
                    <option value="G">G</option>
                    <option value="H">H</option>
                    <option value="I">I</option>
                    <option value="J">J</option>
                    <option value="K">K</option>
                    <option value="L">L</option>


                </select>
                <br />
                {Div}

                <button onClick={NextDay} id="NextDay" >Next Day</button>
                <button onClick={AutoFillWeek} id="NextDay" >Auto-Fill</button>
                <button onClick={SendData} name="SendIt" value="Set" >Send It!</button>
            </div>
        </div>
    );
}

function NextDay() {
    const GradeLevel = ["Fresh", "Sen"]
    GradeLevel.map((Level) => { SaveDay(Level) })

    ClearSchedule();
    DayOfWeekInt++;
    if (DayOfWeekInt < 5) {
        document.getElementById("DayOfWeek").innerHTML = 'Day of week: ' + DaysOfWeekFull[DayOfWeekInt]
    } else {
        //Day is Friday. Set schedule
        document.getElementById("DayOfWeek").innerHTML = "Send it"
        document.getElementById("NextDay").style.display = "none";
    }

}

function SaveDay(Level) {
    var NameArray = []
    var TimeArray = []
    var LetterDay = document.getElementById("letterDay").value


    var Schedule = GetNeededSchedule(Level, LetterDay);
    for (var i = 0; i < Schedule.Period.length; i++) {
        if (LetterDay == 'X') {
            break;
        }

        //get the actual values from the array for each year
        NameArray[i] = Schedule.Period[i]
        TimeArray[i] = Schedule.PeriodStart[i] + "-" + Schedule.PeriodEnd[i];
    }

    const newDay = new DaySchedule(TimeArray, NameArray, LetterDay);

    switch (DayOfWeek[DayOfWeekInt]) {
        case "Mon":
            WeekMap.get(Level).SetMonday(newDay)
            break;
        case "Tues":
            WeekMap.get(Level).SetTuesday(newDay)
            break;
        case "Wen":
            WeekMap.get(Level).SetWednesDay(newDay)
            break;
        case "Thu":
            WeekMap.get(Level).SetThursday(newDay)
            break;
        case "Fri":
            WeekMap.get(Level).SetFriday(newDay)
            break;
    }
    console.log(WeekMap.get(Level))

}

async function SendData() {

    // Import the functions you need from the SDKs you need

    // TODO: Add SDKs for Firebase products that you want to use
    // https://firebase.google.com/docs/web/setup#available-libraries

    // Your web app's Firebase configuration
    // For Firebase JS SDK v7.20.0 and later, measurementId is optional
    const firebaseConfig = {
        apiKey: "AIzaSyBL9jpJTz-eCYJM0r1etRbx_6YpPqa67_4",
        authDomain: "chronos-96d4f.firebaseapp.com",
        databaseURL: "https://chronos-96d4f.firebaseio.com",
        projectId: "chronos-96d4f",
        storageBucket: "chronos-96d4f.appspot.com",
        messagingSenderId: "866705537581",
        appId: "1:866705537581:web:5ba4523272685649c116a4",
        measurementId: "G-RK77WZHGE9"
    };

    // Initialize Firebase
    const app = initializeApp(firebaseConfig);

    const db = getFirestore(app);

    var target = ["Sen", "Fresh"]

    console.log()
    target.map(async (targetGrade) => {
        var Schedules = WeekMap.get(targetGrade)

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
                FriLetter: Schedules.Friday.LetterName

            })
        } catch (e) { console.log(e) }

    })

    ClearSchedule();
}



function ClearSchedule() {
    for (var index = 0; index < 9; index++) {
        try {
            PeriodNameObjects[index].value = "";
            TimeStartObjects[index].value = "00:00";
            TimeEndObjects[index].value = "00:00";
        } catch (e) { }
    }
}


function SetSchedule() {
    for (var i = 1; i < 9; i++) {

        PeriodNameObjects[i - 1] = document.getElementById(NameBase + i);
        TimeStartObjects[i - 1] = document.getElementById(StartBase + i);
        TimeEndObjects[i - 1] = document.getElementById(EndBase + i);

    }
    try {
        var UseDefault = document.querySelector('input[name="DefaultSchedule"]:checked').value;
    } catch (e) { }
    if (UseDefault === "Yes" && document.getElementById("letterDay").value != "X") {
        ClearSchedule();
        SetDefault();
    } else if (UseDefault != "Yes") {
        ClearSchedule();
    }

}

function SetDefault() {

    var LetterDay = document.getElementById("letterDay").value;
    var GradeLevel = document.getElementById("ForWho").value;

    var StartTime = [];
    var EndTime = [];
    var PeriodNames = [];

    var Schedule = GetNeededSchedule(GradeLevel, LetterDay)

    StartTime = Schedule.PeriodStart;
    EndTime = Schedule.PeriodEnd;
    PeriodNames = Schedule.Period;


    for (var index = 0; index < PeriodNames.length; index++) {
        PeriodNameObjects[index].value = PeriodNames[index];
        TimeStartObjects[index].value = StartTime[index];
        TimeEndObjects[index].value = EndTime[index];

    }


}

//used when week has normal schedule
function AutoFillWeek() {
    if (document.getElementById("letterDay").value != "X") {
        for (var i = 0; i < 5; i++) {
            SetDefault();
            NextDay();
            NextLetterDay();
        }
        SendData();
    } else {
        alert("Can not auto fill. Start day not defined")
    }
}

function NextLetterDay() {
    var LetterOrder = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L']

    for (var i = 0; i < 12; i++) {
        if (LetterOrder[i] == document.getElementById("letterDay").value) {

            var NewNumber = i + 1;
            if (NewNumber == 12) {
                NewNumber = 0;
            }
            document.getElementById("letterDay").value = LetterOrder[NewNumber];
            break;
        }
    }
}


function GetNeededSchedule(ClassLevel, LetterDay) {

    console.log(ClassLevel, LetterDay)
    if (ClassLevel == "Both") {
        ClassLevel = "Fresh"
    }
    var ClassLevelSchedules = ScheduleMap.get(ClassLevel)

    if (OneThroughSevenLetter.includes(LetterDay)) {
        return ClassLevelSchedules.OneToSeven
    } else if (OneThroughFourLetter.includes(LetterDay)) {
        return ClassLevelSchedules.OneToFour
    } else if (FiveThroughSevenLetter.includes(LetterDay)) {
        return ClassLevelSchedules.FiveToSeven
    }



}
export default App;
