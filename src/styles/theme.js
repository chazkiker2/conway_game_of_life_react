import { css } from "styled-components";
import theme from "styled-theming";

const buildHex = arr => arr.map(x => `#${x}`);

const buildPrimaryPallette = colors => {
  const hex = buildHex(colors);
  return css`
		--pDarkest: ${hex[0]};
		--pDarker: ${hex[1]};
		--pDark: ${hex[2]};
		--pBase: ${hex[3]};
		--pLight: ${hex[4]};
		--pLighter: ${hex[5]};
		--pLightest: ${hex[6]};
	`;
}

const buildThemePallette = colors => {
  const hex = buildHex(colors);
  return css`
		--tDarker: ${hex[0]};
		--tDark: ${hex[1]};
		--tBase: ${hex[2]};
		--tLight: ${hex[3]};
		--tLighter: ${hex[4]};
	`;
}

const colorSelections = {
  dark_archive: ["000000", "080708", "242525", "404342", "5c615f", "787e7c", "999f9d"],
  dark: ["000000", "080708", "080708", "242525", "5c615f", "787e7c", "999f9d"],
  light_archive: ["9ba1a8", "b9c0c7", "ced4da", "e0e4e8", "e9ecef", "f1f3f5", "f8f9fa"],
  light: ["ffffff", "ffffff", "ffffff", "F3F6FA", "F7F8FA", "F7F8FA", "F7F8FA"],
  theme: ["af0b14", "be1c1f", "da3c33", "ee5c4b", "f57463"],
}

const colorPallets = {
  dark: buildPrimaryPallette(colorSelections.dark),
  light: buildPrimaryPallette(colorSelections.light),
  theme: buildThemePallette(colorSelections.theme),
}


export const rootVars = theme("mode", {
  dark: css`
			${colorPallets.dark};
			${colorPallets.theme};
			--pText: #ffffff;
			--white: #ffffff;
			--black: #000000;
			--nLighterAlt: #faf9f8;
			--nLighter: #f3f2f1;
			--nLight: #edebe9;
			--nQuaternaryAlt: #e1dfdd;
			--nQuaternary: #d0d0d0;
			--nTertiaryAlt: #c8c6c4;
			--nTertiary: #a19f9d;
			--nSecondary: #605e5c;
			--nPrimaryAlt: #3b3a39;
			--nPrimary: #323130;
			--nDark: #201f1e;
	`,
  light: css`
			${colorPallets.light};
			${colorPallets.theme};
			--pText: #000000;
			--white: #FFF;
			--nLighterAlt: #faf9f8;
			--nLighter: #f3f2f1;
			--nLight: #edebe9;
			--nQuaternaryAlt: #e1dfdd;
			--nQuaternary: #d0d0d0;
			--nTertiaryAlt: #c8c6c4;
			--nTertiary: #a19f9d;
			--nSecondary: #605e5c;
			--nPrimaryAlt: #3b3a39;
			--nPrimary: #323130;
			--nDark: #201f1e;
	`,
});
