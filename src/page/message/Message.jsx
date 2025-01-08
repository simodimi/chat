import React from "react";
import { FaMicrophone } from "react-icons/fa";
import nomane from "../../assets/icone/personne.jpeg";
import "./message.css";
import { MdEmojiEmotions } from "react-icons/md";
import { IoSend } from "react-icons/io5";
import { IoMdPhotos } from "react-icons/io";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useState, useEffect, useRef } from "react";
import { TiThMenu } from "react-icons/ti";
import { GiCrossMark } from "react-icons/gi";
import { IoVideocam } from "react-icons/io5";
import { IoCall } from "react-icons/io5";
import { IoSearch } from "react-icons/io5";

const Message = () => {
  //left
  //selection des users
  const [SelectionUser, setSelectionUser] = useState(false);
  //customisation des bouton
  const [SelectionButton, setSelectionButton] = useState(true);
  const [ButtonClick, setButtonClick] = useState(false);
  const [SeeButton, setSeeButton] = useState(false);
  const ref = useRef(null);
  const handleChoiceButton = () => {
    setButtonClick(!ButtonClick);
    setSelectionButton(!SelectionButton);
    setSeeButton(!SeeButton);
  };
  useEffect(() => {
    const handleDisappear = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        //si la ref  existe et si tu cliques en dehors
        setSeeButton(false);
        setSelectionButton(true);
      }
    };
    document.addEventListener("mousedown", handleDisappear); //appel de la fonction
    return () => {
      document.removeEventListener("mousedown", handleDisappear); //fonction de nettoyage pour supprimer l'evenement
    };
  }, [ref]);
  //right
  return (
    <div className="MessageHome">
      <div className="MessageHomeLeft">
        <div
          className=""
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <p id="Appel">Discussions</p>
          <div className="">
            <span
              style={{ marginRight: "10px" }}
              className={`ButtonMenu ${ButtonClick ? "activeMenu" : ""}  `}
              onClick={() => handleChoiceButton()}
            >
              {SelectionButton ? <TiThMenu /> : <GiCrossMark />}
            </span>
            {SeeButton && (
              <div className="AfficherContact" ref={ref}>
                <div className="HideContact">
                  <p style={{ textAlign: "center", fontWeight: "bold" }}>
                    Nouvelle discussion
                  </p>

                  <Box className="SearchCommunication">
                    <TextField
                      helperText=" "
                      className="SearchCommunicationInput"
                      id="demo-helper-text-aligned-no-helper"
                      label="Rechercher un nom de contact"
                    />
                  </Box>
                  <div className="DiscussionList">
                    <p>Tous les contacts</p>
                    <div className="ContactPerson">
                      <img src={nomane} alt="" />
                      <p>John Doe</p>
                    </div>
                    <div className="ContactPerson">
                      <img src={nomane} alt="" />
                      <p>John Doe</p>
                    </div>
                    <div className="ContactPerson">
                      <img src={nomane} alt="" />
                      <p>John Doe</p>
                    </div>
                    <div className="ContactPerson">
                      <p>Aucun contact trouvé</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <Box className="SearchCommunication">
          <TextField
            helperText=" "
            className="SearchCommunicationInput"
            id="demo-helper-text-aligned-no-helper"
            label="Rechercher une discussion"
          />
        </Box>
        <div
          className={`ListContactFriend ${SelectionUser ? "actiSelect" : ""}`}
          onClick={() => setSelectionUser(!SelectionUser)}
        >
          <img src={nomane} alt="" />
          <div className="NameListContact">
            <p>John Doe</p>
            <p>bonjour free boy</p>
          </div>
        </div>
        <div className="ListContactFriend">
          <img src={nomane} alt="" />
          <div className="NameListContact">
            <p>John Doe</p>
            <p>bonjour free boy</p>
          </div>
        </div>
      </div>
      <div className="MessageHomeRight">
        <div className="MessageHomeRightTitle">
          <div className="MessageTitleUser" id="onLine">
            <img src={nomane} alt="" />
            <p>John Doe</p>
          </div>
          <div className="MessageTitleUserOption">
            <p id="optionMain">
              <span>
                <IoVideocam />
              </span>
              <span>
                <IoCall />
              </span>
            </p>
            <p id="optionSearchs">
              <IoSearch />
            </p>
          </div>
        </div>
        <div className="MessageHomeRightContent">
          <div className="SmsHome">
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ut
              libero facere ab illum natus aliquam quis, autem quo, sequi
              molestias commodi, voluptas nostrum non sapiente dolores.
              Provident labore vitae necessitatibus! <span>12:00</span>
            </p>
          </div>

          <div className="SmsAway">
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum
              explicabo laborum autem eum odio, incidunt ipsa animi. Molestiae
              odit vel rem error, perferendis, nulla, tempore vero
              necessitatibus voluptate neque optio! <span>12:00</span>
            </p>
          </div>

          <div className="ResponseSmsHome">
            <div className="CopySms">
              <p>dimitri</p>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
            </div>
            <div className="AnswerCopySms">
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.{" "}
                <span>12:00</span>
              </p>
            </div>
          </div>
          <div className="ResponseSmsAway">
            <div className="CopySms">
              <p>dimitri</p>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
            </div>
            <div className="AnswerCopySms">
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.{" "}
                <span>12:00</span>
              </p>
            </div>
          </div>
        </div>
        <div className="MessageHomeRightInput">
          <div className="OptionSmsInput">
            <p>
              {" "}
              <MdEmojiEmotions />
            </p>
            <p>
              <IoMdPhotos />
            </p>
            <p>
              <FaMicrophone />
            </p>
          </div>
          <div className="writeSmsInput">
            <textarea name="" id="" placeholder="taper un message"></textarea>
            <div className="SendSmsInput">
              <p>
                <IoSend />
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Message;
