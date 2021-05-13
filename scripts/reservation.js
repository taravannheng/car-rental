$(function() {
    //              INITIAL LOADING

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
    } else {
        $('.reservation__title').addClass('reservation__title--hide');
        $('.reservation__labels').addClass('reservation__labels--hide');
        $('.reservation__list').addClass('reservation__list--hide');
        $('.reservation__checkout-button').addClass('reservation__checkout-button--hide');
    }

    //              RENTAL DAYS CONTROL

    $('.reservation').on('click', function(e) {
        const targetEl = $(e.target);

        if (targetEl.hasClass('rental-days-control__down-button')) {
            if (targetEl.next().val() > 1) {
                targetEl.next().val(function(index, oldValue) {
                    return --oldValue;
                });
            }

            //update session
            const carID = targetEl.parentsUntil('.reservation__list', '.reservation-item').attr('id');
            const rentalDays = targetEl.next().val();

            updateRentalDays(carID, rentalDays);
        }

        if (targetEl.hasClass('rental-days-control__up-button')) {
            if (targetEl.prev().val() < 30) {
                targetEl.prev().val(function(index, oldValue) {
                    return ++oldValue;
                });
            }

            //update session
            const carID = targetEl.parentsUntil('.reservation__list', '.reservation-item').attr('id');
            const rentalDays = targetEl.prev().val();

            updateRentalDays(carID, rentalDays);
        }
    });
});