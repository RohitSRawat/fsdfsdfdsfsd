const fetchdate = () => {
    var today = new Date(new Date().toLocaleDateString());
  var lastsevendays =  new Date(new Date(new Date().setDate(today.getDate() - 7)).toLocaleDateString())
  var fourteendays =  new Date(new Date(new Date().setDate(today.getDate() - 14)).toLocaleDateString())
  var yesterday =  new Date(new Date(new Date().setDate(today.getDate() - 1)).toLocaleDateString())
  
  var lastthirtydays =  new Date(new Date(new Date().setDate(today.getDate() - 30)).toLocaleDateString())
  var lastsixtytydays =  new Date(new Date(new Date().setDate(today.getDate() - 60)).toLocaleDateString())
  var future =  new Date(new Date(new Date().setDate(today.getDate() +1 )).toLocaleDateString())

 

  var objj = {today,lastsevendays,fourteendays,yesterday,lastthirtydays,lastsixtytydays ,future  }
  
  
 

  return objj
  }
  export default fetchdate