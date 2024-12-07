'use client';
import { useEffect, useState } from 'react';
import Body from '../component/globalControl/body';

// Định nghĩa các interface đã nêu ở trên
interface PokeResult {
  name: string;
  url: string;
}

interface AllPokeData {
  [x: string]: any;
  count: number;
  next: string | null;
  previous: string | null;
  results: PokeResult[];
}

interface Sprites {
  back_default: string;
  front_default: string;
  back_shiny: string;
  front_shiny: string;
}

interface PokemonDetails {
  name: string;
  sprites: Sprites;
}

const FetchPokemon: React.FC = () => {
  const [allPokeData, setAllPokeData] = useState<AllPokeData | null>(null);
  const [pokemonDetails, setPokemonDetails] = useState<PokemonDetails[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAllPokemons = async () => {
      try {
        const response = await fetch('/api/allPoke', { cache: 'no-cache' });

        if (!response.ok) {
          throw new Error(`Không thể lấy về Pokemons: ${response.status}`);
        }

        const dataAll: AllPokeData = await response.json();
        setAllPokeData(dataAll);
        const detailsPromises = dataAll.results.map(async (pokemon) => {
          const urlParts = pokemon.url.split('/').filter(Boolean);
          const id = urlParts[urlParts.length - 1];
          console.log(id);

          const res = await fetch(`/api/pokemon/${id}`, { cache: 'no-cache' });

          if (!res.ok) {
            throw new Error(`Không thể lấy chi tiết pokemon ${pokemon.name}: ${res.status}`);
          }

          const dataDetail: PokemonDetails = await res.json();
          return dataDetail;
        });

        const allDetails = await Promise.all(detailsPromises);
        setPokemonDetails(allDetails);
      } catch (error: unknown) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError('An unknown error occurred');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchAllPokemons();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <Body>
      <div>
        <h1>Danh Sách Pokémon:</h1>
        <ul>
          {pokemonDetails.map((pokemon) => (
            <li key={pokemon.name} style={{ marginBottom: '20px' }}>
              <h2>{pokemon.name.toUpperCase()}</h2>
              <div>
                <img src={pokemon.sprites.front_default} alt={`${pokemon.name} front`} />
                <img src={pokemon.sprites.back_default} alt={`${pokemon.name} back`} />
                <img src={pokemon.sprites.front_shiny} alt={`${pokemon.name} front shiny`} />
                <img src={pokemon.sprites.back_shiny} alt={`${pokemon.name} back shiny`} />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </Body>

  );
};

export default FetchPokemon;
