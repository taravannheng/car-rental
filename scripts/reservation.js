/*              SESSIONS            */

//hide warning
if (sessionStorage.getItem('selectedCars')) {
    const selectedCarSession = JSON.parse(sessionStorage.getItem('selectedCars'));

    //                  RESERVATION WARNING
    
    // if (selectedCarSession.length > 0) {
    //     $('.reservation__warning').addClass('warning--hide');
    // }
}