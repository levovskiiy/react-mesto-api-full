import PopupWithForm from './PopupWithForm';
import { useContext, useEffect, useState } from 'react';
import { currentUserContext } from '../contexts/currentUserContext';

const EditProfilePopup = ({ isOpen, onClose, onUpdateUser }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const currentUser = useContext(currentUserContext);

  const handleSubmit = evt => {
    evt.preventDefault();

    onUpdateUser({
      username: name,
      description,
    });
  };

  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen]);

  return (
    <PopupWithForm
      name="edit"
      title="Редактировать профиль"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonText="Сохранить"
    >
      <input
        id="username"
        name="username"
        type="text"
        className="popup__input popup__input_type_name"
        placeholder="Имя"
        minLength="2"
        maxLength="40"
        value={name || ''}
        onChange={evt => setName(evt.target.value)}
        required
      />
      <span className="popup__input-error username-error"></span>

      <input
        id="about"
        name="description"
        type="text"
        className="popup__input popup__input_type_descr"
        placeholder="Описание"
        minLength="2"
        maxLength="200"
        value={description || ''}
        onChange={evt => setDescription(evt.target.value)}
        required
      />
      <span className="popup__input-error about-error"></span>
    </PopupWithForm>
  );
};

export default EditProfilePopup;
