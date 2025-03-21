import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import image from "../../assets/social.png";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import "./connexion.css";
import { FaCheck } from "react-icons/fa";
import { Cancel } from "@mui/icons-material";
import { FaPencil } from "react-icons/fa6";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import noname from "../../assets/icone/personne.jpeg";
import { toast } from "react-toastify";
import { useId } from "react";
import { OutlinedInput, InputLabel } from "@mui/material";

// Styles réutilisables pour tous les champs
const textFieldStyles = {
  sx: {
    "& .MuiInputBase-input": { color: "white" },
    "& .MuiOutlinedInput-root": {
      "& fieldset": { borderColor: "white" },
      "&:hover fieldset": { borderColor: "white" },
      "&.Mui-focused fieldset": { borderColor: "white" },
    },
  },
  InputLabelProps: {
    sx: {
      color: "white",
      "&.Mui-focused": { color: "white" },
    },
  },
};

// Composant réutilisable pour TextField
const CustomTextField = (props) => {
  return (
    <TextField
      sx={textFieldStyles.sx}
      InputLabelProps={textFieldStyles.InputLabelProps}
      {...props}
    />
  );
};

const Connexion = () => {
  const [showPassword, setShowPassword] = React.useState(false);
  const [showPassword1, setShowPassword1] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClickShowPassword1 = () => setShowPassword1((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const handleMouseDownPassword1 = (event) => {
    event.preventDefault();
  };

  const passwordId = useId();
  const confirmPasswordId = useId();

  const [verify1, setverify1] = useState(false);
  const [verify2, setverify2] = useState(false);
  const [verify3, setverify3] = useState(false);
  const [verify4, setverify4] = useState(false);
  const [verify5, setverify5] = useState(false);

  const checkPassword = (password) => {
    setcontraint(password.length >= 1 ? true : false);
    setverify1(password.length >= 8);
    setverify2(/[0-9]/.test(password));
    setverify3(/[A-Z]/.test(password));
    setverify4(/[a-z]/.test(password));
    setverify5(/[^A-Za-z0-9]/.test(password));
  };

  const ref = useRef(null);
  const [avatar, setavatar] = useState({
    file: null,
    url: "",
  });

  const handlephoto = (e) => {
    const free = e.target.files[0];
    if (free) {
      setavatar({
        file: free,
        url: URL.createObjectURL(free),
      });
    }
  };

  const [contraint, setcontraint] = useState(false);
  const [error, seterror] = useState(false);
  const [errorMessage, seterrorMessage] = useState("");
  const [formData, setFormData] = useState({
    name_utilisateur: "",
    email_utilisateur: "",
    password_utilisateur: "",
    password_confirm: "",
    photo_profil: null,
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    if (e.target.name === "password_utilisateur") {
      checkPassword(e.target.value);
    }
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        {
          email: formData.email_utilisateur,
          password: formData.password_utilisateur,
        }
      );

      if (response.data.token) {
        // Stocker le token dans le localStorage
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));

        // Rediriger vers la page des messages
        navigate("/message");
      }
    } catch (err) {
      seterrorMessage(
        err.response?.data?.message ||
          "Une erreur est survenue lors de la connexion"
      );
      seterror(true);
    }
  };

  const changephoto = () => {
    if (ref.current) {
      ref.current.click();
    }
  };

  return (
    <div className="connexion-container">
      <div className="connexion-form">
        <h2>Connexion</h2>
        {error && <div className="error-message">{errorMessage}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email_utilisateur"
              value={formData.email_utilisateur}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Mot de passe</label>
            <input
              type="password"
              id="password"
              name="password_utilisateur"
              value={formData.password_utilisateur}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit">Se connecter</button>
        </form>
      </div>
    </div>
  );
};

export default Connexion;
