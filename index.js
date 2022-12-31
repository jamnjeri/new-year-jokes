// Prompt in loop to ensure that the user is only prompted once per page reload
let i =0;
while(i<1){
    let name = prompt('Kindly enter your name:')
    if(name != null){
        nameAddition(name)
    }

    i++;
}

function nameAddition(name){
    // console.log(name)
    let newName = document.querySelector('.name')
    // console.log(newName)
    newName.innerText=`Dear ${name.toUpperCase()}`;
}

function jokeFunc(){
    let button=document.querySelector('.generate')
    // console.log(button)
    button.addEventListener('click', function(){
        // console.log('Pressed')
        checkDarkStatus()
        let endpoint = 'joke/Programming,Miscellaneous,Pun,Spooky,Christmas'
        jokeFetchFunc(endpoint)
    })
}

function jokeFetchFunc(endpoint){
    let baseUrl = 'https://v2.jokeapi.dev/'
    let url = `${baseUrl}${endpoint}`
    // console.log(url);

    let jokes = fetch(url)
        .then((jokes) => jokes.json())
        .then((response) => {
            let jokes = response
            // console.log(jokes)
            let oneLine=(`${jokes.joke}`)
            // console.log(oneLine)
            let setup = `${jokes.setup}`
            let delivery = `${jokes.delivery}`
            if(oneLine === 'undefined'){
                let i =1 ;
                // console.log('Two-liner')
                displayJokeFunc(jokes, i)
            }
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

function checkDarkStatus(){
    let toggleButton = document.querySelector('.slider')
    // console.log('checking')
    toggleButton.addEventListener('click', function(){
    let i=+1;
    // console.log('Clicked')
    if (i%2 !== 0){
        console.log('OFF')
        let endpoint = 'joke/Any?safe-mode'
        jokeFetchFunc(endpoint)
        
    }
    else{
        console.log('ON')
        let endpoint = 'joke/Dark'
        jokeFetchFunc(endpoint)
    }
    })
    // console.log(toggleButton)
}

function clearSpaceFunc(parentContent){
    while(parentContent.firstChild){
        parentContent.removeChild(parentContent.firstChild);
    }
}

jokeFunc()
checkDarkStatus()