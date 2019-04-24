'use strict';

//I can get the maintenance schedule from here
const maintenanceBaseURL = 'https://api.carmd.com/v3.0/maint'

//I can get general car information from here
const genInfoBaseUrl = 'https://vpic.nhtsa.dot.gov/api/vehicles/decodevinextended'



function appStart() {
    console.log('app has started');
    $('#vinForm').submit(function (event) {
        event.preventDefault();
        const vin = $('#vinForm #enterVin').val();
        const mileage = $('#vinForm #enterMileage').val();
        console.log(vin, mileage);

        getCarInfo(vin, mileage);
        //getMaintenance(vin, mileage);
    });
}


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

const data = returned.data;
//console.log(data);

let holder = {};
let output = [];
let newArr = [];
let nData = [];

function removeDublicates(d) {

    let i;
    for (i = 0; i < data.length; i++) {
        if (nData.indexOf(data[i].desc) == -1) {
            nData.push(data[i].desc);
        }
    }



    return nData;
    //loop over data
    //push description into the array
    //if description


}
removeDublicates(data);
//console.log(nData[0]);
//console.log(removeDublicates(nData));
group(nData);

function group(nData) {
    console.log('group works');

    //console.log(data);

    //data.forEach(function(){
    let wantedData = [];
    let i = 0;
    // console.log(data[1].desc)
    //typeof(wantedData);
    //console.log(typeof (wantedData));

    let desc = data[i].desc;
    let mileage = data[i].due_mileage;
        
    wantedData[i] = {
        'name': `${desc}`,
        'mileage': [mileage]        
    };


    for (i = 0; i < data.length; i++) {
        console.log(wantedData[i].mileage);
       
        if(wantedData[i].name == data[i].desc){

            if(wantedData[i].mileage == data[i].due_mileage){
                wantedData[i].mileage.push(data[i].due_mileage);
            }
        }
      
    }

console.log(wantedData[0].mileage);
    

        
    
        //wantedData[0].mileage.push(10000);
   // console.log(wantedData[4].mileage, wantedData[4].name);


}

/*
data.forEach(function(item){
    let collection = [];
    
     let existing = data.filter(function(v, i){
        //console.log(item.desc);
        return v.desc == item.desc;
    });
    console.log(existing);
   /* 
    if(existing.length){
        let existingIndex = data.indexOf(existing[0]);
        console.log(existingIndex);
        //console.log(data[existingIndex].desc, 'data');
        output = data[existingIndex].desc.concat(item.due_mileage);
        console.log(item.desc, 'data');
        //console.log(existing);
    }
   if(typeof item.desc == 'string'){
        item.desc = [item.desc];
        console.log(item.desc, 'item.desc');
        output.push(item);        
    }
    //console.log(output);
    //console.log(existing);
});
*/


$(appStart());