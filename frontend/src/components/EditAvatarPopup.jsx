import PopupWithForm from "./PopupWithForm";
import {useRef} from "react";

const EditAvatarPopup = ({isOpen, onClose, onUpdateAvatar}) => {
  const avatarRef = useRef();

  const handleSubmit = (evt) => {
    evt.preventDefault();

    onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  };

  return (
    <PopupWithForm
      name="replace-avatar"
      title="Обновить Аватар"
      isOpen={isOpen}
      onClose={onClose}
      buttonText="Сохранить"
      onSubmit={handleSubmit}
    >
      <input
        ref={avatarRef}
        id="linkAvatar"
        name="linkAvatar"
        type="url"
        className="popup__input popup__input_type_link"
        placeholder="Ссылка на новую картинку профиля"
        required
      />
      <span className="popup__input-error linkAvatar-error"></span>
    </PopupWithForm>
  )
};

export default EditAvatarPopup;
