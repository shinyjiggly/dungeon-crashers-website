const pokemonRepository = (function(){
  let pokemonList=[];
  const apiUrl = '/pokedex-data/pokemon/?limit=150';

  function add(pokemon){
    if(
      typeof pokemon === 'object' &&
      'name' in pokemon){
      pokemonList.push(pokemon);
    }else{
      console.log('pokemon is incomplete'); // eslint-disable-line
    }
  }
  function getAll(){
    return pokemonList;
  }

  function addListItem(pokemon){
    let pokemonList = document.querySelector('.list-group');
    const itemPokemon = document.createElement('li');
    itemPokemon.classList.add('group-list-item')
    const itemButton = document.createElement('button');
    itemButton.setAttribute('data-toggle', 'modal');
    itemButton.setAttribute('data-target', '#myModal');

    itemButton.innerText = pokemon.name;
    itemButton.classList.add('btn', 'btn-warning', 'btn-lg');

    itemPokemon.appendChild(itemButton);
    pokemonList.appendChild(itemPokemon);

    itemButton.addEventListener('click', function(){
      showDetails(pokemon);
    });
  }

  function loadList(){
    return fetch(apiUrl).then (function(response){
      return response.json();
    }).then (function (json){
      json.results.forEach(function(item){
        let pokemon = {
          name: item.name,
          detailsUrl: item.url
        };
        add(pokemon);
      });
    }).catch(function(e){
      console.error(e); // eslint-disable-line
    })
  }

  function loadDetails(item){
    let url = item.detailsUrl;
    return fetch(url). then (function(response){
      return response.json();
    }).then (function(details){
      item.imageUrl = details.image;
      item.height = details.height;
      item.weight = details.weight;
      item.location = details.location;
      item.types = details.types;
      item.class = details.class;
      item.description = details.description;
      item.notes = details.notes;
      item.bulba = details.bulba;
      item.abilities = details.abilities;
    }).catch(function(e){
      console.error(e); // eslint-disable-line
    });
  }

  function showDetails(pokemon){
    loadDetails(pokemon).then(function(){
      const modalBody = document.querySelector('.modal-body');
      const modalTitle = document.querySelector('.modal-title');

      // empty existing modal content
      modalBody.innerHTML = ' ';
      modalTitle.innerHTML = ' ';

      const titleElement = document.createElement('h3');
      titleElement.innerText = pokemon.name;

      const imgElement = document.createElement('img');
      imgElement.classList.add('pokemon-img');
      imgElement.src = pokemon.imageUrl;

      const classElement = document.createElement('p');
      classElement.innerHTML = 'The ' + pokemon.class + ' Pokemon';

      const heightElement = document.createElement('p');
      heightElement.innerHTML = 'Height: ' + pokemon.height;

      const weightElement = document.createElement('p');
      weightElement.innerHTML = 'Weight: ' + pokemon.weight;

      const locationElement = document.createElement('p');
      locationElement.innerHTML = 'Location: ' + pokemon.location;

      const descriptionElement = document.createElement('p');
      descriptionElement.innerHTML = 'Description: '  + pokemon.description;

      const notesElement = document.createElement('p');
      notesElement.innerHTML = 'My Notes: '  + pokemon.notes;

      const bulbaElement = document.createElement('p');
      bulbaElement.innerHTML = 'Bulbapedia: '  + pokemon.bulba;

      modalTitle.appendChild(titleElement);
      modalBody.appendChild(imgElement);
      modalBody.appendChild(classElement)
      modalBody.appendChild(heightElement);
      modalBody.appendChild(weightElement);
      modalBody.appendChild(locationElement);
      modalBody.appendChild(descriptionElement);
      modalBody.appendChild(notesElement);
      modalBody.appendChild(bulbaElement);


      //create array of types, then join types w comma
      const types = pokemon.types.map(({type}) => type.name).join(', ');
      const typesElement = document.createElement('p');
      typesElement.innerHTML = 'Types: ' + types;
      modalBody.appendChild(typesElement);

      //create array of abilities, then join types w comma
      const abilities = pokemon.abilities.map(({ability}) => ability.name).join(', ');
      const abilitiesElement = document.createElement('p');
      abilitiesElement.innerHTML = 'Abilities: ' + abilities;
      modalBody.appendChild(abilitiesElement);
    });
  }

  return{
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
    showDetails: showDetails
    };
  })()

pokemonRepository.loadList().then(function(){
  pokemonRepository.getAll().forEach(function(pokemon){
    pokemonRepository.addListItem(pokemon);
  });
  const searchInput = document.querySelector('#search-input');
  const buttons = document.querySelectorAll('#pokemon-list li button');

  searchInput.addEventListener('keyup', event =>{
    buttons.forEach(button =>
    button.textContent.includes(event.target.value)
    ?button.parentElement.style.display = 'block'
    :button.parentElement.style.display = 'none'
    )
  });
  searchInput.addEventListener('search', event => { // eslint-disable-line
    buttons.forEach(button => button.parentElement.style.display = 'block');
  });
});
