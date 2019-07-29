console.log("___________________")

// const btn = document.querySelector('button');

// btn.onclick = (e) => {
//     e.preventDefault();
//     // const request = require("request");

//     // url = "http://localhost:1980/hello"

//     // request({url, json: true}, (err, response, body) => {
//     //     console.log(response.body)
//     // });

//     btn.style.color = "black";
//     btn.textContent = "Help"
//     console.log("Color Changed!!")
// };



// const btn = document.querySelector('button'); 

const head = document.querySelector('h2') 

const form = document.querySelector('form');


form.addEventListener("submit", (e) => {
    e.preventDefault();

    // if (!form.elements[0].value){
    //     head.textContent = "Please Enter an Address"
    //     return;
    // }

    const address = form.elements[0].value;

    //Check for empty input.
    if (address === ""){
        head.textContent = "Please check your Network Connection."
    }
    
    head.textContent = "Fetching Temperature...";
    // console.log(address)
    fetch("/weather?address=" + address)
    .then(response => {
        response.json()
        .then((data) => {
            // console.log(data)
            if (!data.err){
            head.textContent = "The Temperature is: " + data.temperature //+ "<br>" + "and"//+ "°C";
            }
            else {
            head.textContent =  data.err;
            }
        })
    })
    .catch((err) => {
        head.textContent = "Please check your Network Connection."
    })
})

