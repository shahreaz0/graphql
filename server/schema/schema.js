const graphgl = require("graphql");

//models
const Book = require("../models/Book");
const Author = require("../models/Author");

const {
	GraphQLObjectType,
	GraphQLString,
	GraphQLSchema,
	GraphQLID,
	GraphQLInt,
	GraphQLList,
} = graphgl;

// Types
const BookType = new GraphQLObjectType({
	name: "Book",
	fields: () => ({
		id: { type: GraphQLID },
		name: { type: GraphQLString },
		genre: { type: GraphQLString },
		author: {
			type: AuthorType,
			resolve(parent, args) {
				return Author.findById(parent.authorId);
			},
		},
	}),
});

const AuthorType = new GraphQLObjectType({
	name: "Author",
	fields: () => ({
		id: { type: GraphQLID },
		name: { type: GraphQLString },
		age: { type: GraphQLInt },
		books: {
			type: new GraphQLList(BookType),
			resolve(parent, args) {
				return Book.find({ authorId: parent.id });
			},
		},
	}),
});

// Queries
const RootQuery = new GraphQLObjectType({
	name: "rootQueryType",
	fields: {
		book: {
			type: BookType,
			args: { id: { type: GraphQLID } },
			resolve(parent, args) {
				return Book.findById(args.id);
			},
		},
		author: {
			type: AuthorType,
			args: { id: { type: GraphQLID } },
			resolve(parent, args) {
				return Author.findById(args.id);
			},
		},
		books: {
			type: new GraphQLList(BookType),
			resolve(parent, args) {
				return Book.find();
			},
		},
		authors: {
			type: new GraphQLList(AuthorType),
			resolve(parent, args) {
				return Author.find();
			},
		},
	},
});

// Mutation
const Mutation = new GraphQLObjectType({
	name: "Mutation",
	fields: {
		addAuthor: {
			type: AuthorType,
			args: {
				name: { type: GraphQLString },
				age: { type: GraphQLInt },
			},
			resolve(parent, args) {
				const author = new Author({
					name: args.name,
					age: args.age,
				});
				return author.save();
			},
		},
		addBook: {
			type: BookType,
			args: {
				name: { type: GraphQLString },
				genre: { type: GraphQLString },
				authorId: { type: GraphQLID },
			},
			resolve(parent, args) {
				const book = new Book(args);
				return book.save();
			},
		},
	},
});

module.exports = new GraphQLSchema({
	query: RootQuery,
	mutation: Mutation,
});
