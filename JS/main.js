let today = document.getElementById("today"),
todayDate = document.getElementById("today-date"),
locationCity = document.getElementById("location"),
todayGerad = document.getElementById("today-gerad"),
todayIcon = document.getElementById("today-icon"),
todayDescription= document.getElementById("today-description"),
luftfeuchtigkeit =document.getElementById("luftfeuchtigkeit"),
wind = document.getElementById("wind"),
nextDay=document.getElementsByClassName("nextDay"),
nextDayIcon=document.getElementsByClassName("nextDay-icon"),
maxGerad = document.getElementsByClassName("max-degree"),
minGerad = document.getElementsByClassName("min-degree"),
nextDayDescription=document.getElementsByClassName("nextDay-description"),

currentCity ="Leipzig",
searchBar=document.getElementById("search-bar"),


responsData,

kompass = document.getElementById("kompass");

let days =["Sonntag","Montag", "Dienstag", "Mittwoch" , "Donnerstag", "Freitag", "Samstag"];
let monate = ["Januar","Februar","März","April","Mai","June","Juni","August","September","Oktober","November","Dezember"];



searchBar = document.getElementById("search-bar");

async function getWeatherData(currentCity="Dortmund"){

    try{
        let apiResponse =  await fetch(`http://api.weatherapi.com/v1/forecast.json?key=a81ac2401adb4aa9883195434240908&q=${currentCity}&days=3&aqi=no&alerts=no`);
    
            responsData = await apiResponse.json();

            console.log(responsData);
            displayTodayWeather();
            desplayNextDayWeather()


    }


    catch (error){

        console.error('Error by Fetching the Date',error)

    }
   
}




function displayTodayWeather(){

    let date=new Date();
    
     console.log(monate[date.getMonth()] ) ;

    console.log( days[date.getDay()]  );
    
    today.innerHTML=`${days[date.getDay()]}`;

  todayDate.innerHTML=`${date.getDate()} ${monate[date.getMonth()]}`;
  locationCity.innerHTML=responsData.location.name;
  todayGerad.innerHTML=responsData.current.temp_c;
  todayIcon.setAttribute('src',`${responsData.current.condition.icon}`);
  todayDescription.innerHTML=`${responsData.current.condition.text}`;
  luftfeuchtigkeit.innerHTML=responsData.current.humidity; 
  wind.innerHTML=responsData.current.wind_kph;
  kompass.innerHTML=responsData.current.wind_dir;
}

let day =new Date();
function desplayNextDayWeather(){
for(let i = 0 ; i<nextDay.length;i++){
    nextDay[i].innerHTML=days[new Date(responsData.forecast.forecastday[i+1].date).getDay()] ;
    nextDayIcon[i].setAttribute('src',`${responsData.forecast.forecastday[i+1].day.condition.icon}`);
    nextDayDescription[i].innerHTML=responsData.forecast.forecastday[i+1].day.condition.text;
    maxGerad[i].innerHTML=responsData.forecast.forecastday[i+1].day.maxtemp_c;
    minGerad[i].innerHTML=responsData.forecast.forecastday[i+1].day.mintemp_c;
}

}

searchBar.addEventListener('keyup',function(currentCity){
 currentCity=searchBar.value;
console.log(currentCity);
getWeatherData(searchBar.value)
})
getWeatherData();



