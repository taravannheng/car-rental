$(function() {

    /*                  INITIAL LOADING                 */

    loadContents();

    /*                  RESERVATION                 */

    $('.header__cart').on('click', function(e) {
        const targetEl = $(e.target);

        swapPage('index', 'reservation');
    });

    /*                  ADD TO CART BUTTON                 */

    $('.main').on('click', function(e) {

        const targetEl = $(e.target);
    
        /*          ADD TO CART             */
        
        if (targetEl.hasClass('card__button') || targetEl.parent().hasClass('card__button')) {
            if (!isNotAvailableButton(targetEl)) {   
                toggleButtonColor(targetEl);
                toggleButtonText(targetEl, 'Add to Cart', 'Added to Cart');
                updateSelectedCar(targetEl);
                updateSelectedCarSession();
                updateReservationCounter();
            }
        }
    });
});

