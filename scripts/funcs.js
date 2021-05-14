/*          LOAD CAR FUNCTIONALITY          */

function createCarEl(car) {
    const cardEl = $(`<div class="main__card card" id="${car.id}"></div>`);
    const cardImgEl = $(`<div class="card__img" style="background-image: url(${car.image})"></div>`);
    const cardTitleEl = $(`<h2 class="card__title title"><span class="card__title-brand title__text title__text--dark title__text--md-x1 title__text--bold-weight">${car.brand}</span> <span class="card__title-model  title__text title__text--dark title__text--md-x1 title__text--bold-weight">${car.model}</span> <span class="card__title-model-year  title__text title__text--dark title__text--md-x1 title__text--bold-weight">${car.modelYear}</span></h2>`);
    const cardDetailsEl = $(`
        <div class="card__details">
            <ul class="card__details-labels">
                <li class="card__details-labels-category">Category: </li>
                <li class="card__details-labels-mileage">Mileage: </li>
                <li class="card__details-labels-fuel-type">Fuel Type: </li>
                <li class="card__details-labels-seat">Seats: </li>
                <li class="card__details-labels-price-per-day">Price Per Day: </li>
                <li class="card__details-labels-availability">Availability: </li>
            </ul>
            <ul class="card__details-texts">
                <li class="card__details-texts-category">${car.category}</li>
                <li class="card__details-texts-mileage">${Number(car.mileage).toLocaleString()} kms</li>
                <li class="card__details-texts-fuel-type">${car.fuelType}</li>
                <li class="card__details-texts-seat">${car.seats}</li>
                <li class="card__details-texts-price-per-day">$${car.pricePerDay}</li>
                <li class="card__details-texts-availability">${car.availability}</li>
            </ul>
        </div>
    `);
    const cardDescriptionEl = $(`
        <div class="card__description">
            <p class="card__description-text">${car.description}</p>
        </div>
    `);

    //button element
    let cardButtonEl;
    const selectedCarSession = JSON.parse(sessionStorage.getItem('selectedCars'));

    if (car.availability === 'false') {
        cardButtonEl = $(`<button type="button" class="card__button card__button--unavailable button"><span class="button__text">Not Available</span></button>`);
    } else {
        cardButtonEl = $(`<button type="button" class="card__button button"><span class="button__text">Add to Cart</span></button>`);
    }

    if (selectedCarSession) {
        $.each(selectedCars, function(index, selectedCar) {
            if (car.id === selectedCar.id) {
                cardButtonEl = $(`<button type="button" class="card__button card__button--added button"><span class="button__text">Added to Cart</span></button>`);
            }
        });
    }

    //add elements to card
    cardEl.append(cardImgEl);
    cardEl.append(cardTitleEl);
    cardEl.append(cardDetailsEl);
    cardEl.append(cardDescriptionEl);
    cardEl.append(cardButtonEl);

    return cardEl;
}

function loadContents() {
    $.getJSON('/json/cars.json', function(result) {
        let cars = result.cars;

        $.each(cars, function(index, car) {
            const carEl = createCarEl(car);

            $('.main').append(carEl);
        });
    });

    //session
    const selectedCarSession = JSON.parse(sessionStorage.getItem('selectedCars'));

    if (selectedCarSession) {
        updateReservationCounter();
    }
}

/*          ADD TO CART BUTTON FUNCTIONALITY          */

// ||   GENERAL

function getButtonEl(el) {
    return el.hasClass('card__button') ? el : el.parent();
}

function getButtonTextEl(el) {
    return el.hasClass('card__button') ? el.children('.button__text') : el;
}

function isNotAvailableButton(el) {
    const button = getButtonEl(el);
    let status = false;

    button.hasClass('card__button--unavailable') ? status = true : status = false;

    return status;
}

function getCarID(el) {
    return el.parentsUntil('.main', '.card').attr('id');
}

function isSelected(carID) {
    let selectedStatus = false;

    $.each(selectedCars, function(index, selectedCar) {
        if (selectedCar.id === carID) {
            selectedStatus = true;
        }
    });

    return selectedStatus;
}

function removeSelectedCar(carID) {
    $.each(selectedCars, function(index, selectedCar) {
        if (carID === selectedCar.id) {
            selectedCars.splice(index, 1);
        }
    });
}

function addSelectedCar(carID) {
    const car = {
        id: carID,
        rentalDays: 1
    }

    selectedCars.push(car);
}

//  ||  TOGGLE BUTTON COLOR 

function toggleButtonColor(el) {
    const buttonEl = getButtonEl(el);

    if (buttonEl.hasClass('card__button--added')) {
        buttonEl.removeClass('card__button--added');
    } else {
        buttonEl.addClass('card__button--added');
    }
}

//  ||  TOGGLE BUTTON TEXT

function toggleButtonText(el, firstText, secondText) {
    const buttonTextEl = getButtonTextEl(el);

    if (buttonTextEl.text() === firstText) {
        buttonTextEl.text(secondText);
    } else {
        buttonTextEl.text(firstText);
    }
}

//  ||  UPDATE SELECTED CAR

function updateSelectedCar(el) {
    const carID = getCarID(el);
    const selectedStatus = isSelected(carID);

    if (selectedStatus) {
        removeSelectedCar(carID);
    } else {
        addSelectedCar(carID);
    }
}

//  ||  UPDATE SELECTED CAR SESSION

function updateSelectedCarSession() {
    sessionStorage.setItem('selectedCars', JSON.stringify(selectedCars));
}

/*          RESERVATION COUNTER FUNCTIONALITY          */

function updateReservationCounter() {
    const counterText = $('.counter__text');
    const numberOfReservations = selectedCars.length;

    counterText.text(numberOfReservations);
}

/*          RESERVATION LIST FUNCTIONALITY          */

function createReservationItem(selectedCar) {
    let reservationItemEl = $(`<div class="reservation-item" id="${selectedCar.id}"></div>`);

    $.getJSON('/json/cars.json', function(result) {
        let cars = result.cars;

        $.each(cars, function(index, car) {
            if (car.id === selectedCar.id) {
                const thumbnailEl = $(`<div class="reservation-item__thumbnail" style="background-image: url(${car.image})"></div>`);
                const vehicleEl = $(`<p class="reservation-item__vehicle">${car.brand} ${car.model} ${car.modelYear}</p>`);
                const pricePerDayEl = $(`<p class="reservation-item__price-per-day">$${car.pricePerDay}</p>`);
                const rentalDaysControlEl = $(`
                    <div class="reservation-item__rental-days rental-days-control">
                        <i class="rental-days-control__down-button fas fa-sort-down"></i>
                        <input type="number" name="rental_days" class="rental-days-control__input" min="1" value="1" max="30">    
                        <i class="rental-days-control__up-button fas fa-sort-up"></i>
                        <p class="rental-days-control__message"></p>
                    </div>
                `);
                const deleteButtonEl = $(`
                    <button type="button" class="reservation-item__delete-button button">
                        <span class="button__text">Delete</span>
                    </button>
                `);
    
                reservationItemEl.append(thumbnailEl);
                reservationItemEl.append(vehicleEl);
                reservationItemEl.append(pricePerDayEl);
                reservationItemEl.append(rentalDaysControlEl);
                reservationItemEl.append(deleteButtonEl);
            }    
        }); 
    });

    return reservationItemEl;
}

function loadReservationList() {
    if (selectedCars.length === 0) {
        $('.reservation__list').html('');
    } else {
        $.each(selectedCars, function(index, selectedCar) {
            const reservationItem = createReservationItem(selectedCar);

            $('.reservation__list').append(reservationItem);
        });
    }
}

function updateRentalDays(carID, rentalDays) {
    const selectedCarSession = JSON.parse(sessionStorage.getItem('selectedCars'));

    $.each(selectedCarSession, function(index, selectedCar) {
        if (selectedCar.id === carID) {
            selectedCar.rentalDays = rentalDays;
        }
    });

    sessionStorage.setItem('selectedCars', JSON.stringify(selectedCarSession));
}

function updateRentalDaysMessage(messageEl, message = '') {
    messageEl.text(message);
}

//              RESERVATION DETAILS

function createReservationDetailsItem(selectedCar) {
    const reservationDetailsItem = $(`<div class="reservation-details__item" id="${selectedCar.id}"></div>`);

    $.getJSON('/json/cars.json', function(result) {
        let cars = result.cars;

        $.each(cars, function(index, car) {
            if (car.id === selectedCar.id) {
                const thumbnailEl = $(`<div class="reservation-details__thumbnail" style="background-image: url(${car.image})"></div>`);
                const infoEl = $(`<div class="reservation-details__info"></div>`);
                const vehicleEl = $(`<p class="reservation-details__vehicle">${car.brand} ${car.model} ${car.modelYear}</p>`);
                const rentalDaysEl = $(`<p class="reservation-details__rental-days">${selectedCar.rentalDays} Rental Days</p>`);
                const subTotalEl = $(`<p class="reservation-details__sub-total">$${(Number(selectedCar.rentalDays) * Number(car.pricePerDay)).toLocaleString()}</p>`);

                infoEl.append(vehicleEl);
                infoEl.append(rentalDaysEl);
                infoEl.append(subTotalEl);
                reservationDetailsItem.append(thumbnailEl);
                reservationDetailsItem.append(infoEl);

                //update total
                let totalText = $('.total__amount').text();
                totalText = totalText.replace(/\D/g, '');
                let total = Number(totalText);
                const subTotal = Number(selectedCar.rentalDays) * Number(car.pricePerDay);

                total += subTotal;

                $('.total__amount').text(total.toLocaleString());
            }    
        }); 
    });

    return reservationDetailsItem;
}

function loadReservationDetails(selectedCar) {
    const selectedCarSession = JSON.parse(sessionStorage.getItem('selectedCars'));

    $.each(selectedCarSession, function(index, selectedCar) {
        const reservationDetailsItem = createReservationDetailsItem(selectedCar);

        $('.reservation-details__item-container').append(reservationDetailsItem);
    });
}

//          FORM VALIDATION

function isNotEmpty(inputValue) {
    let validStatus = false;

    inputValue === '' ? validStatus = false : validStatus = true;

    return validStatus;
}

function isValidEmail(inputValue) {
    return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(inputValue);
}