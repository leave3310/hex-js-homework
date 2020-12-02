let inputHeight = document.querySelector(".height");
let inputWeight = document.querySelector(".weight");
let btnSend = document.querySelector(".send");
let listRender = document.querySelector(".listRecord");
let btnClear = document.querySelector(".clear");
let averageBMI = document.querySelector(".average");
let recordBMI = [];
let bmiStatus = {
  overthing: {
    class: "text-danger",
    nameStatus: "過輕",
  },
  normal: {
    class: "text-success",
    nameStatus: "正常",
  },
  waring: {
    class: "text-warning",
    nameStatus: "過重",
  },
  dangerous: {
    class: "text-danger",
    nameStatus: "危險",
  },
};
function clear() {
  inputWeight.value = "";
  inputHeight.value = "";
}
function render() {
  let str = "";
  recordBMI.forEach(item => {
    return str +=
      `<li class="mx-auto border border-primary mb-1 col-md-7 flex-wrap col-12">
        <h3 class="bmiStatus[item.status].class+">${bmiStatus[item.status].nameStatus}</h3>
        <h4 class="text-primary">BMI: ${item.bmi}</h4>
        <h4 class="text-primary">height: ${item.height} cm</h4>
        <h4 class="text-primary">weight: ${item.weight} kg</h4>
      </li>`;
  });
  let ave = 0;
  let count = 0;
  recordBMI.forEach(item => {
    ave = ave + item.bmi;
    count++;
  });
  ave = ave / count;
  listRender.innerHTML = str;
  averageBMI.innerHTML = `<h2>總計測量 ${count} 次，平均BMI為 ${ave} </h2>`;
}

function calculateBMI() {
  let numHeight = parseInt(inputHeight.value);
  let numWeight = parseInt(inputWeight.value);
  let BMI = numWeight / ((numHeight / 100) * 2);
  let userRecord = {
    height: "",
    weight: "",
    bmi: "",
    status: "",
  };
  userRecord.height = numHeight;
  userRecord.weight = numWeight;
  userRecord.bmi = BMI;
  BMI < 18.5 ? userRecord.status = "overthing" : BMI <= 23 ? userRecord.status = "normal" : BMI <= 35 ? userRecord.status = "waring" : userRecord.status = "dangerous";
  recordBMI.unshift(userRecord);
  render();
}
btnClear.addEventListener("click", clear);
btnSend.addEventListener("click", calculateBMI);
