const form = document.querySelector(".top-banner form");
const input = document.querySelector(".top-banner input");
const msg = document.querySelector(".top-banner .msg");
const list = document.querySelector(".ajax-section .cities");
const apikey = "edc228562ac0a8aa3116d41c0687cf56";
form.addEventListener("submit", event => {
    event.preventDefault();
    const inputvalue = input.value;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${inputvalue}&appid=${apikey}&units=metric`
    fetch(url)
        .then(response => response.json())
        .then(data => {
            const { sys, main, weather, name } = data;
            const icon = `https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/${weather[0]["icon"]}.svg`;
            const li = document.createElement("li");
            const markup = `
            <h2 clas="city-name" data-name=${name},${sys.country}>
            <span>${name}</span>
            <span>${sys.country}</span>
            </h2>
            <div class="citi-temp">${Math.round(main.temp)}</div>
            <figure>
            <img class="city-icon" src='${icon}' alt="city"></img>
            <figurecaption>${weather[0]['description']}</figurecaption>
            </figure>
            `;
            list.appendChild(li).innerHTML = markup;
            msg.innerHTML = "";
            input.value = "";
        })
        .catch(err => msg.innerHTML = `Error`);
});

