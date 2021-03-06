var _counterSuccess = 0;
var _counterFail = 0;
var _calculationType = "M";
var _numberSpace = 10;
var _computeTask;

function start() {
    document.getElementById("txtNumberSpace").value = _numberSpace;
    showSettings();
}
function init(calculationType,numberSpace){
    setCalculationType(calculationType);
    setNumberSpace(numberSpace);
    closeSettings();
    generateComputeTask();
    displayComputeTask(_computeTask);
}

function getRandomNumber(){
    var randomNumber = Math.floor((Math.random() * _numberSpace)+1);
    return randomNumber;   
}

function generateComputeTask(){

    
    

    

    switch (_calculationType) {
        case 'MI':
           
            do {
                _computeTask = getRandomNumbers();
            }
            while (checkMinus(_computeTask.firstNumber,_computeTask.secondNumber) == false);
            break;
        case 'D':
            do {
                _computeTask = getRandomNumbers();
            }
            while (checkDivision(_computeTask.firstNumber,_computeTask.secondNumber) == false);
            break;
        default:
            _computeTask = getRandomNumbers();
            break;
    }
}

function getRandomNumbers() {
    var randomNumbersContainer = new computeTaskContainer();
    randomNumbersContainer.firstNumber = getRandomNumber();
    randomNumbersContainer.secondNumber = getRandomNumber();
    return randomNumbersContainer;
}

function displayComputeTask(computeTask){
       
    document.getElementById("txtFirstNumber").innerText = computeTask.firstNumber;
    document.getElementById("txtSecondNumber").innerText = computeTask.secondNumber; 

    var calcSymbolDiv = document.getElementById('calcSymbolDiv');

    var numberOfChilds = calcSymbolDiv.childNodes.length;

    while (calcSymbolDiv.firstChild) {
    calcSymbolDiv.removeChild(calcSymbolDiv.firstChild);
    }
    
    var calcSymbol = document.createElement('i');
    calcSymbol.setAttribute('id','calcSymbol');
    calcSymbol.setAttribute('style','font-size:24px;vertical-align:middle');

    calcSymbolDiv.appendChild(calcSymbol);

    switch (_calculationType) {
        case 'M':
            calcSymbol.setAttribute('class','fa fa-circle');
            break;
        case 'A':
            calcSymbol.setAttribute('class','fa fa-plus');
            break;
        case 'MI':
            calcSymbol.setAttribute('class','fa fa-minus');
            break;
        case 'D':
            calcSymbol.setAttribute('class','fa fa-circle');

            var lowerDot = document.createElement('i');
            lowerDot.setAttribute('class','fa fa-circle');
            lowerDot.setAttribute('style','font-size:24px;vertical-align:middle');

            var br = document.createElement('br');

            calcSymbolDiv.appendChild(br);
            calcSymbolDiv.appendChild(lowerDot);
            
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
    result.computeTaskDisplay = result.computeTaskDisplay + userResult;
    
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
    resultListItemElement.innerText = result.computeTaskDisplay;
    
    resultsListElement.insertBefore(resultListItemElement, resultsListElement.childNodes[0]);  
    
    generateComputeTask();
    displayComputeTask(_computeTask);
}

function getResult(){
    var firstNumber = document.getElementById("txtFirstNumber").innerText; 
    var secondNumber = document.getElementById("txtSecondNumber").innerText;
    var result = new resultContainer();
    
    switch (_calculationType) {
        case 'M':
            result.result = firstNumber * secondNumber;
            result.computeTaskDisplay = firstNumber + " * " + secondNumber + " = ";
            break;
        case 'A':
             result.result = parseInt(firstNumber) + parseInt(secondNumber);
             result.computeTaskDisplay = firstNumber + " + " + secondNumber + " = ";
            break;
        case 'MI':
             result.result = parseInt(firstNumber) - parseInt(secondNumber);
             result.computeTaskDisplay = firstNumber + " - " + secondNumber + " = ";
            break;
        case 'D':
             result.result = parseInt(firstNumber) / parseInt(secondNumber);
             result.computeTaskDisplay = firstNumber + " : " + secondNumber + " = ";
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
        computeTaskValid = false;
    }

    return computeTaskValid;
}

function checkDivision(firstNumber,secondNumber){
    var computeTaskValid = true;
    
    if (firstNumber < secondNumber) {
        computeTaskValid = false;
    }
    
    if ((firstNumber % secondNumber) !== 0) {
        computeTaskValid = false;
    }     

    if (secondNumber > 10 ) {
        computeTaskValid = false;
    }

    return computeTaskValid;
}


var resultContainer = function(){
    this.result;
    this.computeTaskDisplay;
    this.success;
}

var computeTaskContainer = function(){
    this.firstNumber;
    this.secondNumber;
}