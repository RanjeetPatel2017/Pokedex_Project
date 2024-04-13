import  axios  from "axios";
import { useEffect, useState } from "react";

function usePokemonList(type){
    const [pokemonListState, setPokemonListState] = useState({
        pokemonList: [],
        isLoading: true,
        pokedex_url: 'https://pokeapi.co/api/v2/pokemon',
        nextUrl: '',
        prevUrl : ''
    });

    async function downloadPokemons(){
        // setIsLoading(true);
       
    
            setPokemonListState((state) =>({...state, isLoading: true}))
            const response = await axios.get(pokemonListState.pokedex_url);
            const pokemonResults = response.data.results;
            //console.log(pokemonResults);
            console.log(response);
            //setNextUrl(response.data.next);
            setPokemonListState((state) => ({
                ...state,
                nextUrl: response.data.next,
                prevUrl: response.data.previous 
            }));
            //console.log(response.data);
            // setPrevUrl(response.data.previous);
            const pokemonResultPromise= pokemonResults.map((pokemon)=> axios.get(pokemon.url));

        
                //onsole.log(pokemonResultPromise);
                const pokemonData = await axios.all(pokemonResultPromise);
                //console.log(pokemonData);
                const pokeListResult = pokemonData.map((pokeData) => {
                    const pokemon = pokeData.data;
                    //console.log(pokemon);
                    return{
                        id: pokemon.id,
                        name: pokemon.name,
                        image:(pokemon.sprites.other)? pokemon.sprites.other.dream_world.front_default : pokemon.sprites.front_shiny,
                        types: pokemon.types
                    }
                });
            // console.log(pokeListResult);
                //setPokemonList(pokeListResult);
                setPokemonListState((state) =>({
                ...state,
                pokemonList:pokeListResult,
                isLoading: false 
            }));

        // setIsLoading(false);
    }

    useEffect(() => {
        downloadPokemons();
    },[pokemonListState.pokedex_url]);
    return[
        pokemonListState,
        setPokemonListState
    ]
}

export default usePokemonList;