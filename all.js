var info;
let count = 0;
let total = 0;
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
      total++;
    });
    info.forEach(function (item) {
      if (item.process === 0) count++;
    });
    load();
  });

function load() {
  var chart = c3.generate({
    bindto: "#content",
    data: {
      // iris data from R
      columns: [
        ["0%進度參賽者", count],
        ["至少過一關以上的參賽者", total - count],
      ],
      type: "pie",
    },
  });
}
