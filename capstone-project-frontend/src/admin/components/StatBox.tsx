import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../theme";

const StatBox: any = ({ title, subtitle, icon, increase }: any) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box
      width="100%"
      m="0 30px"
      bgcolor={"black"}
      padding="30px"
      borderRadius={"20px"}
      maxWidth="1000px"
      maxHeight="200px"
    >
      <Box display="flex" flexDirection="row">
        <Box>{icon}</Box>
        <Box>
          <Box paddingLeft="10px">
            <Typography variant="h3" fontWeight="bold" sx={{ color: "white" }}>
              {title}
            </Typography>
          </Box>
        </Box>
      </Box>

      <Box display="flex" flexDirection="column" mt="2px">
        <Box>
          <Typography variant="h6" sx={{ color: "white", fontSize: 15 }}>
            {subtitle}
          </Typography>
        </Box>
        <Box display="flex" mt="2px">
          <Typography
            variant="h6"
            sx={{ color: "white", fontSize: 15, alignItems: "center" }}
          >
            {increase}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default StatBox;
