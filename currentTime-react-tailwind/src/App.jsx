import { useState } from 'react'
import ClockAndDate from './components/ClockAndDate'
import UserTimeZone from './components/UserTimeZone'
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
dayjs.extend(utc);
dayjs.extend(timezone);

export default function App() {
  const [timeZone, setTimeZone] = useState(dayjs.tz.guess())

  function changeTZ(e) {
    e.preventDefault();
    
    setTimeZone(e.target.value);
  }

  return (
    <>
      <div className="w-full h-screen flex justify-center items-center p-4">
        <div id="app" className="bg-gray-100 w-full h-4/5 flex flex-col justify-between items-center border border-black rounded-md p-4 sm:w-3/5 font-sans">
          <h1 className="text-5xl font-semibold">Current Time</h1>
          <div id="date-and-time" className="flex flex-col items-end">
            <UserTimeZone
              tz={timeZone}
              changeTZ={changeTZ}
            />
            <ClockAndDate 
              tz={timeZone}
            />
          </div>
          <footer>
            <p>Made by <strong><a href="https://github.com/Jupkobe" className="visited:text-black">Jupkobe</a></strong></p>
          </footer>
        </div>
      </div>
    </>
  )
}
