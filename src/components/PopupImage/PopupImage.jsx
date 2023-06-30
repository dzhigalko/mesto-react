export default function PopupImage({card, isOpen, onClose}) {
  return (
    <div className={`popup popup_type_image-full ${isOpen && 'popup_opened'}`}>
      <figure className="popup__image-container">
        <button
          className="popup__close-button popup__close-button_type_image-full"
          type="button"
          aria-label="Закрыть"
          onClick={onClose}
        />
        <img
          className="popup__image"
          src={card.link}
          alt={card.name}
        />
        <figcaption className="popup__image-name">{card.name}</figcaption>
      </figure>
    </div>
  )
}