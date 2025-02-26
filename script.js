const dayInput = document.getElementById("day");
const monthInput = document.getElementById("month");
const yearInput = document.getElementById("year");


const btn = document.querySelector("button");

const error = document.getElementsByClassName("errors");
const dates = document.getElementsByClassName("dates");


function validDate(day, month, year, currentDate) {
    const futureDate = (year > currentDate.getFullYear() || (year == currentDate.getFullYear() && month > currentDate.getMonth() + 1) || (year == currentDate.getFullYear() && month == currentDate.getMonth() + 1 && day > currentDate.getDate()))? true : false;
    const monthDays = new Date(year, month, 0).getDate();
    // Day Validation:
    if(day === "") {
        error[0].innerHTML = "This field is required";
        dayInput.classList.add("error-border");
        dayInput.previousElementSibling.classList.add("error");
    }
    else if ((day > monthDays || day < 1) || isNaN(day)) {
        error[0].innerHTML = "Must be a valid day";
        dayInput.classList.add("error-border");
        dayInput.previousElementSibling.classList.add("error");
    } 
    else {
        error[0].innerHTML = "";
        dayInput.classList.remove("error-border");
        dayInput.previousElementSibling.classList.remove("error");
    }

    // Month Validation:
    if(month === "") {
        error[1].innerHTML = "This field is required";
        monthInput.classList.add("error-border");
        monthInput.previousElementSibling.classList.add("error");
    } 
    else if((month > 12 || month <= 0) || isNaN(month)) {
        error[1].innerHTML = "Must be a valid month";
        monthInput.classList.add("error-border");
        monthInput.previousElementSibling.classList.add("error");
    }
    else {
        error[1].innerHTML = "";
        monthInput.classList.remove("error-border");
        monthInput.previousElementSibling.classList.remove("error");
    }


    // Year Validation:
    if(year === "") {
        error[2].innerHTML = "This field is required";
        yearInput.classList.add("error-border");
        yearInput.previousElementSibling.classList.add("error");
    } 
    else if(futureDate) {
        error[2].innerHTML = "Must be in the past";
        yearInput.classList.add("error-border");
        yearInput.previousElementSibling.classList.add("error");
    }
    else if(isNaN(year) || year < 100) {
        error[2].innerHTML = "Must be a valid year";
        yearInput.classList.add("error-border");
        yearInput.previousElementSibling.classList.add("error");
    }
    else {
        error[2].innerHTML = "";
        yearInput.classList.remove("error-border");
        yearInput.previousElementSibling.classList.remove("error");
    }


    if(day == "" || month == "" || year == "" ||  day > 31 || month > 12 || futureDate)
        return false;
    else
        return true;
}

function ageCalculate(date, currentDate) {
    let years = currentDate.getFullYear() - date.getFullYear();
    let months = currentDate.getMonth() - date.getMonth();
    let days = currentDate.getDate() - date.getDate();
  
    if(months < 0 || (months == 0 && days < 0)) {
        years--;
        months += 12;
    }

    if(days < 0) {
        const lastDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0).getDate();
        days += lastDayOfMonth;
        months--;
    }

    return {"years": years, "months": months, "days": days}
}

function animateValue(obj, number, interval = number > 100? 10 : 100) {
    let counter = 0;


    const yearsInterval = setInterval(()=>{

        if(obj.innerHTML == number) {
            clearInterval(yearsInterval);
        }
        else {
        obj.innerHTML = counter == number ? number : counter++;
        }
    }, interval)
}

btn.addEventListener("click", () => {
    const day = Number(dayInput.value);
    const month = Number(monthInput.value);
    const year = Number(yearInput.value);
    const currentDate = new Date();

    if(validDate(day, month, year, currentDate)){
        const date = new Date(year, month - 1, day);
        const age =  ageCalculate(date, currentDate);
        animateValue(dates[0], age.years)
        animateValue(dates[1], age.months)
        animateValue(dates[2], age.days)
    }
});


