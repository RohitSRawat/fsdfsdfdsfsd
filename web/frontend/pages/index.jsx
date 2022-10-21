import {
  Card,
  Page,
  Layout,
  TextContainer,
  Image,
  Stack,
  Link,
  Heading,
} from "@shopify/polaris";
import { TitleBar } from "@shopify/app-bridge-react";
import React, { useState, useEffect ,useCallback} from "react";
import { trophyImage } from "../assets";
import { useAuthenticatedFetch } from "../hooks/useAuthenticatedFetch";
import { ProductsCard } from "../components";
import { Chart as ChartJS, ArcElement,Title,LineElement, Tooltip, Legend,CategoryScale,LinearScale,PointElement } from "chart.js";
import { Doughnut,Pie ,Line } from "react-chartjs-2";
import { check } from "prettier";
import { DatePicker } from "@shopify/polaris";
import fetchdate from './date'
import {Spinner} from '@shopify/polaris';

ChartJS.register(ArcElement, Tooltip, Legend,CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  
  );

export default function HomePage() {
  const fetch = useAuthenticatedFetch();
  const [count, setCount] = useState(0);
  const [promise, setpromise] = useState(null);
  const [data, setdata] = useState(null);
  const [filter, setfilter] = useState("Today");
 
var objdate = fetchdate()
  useEffect(async () => {
    
    const ss = fetch(`/api/fetchorder?filter=${filter}}`).then((res) =>  res.json()).then((response) => {
    var start,end 
   
if(filter == 'Today'){
start = objdate.future
end = objdate.today
}
if(filter == 'Yesterday'){
  start = objdate.today
  end = objdate.yesterday
}
if(filter == 'Last 7 Days'){
  start = objdate.future
end = objdate.lastsevendays
}
if(filter == 'Last 14 Days'){
  start = objdate.future
end = objdate.fourteendays
}
if(filter == 'Last 30 Days'){
  start = objdate.future
end = objdate.lastthirtydays
}
if(filter == 'Last 60 Days'){
  start = objdate.future
end = objdate.lastsixtytydays
}

   var filterresponse = response.filter((x) => {
    var check = new Date(x[1])
   
    if (check <= start && check >= end) {
      return true 
      } else {
      return false 
     
      }
   })
      setpromise(filterresponse);


      setCount(filterresponse.length);
      

    });
   
  },[filter]);


  const check = () => {
    if (count != 0) {
      var obj = {
        Twitter: [],
        Instagram: [],
        Facebook: [],
        Youtube: [],
        Google: [],
        Other: [],
      };

      promise.forEach((element) => {
        obj[element[0][0].value].push(element[0][0].value);
      });

      var counts = Object.values(obj).map((x) => {
        return x.length;
      });

      const data = {
        labels: [
          "Twitter",
          "Instagram",
          "Facebook",
          "Youtube",
          "Google",
          "Other",
        ],
        datasets: [
          {
            label: "# of Votes",
            data: counts,
            backgroundColor: [
              "#1c9cea",
              "#f73b76",
              "#4065ad",
              "#f70000",
              "#d8bf2c",
              "rgb(127 229 34)",
            ],
            borderColor: [
              "#1c9cea",
              "#f73b76",
              "#4065ad",
              "#f70000",
              "#d8bf2c",
              "rgb(127 229 34)",
            ],
            borderWidth: 1,
          },
        ],
      };
    
const getdata = () => {
  return Object.entries(obj).map(([key,value]) => {
     return (
      <div key={key} className="socialcount">
        <h3>{key}</h3>
        <h3>{value.length}</h3>
      </div>
     )
  })
}
      return (
        <React.Fragment>
          <div className="topheader">
           <div> <h1>Overview</h1></div>
            <div className="dateindex">
              <h1>{filter}</h1>
            <select onChange={(e) =>  {
              
             
              setfilter(e.target.value)
             
            }} name="cars" id="cars">
  <option value="Today">{new Date().toLocaleDateString()}</option>
  <option value="Yesterday">Yesterday</option>
  <option value="Last 7 Days">Last 7 Days</option>
  <option value="Last 14 Days">Last 14 Days</option>
  <option value="Last 30 Days">Last 30 Days</option>
  <option value="Last 60 Days">Last 60 Days</option>
</select>
            </div>
          </div>

          <div className="ordercount">
     <div className="count">
    <div style={{textAlign:'center'}}>
    <h2>Total Orders</h2>
      <h1>{count}</h1>
    </div>
     <div>
     {getdata()}
     </div>
     </div>
     <div className="chart">
            
            <Doughnut data={data} />
          </div>

          </div>
          
       
          

        </React.Fragment>
      );
    } else {
       var obj = {
        Twitter: [],
        Instagram: [],
        Facebook: [],
        Youtube: [],
        Google: [],
        Other: [],
      };


      var counts = Object.values(obj).map((x) => {
        return x.length;
      });

      const data = {
        labels: [
          "Twitter",
          "Instagram",
          "Facebook",
          "Youtube",
          "Google",
          "Other",
        ],
        datasets: [
          {
            label: "# of Votes",
            data: counts,
            backgroundColor: [
              "#1c9cea",
              "#f73b76",
              "#4065ad",
              "#f70000",
              "#d8bf2c",
              "rgb(127 229 34)",
            ],
            borderColor: [
              "#1c9cea",
              "#f73b76",
              "#4065ad",
              "#f70000",
              "#d8bf2c",
              "rgb(127 229 34)",
            ],
            borderWidth: 1,
          },
        ],
      };
    
const getdata = () => {
  return Object.entries(obj).map(([key,value]) => {
     return (
      <div key={key} className="socialcount">
        <h3>{key}</h3>
        <h3>{value.length}</h3>
      </div>
     )
  })
}
      return (
        <React.Fragment>
          <div className="topheader">
           <div> <h1>Overview</h1></div>
            <div className="dateindex">
              <h1>{filter}</h1>
            <select onChange={(e) =>  {
              
             
              setfilter(e.target.value)
             
            }} name="cars" id="cars">
  <option value="Today">{new Date().toLocaleDateString()}</option>
  <option value="Yesterday">Yesterday</option>
  <option value="Last 7 Days">Last 7 Days</option>
  <option value="Last 14 Days">Last 14 Days</option>
  <option value="Last 30 Days">Last 30 Days</option>
  <option value="Last 60 Days">Last 60 Days</option>
</select>
            </div>
          </div>

          <div className="ordercount">
     <div className="count">
    <div style={{textAlign:'center'}}>
    <h2>Total Orders</h2>
      <h1>{count}</h1>
    </div>
     <div>
     {getdata()}
     </div>
     </div>
     <div className="chart">
            
            <Doughnut data={data} />
          </div>

          </div>
          
       
          

        </React.Fragment>)
    }
  };

  
  return <div>{check()}</div>;
}
