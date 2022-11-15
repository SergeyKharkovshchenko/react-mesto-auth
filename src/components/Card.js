import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { useContext } from "react";

function Card({ card, onCardClick, onCardDelete, onCardLike }) {

  const currentUser = useContext(CurrentUserContext);
  const isLiked = card.likes.some((i) => i._id === currentUser._id);
  const isOwner = card.owner._id == currentUser._id;

  const handleCardClick = () => {
    onCardClick(card);
  };

  const handleCardDeleteClick = () => {
    onCardDelete(card);
  };

  const handleCardLike = () => {
    onCardLike(card);
  };

  return (
    <li className="element" id={card._id} >
      <img
        src={card.link}
        onClick={(e) => {
          handleCardClick(e);
        }}
        className="element__foto"
        alt={`фото ${card.name}`}
      />
      {isOwner && (
        <button
          className="element__thrashbin"
          type="button"
          onClick={(e) => {
            handleCardDeleteClick(e);
          }}
        >
          {" "}
        </button>
      )}
      <div className="element__bottom">
        <h2 className="element__title">{card.name}</h2>
        <div className="element__heart-and-counter">
          <button
            className={
              isLiked
                ? "element__heart element__heart-color-black"
                : "element__heart"
            }
            type="button"
            onClick={(e) => {
              handleCardLike(e);
            }}
          ></button>
          <p className="element__likescounter">{card.likes.length}</p>
        </div>
      </div>
    </li>
  );
}

export default Card;
