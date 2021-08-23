const graphgl = require("graphql");
const { GraphQLObjectType, GraphQLString, GraphQLSchema } = graphgl;

let books = [
	{ name: "Name of the wind", genre: "Fantasy", id: "1" },
	{ name: "The final empire", genre: "Fantasy", id: "2" },
	{ name: "The long earth", genre: "Sci-Fi", id: "3" },
];

const BookType = new GraphQLObjectType({
	name: "Book",
	fields: () => ({
		id: { type: GraphQLString },
		name: { type: GraphQLString },
		genre: { type: GraphQLString },
	}),
});

const RootQuery = new GraphQLObjectType({
	name: "rootQueryType",
	fields: {
		book: {
			type: BookType,
			args: { id: { type: GraphQLString } },
			resolve(parent, args) {
				const data = books.filter((book) => book.id === args.id);
				// console.log(data);
				return data[0];
			},
		},
	},
});

module.exports = new GraphQLSchema({
	query: RootQuery,
});
