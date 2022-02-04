// Personal API Key for OpenWeatherMap API
const apiKey = 'd752d91d6ad5212abaa87339d0f0f4d1&units=imperial'; // My apiKey of OpenWeatherMap.

/* Global Variables */

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = (d.getMonth()) + 1 + '.' + d.getDate() + '.' + d.getFullYear(); // here i added one to the months because it reads the entry as 0 at first so i had to add one.

const generate = document.getElementById('generate'); // selecting the button that when i click it will get me the weather and more (which will be the operations down below).
generate.addEventListener('click', function () {
    const zip = document.getElementById('zip').value; // assigning the zip code that the user will input to a variable.
    const countryCode = document.getElementById('countryCode').value; // assigning the country code that the user will input to a variable.
    TheWeatherData(zip, countryCode, apiKey); // generating the weather through this function
})

const TheWeatherData = async (zip, countryCode) => { // (GET request to the site that iwant to get the information from with my private apiKey)
    const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?zip=${zip},${countryCode}&appid=${apiKey}`); // building the fetch request to get the data from the site. throught my api key, the country code if entered and the zip code (which is required in this method).
    if (res.status !== 200) {
        alert('Error \nCity Not Found'); // setting an alert message shows error whenever the respond of data site fails to be get.
    }
    if (zip.length < 5 || zip.length > 5) {   
        alert('Invalid zip code \nNote: zip code have to be 5 numbers');// showing error message if the zip code length is less than or greater than 5

    }

    const feelings = document.getElementById('feelings').value; // getting the value of the textarea to know the feelings of the user.

    try {
        const data = await res.json(); // awaiting for the respond and then turning the data from the json format into javascript format.
        console.log(data); 
        const Mytemp = data.main.temp; // saving the temperature from the the data recieved from the api in a variable.
        console.log(Mytemp);
        if (Mytemp >= 0 && Mytemp < 10) { // adding gifs and style to the layout depending on the temperature.
            document.getElementById('image').src = "https://media2.giphy.com/media/xULW8jsQM8wsfqii6k/200w.webp?cid=ecf05e47854ux97ixjjrh4t2021d965zusuvwzfazxx67a3x&rid=200w.webp&ct=g";
            document.getElementById('weather text').innerHTML = 'The Weather is Freezing Cold!';
            document.getElementById('weather text').style.color = 'white';
            document.getElementById('entryHolder').style.color = 'white';
        }
        if (Mytemp >= 10 && Mytemp <= 45) {
            document.getElementById('image').src = "https://media4.giphy.com/media/3oFzm7xQje1yyQK3e0/200w.webp?cid=ecf05e47zygj43mawrte78zros60az92jx4k8zowi54pfwfg&rid=200w.webp&ct=g";
            document.getElementById('weather text').innerHTML = 'The Weather is Cold!';
            document.getElementById('weather text').style.color = 'white';
            document.getElementById('entryHolder').style.color = 'white';
        }
        if (Mytemp > 45 && Mytemp <= 75) {
            document.getElementById('image').src = "https://media4.giphy.com/media/U1mIZ4n38Jh6k0hAPT/giphy.webp?cid=ecf05e474jyogd3g1l1e7xk6kgi3syo4n4b72eu20e9iik8j&rid=giphy.webp&ct=g";
            document.getElementById('weather text').innerHTML = 'The Weather is Nice!';
            document.getElementById('weather text').style.color = '#89FE05';
            document.getElementById('entryHolder').style.color = '#89FE05';

        }
        if (Mytemp > 75 && Mytemp <= 87) {
            document.getElementById('image').src = "https://media4.giphy.com/media/2WjnOJMabobfmQ09jw/200w.webp?cid=ecf05e47pd4cujm2h4ogvz3y0m7uorejjpelhslonhdd2pu9&rid=200w.webp&ct=g";
            document.getElementById('weather text').innerHTML = 'The Weather is Warm!';
            document.getElementById('weather text').style.color = '#e7a521';
            document.getElementById('entryHolder').style.color = '#e7a521';
            


        }
        if (Mytemp > 87 && Mytemp <= 120) {
            document.getElementById('image').src = "https://media4.giphy.com/media/3ogwG0cKu7x87xU6VG/200.webp?cid=ecf05e47xhu4gio7na26dpb59wz6fy9ijyb7s0drle4hi97y&rid=200.webp&ct=g";
            document.getElementById('weather text').innerHTML = 'The Weather is So Hot!';
            document.getElementById('weather text').style.color = '#dc143c';
            document.getElementById('entryHolder').style.color = '#dc143c';

        }
        await postData('/weather', { // waiting for the data recieved from the api to be posted to the endpoint.
            temp: Mytemp,
            date: newDate,
            feelings: feelings
        });
        await endPointData(); // getting the data back from the endpoint. 

    } catch (error) {
        // appropriately handles the errors.
        console.log("error: ", error);
    }
};




const endPointData = async () => { // fetching the data from the server.js and returning the endpoint data (GET request) then making some modifacations on the UI based on the data recieved.
    const request = await fetch('/all')
    try {
        const data = await request.json();
        document.getElementById('temp').innerHTML = 'Temperature: ' + Math.round(data.temp)+ 'deg'; // using the method of Math.round to convert the number of temperature recieved to the closest integer.
        document.getElementById('date').innerHTML = 'Date: ' + data.date; // getting the date from the new data that was recently added to the endpoint. throught the above functions.
        document.getElementById('content').innerHTML = 'Your Feelings: ' + data.feelings; // getting the data of the feelings of the user depending on what he types and then changing an element in the UI based on this information.
    } catch (error) {
        console.log('error: ', error);
    }
};



const postData = async (url = '', data = {}) => { // making a post request to the projectData endpoint to post information that i got from the TheWeatherData function.
    const response = await fetch(url, {
        method: 'POST', // making the method of POST because the default is GET.
        credentials: 'same-origin', 
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data) // converting the data recieved from the post request to JSON string or format.
    });
    try {
        const newData = await response.json(); // waiting for the response of the post request to complete.
        console.log(newData); // console logging the data posted.
        return newData; // returning the newData.
    } catch (error) {

        console.log("error: ", error);
    }
};
