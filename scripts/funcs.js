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
            if (car.id === selectedCar) {
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
    const xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            cars = JSON.parse(this.responseText).cars;

            $.each(cars, function(index, car) {
                const carEl = createCarEl(car);

                $('.main').append(carEl);
            });
        }
    }

    xhr.open('GET', '/json/cars.json', true);
    xhr.send();

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
        if (selectedCar === carID) {
            selectedStatus = true;
        }
    });

    return selectedStatus;
}

function removeSelectedCar(carID) {
    const index = selectedCars.indexOf(carID);

    selectedCars.splice(index, 1);
}

function addSelectedCar(carID) {
    selectedCars.push(carID);
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

/*          RESERVATION PAGE          */

function getCurrentPage() {
    let currentPage = 'index';

    if (sessionStorage.getItem('currentPage')) {
        currentPage = sessionStorage.getItem('currentPage');
    } else {
        sessionStorage.setItem('currentPage', 'index');
    }

    return currentPage;
}

function updateCurrentPageSession(currentPage) {
    sessionStorage.setItem('currentPage', currentPage);
}

function swapPage(firstPage, secondPage) {
    let currentPage = getCurrentPage();

    if (currentPage === firstPage) {
        currentPage = secondPage;
        updateCurrentPageSession(secondPage);
    } else {
        currentPage = firstPage;
        updateCurrentPageSession(firstPage);
    }

    window.location.href = `/${currentPage}.html`;
}