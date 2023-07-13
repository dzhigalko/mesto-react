export default function PopupWithForm({name, title, titleButton, children, isOpen, onClose, onSubmit}) {
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
          className="popup__form"
          name={name}
          onSubmit={onSubmit}
        >
          {children}
          <button
            className="popup__button"
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