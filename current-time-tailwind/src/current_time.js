let date = dayjs();


function setDateLoop() {
    let date = dayjs();
    setInterval(() => {
        let date = dayjs();
        updateDateAndTime(date);
    }, 1000);
    // updateTimeZone(date);
}

// function updateTimeZone(dateObj) {
//     dateObj.get
// }

function updateDateAndTime(dateObj) {
    updateDate(dateObj);
    updateTime(dateObj);
}


function updateDate(dateObj) {
    let weekday = dateObj.day();
    let day = dateObj.date()
    let month = dateObj.month();
    let year = dateObj.year();

    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const months = ["Jan", "Feb", "March", "April", "May", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec"]

    const dateElem = document.querySelector("#date");
    dateElem.textContent = `${days[weekday]}, ${day} ${months[month]} ${year}`;
                            //Sunday, 22 Oct 2023
}


function updateTime(dateObj) {
    let hour = dateObj.hour();
    let minute = dateObj.minute();
    let second = dateObj.second();

    const clockElem = document.querySelector("#clock");
    clockElem.textContent = `${hour > 9 ? hour : "0" + hour}:${minute > 9 ? minute : "0" + minute}:${second > 9 ? second : "0" + second}`;
}



function init() {
    document.addEventListener("DOMContentLoaded", setDateLoop);
}

init(); 