var _counterSuccess = 0;
var _counterFail = 0;
var _calculationType = "M";

function getRandomNumber(){
    var randomNumber = Math.floor((Math.random() * 10)+1);
    
    return randomNumber;   
}

function generateComputeTask(){
    var firstNumber = getRandomNumber();
    var secondNumber = getRandomNumber();
   
    document.getElementById("txtFirstNumber").innerText = firstNumber;
    document.getElementById("txtSecondNumber").innerText = secondNumber; 
    
    var calcSymbol = document.getElementById("calcSymbol");
    
    switch (_calculationType) {
        
        case 'M':
            document.getElementById("calcSymbolMultiplication").style.visibility = "visible";
            document.getElementById("calcSymbolAddition").style.visibility = "hidden";
            break;
        case 'A':
            document.getElementById("calcSymbolAddition").style.visibility = "visible";
            document.getElementById("calcSymbolMultiplication").style.visibility = "hidden";
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
    closeSettings();
    generateComputeTask();
}
var resultContainer = function(){
    this.result;
    this.computeTask;
    this.success;
}