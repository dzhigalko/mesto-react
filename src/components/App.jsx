import Header from "./Header/Header";
import Main from "./Main/Main";
import Footer from "./Footer/Footer";
import PopupWithForm from "./PopupWithForm/PopupWithForm";
import PopupImage from "./PopupImage/PopupImage";
import {useState} from 'react';
import Card from "./Card/Card";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false)
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false)
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false)
  const [selectedCard, setSelectedCard] = useState({})
  const [isImagePopup, setImagePopup] = useState(false)

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false)
    setIsAddPlacePopupOpen(false)
    setIsEditAvatarPopupOpen(false)
    setImagePopup(false)
    setSelectedCard({})
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true)
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true)
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true)
  }

  // function handleDelete(){
  // }
  function handleCardClick(card){
    setSelectedCard(card)
    setImagePopup(true)
  }

  return (
    <div className="page__content">
      <Header/>

      <Main
        onEditProfile={handleEditProfileClick}
        onAddPlace={handleAddPlaceClick}
        onEditAvatar={handleEditAvatarClick}
        onCardClick={handleCardClick}
      />

      <Footer/>

      <PopupWithForm
        name='edit-profile'
        title='Редактировать профиль'
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
      >
        <input
          required=""
          name="name"
          className="popup__input"
          type="text"
          placeholder="Ваше имя"
          minLength={2}
          maxLength={40}
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
        />
        <span className="popup__error" name="about-error"/>
      </PopupWithForm>

      <PopupWithForm
        name='add-place'
        title='Новое место'
        titleButton='Создать'
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
      >
        <input
          required=""
          name="name"
          className="popup__input"
          type="text"
          placeholder="Название"
          minLength={2}
          maxLength={30}
        />
        <span className="popup__error" name="name-error"/>
        <input
          required=""
          name="link"
          className="popup__input"
          type="url"
          placeholder="Ссылка на картинку"
        />
        <span className="popup__error" name="link-error"/>
      </PopupWithForm>

      <PopupWithForm
        name='edit-avatar'
        title='Обновить аватар'
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
      >
        <input
          required=""
          name="avatar"
          className="popup__input"
          type="url"
          placeholder="Ссылка на картинку"
        />
        <span className="popup__error" name="avatar-error"/>
      </PopupWithForm>

      <PopupWithForm
        name='delete-photo'
        title='Вы уверены?'
        titleButton='Да'
      />

      <PopupImage
        card={selectedCard}
        isOpen={isImagePopup}
        onClose={closeAllPopups}
      />
    </div>
  );
}

export default App;
