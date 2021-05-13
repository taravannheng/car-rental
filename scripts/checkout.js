$(function() {
    //          INITIAL LOADING

    if (sessionStorage.getItem('selectedCars')) {
        const selectedCarSession = JSON.parse(sessionStorage.getItem('selectedCars'));
    
        //                  CHECKOUT WARNING
        
        if (selectedCarSession.length > 0) {
            $('.checkout__warning').addClass('warning--hide');
    
            loadReservationList();
        } else {
            $('.checkout__title').addClass('checkout__title--hide');
        }
    } else {
        $('.checkout__title').addClass('checkout__title--hide');
    }
});