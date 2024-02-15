// https://openweathermap.org/current
// unsplash.com
// https://github.com/public-apis/public-apis?tab=readme-ov-file#weather


const cityInput = document.querySelector(".inputText");
const btn = document.querySelector(".btn");


/* btn izleme */
btn.addEventListener("click", () => {

    getData(cityInput.value)


})
// Enter tuşu ile arama

cityInput.addEventListener("keyup", (event) => {
    if (event.key === "Enter") {
        getData(cityInput.value);
    }
});

function getData(name) {

    // API Key tanımlama
    const API = "277ec42b023076a56c1cc790af4fbe98"

    // Base URL Tanımlama
    const baseURL = `https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=${API}&units=metric&lang=tr`
    console.log(baseURL)

    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    // Fetch ile promise döndür ve JSON'a çevir
    fetch(baseURL)
        .then(res => res.json())
        .then(data => {
            const { name, sys: { country }, main: { temp, feels_like, humidity }, wind: { speed }, weather: [{ description }] } = data;
            // console.log(name, temp, humidity)

            //Verileri JS'e çekme
            const city = document.querySelector("#şehir")
            const temperature = document.querySelector("#sicaklik")
            const weatherDesc = document.querySelector("#havaDurumu")
            const feel = document.querySelector("#hissedilen")
            const hum = document.querySelector("#humidity")
            const wind = document.querySelector("#wind")
            // console.log(city, temperature, weatherDesc, feel, hum, wind)

            // js'e çekilen elemanları html elemanları yerine yerleştirme
            city.textContent = `${name}, ${country}`
            temperature.textContent = `${temp} °`
            weatherDesc.textContent = `Hava Durumu: ${capitalizeFirstLetter(description)}`
            temperature.textContent = `${Math.round(temp)} °`
            hum.textContent = `Nem: %${humidity}`;
            wind.innerHTML = `Rüzgar: ${speed} km/s`;
            feel.innerText = `Hissedilen Sıcaklık: ${Math.round(feels_like)}°`


        })
        .catch(err => console.log(err))

        cityInput.value = "";
}



