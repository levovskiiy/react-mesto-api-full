import PopupWithForm from "./PopupWithForm";
import {useEffect, useState} from "react";

const AddPlacePopup = ({isOpen, onClose, onUpdatePalce}) => {
  const [placeName, setPlaceName] = useState('');
  const [link, setLink] = useState('');

  function handleSubmit(evt) {
    evt.preventDefault();

    onUpdatePalce({
      name: placeName,
      link: link,
    });
  }

  useEffect(() => {
    setPlaceName('');
    setLink('');
  }, [isOpen]);

  return (
    <PopupWithForm
      name="add-card"
      title="Новое место"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonText="Сохранить"
    >
      <input
        onChange={(evt) => setPlaceName(evt.target.value)}
        value={placeName}
        id="placeName"
        name="name"
        type="text"
        className="popup__input popup__input_type_place"
        placeholder="Название"
        minLength="2"
        maxLength="30"
        required
      />
      <span className="popup__input-error placeName-error"></span>

      <input
        onChange={(evt) => setLink(evt.target.value)}
        value={link}
        id="link"
        name="link"
        type="url"
        className="popup__input popup__input_type_link"
        placeholder="Ссылка на картинку"
        required
      />
      <span className="popup__input-error link-error"></span>

    </PopupWithForm>
  );
};

export default AddPlacePopup;
