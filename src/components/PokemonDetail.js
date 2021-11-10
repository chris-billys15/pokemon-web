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
} from "reactstrap";
import { ToastContainer, toast } from "react-toastify";
import { useQuery } from "@apollo/react-hooks";
import { GET_POKEMON } from "../graphql/get-pokemons";
import { toPascalCase, pad } from "../utility";
import "../styles/PokemonDetail.scss";
import MyPokemonContext from "../context/MyPokemonContext";

const PokemonDetail = () => {
	const [modalOpen, setModalOpen] = useState(false);
	const [nick, setNick] = useState("");
	const [pokemon, setPokemon] = useState(null);
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
		console.log(pokemon);
		if (isCaught) {
			// showPopup
			setModalOpen(true);
		} else {
			notify(`Too bad! Pokemon got away`);
		}
	};

	const notify = (str) =>
		toast.info(str, {
			icon: ({ theme, type }) => <img width="20px" src="/pokeball.png" />,
		});

	if (error) return <div>Error</div>;
	if (loading || !data) return <div>Loading...</div>;

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
								console.log("catch me");
								catchPokemon(pokemon);
								// localStorage.setItem("my-pokemon", JSON.stringify({
								// 	pokemon
								// }))
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
							<div className="detail-container detail-container-type mt-4">
								<div className="container-title">Moves</div>
								<div className="moves-container">
									{pokemon?.moves.map((move) => {
										return <div>{move.move?.name}</div>;
									})}
								</div>
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
					}}
				>
					What is your pokemon nickname?
				</ModalHeader>
				<ModalBody>
					<Input
						placeholder="Nickname"
						onChange={(e) => setNick(e.target.value)}
					/>
				</ModalBody>
				<ModalFooter>
					<Button
						color="primary"
						disabled={nick === ""}
						onClick={() => {
							console.log(nick);
							myPokemonContext.addNewPokemon(nick, pokemon);
							//save pokemon
							setModalOpen(false);
							setNick("");
							notify(`Congratulation! Pokemon is caught`);
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
