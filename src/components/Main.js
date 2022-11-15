import React, { useContext } from "react";
import avaPen from "../images/avatar_pen.svg";
import Card from "./Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Main({
  onEditAvatar,
  onAddPlace,
  onEditProfile,
  onCardClick,
  cards,
  onCardLike,
  onCardDelete,
}) {

  const currentUser = useContext(CurrentUserContext);

  return (

    <main className="main">
      {/* <!-- блок профиль --> */}

      <section className="profile">
        <div className="profile__data">
          <button
            onClick={onEditAvatar}
            className="profile__card"
            type="button"
          >
            <img
              src={`${currentUser.avatar}`}
              className="profile__avatar"
              alt="аватар"
            />
            <img
              src={avaPen}
              alt="Изображение карандаша для редактирования"
              className="profile__hoverImg"
            />
          </button>

          <div className="profile__profile-info">
            <div className="profile__info-first-line">
              <h1 className="profile__title">{currentUser.name}</h1>
              <button
                onClick={onEditProfile}
                className="profile__edit-button"
                type="button"
              >
                {" "}
              </button>
            </div>
            <p className="profile__subtitle">{currentUser.about}</p>
          </div>
        </div>

        <button
          onClick={onAddPlace}
          className="profile__add-button"
          type="button"
        ></button>
      </section>

      {/* <!-- блок элементы --> */}

      <section>
        <ul className="elements">
          {cards.map((card) => (
            <Card
              key={card._id}
              card={card}
              onCardClick={(card) => {
                onCardClick(card);
              }}
              onCardDelete={(card) => {
                onCardDelete(card);
              }}
              onCardLike={(card) => {
                onCardLike(card);
              }}
            />
          ))}
        </ul>
      </section>
    </main>
  );
}

export default Main;
