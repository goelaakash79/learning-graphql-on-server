import { Cat } from "./models/Cat";
import axios from "axios";

const fetchData = async avg => {
	const url =
		"https://api.themoviedb.org/3/movie/popular?api_key=9f1ffd64abd4bde18614fd9087d87d71&language=en-US&page=1";
	let res = await axios.get(url);
	res = res.data.results;
	res = res.filter(mv => mv.vote_average >= avg);
	return res;
};

export const resolvers = {
	Query: {
		hello: () => "hello",
		cats: () => Cat.find({}),
		movies: () => fetchData()
	},
	Mutation: {
		createCat: async (_, { name }) => {
			const kitty = new Cat({ name });
			await kitty.save();
			return kitty;
		},
		getMovies: async (_, { limit }) => {
			const data = await fetchData(limit);
			return data;
		},
		getMoviesByVoteAvg: async (_, { avg }) => {
			const data = await fetchData(avg);
			return data;
		}
	}
};
