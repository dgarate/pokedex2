document.addEventListener('DOMContentLoaded', function(){
    
    function show_result(response){

        response.results.forEach(function(pokemon){
            var extDiv = document.createElement('div')
            extDiv.classList.add("container", "card")
            extDiv.style = 'width: 18rem;'

            var cardBodyDiv = document.createElement('div')
            cardBodyDiv.classList.add("card-body")
           
            var pokemonName = document.createElement('h5')
            pokemonName.classList.add("card-tittle")
            pokemonName.textContent = pokemon.name
           
            var infoButton = document.createElement('button')
            infoButton.id = 'more-info'
            infoButton.classList.add("btn", "btn-primary", "container")
            infoButton.dataset.info = pokemon.url
            infoButton.dataset.name = pokemon.name
            infoButton.textContent = "¡Quiero saber más de este pokémon!"

            var cardDiv = document.querySelector('#cards')
            cardDiv.appendChild(extDiv)
            extDiv.appendChild(cardBodyDiv)
            cardBodyDiv.appendChild(pokemonName)
            cardBodyDiv.appendChild(infoButton)
        })
        var button = document.querySelector('#next-button')
        button.dataset.next = response.next
        
    }

    function show_info (response) {
        var typeArray = []
        response.types.forEach(function(typeInfo){
            typeArray.push(typeInfo.type.name)
            fetch(typeInfo.type.url)
            .then(function(response){
                return response.json()
            })
            .then(show_generation)
             
        })
        document.querySelector('#type').textContent = typeArray.join(', ')

        var abilitiesArray = []
        response.abilities.forEach(function(abilitiesInfo){
            abilitiesArray.push(abilitiesInfo.ability.name)
        })
        document.querySelector('#abilities').textContent = abilitiesArray.join(', ')

        var movesArray = []
        response.moves.forEach(function(abilitiesInfo){
            movesArray.push(abilitiesInfo.move.name)
        })
        finalMovesArray = movesArray.slice(0, 5)
        document.querySelector('#moves').textContent = finalMovesArray.join(', ')
        // document.querySelector('#show-info').modal('show');

        var body = document.querySelector('body')
        body.classList.add("modal-open")
        body.style = "padding-right: 15px;"
        var modalBack = document.createElement('div')
        modalBack.classList.add("modal-backdrop", "show")
        body.appendChild(modalBack)

        var modal = document.querySelector('#show-info')
        modal.classList.add("show")
        modal.style = "padding-right: 15px; display: block;"
        modal.role = "dialog"
        modal.removeAttribute('aria-hidden');
        modal.setAttribute('aria-modal', 'true');

    }

        var button = document.querySelector('[data-dismiss="modal"]')
        button.addEventListener('click', removeModal)
        
        function removeModal (){
            var modal = document.querySelector('#show-info')
            modal.removeAttribute('class', 'style', 'role', 'arial-modal')
            modal.classList.add("modal")
            modal.style = "display: none;"
            modal.setAttribute('aria-hidden', 'true')

            var body = document.querySelector('body')
            var modalBack = document.querySelector('.modal-backdrop')
            body.removeChild(modalBack)


        }

        var button = document.querySelector('[data-dismiss="modal"]')
        button.addEventListener('click', removeModal)

        var button = document.querySelector('.modal-footer')
        button.addEventListener('click', removeModal)

        


    function show_generation(response){
        document.querySelector('#generation').textContent = response.generation.name 
    }

    baseURL = 'https://pokeapi.co/api/v2/pokemon/'

            fetch(baseURL)
            .then(function(response){
                return response.json()
            })
            .then(show_result)

    var extCarDiv = document.querySelector('#cards')

    extCarDiv.addEventListener('click', function (event) {
        if (event.target.dataset.info){
            var pokemonName = event.target.dataset.name
            document.querySelector('.modal-title').textContent = pokemonName
            fetch(event.target.dataset.info)
            .then(function(response){
                return response.json()
            })
            .then(show_info)
        }  
    })


    var nextButton = document.querySelector('#next-button')
    nextButton.addEventListener('click', function(){
        var nextURL = document.querySelector('#next-button').attr('data-next')
        fetch(nextURL)
        .then(function(response){
            return response.json()
        })
        .then(show_result)
        
    })

 
});