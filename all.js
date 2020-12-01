var info;
var list = document.querySelector(".pie");
var num = document.querySelector(".line");
let twenty = 0, twentyone = 0, fifty = 0;
axios
  .get(
    "https://raw.githubusercontent.com/hexschool/hexschoolNewbieJS/master/data.json"
  )
  .then(function (response) {
    info = response.data;
    info.forEach(function (item) {
      item.process = parseInt(
        item.process.substring(0, item.process.length - 1)
      );
      item.id = parseInt(item.id);
    });
    classify();
    pie();
    barChart();
  });

function pie() {
  var chart = c3.generate({
    bindto: ".pie",
    data: {
      // iris data from R
      columns: [
        ["完課率0~20%", twenty],
        ["完課率21~49%", twentyone],
        ["完課率50%以上", fifty],
      ],
      type: "pie",
    },
  });
}
function classify() {
  info.forEach(function (item) {
    item.process >= 50 ? fifty++ : item.process >= 21 ? twentyone++ : twenty++;
  });
}

function barChart() {
  let chart = c3.generate({
    bindto: ".line",
    data: {
      columns: [
        ["完課率0~20%", twenty],
        ["完課率21~49%", twentyone],
        ["完課率50%以上", fifty],
      ],
      type: "bar",
    },
    bar: {
      width: {
        ratio: 0.5,
      },
    },
  });
}
