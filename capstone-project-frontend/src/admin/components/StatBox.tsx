import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../theme";

const StatBox: any = ({ title, subtitle, icon, increase }: any) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box
    //top right bottom left
      width="100%"
      m="0 20px 0 20px"
      bgcolor={"black"}
      padding="20px 30px 20px 30px"
      borderRadius={"20px"}
      maxWidth="1000px"
      maxHeight="200px"
    >
      <Box
        sx={{ display:"flex", flexDirection:"row", textAlign:"center", alignItems : "center"}}
      >
        <Box>{icon}</Box>
        <Box paddingLeft="10px">
          <Typography
            fontWeight="bold"
            sx={{ color: "white", fontSize: "2.3vw" }}
          >
            {title}
          </Typography>
        </Box>
      </Box>

      <Box display="flex" flexDirection="column" mt="2px">
        <Box>
          <Typography sx={{ color: "white", fontSize: "1.2vw" }}>
            {subtitle}
          </Typography>
        </Box>
        <Box display="flex" mt="2px">
          <Typography
            sx={{ color: "white", fontSize: "1.2vw", alignItems: "center" }}
          >
            {increase}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default StatBox;
