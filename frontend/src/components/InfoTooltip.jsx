
const InfoTooltip = (props) => {
  const {onClose, isOpen, messageBeforeRegistration} = props;
  return (
    <div className={`popup popup_type_infoTooltip ${isOpen ? 'popup_opened' : ''}`}>
      <div className='popup__container'>
        <button
          onClick={onClose}
          type="button"
          className="popup__button popup__button_operation_close"
        ></button>
        <div className='tooltip'>
          <img className='tooltip__image' src={messageBeforeRegistration.imagePath} alt='Иконка регистрации' />
          <p className='tooltip__text'>{messageBeforeRegistration.message}</p>
        </div>
      </div>
    </div>
  )
};

export default InfoTooltip;
