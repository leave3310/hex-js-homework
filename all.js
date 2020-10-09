var inputHeight = document.querySelector('.height')
var inputWeight = document.querySelector('.weight')
var btnSend = document.querySelector('.send')
var listRender = document.querySelector('.listRecord')
var btnClear = document.querySelector('.clear')
var averageBMI = document.querySelector('.average')
var recordBMI = []
var bmiStatus={
  "overthing":{
    class: "text-danger",
    nameStatus: '過輕'
  },
  "normal":{
    class: "text-success",
    nameStatus: '正常'
  },
  "waring":{
    class: "text-warning",
    nameStatus: "過重"
  },
  "dangerous":{
    class: "text-danger",
    nameStatus: '危險'
  }
}
function clear(){
  inputWeight.value = ''
  inputHeight.value = ''
}
function render(){
  var str = "" 
  recordBMI.forEach(function(item){
    return str+='<li class="mx-auto border border-primary mb-1 col-md-7 flex-wrap col-12"><h3 class="'+bmiStatus[item.status].class+'">'+bmiStatus[item.status].nameStatus+
    "</h3><h4 class='text-primary'>BMI "+item.bmi+
    "</h4><h4 class='text-primary'>height: "+item.height+
    "cm</h4><h4 class='text-primary'>weight: "+item.weight+"kg</h4></li>"
  })
  var ave = 0
  var count = 0
  recordBMI.forEach(function(item){
    ave=ave+item.bmi
    count++
  })
  ave=ave/count
  listRender.innerHTML = str
  averageBMI.innerHTML = "<h2>總計測量" + count + "次，平均BMI為"+ave+"</h5>" 
}

function calculateBMI(){
  var numHeight = parseInt(inputHeight.value) 
  var numWeight = parseInt(inputWeight.value)
  var BMI = numWeight / ((numHeight/100)*2)
  var userRecord = {
    height : '',
    weight : '',
    bmi : '',
    status : '',
  }
  userRecord.height = numHeight
  userRecord.weight = numWeight
  userRecord.bmi = BMI 
  if(BMI<18.5){
    userRecord.status='overthing'
  }else if(BMI <=23){
    userRecord.status='normal'
  }else if(BMI <= 35){
    userRecord.status='waring'
  }else{
    userRecord.status='dangerous'
  }
  recordBMI.unshift(userRecord)
  render()
}
btnClear.addEventListener('click', clear)
btnSend.addEventListener('click', calculateBMI)
