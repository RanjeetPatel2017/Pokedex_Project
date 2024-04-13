import { useEffect, useState } from "react";
import axios from 'axios';
import './PokemonList.css'
import Pokemon from "../Pokemon/Pokemon";


function PokemonList(){
    // const [pokemonList, setPokemonList]= useState([]);
    // const [isLoading,setIsLoading]= useState(true);

    // const [pokedex_url,setPokedexUrl] = useState('https://pokeapi.co/api/v2/pokemon');
    // const [nextUrl, setNextUrl]=useState('');
    // const [prevUrl, setPrevUrl]=useState('');

    const [pokemonListState, setPokemonListState] = useState({
        pokemonList: [],
        isLoading: true,
        pokedex_url: 'https://pokeapi.co/api/v2/pokemon',
        nextUrl: '',
        prevUrl : ''
    })

    
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

    return(
        <div className="pokemon-list-wrapper">
           
            <div className="pokemon-wrapper">
                {(pokemonListState.isLoading) ? <img src="https://i.gifer.com/ZKZg.gif" />:
                
                pokemonListState.pokemonList.map((p)=> <Pokemon name={p.name} image={p.image} key={p.id}
                id={p.id}/>)
            
        }
            </div>
          <div className="controls">
            <button disabled={pokemonListState.prevUrl == null} onClick={() =>  setPokemonListState({...pokemonListState, pokedex_url:pokemonListState.prevUrl })}>Prev</button>
            <button disabled={pokemonListState.nextUrl == null} onClick={() => setPokemonListState({...pokemonListState, pokedex_url:pokemonListState.nextUrl })}>Next</button>
          </div>
        </div>

    )
}
export default PokemonList;