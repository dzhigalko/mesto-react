import {useState, useContext, useEffect} from "react";

import PopupWithForm from "../PopupWithForm/PopupWithForm";
import CurrentUserContext from "../../contexts/CurrentUserContext";

export default function EditProfilePopup({isOpen, onClose, onUpdateUser}) {
  const currentUser = useContext(CurrentUserContext);
  const [name, setName] = useState('');
  const [about, setAbout] = useState('');

  useEffect(() => {
    setName(currentUser.name)
    setAbout(currentUser.about)
  }, [currentUser])
  function handleSubmit(e) {
    e.preventDefault()

    onUpdateUser({
      name,
      about
    })
  }

  return (
    <PopupWithForm
      name='edit-profile'
      title='Редактировать профиль'
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        required=""
        name="name"
        className="popup__input"
        type="text"
        placeholder="Ваше имя"
        minLength={2}
        maxLength={40}
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <span className="popup__error" name="name-error"/>
      <input
        required=""
        name="about"
        className="popup__input"
        type="text"
        placeholder="О себе"
        minLength={2}
        maxLength={200}
        value={about}
        onChange={(e) => setAbout(e.target.value)}
      />
      <span className="popup__error" name="about-error"/>
    </PopupWithForm>
  )
}