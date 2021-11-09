import React from "react";
import { useParams } from "react-router";
import { CardImg } from "reactstrap";
import { useQuery } from "@apollo/react-hooks";
import { GET_POKEMON } from "../graphql/get-pokemons";
import { toPascalCase, pad } from "../utility";
import "../styles/PokemonDetail.scss";

const PokemonDetail = () => {
	const [pokemon, setPokemon] = React.useState(null);
	const { name } = useParams();
	const { data } = useQuery(GET_POKEMON, {
		variables: { name: name },
	});
	React.useEffect(() => {
		if (data) {
			setPokemon(data.pokemon);
		}
	}, [data]);

	return (
		<div className="pokemondetail-page">
			<div className="pd-content">
				<div className="poke-name">
					{`${toPascalCase(pokemon?.name)} ${pad(pokemon?.id, 3)}`}{" "}
				</div>
				<div className="pokemondetail-container">
					<div className="d-flex flex-column flex-grow-1">
						<CardImg
							className="poke-img"
							src={pokemon?.sprites?.front_default}
						/>
					</div>
					<div className="right-container flex-grow-1 ">
						<div className="detail-container detail-container-stats">
							<div className="container-title">Pokemon Base Stats</div>
							<div className="poke-stats">
								{pokemon?.stats.map((item) => {
									return (
										<div>{`${mapStats[item.stat.name]} : ${
											item.base_stat
										}`}</div>
									);
								})}
							</div>
						</div>
						<div className="typeandsize-container">
							<div className="bodysize-container">
								<div className="d-flex flex-column mr-5">
									<div className="bodysize-item">Height</div>
									<div className="bodysize-number">
										{pokemon?.height * 10} cm
									</div>
								</div>
								<div className="d-flex flex-column">
									<div className="bodysize-item">Weight</div>
									<div className="bodysize-number">
										{pokemon?.weight / 10} kg
									</div>
								</div>
							</div>
							<div className="detail-container detail-container-type">
								<div className="container-title">Type</div>
								<div className="type-container">
									{pokemon?.types.map((item) => {
										return (
											<div
												className={`poke-type ${item.type.name}-type`}
											>{`${toPascalCase(item.type.name)}`}</div>
										);
									})}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
const mapStats = {
	hp: "Hp",
	attack: "Attack",
	defense: "Defense",
	"special-attack": "Sp Atk",
	"special-defense": "Sp Def",
	speed: "Speed",
};
const data = {
	pokemon: {
		id: 1,
		name: "bulbasaur",
		sprites: {
			front_default:
				"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png",
			__typename: "Sprite",
		},
		types: [
			{
				type: {
					name: "grass",
					__typename: "BaseName",
				},
				__typename: "Type",
			},
			{
				type: {
					name: "poison",
					__typename: "BaseName",
				},
				__typename: "Type",
			},
		],
		forms: [
			{
				name: "bulbasaur",
				url: "https://pokeapi.co/api/v2/pokemon-form/1/",
				__typename: "BaseName",
			},
		],
		stats: [
			{
				base_stat: 45,
				stat: {
					name: "hp",
					__typename: "BaseName",
				},
				effort: 0,
				__typename: "Stat",
			},
			{
				base_stat: 49,
				stat: {
					name: "attack",
					__typename: "BaseName",
				},
				effort: 0,
				__typename: "Stat",
			},
			{
				base_stat: 49,
				stat: {
					name: "defense",
					__typename: "BaseName",
				},
				effort: 0,
				__typename: "Stat",
			},
			{
				base_stat: 65,
				stat: {
					name: "special-attack",
					__typename: "BaseName",
				},
				effort: 1,
				__typename: "Stat",
			},
			{
				base_stat: 65,
				stat: {
					name: "special-defense",
					__typename: "BaseName",
				},
				effort: 0,
				__typename: "Stat",
			},
			{
				base_stat: 45,
				stat: {
					name: "speed",
					__typename: "BaseName",
				},
				effort: 0,
				__typename: "Stat",
			},
		],
		status: true,
		height: 7,
		weight: 69,
		__typename: "Pokemon",
	},
};

export default PokemonDetail;
