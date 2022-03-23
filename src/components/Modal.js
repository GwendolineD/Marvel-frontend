import { useState } from "react";
import axios from "axios";
import { Triangle } from "react-loader-spinner";

import avatars from "../assets/avatar.json";

const Modal = ({
  setDisplayModal,
  actualAvatar,
  baseUrl,
  token,
  actualUsername,
  handleConnectDisconnect,
}) => {
  const [currentAvatar, setCurrentAvatar] = useState(actualAvatar);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [newUsername, setNewUsername] = useState(actualUsername);

  const changeAvatar = async () => {
    if (currentAvatar === actualAvatar && newUsername === actualUsername) {
      setMessage("Vous n'avez fait aucun changement !");
    } else {
      setIsLoading(true);
      try {
        console.log("request");
        const { data } = await axios.post(
          `${baseUrl}/user/update`,
          {
            avatar: currentAvatar,
            username: newUsername,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        // console.log("data>>>", data);

        // update the cookies
        handleConnectDisconnect(
          data.token,
          {
            username: data.username,
            avatar: data.avatar,
          },
          data.favoriteCharacters,
          data.favoriteComics
        );

        setMessage("Changement validé !");

        setTimeout(() => {
          setDisplayModal(false);
        }, 2000);
      } catch (error) {
        console.log("catch modal>>>", error.response);
      }
      setIsLoading(false);
    }
  };

  return (
    <div className="modalContainer">
      <div className="modal">
        <div className="currentAvatar">
          <div>
            <input
              type="text"
              value={newUsername}
              onChange={(event) => {
                setNewUsername(event.target.value);
                setMessage("");
              }}
            />
          </div>
          <img src={currentAvatar} alt="avatar actuel" />
        </div>

        <div className="avatarSection">
          <p>Sélectionnez votre nouvel avatar :</p>
          <div className="avatars">
            {avatars.map((imgUrl, index) => {
              return (
                <img
                  src={imgUrl}
                  alt={`avatar n° ${index + 1}`}
                  key={index}
                  className="avatar"
                  onClick={() => {
                    setCurrentAvatar(imgUrl);
                    setMessage("");
                  }}
                />
              );
            })}
          </div>
        </div>

        {isLoading ? (
          <Triangle
            ariaLabel="loading-indicator"
            height="20"
            width="20"
            color="#f0141e"
          />
        ) : (
          <div className="bottomModal">
            <div className="buttonsModal">
              <div
                onClick={() => {
                  setDisplayModal(false);
                }}
              >
                Annuler
              </div>

              <div onClick={changeAvatar}>Valider le changement</div>
            </div>
            {message && <p>{message}</p>}
          </div>
        )}
      </div>
    </div>
  );
};

export default Modal;
