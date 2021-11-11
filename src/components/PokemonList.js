import React from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@apollo/react-hooks";
import { GET_POKEMONS } from "../graphql/get-pokemons";
import {
	Card,
	CardImg,
	CardBody,
	CardTitle,
	Button,
	Spinner,
	CardSubtitle,
} from "reactstrap";
import { pad, toPascalCase } from "../utility";
import "react-toastify/dist/ReactToastify.css";
import "../styles/PokemonList.scss";

const PokemonList = () => {
	const { data, error, loading, fetchMore } = useQuery(GET_POKEMONS, {
		variables: { offset: 0, limit: 20 },
	});

	const renderLoadMoreButton = () => {
		const { nextOffset } = data.pokemons;
		if (nextOffset !== 0) {
			return (
				<Button
					className="load-btn"
					color="danger"
					onClick={() => {
						const { nextOffset } = data.pokemons;
						fetchMore({
							variables: { offset: nextOffset },
							updateQuery: (prevResult, { fetchMoreResult }) => {
								fetchMoreResult.pokemons.results = [
									...prevResult.pokemons.results,
									...fetchMoreResult.pokemons.results,
								];
								return fetchMoreResult;
							},
						});
					}}
				>
					<div>Load more</div>
				</Button>
			);
		}
		return <></>;
	};

	if (error) return <div>Error</div>;
	if (loading || !data)
		return (
			<div className="pokemonlist-page">
				<Spinner className="align-self-center" color="warning" type="grow" />
			</div>
		);

	return (
		<div className="pokemonlist-page">
			<div className="pl-container">
				{data.pokemons.results.map((pokemon) => {
					return (
						<Card key={pokemon.name} className="pl-item">
							<Link to={`${process.env.PUBLIC_URL}/pokemon/${pokemon.name}`}>
								<CardImg
									placeholder="/pokeball.png"
									alt="Card image cap"
									src={pokemon.image}
									top
								/>
							</Link>
							<CardBody>
								<Link
									className="link-to"
									to={`${process.env.PUBLIC_URL}/pokemon/${pokemon.name}`}
								>
									<CardTitle className="pokemon-name">
										{pad(pokemon.id, 3)}
									</CardTitle>
									<CardSubtitle className="pokemon-species list-page">
										{toPascalCase(pokemon.name)}
									</CardSubtitle>
								</Link>
							</CardBody>
						</Card>
					);
				})}
			</div>
			{renderLoadMoreButton()}
		</div>
	);
};

export default PokemonList;
