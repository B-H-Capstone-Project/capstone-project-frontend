import { Typography, Box, useTheme } from "@mui/material";
import { string } from "yup";
import { tokens } from "../theme";

interface TitleProps {
  title: string;
  subtitle: string;
}

const Title: React.FC<TitleProps> = ({ title, subtitle }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Box mb="30px">
      <Typography
        variant="h3"
        color={colors.grey[100]}
        fontWeight="bold"
        sx={{ m: "0 0 5px 0" }}
      >
        {title}
      </Typography>
      <Typography variant="h6" color={"#3CB045"}>
        {subtitle}
      </Typography>
    </Box>
  );
};

export default Title;
