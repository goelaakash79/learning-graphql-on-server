const { ApolloServer } = require("apollo-server-express");
const { typeDefs } = require("./typeDefs");
const { resolvers } = require("./resolvers");
const express = require("express");
const app = express();
const mongoose = require("mongoose");

const startServer = async () => {
	const server = new ApolloServer({
		typeDefs,
		resolvers
	});

	server.applyMiddleware({ app });

	await mongoose.connect("mongodb://localhost:27017/graphql-demo-db", {
		useNewUrlParser: true,
		useUnifiedTopology: true
	});

	app.listen({ port: 4000 }, () =>
		console.log(
			`🚀 Server ready at http://localhost:4000${server.graphqlPath}`
		)
	);
};

startServer();
