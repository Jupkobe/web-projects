import MicroModal from "micromodal";
import dayjs from "dayjs";
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
dayjs.extend(utc);
dayjs.extend(timezone);


async function fetchTimeZones() {
    let response = await fetch("http://worldtimeapi.org/api/timezone");
    return await response.json();
}


function setDateLoop(userTZ = dayjs.tz.guess()) {
    let intervalID = sessionStorage.getItem("interval");
    if (intervalID) {
        clearInterval(JSON.parse(intervalID));
    }

    updateDateAndTime(dayjs().tz(userTZ))
    intervalID = setInterval(() => {
        updateDateAndTime(dayjs().tz(userTZ));
    }, 1000);

    sessionStorage.setItem("interval", JSON.stringify(intervalID));
    displayTimeZone(userTZ);
}


function displayTimeZone(userTZ) {
    const tzElem = document.querySelector("#timezone");

    tzElem.innerHTML = `${userTZ} `;
}


function updateDateAndTime(dateObj) {
    const dateElem = document.querySelector("#date");
    dateElem.textContent = `${dateObj.format("dddd, D MMM YYYY")}`;

    const clockElem = document.querySelector("#clock");
    clockElem.textContent = `${dateObj.format("HH:mm:ss")}`;
}


async function pickTimeZone() {
    let timeZones = await fetchTimeZones();
    const selectElem = document.querySelector("#tz");
    
    await timeZones.forEach((zone) => {
        const optionElem = document.createElement("option");
        optionElem.value = zone;
        optionElem.append(document.createTextNode(zone));

        if (zone == dayjs.tz.guess()) optionElem.setAttribute("selected", "");
        selectElem.append(optionElem);
    });

    MicroModal.show("modal-1");
}


function changeTimeZone() {    
    const selectElem = document.querySelector("#tz");
    const tz = selectElem.selectedOptions[0].value;

    setDateLoop(tz);
    
    MicroModal.close("modal-1");
}


function init() {
    MicroModal.init();      
    setDateLoop();
    document.querySelector("i").addEventListener("click", pickTimeZone);
    document.querySelector("#submit").addEventListener("click", changeTimeZone);
}


document.addEventListener("DOMContentLoaded", init);
