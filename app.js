// api.openweathermap.org/data/2.5/weather?q={city name}&appid={your api key}

const weatherApi = {
    key: "Write_Your_Own_Api_Key",     //change this...
    baseUrl: "https://api.openweathermap.org/data/2.5/weather", 
}


//by defualt...
getWeatherReport("mumbai");

const searchInputBox = document.getElementById('input-box');
const botn=document.getElementById("bt");



// Event Listener Function on keypress
searchInputBox.addEventListener('keypress', (event) => {
    // console.log(event);
    if(event.keyCode == 13) {
        if(searchInputBox.value.trim()===""){
            alert("Please Enter City Name 😊😊"); 
            // getWeatherReport("mumbai");
            }
        
        else{
            // console.log(searchInputBox.value);
            getWeatherReport(searchInputBox.value.trim());
            searchInputBox.value="";
            // document.querySelector('.weather-body').style.display = "block";
            }
    }
});



// Get Weather Report
function getWeatherReport(city) {
    fetch(`${weatherApi.baseUrl}?q=${city}&appid=${weatherApi.key}&units=metric`)
    .then(weather => {
        return weather.json();
    }).then(showWeatherReport)
    .catch(()=>{
        // console.log(0);
        alert("Please Enter Correct City 😊😊");
        getWeatherReport("mumbai");
    });
}



// Show Weather Report
function showWeatherReport(weather){
    // console.log(weather);

    let city = document.getElementById('city');
    city.innerText = `${weather.name}, ${weather.sys.country}`;

    let temperature = document.getElementById('temp');
    temperature.innerHTML = `${Math.round(weather.main.temp)}&deg;C`;

    let minMaxTemp = document.getElementById('min-max');
    minMaxTemp.innerHTML = `${Math.floor(weather.main.temp_min)}&deg;C (min)/ ${Math.ceil(weather.main.temp_max)}&deg;C (max) `;

    let weatherType = document.getElementById('weather');
    weatherType.innerText = `${weather.weather[0].main}`;

    let date = document.getElementById('date');
    let todayDate = new Date();
    date.innerText = dateManage(todayDate);

    if(weather.name === 'Mumbai') {
        document.body.style.backgroundImage = "url('images/bg.jpg')";     
    }

    else if(weatherType.textContent === 'Clear') {
        document.body.style.backgroundImage = "url('images/clears.jpg')";   
    }

    else if(weatherType.textContent === 'Clouds') {
       document.body.style.backgroundImage = "url('images/cloud.jpg')";
    }

    else if(weatherType.textContent === 'Haze') {
        document.body.style.backgroundImage = "url('images/haze.jpg')";
    }

    else if(weatherType.textContent === 'Rain') {
    document.body.style.backgroundImage = "url('images/rain.jpg')";
    }

    else if(weatherType.textContent === 'Snow') {
        document.body.style.backgroundImage = "url('images/snow.jpg')";
    }
    else if(weatherType.textContent === 'Mist') {
        document.body.style.backgroundImage = "url('images/mist.jpg')";   
    }

    else if(weatherType.textContent === 'Thunderstorm') {
        document.body.style.backgroundImage = "url('images/thunderstorm.jpg')";
    } 

    else{
        document.body.style.backgroundImage = "url('images/arial.jpg')";
    } 


    const icon=document.getElementById("icon");
    icon.innerHTML=icon_change(weather.weather);

}



//icon change
function icon_change(data){
    var a=data[0].icon;
    // a=a.substring(0,2)+"d";
    a=`<img src="https://openweathermap.org/img/wn/${a}@2x.png">`
    return a;

}


// Date manage
function dateManage(dateArg) {

    let days = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];

    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    let year = dateArg.getFullYear();
    let month = months[dateArg.getMonth()];
    let date = dateArg.getDate();
    let day = days[dateArg.getDay()];

    return `${day} ${date} ${month}, ${year}`;
}


//for search button...
botn.addEventListener('click',function(){
    if(searchInputBox.value.trim()===""){
    alert("Please Enter City Name 😊😊");
    // getWeatherReport("mumbai");    
    }

    else
    getWeatherReport(searchInputBox.value);
});

