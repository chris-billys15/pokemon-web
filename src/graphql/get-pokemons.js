import gql from "graphql-tag";

export const GET_POKEMONS = gql`
	query pokemons($limit: Int, $offset: Int) {
		pokemons(limit: $limit, offset: $offset) {
			count
			next
			previous
			nextOffset
			prevOffset
			status
			message
			results {
				id
				url
				name
				image
			}
		}
	}
`;

export const GET_POKEMON = gql`
	query pokemon($name: String!) {
		pokemon(name: $name) {
			id
			name
			sprites {
				front_default
			}
			types {
				type {
					name
				}
			}
			moves {
				move {
					url
					name
				}
			}
			stats {
				base_stat
				stat {
					name
				}
			}
			height
			weight
		}
	}
`;
