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

    //              EVENT LISTENERS

    $('.reservation').on('click', function(e) {
        const targetEl = $(e.target);

        //          RENTAL DAYS CONTROL

        if (targetEl.hasClass('rental-days-control__down-button')) {
            if (targetEl.next().val() > 1) {
                targetEl.next().val(function(index, oldValue) {
                    return --oldValue;
                });


                if (targetEl.next().val() >= 1 && targetEl.next().val() <= 30) {
                    const messageEl = targetEl.next().next().next();
                    updateRentalDaysMessage(messageEl);
                }
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

                if (targetEl.prev().val() >= 1 && targetEl.prev().val() <= 30) {
                    const messageEl = targetEl.next();
                    updateRentalDaysMessage(messageEl);
                }
            }

            //update session
            const carID = targetEl.parentsUntil('.reservation__list', '.reservation-item').attr('id');
            const rentalDays = targetEl.prev().val();

            updateRentalDays(carID, rentalDays);
        }

        //          DELETE BUTTON

        if (targetEl.hasClass('reservation-item__delete-button') || targetEl.parent().hasClass('reservation-item__delete-button')) {
            const carID = targetEl.parentsUntil('.reservation__list', '.reservation-item').attr('id');
            let carIndex = 0;
            
            //remove car from selectedCars
            $.each(selectedCars, function(index, selectedCar) {
                if (carID === selectedCar.id) {
                    carIndex = index;
                }
            });

            selectedCars.splice(carIndex, 1);

            //update selectedCarSession
            sessionStorage.setItem('selectedCars', JSON.stringify(selectedCars));

            //update reservation counter
            updateReservationCounter();

            // remove item
            targetEl.parentsUntil('.reservation__list', '.reservation-item').remove();

            // show message and hide reservation-related items
            if ($('.reservation-item').length === 0) {
                $('.reservation__warning').removeClass('warning--hide');
                
                $('.reservation__title').addClass('reservation__title--hide');
                $('.reservation__labels').addClass('reservation__labels--hide');
                $('.reservation__list').addClass('reservation__list--hide');
                $('.reservation__checkout-button').addClass('reservation__checkout-button--hide');
            }
        }
    });

    $('.reservation').on('change', function(e) {
        const targetEl = $(e.target);

        //          RENTAL DAYS CONTROL

        if (targetEl.hasClass('rental-days-control__input')) {
            const messageEl = targetEl.next().next();
            let isValidAmount = true;

            if (targetEl.val() < 1) {
                isValidAmount = false;
                updateRentalDaysMessage(messageEl, 'Invalid Rental Days!');
            } else if (targetEl.val() > 30) {
                isValidAmount = false;
                updateRentalDaysMessage(messageEl, 'Rental cannot exceed 30 days!');
            } else {
                isValidAmount = true;
                updateRentalDaysMessage(messageEl);
            }

            if (isValidAmount) {
                //update session
                const carID = targetEl.parentsUntil('.reservation__list', '.reservation-item').attr('id');
                const rentalDays = Number(targetEl.val());

                updateRentalDays(carID, rentalDays);
            }

        }
    });
});