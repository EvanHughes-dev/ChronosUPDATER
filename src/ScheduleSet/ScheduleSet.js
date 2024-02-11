
import './ScheduleSet.css'
import { GetNeededSchedule, SaveDay, IncrementWeek, GetWeekInt, GetDayOfWeek, SendAllData } from './ScheduleHandle.js';//used for support funcs

const TimeStartObjects = [];
const TimeEndObjects = [];
const PeriodNameObjects = [];
const StartBase = "PeriodStart";
const EndBase = "PeriodEnd";
const NameBase = "NamePeriod";

const ScheduleSetDisplay = () => {

    const PeriodNum = [1, 2, 3, 4, 5, 6, 7, 8];
    const LetterDays = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L']
    var Inputs = (
        <div>

            {PeriodNum.map((number) => {

                return (<div class='inputFieldHolder' name={"Period" + number}>
                    <label for={"Period" + number}>Period {number} </label>
                    <input class='inputField' type="text" id={"NamePeriod" + number} />
                    <input class='inputField' type="time" id={"PeriodStart" + number} />
                    <input class='inputField' type="time" id={"PeriodEnd" + number} />

                </div>);
            })
            }
        </div>)

    return (
        <div>
            <div name="HeaderForm">

            </div>

            <div class="DayOfWeek" id="DayOfWeek" name="DayOfWeek">Day of week: Monday</div>
            <div>

                <select id="ForWho" name="ForWho" onChange={SetSchedule}>

                    <option value="Both">Both</option>
                    <option value="Fresh">Feshman/Sophmore</option>
                    <option value="Sen">Junior/Senior</option>


                </select>
            </div>

            <div>
                <div>

                    <div name="UseDefaultSchedule">

                        <button id="CustomScheduleToggle" onClick={customSchedule}>Custom Schedule</button>

                    </div>
                </div>
                <select onChange={SetSchedule} id="letterDay" defaultValue={'X'}>

                    <option value="X" >Off School</option>

                    {LetterDays.map((LetterDayIn) => {
                        return (
                            <option value={LetterDayIn}> {LetterDayIn}</option>
                        )
                    })}
                </select>
                <br />
                {Inputs}

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
    IncrementWeek()

    if (GetWeekInt() < 5) {
        document.getElementById("DayOfWeek").innerHTML = 'Day of week: ' + GetDayOfWeek()
    } else {
        //Day is Friday. Set schedule
        document.getElementById("DayOfWeek").innerHTML = "Send it"
        document.getElementById("NextDay").style.display = "none";
    }

}



async function SendData() {


    var target = ["Sen", "Fresh"]


    target.map((targetGrade) => {

        SendAllData(targetGrade);

    })

    ClearSchedule();
}

function ClearSchedule() {
    try {
        for (var index = 0; index < 9; index++) {
            PeriodNameObjects[index].value = "";
            TimeStartObjects[index].value = "00:00";
            TimeEndObjects[index].value = "00:00";
        }
    } catch (e) { }
}

function SetSchedule() {
    if (customScheduleToggle)
        return
    for (var i = 1; i < 9; i++) {

        PeriodNameObjects[i - 1] = document.getElementById(NameBase + i);
        TimeStartObjects[i - 1] = document.getElementById(StartBase + i);
        TimeEndObjects[i - 1] = document.getElementById(EndBase + i);
    }

    if (document.getElementById("letterDay").value != "X") {
        ClearSchedule();
        SetDefault();
    } else if (document.getElementById("letterDay").value == "X") {
        ClearSchedule();
    }

}

const ClickToGenerateText = "Generate Schedule"
const ClickToCustomSchedule = "Custom Schedule"
var customScheduleToggle = false;

function customSchedule() {

    customScheduleToggle = !customScheduleToggle;

    if (customScheduleToggle) {
        document.getElementById("CustomScheduleToggle").innerHTML = ClickToGenerateText

    } else {
        document.getElementById("CustomScheduleToggle").innerHTML = ClickToCustomSchedule
        SetSchedule()
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

export default ScheduleSetDisplay;