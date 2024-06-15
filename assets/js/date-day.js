import events from '../resources/events.json' with {type: 'json'}

const dates = today => {

    const dates = [];

    for (let i = 0; i < 7; i++) {
        const date = new Date(today);
        date.setDate(date.getDate() + i);
        dates.push(date);
    }

    return dates;
}

const writeDates = vectorDates => {

    while (vectorDates[0].getDay() != 0) vectorDates.push(vectorDates.shift());

    const dayNameDate = document.querySelectorAll('.day-name-date');

    for (let i = 0; i < dayNameDate.length; i++) {
        dayNameDate[i].innerHTML = '<br>' +
            vectorDates[i].getDate() + " / " +
            vectorDates[i].getMonth() + " / " +
            vectorDates[i].getFullYear();
    }
}

const writeEvents = date => {

    const container = document.getElementById('event-container');
    let stringHtml = '';

    date.setHours(0, 0, 0, 0);
    for (let i = 0; i < events.length; i++) {
        const iDate = new Date(events[i].date);
        iDate.setHours(0, 0, 0, 0);
        if (date.getTime() == iDate.getTime()) {

            stringHtml +=
                '<div class="event">' +
                'Hora de Juego: ' + events[i].date +
                '</div><hr>';

        }
    }
    container.innerHTML = stringHtml;
}

const dayLink = document.querySelectorAll('.day-link');

dayLink.forEach((link, index) => {
    link.addEventListener('click', e => {
        e.preventDefault();
        console.log(index);
        writeEvents(vectorDays[index]);
    })
})

const inputDate = document.getElementById("date-picker");

inputDate.addEventListener("change", e => {
    const dateSelected = e.target.value;
    const date = new Date(dateSelected);
    date.setDate(date.getDate() + 1);
    vectorDays = dates(date);
    writeDates(vectorDays);
    writeEvents(date);
})

let vectorDays = dates(new Date());

writeDates(vectorDays);