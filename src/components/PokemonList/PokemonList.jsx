
import './PokemonList.css'
import Pokemon from "../Pokemon/Pokemon";
import usePokemonList from "../hooks/usePokemonList";


function PokemonList(){
    // const [pokemonList, setPokemonList]= useState([]);
    // const [isLoading,setIsLoading]= useState(true);

    // const [pokedex_url,setPokedexUrl] = useState('https://pokeapi.co/api/v2/pokemon');
    // const [nextUrl, setNextUrl]=useState('');
    // const [prevUrl, setPrevUrl]=useState('');

    const [pokemonListState,setPokemonListState] = usePokemonList(false);

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