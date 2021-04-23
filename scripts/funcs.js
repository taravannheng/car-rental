function createCarEl(car) {
    const cardEl = $(`<div class="main__card card" id="${car.id}"></div>`);
    const cardImgEl = $(`<div class="card__img" style="background-image: url(${car.image})"></div>`);
    const cardTitleEl = $(`<h2 class="card__title"><span class="card__title-brand">${car.brand}</span> <span class="card__title-model">${car.model}</span> <span class="card__title-model-year">${car.modelYear}</span></h2>`);
    const cardDetailsEl = $(`
        <div class="card__details">
            <ul class="card__details-labels">
                <li class="card__details-labels-mileage">Mileage: </li>
                <li class="card__details-labels-fuel-type">Fuel Type: </li>
                <li class="card__details-labels-seat">Seats: </li>
                <li class="card__details-labels-price-per-day">Price Per Day: </li>
                <li class="card__details-labels-availability">Availability: </li>
            </ul>
            <ul class="card__details-texts">
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

    let cardButtonEl;

    if (car.availability === 'false') {
        cardButtonEl = $(`<button type="button" class="card__button card__button--unavailable button"><span class="button__text">Not Available</span></button>`);
    } else {
        cardButtonEl = $(`<button type="button" class="card__button button"><span class="button__text">Add to Cart</span></button>`);
    }

    cardEl.append(cardImgEl);
    cardEl.append(cardTitleEl);
    cardEl.append(cardDetailsEl);
    cardEl.append(cardDescriptionEl);
    cardEl.append(cardButtonEl);

    return cardEl;
}

function loadCars() {
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
}

function getButtonEl(el) {
    return el.hasClass('card__button') ? el : el.parent();
}

function isNotAvailableButton(el) {
    const button = getButtonEl(el);
    let status = false;

    button.hasClass('card__button--unavailable') ? status = true : status = false;

    return status;
}

function toggleButtonColor(el) {
    const buttonEl = getButtonEl(el);

    if (buttonEl.hasClass('card__button--added')) {
        buttonEl.removeClass('card__button--added');
    } else {
        buttonEl.addClass('card__button--added');
    }
}