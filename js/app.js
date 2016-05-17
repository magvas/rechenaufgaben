var counterSuccess = 0;
var counterFail = 0;

function getRandomNumber(){
    var randomNumber = Math.floor((Math.random() * 10)+1);
    
    return randomNumber;   
}

function generateComputeTask(){
    var firstNumber = getRandomNumber();
    var secondNumber = getRandomNumber();
   
    document.getElementById("txtFirstNumber").innerText = firstNumber;
    document.getElementById("txtSecondNumber").innerText = secondNumber; 
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
        counterSuccess++;
        document.getElementById("counterSuccess").innerText = counterSuccess;
    }
    else{
        classAttribute.value = "w3-red";
        counterFail++;
        document.getElementById("counterFail").innerText = counterFail;
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
    result.result = firstNumber * secondNumber;
    result.computeTask = firstNumber + " * " + secondNumber + " = ";
    return result;
}

function showSettings(){
    document.getElementById("dlgSettings").style.display = "block";
}

function closeSettings() {
    document.getElementById("dlgSettings").style.display = "none";
}

var resultContainer = function(){
    this.result;
    this.computeTask;
    this.success;
}