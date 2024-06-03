import { Box, IconButton } from "@mui/material";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";

export const MenuPWA = () => {
  return (
    <>
      <Box
        sx={{
          borderRight: "8px solid #F3F3F3",
        }}
        p={1}
        height={"100vh"}
      >
        <IconButton color="primary">
          <QuestionAnswerIcon />
        </IconButton>
      </Box>
    </>
  );
};
