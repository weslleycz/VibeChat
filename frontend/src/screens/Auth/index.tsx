import { IonImg } from "@ionic/react";
import {
  Alert,
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
import { isEmail } from "validator";
import { Cookies } from "../../services/cookies";
import { api } from "../../services/api";
import { useHistory } from "react-router-dom";

export const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [serverError, setServerError] = useState("");
  const history = useHistory();

  const matches = useMediaQuery("(min-width:900px)");
  const [showPassword, setShowPassword] = useState(true);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const [errors, setErrors] = useState({
    email: false,
  });

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    if (!isEmail(email)) {
      setErrors({ ...errors, email: true });
      return;
    }
    try {
      const { set } = new Cookies();
      const expirationDate = new Date();
      expirationDate.setTime(expirationDate.getTime() + 72 * 60 * 60 * 1000);
      setServerError("");
      const res = await api.post("/user/login", {
        email: email,
        password: password,
      });
      await set(res.data.token, expirationDate);
      history.push("/chat");
    } catch (error: any) {
      console.log(error);
      setServerError(error.response.data.message);
    }
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
                <form onSubmit={handleSubmit}>
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
                        {serverError === "" ? null : (
                          <Alert severity="error">{serverError}</Alert>
                        )}
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
                        onFocus={() => setErrors({ ...errors, email: false })}
                        error={errors.email}
                        helperText={errors.email ? "E-mail inválido" : ""}
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
                        id="password"
                        sx={{ background: "#F1F4FF" }}
                        autoComplete="current-password"
                        value={password}
                        type={showPassword ? "password" : "text"}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                              >
                                {showPassword ? (
                                  <VisibilityOff />
                                ) : (
                                  <Visibility />
                                )}
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
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
                </form>
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
                <form onSubmit={handleSubmit}>
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
                    {serverError === "" ? null : (
                      <Alert severity="error">{serverError}</Alert>
                    )}
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
                    id="password"
                    onFocus={() => setErrors({ ...errors, email: false })}
                    error={errors.email}
                    helperText={errors.email ? "E-mail inválido" : ""}
                    type={showPassword ? "password" : "text"}
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
                </form>
              </Box>
            </Box>
          </Container>
        </>
      )}
    </>
  );
};
