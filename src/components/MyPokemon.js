import React, { useEffect, useState } from "react";
import {
	Card,
	CardImg,
	CardBody,
	CardTitle,
	Button,
	CardSubtitle,
} from "reactstrap";
import { notify, toPascalCase } from "../utility";
import { ToastContainer } from "react-toastify";
import { useMyPokemon } from "../context/MyPokemonContext";

export const MyPokemon = () => {
	const { myPokemon, releasePokemon } = useMyPokemon();
	if (!myPokemon) return <div>Loading...</div>;
	if (myPokemon.length === 0) {
		return (
			<div className="pokemonlist-page">
				<img
					className="empty-img"
					width="50%"
					src={process.env.PUBLIC_URL + "/empty.jpg"}
				/>
				<div className="empty-text">No Pokemon Yet</div>
			</div>
		);
	}
	return (
		<div className="pokemonlist-page">
			<div className="pl-container">
				{myPokemon.map((pokemon, index) => {
					return (
						<Card key={pokemon.nickname} className="pl-item">
							<CardImg alt="Card image cap" src={pokemon.image} top />
							<CardBody>
								<CardTitle className="pokemon-name">
									{pokemon.nickname}
								</CardTitle>
								<CardSubtitle className="pokemon-species">
									[ {toPascalCase(pokemon.species)} ]
								</CardSubtitle>
								<Button
									className="load-btn"
									color="danger"
									onClick={() => {
										releasePokemon(index);
										notify(
											`${pokemon.nickname} [ ${toPascalCase(
												pokemon.species
											)} ] is released to the wild`
										);
									}}
								>
									Release
								</Button>
							</CardBody>
						</Card>
					);
				})}
			</div>
			<ToastContainer />
		</div>
	);
};
