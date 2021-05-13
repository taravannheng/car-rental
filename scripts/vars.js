let selectedCars = [];

/*              SESSIONS                */

//index

let selectedCarSession = JSON.parse(sessionStorage.getItem('selectedCars'));
if (selectedCarSession) {
    selectedCars = selectedCarSession;
}