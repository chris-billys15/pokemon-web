import {
	BrowserRouter as Router,
	Routes,
	Route,
	Navigate,
} from "react-router-dom";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";
import MyPokemonProvider from "./context/MyPokemonProvider";
import PokemonList from "../src/components/PokemonList";
import PokemonDetail from "../src/components/PokemonDetail";
import { MyPokemon } from "../src/components/MyPokemon";
import { NavbarComponent } from "../src/components/Navbar";
import "./App.css";
import { useContext, useEffect } from "react";
import MyPokemonContext from "./context/MyPokemonContext";

function App() {
	const client = new ApolloClient({
		uri: "https://graphql-pokeapi.graphcdn.app",
	});
	return (
		<ApolloProvider client={client}>
			<div className="App">
				<Router>
					<NavbarComponent />
					<Routes>
						<Route
							path={`${process.env.PUBLIC_URL}/`}
							element={<PokemonList />}
						></Route>
						<Route
							path={`${process.env.PUBLIC_URL}/pokemon/:name`}
							element={<PokemonDetail />}
						></Route>
						<Route
							path={`${process.env.PUBLIC_URL}/mypokemon`}
							element={<MyPokemon />}
						></Route>
						{/* <Route
							path={`${process.env.PUBLIC_URL}/:any`}
							element={<Navigate to={`${process.env.PUBLIC_URL}/`}></Navigate>}
						></Route> */}
					</Routes>
				</Router>
			</div>
		</ApolloProvider>
	);
}

export default App;
