function getMonth(number) {
    switch (number) {
        case 0:
            return 'январь';
        case 1:
            return 'февраль';
        case 2:
            return 'март';
        case 3:
            return 'апрель';
        case 4:
            return 'май';
        case 5:
            return 'июнь';
        case 6:
            return 'июль';
        case 7:
            return 'август';
        case 8:
            return 'сентябрь';
        case 9:
            return 'октябрь';
        case 10:
            return 'ноябрь';
        case 11:
            return 'декабрь';
    }
}

function getMonthRP(number) {
    switch (number) {
        case 0:
            return 'января';
        case 1:
            return 'февраля';
        case 2:
            return 'марта';
        case 3:
            return 'апреля';
        case 4:
            return 'мая';
        case 5:
            return 'июня';
        case 6:
            return 'июля';
        case 7:
            return 'августа';
        case 8:
            return 'сентября';
        case 9:
            return 'октября';
        case 10:
            return 'ноября';
        case 11:
            return 'декабря';
    }
}

function formatDate(date) {

    var dd = date.getDate();
    if (dd < 10) dd = '0' + dd;

    var mm = date.getMonth() + 1;
    if (mm < 10) mm = '0' + mm;

    var yy = date.getFullYear();

    return dd + '.' + mm + '.' + yy;
}

function getDay(n) {
    return formatDate(generateDate(n))
}

function generateDate(n) {
    let a = new Date();
    let result = new Date(a.getTime() - (86400000 * n));
    return result;
}

function formatDay(Date) {
    let dd = Date.getDate();
    if (dd < 10) dd = '0' + dd;
    return String(dd);
}

function formatNumber(data) {
    return new Intl.NumberFormat('ru-RU').format(data);
}

function update_confirmed(data) {
    conf_c.innerHTML = formatNumber(data);
}

function getSliderValue() {
    var SliderVAL = $('.slider-input').jRange('getValue');
    return SliderVAL;
}

function drawMap(confirmed) {
    google.charts.load('current', {
        'packages': ['geochart'],

        'mapsApiKey': 'AIzaSyA9QrkVT_C0Pc9Qay6HajKtebRnIb1BWUw'
    });
    google.charts.setOnLoadCallback(drawRegionsMap);

    function drawRegionsMap() {
        var data = google.visualization.arrayToDataTable([
            ['Страна', 'Случаи'],
            ['Germany', 1500000],
            ['Brazil', 2200000],
            ['RU', confirmed]
        ]);

        var options = {
            region: 'RU',
            colorAxis: {
                colors: ['#fff', '#f8da84', '#ff0000', '#4d0000']
            }
        };

        var chart = new google.visualization.GeoChart(document.getElementById('regions_div'));

        chart.draw(data, options);
    }
}

function update_data(confirmed) {
    drawMap(confirmed);
    update_confirmed(confirmed);
}

function getAllConf(data, index) {
    let nakop = 0
    for (let i = 0; i < index; i++) {
        nakop += data[index];
    }
    return new_arr[0] + nakop
}

function slider_changed() {
    value = getSliderValue() - 1;
    update_data(data_confirmed[value]);
}

function getFullDate(Date) {
    dd = Date.getDate();
    month = getMonthRP(Date.getMonth());
    year = Date.getFullYear();

    return dd + " " + month + " " + year;
}

function getPrirost(a, b) {
    return archive[b] - archive[a];
}