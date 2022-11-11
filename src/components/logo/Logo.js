import PropTypes from "prop-types";
import { forwardRef } from "react";
import { Link as RouterLink } from "react-router-dom";
// @mui
import { useTheme } from "@mui/material/styles";
import { Box, Link } from "@mui/material";

// ----------------------------------------------------------------------

const Logo = forwardRef(({ disabledLink = false, sx, ...other }, ref) => {
  const theme = useTheme();

  const PRIMARY_LIGHT = theme.palette.primary.light;

  const PRIMARY_MAIN = theme.palette.primary.main;

  const PRIMARY_DARK = theme.palette.primary.dark;

  // OR using local (public folder)
  // -------------------------------------------------------
  // const logo = (
  //   <Box
  //     component="img"
  //     src="/logo/logo_single.svg" => your path
  //     sx={{ width: 40, height: 40, cursor: 'pointer', ...sx }}
  //   />
  // );

  const logo = (
    <Box
      ref={ref}
      component="div"
      sx={{
        width: 100,
        height: 100,
        display: "inline-flex",
        ...sx,
      }}
      {...other}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        version="1.0"
        width="100"
        height="100"
        viewBox="0 0 512.000000 512.000000"
        preserveAspectRatio="xMidYMid meet"
      >
        <g transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)" fill="#ed1b24" stroke="none">
          <path d="M4118 4670 c-140 -24 -248 -80 -349 -182 -193 -193 -225 -518 -74 -753 76 -119 245 -236 383 -264 132 -27 292 -4 417 62 87 46 203 164 249 254 84 167 89 363 13 533 -107 240 -385 393 -639 350z" />
          <path d="M1750 3806 c-484 -77 -894 -339 -1167 -746 -329 -492 -367 -1144 -97 -1682 231 -462 674 -798 1181 -898 141 -28 377 -37 520 -20 915 108 1581 938 1482 1848 -55 514 -329 959 -764 1245 -171 112 -405 206 -605 242 -126 23 -434 29 -550 11z m485 -739 c337 -96 597 -357 687 -689 30 -110 33 -366 5 -466 -102 -372 -384 -644 -744 -718 -105 -22 -340 -15 -438 13 -204 58 -366 162 -491 316 -143 176 -224 397 -224 612 0 130 44 314 103 430 127 252 379 448 657 510 83 19 371 14 445 -8z" />
        </g>
      </svg>
    </Box>
  );

  if (disabledLink) {
    return <>{logo}</>;
  }

  return (
    <Link to="/" component={RouterLink} sx={{ display: "contents" }}>
      {logo}
    </Link>
  );
});

Logo.propTypes = {
  sx: PropTypes.object,
  disabledLink: PropTypes.bool,
};

export default Logo;
