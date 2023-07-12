import {useState} from "react";

import PopupWithForm from "../PopupWithForm/PopupWithForm";

export default function AddPlacePopup({isOpen, onClose, onAddPlace}) {
  const [name, setName] = useState('');
  const [link, setLink] = useState('');

  function handleSubmit(e) {
    e.preventDefault()

    onAddPlace({
      name,
      link
    })
  }

  return (
    <PopupWithForm
      name='add-place'
      title='Новое место'
      titleButton='Создать'
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        required=""
        name="name"
        className="popup__input"
        type="text"
        placeholder="Название"
        minLength={2}
        maxLength={30}
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <span className="popup__error" name="name-error"/>
      <input
        required=""
        name="link"
        className="popup__input"
        type="url"
        placeholder="Ссылка на картинку"
        value={link}
        onChange={(e) => setLink(e.target.value)}
      />
      <span className="popup__error" name="link-error"/>
    </PopupWithForm>
  )
}