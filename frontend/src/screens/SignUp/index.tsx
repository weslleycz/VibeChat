import { IonImg } from "@ionic/react";
import {
  Box,
  Button,
  Container,
  Grid,
  Link,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useState } from "react";
import styles from "./styles.module.scss";

export const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const matches = useMediaQuery("(min-width:900px)");

  const handleSubmit = (event: any) => {
    event.preventDefault();
    console.log("Email:", email);
    console.log("Password:", password);
  };

  return (
    <>
      {matches ? (
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid xs={6}>
            <Box
              sx={{
                height: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
              bgcolor={"#1DD3C5"}
            >
              <IonImg className={styles.logo} src="./logo.svg" />
            </Box>
          </Grid>
          <Grid xs={6}>
            <Box sx={{ height: "100vh" }}>
              <Container maxWidth="sm">
                <Box
                  sx={{ height: "100vh" }}
                  alignItems={"center"}
                  display={"flex"}
                >
                  <Box>
                    <Box>
                      <Typography
                        sx={{ fontWeight: 900, marginBottom: 1 }}
                        variant="h4"
                      >
                        Cadastre-se
                      </Typography>
                      <Box sx={{ color: "#353638", fontWeight: 900 }}>
                        Crie uma conta para poder explorar o aplicativo
                      </Box>
                    </Box>
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      sx={{ background: "#F1F4FF" }}
                      label="Nome"
                      autoFocus
                    />
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      id="email"
                      sx={{ background: "#F1F4FF" }}
                      label="Email"
                      name="email"
                      autoComplete="email"
                      autoFocus
                    />

                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      sx={{ background: "#F1F4FF" }}
                      name="password"
                      label="Senha"
                      type="password"
                      id="password"
                      autoComplete="current-password"
                    />
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      sx={{ background: "#F1F4FF" }}
                      name="password"
                      label="Confirmar Senha"
                      type="password"
                      id="password"
                      autoComplete="current-password"
                    />
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      size="large"
                      sx={{ mt: 3, mb: 2 }}
                    >
                      Entrar
                    </Button>
                    <Button
                      fullWidth
                      variant="outlined"
                      href="/auth"
                      size="large"
                      sx={{ mb: 2 }}
                    >
                      Já tenho uma conta
                    </Button>
                  </Box>
                </Box>
              </Container>
            </Box>
          </Grid>
        </Grid>
      ) : (
        <>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "20vh",
            }}
            bgcolor={"#1DD3C5"}
          >
            <IonImg className={styles["logo-mobile"]} src="./logo.svg" />
          </Box>
          <Container maxWidth="sm">
            <Box sx={{ height: "100vh" }} display={"flex"}>
              <Box>
                <Box>
                  <Typography
                    sx={{ fontWeight: 900, marginTop: 2, marginBottom: 1 }}
                    variant="h4"
                  >
                    Cadastre-se
                  </Typography>
                  <Box sx={{ color: "#353638", fontWeight: 900 }}>
                    Crie uma conta para poder explorar o aplicativo
                  </Box>
                </Box>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  sx={{ background: "#F1F4FF" }}
                  label="Nome"
                  autoFocus
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  sx={{ background: "#F1F4FF" }}
                  label="Email"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />

                <TextField
                  margin="normal"
                  required
                  fullWidth
                  sx={{ background: "#F1F4FF" }}
                  name="password"
                  label="Senha"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  sx={{ background: "#F1F4FF" }}
                  name="password"
                  label="Confirmar Senha"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  size="large"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Entrar
                </Button>
                <Button
                  fullWidth
                  variant="outlined"
                  href="/auth"
                  size="large"
                  sx={{ mb: 2 }}
                >
                  Já tenho uma conta
                </Button>
              </Box>
            </Box>
          </Container>
        </>
      )}
    </>
  );
};
