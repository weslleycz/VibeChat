import {
  Alert,
  Box,
  Button,
  Modal,
  Typography,
  useMediaQuery,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useRef, useState } from "react";
import styles from "./styles.module.scss";
import AuthCode, { AuthCodeRef } from "react-auth-code-input";
import ActionSheet from "actionsheet-react";
import { api } from "../../services/api";
import { Cookies } from "../../services/cookies";
import { decodeToken } from "react-jwt";

type Props = {
  setContacts: any;
};

export const ModalAddContact = ({ setContacts }: Props) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const ref = useRef();
  const AuthInputRef = useRef<AuthCodeRef>(null);
  const [code, setCode] = useState("");
  const matches = useMediaQuery("(min-width:900px)");
  const [error, setError] = useState(false);
  const handleChange = (res: string) => {
    setError(false);
    setCode(res.toLocaleUpperCase());
  };

  const handleSubmit = async () => {
    try {
      const { get } = new Cookies();
      const tokenJWT = (await get()) as string;
      const { data } = decodeToken(tokenJWT) as any;
      const req = await api.put("/user/addContact", {
        userId: data,
        codeContact: code,
      });
      setContacts(req.data);
      if (matches) {
        handleClose();
      } else {
        ref.current.close();
      }
    } catch (error) {
      setError(true);
    }
  };

  return (
    <>
      <Box
        onClick={handleOpen}
        sx={{
          display: "flex",
          alignItems: "center",
          padding: "8px",
          borderRadius: 25,
          cursor: "pointer",
          backgroundColor: "#1DD3C5",
          color: "white",
        }}
      >
        <AddIcon fontSize="small" />
      </Box>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          className={styles.container}
          sx={{
            position: "absolute" as "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 300,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Box marginBottom={4}>
            <Typography variant="h5" gutterBottom>
              Insira o código de contato para adicionar.
            </Typography>
          </Box>

          <Box justifyContent={"center"} display={"flex"}>
            <Box marginBottom={4}>
              <AuthCode
                inputClassName={styles["input-code"]}
                autoFocus
                length={5}
                onChange={handleChange}
                ref={AuthInputRef}
              />
              {error ? (
                <Alert sx={{ marginTop: 2 }} severity="error">
                  Contato não encontrado.
                </Alert>
              ) : null}
            </Box>
          </Box>

          <Button onClick={handleSubmit} fullWidth variant="contained">
            Adicionar
          </Button>
        </Box>
      </Modal>
    </>
  );
};
