// var magButton = document.getElementById('powerMagButton');
// magButton.addEventListener('click', addContent);

document.querySelectorAll('#item1Spacing').forEach(item => {
    item.addEventListener('click', addSelection)
})

//adds selection list
function addSelection(e) {
    xhr = new XMLHttpRequest();
    xhr.onload = function () {
        if (xhr.status = 200) {
            responseObject = JSON.parse(xhr.responseText);

            var newContent = '';
            //filters through professionalProducts
            for (var i = 0; i < responseObject.selections.length; i++) {
                //execute if click event name matches object name
                if (responseObject.selections[i].name == e.target.innerText) {
                    console.log('Matched: ' + responseObject.selections[i].name)
                    
                    newContent += '<ul class="links2 animate-bottom" id="extra">';
                    newContent += '<p class="subTopicTitle">'+responseObject.selections[i].name+'</p>';
                    newContent += '';
                    
                    for (var ii = 0; ii < responseObject.selections[i].SelectionsList.length; ii++) {
                        newContent += '<li id="selectionList">' + responseObject.selections[i].SelectionsList[ii].item + '</li>';
                    }
                    
                    newContent += '</ul>';

                } else {
                    console.log('no match')
                }

            };
            //Add content
            document.querySelector('.item2').innerHTML = newContent;
            // event listener when selectionList is clicked
            document.querySelectorAll('#selectionList').forEach(item => {
                item.addEventListener('click', selectionIcons)
            })
        }
    };
    xhr.open('GET', './json/selection.json', true);
    xhr.send(null);
}

//variable created to carry over icon clicked to addContent(e)
var itemNumber;
//adds selection Icons
function selectionIcons(e) {

    xhr = new XMLHttpRequest();
    xhr.onload = function (){
        if(xhr.status = 200) {
            responseObject = JSON.parse(xhr.responseText);
            //filters mags.json for product category match
            var newContent = '';
            for (var i = 0; i < responseObject.list.length; i++) {
                //execute if click event name matches object name
                if (responseObject.list[i].name == e.target.innerText) {
                    console.log('Matched: ' + responseObject.list[i].name)
                    itemNumber = i;
                    newContent += '<main class="main">';
                    //adds icons from all name keys in object
                    for (var ii = 0; ii < responseObject.list[i].listProducts.length; ii++) {
                        newContent += '<button id="powerMagButton" class="animate-top">' + responseObject.list[i].listProducts[ii].name + '</button>';
                    }
                    newContent += '<section class="animate-top">';
                    newContent += '<div class="contentBox">';
                    newContent += '</div>';
                    newContent += '</section>';
                    newContent += '</main>';
                    
                } //else if (responseObject.list[i].name !== e.target.innerText){
                   // console.log('no match')
                   // newContent += 'Sorry, no content was found';
                //}

            };
            //Add content
            document.querySelector('.item3').innerHTML = newContent;

            document.querySelectorAll('#powerMagButton').forEach(item => {
                item.addEventListener('click', addContent)
            })
        }
    };

    xhr.open('GET', './json/products.json', true)
    xhr.send(null);
}



function addContent(e) {
    xhr = new XMLHttpRequest();
    xhr.onload = function () {
        if (xhr.status = 200) {
            responseObject = JSON.parse(xhr.responseText);
            console.log(itemNumber)
            var newContent = '';
            //filters through listProducts
            for (var i = 0; i < responseObject.list[itemNumber].listProducts.length; i++) {
                //execute if click event name matches object name
                if (responseObject.list[itemNumber].listProducts[i].name == e.target.innerText) {
                    console.log('Matched: ' + responseObject.list[itemNumber].listProducts[i].name)
                    newContent += '<span class="animate-bottom">';
                    newContent += '<h1>' + responseObject.list[itemNumber].listProducts[i].name + '</h1>';
                    newContent += '<p>' + responseObject.list[itemNumber].listProducts[i].description + '</p>';
                    newContent += '<image class=\"images\" src=\"' + responseObject.list[itemNumber].listProducts[i].image + '\">';
                    newContent += '<div class="detailsRight">';
                    newContent += '<h1>Features</h1>';
                    for (var ii = 0; ii < responseObject.list[itemNumber].listProducts[i].detailList.length; ii++) {
                        newContent += '<li>' + responseObject.list[itemNumber].listProducts[i].detailList[ii].item + '</li>';
                    }
                    newContent += '</div>';
                    newContent += '</span>';
                } else {
                    console.log('no match')
                }

            };
            //Add content
            document.querySelector('.contentBox').innerHTML = newContent;
        }
    };
    xhr.open('GET', './json/products.json', true);
    xhr.send(null);
}
