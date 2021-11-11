import React, { useContext, useState } from "react";
import { useParams } from "react-router";
import {
	CardImg,
	Button,
	Modal,
	ModalHeader,
	ModalBody,
	Input,
	ModalFooter,
	FormFeedback,
	Spinner,
} from "reactstrap";
import { useQuery } from "@apollo/react-hooks";
import { GET_POKEMON } from "../graphql/get-pokemons";
import { toPascalCase, pad, notify } from "../utility";
import { ToastContainer } from "react-toastify";
import MyPokemonContext from "../context/MyPokemonContext";
import "../styles/PokemonDetail.scss";

const PokemonDetail = () => {
	const [modalOpen, setModalOpen] = useState(false);
	const [nick, setNick] = useState("");
	const [pokemon, setPokemon] = useState(null);
	const [invalidInput, setInvalidInput] = useState(false);
	const { name } = useParams();
	const myPokemonContext = useContext(MyPokemonContext);

	const { data, loading, error } = useQuery(GET_POKEMON, {
		variables: { name: name },
	});

	React.useEffect(() => {
		if (data) {
			setPokemon(data.pokemon);
		}
	}, [data]);

	const catchPokemon = (pokemon) => {
		let isCaught = Math.random() < 0.5;
		if (isCaught) {
			setModalOpen(true);
		} else {
			notify(`Too bad! Pokemon got away`);
		}
	};

	if (error) return <div>Error</div>;
	if (loading || !data)
		return (
			<div className="pokemondetail-page">
				<Spinner className="align-self-center" color="warning" type="grow" />
			</div>
		);

	return (
		<div className="pokemondetail-page">
			<div className="pd-content">
				<div className="poke-name">
					{`${toPascalCase(pokemon?.name)} ${pad(pokemon?.id, 3)}`}{" "}
				</div>
				<div className="pokemondetail-container">
					<div className="d-flex flex-column flex-grow-1">
						<CardImg
							placeholder="/pokeball.png"
							className="poke-img"
							src={pokemon?.sprites?.front_default}
						/>
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
						<Button
							className="btn-catch"
							color="danger"
							onClick={() => {
								catchPokemon(pokemon);
							}}
						>
							Catch Me
						</Button>
					</div>
					<div className="right-container flex-grow-1 ">
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
								<div className="container-title">Types</div>
								<div className="type-container">
									{pokemon?.types.map((item) => {
										return (
											<div
												className={`poke-type ${item.type.name}-type`}
											>{`${toPascalCase(item.type.name).replace(
												"-",
												" "
											)}`}</div>
										);
									})}
								</div>
							</div>
							<div className="detail-container detail-container-type mt-4">
								<div className="container-title">Moves</div>
								<ul className="moves-container">
									{pokemon?.moves.map((move) => {
										return (
											<li className="text-left">
												{toPascalCase(move.move?.name)}
											</li>
										);
									})}
								</ul>
							</div>
						</div>
					</div>
				</div>
			</div>
			{/* modal  */}
			<Modal isOpen={modalOpen}>
				<ModalHeader
					toggle={function noRefCheck() {
						setModalOpen(false);
						setNick("");
					}}
				>
					What is your pokemon nickname?
				</ModalHeader>
				<ModalBody>
					<Input
						placeholder="Nickname"
						onChange={(e) => setNick(e.target.value)}
						invalid={invalidInput}
					/>
					<FormFeedback>
						Oh no! The same pokemon with that nickname is already exist!
					</FormFeedback>
				</ModalBody>
				<ModalFooter>
					<Button
						color="primary"
						disabled={nick === ""}
						onClick={() => {
							const success = myPokemonContext.addNewPokemon(nick, pokemon);
							setInvalidInput(!success);
							if (success) {
								setModalOpen(false);
								setNick("");
								notify(`Congratulation! Pokemon is caught`);
							}
						}}
					>
						Rename
					</Button>{" "}
				</ModalFooter>
			</Modal>
			<ToastContainer />
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
export default PokemonDetail;
