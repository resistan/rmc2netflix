import { createGlobalStyle, DefaultTheme } from "styled-components";

const movieColors = {
	red: "#e51013",
	black: {
		veryDark: "#141414",
		darker: "#181818",
		lighter: "#2f2f2f",
	},
	white: {
		lighter: "#fff",
		darker: "#e5e5e5"
	}
}

export const theme:DefaultTheme = {
	textColor: "#2c3e50",
	bgColor: "#ecf0f1",
	accentColor: "#c0392b",
	red: movieColors.red,
	black: movieColors.black,
	white: movieColors.white
}
export const darkTheme:DefaultTheme = {
	textColor: "#FFF",
	bgColor: "#111",
	accentColor: "teal",
	red: movieColors.red,
	black: movieColors.black,
	white: movieColors.white
}



export const GlobalStyle = createGlobalStyle`
@import url('https://fonts.googleapis.com/css?family=Source+Sans+Pro:400,700&display=swap');
* {
  box-sizing: border-box;
}
html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed, 
figure, figcaption, footer, header, hgroup, 
menu, nav, output, ruby, section, summary,
time, mark, audio, video {
	margin: 0;
	padding: 0;
	border: 0;
	font-size: 100%;
	font: inherit;
	vertical-align: baseline;
}
article, aside, details, figcaption, figure, footer, header, hgroup, menu, nav, section {
	display: block;
}
body {
  font-family: 'Source Sans Pro', sans-serif;
	line-height: 1.2;
  font-weight: 400;
  background-color: ${props => props.theme.bgColor};
  color: ${props => props.theme.textColor};
}
ol, ul {
	list-style: none;
}
blockquote, q {
	quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
	content: '';
	content: none;
}
table {
	border-collapse: collapse;
	border-spacing: 0;
}
a {
  text-decoration: none;
  color: inherit;
}
`;