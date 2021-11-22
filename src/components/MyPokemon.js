import React, { useEffect, useState } from "react";
import {
	Card,
	CardImg,
	CardBody,
	CardTitle,
	Button,
	CardSubtitle,
	Modal,
	ModalHeader,
	ModalBody,
	Input,
	ModalFooter,
} from "reactstrap";
import { notify, toPascalCase } from "../utility";
import { ToastContainer } from "react-toastify";
import { useMyPokemon } from "../context/MyPokemonContext";

export const MyPokemon = () => {
	const { myPokemon, releasePokemon } = useMyPokemon();
	const [modalOpen, setModalOpen] = useState(false);
	const [currPokeIndex, setCurrPokeIndex] = useState(-1);
	const [currPokemon, setCurrPokemon] = useState(null);
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
										setModalOpen(true);
										setCurrPokeIndex(index);
										setCurrPokemon(pokemon);
									}}
								>
									Release
								</Button>
							</CardBody>
						</Card>
					);
				})}
			</div>
			<Modal isOpen={modalOpen}>
				<ModalHeader
					toggle={function noRefCheck() {
						setModalOpen(false);
						setNick("");
					}}
				>
					Are you sure you want to release this pokemon?
				</ModalHeader>
				<ModalFooter>
					<Button
						color="danger"
						onClick={() => {
							releasePokemon(currPokeIndex);
							setModalOpen(false);
							notify(
								`${currPokemon.nickname} [ ${toPascalCase(
									currPokemon.species
								)} ] is released to the wild`
							);
						}}
					>
						Release
					</Button>{" "}
					<Button
						color="grey"
						onClick={() => {
							setModalOpen(false);
						}}
					>
						Cancel
					</Button>{" "}
				</ModalFooter>
			</Modal>
			<ToastContainer />
		</div>
	);
};
