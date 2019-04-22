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
        .then(responseJson => console.log(responseJson))
        .catch(err => {
            console.log(err.message)
        });


}

$(appStart());