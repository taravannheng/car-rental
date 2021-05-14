$(function() {
    //          INITIAL LOADING

    const lastBooking = JSON.parse(sessionStorage.getItem('lastBooking'));

    if (lastBooking) {
        //                  CHECKOUT WARNING
        $('.confirmation__warning').addClass('warning--hide');

        $('.confirmation__title').removeClass('confirmation__title--hide');
        $('.confirmation__booking-info').removeClass('confirmation__booking-info--hide');
        $('.confirmation__reservation-details').removeClass('confirmation__reservation-details--hide');

        //          BOOKING INFO

        generateBookingInfo();

        //          RESERVATION DETAILS

        loadReservationDetails(lastBooking);

        //          RESET
        resetInfo();
    } else {
        //                  CHECKOUT WARNING
        $('.confirmation__warning').removeClass('warning--hide');

        $('.confirmation__title').addClass('confirmation__title--hide');
        $('.confirmation__booking-info').addClass('confirmation__booking-info--hide');
        $('.confirmation__reservation-details').addClass('confirmation__reservation-details--hide');
    }

    //          HOME BUTTON

    $('.booking-info__home-button').on('click', function() {
        sessionStorage.removeItem('lastBooking');
    });

    //          LOGO
    $('.header__logo').on('click', function() {
        sessionStorage.removeItem('lastBooking');
    });
});