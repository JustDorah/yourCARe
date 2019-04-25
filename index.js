'use strict';

//I can get the maintenance schedule from here
const maintenanceBaseURL = 'https://api.carmd.com/v3.0/maint';

//I can get general car information from here
const genInfoBaseUrl = 'https://vpic.nhtsa.dot.gov/api/vehicles/decodevinextended';



function appStart() {
    console.log('app has started');
    $('#vinForm').submit(function (event) {
        event.preventDefault();
        const vin = $('#vinForm #enterVin').val();
        const mileage = $('#vinForm #enterMileage').val();
        console.log(vin, mileage);

        getCarInfo(vin, mileage);
        //getMaintenance(vin, mileage);
        getCarMaintenance();
    });
}

//gets general car information
function getCarInfo(vin, mileage) {
    const params = {
        vinNum: vin,
    };
    const genCarInfoQuery = `${vin}?format=json`;
    //console.log(genCarInfoQuery);

    const urlGenCar = genInfoBaseUrl + '/' + genCarInfoQuery;
    //console.log(urlGenCar);

    fetch(urlGenCar)
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error(response.statusText);
        })
        .then(responseJson => {
            //console.log(responseJson)
            displayGenCar(responseJson, mileage);
        })
        .catch(err => {
            console.log(err.message);
        });
    // const genCarInfo = responseJson;
    // console.log(genCarInfo);
    // displayGenCar(genCarInfo);
}

//displays general car information
function displayGenCar(responseJson, mileage) {
    console.log('displayGenCar is working!!');

    const results = responseJson.Results;
    //console.log(results);

    //filter out the desired data
    const manuVariable = function (results) {
        return results.Variable === 'Manufacturer Name';
    };
    const manufacturer = results.filter(manuVariable)[0];
    console.log(manufacturer.Value, 'manufacturer');

    const makVariable = function (results) {
        return results.Variable === 'Make';
    };
    const make = results.filter(makVariable)[0];
    console.log(make.Value, 'make');

    const modVariable = function (results) {
        return results.Variable === 'Model';
    };
    const model = results.filter(modVariable)[0];
    console.log(model.Value, 'model');

    const yrVariable = function (results) {
        return results.Variable === 'Model Year';
    };
    const year = results.filter(yrVariable)[0];
    console.log(year.Value, 'year');

    console.log(mileage, 'mileage');


    $('div .generalInfo').addClass('hidden');
    $('div .displayGenInfo').append(`
    <p><strong>Manufacturer</strong>: ${manufacturer.Value}</p>
    <p><strong>Make</strong>: ${make.Value}</p>
    <p><strong>Model</strong>: ${model.Value}</p>
    <p><strong>Year</strong>: ${year.Value}</p>
    <p><strong>Mileage</strong>: ${mileage}</p>`);
}

//data display from response.js
//console.log(returned.data[0].desc);

function getCarMaintenance(){
const data = returned.data;//data in json
console.log(data);
const condensed = [];
console.log(data[0].desc);
console.log(data[0].hasOwnProperty('desc'));

//push new objects into condensed
//but not those with duplicate desc
//push mileage value from duplicate desc into object in condensed
for(let obj in data){
    let duplicate = false; // flag: add new obj or note?
    
    for (let i = 0; i < condensed.length; i++){
        if(condensed[i].hasOwnProperty('desc')){
            if (condensed[i].desc == data[obj].desc){
                condensed[i].mileage.push(data[obj].due_mileage);
                duplicate = true;
            }
        }
    }    
    if(!duplicate){
        let newObj = {};
        newObj.desc = data[obj].desc;
        newObj.mileage = [data[obj].due_mileage];
        condensed.push(newObj);
    }
}
displayCarMaintenance(condensed);
}



function displayCarMaintenance(condensed){
    console.log(condensed);
    for(let i = 0; i < condensed.length; i++){

        let mileage = condensed[i].mileage;

        $('.displayMaintenance').append(`<tr>
            <td>${condensed[i].desc}</td>
            <td id="displayMileages${i}"></td>
            </tr>`);
        for( let j = 0; j < mileage.length; j++){
            $(`#displayMileages${i}`).append(`<td>${mileage[j]}</td>`);
        console.log(condensed[i].mileage); 
        }         
    };    
}



$(appStart());