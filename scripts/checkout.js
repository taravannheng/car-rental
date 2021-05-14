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
            $('.checkout__form').addClass('checkout__form--hide');
            $('.checkout__reservation-details').addClass('checkout__reservation-details--hide');
        }
    } else {
        $('.checkout__title').addClass('checkout__title--hide');
        $('.checkout__form').addClass('checkout__form--hide');
        $('.checkout__reservation-details').addClass('checkout__reservation-details--hide');
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
            }
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
        }
    });

    $('.form__book-button').on('click', function(e) {
        const targetEl = $(e.target);
        const inputControlInputs = $('.input-control__input');
        let isValidForm = true;

        $.each(inputControlInputs, function(index, inputControlInput) {
            const inputEl = $(inputControlInput);
            const errorMessageEl = inputEl.prev().prev();
            let isValid;
            
            if (inputEl.attr('id') === 'second-address') {
                isValid = true;
            } else if (inputEl.attr('id') === 'email') {
                isValid = isValidEmail(inputEl.val());
            } else {
                isValid = isNotEmpty(inputEl.val());
            }

            if (isValid) {
                errorMessageEl.removeClass('input-control__error-message--show');
            } else {
                isValidForm = false;
                errorMessageEl.addClass('input-control__error-message--show');
            }
        });

        if (isValidForm) {
            window.location.href = '/confirmation.html';
        }
    });

    //          RESERVATION DETAILS

    if (sessionStorage.getItem('selectedCars')) {
        loadReservationDetails();
    }
});