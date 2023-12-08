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

//#region SavedDays
var DayOfWeekInt = 0;
var MonTimes = [];
var MonPeriods = [];
var MonDay;
var TuesTimes = [];
var TuesPeriods = [];
var TuesDay;
var WenTimes = [];
var WenPeriods = [];
var WenDay;
var ThuTimes = [];
var ThuPeriods = [];
var ThuDay;
var FriTimes = [];
var FriPeriods = [];
var FriDay;

var DayArray = [MonTimes, MonPeriods, MonDay, TuesTimes, TuesPeriods, TuesDay, WenTimes, WenPeriods, WenDay, ThuTimes, ThuPeriods, ThuDay, FriTimes, FriPeriods, FriDay]
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



//#endregion

function App() {
    
    var PeriodNum = [1, 2, 3, 4, 5, 6, 7, 8];
    var Div = (
        <div>

            {PeriodNum.map((number) => {

                return (<div name={"Period"+number}>
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
          
            <div class="DayOfWeek"id="DayOfWeek" name="DayOfWeek">Day of week: Monday</div>
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
            <button onClick={SendData } name="SendIt" value="Set" >Send It!</button>
            </div>
        </div>
  );
}

function NextDay() {

    var startingInt
    switch (DayOfWeek[DayOfWeekInt]) {
        case "Mon":
            startingInt = 0;
            break;
        case "Tues":
            startingInt = 3;
            break;
        case "Wen":
            startingInt = 6;
            break;
        case "Thu":
            startingInt = 9;
            break;
        case "Fri":
            startingInt = 12;
            break;
    }

    for (var i = 0; i < 8; i++) {
        if (PeriodNameObjects[i].value == "" || PeriodNameObjects[i].value == null) {
            break;
        }
        DayArray[startingInt + 1][i]= PeriodNameObjects[i].value;
        DayArray[startingInt][i] = TimeStartObjects[i].value + "-" + TimeEndObjects[i].value;
    }
    DayArray[startingInt + 2] = document.getElementById("letterDay").value;
    
    if (DayArray[startingInt + 2] == "X") {
        DayArray[startingInt+1][0] = "";
        DayArray[startingInt][0] = ""
    }


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

  
   
    
    try {
       
        await setDoc(doc(db, "Schedule", document.getElementById("ForWho").value), {
            MonTimes: MonTimes,
            MonPeriods: MonPeriods,
            MonLetter: DayArray[2],
            TueTimes: TuesTimes,
            TuePeriods: TuesPeriods,
            TueLetter: DayArray[5],
            WenTimes: WenTimes,
            WenPeriods: WenPeriods,
            WenLetter: DayArray[8],
            ThuTimes: ThuTimes,
            ThuPeriods: ThuPeriods,
            ThuLetter: DayArray[11],
            FriTimes: FriTimes,
            FriPeriods: FriPeriods,
            FriLetter: DayArray[14]

        });
    } catch (e) {
        console.log(e);
    }
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

        console.log("ran");
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

    var foundDay = false;
    for (var index = 0; index < OneThroughSevenLetter.length; index++) {//see if day selected is a 1-7 day
        if (OneThroughSevenLetter[index] === LetterDay) {
            foundDay = true;
            StartTime = OneThroughSeven.PeriodStart;
            EndTime = OneThroughSeven.PeriodEnd;
            PeriodNames = OneThroughSeven.Period;
            break;
        }
    }
    if (!foundDay && GradeLevel == "Sen" || !foundDay && GradeLevel == "Fresh") {

        for (var index = 0; index < OneThroughFourLetter.length; index++) {//see if day selected is a 1-4 day
            if (OneThroughFourLetter[index] === LetterDay) {


                if (GradeLevel == "Sen") {

                    StartTime = OneThroughFourSen.PeriodStart;
                    EndTime = OneThroughFourSen.PeriodEnd;
                    PeriodNames = OneThroughFourSen.Period;

                } else if (GradeLevel == "Fresh") {
                    StartTime = OneThroughFourFresh.PeriodStart;
                    EndTime = OneThroughFourFresh.PeriodEnd;
                    PeriodNames = OneThroughFourFresh.Period;
                }
                foundDay = true;
                break;
            }
        }

        if (!foundDay) {// if day has not been found, try 5-7 days
            for (var index = 0; index < FiveThroughSevenLetter.length; index++) {
                if (FiveThroughSevenLetter[index] === LetterDay) {

                    if (GradeLevel == "Sen") {

                        StartTime = FiveThroughSevenSen.PeriodStart;
                        EndTime = FiveThroughSevenSen.PeriodEnd;
                        PeriodNames = FiveThroughSevenSen.Period;

                    } else if (GradeLevel == "Fresh") {
                        StartTime = FiveThroughSevenFresh.PeriodStart;
                        EndTime = FiveThroughSevenFresh.PeriodEnd;
                        PeriodNames = FiveThroughSevenFresh.Period;
                    }
                    foundDay = true;
                    break;
                }
            }
        }
    } else if (!foundDay) {//checks to see if schedule is set for both and is not one through seven, if so throw error
        alert("In order to set a schedule for both, you must either use a 1-7 schedule or set your own");
        return;
    }
    
    for (var index = 0; index < PeriodNames.length; index++) {
        PeriodNameObjects[index].value = PeriodNames[index];
        TimeStartObjects[index].value = StartTime[index];
        TimeEndObjects[index].value = EndTime[index];

    }


}

//used when week has normal schedule
function AutoFillWeek(){
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
            if (NewNumber==12) {
                NewNumber = 0;
            }
            document.getElementById("letterDay").value = LetterOrder[NewNumber];
            break;
        }
    }
}

export default App;
