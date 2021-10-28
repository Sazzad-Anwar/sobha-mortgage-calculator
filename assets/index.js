let price = 790000;
let downPaymentInPercent = 10;
let years = 1;
let interestRate = 2;
let lowestRegistrationFee = 2000;
let highestRegistrationFee = 4000;
let evaluationFee = 3500;
let vatInPercentage = 5;

let $ = (tag) => {
    return document.querySelector(tag);
}

let totalAmountWithInterest = 0;

let inputRange = (id, renderingTextId, amount) => {
    $(`#${id}`).addEventListener('change', () => {
        if (id === 'ryx__propertyPriceRange') {
            $(`#${renderingTextId}`).value = convertIntToMoney($(`#${id}`).value);
        } else {
            $(`#${renderingTextId}`).innerText = ($(`#${id}`).value);
        }
        amount = parseInt($(`#${id}`).value);
    })
}

let convertIntToMoney = (money) => {
    let string = (Math.round(money)).toString().split('')
    string = string.reverse()
    if (string.length >= 7) {
        string.splice(6, 0, ',')
        string.splice(3, 0, ',')
    } else {
        string.splice(3, 0, ',')
    }
    return string.reverse().join('')
}

let convertStringToMoney = (amount) => {
    return (amount.split('')).filter(ele => ele !== ',').join('')
}

$('#ryx__propertyPriceRange').value = price;
$('#ryx__downPaymentPercentRange').value = downPaymentInPercent;
$('#ryx__loanDurationRange').value = years;
$('#ryx__interestRateRange').value = interestRate;
$('#ryx__percentage').innerText = downPaymentInPercent;
$('#ryx__loanDuration').innerText = years;
$('#ryx__interestRate').innerText = interestRate;
$('#ryx__price').value = convertIntToMoney(price)
$('.ryx__years').innerText = 'Year';
$(`#downPayment`).innerText = convertIntToMoney((parseInt($('#ryx__propertyPriceRange').value) * parseInt($('#ryx__downPaymentPercentRange').value)) / 100);

window.addEventListener('change', () => {
    monthlyPayment()
})

document.getElementById('ryx__price').addEventListener('focusout', (e) => {
    e.preventDefault()
    if (!isNaN(convertStringToMoney(e.target.value))) {
        $('#ryx__propertyPriceRange').value = convertStringToMoney(e.target.value)
        e.target.value = convertIntToMoney(convertStringToMoney(e.target.value))
        monthlyPayment()
    } else if (isNaN((e.target.value))) {
        alert('Property Price is not a number ! Please type correctly !')
        $('#ryx__propertyPriceRange').value = price
        e.target.value = convertIntToMoney(price)
        monthlyPayment()
    }
})

$('#ryx__price').addEventListener('change', (e) => {
    e.preventDefault();

    if (!isNaN(e.target.value)) {
        e.target.value = (e.target.value) < 790000 ? 790000 : e.target.value;
        monthlyPayment()

    } else if (isNaN(parseInt(e.target.value))) {
        e.target.value = 790000;
    }
})

function addData(chart, data) {

    console.log(chart, data);

    chart.data.datasets.forEach((dataset) => {
        dataset.data = data;
    });
    chart.update();
}

var ctx = document.getElementById("myChart").getContext('2d');

let myChart = new Chart(ctx, {
    type: 'doughnut',
    data: {
        labels: [
            'PRINCIPLE',
            'INTEREST',
        ],
        datasets: [{
            label: 'My First Dataset',
            data: [(parseInt($('#ryx__propertyPriceRange').value)) - (parseInt($('#ryx__propertyPriceRange').value) * parseInt($('#ryx__downPaymentPercentRange').value)) / 100, (((parseInt($('#ryx__propertyPriceRange').value)) - (parseInt($('#ryx__propertyPriceRange').value) * parseInt($('#ryx__downPaymentPercentRange').value)) / 100) * (parseInt($('#ryx__interestRateRange').value) / 100) / 12)],
            backgroundColor: [
                'rgb(208, 166, 22)',
                'rgba(216, 216, 216,.92)',
            ],
            borderColor: [
                'rgb(208, 166, 22)',
                'rgba(216, 216, 216,.92)',
            ],
            hoverOffset: 4,
        }]
    },
    options: {
        layout: {
            padding: 20
        }
    }

})



function monthlyPayment() {
    let downPaymentAmount = (parseInt($('#ryx__propertyPriceRange').value) * parseInt($('#ryx__downPaymentPercentRange').value)) / 100
    $(`#downPayment`).innerText = convertIntToMoney(downPaymentAmount);

    let principleAmount = (parseInt($('#ryx__propertyPriceRange').value)) - downPaymentAmount;
    let years = (parseInt($('#ryx__loanDurationRange').value)) * 12;
    let interestRate = (parseInt($('#ryx__interestRateRange').value) / 100) / 12;

    let monthlyPayment = parseInt((principleAmount * (interestRate * (Math.pow((1 + interestRate), years)))) / ((Math.pow((1 + interestRate), years) - 1)))

    $('#monthlyPayment').innerText = convertIntToMoney(monthlyPayment)
    $('#monthlyAED').innerText = convertIntToMoney(monthlyPayment)
    $('#landFee').innerText = convertIntToMoney(((parseInt($('#ryx__propertyPriceRange').value)) * (4 / 100)) + 580)
    $('#registrationFee').innerText = (parseInt($('#ryx__propertyPriceRange').value)) > 500000 ? convertIntToMoney(highestRegistrationFee + (highestRegistrationFee * (vatInPercentage / 100))) : convertIntToMoney(lowestRegistrationFee + (lowestRegistrationFee * (vatInPercentage / 100)))
    $('#mortgageRegistrationFee').innerText = convertIntToMoney((principleAmount * (.25 / 100)) + 10);
    $('#evaluationFee').innerText = evaluationFee + (evaluationFee * (vatInPercentage / 100));

    addData(myChart, [principleAmount, (principleAmount * interestRate)])

}

monthlyPayment()


inputRange('ryx__propertyPriceRange', 'ryx__price', price)
inputRange('ryx__downPaymentPercentRange', 'ryx__percentage', downPaymentInPercent)
inputRange('ryx__loanDurationRange', 'ryx__loanDuration', years)
inputRange('ryx__interestRateRange', 'ryx__interestRate', interestRate)


