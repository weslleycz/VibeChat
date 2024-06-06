import {
  Avatar,
  Badge,
  Box,
  Button,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import { api } from "../../services/api";
import { useEffect, useState } from "react";
import { Cookies } from "../../services/cookies";
import { decodeToken } from "react-jwt";
import QRCode from "react-qr-code";

export const Perfil = () => {
  const [code, setCode] = useState();
  const [name, setName] = useState();
  const [avatar, setAvatar] = useState();

  useEffect(() => {
    (async () => {
      try {
        const { get } = new Cookies();
        const tokenJWT = await get();
        const { data } = decodeToken(tokenJWT) as any;
        const res = await api.get(`/user/getUser/${data}`);
        setCode(res.data.code);
        setName(res.data.name);
        console.log(res.data);
        setAvatar(res.data.avatar);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  const handleImageUpload = async (e: any) => {
    const file = e.target.files[0];
    if (file) {
      const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
      if (!allowedTypes.includes(file.type)) {
        alert("Por favor, selecione um arquivo de imagem válido.");
        return;
      }
      const maxSize = 20 * 1024 * 1024;
      if (file.size > maxSize) {
        alert(
          "O arquivo selecionado é muito grande. Por favor, selecione um arquivo menor que 20 MB."
        );
        return;
      }
      const reader = new FileReader();
      reader.onloadend = async () => {
        const { get } = new Cookies();
        const tokenJWT = await get();
        const { data } = decodeToken(tokenJWT) as any;
        // console.log(reader.result as string);
        try {
          setAvatar(reader.result as string);
          await api.put("/user/uploadAvatar", {
            avatar: reader.result as string,
            userId: data,
          });
          e.target.value = null;
        } catch (error) {
          console.log(error);
          e.target.value = null;
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <Box sx={{ width: "100%" }} justifyContent={"center"} display={"flex"}>
        <Stack marginTop={4} spacing={0} alignItems="center">
          <Badge
            overlap="circular"
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            badgeContent={
              <>
                <IconButton sx={{ color: "#eeeeee", cursor: "pointer" }}>
                  <label htmlFor="image-upload">
                    <CameraAltIcon sx={{ cursor: "pointer" }} />
                  </label>
                </IconButton>
                <input
                  id="image-upload"
                  type="file"
                  accept="image/*"
                  style={{ display: "none" }}
                  onChange={handleImageUpload}
                />
              </>
            }
          >
            <Avatar
              src={avatar}
              sx={{
                height: 100,
                width: 100,
                fontSize: "40px",
              }}
            ></Avatar>
          </Badge>
          <Typography sx={{ fontWeight: "900", marginTop: 1 }} variant="h5">
            {name}
          </Typography>
          <Box textAlign={"center"} marginTop={4}>
            <QRCode
              size={200}
              style={{ height: "auto", maxWidth: "100%", width: "100%" }}
              value={"hjhjhj"}
              viewBox={`0 0 256 256`}
            />
            <Typography variant="h6" gutterBottom>
              {code}
            </Typography>
          </Box>
        </Stack>
      </Box>
    </>
  );
};
