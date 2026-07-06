let savedPlans = document.getElementById("stat-saved")
let countryInput = document.getElementById("global-country")
let cityInput = document.getElementById("global-city")
let yearInput = document.getElementById("global-year")
let exploreBtn = document.getElementById("global-search-btn")
let countryName = document.getElementById("selected-country-name")
let cityName = document.getElementById("selected-city-name")
let destinstionCard = document.getElementById("selected-destination")
let holidayBtn = document.getElementById("holiday-btn")
let dashboardBtn = document.getElementById("dashboard-btn")
let holidayView = document.getElementById("holidays-view")
let dashboardView = document.getElementById("dashboard-view")
let eventsBtn = document.getElementById("events-btn")
let weatherBtn = document.getElementById("weather-btn")
let eventsView = document.getElementById("events-view")
let weatherView = document.getElementById("weather-view")
let longWeekEndBtn = document.getElementById("longWeekEnd-btn")
let currencyBtn = document.getElementById("currency-btn")
let longWeekEndView = document.getElementById("long-weekends-view")
let currencyView = document.getElementById("currency-view")
let myPlansBtn = document.getElementById("myPlans-btn")
let myPlansView = document.getElementById("my-plans-view")
let holidaysContent = document.getElementById("holidays-content")

if (window.location.pathname !== "?page=dashboard") {
    history.pushState({}, "", "?page=dashboard");
     dashboardView.classList.add("active")
  holidayView.classList.remove("active")
  dashboardBtn.classList.add("active")
  holidayBtn.classList.remove("active")
}
  
exploreBtn.addEventListener("click", async function () {
    console.log("hiii explore btn")
    let country = countryInput.value;
    let city = cityInput.value;
    let year = yearInput.value;

    let container1 = `<div class="selected-flag">
                  <img id="selected-country-flag" src="https://flagcdn.com/w80/eg.png" alt="Egypt">
                </div>
                <div class="selected-info">
                  <span class="selected-country-name" id="selected-country-name">${country}</span>
                  <span class="selected-city-name" id="selected-city-name">• ${city}</span>
                </div>
                <button class="clear-selection-btn" id="clear-selection-btn">
                  <i class="fa-solid fa-xmark"></i>
                </button>`

    destinstionCard.innerHTML = container1;
//   const response = await fetch(
//     'https://api.restcountries.com/countries/v5?q=Canada&limit=1&pretty=1',
//     { headers: { 'Authorization': 'Bearer rc_live_00574726a98449cc8c1a3fa0a9221404' } }
// );
// const data = await response.json();
//     console.log(data);
    
})





dashboardBtn.addEventListener("click", function(){
  dashboardView.classList.add("active")
  holidayView.classList.remove("active")
  dashboardBtn.classList.add("active")
  holidayBtn.classList.remove("active")
   history.pushState({}, "", "?page=dashboard");

})


myPlansBtn.addEventListener("click", function(){
  myPlansView.classList.add("active")
  dashboardView.classList.remove("active")
  myPlansBtn.classList.add("active")
  dashboardBtn.classList.remove("active")
   history.pushState({}, "", "?page=myPlans");

})

 class holidays{
    getHolidays(){
        if(dashboardBtn.classList.contains("active")){
        holidayView.classList.add("active")
       dashboardView.classList.remove("active")
       holidayBtn.classList.add("active")
       dashboardBtn.classList.remove("active")
       
    }else if(eventsBtn.classList.contains("active")){
        holidayView.classList.add("active")
       eventsView.classList.remove("active")
       holidayBtn.classList.add("active")
       eventsBtn.classList.remove("active")
    }
    else if(weatherBtn.classList.contains("active")){
        holidayView.classList.add("active")
       weatherView.classList.remove("active")
       holidayBtn.classList.add("active")
       weatherBtn.classList.remove("active")
    }
    else if(currencyBtn.classList.contains("active")){
        holidayView.classList.add("active")
       currencyView.classList.remove("active")
       holidayBtn.classList.add("active")
       currencyBtn.classList.remove("active")
    }
    else if(myPlansBtn.classList.contains("active")){
        holidayView.classList.add("active")
       myPlansView.classList.remove("active")
       holidayBtn.classList.add("active")
       myPlansBtn.classList.remove("active")
    }

    history.pushState({}, "", "?page=holidays");
}
// async getHolidaysApi(){
// const response = await fetch("https://date.nager.at/api/v3/PublicHolidays/2026/AR")
//   const x = await response.json()
//    console.log(x);
//    return x;
// }
}

let myHolidays = new holidays()

holidayBtn.addEventListener("click",async function(){
  myHolidays.getHolidays()
//   myHolidays.getHolidaysApi()
    const response = await fetch("https://date.nager.at/api/v3/PublicHolidays/2026/AR")
  const x = await response.json()
   console.log(x);
   let container2="";
   holidaysContent.innerHTML = "";
   for(let i = 0 ; i<x.length ; i++){
    const eventDate = new Date(x[i].date);
     container2=`<div class="holiday-card">
              <div class="holiday-card-header">
                <div class="holiday-date-box">  <span class="day">${eventDate.getDate()}</span>
    <span class="month">
      ${eventDate.toLocaleString("en-US", { month: "short" })}
    </span></div>
                <button class="holiday-action-btn"><i class="fa-regular fa-heart"></i></button>
              </div>
              <h3>${x[i].localName}</h3>
              <p class="holiday-name">${x[i].name}</p>
              <div class="holiday-card-footer">
                <span class="holiday-day-badge"><i class="fa-regular fa-calendar"></i>  ${eventDate.toLocaleString("en-US", { weekday: "long" })}</span>
                <span class="holiday-type-badge">${x[i].types[0]}</span>
              </div>
            </div>`

            holidaysContent.innerHTML+=container2
   }
   
})



class events{
    getEvents(){
        if(dashboardBtn.classList.contains("active")){
        eventsView.classList.add("active")
       dashboardView.classList.remove("active")
       eventsBtn.classList.add("active")
       dashboardBtn.classList.remove("active")
       
    }else if(holidayBtn.classList.contains("active")){
        eventsView.classList.add("active")
       holidayView.classList.remove("active")
       eventsBtn.classList.add("active")
       holidayBtn.classList.remove("active")
    }
    else if(weatherBtn.classList.contains("active")){
        eventsView.classList.add("active")
       weatherView.classList.remove("active")
       eventsBtn.classList.add("active")
       weatherBtn.classList.remove("active")
    }
    else if(currencyBtn.classList.contains("active")){
        eventsView.classList.add("active")
       currencyView.classList.remove("active")
       eventsBtn.classList.add("active")
       currencyBtn.classList.remove("active")
    }
    else if(myPlansBtn.classList.contains("active")){
        eventsView.classList.add("active")
       myPlansView.classList.remove("active")
       eventsBtn.classList.add("active")
       myPlansBtn.classList.remove("active")
    }

    history.pushState({}, "", "?page=holidays");
}

}
let myEvents = new events()

eventsBtn.addEventListener("click", function(){
  myEvents.getEvents()
   history.pushState({}, "", "?page=events");

})


class currency{
    getCurrency(){
        if(dashboardBtn.classList.contains("active")){
        currencyView.classList.add("active")
       dashboardView.classList.remove("active")
       currencyBtn.classList.add("active")
       dashboardBtn.classList.remove("active")
       
    }else if(holidayBtn.classList.contains("active")){
        currencyView.classList.add("active")
       holidayView.classList.remove("active")
       currencyBtn.classList.add("active")
       holidayBtn.classList.remove("active")
    }
    else if(weatherBtn.classList.contains("active")){
        currencyView.classList.add("active")
       weatherView.classList.remove("active")
       currencyBtn.classList.add("active")
       weatherBtn.classList.remove("active")
    }
    else if(eventsBtn.classList.contains("active")){
        currencyView.classList.add("active")
       eventsView.classList.remove("active")
       currencyBtn.classList.add("active")
       eventsBtn.classList.remove("active")
    }
    else if(myPlansBtn.classList.contains("active")){
        currencyView.classList.add("active")
       myPlansView.classList.remove("active")
       currencyBtn.classList.add("active")
       myPlansBtn.classList.remove("active")
    }

    history.pushState({}, "", "?page=currency");
}

}
let newCurrency = new currency()

currencyBtn.addEventListener("click", function(){
  newCurrency.getCurrency()
   

})