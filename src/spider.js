let axios = require ('axios');

var dataList;
( async function(){
    var res = await axios.get('https://www.cdc.gov/covid-data-tracker/Content/CoronaViewJson_01/US_MAP_DATA.json')
    console.log(res.data);
    dataList=res.data.US_MAP_DATA
})()
// console.log(dataList); 

