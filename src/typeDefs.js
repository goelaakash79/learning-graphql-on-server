const { gql } = require("apollo-server-express");

export const typeDefs = gql`
	type Query {
		hello: String!
		cats: [Cat!]!
		movies: [Movie]
	}

	type Movie {
		title: String!
		vote_average: Float
		overview: String
		popularity: Float
		vote_count: Int
		id: String
		adult: Boolean
		poster_path: String
	}

	type Cat {
		id: ID!
		name: String!
	}

	type Mutation {
		createCat(name: String!): Cat!
		getMovies(limit: Int): [Movie]
		getMoviesByVoteAvg(avg: Int): [Movie]
	}
`;
