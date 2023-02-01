import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import EditProfilePopup from "./EditProfilePopup";
import api from "../utils/api";
import auth from '../utils/auth';
import { useEffect, useState } from "react";
import { Route, Switch, Redirect, useHistory } from 'react-router-dom';
import { currentUserContext } from "../contexts/currentUserContext";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import Register from './Register';
import ProtectedRoute from './ProtectedRoute';
import Login from './Login';

import resolveRegistration from '../icons/resolveRegistration.svg';
import rejectRegistration from '../icons/rejectRegistration.svg';
import InfoTooltip from './InfoTooltip';



function App() {

  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPalcePupupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isDeleteCardPopupOpen, setIsDeleteCardPopupOpen] = useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);

  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);

  const [loggedIn, setLoggedIn] = useState(false);
  const [messageBeforeRegister, setMessageBeforeRegister] = useState({});
  const [email, setEmail] = useState('');

  const history = useHistory();

  useEffect(() => {
    auth.checkToken()
      .then((res) => {
        const { email } = res;
        setLoggedIn(true);
        setEmail(email);
        history.push('/');
      })
      .catch(err => {
        console.log(err.status);
      })
  }, [history]);

  function registerHandler(userData) {
    auth.register(userData)
      .then(() => {
        setIsInfoTooltipOpen(true);
        setMessageBeforeRegister({
          message: 'Вы успешно зарегистрировались!',
          imagePath: resolveRegistration,
          success: true,
        });
        history.push('/sign-in');
      })
      .catch(err => {
        if (err.status === 400) {
          console.error(`${err.message}\n Некорректно заполнено одно из полей`);
        } else {
          console.error(err.message);
        }
        setIsInfoTooltipOpen(true);
        setMessageBeforeRegister({
          message: 'Что-то пошло не так! Попробуйте ещё раз.',
          imagePath: rejectRegistration,
          success: false,
        })
      });
  }

  function authorizeHandler(userData) {
    auth.authorize(userData)
      .then(() => {
        setLoggedIn(true);
        history.push('/');
      })
      .catch(e => {
        if (e.status === 400) {
          console.error(`${e.message}\nНе передано одно из полей`);
        } else if (e.status === 401) {
          console.error(`${e.message}\nПользователь с указанным email не найден`);
        } else {
          console.error(e.message);
        }
      })
  }

  function signOutHandler() {
    localStorage.removeItem('jwt');
    setLoggedIn(false);
    history.push('/sign-in');
  }

  useEffect(() => {
    api.getData()
      .then((data) => {
        const [user, userCards] = data;
        setCards(userCards);
        setCurrentUser(user);
      })
      .catch(err => {
        console.log(err);
      })
  }, []);

  function handleLikeCard(card) {
    const isLiked = card.likes.some(like => like._id === currentUser._id);
    api.changeLikeStatus(card._id, isLiked)
      .then(newCard => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      })
      .catch(err => {
        console.log(`Произошла ошибка при лайке карточки\n${err}`);
      })
  }

  const handleDeleteCard = (card) => {
    api.deleteCard(card._id)
      .then(() => {
        setCards((cards) => cards.filter((c) => c._id !== card._id));
      })
      .catch(err => {
        console.log(`Произошла ошибка при удалении карточки\n${err}`);
      });
  };

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  };
  const handleEditProfileClick = () => {
    setIsEditProfileOpen(true);
  };
  const handleAddPalceClick = () => {
    setIsAddPalcePupupOpen(true);
  };

  const handleCardClick = (card) => {
    setSelectedCard(card);
  }

  const handleUpdateUser = (userData) => {
    api.editProfile(userData)
      .then(updatedUser => {
        setCurrentUser(updatedUser);
        closeAllPopups();
      })
      .catch(err => {
        console.log(`При обновлении данных пользователя произошла ошибка:\n${err}`);
      });
  };

  const handleUpdateAvatar = (userAvatar) => {
    api.replaceAvatar(userAvatar.avatar)
      .then(data => {
        setCurrentUser({ ...currentUser, avatar: data.avatar });
        closeAllPopups();
      })
      .catch(err => {
        console.log(`При обновлении данных пользователя произошла ошибка:\n${err}`);
      });
  };

  const handleAddPlaceSubmit = (data) => {
    api.postCard(data)
      .then(newCard => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch(err => {
        console.log(`Произошла ошибка при добавлении новой карточки:\n${err}`);
      });
  };

  const closeAllPopups = () => {
    setIsEditProfileOpen(false);
    setIsAddPalcePupupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsDeleteCardPopupOpen(false);
    setIsInfoTooltipOpen(false)
    setSelectedCard({})
  }


  const cardComponentProps = {
    loggedIn: loggedIn,
    cards: cards,
    onCardDelete: handleDeleteCard,
    onCardLike: handleLikeCard,
    onAddPlace: handleAddPalceClick,
    onEditProfile: handleEditProfileClick,
    onEditAvatar: handleEditAvatarClick,
    onCardClick: handleCardClick
  }

  return (
    <currentUserContext.Provider value={currentUser}>
      <Header email={email} onSignOut={signOutHandler} loggedIn={loggedIn} />

      <Switch>
        <Route path="/sign-in">
          <Login onAuth={authorizeHandler} />
        </Route>

        <Route path="/sign-up">
          <Register onRegistration={registerHandler} />
        </Route>

        <ProtectedRoute
          excat path="/"
          component={Main}
          {...cardComponentProps} />

        <Route>
          {loggedIn ? <Redirect to='/' /> : <Redirect to='/sign-in' />}
        </Route>
      </Switch>

      {loggedIn && <Footer />}

      <PopupWithForm
        name="delete-card"
        title="Вы уверены?"
        isOpen={isDeleteCardPopupOpen}
        onClose={closeAllPopups}
        buttonText="Удалить"
      ></PopupWithForm>

      <EditProfilePopup onClose={closeAllPopups} isOpen={isEditProfileOpen} onUpdateUser={handleUpdateUser} />

      <EditAvatarPopup onClose={closeAllPopups} isOpen={isEditAvatarPopupOpen} onUpdateAvatar={handleUpdateAvatar} />
      <AddPlacePopup onClose={closeAllPopups} isOpen={isAddPlacePopupOpen} onUpdatePalce={handleAddPlaceSubmit} />

      <InfoTooltip onClose={closeAllPopups} isOpen={isInfoTooltipOpen} messageBeforeRegistration={messageBeforeRegister} />
      <ImagePopup card={selectedCard} onClose={closeAllPopups} />
    </currentUserContext.Provider>
  );
}

export default App;
