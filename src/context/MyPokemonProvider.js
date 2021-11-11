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

	const pokemonWithNicknameExist = (nickname, species) => {
		let found = false;
		let i = 0;
		while (!found && i < myPokemon.length) {
			if (
				myPokemon[i].nickname === nickname &&
				myPokemon[i].species === species
			) {
				found = true;
			}
			i++;
		}
		return found;
	};
	const addNewPokemon = (nickname, pokemon) => {
		try {
			const bool = pokemonWithNicknameExist(nickname, pokemon?.name);
			if (!bool) {
				let data = [
					{
						image: pokemon?.sprites?.front_default,
						nickname: nickname,
						species: pokemon?.name,
					},
				];
				saveMyPokemon(myPokemon.concat(data));
			}
			return !bool;
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
				pokemonWithNicknameExist,
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
