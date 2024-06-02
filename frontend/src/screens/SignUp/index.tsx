import { IonImg } from "@ionic/react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Alert,
  Box,
  Button,
  Container,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useState } from "react";
import styles from "./styles.module.scss";
import { isEmail } from "validator";
import { api } from "../../services/api";
import { Cookies } from "../../services/cookies";

export const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirme, setPasswordConfirme] = useState("");

  const [errors, setErrors] = useState({
    name: false,
    email: false,
    password: false,
    passwordConfirme: false,
  });

  const [serverError, setServerError] = useState("");

  const matches = useMediaQuery("(min-width:900px)");

  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirme, setShowPasswordConfirme] = useState(false);

  const handleClickShowPasswordConfirme = () =>
    setShowPasswordConfirme((show) => !show);
  const handleMouseDownPasswordConfirme = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    if (name === "") {
      setErrors({ ...errors, name: true });
      return;
    }
    if (!isEmail(email)) {
      setErrors({ ...errors, email: true });
      return;
    }
    if (password === "") {
      setErrors({ ...errors, password: true });
      return;
    }

    if (passwordConfirme === "") {
      setErrors({ ...errors, password: true });
      return;
    }

    if (!(passwordConfirme === password)) {
      setErrors({ ...errors, passwordConfirme: true });
      return;
    }
    try {
      const { set } = new Cookies();
      const expirationDate = new Date();
      expirationDate.setTime(expirationDate.getTime() + 72 * 60 * 60 * 1000);
      const res = await api.post("/user", {
        name: name,
        email: email,
        password: password,
        confirmPassword: passwordConfirme,
      });
      await set(res.data.token, expirationDate);
    } catch (error: any) {
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
            <form onSubmit={handleSubmit}>
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
                        onFocus={() => setErrors({ ...errors, name: false })}
                        onChange={(e) => setName(e.target.value)}
                        error={errors.name}
                        helperText={errors.name ? "Digite o seu nome" : ""}
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
                        onChange={(e) => setEmail(e.target.value)}
                        onFocus={() => setErrors({ ...errors, email: false })}
                        error={errors.email}
                        helperText={errors.email ? "E-mail inválido" : ""}
                        autoFocus
                      />

                      <TextField
                        margin="normal"
                        required
                        fullWidth
                        sx={{ background: "#F1F4FF" }}
                        name="password"
                        label="Senha"
                        id="password"
                        type={showPassword ? "password" : "text"}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                              >
                                {!showPassword ? (
                                  <Visibility />
                                ) : (
                                  <VisibilityOff />
                                )}
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                        onChange={(e) => setPassword(e.target.value)}
                        onFocus={() =>
                          setErrors({ ...errors, password: false })
                        }
                        error={errors.password}
                        helperText={
                          errors.password ? "Por favor, insira sua senha." : ""
                        }
                        autoComplete="current-password"
                      />
                      <TextField
                        margin="normal"
                        required
                        fullWidth
                        sx={{ background: "#F1F4FF" }}
                        name="password"
                        label="Confirmar Senha"
                        type={showPasswordConfirme ? "password" : "text"}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPasswordConfirme}
                                onMouseDown={handleMouseDownPasswordConfirme}
                              >
                                {!showPasswordConfirme ? (
                                  <Visibility />
                                ) : (
                                  <VisibilityOff />
                                )}
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                        id="password"
                        onChange={(e) => setPasswordConfirme(e.target.value)}
                        onFocus={() =>
                          setErrors({ ...errors, passwordConfirme: false })
                        }
                        error={errors.passwordConfirme}
                        helperText={
                          errors.passwordConfirme
                            ? "Parece que as senhas não coincidem."
                            : ""
                        }
                        autoComplete="current-password"
                      />
                      {serverError === "" ? null : (
                        <Alert severity="error">{serverError}</Alert>
                      )}

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
            </form>
          </Grid>
        </Grid>
      ) : (
        <>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "18vh",
            }}
            bgcolor={"#1DD3C5"}
          >
            <IonImg className={styles["logo-mobile"]} src="./logo.svg" />
          </Box>
          <form onSubmit={handleSubmit}>
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
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    onFocus={() => setErrors({ ...errors, name: false })}
                    error={errors.name}
                    helperText={errors.name ? "Digite o seu nome" : ""}
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
                    onFocus={() => setErrors({ ...errors, email: false })}
                    error={errors.email}
                    helperText={errors.email ? "E-mail inválido" : ""}
                  />

                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    sx={{ background: "#F1F4FF" }}
                    name="password"
                    label="Senha"
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
                    id="password"
                    autoComplete="current-password"
                    value={password}
                    onFocus={() => setErrors({ ...errors, password: false })}
                    error={errors.password}
                    helperText={
                      errors.password ? "Por favor, insira sua senha." : ""
                    }
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    sx={{ background: "#F1F4FF" }}
                    name="password"
                    label="Confirmar Senha"
                    type={showPasswordConfirme ? "password" : "text"}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPasswordConfirme}
                            onMouseDown={handleMouseDownPasswordConfirme}
                          >
                            {!showPasswordConfirme ? (
                              <Visibility />
                            ) : (
                              <VisibilityOff />
                            )}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                    id="password"
                    autoComplete="current-password"
                    onFocus={() =>
                      setErrors({ ...errors, passwordConfirme: false })
                    }
                    error={errors.passwordConfirme}
                    helperText={
                      errors.passwordConfirme
                        ? "Parece que as senhas não coincidem."
                        : ""
                    }
                    value={passwordConfirme}
                    onChange={(e) => setPasswordConfirme(e.target.value)}
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
          </form>
        </>
      )}
    </>
  );
};
