import './index.css';

import Section from 'components/Section';
import PopupWithImage from 'components/PopupWithImage';
import PopupWithForm from 'components/PopupWithForm';
import PopupWithDeleteCard from 'components/PopupWithDeleteCard';
import FormValidator from 'components/FormValidator';

import { FORMS } from 'utils/constants';
import { FORM_SETTINGS, POPUP_SELECTORS, POPUP_SETTINGS } from 'utils/selectors';
import { addButton, editButton, editProfile, replaceAvatarButton, userInfo } from 'utils/profile';

import api from 'utils/api';
import setAvatar from 'utils/setAvatar';
import { createCard, deleteCard, newCardHandler } from 'utils/cardHandlers';
import Loading from 'components/Loading';

const popupWithImage = new PopupWithImage(POPUP_SELECTORS, POPUP_SELECTORS.type.photo);
const popupWithDeleteCard = new PopupWithDeleteCard(POPUP_SELECTORS.classes, POPUP_SELECTORS.type.deleteCard, card =>
  deleteCard(card, popupWithDeleteCard)
);

const cardList = new Section(item => {
  const card = createCard(item, popupWithImage, popupWithDeleteCard);
  cardList.add(card);
}, '.card-list');

const popupWithAddCard = new PopupWithForm(POPUP_SETTINGS, POPUP_SELECTORS.type.add, values => {
  newCardHandler(values, popupWithAddCard, cardList, popupWithImage, popupWithDeleteCard);
});

const popupWithAddCardValidator = new FormValidator(FORMS.newPlace, FORM_SETTINGS);
popupWithAddCardValidator.enableValidation();

const popupWithProfile = new PopupWithForm(POPUP_SETTINGS, POPUP_SELECTORS.type.edit, values =>
  editProfile(popupWithProfile, values)
);

const popupWithProfileValidator = new FormValidator(FORMS.editProfile, FORM_SETTINGS);
popupWithProfileValidator.enableValidation();

const popupWithReplaceAvatar = new PopupWithForm(POPUP_SETTINGS, POPUP_SELECTORS.type.replaceAvatar, newAvatar =>
  setAvatar(popupWithReplaceAvatar, newAvatar.linkAvatar)
);

const popupWithReplaceAvatarValidator = new FormValidator(FORMS.replaceAvatar, FORM_SETTINGS);
popupWithReplaceAvatarValidator.enableValidation();

function setPopupListeners() {
  popupWithAddCard.setEventListener();
  popupWithImage.setEventListener();
  popupWithProfile.setEventListener();
  popupWithDeleteCard.setEventListener();
  popupWithReplaceAvatar.setEventListener();
}

function filter(cards) {
  return cards.sort((firstCard, secondCard) => {
    console.log(firstCard.likes);
    console.log(secondCard.likes);

    return secondCard.likes.length - firstCard.likes.length;
  });
}

function init() {
  const loadingCardList = new Loading('.card-list');
  const loadingAvatar = new Loading('.profile__avatar');
  loadingCardList.show();
  loadingAvatar.show();
  return api
    .getData()
    .then(result => {
      const [user, initialCards] = result;

      if (!user) {
        throw new Error('Пользователь не найден');
      }

      if (!initialCards) {
        throw new Error('Карточки не найдены');
      }

      userInfo.setUserInfo({
        username: user.name,
        description: user.about,
        avatar: user.avatar,
      });

      userInfo.id = user._id;

      cardList.setItems(initialCards);
      cardList.render();

      return cardList.getItems();
    })
    .catch(e => {
      console.error(`Ошибка: ${e.message}`);
    })
    .finally(() => {
      loadingCardList.hidden();
      loadingAvatar.hidden();
    });
}

function app() {
  init().then(cards => {
    cardList.setItems(filter(cards));
    cardList.clear();
    cardList.render();
  });
  setPopupListeners();
  console.log(cardList.getItems());
  editButton.addEventListener('click', () => {
    popupWithProfile.open(userInfo.getUserInfo());
    popupWithProfileValidator.initialState();
  });

  addButton.addEventListener('click', () => {
    popupWithAddCard.open();
    popupWithAddCardValidator.initialState();
  });

  replaceAvatarButton.addEventListener('click', () => {
    popupWithReplaceAvatar.open();
    popupWithReplaceAvatarValidator.initialState();
  });
}

app();
