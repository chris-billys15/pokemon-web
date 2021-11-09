import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@apollo/react-hooks";
import { GET_POKEMONS } from "../graphql/get-pokemons";
import { Card, CardImg, CardBody, CardTitle, Button } from "reactstrap";
import { toPascalCase } from "../utility";
import "../styles/PokemonList.scss";

const PokemonList = () => {
	const [pokemons, setPokemons] = React.useState([]);
	const { data } = useQuery(GET_POKEMONS, {
		variables: {},
	});
	React.useEffect(() => {
		if (data) {
			setPokemons(pokemons.concat(data.pokemons?.results));
		}
	}, [data]);

	return (
		<div className="pokemonlist-page">
			<div className="pl-container">
				{pokemons.map((pokemon) => {
					return (
						<Card key={pokemon.id} className="pl-item">
							<Link to={`/pokemon/${pokemon.name}`}>
								<CardImg alt="Card image cap" src={pokemon.image} top />
							</Link>
							<CardBody>
								<Link className="link-to" to={`/pokemon/${pokemon.id}`}>
									<CardTitle className="pokemon-name">
										{toPascalCase(pokemon.name)}
									</CardTitle>
								</Link>
								<Button
									onClick={() => {
										console.log("catch me");
									}}
								>
									Catch Me
								</Button>
							</CardBody>
						</Card>
					);
				})}
			</div>
		</div>
	);
};

export default PokemonList;

const mockData = [
	{
		id: 2,
		url: "https://pokeapi.co/api/v2/pokemon/2/",
		name: "ivysaur",
		image:
			"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/2.png",
	},
	{
		id: 3,
		url: "https://pokeapi.co/api/v2/pokemon/3/",
		name: "venusaur",
		image:
			"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/3.png",
	},
	{
		id: 4,
		url: "https://pokeapi.co/api/v2/pokemon/4/",
		name: "charmander",
		image:
			"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png",
	},
	{
		id: 4,
		url: "https://pokeapi.co/api/v2/pokemon/5/",
		name: "charmeleon",
		image:
			"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/5.png",
	},
	{
		id: 5,
		url: "https://pokeapi.co/api/v2/pokemon/6/",
		name: "charizard",
		image:
			"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/6.png",
	},
	{
		id: 6,
		url: "https://pokeapi.co/api/v2/pokemon/7/",
		name: "squirtle",
		image:
			"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/7.png",
	},
	{
		id: 7,
		url: "https://pokeapi.co/api/v2/pokemon/8/",
		name: "wartortle",
		image:
			"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/8.png",
	},
	{
		url: "https://pokeapi.co/api/v2/pokemon/9/",
		name: "blastoise",
		image:
			"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/9.png",
	},
	{
		url: "https://pokeapi.co/api/v2/pokemon/10/",
		name: "caterpie",
		image:
			"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/10.png",
	},
	{
		url: "https://pokeapi.co/api/v2/pokemon/11/",
		name: "metapod",
		image:
			"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/11.png",
	},
	{
		url: "https://pokeapi.co/api/v2/pokemon/12/",
		name: "butterfree",
		image:
			"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/12.png",
	},
];
