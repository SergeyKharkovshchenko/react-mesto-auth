import Header from "./Header";
import Footer from "./Footer";
import Main from "./Main";
import PopupWithFormComponent from "./PopupWithForm";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import ImagePopup from "./ImagePopup";
import InfoTooltip from "./InfoTooltip";
import ProtectedRoute from "./ProtectedRoute";
import { Login } from "./Login";
import { Register } from "./Register";
import api from "../utils/Api";
import * as auth from "../utils/Auth.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import React, { useCallback, useEffect, useState } from "react";
import { Switch, useHistory } from "react-router";
import { Route, Redirect } from "react-router-dom";

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [userEmail, setUserEmail] = useState("");
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const [isInfoTooltipPopupOpen, setInfoTooltipPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [currentUser, setCurrentUser] = useState("");
  const [cards, setCards] = React.useState([]);
  const [tooltipMessage, setTooltipMessage] = useState("");

  useEffect(() => {
    cbCheckToken();
  }, []);

  useEffect(() => {
    api
      .getUserAndCards()
      .then(([userData, cardData]) => {
        setCards(cardData);
        setCurrentUser(userData);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    api
      .getUserInfo()
      .then((userData) => {
        setCurrentUser(userData);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const cbAuthentificate = useCallback((data, email) => {
    setLoggedIn(true);
    setUserEmail(email);
    localStorage.setItem("jwt", data.token);
  }, []);

  const cbCheckToken = useCallback(async () => {
    try {
      setLoading(true);
      const jwt = localStorage.getItem("jwt");
      if (!jwt) {
        throw new Error("No token in storage");
      }
      const user = await auth.checkToken(jwt);
      if (!user) {
        throw new Error("Invalid user");
      }
      setLoggedIn(true);
      setUserEmail(user.data.email);
    } catch {
    } finally {
      setLoading(false);
    }
  }, []);

  const cbLogin = useCallback(async (email, password) => {
    try {
      const data = await auth.login(email, password);
      if (!data) {
        throw new Error("Invalid credentials");
      }
      if (data) {
        cbAuthentificate(data, email);
      }
    } catch {
      setInfoTooltipPopupOpen(true);
      setTooltipMessage("fail");
    }
  }, []);

  const cbRegister = useCallback(
    async (email, password) => {
      try {
        const data = await auth.register(email, password);
        if (!data) {
          throw new Error("Failed to register");
        }
        if (data) {
          setInfoTooltipPopupOpen(true);
          setTooltipMessage("success");
          cbAuthentificate(data, email);
        }
      } catch {
        setInfoTooltipPopupOpen(true);
        setTooltipMessage("fail");
      }
    },
    [cbAuthentificate]
  );

  const cbLogout = useCallback(() => {
    localStorage.removeItem("jwt");
    setLoggedIn(false);
    setUserEmail("");
  });

  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    // Отправляем запрос в API и получаем обновлённые данные карточки
    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const handleCardDelete = (card) => {
    // используя методы массива, создаем новый массив карточек newCards, где не будет карточки, которую мы только что удалили
    api
      .deleteCardFromCloud(card._id)
      .then(() => {
        setCards((cards) => cards.filter((c) => c._id !== card._id));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  function handleUpdateUser(name, description) {
    api
      .setUserInfo(name, description)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleUpdateAvatar(link) {
    api
      .setUserAvatar(link)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleAddPlaceSubmit(name, link) {
    api
      .addMyCardToCloud(name, link)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleEditAvatarClick() {
    setEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setAddPlacePopupOpen(true);
  }

  function closeAllPopups() {
    setEditAvatarPopupOpen(false);
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setSelectedCard(null);
    setInfoTooltipPopupOpen(false);
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="App">
        <Header onLogout={cbLogout} email={userEmail} />

        <Switch>
          <ProtectedRoute
            exact
            path="/"
            loggedIn={loggedIn}
            cards={cards}
            component={Main}
            onEditAvatar={handleEditAvatarClick}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onCardClick={(card) => setSelectedCard(card)}
            onCardLike={handleCardLike}
            onCardDelete={(card) => handleCardDelete(card)}
          />

          <Route path="/signin">
            <Login isLoggedIn={loggedIn} onLogin={cbLogin} />
          </Route>

          <Route path="/signup">
            <Register
              isLoggedIn={loggedIn}
              onRegister={cbRegister}
              checkToken={cbCheckToken}
            />
          </Route>

          <Route>
            {loggedIn ? <Redirect to="/" /> : <Redirect to="/signin" />}
          </Route>
        </Switch>

        <Footer />

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={(name, description) =>
            handleUpdateUser(name, description)
          }
        />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={(name, link) => handleAddPlaceSubmit(name, link)}
        />

        <PopupWithFormComponent
          name="delete-confirmation"
          title="Вы уверены?"
          isOpen=""
          onClose={closeAllPopups}
          buttonText="Да"
        />

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={(link) => handleUpdateAvatar(link)}
        />

        <InfoTooltip
          isOpen={isInfoTooltipPopupOpen}
          onClose={closeAllPopups}
          message={tooltipMessage}
        />

        <ImagePopup card={selectedCard} isOpen="" onClose={closeAllPopups} />
      </div>
    </CurrentUserContext.Provider>
  );
};

export default App;
