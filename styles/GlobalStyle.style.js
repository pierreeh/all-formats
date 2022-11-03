import { createGlobalStyle } from 'styled-components'

import { primaryColors } from 'components/commons/Theme'

export function rem(pixel) {
	return `${pixel / 16}rem`
}

export const GlobalStyle = createGlobalStyle`
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
	/* HTML5 display-role reset for older browsers */
	article, aside, details, figcaption, figure, 
	footer, header, hgroup, menu, nav, section {
		display: block;
	}
	body {
		line-height: 1.4;
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

	*,
	*:before,
	*:after {
		box-sizing: border-box;
	}

	/* -------------------------------------- */
	::root {
		font-size: ${rem(16)};
	}

	html {
		font-family: 'Poppins', sans-serif;
		color: ${primaryColors.primaryText};
	}

	html,
	body {
		height: 100%;
	}

	#__next {
		min-height: 100%;
		display: grid;
		grid-template-rows: 1fr auto;
	}

	img {
		height: auto;
		max-width: 100%;
		display: block;
	}
`