import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import jsonData from './US_MAP_DATA.json';
import './case.css'

// https://www.cdc.gov/covid-data-tracker/Content/CoronaViewJson_01/US_MAP_DATA.json


var stateObj = {
  // 'NY':{
  //   tot_cases:0,
  //   tot_death:0,
  // }
}

jsonData.US_MAP_DATA.forEach((item,i) => {
  if (stateObj[item.abbr] == undefined ) {
    stateObj[item.abbr] = {
      // name:'',
      tot_cases:0,
      tot_death:0,
    }
  }

  item.tot_cases = item.tot_cases?item.tot_cases:0;
  item.tot_death = item.tot_death?item.tot_death:0;

  stateObj[item.abbr] = {
    abbr: item.abbr,
    name: item.name,
    tot_cases: stateObj[item.abbr].tot_cases+item.tot_cases,
    tot_death: stateObj[item.abbr].tot_death+item.tot_death,
  }
});

let stateList = []
for (const key in stateObj) {
  stateList.push(stateObj[key])
}

console.log(stateObj);
console.log(stateList);

stateList.sort((a,b)=>{
  if(a.tot_cases<b.tot_cases){
    return 1;
  }else if(a.tot_cases>b.tot_cases){
    return -1;
  }else{
    return 0
  }
})

class CaseList extends React.Component{
  constructor(props){
    super(props)
  }
  render(){
    return (
      <div>
        <h1>COVID Data</h1>
        <ul>
          <li>
            <h3>Area</h3>
            <h3>Name</h3>
            <h3>Total Cases</h3>
            <h3>Total Death</h3>
          </li>
          {
              this.props.list.map((item,index)=>{
                return (
                  <li>
                    <span>{item.abbr}</span>
                    <span>{item.name}</span>
                    <span>{item.tot_cases}</span>
                    <span>{item.tot_death}</span>
                  </li>
                )
              })
            }
        </ul>
      </div>
    )
  }
}

ReactDOM.render(
  <CaseList list={stateList} ></CaseList>,
  document.querySelector('#root')
)




serviceWorker.unregister();
