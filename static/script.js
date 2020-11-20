let new_arr = archive.reverse();

let now = new Date();
let d1 = new Date(now.getTime() + (86400000 * 1));
let d2 = new Date(now.getTime() + (86400000 * 2));
let d3 = new Date(now.getTime() + (86400000 * 3));

let pred_value;


let data_confirmed = [new_arr[1], new_arr[0], getAllConf(py_data, 0), getAllConf(py_data, 1), getAllConf(py_data, 2)]

update_data(data_confirmed[0]);

document.querySelector(".sliderrange").addEventListener("mousedown", function () {
  pred_value = getSliderValue();
})

yearnow.innerHTML = now.getFullYear();
data_today.innerHTML = getFullDate(now);

document.querySelector(".sliderrange").addEventListener("mouseup", function () {
  setTimeout("slider_changed()", 0.0000001);
})

let my_string;
if (now.getDate() < 21) {
  let pred_m;
  if (now.getMonth() == 1) {
    pred_m = 11;
  } else {
    pred_m = now.getMonth() - 1;
  }
  my_string = getMonth(pred_m) + ' — ' + getMonth(now.getMonth()) + ' ' + now.getFullYear();
} else {
  my_string = getMonth(now.getMonth()) + ' ' + now.getFullYear();
}


$('.slider-input').jRange({
  from: 1,
  to: 5,
  step: 1,
  scale: ['Вчера', 'Сегодня', 'Завтра', formatDate(d2), formatDate(d3)],
  format: '%s',
  width: 1100,
  showLabels: true,
  snap: true,
});
$('.slider-input').jRange('setValue', '1');



let new_cases_today;

let today_data_ru = [];
let data_r = JSON.parse(data_api);

new_conf.innerHTML = '+' + formatNumber(data_r['data']['regions']['russia']['change']['total_cases']);
all_conf.innerHTML = formatNumber(data_r['data']['regions']['russia']['total_cases']);

new_rec.innerHTML = '+' + formatNumber(data_r['data']['regions']['russia']['change']['recovered']);
all_rec.innerHTML = formatNumber(data_r['data']['regions']['russia']['recovered']);

new_deaths.innerHTML = '+' + formatNumber(data_r['data']['regions']['russia']['change']['deaths']);
all_deaths.innerHTML = formatNumber(data_r['data']['regions']['russia']['deaths']);

new_cases_today = data_r['data']['regions']['russia']['change']['total_cases'];


google.charts.load('current', {
  'packages': ['bar']
});
google.charts.setOnLoadCallback(drawChart);

google.charts.load("current", {
  packages: ['corechart']
});
google.charts.setOnLoadCallback(drawChart);





function drawChart() {
  var data = google.visualization.arrayToDataTable([
    ['Дата', 'Новые заражения', {
      role: 'style'
    }],
    [getDay(21), getPrirost(21, 20), "red"],
    [getDay(20), getPrirost(20, 19), "red"],
    [getDay(19), getPrirost(19, 18), "red"],
    [getDay(18), getPrirost(18, 17), "red"],
    [getDay(17), getPrirost(17, 16), "red"],
    [getDay(16), getPrirost(16, 15), "red"],
    [getDay(15), getPrirost(15, 14), "red"],
    [getDay(14), getPrirost(14, 13), "red"],
    [getDay(13), getPrirost(13, 12), "red"],
    [getDay(12), getPrirost(12, 11), "red"],
    [getDay(11), getPrirost(11, 10), "red"],
    [getDay(10), getPrirost(10, 9), "red"],
    [getDay(9), getPrirost(9, 8), "red"],
    [getDay(8), getPrirost(8, 7), "red"],
    [getDay(7), getPrirost(7, 6), "red"],
    [getDay(6), getPrirost(6, 5), "red"],
    [getDay(5), getPrirost(5, 4), "red"],
    [getDay(4), getPrirost(4, 3), "red"],
    [getDay(3), getPrirost(3, 2), "red"],
    [getDay(2), getPrirost(2, 1), "red"],
    [getDay(1), new_cases_today, "red"],
    [formatDate(now), py_data[0], "orange"],
    [formatDate(d1), py_data[1], "orange"],
    [formatDate(d2), py_data[2], "orange"],
  ]);
  var options = {
    title: "Число новых выявленных заражений в последние три недели, " + my_string,
    width: 1100,
    height: 600,
    bar: {
      groupWidth: '60%'
    },
    legend: {
      position: 'none'
    },
    hAxis: {
      title: 'Красным выделены точные данные, оранжевым — предсказание алгоритма',
      titleTextStyle: {
        fontSize: 18,
        bold: true,
        color: '#222',
        italic: false
      }
    },

  };
  var chart = new google.visualization.ColumnChart(document.getElementById('columnchart_material'));
  chart.draw(data, options);
}