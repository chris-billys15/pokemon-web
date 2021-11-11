import {
	BrowserRouter as Router,
	Routes,
	Route,
	Navigate,
} from "react-router-dom";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";
import PokemonList from "../src/components/PokemonList";
import PokemonDetail from "../src/components/PokemonDetail";
import { MyPokemon } from "../src/components/MyPokemon";
import { NavbarComponent } from "../src/components/Navbar";
import "./App.css";
import { useEffect } from "react";

function App() {
	const client = new ApolloClient({
		uri: "https://graphql-pokeapi.graphcdn.app",
	});
	useEffect(() => {
		console.log(process.env.PUBLIC_URL);
	});
	return (
		<ApolloProvider client={client}>
			<div className="App">
				<Router>
					<NavbarComponent />
					<Routes>
						<Route path={`/`} element={<PokemonList />}></Route>
						<Route path={`/pokemon/:name`} element={<PokemonDetail />}></Route>
						<Route path={`/mypokemon`} element={<MyPokemon />}></Route>
						<Route
							path={`/:any`}
							element={<Navigate to={`/`}></Navigate>}
						></Route>
					</Routes>
				</Router>
			</div>
		</ApolloProvider>
	);
}

export default App;
