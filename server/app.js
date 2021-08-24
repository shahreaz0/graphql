const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const cors = require("cors");
if (!(process.env.NODE_ENV === "production")) require("dotenv").config();

const connectDatabase = require("./configs/db");
const schema = require("./schema/schema");
// connect db
connectDatabase();

//express config
const app = express();
app.use(cors());

//routes
app.use("/graphql", graphqlHTTP({ schema, graphiql: true }));

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`http://localhost:${port}`));
