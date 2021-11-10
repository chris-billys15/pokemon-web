import { createContext, useContext } from "react";

const intialContext = {
	myPokemon: [],
};

const MyPokemonContext = createContext(intialContext);

export const useMyPokemon = () => useContext(MyPokemonContext);

export default MyPokemonContext;
