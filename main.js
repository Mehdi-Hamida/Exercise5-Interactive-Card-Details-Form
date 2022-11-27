const form = document.querySelector('#credit-card-form'); //The form element

let allInputs = document.querySelectorAll('input'); //Every input

let cardDateBlankText = document.querySelector('#card-date-blank');

let cardDateLetterText = document.querySelector('#card-date-letters');

let wrongFormatText = document.querySelectorAll('.wrong-format-text');

const anyNumber = new RegExp('[0-9]*$');

const cardNumbers = new RegExp('[0-9]{4} [0-9]{4} [0-9]{4} [0-9]{4}|[0-9]{4}[0-9]{4}[0-9]{4}[0-9]{4}'); //Accepts CC number with or without spaces between

const twoNumbers = new RegExp('[0-9]{2}');

const threeNumbers = new RegExp('[0-9]{3}');

let monthInputValue = document.querySelector('#month');

let fullDate = new Date(); //Instantiates the JS native Date() object

let actualMonth = fullDate.getMonth(); //January equals to 0 & December equals to 11

let actualYear = fullDate.getFullYear(); //In 2022, returns 2022
let last2Chars = String(actualYear).slice(-2); //Converts number 2022 as a string to keep only the two last chars (22)
let last2NumFromYear = Number(last2Chars); //Converts string "22" to a number to use it

let creditCardTexts = document.querySelectorAll('.credit-card-texts');

let validity = false; //If true = Every verification condition is valid

/* --------- FUNCTION THAT WRITES FORM INFORMATIONS ON CREDIT CARD --------- */

form.addEventListener("input", function writeOnCreditCard()
{
    creditCardTexts[1].innerHTML = allInputs[0].value; //name field
    creditCardTexts[0].innerHTML = allInputs[1].value; //CC Number field
    creditCardTexts[2].innerHTML = allInputs[2].value; //Month field
    creditCardTexts[3].innerHTML = allInputs[3].value; //Year field
    creditCardTexts[4].innerHTML = allInputs[4].value; //CVC field
});

/* --------- CHECKS PATTERN OF NAME FIELD --------- */
// function checkPattern()
// const nameFieldRegex = nameField.getAttribute("pattern");

allInputs[0].addEventListener("change", function checkPattern()
{
    const nameField = document.querySelector("input#name");
    const nameFieldRegex = new RegExp("^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$");

    if (allInputs[0].value !== "" && nameFieldRegex.test(nameField.value) === false)
    {
        wrongFormatText[0].classList.add('error');
    }

    if (nameFieldRegex.test(nameField.value) === true)
    {
        console.log("jsp");
        wrongFormatText[0].classList.remove('error');
        return;
    }

    else if (nameFieldRegex.test(nameField.value) === false)
    {
        console.log("Marche pas");
        allInputs[0].classList.add('error');
        allInputs[0].nextElementSibling.classList.remove('error');
        wrongFormatText[0].classList.add('error');
    }
});

// allInputs[0].addEventListener("input", checkPattern()
// {
//     // if (nameFieldRegex.test(nameField.value))
    
// });


// document.querySelectorAll('input[type="number"]').forEach(input =>
//     {
//         input.oninput = () =>
//         {
//             if (input.value.length > input.maxLength) input.value = input.value.slice(0, input.maxLength);
//         };
//     });

/* ---------- CHECKS EMPTY FIELDS & ADDS OR REMOVES ERROR CLASS ----------- */
document.addEventListener("change", function checkBlankFields()
{
    for (let i = 0; i < allInputs.length; i++)
    {
        if (allInputs[i].value !== "") //Removing classes first because once some fields are full, if i delete their content, the function doesn't makes the blank field's check
        {
            // allInputs[0].classList.remove('error');
            allInputs[0].nextElementSibling.classList.remove('error');
            wrongFormatText[0].classList.remove('error');
            // allInputs[1].classList.remove('error'); //Empêche de laisser la classe error sur le champ card number lors de la fonction suivante, puisque si il contient une lettre (oniput) mais qu'il est pas vide (change), ca enlève la classe dès qu'on change de champ malgré la présence de lettre
            allInputs[1].nextElementSibling.classList.remove('error');
            allInputs[2].classList.remove('error');
            cardDateBlankText.classList.remove('error');
            allInputs[3].classList.remove('error');
            allInputs[4].classList.remove('error');
            allInputs[4].nextElementSibling.classList.remove('error');
            // validity = true;
        }
        
        //Name
        if (allInputs[0].value == "")
        {
            allInputs[0].classList.add('error');
            allInputs[0].nextElementSibling.classList.add('error');
            validity = false;
        }
        
        //Card Number
        if (allInputs[1].value == "")
        {
            allInputs[1].classList.add('error');
            allInputs[1].nextElementSibling.classList.add('error');
            wrongFormatText[1].classList.remove('error');
            validity = false;
        }

        //Month
        if (allInputs[2].value == "")
        {
            allInputs[2].classList.add('error');
            cardDateBlankText.classList.add('error');
            validity = false;
        }

        //Year
        if (allInputs[3].value == "")
        {
            allInputs[3].classList.add('error');
            cardDateBlankText.classList.add('error');
            validity = false;
        }

        //CVC
        if (allInputs[4].value == "")
        {
            allInputs[4].classList.add('error');
            allInputs[4].nextElementSibling.classList.add('error');
            validity = false;
        }
    }
});

/* --------- FUNCTION THAT VERIFIES PRESENCE OF LETTERS IN NUMERIC-ONLY FIELDS --------- */
const letterRegex = /[a-zA-Z]/i;

form.addEventListener("change", function lookForLetters()
{
    if (letterRegex.test(allInputs[1].value))
    {
        allInputs[1].classList.add('error');
        allInputs[1].nextElementSibling.classList.remove('error');
        wrongFormatText[1].classList.add('error');
        validity = false;
        console.log("Y'à une lettre");
    }
    else
    {
        allInputs[1].classList.remove('error');
        allInputs[1].nextElementSibling.classList.remove('error');
        wrongFormatText[1].classList.remove('error');
        validity = true;
        console.log("Pas de lettre");
    }

});

/* --------- DOESN'T SUBMITS THE FORM IF LETTER IN CARD NUMBER FIELD --------- */
// form.addEventListener("submit", function ifLetterDoesntSubmits(submit)
// function letterInCardNumberField()
// {
//     if (letterRegex.test(allInputs[1].value))
//     {
//         // submit.preventDefault();
//         return false;
//     }
// }

/* --------- FUNCTION THAT VERIFIES MONTH AND YEAR VALIDITY  --------- */
// let submitButton = document.querySelector('#submit-button');

// form.addEventListener("submit", function checkMonthValidity(submit)
// form.addEventListener('submit', (submit) =>
// form.addEventListener("submit", function checkMonthValidity(submit)
// function MonthYearValidity()
form.addEventListener("change", function checkMonthValidity()
{
    if (allInputs[2].valueAsNumber > 12 || allInputs[2].valueAsNumber < 1)
    {
        console.log("NON 1");
        allInputs[2].classList.add('error');
        validity = false;
    }

    if (allInputs[3].valueAsNumber < last2NumFromYear)
    {
        console.log("NON 2");
        allInputs[3].classList.add('error');
        validity = false;
    }

    if (allInputs[2].valueAsNumber < actualMonth + 1 && allInputs[3].valueAsNumber === last2NumFromYear || allInputs[2].valueAsNumber < actualMonth + 1 && allInputs[3].valueAsNumber < last2NumFromYear)
    {
        console.log("NON 3");
        allInputs[3].classList.add('error');
        validity = false;
    }

    else if (allInputs[2].valueAsNumber <= actualMonth + 1 && allInputs[3].valueAsNumber > last2NumFromYear || allInputs[2].valueAsNumber === actualMonth + 1 && allInputs[3].valueAsNumber === last2NumFromYear || allInputs[2].valueAsNumber >= actualMonth +1 && allInputs[2].valueAsNumber < 13 && allInputs[3].valueAsNumber >= last2NumFromYear)
    {
        console.log("OUI");
        allInputs[2].classList.remove('error');
        allInputs[3].classList.remove('error');
        validity = true;
    }

    // else
    // {
    //     submit.preventDefault();
    //     console.log("NOOOOOOOOOOOOOOOOOOOOOOOOON");
    //     return false;
    // }

    // if (allInputs[2].valueAsNumber < actualMonth + 1 && allInputs[3].valueAsNumber === last2NumFromYear) //If the input year is the actual year AND the input month is < to actualMonth then don't submit the form
    // {
    //     allInputs[2].classList.add('error');
    //     allInputs[3].classList.add('error');
    //     alert("Your Credit Card has expired");
    //     evt.preventDefault();
    //     return false;
    // }

    // if (allInputs[3].valueAsNumber < last2NumFromYear)
    // {
    //     allInputs[3].classList.add('error');
    //     alert("Your Credit Card has expired");
    //     evt.preventDefault();
    //     return false;
    // }

    // if (allInputs[2].valueAsNumber > 12)
    // {
    //     allInputs[2].classList.add('error');
    //     evt.preventDefault();
    //     return false;
    // }

    // else if (allInputs[2].valueAsNumber < actualMonth + 1 && allInputs[3].valueAsNumber > last2NumFromYear)
    // {
    //     allInputs[2].classList.remove('error');
    //     allInputs[3].classList.remove('error');
    // }
});

/* --------- FUNCTION THAT GETS HTML MAXLENGHT AND APPLIES IT TO INPUT TYPE="NUMBER"  --------- */
document.querySelectorAll('input[type="number"]').forEach(input =>
{
    input.oninput = () =>
    {
        if (input.value.length > input.maxLength) input.value = input.value.slice(0, input.maxLength);
    };
});

/* --------- FUNCTION THAT HIDES FORM PAGE AND DISPLAYS CONFIRMATION PAGE  --------- */
let formDisplay = document.querySelector('main.flex-center form');
let confirmationDisplay = document.querySelector('main .completed-state');
let confirmationPageButton = document.querySelector('#confirmation-page-button');

form.addEventListener("submit", function showConfirmationPage(submit)
{
    // if (!checkBlankFields() && lookForLetters() === true && !letterInCardNumberField() && MonthYearValidity() === true)
    if (validity === true)
    {
        submit.preventDefault();
        console.log("Tous les champs sont valides");
        formDisplay.classList.add('hidden');
        confirmationDisplay.classList.remove('hidden');
    }

    else
    {
        submit.preventDefault();
        console.log("Erreur dans un ou plusieurs champs");
        return false;
    }

    confirmationPageButton.addEventListener("click", function formRefresh()
    {
        form.submit()
        // formDisplay.classList.remove('hidden');
        // confirmationDisplay.classList.add('hidden');
        // document.getElementById('credit-card-form').reset();
    });
});

/* --------- FUNCTION THAT ALLOWS FORM'S REFRESHING ON CLICKING THE BUTTON FROM CONFIRMATION PAGE  --------- */
// function formRefresh()

