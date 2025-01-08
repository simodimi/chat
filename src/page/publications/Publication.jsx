import React, { useRef, useState } from "react";
import "./publication.css";
import { IoSend } from "react-icons/io5";
import noname from "../../assets/icone/personne.jpeg";
import { FaCirclePlus } from "react-icons/fa6";
import { FaPenAlt } from "react-icons/fa";
import { MdMenu } from "react-icons/md";
import { CiSaveDown2 } from "react-icons/ci";
import { MdAppBlocking } from "react-icons/md";
import { SiAdblock } from "react-icons/si";
import { FaMasksTheater } from "react-icons/fa6";
import { AiTwotoneLike } from "react-icons/ai";
import { FaRegMessage } from "react-icons/fa6";
import { IoMdPhotos } from "react-icons/io";
import { MdEmojiEmotions } from "react-icons/md";
import Emoji from "../../component/Emoji";

const Publication = () => {
  //changement de photo de profil
  const ref = useRef(null);
  const [ProfilePicture, setProfilePicture] = useState(noname);
  const ChangeProfile = () => {
    ref.current.click();
  };
  const HandleProfile = (e) => {
    const file = e.target.files[0]; //selection d'un seul fichier
    if (file) {
      //si le fichier existe
      if (file.size <= 1 * 1024 * 1024) {
        //si la taille du fichier est inferieur a 1mo
        const dimi = new FileReader(); //lecture du fichier
        dimi.onloadend = () => {
          // quand la lecture est terminée
          setProfilePicture(dimi.result); //mettre le resultat de la lecture dans la variable ProfilePicture
        };
        dimi.readAsDataURL(file); // mis sous forme d'url
      } else {
        alert("veillez choissir un fichier de moins de 5mo");
      }
    }
  };

  //compteur de sms et affichage
  const [SmsCompteur, setSmsCompteur] = useState(0);
  const [seeComment, setseeComment] = useState(false);

  //like publication
  //liking
  const [like, setlike] = useState(0);
  const [isliking, setisliking] = useState(false);
  const [seelike, setseelike] = useState(false);
  const Liking = () => {
    setlike(isliking ? like - 1 : like + 1);
    setisliking((prev) => !prev);
    setseelike((prev) => !prev);
  };

  //voir le menu liste de publication
  //pubication
  const [menulist, setmenulist] = useState(false);
  const ShowMenu = () => {
    setmenulist((prev) => !prev);
  };

  //affichage commentaire
  const [replyToId, setreplyToId] = useState(null); //id du commentaire principal auquel on repond
  const [Comment1, setComment1] = useState(false); //affichage
  const [Comment2, setComment2] = useState(false);
  const [Comment3, setComment3] = useState(false);
  const [Comment1like, setComment1like] = useState({}); //compteur 1 like
  const [isComment1like, setisComment1like] = useState({}); //verifions si le like 1 est deja fait
  const [Comment2like, setComment2like] = useState({}); //compteur 1 like
  const [isComment2like, setisComment2like] = useState({}); //verification
  const [Comment3like, setComment3like] = useState({});
  const [isComment3like, setisComment3like] = useState({});
  const [texte1, settexte1] = useState([]); //
  const [texte2, settexte2] = useState([]);
  const [texte3, settexte3] = useState([]);

  //comptage des likes des commentaires
  //principal
  const likingComment1 = (id) => {
    setComment1like((prev) => ({
      ...prev,
      [id]: isComment1like[id] ? (prev[id] || 0) - 1 : (prev[id] || 0) + 1,
    }));
    setisComment1like((prev) => ({ ...prev, [id]: !prev[id] }));
  };
  //secondaire
  const likingComment2 = (id) => {
    setComment2like((prev) => ({
      ...prev, //faire une copie de l'objet texte2
      //id: Met à jour uniquement la clé correspondant à l'ID du commentaire qui a été aimé ou non.
      [id]: isComment2like[id] ? (prev[id] || 0) - 1 : (prev[id] || 0) + 1, //si le like est deja fait, on enleve 1, sinon on ajoute 1
    }));
    setisComment2like((prev) => ({ ...prev, [id]: !prev[id] }));
  };
  //tertiaire
  const likingComment3 = (ids) => {
    setComment3like((prev) => ({
      ...prev,
      [ids]: isComment3like[ids] ? (prev[ids] || 0) - 1 : (prev[ids] || 0) + 1,
    }));
    setisComment3like((prev) => ({ ...prev, [ids]: !prev[ids] }));
    alert("ok");
  };

  //voir saisir du texte et executer le texte

  const [write, setwrite] = useState(false);
  const ShowComment = () => {
    setwrite((prev) => !prev);
  };
  const [writearea, setwritearea] = useState("");
  const handlearea = (e) => {
    setwritearea(e.target.value);
  };

  //ajouter des emoji
  const handleEmojiClick = (e) => {
    setwritearea((prev) => prev + e.emoji);
  };
  const [emojis, setEmoji] = useState(false);
  const showEmoji = () => {
    setEmoji((prev) => !prev);
  };

  //selection images pour commentaire
  const [photoComment, setphotoComment] = useState(null);
  const refcomment = useRef(null);
  const showImage = () => {
    refcomment.current.click();
  };
  const handleCommentPicture = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size <= 1 * 1024 * 1024) {
        const dimi = new FileReader();
        dimi.onloadend = () => {
          setphotoComment(dimi.result);
        };
        dimi.readAsDataURL(file);
        setwritearea((prev) => prev + file.name); //affichage du nom de l'image dans le setter writearea
      }
    }
  };

  //repondre au commentaire principale
  const ResComment1 = (id) => {
    setwrite(true);
    setreplyToId(id); //  //stockons l'id du commentaire principal auquel on répond
  };
  //répondre au commentaire secondaire

  const ResComment2 = (id) => {
    setwrite(true);
    setreplyToId(id); //stockons l'id du commentaire secondaire auquel on répond
  };
  //ajouter texte principale et secondaire
  const addText = () => {
    if (writearea.trim() !== "") {
      // // Vérifie que le champ de texte n'est pas vide après suppression des espaces inutiles.
      if (replyToId !== null) {
        // Vérifie si l'utilisateur répond à un commentaire spécifique
        if (typeof replyToId === "string" && replyToId.includes("-")) {
          // Vérifie si `replyToId` est au format d'une réponse tertiaire (parentId-replyId).
          const [parentId, replyId] = replyToId.split("-"); // // Sépare `replyToId` pour obtenir l'ID parent et l'ID de la réponse.
          if (replyId) {
            // Si `replyId` existe, il s'agit d'un commentaire tertiaire.

            settexte3((prev) => ({
              ...prev,
              [replyToId]: [
                ...(prev[replyToId] || []), // Copie les réponses existantes à ce commentaire tertiaire.
                { text: writearea.trim(), photo: photoComment }, // Ajoute la nouvelle réponse avec le texte et la photo (si disponible).
              ],
            }));
            setComment3(true); // Mettre à jour `Comment3` pour afficher le commentaire tertiaire.
          } else {
            // Si `replyId` n'existe pas, il s'agit d'un commentaire secondaire
            settexte2((prev) => ({
              ...prev, //faire une copie de l'objet texte2
              [parentId]: [
                //ajouter le commentaire secondaire au tableau correspondant pour une key identique au parentId
                ...(prev[parentId] || []), //si des commentaires secondaires existent, on les copie ou liste vide par défaut
                { text: writearea.trim(), photo: photoComment }, //ajouter le nouveau commentaire secondaire
              ],
            }));
          }
        } else {
          // Si `replyToId` ne contient pas "-", on suppose qu'il s'agit d'une réponse secondaire.
          settexte2((prev) => ({
            ...prev,
            [replyToId]: [
              ...(prev[replyToId] || []),
              { text: writearea.trim(), photo: photoComment },
            ],
          }));
        }
        setComment2(true); // Mettre à jour `Comment2` pour afficher le commentaire secondaire.
      } else {
        // Si `replyToId` est null, cela signifie qu'il s'agit d'un commentaire principal
        setComment1(true); // Mettre à jour `Comment1` pour afficher le commentaire principal.
        settexte1([...texte1, { text: writearea.trim(), photo: photoComment }]);
      }
      setwritearea(""); // Vider le champ de texte
      setSmsCompteur(SmsCompteur + 1); // Ajouter 1 au compteur de SMS
      setseeComment(true); // Mettre à jour `seeComment` pour afficher les commentaires
      setphotoComment(null); // Vider la photo de commentaire
      setwrite(false); // Mettre à jour `write` pour fermer la publication
      setreplyToId(null); //Réinitialise l'ID de réponse pour un commentaire.
    }
  };
  return (
    <div className="PublicationHome">
      <div className="PublicationTitle">
        <div className="PublicationTitle-Img">
          <img src={ProfilePicture} alt="" onClick={() => ChangeProfile()} />
          <input
            type="file"
            name=""
            id=""
            accept="image/*"
            ref={ref}
            onChange={HandleProfile}
            style={{ display: "none" }}
          />
          <p>Dimitri</p>
        </div>
        <div className="PublicationTitle-Selection">
          <div className="CreatePublication">
            <p>Créer une publication</p>
            <span>
              <FaPenAlt />
            </span>
          </div>
          <div className="CreateGroupe">
            <p>Créer un groupe</p>
            <span>
              <FaCirclePlus />
            </span>
          </div>
        </div>
      </div>
      <div className="PublicationShow">
        <div className="PublicationPost">
          <div className="PublicationPost-Menu">
            <p
              style={{
                display: "flex",
                alignItems: "center",
                gap: "15px",
                fontWeight: "bold",
              }}
            >
              <img src={ProfilePicture} alt="" /> Dimitri
            </p>
            <div className="PublicationPost-Menu-Icon">
              <span>
                <MdMenu
                  onClick={() => ShowMenu()}
                  style={{ cursor: "pointer" }}
                  className="ButtonMenu"
                />
              </span>
              {menulist && (
                <div className="ListPublicationPost">
                  <p>
                    <CiSaveDown2 />
                    <span>Enregistrer la publication</span>
                  </p>
                  <p>
                    <FaMasksTheater />
                    <span>masquer la publication</span>
                  </p>
                  <p>
                    <MdAppBlocking />
                    <span>Bloquer le profil de Dimitri</span>
                  </p>
                  <p>
                    <SiAdblock />
                    <span>signaler la publication</span>
                  </p>
                </div>
              )}
            </div>
          </div>
          <div className="TextePublication">
            <div className="HeaderPublication">
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum
                quod eveniet eius illo corporis ex a sit minus at debitis
                necessitatibus temporibus nisi veniam libero voluptates
                expedita, maiores nobis magni. Lorem ipsum dolor sit amet
                consectetur adipisicing elit. Laborum neque illum obcaecati
                minima, rerum sit. Repellendus repudiandae veniam dicta qui ab,
                quaerat impedit consequatur eaque, doloribus ducimus facere
                accusantium nihil!
                <span>...</span>
              </p>
            </div>
            <div className="HealthPublication">
              <img src={noname} alt="" />
            </div>
            <div className="LikingPublication">
              <div className="LikingUp">
                {seelike && (
                  <p>
                    <AiTwotoneLike id="like" />
                    <span>{like}</span>
                  </p>
                )}
                {seeComment && (
                  <p style={{ fontWeight: "bold" }}>
                    {SmsCompteur === 1
                      ? `${SmsCompteur} commentaire`
                      : `${SmsCompteur} commentaires`}
                  </p>
                )}
              </div>
              <div className="LikingDown">
                <p onClick={() => Liking()}>
                  <AiTwotoneLike id="likes" /> Like
                </p>
                <p onClick={() => ShowComment()}>
                  <FaRegMessage id="likes" /> Commenter
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="CommentArea">
          {/*affichage des messages principaux */}

          {Comment1 && (
            <>
              {texte1.map((p, id) => (
                <div className="" key={id}>
                  <div className="PrioritySms">
                    <div className="SmsWrite">
                      <p id="textPriorirySms">
                        <span>
                          <img src={noname} alt="" /> Dimitri <label>10h</label>
                        </span>
                        {p.text}

                        {p.photo && (
                          <img src={p.photo} alt="" id="photoCommentaire" />
                        )}
                      </p>
                      <div className="SmsOptionLiking">
                        <p onClick={() => likingComment1(id)}>
                          <AiTwotoneLike id="likes" /> Like
                        </p>
                        <p onClick={() => ResComment1(id)}>
                          <FaRegMessage id="likes" /> Répondre
                        </p>
                      </div>
                    </div>
                    <div className="SmsLike">
                      {Comment1like[id] > 0 && (
                        <span>
                          {Comment1like[id]} <AiTwotoneLike id="likePriority" />{" "}
                        </span>
                      )}
                    </div>
                  </div>
                  {/*Sous Commentaire */}

                  {texte2[id] &&
                    // Vérifie si le commentaire principal a des réponses dans texte2
                    texte2[id].map((reply, replyId) => (
                      // Parcourt toutes les réponses secondaires associées à ce commentaire principal.
                      <div className="" key={`${id}-${replyId}`}>
                        <div className="SecondarySms">
                          <div className="SmsWrite">
                            <p id="textPriorirySms">
                              <span>
                                <img src={noname} alt="" /> simo{" "}
                                <label>10h</label>
                              </span>
                              {reply.text}{" "}
                              {/* Affiche le texte de la réponse */}
                              {reply.photo && (
                                <img
                                  src={reply.photo}
                                  alt=""
                                  id="photoCommentaire"
                                />
                              )}
                              {/* Si une photo est jointe à la réponse, elle est affichée ici */}
                            </p>
                            <div className="SmsOptionLiking">
                              <p
                                onClick={
                                  () => likingComment2(`${id}-${replyId}`) //Cette syntaxe crée un identifiant unique pour la réponse secondaire. Par exemple, si id = 1 et replyId = 2, l'ID final sera "1-2"
                                }
                              >
                                <AiTwotoneLike id="likes" /> Like
                              </p>
                              <p
                                onClick={() => ResComment2(`${id}-${replyId}`)}
                              >
                                <FaRegMessage id="likes" /> Répondre
                              </p>
                            </div>
                          </div>
                          <div className="SmsLike">
                            {Comment2like[`${id}-${replyId}`] > 0 && (
                              <span>
                                {Comment2like[`${id}-${replyId}`]}{" "}
                                <AiTwotoneLike id="likePriority" />{" "}
                              </span>
                            )}
                          </div>
                        </div>

                        {texte3[`${id}-${replyId}`] &&
                          texte3[`${id}-${replyId}`].map(
                            (tertiaryreply, tertiaryreplyId) => (
                              <div
                                className="ThirdSms"
                                key={`${id}-${replyId}-${tertiaryreplyId}`}
                              >
                                <div className="SmsWrite">
                                  <p id="textPriorirySms">
                                    <span>
                                      <img src={noname} alt="" /> simo{" "}
                                      <label>10h</label>
                                    </span>
                                    {tertiaryreply.text}

                                    {tertiaryreply.photo && (
                                      <img
                                        src={tertiaryreply.photo}
                                        alt=""
                                        id="photoCommentaire"
                                      />
                                    )}
                                  </p>
                                  <div className="SmsOptionLiking">
                                    <p
                                      onClick={() =>
                                        likingComment3(
                                          `${id}-${replyId}-${tertiaryreplyId}`
                                        )
                                      }
                                    >
                                      <AiTwotoneLike id="likes" /> Like
                                    </p>
                                  </div>
                                </div>
                                <div className="SmsLike">
                                  {Comment3like[
                                    `${id}-${replyId} -${tertiaryreplyId}`
                                  ] > 0 && (
                                    <span>
                                      {
                                        Comment3like[
                                          `${id}-${replyId}-${tertiaryreplyId}`
                                        ]
                                      }
                                      <AiTwotoneLike id="likePriority" />{" "}
                                    </span>
                                  )}
                                </div>
                                {/*ouverture troiseme */}
                              </div>
                            )
                          )}
                        {/*ouverture deuxieme */}
                      </div>
                    ))}

                  {/*ouverture first */}
                </div>
              ))}
            </>
          )}

          {/*autres sous commentaire */}
        </div>
        {write && (
          <div className="PublicationCommentaire">
            <div className="WrittingPrincipalComment">
              <form action="">
                <textarea
                  name=""
                  id=""
                  value={writearea}
                  onChange={handlearea}
                ></textarea>
                <div className="OptionComment">
                  <p>
                    <span>
                      <input
                        type="file"
                        accept="image/*"
                        ref={refcomment}
                        onChange={handleCommentPicture}
                        style={{ display: "none" }}
                      />
                      <IoMdPhotos
                        onClick={() => showImage()}
                        className="ButtonMenu"
                      />
                    </span>
                    <span>
                      <MdEmojiEmotions
                        onClick={() => showEmoji()}
                        className="ButtonMenu"
                      />
                      {emojis && (
                        <div className="" id="emoji">
                          <Emoji handleEmojiClick={handleEmojiClick} />
                        </div>
                      )}
                    </span>
                  </p>
                  <button type="button">
                    <IoSend onClick={() => addText()} className="ButtonMenu" />
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default Publication;
