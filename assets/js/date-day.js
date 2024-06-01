const jsonString =
    '[' +
    '{"localTeamID": 1, "visitTeamID": 2, "date": "2024-05-20T14:30:00"},' +
    '{"localTeamID": 1, "visitTeamID": 2, "date": "2024-05-20T14:30:00"},' +
    '{"localTeamID": 1, "visitTeamID": 2, "date": "2024-05-20T14:30:00"},' +
    '{"localTeamID": 1, "visitTeamID": 2, "date": "2024-05-21T14:30:00"},' +
    '{"localTeamID": 1, "visitTeamID": 2, "date": "2024-05-21T14:30:00"},' +
    '{"localTeamID": 1, "visitTeamID": 2, "date": "2024-05-21T14:30:00"},' +
    '{"localTeamID": 1, "visitTeamID": 2, "date": "2024-05-22T14:30:00"},' +
    '{"localTeamID": 1, "visitTeamID": 2, "date": "2024-05-22T14:30:00"},' +
    '{"localTeamID": 1, "visitTeamID": 2, "date": "2024-05-23T14:30:00"},' +
    '{"localTeamID": 1, "visitTeamID": 2, "date": "2024-05-24T14:30:00"},' +
    '{"localTeamID": 1, "visitTeamID": 2, "date": "2024-05-24T14:30:00"},' +
    '{"localTeamID": 1, "visitTeamID": 2, "date": "2024-05-24T14:30:00"},' +
    '{"localTeamID": 1, "visitTeamID": 2, "date": "2024-05-25T14:30:00"},' +
    '{"localTeamID": 1, "visitTeamID": 2, "date": "2024-05-25T14:30:00"},' +
    '{"localTeamID": 1, "visitTeamID": 2, "date": "2024-05-25T14:30:00"},' +
    '{"localTeamID": 1, "visitTeamID": 2, "date": "2024-05-25T14:30:00"},' +
    '{"localTeamID": 1, "visitTeamID": 2, "date": "2024-05-26T14:30:00"}' +
    ']';

const jsonObj = JSON.parse(jsonString);

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

    for (let i = 0; i < dayNameDate.length; i++)
        dayNameDate[i].innerHTML = '<br>' +
            vectorDates[i].getDate() + " / " +
            vectorDates[i].getMonth() + " / " +
            vectorDates[i].getFullYear();
}

const createSectionEvent = () => {

};

const writeEvents = date => {

    const container = document.getElementById('event-container');
    let stringHtml = '';

    date.setHours(0, 0, 0, 0);
    for (let i = 0; i < jsonObj.length; i++) {
        const iDate = new Date(jsonObj[i].date);
        iDate.setHours(0, 0, 0, 0);
        if (date.getTime() == iDate.getTime()) {

            stringHtml +=
                '<div class="event">' +
                'Hora de Juego: ' + jsonObj[i].date +
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