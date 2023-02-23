import { getUser } from "./services/user.js"
import { getRepositories } from "./services/repositories.js"

import { user } from "./objects/user.js"
import { screen } from "./objects/screen.js"
import { getEvents } from "./services/events.js"

document.getElementById('btn-search').addEventListener('click', () => {
    const userName = document.getElementById("input-search").value
    if (validateEmptyInput(userName)) return
    getUserData(userName)
})

document.getElementById('input-search').addEventListener('keyup', (e) => {
    const userName = e.target.value
    const keyEnter = e.which || e.keyCode
    const isEnterKeyPress = keyEnter === 13

    if (isEnterKeyPress){
        if (validateEmptyInput(userName)) return
        getUserData(userName)
    }
})

function validateEmptyInput(userName){
    if (userName.length === 0){
        alert('Preencha o campo com o nome do usuário do GitHub')
        return true
    }
}

async function getUserData(userName){
    const userResponse = await getUser(userName)
    if (userResponse.message === 'Not Found'){
        screen.renderNotFound()
        return
    }
    const repositoriesResponse = await getRepositories(userName)
    const eventsResponse = await getEvents(userName)

    user.setInfo(userResponse)
    user.setRepositories(repositoriesResponse)
    user.setEvents(eventsResponse)

    screen.renderUser(user)
}

async function teste(userName){
    const url = `https://api.github.com/users/${userName}/events?per_page=10`
    const response = await fetch(url)
    const json = await response.json()
    console.log(json);
}

// console.log(teste('filipegabrielrocha'));
teste('filipegabrielrocha')