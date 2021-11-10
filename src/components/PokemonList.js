import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@apollo/react-hooks";
import { GET_POKEMONS } from "../graphql/get-pokemons";
import { Card, CardImg, CardBody, CardTitle, Button } from "reactstrap";

import { toPascalCase } from "../utility";
import "react-toastify/dist/ReactToastify.css";
import "../styles/PokemonList.scss";

const PokemonList = () => {
	const { data, error, loading, fetchMore } = useQuery(GET_POKEMONS, {
		variables: { offset: 0, limit: 20 },
	});

	const renderLoadMoreButton = () => {
		const { nextOffset } = data.pokemons;
		if (nextOffset !== 0) {
			return (
				<Button
					onClick={() => {
						const { nextOffset } = data.pokemons;
						fetchMore({
							variables: { offset: nextOffset },
							updateQuery: (prevResult, { fetchMoreResult }) => {
								fetchMoreResult.pokemons.results = [
									...prevResult.pokemons.results,
									...fetchMoreResult.pokemons.results,
								];
								return fetchMoreResult;
							},
						});
					}}
				>
					Load More
				</Button>
			);
		}
		return <></>;
	};

	if (error) return <div>Error</div>;
	if (loading || !data) return <div>Loading</div>;

	return (
		<div className="pokemonlist-page">
			<div className="pl-container">
				{data.pokemons.results.map((pokemon) => {
					return (
						<Card key={pokemon.name} className="pl-item">
							<Link to={`/pokemon/${pokemon.name}`}>
								<CardImg alt="Card image cap" src={pokemon.image} top />
							</Link>
							<CardBody>
								<Link className="link-to" to={`/pokemon/${pokemon.name}`}>
									<CardTitle className="pokemon-name">
										{toPascalCase(pokemon.name)}
									</CardTitle>
								</Link>
							</CardBody>
						</Card>
					);
				})}
			</div>
			{renderLoadMoreButton()}
		</div>
	);
};

export default PokemonList;
