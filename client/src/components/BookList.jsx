import React from "react";
import { useQuery, gql } from "@apollo/client";

const GET_ALL_BOOKS = gql`
	{
		books {
			name
			genre
		}
	}
`;

const BookList = (props) => {
	const { loading, error, data } = useQuery(GET_ALL_BOOKS);

	if (loading) return <p>Loading...</p>;
	if (error) return <p>Error :(</p>;

	const lis = data.books.map((book, key) => (
		<li key={key}>
			{book.name} - {book.genre}
		</li>
	));
	console.log(data);
	return (
		<div id="book-list">
			<ul>{lis}</ul>
		</div>
	);
};

export default BookList;
