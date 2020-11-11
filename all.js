var info;
var list = document.querySelector('.list');
var num = document.querySelector('.choose');

axios
  .get(
    "https://raw.githubusercontent.com/hexschool/hexschoolNewbieJS/master/data.json"
  )
  .then(function (response) {
    info = response.data;
    updata();
  });

function updata(){
  let newArray = [];
  info.forEach(function(item){
    item.process = parseInt(item.process.substring(0,item.process.length-1));
  })

  sort();
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

function sort(){
  info.sort(function(a,b){
    return a.process < b.process;
  })
}



