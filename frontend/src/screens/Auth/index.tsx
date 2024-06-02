import { IonImg } from "@ionic/react";
import {
  Box,
  Button,
  Container,
  Grid,
  IconButton,
  InputAdornment,
  Link,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useState } from "react";
import styles from "./styles.module.scss";
import { Visibility, VisibilityOff } from "@mui/icons-material";

export const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const matches = useMediaQuery("(min-width:900px)");
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

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
                        Login
                      </Typography>
                      <Box sx={{ color: "#353638", fontWeight: 900 }}>
                        Bem-vindo de volta ao aplicativo
                      </Box>
                    </Box>
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      id="email"
                      label="Email"
                      name="email"
                      sx={{ background: "#F1F4FF" }}
                      autoComplete="email"
                      autoFocus
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <Box display={"flex"} justifyContent={"end"}>
                      <Link href="#">Esqueceu sua senha?</Link>
                    </Box>

                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      name="password"
                      label="Senha"
                      type="password"
                      id="password"
                      sx={{ background: "#F1F4FF" }}
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
                      href="/signUp"
                      size="large"
                      sx={{ mb: 2 }}
                    >
                      Cadastre-se
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
              height: "25vh",
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
                    sx={{ fontWeight: 900, marginTop: 2, marginBottom: 2 }}
                    variant="h4"
                  >
                    Login
                  </Typography>
                  <Box sx={{ color: "#353638", fontWeight: 900 }}>
                    Bem-vindo de volta ao aplicativo
                  </Box>
                </Box>
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
                <Box display={"flex"} justifyContent={"end"}>
                  <Link href="#">Esqueceu sua senha?</Link>
                </Box>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  sx={{ background: "#F1F4FF" }}
                  name="password"
                  label="Senha"
                  type={showPassword ? "password" : "text"}
                  id="password"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                        >
                          {!showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
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
                  size="large"
                  sx={{ mb: 2 }}
                  href="/signUp"
                >
                  Cadastre-se
                </Button>
              </Box>
            </Box>
          </Container>
        </>
      )}
    </>
  );
};
