const { ApolloServer } = require("apollo-server-express");
const { typeDefs } = require("./typeDefs");
const { resolvers } = require("./resolvers");
const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();

const { PORT, MONGO_URI } = process.env;

const startServer = async () => {
	const server = new ApolloServer({
		typeDefs,
		resolvers
	});

	server.applyMiddleware({ app });

	await mongoose.connect(MONGO_URI, {
		useNewUrlParser: true,
		useUnifiedTopology: true
	});

	app.listen({ port: PORT }, () =>
		console.log(
			`🚀 Server running at http://localhost:${PORT}${server.graphqlPath}`
		)
	);
};

startServer();
