import {useRef} from "react";

import PopupWithForm from "../PopupWithForm/PopupWithForm";

export default function EditAvatarPopup({isOpen, onClose, onUpdateAvatar}) {
  const avatarRef = useRef();
  function handleSubmit(e) {
    e.preventDefault();

    onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  }

  return (
    <PopupWithForm
      name='edit-avatar'
      title='Обновить аватар'
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        required=""
        name="avatar"
        className="popup__input"
        type="url"
        placeholder="Ссылка на картинку"
        ref={avatarRef}
        defaultValue={''}
      />
      <span className="popup__error" name="avatar-error"/>
    </PopupWithForm>
  )
}