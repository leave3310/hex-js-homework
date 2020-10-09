axios
  .get(
    "https://raw.githubusercontent.com/hexschool/hexschoolNewbieJS/master/data.json"
  )
  .then(function (response) {
    response.data.forEach(function (item, index) {
      console.log(`${index} ${item.name}`);
    });
  });
