var info;
var list = document.querySelector('.list');
var num = document.querySelector('.choose');

axios
  .get(
    "https://raw.githubusercontent.com/hexschool/hexschoolNewbieJS/master/data.json"
  )
  .then(function (response) {
    info = response.data;

  });

function updateList(e){
  let select = e.target.value;
  let str = "";
  let tmp = info;
  if(select === 'id'){
    tmp.sort(function(a,b){
      return parseInt(a.id) > parseInt(b.id)
    })
    tmp.forEach(function(item){
      return str+= '<li>編號 ID '+ item.id + ' 為 '+item.name+' ，他的特訓班完成度是 '+item.process+'</li>'
    })
  }else if(select === 'process'){
    tmp.forEach(function(item){
      item.process = parseInt(item.process.substring(0,item.process.length-1));
      console.log(item.process);
    })
    
    
    tmp.sort(function(a,b){
      return a.process < b.process
    })
    tmp.forEach(function(item,index){
      return str+= '<li>第 '+ (index+1) + '名是 '+item.name+' ，他的特訓班完成度是 '+item.process+' %</li>'
    })
  }
  list.innerHTML = str;
}

num.addEventListener('change', updateList)

