import { useState, useEffect } from 'react'
import dayjs from "dayjs";
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
dayjs.extend(utc);
dayjs.extend(timezone);

export default function ClockAndDate({ tz }) {
  const [dateAndTime, setDateAndTime] = useState(dayjs());
  
  const time = dateAndTime.format("HH:mm:ss");
  const date = dateAndTime.format("dddd, D MMM YYYY");

  useEffect(() => {
    setDateAndTime(dayjs().tz(tz))  // To get rid of the delay between time zone changes
    let intervalID = setInterval(() => setDateAndTime(dayjs().tz(tz)), 1000);
    
    return () => clearInterval(intervalID);
  }, [time]);

  return (           
    <>
      <h1 id="clock" className="text-7xl leading-tight sm:text-9xl sm:leading-tight">{time}</h1>
      <h3 id="date"  className="text-2xl">{date}</h3>
    </>
  )
}