import React from "react";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";
import api from "../utils/Api";
import useAuth from "../utils/auth";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { CurrentCard } from "../contexts/CurrentCard";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import Login from "./Login";
import Register from "./Register";
import ProtectedRoute from "./ProtectedRoute";
import InfoTooltip from "./InfoTooltip";
import success from "../images/success.svg";
import failed from "../images/noSuccess.svg";

function App() {
  const [isEditAvatarClick, setEditAvatarClick] = React.useState(false);
  const [isEditProfileClick, setEditProfileClick] = React.useState(false);

  const [isAddPlaceClick, setAddPlaceClick] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(null);

  const [isInfoTooltipOpen, setInfoTooltip] = React.useState(false);

  const [currentUser, setCurrentUser] = React.useState({});

  const [currentCards, setCurrentCards] = React.useState([]);

  const [infoToolTipData, setInfoToolTipData] = React.useState({
    title: "",
    image: "",
  });

  const [isLoggedIn, setLoggedIn] = React.useState(false); // статус пользователя(вошел в систему или нет)
  const [isEmailUser, setEmailUser] = React.useState("");

  const navigate = useNavigate();

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    (isLiked ? api.deleteLikeCard(card._id) : api.addLikeCard(card._id))

      .then((newCard) => {
        setCurrentCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }
  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then((res) => {
        setCurrentCards((state) => state.filter((c) => c._id !== card._id));
        // с - объект карточки
        // state - массив карточек до удаления
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleUpdateUser(data) {
    api
      .editInfoUser(data.name, data.about)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleUpdateAvatar(data) {
    api
      .editAvatarUser(data.avatar)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleAddPlaceSubmit(data) {
    api
      .createInitialCards(data.name, data.link)
      .then((newCard) => {
        setCurrentCards([newCard, ...currentCards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function onRegister(email, password) {
    useAuth
      .registerUser(email, password)
      .then(() => {
        setInfoToolTipData({
          image: success,
          title: "Вы успешно зарегистрировались!",
        });
        navigate("/sign-in");
        handleInfoTooltip();
      })
      .catch((err) => {
        setInfoToolTipData({
          image: failed,
          title: "Что-то пошло не так! Попробуйте ещё раз.",
        });
        console.log(err);
        handleInfoTooltip();
      });
  }

  function onLogin(email, password) {
    useAuth
      .loginUser(email, password)
      .then((data) => {
        if (data.token) {
          localStorage.setItem("jwt", data.token);
          setLoggedIn(true);
          setEmailUser(email);
          navigate("/");
        }
      })
      .catch((err) => {
        setInfoToolTipData({
          image: failed,
          title: "Что-то пошло не так! Попробуйте ещё раз.",
        });
        console.log(err);
        handleInfoTooltip();
      });
  }

  function onLoginOut() {
    setLoggedIn(false);
    setEmailUser(null);
    navigate("/sign-in");
    localStorage.removeItem("jwt");
  }

  React.useEffect(() => {
    if (isLoggedIn === true) {
      navigate("/");
    }
  }, [isLoggedIn, navigate]);

  React.useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      useAuth
        .getToken(jwt)
        .then((res) => {
          if (res) {
            setLoggedIn(true);
            setEmailUser(res.data.email);
          }
        })
        .catch((error) => {
          console.error("Error: " + error);
        });
    }
  }, []);

  React.useEffect(() => {
    if (isLoggedIn)
      Promise.all([api.getInfoUser(), api.getInitialCards()])
        .then((res) => {
          setCurrentUser(res[0]);
          setCurrentCards([...res[1]]);
        })

        .catch((err) => {
          console.log(err);
        });
  }, [isLoggedIn]);

  const closeAllPopups = () => {
    setEditAvatarClick(false);
    setEditProfileClick(false);
    setAddPlaceClick(false);
    setSelectedCard(null);
    setInfoTooltip(false);
  };

  const handleEditAvatarClick = () => {
    return setEditAvatarClick(!isEditAvatarClick);
  };

  const handleEditProfileClick = () => {
    return setEditProfileClick(!isEditProfileClick);
  };

  const handleAddPlaceClick = () => {
    return setAddPlaceClick(!isAddPlaceClick);
  };

  const handleCardClick = (card) => {
    setSelectedCard(card);
  };

  const handleInfoTooltip = () => {
    setInfoTooltip(!isInfoTooltipOpen);
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <CurrentCard.Provider value={currentCards}>
        <div className="page">
          <Routes>
            <Route
              path="/sign-in"
              element={
                <>
                  <Header title="Регистрация" route="/sign-up" />
                  <Login onLogin={onLogin} />
                </>
              }
            />
            <Route
              path="/sign-up"
              element={
                <>
                  <Header title="Войти" route="/sign-in" />
                  <Register onRegister={onRegister} />
                </>
              }
            />

            <Route
              exact
              path="/"
              element={
                <>
                  <Header
                    title="Выйти"
                    email={isEmailUser}
                    onClick={onLoginOut}
                    route=""
                  />
                  <ProtectedRoute
                    component={Main}
                    isLogged={isLoggedIn}
                    onEditAvatar={handleEditAvatarClick}
                    onEditProfile={handleEditProfileClick}
                    onAddPlace={handleAddPlaceClick}
                    onCardClick={handleCardClick}
                    cards={currentCards}
                    onCardLike={handleCardLike}
                    onCardDelete={handleCardDelete}
                    setEmailUser={setEmailUser}
                  />
                  <Footer />
                </>
              }
            />

            <Route
              path="*"
              element={
                isLoggedIn ? (
                  <Navigate to="/" replace />
                ) : (
                  <Navigate to="/sign-in" replace />
                )
              }
            />
          </Routes>

          <EditProfilePopup
            isOpen={isEditProfileClick}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
          />

          <AddPlacePopup
            isOpen={isAddPlaceClick}
            onClose={closeAllPopups}
            onUpdatePlace={handleAddPlaceSubmit}
          />

          <EditAvatarPopup
            isOpen={isEditAvatarClick}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
          />

          <ImagePopup
            card={selectedCard}
            onCardClick={handleCardClick}
            onClose={closeAllPopups}
          />

          <InfoTooltip
            image={infoToolTipData.image}
            title={infoToolTipData.title}
            isOpen={isInfoTooltipOpen}
            onClose={closeAllPopups}
          />
        </div>
      </CurrentCard.Provider>
    </CurrentUserContext.Provider>
  );
}

export default App;
