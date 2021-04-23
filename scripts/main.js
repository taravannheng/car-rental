$(function() {
    loadCars();

    $('.main').on('click', function(e) {

        const targetEl = $(e.target);
    
        /*          ADD TO CART             */
        
        if (targetEl.hasClass('card__button') || targetEl.parent().hasClass('card__button')) {
            if (!isNotAvailableButton(targetEl)) {   
                toggleButtonColor(targetEl);
            }
        }
    });
});

