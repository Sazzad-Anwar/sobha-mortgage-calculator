let $ = (tag) => {
    return document.querySelector(tag);
}

let totalAmountWithInterest = 0;

let inputRange = (id, renderingTextId, amount) => {
    $(`#${id}`).addEventListener('change', () => {
        if (id === 'ryx__propertyPriceRange') {
            $(`#${renderingTextId}`).innerText = convertIntToMoney($(`#${id}`).value);
        } else {
            $(`#${renderingTextId}`).innerText = ($(`#${id}`).value);
        }
        amount = parseInt($(`#${id}`).value);
    })
}

let convertIntToMoney = (money) => {
    let string = money.toString().split('')
    string = string.reverse()
    if (string.length >= 7) {
        string.splice(6, 0, ',')
        string.splice(3, 0, ',')
    } else {
        string.splice(3, 0, ',')
    }
    return string.reverse().join('')
}

let price = 790000;
let downPayment = 10;
let years = 1;
let interestRate = 2;
$('#ryx__propertyPriceRange').value = price;
$('#ryx__downPaymentPercentRange').value = downPayment;
$('#ryx__loanDurationRange').value = years;
$('#ryx__interestRateRange').value = interestRate;
$('#ryx__percentage').innerText = downPayment;
$('#ryx__loanDuration').innerText = years;
$('#ryx__interestRate').innerText = interestRate;
$('#ryx__price').innerText = convertIntToMoney(price)
$('.ryx__years').innerText = 'Year';

inputRange('ryx__propertyPriceRange', 'ryx__price', price)
inputRange('ryx__downPaymentPercentRange', 'ryx__percentage', downPayment)
inputRange('ryx__loanDurationRange', 'ryx__loanDuration', years)
inputRange('ryx__interestRateRange', 'ryx__interestRate', interestRate)
