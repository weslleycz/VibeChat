import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import {
  Box,
  IconButton,
  InputAdornment,
  InputBase,
  useMediaQuery,
} from "@mui/material";
import Typography from "@mui/material/Typography";

export const Contacts = () => {
  const matches = useMediaQuery("(min-width:900px)");
  return (
    <>
      {matches ? (
        <Box paddingRight={1} paddingLeft={1} paddingTop={1}>
          <Box justifyContent={"space-between"} display={"flex"}>
            <Typography variant="h6" gutterBottom>
              Contatos
            </Typography>
            <Box
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
          </Box>
          <Box paddingTop={1}>
            <Box
              sx={{ background: "#F3F3F3", borderRadius: 2 }}
              display={"flex"}
            >
              <IconButton
                type="button"
                disabled
                sx={{ p: "10px" }}
                aria-label="search"
              >
                <SearchIcon />
              </IconButton>
              <InputBase
                fullWidth
                inputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
                placeholder="Buscar..."
              />
            </Box>
          </Box>
        </Box>
      ) : (
        <Box height={"100vh"} bgcolor={"#ffffff"} p={2}>
          <Box justifyContent={"space-between"} display={"flex"}>
            <Typography variant="h6" gutterBottom>
              Contatos
            </Typography>
            <Box
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
          </Box>
          <Box paddingTop={1}>
            <Box
              sx={{ background: "#F3F3F3", borderRadius: 2 }}
              display={"flex"}
            >
              <IconButton
                type="button"
                disabled
                sx={{ p: "10px" }}
                aria-label="search"
              >
                <SearchIcon />
              </IconButton>
              <InputBase
                fullWidth
                inputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
                placeholder="Buscar..."
              />
            </Box>
          </Box>
        </Box>
      )}
    </>
  );
};
