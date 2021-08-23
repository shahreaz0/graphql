const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const schema = require("./schema/schema");

//express config
const app = express();
app.use("/graphql", graphqlHTTP({ schema, graphiql: true }));

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`http://localhost:${port}`));
