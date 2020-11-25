var info;
var list = document.querySelector('.list');
var num = document.querySelector('.choose');

axios
  .get(
    "https://raw.githubusercontent.com/hexschool/hexschoolNewbieJS/master/data.json"
  )
  .then(function (response) {
    info = response.data;
    info.forEach(function(item){
      item.process = parseInt(item.process.substring(0,item.process.length-1));
      item.id = parseInt(item.id);
    })
  });

 

function updateList(e){  
  let select = e.target.value;
  
  sort(select);
  
  let newArray = slice(select);
  
  liShow(select);
  
  barChart(newArray,5);
}

function liShow(select){
  let str = "";
  if(select === 'id'){
    info.forEach(function(item){
      return str+='<li>編號 ID ' + item.id + ' 為 ' +item.name + ' ，他的特訓班完成度是 ' + item.process + ' %</li>';
    })
  }else if(select === 'process'){
    info.forEach(function(item, index){
      return str+='<li>第 '+ (index+1) + '名是 '+item.name+' ，他的特訓班完成度是 '+item.process+' %</li>';
    })
  }
  list.innerHTML = str;
}

function updata(){
  let newArray = [];

  sort("process");

  info.forEach(function(item){
    let person = [];
    person.push(item.name, item.process)

    newArray.push(person)
  })
  
  let groupOne, groupTwo, groupThree = [];
  groupOne = newArray.slice(0,9);
  groupTwo = newArray.slice(10,19);
  groupThree = newArray.slice(20,29);
  
  barChart(groupOne,2);
  barChart(groupTwo,3);
  barChart(groupThree,4);
  gaugeChart(groupOne[0]);
}

function barChart(group, index){
  
  let chart = c3.generate({
    bindto: `#chart${index}`,
    data:{
      columns: group,
      type: 'bar'
    },
    bar:{
      width:{
        ratio: 0.8
      }
    },


  })
  
}

function gaugeChart(group){

  let chart = c3.generate({
    data:{
      columns: [
        ['關卡進度',group[1]],
        ['aa', 20]
      ],
      type: 'gauge',
      onclick: function (d, i) { console.log("onclick", d, i); },
      onmouseover: function (d, i) { console.log("onmouseover", d, i); },
      onmouseout: function (d, i) { console.log("onmouseout", d, i); }
    },
    color: {
      pattern: ['#FF0000', '#F97600', '#F6C600', '#60B044'], // the three color levels for the percentage values.
      threshold: {
          values: [30, 60, 90, 100]
      }
    },
    

  })
}

function sort(value){
  
  
  if(value === "id"){
    console.log('b');
    info.sort(function(a,b){
      return a.id > b.id;
    })
  }else if(value === "process"){    
    console.log('a');
    info.sort(function(a,b){
      return a.process < b.process;
    })
  }
  
}

function slice(select){
  let newArray = [];
  info.forEach(function(item){
    let person = [];
    person.push(item.name, `item.${select}`)
    newArray.push(person)
  })
  return newArray;
}



num.addEventListener('change', updateList)