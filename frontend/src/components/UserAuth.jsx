
const UserAuth = ({title, buttonText, onSubmit, children}) => {

  return (
        <form action='#' className='authorization__form' onSubmit={onSubmit}>
          <h2 className='authorization__title'>{title}</h2>
          <fieldset className='authorization__fields-input'>
            {children}
          </fieldset>
          <button
            className='authorization__submit btn'
            type="submit"
          >
            {buttonText}
          </button>
        </form>
  )
}

export default UserAuth;
