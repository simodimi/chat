/**
 * Composant Video - Permet de sélectionner et afficher des vidéos pour les statuts
 * @param {Function} setMenuaction - Fonction pour gérer l'état du menu
 * @param {boolean} menuaction - État du menu
 * @param {boolean} SeeButton - État de visibilité du bouton
 * @param {Function} setSeeButton - Fonction pour gérer la visibilité du bouton
 */
import React, { useState } from "react";
import "./status.css";

const Video = ({ setMenuaction, menuaction, SeeButton, setSeeButton }) => {
  // État pour stocker la vidéo sélectionnée
  const [selectedVideo, setSelectedVideo] = useState(null);
  // État pour gérer la lecture de la vidéo
  const [isPlaying, setIsPlaying] = useState(false);

  /**
   * Gère la sélection d'une vidéo
   * @param {Event} event - Événement de sélection de fichier
   */
  const handleVideoSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      const videoUrl = URL.createObjectURL(file);
      setSelectedVideo(videoUrl);
      // Cacher le menu après la sélection
      setMenuaction(false);
      setSeeButton(false);
    }
  };

  /**
   * Gère la lecture/pause de la vidéo
   */
  const togglePlay = () => {
    const video = document.getElementById("statusVideo");
    if (video) {
      if (isPlaying) {
        video.pause();
      } else {
        video.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="WriteSmsCallx">
      {/* Zone d'affichage de la vidéo */}
      <div className="showScreenx">
        {selectedVideo ? (
          <div className="video-container">
            <video
              id="statusVideo"
              src={selectedVideo}
              className="showScreenVideo"
              controls
              loop
            />
            <button onClick={togglePlay} className="playButton">
              {isPlaying ? "Pause" : "Lecture"}
            </button>
          </div>
        ) : (
          <p
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
            }}
          >
            Sélectionner une vidéo...
          </p>
        )}
      </div>

      {/* Input pour sélectionner une vidéo */}
      <input
        type="file"
        accept="video/*"
        onChange={handleVideoSelect}
        style={{ display: "none" }}
        id="videoInput"
      />

      {/* Bouton pour ouvrir le sélecteur de fichiers */}
      <div className="StartCamera">
        <button
          onClick={() => document.getElementById("videoInput").click()}
          className="ButtonMenu"
        >
          Choisir une vidéo
        </button>
      </div>

      {/* Bouton pour réinitialiser la sélection */}
      {selectedVideo && (
        <button
          onClick={() => {
            setSelectedVideo(null);
            setIsPlaying(false);
          }}
          className="ButtonMenu"
        >
          Changer de vidéo
        </button>
      )}
    </div>
  );
};

export default Video;
