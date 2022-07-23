import styled from "styled-components";
import { Link } from "react-router-dom";
import { useRecoilState }  from "recoil";
import { isDarkAtom } from "../atoms";
import { useState } from "react";

const SubNav= styled.nav`
	position: fixed;
	right:0;
	bottom:0;
	z-index:999;
	display: flex;
	justify-content: space-between;
	padding:5px 10px;
	background-color: ${props => props.theme.black.lighter};
	color: ${props => props.theme.white.lighter};
	button {
		border:0;
		background:transparent;
	}
	svg {
		width:24px;
		height:24px;
		fill: ${props => props.theme.white.lighter};
	}
	ul {
		display: flex;
		li {
			padding:0 10px;
		}
	}
`;

const NavBar = () => {
	const [ theme, setTheme ] = useRecoilState(isDarkAtom);
	const [ menu, setMenu ] = useState(false);
	const toggleMenu = () => setMenu(prev => !prev);
	const toggleTheme = () => setTheme( (prev) => !prev)
	return (
		<>
			<SubNav>
				<button onClick={toggleMenu} title="other items">
					<svg viewBox="0 0 100 80">
						<rect width="100" height="20" rx="10"></rect>
						<rect y="30" width="100" height="20" rx="10"></rect>
						<rect y="60" width="100" height="20" rx="10"></rect>
					</svg>
				</button>
				{menu ? 
				<ul>
					<li><Link to="/coins/">Coin tracker</Link></li>
					<li><Link to="/todo/">Todo list</Link></li>
					<li><Link to="/animation/">Ani1</Link></li>
					<li><Link to="/animation2/">Ani2</Link></li>
					<li><Link to="/shared-layout/">Shared Layout</Link></li>
					<li><Link to="/">Netflix</Link></li>
				</ul>
				: null}
				<button onClick={toggleTheme} title="Toggle theme">
					{theme ? "🌞" : "🌚"}
				</button>
			</SubNav>
		</>
	);
}

export default NavBar;