import React, { useState } from "react";
import "./status.css";
import nomane from "../../assets/icone/personne.jpeg";
import { GiCrossMark } from "react-icons/gi";
import { MdSms } from "react-icons/md";
import { IoSend, IoVideocam } from "react-icons/io5";
import { FaMicrophone } from "react-icons/fa";
import { PiScreencastFill } from "react-icons/pi";
import Audio from "./Audio";

const Status = () => {
  const [selection, setselection] = useState(false); //selection pour background away
  const [createStatut, setCreateStatut] = useState(false); //bouton pour apercu de la div de creation des status
  //visualisation audio
  const [visualisationAudio, setVisualisationAudio] = useState(false);

  const audioview = () => {
    setVisualisationAudio(!visualisationAudio);
    setVisualisationTexte(false);
  };
  //visualisation texte
  const [visualisationTexte, setVisualisationTexte] = useState(false);

  const textview = () => {
    setVisualisationTexte(!visualisationTexte);
    setVisualisationAudio(false);
  };
  //close page
  const [closePrincipal, setClosePrincipal] = useState(true);
  const onclosed = () => {
    setCreateStatut(!createStatut);
    setClosePrincipal(!closePrincipal);
  };
  return (
    <div className="StatusHome">
      <div className="StatusHomeLeft">
        <div className="StatutOwn">
          <p id="Appel">Statut</p>

          <div className="StatusContact">
            <div className="StatusContactImg">
              <img src={nomane} alt="" />
              <h2></h2>
            </div>
            <div className="StatusName">
              <p>Mes statuts</p>
            </div>
          </div>
          <span
            className="ButtonMenu"
            onClick={() => {
              setCreateStatut(!createStatut);
              setClosePrincipal(!closePrincipal);
            }}
          >
            créer un statut
          </span>
        </div>
        <div className="StatusOther">
          <p style={{ marginLeft: "10px" }}>Mises à jour récentes</p>
          <div
            className={`StatusContact ${selection ? "StatusSelect" : ""}`}
            onClick={() => setselection(!selection)}
          >
            <div className="StatusContactImg">
              <img src={nomane} alt="" />
            </div>
            <div className="StatusName">
              <p>Statut des autres</p>
              <p>
                Aujourd'hui,<span> 12:00</span>
              </p>
            </div>
          </div>
        </div>
        <div className="StatusSee">
          <p style={{ marginLeft: "10px" }}>Mises à jour vues</p>
          <span>statut déjà vus</span>
          <div className="StatusContact">
            <div className="StatusContactImg">
              <img src={nomane} alt="" />
            </div>
            <div className="StatusName">
              <p>Mon statut</p>
              <p>
                hier,<span> 12:00</span>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="StatusHomeRight">
        {createStatut ? (
          <p>Cliquez sur un contact pour voir ses mises à jour de statut</p>
        ) : (
          closePrincipal && (
            <div className="CreateStatus">
              <div className="CallHomeButton">
                <p>
                  <span className="ButtonMenu">
                    <GiCrossMark onClick={onclosed} />
                  </span>
                </p>
              </div>
              <div className="CallHomeText">
                <div className="CallHomeTextAffiche">
                  <p>Ajouter un statut</p>
                </div>
                <div className="CallChoiceStyle">
                  <p>Statut</p>
                </div>

                <div className="CallHomeTextStyle">
                  <div className="CallOption">
                    <p>
                      <span className="ButtonMenu">
                        <MdSms />
                      </span>
                      <label>prendre un selfie</label>
                    </p>
                    <p>
                      <span className="ButtonMenu">
                        <IoVideocam />
                      </span>
                      <label>prendre une video</label>
                    </p>
                    <p>
                      <span className="ButtonMenu">
                        <IoVideocam />
                      </span>
                      <label>appliquer un filtre</label>
                    </p>
                    <p>
                      <span className="ButtonMenu">
                        <PiScreencastFill />
                      </span>
                      <label>selectionner une couleur de texte</label>
                    </p>
                    <p>
                      <span className="ButtonMenu">
                        <FaMicrophone />
                      </span>
                      <label>ajouter des emoji </label>
                    </p>
                    <p>
                      <span className="ButtonMenu">
                        <FaMicrophone />
                      </span>
                      <label>ajouter musique sonore </label>
                    </p>
                    <p>
                      <span className="ButtonMenu">
                        <FaMicrophone />
                      </span>
                      <label>ajouter fond d'ecran </label>
                    </p>
                    <p>
                      <span className="ButtonMenu">
                        <FaMicrophone />
                      </span>
                      <label>font texte </label>
                    </p>
                    <p>
                      <span className="ButtonMenu">
                        <FaMicrophone />
                      </span>
                      <label>taille texte </label>
                    </p>
                  </div>
                </div>
                {visualisationAudio && <Audio />}
                {visualisationTexte && (
                  <div className="WriteSmsCall">
                    <textarea name="" id=""></textarea>
                    <span>
                      <IoSend className="ButtonMenu" />
                    </span>
                  </div>
                )}
              </div>
              <div className="CallOption">
                <p>
                  <span className="ButtonMenu">
                    <MdSms onClick={textview} />
                  </span>
                  <label>ecrire un message</label>
                </p>
                <p>
                  <span className="ButtonMenu">
                    <IoVideocam />
                  </span>
                  <label>ajouter des emoji</label>
                </p>
                <p>
                  <span className="ButtonMenu">
                    <IoVideocam />
                  </span>
                  <label>selectionner une vidéo</label>
                </p>
                <p>
                  <span className="ButtonMenu">
                    <PiScreencastFill />
                  </span>
                  <label>selectionner une image</label>
                </p>
                <p>
                  <span className="ButtonMenu">
                    <FaMicrophone onClick={audioview} />
                  </span>
                  <label>lancer un enregistrement</label>
                </p>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default Status;
