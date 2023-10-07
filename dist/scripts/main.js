// It's Up to You :) //

let citiesName = ["Jordan-Amman", "AlSaudih-Makkah", "Egypt-Cairo"];

let selectCity = document.getElementById("selectCity");
let currentDate = document.querySelector("#currentDate");
let currentCity = document.querySelector("#currentCity");
let cards = document.querySelector(".cards");

for (const city of citiesName) {
  let option = `
  <option value=${city}>${city}</option>
  `;
  selectCity.innerHTML += option;
}

timingByCity();

selectCity.addEventListener("change", () => {
  cards.innerHTML = "";
  console.log(
    "🚀 ~ selectCity.addEventListener ~ selectCity.value:",
    selectCity.value
  );

  if (selectCity.value == `${citiesName[1]}`) {
    console.log(citiesName[1]);
    timingByCity("SA", "Makkah al Mukarramah");
    currentCity.innerHTML = citiesName[1];
  } else if (selectCity.value == `${citiesName[2]}`) {
    timingByCity("EG", "Al Qāhirah");
    currentCity.innerHTML = citiesName[2];
    console.log(citiesName[2]);
  } else {
    console.log(citiesName[0]);
    timingByCity();
    currentCity.innerHTML = citiesName[0];
  }
});

function timingByCity(countryName = "JO", cityName = "Amman") {
  let params = {
    country: countryName,
    city: cityName,
    method: 9,
  };
  axios
    .get("http://api.aladhan.com/v1/timingsByCity", {
      params /*params:params*/,
    })
    .then(function (response) {
      currentDate.innerHTML = `${response.data.data.date.gregorian.weekday.en} / ${response.data.data.date.gregorian.date} `;

      const timings = response.data.data.timings;
      for (const [prayerName, prayerTime] of Object.entries(timings)) {
        if (
          prayerName == "Sunset" ||
          prayerName == "Imsak" ||
          prayerName == "Midnight" ||
          prayerName == "Firstthird" ||
          prayerName == "Lastthird"
        ) {
          continue;
        }
        console.log(`${prayerName}: ${prayerTime}`);
        let card = `
                    <div
                      class="card border-2 border-dashed border-green-600 bg-lime-100 shadow-lg shadow-green-100/80 h-72 w-[13%] mx-auto p-1 mt-12 rounded-3xl flex flex-col justify-evenly"
                    >
                      <h1 class="text-2xl m-4 text-center">${prayerName}</h1>
                      <hr class="border-solid border-black border rounded-2xl" />
                      <h2 class="text-2xl m-4 text-center">${prayerTime}</h2>
                    </div>
                `;
        cards.innerHTML += card;
      }
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
    .finally(function () {
      // always executed
    });
}
