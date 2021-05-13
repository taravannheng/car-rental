/*              SESSIONS            */

//hide warning
if (sessionStorage.getItem('selectedCars')) {
    const selectedCarSession = JSON.parse(sessionStorage.getItem('selectedCars'));

    //                  RESERVATION WARNING
    
    if (selectedCarSession.length > 0) {
        $('.reservation__warning').addClass('warning--hide');

        loadReservationList();
    } else {
        $('.reservation__title').addClass('reservation__title--hide');
        $('.reservation__labels').addClass('reservation__labels--hide');
        $('.reservation__list').addClass('reservation__list--hide');
        $('.reservation__checkout-button').addClass('reservation__checkout-button--hide');
    }
}