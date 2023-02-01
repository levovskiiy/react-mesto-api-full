const PopupWithForm = ({name, title, children, isOpen, onClose, onSubmit, buttonText}) => {
  return (
    <div className={`popup popup_type_${name} ${isOpen ? 'popup_opened' : ''}`}>
      <div className="popup__container">
        <button
          onClick={onClose}
          type="button"
          className="popup__button popup__button_operation_close"
        ></button>
        <form
          name={name}
          action="#"
          className="popup__form"
          onSubmit={onSubmit}
          noValidate
        >
          <h3 className="popup__title">{title}</h3>
          {children}
          <button
            type="submit"
            className="popup__button popup__button_operation_submit"
          >
            <span className='popup__button-text'>{buttonText}</span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default PopupWithForm;
