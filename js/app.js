var _counterSuccess = 0;
var _counterFail = 0;
var _calculationType = "M";
var _numberSpace = 10;

function start() {
    document.getElementById("txtNumberSpace").value = _numberSpace;
    showSettings();
}
function init(calculationType,numberSpace){
    setCalculationType(calculationType);
    setNumberSpace(numberSpace);
    closeSettings();
    generateComputeTask();
}

function getRandomNumber(){
    var randomNumber = Math.floor((Math.random() * _numberSpace)+1);
    return randomNumber;   
}

function generateComputeTask(){
    var firstNumber = getRandomNumber();
    var secondNumber = getRandomNumber();
   
    document.getElementById("txtFirstNumber").innerText = firstNumber;
    document.getElementById("txtSecondNumber").innerText = secondNumber; 
    
    var calcSymbol = document.getElementById("calcSymbol");

    var calcSymbolDiv = document.getElementById("calcSymbolDiv");
    
    switch (_calculationType) {
        
        case 'M':
            calcSymbol.setAttribute('class','fa fa-circle');
            break;
        case 'A':
            calcSymbol.setAttribute('class','fa fa-plus');
            break;
        case 'MI':
            checkMinus(firstNumber,secondNumber);
            calcSymbol.setAttribute('class','fa fa-minus');
            break;
        case 'D':
            checkDivision(firstNumber,secondNumber);
            calcSymbol.setAttribute('class','fa fa-ellipsis-v');
            break;
        default:
            break;
    }
    
    document.getElementById("txtUserResult").value = "";
    document.getElementById("txtUserResult").focus();
}

function showSuccess(){
    var result = getResult();
    var userResult = document.getElementById("txtUserResult").value;
    result.computeTask = result.computeTask + userResult;
    
    var resultsListElement = document.getElementById("furtherResultsList");
    
    var resultListItemElement = document.createElement("li");
    var classAttribute = document.createAttribute("class");
        
    if (result.result == userResult){
        classAttribute.value = "w3-green";
        _counterSuccess++;
        document.getElementById("counterSuccess").innerText = _counterSuccess;
    }
    else{
        classAttribute.value = "w3-red";
        _counterFail++;
        document.getElementById("counterFail").innerText = _counterFail;
    }
    
    resultListItemElement.setAttributeNode(classAttribute);
    resultListItemElement.innerText = result.computeTask;
    
    resultsListElement.insertBefore(resultListItemElement, resultsListElement.childNodes[0]);  
    
    generateComputeTask();
}

function getResult(){
    var firstNumber = document.getElementById("txtFirstNumber").innerText; 
    var secondNumber = document.getElementById("txtSecondNumber").innerText;
    var result = new resultContainer();
    
    switch (_calculationType) {
        case 'M':
            result.result = firstNumber * secondNumber;
            result.computeTask = firstNumber + " * " + secondNumber + " = ";
            break;
        case 'A':
             result.result = parseInt(firstNumber) + parseInt(secondNumber);
             result.computeTask = firstNumber + " + " + secondNumber + " = ";
            break;
        case 'MI':
             result.result = parseInt(firstNumber) - parseInt(secondNumber);
             result.computeTask = firstNumber + " - " + secondNumber + " = ";
            break;
        case 'D':
             result.result = parseInt(firstNumber) / parseInt(secondNumber);
             result.computeTask = firstNumber + " / " + secondNumber + " = ";
            break;
        default:
            break;
    }
    
    return result;
}

function showSettings(){
    document.getElementById("dlgSettings").style.display = "block";
}

function closeSettings() {
    document.getElementById("dlgSettings").style.display = "none";
}

function setCalculationType(calculationType) {
    _calculationType = calculationType;
}

function setNumberSpace(numberSpace) {
    _numberSpace = document.getElementById("txtNumberSpace").value;
}

function checkMinus(firstNumber,secondNumber){
    var computeTaskValid = true;
    
    var result = firstNumber - secondNumber;

    if (result < 0) {
        generateComputeTask();
    }

    return computeTaskValid;
}

function checkDivision(firstNumber,secondNumber){
    var computeTaskValid = true;
    
    if (firstNumber < secondNumber) {
        generateComputeTask();
    }
    else{
        if ((firstNumber % secondNumber) !== 0) {
        generateComputeTask();
        }
    }

    

    return computeTaskValid;
}


var resultContainer = function(){
    this.result;
    this.computeTask;
    this.success;
}