import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import {
  GetNeededSchedule,
  SaveDay,
  IncrementWeek,
  GetWeekInt,
  GetDayOfWeek,
  SendAllData,
} from "../ScheduleHandle.jsx";

import {
  Container,
  Row,
  Col,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
} from "reactstrap";

const PeriodNum = [1, 2, 3, 4, 5, 6, 7, 8];
const LetterDays = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L"];

const DefaultSchedule = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [scheduleData, setScheduleData] = useState(
    Array(8).fill({ name: "", start: "00:00", end: "00:00" })
  );
  const [letterDay, setLetterDay] = useState("X");
  const [weekDayText, setWeekDayText] = useState("Day of week: Monday");

  useEffect(() => {
    if (location.pathname === "/") {
      navigate("/Default");
    }
  }, [location, navigate]);

  useEffect(() => {
    letterDay === "X" ? clearSchedule() : setDefault();
  }, [letterDay]);

  const clearSchedule = () => {
    setScheduleData(Array(8).fill({ name: "", start: "00:00", end: "00:00" }));
  };

  const setDefault = () => {
    const schedule = GetNeededSchedule(letterDay, "Fresh");
    const updated = Object.keys(schedule).map((period) => ({
      name: period,
      start: schedule[period][0],
      end: schedule[period][1],
    }));

    while (updated.length < 8) {
      updated.push({ name: "", start: "00:00", end: "00:00" });
    }

    setScheduleData(updated);
  };

  const nextDay = () => {
    ["Fresh", "Sen"].forEach(SaveDay);
    clearSchedule();
    IncrementWeek();

    const weekInt = GetWeekInt();
    setWeekDayText(weekInt < 5 ? `Day of week: ${GetDayOfWeek()}` : "Send it");
  };

  const autoFillWeek = () => {
    if (letterDay === "X") {
      alert("Cannot auto-fill. Start day not defined.");
      return;
    }

    for (let i = 0; i < 5; i++) {
      setDefault();
      ["Fresh", "Sen"].forEach(SaveDay);
      IncrementWeek();
      if (i < 4) nextLetterDay();
    }
    setLetterDay("X");
    sendData();
  };

  const sendData = () => {
    ["Fresh", "Sen"].forEach(SendAllData);
    clearSchedule();
  };

  const nextLetterDay = () => {
    const nextIndex = (LetterDays.indexOf(letterDay) + 1) % LetterDays.length;
    setLetterDay(LetterDays[nextIndex]);
  };

  return (
    <Container className="my-4">
      <h4 className="mb-3 text-center">{weekDayText}</h4>

      <Form>
        <FormGroup>
          <Label for="letterDaySelect">Select Letter Day:</Label>
          <Input
            type="select"
            id="letterDaySelect"
            value={letterDay}
            onChange={(e) => setLetterDay(e.target.value)}
          >
            <option value="X">Off School</option>
            {LetterDays.map((day) => (
              <option key={day} value={day}>
                {day}
              </option>
            ))}
          </Input>
        </FormGroup>

        {letterDay === "X" ? (
          <div className="text-center text-muted fs-5 my-4">
            📅 No schedule – School is off for the day.
          </div>
        ) : (
          scheduleData
            .filter((period) => period.name !== "")
            .map((period, index) => (
              <FormGroup key={index} className="border p-3 mb-3 rounded">
                <Row className="align-items-center text-center">
                  <Col xs={12} md={2}>
                    <Label className="fw-bold">Period {index + 1}</Label>
                  </Col>
                  <Col xs={12} md={3}>
                    <Input
                      type="text"
                      value={period.name}
                      readOnly
                      placeholder="Subject"
                    />
                  </Col>
                  <Col xs={6} md={3}>
                    <Input
                      type="text"
                      readOnly
                      value={period.start === "00:00" ? "--:--" : period.start}
                    />
                  </Col>
                  <Col xs={6} md={3}>
                    <Input
                      type="text"
                      readOnly
                      value={period.end === "00:00" ? "--:--" : period.end}
                    />
                  </Col>
                </Row>
              </FormGroup>
            ))
        )}

        <div className="text-center mt-4">
          <Button color="primary" className="me-2" onClick={nextDay}>
            Next Day
          </Button>
          <Button color="warning" className="me-2" onClick={autoFillWeek}>
            Auto-Fill
          </Button>
          <Button color="success" onClick={sendData}>
            Submit Data
          </Button>
        </div>
      </Form>
    </Container>
  );
};

export default DefaultSchedule;
