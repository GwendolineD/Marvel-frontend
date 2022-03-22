import { useState } from "react";
import axios from "axios";
import { Triangle } from "react-loader-spinner";

const Modal = ({
  setDisplayModal,
  actualAvatar,
  baseUrl,
  token,
  setUserConnected,
}) => {
  const [currentAvatar, setCurrentAvatar] = useState(actualAvatar);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const avatars = [
    "https://res.cloudinary.com/du3ko16j1/image/upload/v1647876729/Marvel/archer_olfscy.jpg",
    "https://res.cloudinary.com/du3ko16j1/image/upload/v1647876752/Marvel/hulk_iqbmkp.jpg",
    "https://res.cloudinary.com/du3ko16j1/image/upload/v1647876753/Marvel/ironman_xtyeif.jpg",
    "https://res.cloudinary.com/du3ko16j1/image/upload/v1647876754/Marvel/thor_b3n5ep.jpg",
    "https://res.cloudinary.com/du3ko16j1/image/upload/v1647876760/Marvel/captain-america_jx8qze.jpg",
    "https://res.cloudinary.com/du3ko16j1/image/upload/v1647876813/Marvel/thanos_-_copie_Small_emibzi.jpg",
    "https://res.cloudinary.com/du3ko16j1/image/upload/v1647876815/Marvel/black-widow_-_copie_Small_lgu71o.jpg",
    "https://res.cloudinary.com/du3ko16j1/image/upload/v1647978305/Marvel/Spider_Man_na7lxl.jpg",
    "https://res.cloudinary.com/du3ko16j1/image/upload/v1647978307/Marvel/deadpool_p2s6mh.jpg",
    "https://res.cloudinary.com/du3ko16j1/image/upload/v1647978312/Marvel/4add457171b651b1362ae462c3b5aa8c_yr4nid.jpg",
    "https://res.cloudinary.com/du3ko16j1/image/upload/v1647978315/Marvel/931e4422c3582a190cf6f2cebafcaef6_ixsq6x.jpg",
    "https://res.cloudinary.com/du3ko16j1/image/upload/v1647978318/Marvel/848b537468a62516c0ea40271f85c5e7_pe2vhw.jpg",
    "https://res.cloudinary.com/du3ko16j1/image/upload/v1647978321/Marvel/Capture_d_e%CC%81cran_2022-03-22_a%CC%80_20.38.34_sk08hw.png",
    "https://res.cloudinary.com/du3ko16j1/image/upload/v1647978323/Marvel/Marvel-Villainous-Loki_afowtn.jpg",
  ];

  const changeAvatar = async () => {
    if (currentAvatar === actualAvatar) {
      setMessage("Votre avatar n'a pas changé !");
    } else {
      setIsLoading(true);
      try {
        console.log("request");
        const { data } = await axios.post(
          `${baseUrl}/changeAvatar`,
          {
            avatar: currentAvatar,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        // console.log("data>>>", data);

        setUserConnected({
          username: data.username,
          avatar: data.avatar,
        });
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
          <p>Votre avatar</p>
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
          <div className="buttonsModal">
            {message && <p>{message}</p>}
            <div
              onClick={() => {
                setDisplayModal(false);
              }}
            >
              Annuler
            </div>

            <div onClick={changeAvatar}>Valider le changement</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Modal;
