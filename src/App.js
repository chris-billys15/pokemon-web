import {
	BrowserRouter as Router,
	Routes,
	Route,
	Navigate,
} from "react-router-dom";
import { PokemonList } from "../src/components/PokemonList";
import { PokemonDetail } from "../src/components/PokemonDetail";
import { MyPokemon } from "../src/components/MyPokemon";
import { NavbarComponent } from "../src/components/Navbar";
import "./App.css";

function App() {
	return (
		<div className="App">
			<Router>
				<NavbarComponent />
				<Routes>
					<Route path="/" element={<PokemonList />}></Route>
					<Route path="/pokemon/:id" element={<PokemonDetail />}></Route>
					<Route path="/mypokemon" element={<MyPokemon />}></Route>
					<Route path="/:any" element={<Navigate to="/"></Navigate>}></Route>
				</Routes>
			</Router>
		</div>
	);
}

export default App;
