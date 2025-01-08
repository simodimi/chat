import React from "react";
import nomane from "../../assets/icone/personne.jpeg";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import "./ami.css";

const Ami = () => {
  const [Selcet, setSelcet] = useState(false);
  return (
    <div className="AppelHome">
      <div className="AppelHomeLeft">
        <p id="Appel">Mes Ami(es)</p>

        <Box className="SearchCommunication">
          <TextField
            helperText=" "
            className="SearchCommunicationInput"
            id="demo-helper-text-aligned-no-helper"
            label="Rechercher un  contact"
          />
        </Box>
        <div className="ShowAppel">
          <div className="AppelContact">
            <div
              className={`AppelContacts ${Selcet ? "Appelselects" : ""} `}
              style={{ display: "flex" }}
              onClick={() => setSelcet(!Selcet)}
            >
              <div className="AppelContactImg">
                <img src={nomane} alt="" />
              </div>
              <div className="AppelName">
                <div className="AppelNameLeft">
                  <p>Dimitri</p>
                </div>
              </div>
            </div>
            <div className="AppelContacts" style={{ display: "flex" }}>
              <div className="AppelContactImg">
                <img src={nomane} alt="" />
              </div>
              <div className="AppelName">
                <div className="AppelNameLeft">
                  <p>Dimitri</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="AppelHomeRight">
        <p id="Appel">rechercher des nouveaux ami(es)</p>
        <Box className="SearchCommunication">
          <TextField
            helperText=" "
            className="SearchCommunicationInput"
            id="demo-helper-text-aligned-no-helper"
            label="Rechercher un  nom"
          />
        </Box>
        <div className="NameInfosCall">
          <div className="NameInfosCallUp">
            <div className="CallUpLeft">
              <img src={nomane} alt="" />
              <p>Dimitri</p>
            </div>
            <div className="CallUpRight">
              <Link to="/message" className="ButtonMenu">
                <p
                  style={{
                    margin: "auto",
                  }}
                >
                  Demande d'amitiée
                </p>
              </Link>
            </div>
          </div>
          <div className="NameInfosCallDown">
            <div className="CallDownLeft">
              <p>En attente d'acceptation</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Ami;
