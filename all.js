var info;
let bigger = 0;
let smaller = 0;

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
    name();
    barChart();
  });

function name(){
  info.forEach(function(item){
    if(item.name){
      let len = item.name;
      let count = 0;
      for(let i = 0; i<len.length; i++){
        if(len.charCodeAt(i) > 255){
          count+=2;
        }else{
          count++;
        }
      }
      count >= 7 ? ++bigger : ++smaller;
    }else{
      smaller++;
    }
  })
}

function barChart(){
  var chart = c3.generate({
    bindto: '.content',
    data: {
        // iris data from R
        columns: [
            ['參賽者姓名在6個(含)字元數以下', smaller],
            ['參賽者姓名在7個(含)字元數以上', bigger],
        ],
        type : 'pie',
    }
  });
}
