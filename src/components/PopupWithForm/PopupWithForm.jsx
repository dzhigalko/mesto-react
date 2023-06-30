export default function PopupWithForm({name, title, titleButton, children, isOpen, onClose}) {
  return (
    <div className={`popup popup_type_${name} ${isOpen && 'popup_opened'}`}>
      <div className="popup__container">
        <h2 className="popup__title">{title}</h2>
        <button
          className="popup__close-button"
          type="button"
          aria-label="Закрыть"
          onClick={onClose}
        />
        <form
          className="popup__form popup__profile-form"
          name="profile"
          noValidate=""
        >
          {children}
          <button
            disabled=""
            className="popup__button popup__button_disabled"
            type="submit"
            aria-label="Сохранить"
          >
            {titleButton||'Сохранить'}
          </button>
        </form>
      </div>
    </div>
  )
}