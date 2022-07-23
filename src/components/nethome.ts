import styled from "styled-components";
import { motion } from "framer-motion";

export const Wrapper = styled.div`
`;
export const Loader = styled.div`
	height:20vh;
	display: flex;
	justify-content: center;
	align-items: center;
`;
export const Banner = styled.div<{bgPhoto:string}>`
	height:100vh;
	display: flex;
	flex-direction: column;
	justify-content: center;
	padding:60px;
	background-image: 
		linear-gradient(
			rgba(0,0,0,.1), rgba(0,0,0,.8)
		), 
		url( ${props => props.bgPhoto} );
	background-size: cover;
`;
export const Title = styled.h2`
	margin-bottom: 20px;
	font-size: 2.5rem;
`;
export const Overview = styled.p`
	width: 50%;
	font-size: 1.5rem;
`;

export const Slider = styled(motion.div)`
	position: relative;
	top: -150px;
	button {
		position: absolute;
		display:block;
		height:100%;
		z-index:100;
		border:0;
		background-color: transparent;
	}
`;
export const Row = styled(motion.div)`
	display: grid;
	grid-template-columns: repeat(6, 1fr);
	gap: 5px;
	position: absolute;
	width: 100%;
`;
export const Box = styled(motion.div)`
	background-color: #FFF;
	height: auto;
	color: ${props => props.theme.red};
	overflow-y: hidden;
	&:first-child {
		transform-origin: left center;
	}
	&:last-child {
		transform-origin: right center;
	}
	img {
		width:100%;
	}
`;
export const PrevBtn = styled.button`
	left:0;
`;
export const NextBtn = styled.button`
	right:0;
`;
export const Info = styled(motion.div)`
	position: absolute;
	width:100%;
	bottom:0;
	opacity: 0;
	padding: 10px;
	background-color: ${props => props.theme.black.lighter};
	h3 {
		color: ${props => props.theme.white.lighter};
		font-size:1.1rem;
		text-align: center;
	}
`;
export const Dimmed = styled(motion.div)`
	position:fixed;
	top:0;
	width:100%;
	height:100%;
	background-color: rgba(0,0,0,.5);
	opacity: 0;
`;
export const BigMovie = styled(motion.div)`
	position: fixed;
	top: 10vh;
	left: 0;
	right: 0;
	width: 40vw;
	height: 80vh;
	background-color: ${props => props.theme.black.lighter};
	margin: 0 auto;
	border-radius: 15px;
	overflow: hidden;
`;
export const BigCover = styled.div`
	width: 100%;
	height: 380px;
	background-size:cover;
	background-position: center center;
`;
export const BigTitle = styled.h3`
	color: ${props => props.theme.white.lighter};
	font-size:2rem;
	position: relative;
	top: -3rem;
	padding:0 20px;
`;
export const BigOverview = styled.p`
	padding:0 20px;
`;