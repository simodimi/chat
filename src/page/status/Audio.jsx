import React, { useRef } from "react";
import "./status.css";
import { TbPointFilled } from "react-icons/tb";
import { IoSend } from "react-icons/io5";
import { FaPause } from "react-icons/fa";
import { FaPlay } from "react-icons/fa";
import { RiDeleteBin3Fill } from "react-icons/ri";
import { useState } from "react";
import { useEffect } from "react";

const Audio = () => {
  const [statutrecorder, setStatutRecorder] = useState(false); //statut de l'enregistrement par un point vert
  const [statutpause, setStatutPause] = useState(false); // enregistrement en cours
  const [timer, setTimer] = useState(0); // seconde
  //références pour objet audio
  const audioContextRef = useRef(null); //garder une instance d'audioContextqui permet de traiter et manipuler le flux audio
  const analyserRef = useRef(null); //garder une instance pour analyser l'audio
  const canvasRef = useRef(null); //garder une instance pour le canvas ,barre laterale
  const mediaRecorderRef = useRef(null); //garder une instance de mediaRecorder pour  enregistrer l'audio
  const chunksRef = useRef([]); //garder les morceaux d'audio enregistré

  useEffect(() => {
    let timing;
    if (statutpause) {
      startRecording();
      setStatutRecorder(true);
      if (timer < 1800) {
        timing = setInterval(() => {
          setTimer((prev) => prev + 1);
        }, 1000);
      } else {
        alert("limite de temps atteinte");
        setTimer(timer);
      }
    } else {
      stopRecording();
      setStatutRecorder(false);
    }
    return () => {
      if (timing) {
        clearInterval(timing);
      }
    };
  }, [statutpause]);

  //fonction asynchrone de démarrage de l'enregistrement
  const startRecording = async () => {
    //autorisation accés au microphone
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

    //creer un contexte audio pour traiter le flux audio
    audioContextRef.current = new (window.AudioContext ||
      window.webkitAudioContext)();

    //creer un analyser pour analyser l'audio en temps reel
    analyserRef.current = audioContextRef.current.createAnalyser();

    //creer une source audio à partir du microphone
    const source = audioContextRef.current.createMediaStreamSource(stream);
    source.connect(analyserRef.current);

    //initialisation mediarecorder pour enregistrer les données audio du flux
    mediaRecorderRef.current = new MediaRecorder(stream);
    mediaRecorderRef.current.ondataavailable = (e) => {
      chunksRef.current.push(e.data); //stock les morceaux d'audio enregistré
    };
    mediaRecorderRef.current.start(); //demarrer l'enregistrement
    visualize(); //visualiser l'audio en temps reel
    setTimer(true);
  };

  //fonction pour arreterl'enregistrement
  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop(); //arreter l'enregistrement
      const audioBlob = new Blob(chunksRef.current, { type: "audio/wav" }); // Combine les morceaux d'audio en un Blob unique
      // Vous pouvez maintenant utiliser audioBlob pour lire l'audio ou le télécharger
      chunksRef.current = []; // Vide le tableau de morceaux après l'arrêt de l'enregistrement
    }
    setTimer(false);
  };

  //fonction pour visualiser les donnes audio en temps reel
  const visualize = () => {
    const canvas = canvasRef.current;
    const canvasCtx = canvas.getContext("2d"); //dessiner en 2d
    const analyser = analyserRef.current;

    // Définit la taille du FFT (Fast Fourier Transform) pour analyser les fréquences audio
    analyser.fftSize = 2048;
    const bufferLength = analyser.frequencyBinCount; // Nombre de valeurs de fréquence à analyser
    const dataArray = new Uint8Array(bufferLength); // Tableau pour stocker les valeurs de fréquence

    // Fonction qui dessine les barres représentant les fréquences audio
    const draw = () => {
      requestAnimationFrame(draw); // Appelle draw à chaque image pour créer une animation continue
      analyser.getByteFrequencyData(dataArray); // Remplit dataArray avec les données de fréquence actuelles

      // Efface le canvas pour dessiner les nouvelles barres
      canvasCtx.fillStyle = "rgb(200, 200, 200)";
      canvasCtx.fillRect(0, 0, canvas.width, canvas.height);

      const barWidth = (canvas.width / bufferLength) * 2.5; // Largeur de chaque barre
      let barHeight;
      let x = 0;

      // Parcourt toutes les valeurs de fréquence pour dessiner une barre pour chacune
      for (let i = 0; i < bufferLength; i++) {
        barHeight = dataArray[i]; // Hauteur de la barre basée sur la valeur de fréquence
        canvasCtx.fillStyle = `rgb(${barHeight + 100},50,50)`; // Couleur de la barre basée sur la hauteur
        canvasCtx.fillRect(
          x,
          canvas.height - barHeight / 2,
          barWidth,
          barHeight / 2
        );
        x += barWidth + 1; // Passe à la position suivante pour la prochaine barre
      }
    };

    draw(); // Démarre l'animation de dessin
  };
  return (
    <>
      <div className="ReadAudio">
        <p>
          {!statutrecorder ? (
            <span className="ButtonMenu">
              <TbPointFilled />
            </span>
          ) : (
            <span className="ButtonMenu">
              <TbPointFilled style={{ color: "green" }} />
            </span>
          )}
          <span className="ButtonMenu">
            <canvas ref={canvasRef} width="150" height="50"></canvas>{" "}
          </span>
          <span className="ButtonMenu">
            {Math.floor(timer / 60) < 9 ? "0" : ""}
            {Math.floor(timer / 60)}:{Math.floor(timer % 60) < 9 ? "0" : ""}
            {Math.floor(timer % 60)}
          </span>
          <span className="ButtonMenu">
            {" "}
            <IoSend />
          </span>
        </p>
        <div
          className="CallOption"
          onClick={() => setStatutPause(!statutpause)}
        >
          {!statutpause ? (
            <p>
              <span className="ButtonMenu">
                <FaPlay />
              </span>
              <label>lancer l'enregistrement</label>
            </p>
          ) : (
            <p>
              <span className="ButtonMenu">
                <FaPause />
              </span>
              <label>mettre en pause</label>
            </p>
          )}
          <p>
            <span className="ButtonMenu">
              <RiDeleteBin3Fill />
            </span>
            <label>supprimer</label>
          </p>
        </div>
      </div>
    </>
  );
};

export default Audio;
