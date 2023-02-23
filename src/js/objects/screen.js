const screen = {
    userProfile: document.querySelector(".profile-data"),
    renderUser(user){
        this.userProfile.innerHTML = `<div class="info">
                                            <img src="${user.avatarUrl}" alt="Foto do perfil do usuário" />
                                            <div class="data">
                                                <h1>${user.name ?? 'Não possui nome cadastrado 😢'}</h1>
                                                <div class="infoFollowers">
                                                    <p>${`<span>Seguidores:</span> ${user.numberFollowers}` ?? 'Não possui bio cadastrada 😢'}</p>
                                                    <p>${`<span>Seguindo:</span> ${user.numberFollowing}` ?? 'Não possui bio cadastrada 😢'}</p>
                                                </div>
                                                <p>${user.bio ?? 'Não possui bio cadastrada 😢'}</p>
                                            </div>
                                        </div>`

        let repositoriesItens = ''
        user.repositories.forEach(repo => repositoriesItens += `<li><a href="${repo.html_url}" target="_blank">${repo.name}</a></li>`)

        if (user.repositories.length > 0){
            this.userProfile.innerHTML += `<div class="repositories section">
                                                <h2>Repositórios</h2>
                                                <ul>${repositoriesItens}</ul>
                                            </div>`
        }

        let eventsItens = ''
        // user.events.forEach((events,indicieEvents) => eventsItens += `<li>${events.repo.name}: ${events.payload.commits}</li>`)
        user.events.forEach((events, indicie) => {
            if (events.type === 'CreateEvent' || events.type === 'PushEvent'){
                if (events.payload.description === '' || events.payload.description === null || events.payload.description === undefined){
                    eventsItens += `<li><span>${events.repo.name}:</span> - Não tem Descrição</li>`
                } else {
                    eventsItens += `<li><span>${events.repo.name}:</span> - <span class="containerDescription">${events.payload.description}</span></li>`
                }
            }
        });

        if (user.events.length > 0){
            this.userProfile.innerHTML += `<div class="events section">
                                                <h2>Eventos</h2>
                                                <ul>${eventsItens}</ul>
                                           </div>`
        } else {
            this.userProfile.innerHTML += 'erro ou n tem nada'
        }
    },
    renderNotFound(){
        this.userProfile.innerHTML = "<h3>Usuário Não Encontrado</h3>"
    }
}

export { screen }