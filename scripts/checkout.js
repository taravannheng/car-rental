$(function() {
    //          INITIAL LOADING

    if (sessionStorage.getItem('selectedCars')) {
        const selectedCarSession = JSON.parse(sessionStorage.getItem('selectedCars'));
    
        //                  CHECKOUT WARNING
        
        if (selectedCarSession.length > 0) {
            $('.checkout__warning').addClass('warning--hide');
        } else {
            $('.checkout__title').addClass('checkout__title--hide');
            $('.checkout__form').addClass('checkout__form--hide');
            $('.checkout__reservation-details').addClass('checkout__reservation-details--hide');
        }
    } else {
        $('.checkout__title').addClass('checkout__title--hide');
        $('.checkout__form').addClass('checkout__form--hide');
        $('.checkout__reservation-details').addClass('checkout__reservation-details--hide');
    }

    if (sessionStorage.getItem('booking')) {
        const booking = JSON.parse(sessionStorage.getItem('booking'));

        $.each($('.input-control__input'), function(index, inputControlInput) {
            const inputEl = $(inputControlInput);
            const inputID = inputEl.attr('id');
    
            switch (inputID) {
                case 'first-name':
                    inputEl.val(booking.firstName);
                    break;
                case 'last-name':
                    inputEl.val(booking.lastName);
                    break;
                case 'email':
                    inputEl.val(booking.email);
                    break;
                case 'first-address':
                    inputEl.val(booking.firstAddress);
                    break;
                case 'second-address':
                    inputEl.val(booking.secondAddress);
                    break;
                case 'city':
                    inputEl.val(booking.city);
                    break;
                case 'state':
                    const stateCode = getStateCode(booking.state);
                    inputEl.val(stateCode);
                    break;
                case 'postal-code':
                    inputEl.val(booking.postalCode);
                    break;
                case 'payment-type':
                    inputEl.val(booking.paymentType);
                    break;
            }
        });
    }

    //          FORM VALIDATION

    $('.input-control__input').on('change', function(e) {
        const targetEl = $(e.target);

        if (!(targetEl.attr('id') === 'second-address')) {
            const errorMessageEl = targetEl.prev().prev();
            const isValid = isNotEmpty(targetEl.val());

            if (!isValid) {
                errorMessageEl.addClass('input-control__error-message--show');            
            } else {
                errorMessageEl.removeClass('input-control__error-message--show');
                updateBookingSession();
            }
        }

        if (isValidForm()) {
            window.location.href = '/confirmation.html';
        }
    });

    $('#email').on('change', function(e) {
        const targetEl = $(e.target);
        const errorMessageEl = targetEl.prev().prev();
        const isValid = isValidEmail(targetEl.val());

        if (!isValid) {
            errorMessageEl.addClass('input-control__error-message--show');
        } else {
            errorMessageEl.removeClass('input-control__error-message--show');
            updateBookingSession();
        }

        if (isValidForm()) {
            window.location.href = '/confirmation.html';
        }
    });

    $('#postal-code').on('change', function(e) {
        const targetEl = $(e.target);
        const errorMessageEl = targetEl.prev().prev();
        const status = checkPostalCode(targetEl.val());

        if (!status.valid) {
            errorMessageEl.addClass('input-control__error-message--show');
            errorMessageEl.text(status.message);
        } else {
            errorMessageEl.removeClass('input-control__error-message--show');
            updateBookingSession();
        }

        if (isValidForm()) {
            window.location.href = '/confirmation.html';
        }
    });

    $('.form__book-button').on('click', function(e) {
        const targetEl = $(e.target);

        if (isValidForm()) {
            window.location.href = '/confirmation.html';
        }
    });

    //          RESERVATION DETAILS

    if (sessionStorage.getItem('selectedCars')) {
        loadReservationDetails();
    }
});