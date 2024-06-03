import { Box, IconButton, Stack } from "@mui/material";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import PersonIcon from "@mui/icons-material/Person";
import LogoutIcon from "@mui/icons-material/Logout";
import { Cookies } from "../../services/cookies";
import { useHistory } from "react-router";

type StatusChat = "contatus" | "profile" | "message";

type Prosp = {
  chatStatus: StatusChat;
  setChatStatus: (valor: StatusChat) => void;
};

export const MenuPWA = ({ chatStatus, setChatStatus }: Prosp) => {
  const history = useHistory();
  const handleExit = async () => {
    const { remove } = new Cookies();
    await remove();
    history.push("/auth");
  };

  return (
    <>
      <Box
        sx={{
          borderRight: "8px solid #F3F3F3",
          display: "flex",
          bgcolor: "#1DD3C5",
        }}
        height={"100vh"}
      >
        <Box sx={{ p: 1 }}>
          <Stack spacing={2}>
            <IconButton
              style={
                chatStatus === "contatus"
                  ? { color: "#1DD3C5", background: "#ffffff" }
                  : { color: "#ffffff" }
              }
              onClick={() => setChatStatus("contatus")}
            >
              <QuestionAnswerIcon
                style={{
                  fontSize: "30px",
                }}
              />
            </IconButton>

            <IconButton
              style={
                chatStatus === "profile"
                  ? { color: "#1DD3C5", background: "#ffffff" }
                  : { color: "#ffffff" }
              }
              onClick={() => setChatStatus("profile")}
            >
              <PersonIcon
                style={{
                  fontSize: "30px",
                }}
              />
            </IconButton>

            <Box>
              <IconButton style={{ color: "#ffffff" }} onClick={handleExit}>
                <LogoutIcon
                  style={{
                    fontSize: "30px",
                  }}
                />
              </IconButton>
            </Box>
          </Stack>
        </Box>
      </Box>
    </>
  );
};
