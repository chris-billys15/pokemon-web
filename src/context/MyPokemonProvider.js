import React, { useEffect, useState } from "react";
import MyPokemonContext from "./MyPokemonContext";

const MyPokemonProvider = ({ children }) => {
	const [myPokemon, setMyPokemon] = useState(null);
	const storage = localStorage.getItem("my-pokemon");
	useEffect(() => {
		if (!myPokemon) {
			if (storage) {
				setMyPokemon(JSON.parse(storage));
			} else {
				setMyPokemon([]);
			}
		}
	}, []);

	const saveMyPokemon = (value) => {
		if (value) {
			localStorage.setItem("my-pokemon", JSON.stringify(value));
			setMyPokemon(value);
		}
	};

	const addNewPokemon = (nickname, pokemon) => {
		try {
			console.log("add new pokemon");
			console.log(pokemon);
			console.log("mypokemon: ", myPokemon);
			let data = [
				{
					image: pokemon?.sprites?.front_default,
					nickname: nickname,
					species: pokemon?.name,
				},
			];
			saveMyPokemon(data);
		} catch (e) {
			console.log(e);
		}
	};

	const releasePokemon = (index) => {
		let data = JSON.parse(JSON.stringify(myPokemon));
		data.splice(index, 1);
		saveMyPokemon(data);
	};
	return (
		<MyPokemonContext.Provider
			value={{
				myPokemon,
				setMyPokemon,
				saveMyPokemon,
				addNewPokemon,
				releasePokemon,
			}}
		>
			{children}
		</MyPokemonContext.Provider>
	);
};

export default MyPokemonProvider;
