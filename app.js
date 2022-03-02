//Listen for submit event
const loanForm = document.getElementById('loan-form');

loanForm.addEventListener('submit', function(e) {
    //hide results
    document.getElementById('results').style.display = 'none';

    //show loader gif
    document.getElementById('loading').style.display = 'block';

    //remove loader gif
    setTimeout(calculateResults,1000);

    


    e.preventDefault();
});


//Calculate results
function calculateResults() {
    //UI Vars
    const loaneeName = document.getElementById('loanee');
    const loanAmount = document.getElementById('amount');
    const interest = document.getElementById('interest');
    const years = document.getElementById('years');
    //UI Vars
    const finalName = document.getElementById('loanee-name');
    const monthlyPayment = document.getElementById('monthly-payment');
    const totalPayment = document.getElementById('total-payment');
    const totalInterest = document.getElementById('total-interest');


    const principal = parseFloat(loanAmount.value);
    const calculatedInterest = parseFloat(interest.value)/ 100/ 12;
    const calculatedPayements = parseFloat(years.value) * 12;
    
    //compute monthly payment
    const x = Math.pow(1 + calculatedInterest, calculatedPayements);
    const monthly = (principal* x * calculatedInterest)/(x - 1);

    if(isFinite(monthly)) {
        console.log(loaneeName.value);
        console.log(finalName.value);
        finalName.value = loaneeName.value.toString();
        console.log(finalName.value.toString());
        monthlyPayment.value = monthly.toFixed(2);
        totalPayment.value = (monthly * calculatedPayements).toFixed(2);
        totalInterest.value = ((monthly * calculatedPayements) - principal).toFixed(2);

        //show results
        document.getElementById('results').style.display = 'block';

        //remove loader gif
        document.getElementById('loading').style.display = 'none';

    } else {
        
        showError('Please check your numbers');
    }
}

function showError(error) {

    //remove loader gif
    document.getElementById('loading').style.display = 'none';
    //remove results
    document.getElementById('results').style.display = 'none';


    //create error div
    const errorDiv = document.createElement('div');

    const card = document.querySelector('.card');
    const heading = document.querySelector('.main-heading');

    //add class to error div
    errorDiv.className = 'alert alert-danger';
    //add error message to errorDiv
    errorDiv.appendChild(document.createTextNode(error));

    card.insertBefore(errorDiv,heading);

    setTimeout(clearError,2000);

    //Clear Error
function clearError() {
    document.querySelector('.alert').remove();
};

}

