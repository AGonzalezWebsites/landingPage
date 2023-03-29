//To do List:
//Add date to List
//Click to change budget
//Local Storage functionality - started at bottom of page
//Delete All Button for list items

var form = document.getElementById('addForm');
var itemList = document.getElementById('items');
var priority = document.getElementById('priority');
var filter = document.getElementById('filter');
var budget = document.getElementById('addBudget');
var budgetContainer = document.getElementById('budgetContainer');
var changeBudgetTrigger = document.getElementById('changeBudget');
var newSessionTrigger = document.getElementById('newSession');
var expensesTotal = document.getElementById('expensesTotal');
var leftOver = document.getElementById('budgetDifference');
var minimizeToggle = document.getElementById('minimizeToggle1A');
var minimizeToggle2 = document.getElementById('minimizeToggle1B');


//Clear Local Storage
newSessionTrigger.addEventListener('click', newSession)
//Set Budget event
submitBudget.addEventListener('click', setBudget)
//Change Budget event
changeBudgetTrigger.addEventListener('click', changeBudget)
// Form Submit Event
form.addEventListener('submit', addItem);
// Delete event
itemList.addEventListener('click', removeItem)
// change status event
itemList.addEventListener('click', changeStatus)
// change status event
itemList.addEventListener('click', changeOrder)
// Filter Event
filter.addEventListener('click', filterItems);
// minimize maximize Event
minimizeToggle.addEventListener('click', minimizeToggleItems);
minimizeToggle2.addEventListener('click', minimizeToggleItems);


// Set Budget
function setBudget(e) {
    e.preventDefault();
    budgetAmount = document.getElementById('budget').value;
    budgetAmount = budgetAmount.replace(/,/g, "").replace(/\$/g, '');
    localStorage.setItem('budget', budgetAmount);
    budgetElement = document.createElement('h1')
    budgetElement.className = 'order-1 badge badge-light text-wrap';
    budgetElement.innerHTML = 'Budget:<br>$'+budgetAmount;
    budgetElement.setAttribute('id', 'budgetTotal')
    budgetContainer.appendChild(budgetElement)
    submitBudget.style.display = "none";
    document.getElementById('budget').style.display = 'none';
    document.getElementById('addBudget').style.display = 'none';
    expensesTotal.style.display = 'inline-block';
    document.querySelector('.budgetButtonContainer').style.display = 'flex';
    document.getElementById('submitActivityContainer').style.display = 'block';
    document.getElementById('budgetDifference').style.display = 'inline-block';
    document.querySelector('.fa-minus-square').style.fontSize = '25px';
    calculateExpenses();
}

// Change Budget
function changeBudget(e){
    budgetElement.style.display = 'none';
    submitBudget.style.display = "block";
    document.getElementById('budget').style.display = 'block';
    document.getElementById('addBudget').style.display = 'block';
    document.getElementById('addBudget').classList.remove('justify-content-center')
    document.getElementById('addBudget').classList.add('justify-content-end')
}

function newSession(e){

    if(confirm('Are you sure?')){
        localStorage.clear();
        location.reload();
    }
}

// Set total expenses
var expensesTotalAmount;
function calculateExpenses(){
    // Get lis
    var items = itemList.getElementsByTagName('li');
    expensesTotalAmount = 0;

    // Convert to an array
    Array.from(items); 
    
    for(i=0; i < items.length; i++){
        expensesTotalAmount += items[i].value;
    }
    expensesTotal.children[0].innerHTML = 'Expenses:<br>$'+expensesTotalAmount;
    budgetBar();
}

// Set total expenses
var leftOverAmount = 0;
var budgetBar;
function budgetBar(){   
    //document.getElementById('budgetTotal');
    
    leftOverAmount = budgetAmount - expensesTotalAmount;
    leftOver.children[0].innerHTML = 'Balance:<br>$'+leftOverAmount;
    leftOverPercentage();
}

// find left over percentage
var percentageLeftOver;
var percentageUsed;
function leftOverPercentage () {
    percentageUsed = (expensesTotalAmount * 100) / budgetAmount;
    percentageLeftOver = (percentageUsed - 100) * -1;

    //Apply to left over bar
    for (let i=100; i>percentageLeftOver; i--) {
                var budgetBar = document.getElementById('budgetBar');
                budgetBar.style.width = i+'%';
    }  

    //Apply to expenses bar
    for (let e=0; e<percentageUsed; e++) {
        var expenseBar = document.getElementById('expenseBar');
        expenseBar.style.width = e+'%';
        
        if(e>100) {
            expenseBar.style.width = 100+'%';
        }

    }  

}

// Used for local storage in this function
if (localStorage.expensesAddedAmount > 0 && localStorage.expensesAddedAmount != 0){
    var itemAddedAmount = localStorage.expensesAddedAmount;
} else {
    var itemAddedAmount = 0;
}
// Add item
function addItem(e){
    e.preventDefault();

    // Get input name
    var newPayment = document.getElementById('item').value;

    // Create li for new item
    var li = document.createElement('li');
    // Add Class
    li.className = 'list-group-item';
    
    // assign background color based off priority level selected
    prioritySelected = priority[priority.value - 1].innerHTML;
    if(priority.value - 1 === 0){
        selectedBtnColor = 'btn-success';
    } else if(priority.value - 1 === 1) {
        selectedBtnColor = 'btn-warning';
    } else {
        selectedBtnColor = 'btn-danger';
    }
    priorityButton = '<span type=\"button\" class=\"badge text-wrap p-2 mr-2 float-left status ' +selectedBtnColor+ '\">'+prioritySelected+'</span>'+newPayment;
    // Add priority + text node with input value
    li.innerHTML = li.innerHTML+priorityButton;
    
    //create del button element
    var deleteBtn = document.createElement('i');
    // Add classes to delete button
    deleteBtn.className = 'far fa-trash-alt btn btn-danger btn-sm float-right delete';
    //Append button to li
    li.appendChild(deleteBtn);
    
    //get Amount value
    var newAmount = document.getElementById('amount').value;
    newAmount = newAmount.replace(/,/g, "").replace(/\$/g, '');
    // create div to be inserted
    newAmountInsert = document.createElement('div');
    //add amount value to div
    newAmountInsert.innerHTML = '$'+newAmount;
    // Add class to amount item
    newAmountInsert.className = 'badge text-wrap p-2 mr-2 float-left';
    // Add ID to amount item
    newAmountInsert.setAttribute("id", "itemAmount");
    //Append amount to li
    li.appendChild(newAmountInsert);
    //add amount value to li
    li.value = newAmount;
    li.style.border = '1px inset silver';
    li.draggable = "true";
    li.ondragover = "dragOver(event)";
    li.ondragstart = "dragStart(event)";

    document.getElementById('amount').value = "";
    //Append li to list
    itemList.appendChild(li);
    
    //Array setup for local Storage
    var expensesArray = [newPayment, newAmount, selectedBtnColor, prioritySelected];
    //Local Storage Setup for expenses
    localStorage.setItem('localExpenses'+[itemAddedAmount], JSON.stringify(expensesArray));
    itemAddedAmount++
    localStorage.setItem('expensesAddedAmount', itemAddedAmount);

    //delete inner contents of activity adder
    document.getElementById('item').value = "";
    document.getElementById('item').placeholder = "Next payment For?";

    // Display Block for container - meant for first input
    document.getElementById('ActivityContainer').style.display = 'block';
    calculateExpenses();
}

// change status
function changeStatus(e){
    if (e.target.classList.contains('status')){
        if(e.target.classList.contains('btn-success')){
            e.target.classList.remove('btn-success');
            e.target.classList = e.target.classList+' btn-warning';
            e.target.innerHTML = "Pending";
        } else if(e.target.classList.contains('btn-warning')){
            e.target.classList.remove('btn-warning');
            e.target.classList = e.target.classList+' btn-danger';
            e.target.innerHTML = "Unpaid";
        } else {
            e.target.classList.remove('btn-danger');
            e.target.classList = e.target.classList+' btn-success';
            e.target.innerHTML = "Paid";
        }

    }
}

// remove item
function removeItem(e){
    if (e.target.classList.contains('delete')){
        var targetToString = ["Hi", e.target.previousSibling.textContent];
        
        console.log(e.target.previousSibling.textContent)



        if(confirm('Are you sure?')){
            var li = e.target.parentElement;
            itemList.removeChild(li);

            itemAddedAmount--
            for(var i=0; localStorage.expensesAddedAmount > i; i++) {
                grabbedItem =  JSON. parse(localStorage.getItem('localExpenses'+i));
    
                if (grabbedItem[0] == e.target.previousSibling.textContent) {
                    console.log(e.target.previousSibling.textContent+" Matched "+grabbedItem[0])
                    console.log(grabbedItem);
                    localStorage.removeItem(grabbedItem);
                } else {
                    console.log(e.target.previousSibling.textContent+" Did not Match "+grabbedItem[0])
                }
            } 
            localStorage.expensesAddedAmount--
        }        
        calculateExpenses()
    }

}

// change list order
function changeOrder(e){
    if (e.target.classList.contains('list-group-item')){
        var selectedItem = e.target;
        selectedItem.style.border = '2px dotted yellow';
        setTimeout(function(){selectedItem.style.border = '1px inset silver';}, 4000);
    }
}

// Filter Items based off importance
function filterItems(e){
    // convert text to lowercase
    var text = e.target.value.toLowerCase();
    // Get lis
    var items = itemList.getElementsByTagName('li');
    // Convert to an array
    Array.from(items).forEach(function(item){
        var itemName = item.firstChild.textContent;
        if(e.target.value == "All") {
            item.style.display = 'block';
        } else if(itemName.toLowerCase().indexOf(text) != -1){
            item.style.display = 'block';
            console.log(itemName.toLowerCase().indexOf(text));
        } else {
            item.style.display = 'none';
            console.log(itemName.toLowerCase().indexOf(text));
        }
    });
}

// Arrange Items
var _el;
function dragOver(e) {
    console.log('dragOver Beg '+e.target);
  if (isBefore(_el, e.target))
    e.target.parentNode.insertBefore(_el, e.target);
  else
    e.target.parentNode.insertBefore(_el, e.target.nextSibling);
}

function dragStart(e) {
    console.log('dragStart Beg '+e.target);
  e.dataTransfer.effectAllowed = "move";
  e.dataTransfer.setData("text/plain", null); // Thanks to bqlou for their comment.
  _el = e.target;
}

function isBefore(el1, el2) {
    console.log('isBefore Beg '+e.target);
  if (el2.parentNode === el1.parentNode)
    for (var cur = el1.previousSibling; cur && cur.nodeType !== 9; cur = cur.previousSibling)
      if (cur === el2)
        return true;
  return false;
}
var b = 0
var button = document.querySelector('.fa-minus-square');
var buttonMax = document.querySelector('.fa-plus-square');
function minimizeToggleItems(e){
    if (b == 0) {
    console.log(e.target)
    console.log(e.target.parentNode)
    console.log(leftOver.children[0]);
    document.querySelector('.budgetButtonContainer').style.display = 'none'
    e.target.parentNode.style.height = 'auto';
    button.style.fontSize = '0px';
    buttonMax.style.fontSize = '25px';
    leftOver.children[0].style.fontSize = '0px';
    expensesTotal.children[0].style.fontSize = '0px';
    b++
} else if (b == 1) {
    e.target.parentNode.style.height = 'auto';
    buttonMax.style.fontSize = '0px';
    button.style.fontSize = '25px';
    leftOver.children[0].style.fontSize = '15px';
    expensesTotal.children[0].style.fontSize = '15px';
    document.querySelector('.budgetButtonContainer').style.display = 'flex'
    b--
    }
}




//LOCAL STORAGE FUNCTIONALITY

//bypassing initial page if there was a budget stored
(function (){

    if (localStorage.getItem('budget') > -1) {
        console.log('there was data here');
        loadPreviousSession();
    } else {
        
    }

})()

function loadPreviousSession(){

        console.log('there was data here');
        budgetAmount = localStorage.getItem('budget');
        budgetAmount = budgetAmount.replace(/,/g, "").replace(/\$/g, '');
        budgetElement = document.createElement('h1')
        budgetElement.className = 'order-1 badge badge-light text-wrap';
        budgetElement.innerHTML = 'Budget:<br>$'+budgetAmount;
        budgetElement.setAttribute('id', 'budgetTotal')
        budgetContainer.appendChild(budgetElement)
        submitBudget.style.display = "none";
        document.getElementById('budget').style.display = 'none';
        document.getElementById('addBudget').style.display = 'none';
        expensesTotal.style.display = 'inline-block';
        document.querySelector('.budgetButtonContainer').style.display = 'flex';
        document.getElementById('submitActivityContainer').style.display = 'block';
        document.getElementById('budgetDifference').style.display = 'inline-block';
        document.querySelector('.fa-minus-square').style.fontSize = '25px';
        loadPreviousExpense();
}



function loadPreviousExpense(){
    if (localStorage.length > 1) {
        console.log('localStorage was greater than 1')
        for(var i=0; localStorage.expensesAddedAmount > i; i++) {
            grabbedItem =  JSON. parse(localStorage.getItem('localExpenses'+i));
            console.log(grabbedItem);

            // Get input name
            var newPayment = grabbedItem[0];

            // Create li for new item
            var li = document.createElement('li');
            // Add Class
            li.className = 'list-group-item';
            
            // assign background color based off priority level selected
            prioritySelected = grabbedItem[3];
            priorityButton = '<span type=\"button\" class=\"badge text-wrap p-2 mr-2 float-left status ' +grabbedItem[2]+ '\">'+prioritySelected+'</span>'+newPayment;
            // Add priority + text node with input value
            li.innerHTML = li.innerHTML+priorityButton;
            
            //create del button element
            var deleteBtn = document.createElement('i');
            // Add classes to delete button
            deleteBtn.className = 'far fa-trash-alt btn btn-danger btn-sm float-right delete';
            //Append button to li
            li.appendChild(deleteBtn);
            
            //get Amount value
            var newAmount = grabbedItem[1];
            newAmount = newAmount.replace(/,/g, "").replace(/\$/g, '');
            // create div to be inserted
            newAmountInsert = document.createElement('div');
            //add amount value to div
            newAmountInsert.innerHTML = '$'+newAmount;
            // Add class to amount item
            newAmountInsert.className = 'badge text-wrap p-2 mr-2 float-left';
            // Add ID to amount item
            newAmountInsert.setAttribute("id", "itemAmount");
            //Append amount to li
            li.appendChild(newAmountInsert);
            //add amount value to li
            li.value = newAmount;
            li.style.border = '1px inset silver';
            li.draggable = "true";
            li.ondragover = "dragOver(event)";
            li.ondragstart = "dragStart(event)";

            document.getElementById('amount').value = "";
            //Append li to list
            itemList.appendChild(li);
            

            //delete inner contents of activity adder
            document.getElementById('item').value = "";
            document.getElementById('item').placeholder = "Next payment For?";

            // Display Block for container - meant for first input
            document.getElementById('ActivityContainer').style.display = 'block';
            calculateExpenses();
        }
    } else {
        console.log('localStorage was NOT greater than 1')
        calculateExpenses();
    }
}





//END Local Storage

function helpToggle() {
    var helpContainer = document.querySelector('.helpContainer');
    if (helpContainer.style.width == '350px') {
        helpContainer.style.width = '25px';
        helpContainer.style.height = '50px';
        helpContainer.style.top = '145px';
        helpContainer.style.zIndex = '1';
        helpContainer.classList.add("bg-warning");
        document.getElementById('main').style.filter = 'blur(0px)';
        document.getElementById('main-header').style.filter = 'blur(0px)';
        helpContainer.style.overflow = 'hidden';
        document.getElementById('helpContent').style.display = 'none';
    } else {
        helpContainer.style.width = '350px';
        helpContainer.style.height = '100%';
        helpContainer.style.top = '0px';
        helpContainer.style.zIndex = '2';
        helpContainer.classList.remove("bg-warning");
        document.getElementById('main').style.filter = 'blur(2px)';
        document.getElementById('main-header').style.filter = 'blur(2px)';
        setTimeout(function(){helpContainer.style.overflow = 'scroll'; document.getElementById('helpContent').style.display = 'flex';}, 200);
    }
}

function financeToggle() {
    var helpContainer = document.querySelector('.financialContainer');
    if (helpContainer.style.width == '350px') {
        helpContainer.style.width = '25px';
        helpContainer.style.height = '50px';
        helpContainer.style.top = '185px';
        helpContainer.style.zIndex = '1';
        document.getElementById('main').style.filter = 'blur(0px)';
        document.getElementById('main-header').style.filter = 'blur(0px)';
        helpContainer.classList.add("bg-success");
        helpContainer.style.overflow = 'hidden';
        document.getElementById('financeContent').style.display = 'none';
    } else {
        helpContainer.style.width = '350px';
        helpContainer.style.height = '100%';
        helpContainer.style.top = '0px';
        helpContainer.style.zIndex = '2';
        document.getElementById('main').style.filter = 'blur(2px)';
        document.getElementById('main-header').style.filter = 'blur(2px)';
        helpContainer.classList.remove("bg-success");
        setTimeout(function(){helpContainer.style.overflow = 'scroll'; document.getElementById('financeContent').style.display = 'flex';}, 200);
    }
}




















































// EXAMINE THE DOCUMENT OBJECT //

// console.dir(document);
// console.log(document.domain);
// console.log(document.URL);
// console.log(document.title);
// document.title = 123;
// console.log(document.doctype);
// console.log(document.head);
// console.log(document.body);
// console.log(document.all);
// console.log(document.all[10]);
// document.all[10].textContent = 'Hello';
// console.log(document.forms[0]);
// console.log(document.links);
//console.log(document.images);

// GETELEMENTBYID
//console.log(document.getElementById('header-title'));
//var headerTitle = document.getElementById('header-title');
//var header = document.getElementById('main-header');
// console.log(headerTitle);
// headerTitle.textContent = "Hello";
// headerTitle.innerText = "Goodbye";
//console.log(headerTitle.innerText);
//headerTitle.innerHTML = '<h3>Hello</h3>';
//header.style.borderBottom = 'solid 3px black';

// GETELEMENTSBYCLASSNAME //
// var items = document.getElementsByClassName('list-group-item');
// console.log(items);
// items[1].textContent = 'Hello 2';
// items[1].style.fontWeight = 'bold';
// items[1].style.background = 'yellow';

// for(i=0; i < items.length; i++) {
//     items[i].style.background = 'gray';
//     console.log('first');
// }; 

// GETELEMENTSBYTAGNAME //
// var li = document.getElementsByTagName('li');
// console.log(li);
// li[1].textContent = 'Hello 2';
// li[1].style.fontWeight = 'bold';
// li[1].style.background = 'yellow';

// for(i=0; i < li.length; i++) {
//     li[i].style.background = 'gray';
//     console.log('first');
// }; 
    
// QUERYSELECTOR //
// var header = document.querySelector('#main-header');
// header.style.borderBottom = 'solid 4px gray'

// var input = document.querySelector('input');
// input.value = 'Hello World'

// var submit = document.querySelector('input[type="submit"]');
// submit.value="Send";

// var item = document.querySelector('.list-group-item');
// item.style.color = 'red';

// var lastItem = document.querySelector('.list-group-item:last-child');
// lastItem.style.color = 'blue';

// var secondItem = document.querySelector('.list-group-item:nth-child(2)');
// secondItem.style.color = 'green';

// QUERYSELECTORALL //
// var titles = document.querySelectorAll('.title');

// console.log(titles);
// titles[0].textContent = "Hello";

// var odd = document.querySelectorAll('li:nth-child(odd)');
// var even = document.querySelectorAll('li:nth-child(even)');

// for (var i = 0; i < odd.length; i++) {
//     odd[i].style.backgroundColor = 'silver';
// // }

// // for (var i = 0; i < even.length; i++) {
// //     even[i].style.backgroundColor = 'gray';
// }

// TRAVERSING THE DOM //
// var itemList = document.querySelector('#items');
// parentNode
// console.log(itemList.parentNode);
// itemList.parentNode.style.background = 'silver';
// console.log(itemList.parentNode.parentNode);

// parentElement
// console.log(itemList.parentElement);
// itemList.parentElement.style.background = 'silver';
// console.log(itemList.parentElement.parentElement); 

// childNodes
// console.log(itemList.childNodes)

// console.log(itemList.children)
// console.log(itemList.children[1])
// itemList.children[1].style.background = 'yellow';

// // FirstChild
// console.log(itemList.firstChild)
// // firstElementChild
// console.log(itemList.firstChild)
// console.log(itemList.firstElementChild);
// itemList.firstElementChild.textContent = "Hello 1";

// lastChild
// console.log(itemList.lastChkild)
// lastElementChild
// console.log(itemList.lastElementChild);
// itemList.lastElementChild.textContent = "Hello 4";

// nextSibling
// console.log(itemList.nextSibling);
// nextElementSibling
// console.log(itemList.nextElementSibling)

// previousSibling
// console.log(itemList.previousSibling)
// previousElementSibling
// console.log(itemList.previousElementSibling);
// itemList.previousElementSibling.style.color = 'green';

// / createElement

// Create a div
// var newDiv = document.createElement('div');

// Add class
// newDiv.className= 'hello';

// Add id
// newDiv.id = 'hello1';

// Add attr
// newDiv.setAttribute('title', 'Hello Div')

// Create text node
// var newDivText = document.createTextNode('Hello World');

// Add text to div
// newDiv.appendChild(newDivText);

// var container = document.querySelector('header .container');
// var h1 = document.querySelector('header h1');

// console.log(newDiv);

// newDiv.style.fontSize = '30px';

// container.insertBefore(newDiv, h1);

// var button = document.getElementById('button').addEventListener('click', function(){
//     console.log(123);
// }) //better to call a seperate function


// Events //

// var button = document.getElementById('button').addEventListener('click', buttonClick)

// function buttonClick(e) {
    //console.log('button clicked')
    // document.getElementById('header-title').textContent = 'Changed';
    // document.querySelector('#main').style.backgroundColor = 'blue';
    // console.log(e.target);
    // console.log(e.target.id);
    // console.log(e.target.className);
    // console.log(e.target.classList);
    // var output = document.getElementById('output');
    // output.innerHTML = '<h3> '+e.target.id+'</h3>';
    
    // console.log(e.type);
    
    // console.log(e.clientX)
    // console.log(e.clientY)
    
    // console.log(e.offsetX)
    // console.log(e.offsetY)
    // console.log(e.altKey);
    // }
    
    // var button = document.getElementById('button');
    // var box = document.getElementById('box');
    // addEventListener('click', runEvent);
    // addEventListener('dblclick', runEvent);
    // addEventListener('mousedown', runEvent);
    // addEventListener('mouseup', runEvent);
    
    // box.addEventListener('mouseenter', runEvent)
    // box.addEventListener('mouseleave', runEvent)

    // box.addEventListener('mouseover', runEvent)
    // box.addEventListener('mouseout', runEvent)
    
    // box.addEventListener('mousemove', runEvent);

    // var itemInput = document.querySelector('input[type="text"]');
    // var form = document.querySelector('form');
    // var select = document.querySelector('select')

    // itemInput.addEventListener('keydown', runEvent);
    // itemInput.addEventListener('keyup', runEvent);
    // itemInput.addEventListener('keypress', runEvent);
    
    // itemInput.addEventListener('focus', runEvent);
    // itemInput.addEventListener('blur', runEvent);
    
    // itemInput.addEventListener('cut', runEvent);
    // itemInput.addEventListener('paste', runEvent);
    
    // itemInput.addEventListener('input', runEvent);

    // select.addEventListener('change', runEvent)
    // select.addEventListener('input', runEvent)

    // form.addEventListener('submit', runEvent);

    // function runEvent(e) {
    //     e.preventDefault(); //prevents text dissappearing from submit button
    //     console.log('EVENT TYPE: '+e.type);
    //     console.log(e.target.value);
    //     console.log(e.target.value);
    //     document.getElementById('output').innerHTML = '<h3>'+e.target.value+'</h3>'
    //     output.innerHTML = '<h3>MouseX: '+e.offsetX+' </h3><h3>MouseY: '+e.offsetY+'</h3>';

    //     document.body.style.backgroundColor = "rgb("+e.offsetX+","+e.offsetY+", 40)";
    // }
    
    









