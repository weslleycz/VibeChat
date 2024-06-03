import LogoutIcon from "@mui/icons-material/Logout";
import PersonIcon from "@mui/icons-material/Person";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import { Box, IconButton } from "@mui/material";
import { useHistory } from "react-router-dom";
import { Cookies } from "../../services/cookies";

type StatusChat = "contatus" | "profile" | "message";

type Prosp = {
  chatStatus: StatusChat;
  setChatStatus: (valor: StatusChat) => void;
};

export const MenuMobile = ({ chatStatus, setChatStatus }: Prosp) => {
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
          position: "fixed",
          bottom: 0,
          width: "95%",
          padding: "2%",
          zIndex: 0,
          display: "flex",
        }}
      >
        <Box
          sx={{
            width: "100%",
            p: 2,
            marginBottom: 1,
            borderRadius: 5,
            justifyContent: "space-around",
          }}
          display={"flex"}
          bgcolor={"#1DD3C5"}
        >
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

          <IconButton onClick={handleExit} style={{ color: "#ffffff" }}>
            <LogoutIcon
              style={{
                fontSize: "30px",
              }}
            />
          </IconButton>
        </Box>
      </Box>
    </>
  );
};
