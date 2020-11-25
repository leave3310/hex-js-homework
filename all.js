var info;
var list = document.querySelector(".list");
var num = document.querySelector(".choose");
var data = { CompletetionRate: ["完成率"], name: [] };

axios
  .get(
    "https://raw.githubusercontent.com/hexschool/hexschoolNewbieJS/master/data.json"
  )
  .then(function (response) {
    info = response.data;
    info.forEach(function (item) {
      item.process = parseInt(
        item.process.substring(0, item.process.length - 1) //轉成int
      );
      item.id = parseInt(item.id); //轉成int
    });
  });

function updateList(e) {
  let select = e.target.value; // 看select選到甚麼值
  
  sort(select); //依照select選到的值做排序
  
  liShow(select); //讓li展現出來
  
  barChart(); //展現圖表的部分
}

function sort(value) {
  data = { CompletetionRate: ["完成率"], name: [] };
  if (value === "id") {
    info.sort(function (a, b) {
      return a.id > b.id;
    });
  } else if (value === "process") {
    
    info.sort(function (a, b) {
      return a.process < b.process;
    });
  }
  info.forEach(function (item) {
    data.CompletetionRate.push(parseFloat(item.process) / 100);
    data.name.push(item.name);
  });
  
}

function liShow(select) {
  let str = "";
  if (select === "id") {
    info.forEach(function (item) {
      return (str +=
        "<li>編號 ID " +
        item.id +
        " 為 " +
        item.name +
        " ，他的特訓班完成度是 " +
        item.process +
        " %</li>");
    });
  } else if (select === "process") {
    info.forEach(function (item, index) {
      return (str +=
        "<li>第 " +
        (index + 1) +
        "名是 " +
        item.name +
        " ，他的特訓班完成度是 " +
        item.process +
        " %</li>");
    });
  }
  
  list.innerHTML = str;
}

function barChart() {
  let chart = c3.generate({
    bindto: "#chartBar",
    data: {
      columns: [[...data.CompletetionRate]],
      type: "bar",
      axes: {
        "完成率": "y2",
      },
    },
    size: {
      height: data.name.length*25, //調整圖表高度
      
    },
    bar: {
      width: {
        ratio: 0.8,
      },
    },
    axis: {
      rotated: true, //轉成橫向
      x: {
        type: "category", // 左側 X 軸顯示
        categories: data.name, //參賽姓名資料
        label: {
          text: "參賽者姓名",
          position: "outer-center",
        },
      },
      y: {
        show: true, //下方 Y 軸顯示
        categories: data.CompletionRate,
        label: {
          text: "完成率%",
          position: "outer-middle", //名稱位置
        },
      },
      y2: {
        show: true, //上方 Y 軸顯示
        categories: data.CompletionRate,
        label: {
          text: "完成率%",
          position: "outer-middle", //名稱位置
        },
      },
    },
  });
}

num.addEventListener("change", updateList);
