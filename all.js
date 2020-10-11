
axios
  .get(
    "https://raw.githubusercontent.com/hexschool/hexschoolNewbieJS/master/data.json"
  )
  .then(function (response) {
    let info = response.data;
    info.sort(function(a,b){
      return a.process < b.process
    })    
    
    info.forEach(function(item, index){
      console.log("第 "+index+" 名是 "+item.name+"，他的特訓班完成度是 "+item.process);
    })
  });
