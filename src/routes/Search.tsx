import { Helmet } from "react-helmet";
import { useLocation } from "react-router-dom";

const Search = () => {
	const location = useLocation();
	const keyword = new URLSearchParams(location.search).get("keyword")
	console.log(keyword)
	return (
		<>
			<Helmet>
				<title>Search</title>
			</Helmet>
			<h1>Search</h1>
		</>
	)
}

export default Search;