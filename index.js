function userPrompt(){
    // Prompt in loop to ensure that the user is only prompted once per page reload
    let i =0;
    while(i<1){
        let name = prompt('Kindly enter your name:')
        if(name != null){
            nameAddition(name)
        }
        i++;
    }
}

//Function to add entered name to page
function nameAddition(name){
    // console.log(name)
    let newName = document.querySelector('.name')
    // console.log(newName)
    newName.innerText=`Dear ${name.toUpperCase()}`;
}

//Activate generate button
function jokeFunc(){
    let button=document.querySelector('.generate')
    // console.log(button)
    button.addEventListener('click', function(){
        let state = 'Pressed'
        // console.log(state)
        
        //Check if dark humor button is active

        // Check if it's activated or deactivated
        checkCssFunc()
        return state
        
    })
}

//Function to get toggle button state
function toggleButtonPressFunc(){
    let toggleButton =document.querySelector('.slider')
    // console.log(toggleButton)
    toggleButton.addEventListener('click', function(){
        // console.log("Toggled")
    })
}

// Function to check if the slider active or not
function checkCssFunc(){
    let toggleButton =document.querySelector('.slider')

    //Get toggle button color
    const style = getComputedStyle(toggleButton)
    const backgroundColor = style.backgroundColor

    //Get correct endpoint
    setEndpointFunc(backgroundColor)
    // return backgroundColor
    //Add event listener
}

// Set correct endpoint according to dark button on or not
function setEndpointFunc(backgroundColor){
    if (backgroundColor === 'rgb(204, 204, 204)'){
        // console.log('grey')
        let endpoint = 'joke/Any?safe-mode'
        jokeFetchFunc(endpoint)
        // console.log(endpoint)
        return endpoint;
    }
    else if (backgroundColor === 'rgb(201, 162, 39)'){
        // console.log('gold')
        let endpoint = 'joke/Dark'
        jokeFetchFunc(endpoint)
        // console.log(endpoint)
        return endpoint;
    }
}

//Function to fetch from joke API
function jokeFetchFunc(endpoint){
    let baseUrl = 'https://v2.jokeapi.dev/'
    let url = `${baseUrl}${endpoint}`
    // console.log(url);

    let jokes = fetch(url)
        .then((jokes) => jokes.json())
        .then((response) => {
            let jokes = response
            // console.log(jokes)

            // Check if the joke is a one liner or not
            let oneLine=(`${jokes.joke}`)
            // console.log(oneLine)
            let setup = `${jokes.setup}`
            let delivery = `${jokes.delivery}`

            // If it is one liner:
            if(oneLine === 'undefined'){
                let i =1 ;
                // console.log('Two-liner')
                displayJokeFunc(jokes, i)
            }
            // If it is a two liner:
            else{
                let i=2;
                // console.log('One-Liner')
                displayJokeFunc(jokes, i)
            }
            // let oneResponse = ${jokes.joke}
            // let twoResponse = ${}

        })
}

function displayJokeFunc(jokes, i){
    let parentContent = document.querySelector('.joke')
    clearSpaceFunc(parentContent)
    // console.log(parentContent)
    if (i === 1){
        let input = document.createElement('div')
        input.innerHTML = `
            <p>- ${jokes.setup}</p>
            <p>- ${jokes.delivery}</p>
            <style>
            .joke {
                border: 2px solid #c9a227; 
            }
            </style>
        `
        // Add to DOM
        parentContent.appendChild(input)
    }
    if (i === 2){
        let input = document.createElement('div')
        input.innerHTML = `
            <p>- ${jokes.joke}</p>
            <style>
            .joke {
                border: 2px solid #c9a227; 
            }
            </style>
        `
        // Add to DOM
        parentContent.appendChild(input)
    }

}

function clearSpaceFunc(parentContent){
    while(parentContent.firstChild){
        parentContent.removeChild(parentContent.firstChild);
    }
}


function initialize (){
    //Prompt user for name and change it in message
    // userPrompt()

    //Check if Generate button is pressed (return state)
    jokeFunc()
    //Check if toggle button is active or not (return color)
    toggleButtonPressFunc()

    //Fetch API data
    //Display API data
}

initialize ()