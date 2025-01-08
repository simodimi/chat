import React from "react";
import "./call.css";
import noname from "../../assets/icone/personne.jpeg";
import { GiCrossMark } from "react-icons/gi";
import { FaRegSquare } from "react-icons/fa";
import { FaMinus } from "react-icons/fa";
import { FcCallback } from "react-icons/fc";
import { FcEndCall } from "react-icons/fc";
import { MdSms } from "react-icons/md";
import { IoVideocam } from "react-icons/io5";
import { FaMicrophone } from "react-icons/fa";
import { FaMicrophoneSlash } from "react-icons/fa";
import { PiScreencastFill } from "react-icons/pi";

const Call = () => {
  return (
    <div className="CallHome">
      <div className="SubCallHome">
        <div className="CallHomeButton">
          <p>
            <span className="ButtonMenu">
              <FaMinus />
            </span>
            <span className="ButtonMenu">
              <FaRegSquare />
            </span>
            <span className="ButtonMenu">
              <GiCrossMark />
            </span>
          </p>
        </div>
        <div className="CallHomeText">
          <img src={noname} alt="" />
          <p>Simo dimitri</p>
          <p>00:00</p>
          <div className="CallStop">
            <div className="" id="StopCall">
              <p>
                <span className="ButtonMenu">
                  <FcEndCall />
                </span>
                <label>raccrocher</label>
              </p>
            </div>
            <div className="CallStopOption">
              <p>
                <span className="ButtonMenu">
                  <FcCallback />
                </span>
                <label>accepter</label>
              </p>
              <p>
                <span className="ButtonMenu">
                  <FcEndCall />
                </span>
                <label>refuser</label>
              </p>
            </div>
          </div>
        </div>
        <div className="CallOption">
          <p>
            <span className="ButtonMenu">
              <MdSms />
            </span>
            <label>message</label>
          </p>
          <p>
            <span className="ButtonMenu">
              <IoVideocam />
            </span>
            <label>basculer en vidéo</label>
          </p>
          <p>
            <span className="ButtonMenu">
              <PiScreencastFill />
            </span>
            <label>partager l'ecran</label>
          </p>
          <p>
            <span className="ButtonMenu">
              <FaMicrophone />
            </span>
            <label>couper le micro</label>
          </p>
          <p>
            <span className="ButtonMenu">
              <FaMicrophoneSlash />
            </span>
            <label>activer le micro</label>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Call;
