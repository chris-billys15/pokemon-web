import React, { useEffect, useState } from "react";
import {
	Card,
	CardImg,
	CardBody,
	CardTitle,
	Button,
	CardSubtitle,
} from "reactstrap";
import { toPascalCase } from "../utility";
import { useMyPokemon } from "../context/MyPokemonContext";

export const MyPokemon = () => {
	const { myPokemon, releasePokemon } = useMyPokemon();
	if (!myPokemon) return <div>Loading...</div>;
	return (
		<div className="pokemonlist-page">
			<div className="pl-container">
				{myPokemon.map((pokemon, index) => {
					return (
						<Card key={pokemon.nick} className="pl-item">
							<CardImg alt="Card image cap" src={pokemon.image} top />
							<CardBody>
								<CardTitle className="pokemon-name">
									{toPascalCase(pokemon.nickname)}
								</CardTitle>
								<CardSubtitle>{toPascalCase(pokemon.species)}</CardSubtitle>
								<Button
									onClick={() => {
										releasePokemon(index);
									}}
								>
									Release
								</Button>
							</CardBody>
						</Card>
					);
				})}
			</div>
		</div>
	);
};
