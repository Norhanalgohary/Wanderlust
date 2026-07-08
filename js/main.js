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
let holidaysContentView = document.querySelector(".header-content-view")
let eventsContent = document.getElementById("events-content")
let eventsContentView = document.querySelector(".events-content-view")
let weatherContent = document.getElementById("weather-content")
let weatherContentView = document.querySelector(".weather-content-view")
let dashboardContent = document.getElementById("dashboard-country-info-section")
let year;
let city;
let country;
let countryCode;
let mainData;
let capital;
let plansContent = document.getElementById("plans-content");
const countrySelect = document.getElementById("global-country");
const citySelect = document.getElementById("global-city");
const clearAllBtn = document.getElementById("clear-all-plans-btn");
let holidaysSvaedBtn = document.querySelectorAll(".holiday-action-btn")
let removeButtons = document.querySelectorAll(".btn-plan-remove");
let filterButtons = document.querySelectorAll(".plans-filter-bar");



// clearAllBtn.addEventListener("click", function () {

//     Swal.fire({
//         title: "Clear All Plans?",
//         text: "This will permanently delete all your saved plans. This action cannot be undone!",
//         icon: "warning",
//         showCancelButton: true,
//         confirmButtonColor: "#ef4444",
//         cancelButtonColor: "#6b7280",
//         confirmButtonText: "Yes, clear all",
//         cancelButtonText: "Cancel"
//     }).then((result) => {

//        if (result.isConfirmed) {

//     localStorage.removeItem("plans");

//     Swal.fire({
//         title: "Cleard!",
//         text: "All plans have been removed.",
//         icon: "success",
//         timer: 1500,
//         showConfirmButton: false
//     });
    
// }
// savedPlans = localStorage.getItem("plans");
//     });

// });


clearAllBtn.addEventListener("click", function () {

    Swal.fire({
        title: "Clear All Plans?",
        text: "This will permanently delete all your saved plans. This action cannot be undone!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#ef4444",
        cancelButtonColor: "#6b7280",
        confirmButtonText: "Yes, clear all",
        cancelButtonText: "Cancel"
    }).then((result) => {

        if (result.isConfirmed) {

            
            plansContent.innerHTML = "";
            localStorage.removeItem("plans");
            // updatePlanCounts();

            Swal.fire({
                title: "Cleared!",
                text: "All plans have been removed.",
                icon: "success",
                timer: 1500,
                showConfirmButton: false
            });

        }

    });

});

async function loadCountries() {
  try {
    const response = await fetch(
      "https://api.restcountries.com/countries/v5",
      {
        headers: {
          Authorization: "Bearer rc_live_5a794ffa7661412194f291a63c0ae2c7",
        },
      }
    );

    const data = await response.json();


    const countries = data.data.objects;

    
    countries.sort((a, b) =>
      a.names.common.localeCompare(b.names.common)
    );

    let options = `<option value="">Select Country</option>`;

    for (let i = 0; i < countries.length; i++) {
      options += `
        <option value="${countries[i].names.common}">
           ${countries[i].names.common}
        </option>
      `;

    }

    countrySelect.innerHTML = options;

  } catch (error) {
    console.log(error);
  }
  
}

loadCountries();


if (window.location.pathname !== "?page=dashboard") {
  history.pushState({}, "", "?page=dashboard");
  dashboardView.classList.add("active")
  holidayView.classList.remove("active")
  dashboardBtn.classList.add("active")
  holidayBtn.classList.remove("active")
}

exploreBtn.addEventListener("click", async function () {
  console.log("hiii explore btn")


  country = countryInput.value;
  city = cityInput.value;
  year = yearInput.value;

  const response = await fetch(
    `https://api.restcountries.com/countries/v5?q=${country}`,
    { headers: { 'Authorization': 'Bearer rc_live_5a794ffa7661412194f291a63c0ae2c7' } }
  );
  const data = await response.json();

  for (let i = 0; i < data.data.objects.length; i++) {
    mainData = data.data.objects[i];
    console.log(mainData)
    console.log(mainData.capitals[i].name)
    capital = mainData.capitals[i].name
    citySelect.innerHTML = `
    <option value="${capital}" selected>${capital}</option>
  `;

  }

  countryCode = mainData.codes.alpha_2;


  console.log(countryCode);
  let container1 = `<div class="selected-flag">
                  <img id="selected-country-flag" src="${mainData.flag.url_png}" alt="Egypt">
                </div>
                <div class="selected-info">
                  <span class="selected-country-name" id="selected-country-name">${country}</span>
                  <span class="selected-city-name" id="selected-city-name">• ${capital}</span>
                </div>
                <button class="clear-selection-btn" id="clear-selection-btn">
                  <i class="fa-solid fa-xmark"></i>
                </button>`
  destinstionCard.innerHTML = container1;




  let container8 = "";
  dashboardContent.innerHTML = "";

  container8 = `
   <div class="section-header">
              <h2><i class="fa-solid fa-flag"></i> Country Information</h2>
            </div>
            <div id="dashboard-country-info" class="dashboard-country-info">
              
              <div class="dashboard-country-header">
                <img src="${mainData.flag.url_png}" alt="Egypt" class="dashboard-country-flag">
                <div class="dashboard-country-title">
                  <h3>${mainData.names.common}</h3>
                  <p class="official-name">${mainData.names.official}</p>
                  <span class="region"><i class="fa-solid fa-location-dot"></i> ${mainData.continents} • ${mainData.subregion}</span>
                </div>
              </div>
              
              <div class="dashboard-local-time">
                <div class="local-time-display">
                  <i class="fa-solid fa-clock"></i>
                  <span class="local-time-value" id="country-local-time">08:30:45 AM</span>
                  <span class="local-time-zone">UTC+02:00</span>
                </div>
              </div>
              
              <div class="dashboard-country-grid">
                <div class="dashboard-country-detail">
                  <i class="fa-solid fa-building-columns"></i>
                  <span class="label">Capital</span>
                  <span class="value">${mainData.capitals[0].name}</span>
                </div>
                <div class="dashboard-country-detail">
                  <i class="fa-solid fa-users"></i>
                  <span class="label">Population</span>
                  <span class="value">${mainData.population}</span>
                </div>
                <div class="dashboard-country-detail">
                  <i class="fa-solid fa-ruler-combined"></i>
                  <span class="label">Area</span>
                  <span class="value">${mainData.area.kilometers} km²</span>
                </div>
                <div class="dashboard-country-detail">
                  <i class="fa-solid fa-globe"></i>
                  <span class="label">Continent</span>
                  <span class="value">${mainData.continents}</span>
                </div>
                <div class="dashboard-country-detail">
                  <i class="fa-solid fa-phone"></i>
                  <span class="label">Calling Code</span>
                  <span class="value">${mainData.calling_codes[0]}</span>
                </div>
                <div class="dashboard-country-detail">
                  <i class="fa-solid fa-car"></i>
                  <span class="label">Driving Side</span>
                  <span class="value">${mainData.cars.driving_side}</span>
                </div>
                <div class="dashboard-country-detail">
                  <i class="fa-solid fa-calendar-week"></i>
                  <span class="label">Week Starts</span>
                  <span class="value">${mainData.date.start_of_week}</span>
                </div>
              </div>
              
              <div class="dashboard-country-extras">
                <div class="dashboard-country-extra">
                  <h4><i class="fa-solid fa-coins"></i> Currency</h4>
                  <div class="extra-tags">
                    <span class="extra-tag">${mainData.currencies[0].name} (${mainData.currencies[0].code} ${mainData.currencies[0].symbol})</span>
                  </div>
                </div>
                <div class="dashboard-country-extra">
                  <h4><i class="fa-solid fa-language"></i> Languages</h4>
                  
                  <div class="extra-tags">
                    <span class="extra-tag">${mainData.languages[0].name}</span>
                     
                  </div>
                  
                  
                </div>
                <div class="dashboard-country-extra">
                  <h4><i class="fa-solid fa-map-location-dot"></i> Neighbors</h4>
                  <div class="extra-tags">
                    <span class="extra-tag border-tag">${mainData.borders[0]}</span>
                    
                  </div>
                </div>
              </div>
              
              <div class="dashboard-country-actions">
                <a href="${mainData.links.google_maps}" target="_blank" class="btn-map-link">
                  <i class="fa-solid fa-map"></i> View on Google Maps
                </a>
              </div>
              
            </div>
   
   `

  dashboardContent.innerHTML = container8



})



// ============================DASHBOARD=========================


class dashboard {
  getDashboard() {
    if (currencyBtn.classList.contains("active")) {
      dashboardView.classList.add("active")
      currencyView.classList.remove("active")
      dashboardBtn.classList.add("active")
      currencyBtn.classList.remove("active")

    } else if (holidayBtn.classList.contains("active")) {
      dashboardView.classList.add("active")
      holidayView.classList.remove("active")
      dashboardBtn.classList.add("active")
      holidayBtn.classList.remove("active")
    }
    else if (weatherBtn.classList.contains("active")) {
      dashboardView.classList.add("active")
      weatherView.classList.remove("active")
      dashboardBtn.classList.add("active")
      weatherBtn.classList.remove("active")
    }
    else if (eventsBtn.classList.contains("active")) {
      dashboardView.classList.add("active")
      eventsView.classList.remove("active")
      dashboardBtn.classList.add("active")
      eventsBtn.classList.remove("active")
    }
    else if (myPlansBtn.classList.contains("active")) {
      dashboardView.classList.add("active")
      myPlansView.classList.remove("active")
      dashboardBtn.classList.add("active")
      myPlansBtn.classList.remove("active")
    } else if (longWeekEndBtn.classList.contains("active")) {
      dashboardView.classList.add("active")
      longWeekEndView.classList.remove("active")
      dashboardBtn.classList.add("active")
      longWeekEndBtn.classList.remove("active")
    }

    history.pushState({}, "", "?page=dashboard");
  }

}
let myDashboard = new dashboard()
dashboardBtn.addEventListener("click", function () {
  console.log("dashdosh");
  myDashboard.getDashboard()

})

// ============================longWeekEnds=========================

class longWeek {
  getlongWeek() {
    if (currencyBtn.classList.contains("active")) {
      longWeekEndView.classList.add("active")
      currencyView.classList.remove("active")
      longWeekEndBtn.classList.add("active")
      currencyBtn.classList.remove("active")

    } else if (holidayBtn.classList.contains("active")) {
      longWeekEndView.classList.add("active")
      holidayView.classList.remove("active")
      longWeekEndBtn.classList.add("active")
      holidayBtn.classList.remove("active")
    }
    else if (weatherBtn.classList.contains("active")) {
      longWeekEndView.classList.add("active")
      weatherView.classList.remove("active")
      longWeekEndBtn.classList.add("active")
      weatherBtn.classList.remove("active")
    }
    else if (eventsBtn.classList.contains("active")) {
      longWeekEndView.classList.add("active")
      eventsView.classList.remove("active")
      longWeekEndBtn.classList.add("active")
      eventsBtn.classList.remove("active")
    }
    else if (myPlansBtn.classList.contains("active")) {
      longWeekEndView.classList.add("active")
      myPlansView.classList.remove("active")
      longWeekEndBtn.classList.add("active")
      myPlansBtn.classList.remove("active")
    }
    else if (dashboardBtn.classList.contains("active")) {
      longWeekEndView.classList.add("active")
      dashboardView.classList.remove("active")
      longWeekEndBtn.classList.add("active")
      dashboardBtn.classList.remove("active")
    }

    history.pushState({}, "", "?page=longWeekEnd");
  }

}
let mylongWeek = new longWeek()

longWeekEndBtn.addEventListener("click", async function () {
  console.log("long week end ");
  mylongWeek.getlongWeek()

  longWeekEndView.classList.add("active")
  dashboardView.classList.remove("active")
  longWeekEndBtn.classList.add("active")
  dashboardBtn.classList.remove("active")
  history.pushState({}, "", "?page=longWeekEnd");



  const response = await fetch(
    `https://date.nager.at/api/v3/LongWeekend/${year}/${countryCode}`
  );
  const data = await response.json();
  console.log(data);

})
// ============================PLANS=========================

class plans {
  getPlans() {
    if (currencyBtn.classList.contains("active")) {
      myPlansView.classList.add("active")
      currencyView.classList.remove("active")
      myPlansBtn.classList.add("active")
      currencyBtn.classList.remove("active")

    } else if (holidayBtn.classList.contains("active")) {
      myPlansView.classList.add("active")
      holidayView.classList.remove("active")
      myPlansBtn.classList.add("active")
      holidayBtn.classList.remove("active")
    }
    else if (weatherBtn.classList.contains("active")) {
      myPlansView.classList.add("active")
      weatherView.classList.remove("active")
      myPlansBtn.classList.add("active")
      weatherBtn.classList.remove("active")
    }
    else if (eventsBtn.classList.contains("active")) {
      myPlansView.classList.add("active")
      eventsView.classList.remove("active")
      myPlansBtn.classList.add("active")
      eventsBtn.classList.remove("active")
    }
    else if (dashboardBtn.classList.contains("active")) {
      myPlansView.classList.add("active")
      dashboardView.classList.remove("active")
      myPlansBtn.classList.add("active")
      dashboardBtn.classList.remove("active")
    } else if (longWeekEndBtn.classList.contains("active")) {
      myPlansView.classList.add("active")
      longWeekEndView.classList.remove("active")
      myPlansBtn.classList.add("active")
      longWeekEndBtn.classList.remove("active")
    }

    history.pushState({}, "", "?page=myPlans");
  }

}
let myPlans = new plans()
myPlansBtn.addEventListener("click", function () {
console.log("add to my plans");
  myPlans.getPlans()

})
plansContent.addEventListener("click", function (e) {

    if (e.target.closest(".btn-plan-remove")) {

        e.target.closest(".plan-card").remove();

        localStorage.setItem("plans", plansContent.innerHTML);
      
    }
  document.getElementById("stat-saved").textContent =
    plansContent.querySelectorAll(".plan-card").length;
  document.getElementById("filter-all-count").textContent =
    plansContent.querySelectorAll(".plan-card").length;

document.getElementById("filter-holiday-count").textContent =
    plansContent.querySelectorAll(".plan-card-type.holiday").length;

document.getElementById("filter-event-count").textContent =
    plansContent.querySelectorAll(".plan-card-type.event").length;

document.getElementById("filter-lw-count").textContent =
    plansContent.querySelectorAll(".plan-card-type.longweekend").length;
    
});
window.addEventListener("load", function () {

   
  document.getElementById("stat-saved").textContent =
    plansContent.querySelectorAll(".plan-card").length;
  document.getElementById("filter-all-count").textContent =
    plansContent.querySelectorAll(".plan-card").length;

document.getElementById("filter-holiday-count").textContent =
    plansContent.querySelectorAll(".plan-card-type.holiday").length;

document.getElementById("filter-event-count").textContent =
    plansContent.querySelectorAll(".plan-card-type.event").length;

document.getElementById("filter-lw-count").textContent =
    plansContent.querySelectorAll(".plan-card-type.longweekend").length;
    
});


// =========================HOLIDAYS======================

class holidays {
  getHolidays() {
    if (dashboardBtn.classList.contains("active")) {
      holidayView.classList.add("active")
      dashboardView.classList.remove("active")
      holidayBtn.classList.add("active")
      dashboardBtn.classList.remove("active")

    } else if (eventsBtn.classList.contains("active")) {
      holidayView.classList.add("active")
      eventsView.classList.remove("active")
      holidayBtn.classList.add("active")
      eventsBtn.classList.remove("active")
    }
    else if (weatherBtn.classList.contains("active")) {
      holidayView.classList.add("active")
      weatherView.classList.remove("active")
      holidayBtn.classList.add("active")
      weatherBtn.classList.remove("active")
    }
    else if (currencyBtn.classList.contains("active")) {
      holidayView.classList.add("active")
      currencyView.classList.remove("active")
      holidayBtn.classList.add("active")
      currencyBtn.classList.remove("active")
    }
    else if (myPlansBtn.classList.contains("active")) {
      holidayView.classList.add("active")
      myPlansView.classList.remove("active")
      holidayBtn.classList.add("active")
      myPlansBtn.classList.remove("active")

    } else if (longWeekEndBtn.classList.contains("active")) {
      holidayView.classList.add("active")
      longWeekEndView.classList.remove("active")
      holidayBtn.classList.add("active")
      longWeekEndBtn.classList.remove("active")
    }

    history.pushState({}, "", "?page=holidays");
  }
}

let myHolidays = new holidays()

holidayBtn.addEventListener("click", async function () {
  myHolidays.getHolidays()



  const response = await fetch(`https://date.nager.at/api/v3/PublicHolidays/${year}/BE`)
  const x = await response.json()
  console.log(x);

  let container2 = "";
  holidaysContent.innerHTML = "";


  for (let i = 0; i < x.length; i++) {
    const eventDate = new Date(x[i].date);
    container2 = `<div class="holiday-card">
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

    holidaysContent.innerHTML += container2


    
  }
let saveButtons = document.querySelectorAll(".holiday-action-btn");


for (let i = 0; i < saveButtons.length; i++) {

    saveButtons[i].addEventListener("click", function () {

        const holidayCard = this.closest(".holiday-card");

        const title = holidayCard.querySelector("h3").textContent;
        const holidayName = holidayCard.querySelector(".holiday-name").textContent;
        const day = holidayCard.querySelector(".holiday-day-badge").textContent.trim();

        const date =
            holidayCard.querySelector(".day").textContent + " " +
            holidayCard.querySelector(".month").textContent;

        plansContent.innerHTML += `
        <div class="plan-card">
            <span class="plan-card-type holiday">Holiday</span>

            <div class="plan-card-content">
                <h4>${title}</h4>

                <div class="plan-card-details">
                    <div>
                        <i class="fa-regular fa-calendar"></i>
                        ${date}
                    </div>

                    <div>
                        <i class="fa-solid fa-tag"></i>
                        ${holidayName}
                    </div>

                </div>

                <div class="plan-card-actions">
                    <button class="btn-plan-remove">
                    <i class="fa-solid fa-trash"></i>
                        Remove
                    </button>
                </div>
            </div>
        </div>`;
//          document.getElementById("stat-saved").textContent =
//     plansContent.querySelectorAll(".plan-card").length;
//   document.getElementById("filter-all-count").textContent =
//     plansContent.querySelectorAll(".plan-card").length;

// document.getElementById("filter-holiday-count").textContent =
//     plansContent.querySelectorAll(".plan-card-type.holiday").length;

// document.getElementById("filter-event-count").textContent =
//     plansContent.querySelectorAll(".plan-card-type.event").length;

// document.getElementById("filter-lw-count").textContent =
//     plansContent.querySelectorAll(".plan-card-type.longweekend").length;
//         localStorage.setItem("plans", plansContent.innerHTML);
        
    });
};


// removeButtons.forEach(btn => {
//     btn.addEventListener("click", function () {

//         plansContent.innerHTML -= `
//         <div class="plan-card">
//             <span class="plan-card-type holiday">Holiday</span>

//             <div class="plan-card-content">
//                 <h4>${title}</h4>

//                 <div class="plan-card-details">
//                     <div>
//                         <i class="fa-regular fa-calendar"></i>
//                         ${date}
//                     </div>

//                     <div>
//                         <i class="fa-solid fa-tag"></i>
//                         ${holidayName}
//                     </div>

//                 </div>

//                 <div class="plan-card-actions">
//                     <button class="btn-plan-remove">
//                     <i class="fa-solid fa-trash"></i>
//                         Remove
//                     </button>
//                 </div>
//             </div>
//         </div>`;
//         localStorage.setItem("plans", plansContent.innerHTML);
//         localStorage.removeItem("plans");
        
//     });
// });


  let container3 = `
            

<div class="view-header-icon"><i class="fa-solid fa-calendar-days"></i></div>
            <div class="view-header-content">
              <h2>Public Holidays Explorer</h2>
              <p>Browse public holidays for ${country} and plan your trips around them</p>
            </div>
            <div class="view-header-selection" id="holidays-selection">
              <div class="current-selection-badge">
                <img src="${mainData.flag.url_png}" alt="Egypt" class="selection-flag">
                <span>${country}</span>
                <span class="selection-year">${year}</span>
              </div>
            </div>

              `

  holidaysContentView.innerHTML = container3
})

// ============================EVENTS=========================

class events {
  getEvents() {
    if (dashboardBtn.classList.contains("active")) {
      eventsView.classList.add("active")
      dashboardView.classList.remove("active")
      eventsBtn.classList.add("active")
      dashboardBtn.classList.remove("active")

    } else if (holidayBtn.classList.contains("active")) {
      eventsView.classList.add("active")
      holidayView.classList.remove("active")
      eventsBtn.classList.add("active")
      holidayBtn.classList.remove("active")
    }
    else if (weatherBtn.classList.contains("active")) {
      eventsView.classList.add("active")
      weatherView.classList.remove("active")
      eventsBtn.classList.add("active")
      weatherBtn.classList.remove("active")
    }
    else if (currencyBtn.classList.contains("active")) {
      eventsView.classList.add("active")
      currencyView.classList.remove("active")
      eventsBtn.classList.add("active")
      currencyBtn.classList.remove("active")
    }
    else if (myPlansBtn.classList.contains("active")) {
      eventsView.classList.add("active")
      myPlansView.classList.remove("active")
      eventsBtn.classList.add("active")
      myPlansBtn.classList.remove("active")
    }
    else if (longWeekEndBtn.classList.contains("active")) {
      eventsView.classList.add("active")
      longWeekEndView.classList.remove("active")
      eventsBtn.classList.add("active")
      longWeekEndBtn.classList.remove("active")
    }

    history.pushState({}, "", "?page=holidays");
  }

}
let myEvents = new events()

eventsBtn.addEventListener("click", async function () {
  myEvents.getEvents()
  history.pushState({}, "", "?page=events");

  const response = await fetch(`https://app.ticketmaster.com/discovery/v2/events.json?apikey=VwECw2OiAzxVzIqnwmKJUG41FbeXJk1y&city=Brussels&countryCode=BE&size=20`)
  const x = await response.json()
  console.log(x._embedded.events);

  let container4 = "";
  eventsContent.innerHTML = "";
  let d = x._embedded.events



  for (let i = 0; i < d.length; i++) {

    const date = new Date(d[i].dates.start.localDate);

    const formattedDate = date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });

    const time = d[i].dates.start.localTime
      ? d[i].dates.start.localTime.slice(0, 5)
      : "";
    const dateTime = time
      ? `${formattedDate} at ${time}`
      : formattedDate;
      
    container4 = `
    <div class="event-card">
      <div class="event-card-image">
        <img src="${d[i].images[0].url}" alt="Event">
        <span class="event-card-category">${d[i].classifications[0].segment.name}</span>
        <button class="event-card-save"><i class="fa-regular fa-heart"></i></button>
      </div>

      <div class="event-card-body">
        <h3>${d[i].name}</h3>

        <div class="event-card-info">
          <div>
            <i class="fa-regular fa-calendar"></i>
            ${dateTime} 
          </div>

          <div>
            <i class="fa-solid fa-location-dot"></i>
            ${d[i]._embedded.venues[0].name}, ${d[i]._embedded.venues[0].city.name}
          </div>
        </div>

        <div class="event-card-footer">
          <button class="btn-event">
            <i class="fa-regular fa-heart"></i> Save
          </button>
          <a href="#" class="btn-buy-ticket">
            <i class="fa-solid fa-ticket"></i> Buy Tickets
          </a>
        </div>
      </div>
    </div>`;

    eventsContent.innerHTML += container4;
  }
  let saveEventBtns = document.querySelectorAll(".btn-event");

for (let i = 0; i < saveEventBtns.length; i++) {

    saveEventBtns[i].addEventListener("click", function () {

        const eventCard = this.closest(".event-card");

        const title = eventCard.querySelector("h3").textContent;

        const date =
            eventCard.querySelector(".event-card-info div:first-child").textContent.trim();

        const location =
            eventCard.querySelector(".event-card-info div:last-child").textContent.trim();

        plansContent.innerHTML += `
        <div class="plan-card">
            <span class="plan-card-type event">Event</span>

            <div class="plan-card-content">
                <h4>${title}</h4>

                <div class="plan-card-details">
                    <div>
                        <i class="fa-regular fa-calendar"></i>
                        ${date}
                    </div>

                    <div>
                        <i class="fa-solid fa-location-dot"></i>
                        ${location}
                    </div>
                </div>

                <div class="plan-card-actions">
                    <button class="btn-plan-remove">
                        <i class="fa-solid fa-trash"></i>
                        Remove
                    </button>
                </div>
            </div>
        </div>`;
        localStorage.setItem("plans", plansContent.innerHTML);
    });
    
};


  let container5 = `
     <div class="view-header-icon"><i class="fa-solid fa-ticket"></i></div>
            <div class="view-header-content">
              <h2>Events Explorer</h2>
              <p>Discover concerts, sports, theatre and more in ${city}</p>
            </div>
            <div class="view-header-selection ">
              <div class="current-selection-badge">
                <img src="https://flagcdn.com/w40/eg.png" alt="Egypt" class="selection-flag">
                <span>${country}</span>
                <span class="selection-city"> ${city}</span>
              </div>
            </div>`

  eventsContentView.innerHTML = container5

})



// ============================WEATHER=========================

class weather {
  getWeather() {
    if (dashboardBtn.classList.contains("active")) {
      weatherView.classList.add("active")
      dashboardView.classList.remove("active")
      weatherBtn.classList.add("active")
      dashboardBtn.classList.remove("active")

    } else if (holidayBtn.classList.contains("active")) {
      weatherView.classList.add("active")
      holidayView.classList.remove("active")
      weatherBtn.classList.add("active")
      holidayBtn.classList.remove("active")
    }
    else if (eventsBtn.classList.contains("active")) {
      weatherView.classList.add("active")
      eventsView.classList.remove("active")
      weatherBtn.classList.add("active")
      eventsBtn.classList.remove("active")
    }
    else if (currencyBtn.classList.contains("active")) {
      weatherView.classList.add("active")
      currencyView.classList.remove("active")
      weatherBtn.classList.add("active")
      currencyBtn.classList.remove("active")
    }
    else if (myPlansBtn.classList.contains("active")) {
      weatherView.classList.add("active")
      myPlansView.classList.remove("active")
      weatherBtn.classList.add("active")
      myPlansBtn.classList.remove("active")
    }
    else if (longWeekEndBtn.classList.contains("active")) {
      weatherView.classList.add("active")
      longWeekEndView.classList.remove("active")
      weatherBtn.classList.add("active")
      longWeekEndBtn.classList.remove("active")
    }

    history.pushState({}, "", "?page=weather");
  }

}
let myweather = new weather()

weatherBtn.addEventListener("click", async function () {
  myweather.getWeather()
  history.pushState({}, "", "?page=weather");

  const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=40.7128&longitude=-74.006&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m,wind_direction_10m,uv_index&hourly=temperature_2m,weather_code,precipitation_probability&daily=weather_code,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,sunrise,sunset,uv_index_max,precipitation_sum,precipitation_probability_max,wind_speed_10m_max,wind_direction_10m_dominant&timezone=auto`)
  const x = await response.json()
  console.log(x);



  let container6 = `
    <div class="view-header-icon"><i class="fa-solid fa-cloud-sun"></i></div>
            <div class="view-header-content">
              <h2>Weather Forecast</h2>
              <p>Check 7-day weather forecasts for ${city}</p>
            </div>
            <div class="view-header-selection">
              <div class="current-selection-badge">
                <img src="https://flagcdn.com/w40/eg.png" alt="Egypt" class="selection-flag">
                <span>${country}</span>
                <span class="selection-city">${city}</span>
              </div>
            </div>`

  weatherContentView.innerHTML = container6



  let container7 = "";
  weatherContent.innerHTML = "";


  container7 = `
     <div class="weather-hero-card weather-sunny">
              <div class="weather-location">
                <i class="fa-solid fa-location-dot"></i>
                <span>${city}</span>
                <span class="weather-time">Saturday, January 25, 2026</span>
              </div>
              <div class="weather-hero-main">
                <div class="weather-hero-left">
                  <div class="weather-hero-icon"><i class="fa-solid fa-sun"></i></div>
                  <div class="weather-hero-temp">
                    <span class="temp-value">${x.current.temperature_2m}</span>
                    <span class="temp-unit">°C</span>
                  </div>
                </div>
                <div class="weather-hero-right">
                  <div class="weather-condition">Clear sky</div>
                  <div class="weather-feels">Feels like ${x.current.apparent_temperature}°C</div>
                  <div class="weather-high-low">
                    <span class="high"><i class="fa-solid fa-arrow-up"></i> 25°</span>
                    <span class="low"><i class="fa-solid fa-arrow-down"></i> 12°</span>
                  </div>
                </div>
              </div>
            </div>

             <div class="weather-details-grid">
              <div class="weather-detail-card">
                <div class="detail-icon humidity"><i class="fa-solid fa-droplet"></i></div>
                <div class="detail-info">
                  <span class="detail-label">Humidity</span>
                  <span class="detail-value">${x.current.relative_humidity_2m}%</span>
                </div>
              </div>
              <div class="weather-detail-card">
                <div class="detail-icon wind"><i class="fa-solid fa-wind"></i></div>
                <div class="detail-info">
                  <span class="detail-label">Wind</span>
                  <span class="detail-value">${x.current.wind_speed_10m} km/h</span>
                </div>
              </div>
              <div class="weather-detail-card">
                <div class="detail-icon uv"><i class="fa-solid fa-sun"></i></div>
                <div class="detail-info">
                  <span class="detail-label">UV Index</span>
                  <span class="detail-value">${x.current.uv_index}</span>
                </div>
              </div>
              <div class="weather-detail-card">
                <div class="detail-icon precip"><i class="fa-solid fa-cloud-rain"></i></div>
                <div class="detail-info">
                  <span class="detail-label">Precipitation</span>
                  <span class="detail-value">${x.hourly.precipitation_probability[0]}%</span>
                </div>
              </div>
            </div>

             <div class="weather-section">
              <h3 class="weather-section-title"><i class="fa-solid fa-clock"></i> Hourly Forecast</h3>
              <div class="hourly-scroll">
                <div class="hourly-item now">
                  <span class="hourly-time">Now</span>
                  <div class="hourly-icon"><i class="fa-solid fa-sun"></i></div>
                  <span class="hourly-temp">22°</span>
                </div>
                <div class="hourly-item">
                  <span class="hourly-time">10 AM</span>
                  <div class="hourly-icon"><i class="fa-solid fa-sun"></i></div>
                  <span class="hourly-temp">23°</span>
                </div>
                <div class="hourly-item">
                  <span class="hourly-time">11 AM</span>
                  <div class="hourly-icon"><i class="fa-solid fa-sun"></i></div>
                  <span class="hourly-temp">24°</span>
                </div>
                <div class="hourly-item">
                  <span class="hourly-time">12 PM</span>
                  <div class="hourly-icon"><i class="fa-solid fa-sun"></i></div>
                  <span class="hourly-temp">25°</span>
                </div>
                <div class="hourly-item">
                  <span class="hourly-time">1 PM</span>
                  <div class="hourly-icon"><i class="fa-solid fa-sun"></i></div>
                  <span class="hourly-temp">25°</span>
                </div>
                <div class="hourly-item">
                  <span class="hourly-time">2 PM</span>
                  <div class="hourly-icon"><i class="fa-solid fa-cloud-sun"></i></div>
                  <span class="hourly-temp">24°</span>
                </div>
                <div class="hourly-item">
                  <span class="hourly-time">3 PM</span>
                  <div class="hourly-icon"><i class="fa-solid fa-cloud-sun"></i></div>
                  <span class="hourly-temp">23°</span>
                </div>
                <div class="hourly-item">
                  <span class="hourly-time">4 PM</span>
                  <div class="hourly-icon"><i class="fa-solid fa-cloud"></i></div>
                  <span class="hourly-temp">21°</span>
                </div>
              </div>
            </div>
            
            <!-- 7-Day Forecast -->
            <div class="weather-section">
              <h3 class="weather-section-title"><i class="fa-solid fa-calendar-week"></i> 7-Day Forecast</h3>
              <div class="forecast-list">
                <div class="forecast-day today">
                  <div class="forecast-day-name"><span class="day-label">Today</span><span class="day-date">25 Jan</span></div>
                  <div class="forecast-icon"><i class="fa-solid fa-sun"></i></div>
                  <div class="forecast-temps"><span class="temp-max">25°</span><span class="temp-min">12°</span></div>
                  <div class="forecast-precip"></div>
                </div>
                <div class="forecast-day">
                  <div class="forecast-day-name"><span class="day-label">Sun</span><span class="day-date">26 Jan</span></div>
                  <div class="forecast-icon"><i class="fa-solid fa-sun"></i></div>
                  <div class="forecast-temps"><span class="temp-max">24°</span><span class="temp-min">11°</span></div>
                  <div class="forecast-precip"></div>
                </div>
                <div class="forecast-day">
                  <div class="forecast-day-name"><span class="day-label">Mon</span><span class="day-date">27 Jan</span></div>
                  <div class="forecast-icon"><i class="fa-solid fa-cloud-sun"></i></div>
                  <div class="forecast-temps"><span class="temp-max">23°</span><span class="temp-min">12°</span></div>
                  <div class="forecast-precip"><i class="fa-solid fa-droplet"></i><span>10%</span></div>
                </div>
                <div class="forecast-day">
                  <div class="forecast-day-name"><span class="day-label">Tue</span><span class="day-date">28 Jan</span></div>
                  <div class="forecast-icon"><i class="fa-solid fa-cloud"></i></div>
                  <div class="forecast-temps"><span class="temp-max">21°</span><span class="temp-min">10°</span></div>
                  <div class="forecast-precip"><i class="fa-solid fa-droplet"></i><span>20%</span></div>
                </div>
                <div class="forecast-day">
                  <div class="forecast-day-name"><span class="day-label">Wed</span><span class="day-date">29 Jan</span></div>
                  <div class="forecast-icon"><i class="fa-solid fa-sun"></i></div>
                  <div class="forecast-temps"><span class="temp-max">22°</span><span class="temp-min">11°</span></div>
                  <div class="forecast-precip"></div>
                </div>
                <div class="forecast-day">
                  <div class="forecast-day-name"><span class="day-label">Thu</span><span class="day-date">30 Jan</span></div>
                  <div class="forecast-icon"><i class="fa-solid fa-sun"></i></div>
                  <div class="forecast-temps"><span class="temp-max">24°</span><span class="temp-min">12°</span></div>
                  <div class="forecast-precip"></div>
                </div>
                <div class="forecast-day">
                  <div class="forecast-day-name"><span class="day-label">Fri</span><span class="day-date">31 Jan</span></div>
                  <div class="forecast-icon"><i class="fa-solid fa-sun"></i></div>
                  <div class="forecast-temps"><span class="temp-max">25°</span><span class="temp-min">13°</span></div>
                  <div class="forecast-precip"></div>
                </div>
              </div>
            </div>
            
            
    
    `
  weatherContent.innerHTML += container7;




})

// ============================CURRENCY=========================
class currency {
  getCurrency() {
    if (dashboardBtn.classList.contains("active")) {
      currencyView.classList.add("active")
      dashboardView.classList.remove("active")
      currencyBtn.classList.add("active")
      dashboardBtn.classList.remove("active")

    } else if (holidayBtn.classList.contains("active")) {
      currencyView.classList.add("active")
      holidayView.classList.remove("active")
      currencyBtn.classList.add("active")
      holidayBtn.classList.remove("active")
    }
    else if (weatherBtn.classList.contains("active")) {
      currencyView.classList.add("active")
      weatherView.classList.remove("active")
      currencyBtn.classList.add("active")
      weatherBtn.classList.remove("active")
    }
    else if (eventsBtn.classList.contains("active")) {
      currencyView.classList.add("active")
      eventsView.classList.remove("active")
      currencyBtn.classList.add("active")
      eventsBtn.classList.remove("active")
    }
    else if (myPlansBtn.classList.contains("active")) {
      currencyView.classList.add("active")
      myPlansView.classList.remove("active")
      currencyBtn.classList.add("active")
      myPlansBtn.classList.remove("active")
    }
    else if (longWeekEndBtn.classList.contains("active")) {
      currencyView.classList.add("active")
      longWeekEndView.classList.remove("active")
      currencyBtn.classList.add("active")
      longWeekEndBtn.classList.remove("active")
    }

    history.pushState({}, "", "?page=currency");
  }

}
let newCurrency = new currency()

currencyBtn.addEventListener("click", async function () {
  console.log("currency");
  newCurrency.getCurrency()
  const amount = document.getElementById("currency-amount");
  const from = document.getElementById("currency-from");
  const to = document.getElementById("currency-to");
  const result = document.getElementById("result");

  document.getElementById("convert-btn").addEventListener("click", convertCurrency);

  async function convertCurrency() {

    const response = await fetch(
      `https://v6.exchangerate-api.com/v6/9c25e1e982a03d6f88801eae/latest/${from.value}`
    );

    const data = await response.json();

    const rate = data.conversion_rates[to.value];

    const converted = amount.value * rate;

    result.innerHTML = `
       <div class="conversion-from">
                  <span class="amount">${amount.value} </span>
                  <span class="currency-code">${from.value}</span>
                </div>
                <div class="conversion-equals"><i class="fa-solid fa-equals"></i></div>
                <div class="conversion-to" >
                  <span class="amount"> ${converted.toFixed(2)} </span>
                  <span class="currency-code">${to.value}</span>
                </div>
  `;
  }





  //  const response = await fetch(`https://v6.exchangerate-api.com/v6/9c25e1e982a03d6f88801eae/latest/USD`)
  // const x = await response.json()
  // console.log(x);


})


 savedPlans = localStorage.getItem("plans");
 

if (savedPlans) {
    plansContent.innerHTML = savedPlans;

}
 

 




















// document.getElementById("filter-all-count").textContent =
//     plansContent.querySelectorAll(".plan-card").length;

// document.getElementById("filter-holiday-count").textContent =
//     plansContent.querySelectorAll(".plan-card-type.holiday").length;

// document.getElementById("filter-event-count").textContent =
//     plansContent.querySelectorAll(".plan-card-type.event").length;

// document.getElementById("filter-lw-count").textContent =
//     plansContent.querySelectorAll(".plan-card-type.longweekend").length;