import typeDefs from "./src/schema";
import resolvers from "./src/resolvers";

import express from 'express';
import  { ApolloServer } from "apollo-server-express";

const server = new ApolloServer( {
    typeDefs,
    resolvers,
});

const app = express();

server.start().then( () => {
    server.applyMiddleware({ app });
    app.get("*", (_: any, res: { redirect: (arg0: string) => void; }) => {
        res.redirect("/graphql");
    });

    app.listen( process.env.PORT || 3000,() =>
        console.log(`🚀 Server ready at http://localhost:${process.env.PORT || 3000}${server.graphqlPath}`)
    );
})

