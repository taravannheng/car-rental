let cars;
let selectedCars = [];

//session
let selectedCarSession = JSON.parse(sessionStorage.getItem('selectedCars'));
if (selectedCarSession) {
    selectedCars = selectedCarSession;
}