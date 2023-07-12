import {useEffect, useState} from 'react';
import Header from "./Header/Header";
import Main from "./Main/Main";
import Footer from "./Footer/Footer";
import PopupWithForm from "./PopupWithForm/PopupWithForm";
import ImagePopup from "./ImagePopup/ImagePopup";
import CurrentUserContext from "../contexts/CurrentUserContext";
import api from "../utils/api";
import AddPlacePopup from "./AddPlacePopup/AddPlacePopup";
import EditProfilePopup from "./EditProfilePopup/EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup/EditAvatarPopup";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false)
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false)
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false)
  const [selectedCard, setSelectedCard] = useState({})
  const [isImagePopup, setImagePopup] = useState(false)
  const [currentUser, setCurrentUser] = useState({})
  const [cards, setCards] = useState([])

  useEffect(() => {
    Promise.all([api.getUserProfile(), api.getInitialCards()])
      .then(([profile, cards]) => {
        setCurrentUser(profile)
        setCards(cards)
      }).catch(err => console.log(`Ошибка ${err}`));
  },[])

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

  function handleCardClick(card){
    setSelectedCard(card)
    setImagePopup(true)
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    const request = isLiked ? api.deleteCardLike : api.addCardLike

    request.apply(api, [card._id]).then((newCard) => {
      setCards((currentCards) => currentCards.map((c) => c._id === card._id ? newCard : c))
    }).catch(err => console.log(`Ошибка ${err}`));
  }

  function handleAddPlace(params) {
    const { name, link } = params

    api.addCard(name, link).then((newCard) => {
      setCards([newCard, ...cards])
      setIsAddPlacePopupOpen(false)
    }).catch(err => console.log(`Ошибка ${err}`));
  }

  function handleCardDelete(card) {
    api.deleteCard(card._id).then(() => {
      setCards((currentCards) => currentCards.filter((c) => c._id !== card._id))
    }).catch(err => console.log(`Ошибка ${err}`));
  }

  function handleUpdateUser(params) {
    const {name, about} = params

    api.changeUserProfile(name, about).then((user) => {
      setCurrentUser({
        ...currentUser,
        name: user.name,
        about: user.about
      })
      setIsEditProfilePopupOpen(false)
    }).catch(err => console.log(`Ошибка ${err}`));
  }

  function handleUpdateAvatar(params) {
    const { avatar } = params;

    api.changeAvatar(avatar).then(function(user) {
      setCurrentUser({
        ...currentUser,
        avatar: user.avatar
      })
      setIsEditAvatarPopupOpen(false)
    }).catch(err => console.log(`Ошибка ${err}`));
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page__content">
        <Header/>

        <Main
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onEditAvatar={handleEditAvatarClick}
          onCardClick={handleCardClick}
          onCardLikeClick={handleCardLike}
          onCardDeleteClick={handleCardDelete}
          cards={cards}
        />

        <Footer/>

        <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser}/>

        <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlace}/>

        <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar}/>

        <PopupWithForm
          name='delete-photo'
          title='Вы уверены?'
          titleButton='Да'
        />

        <ImagePopup
          card={selectedCard}
          isOpen={isImagePopup}
          onClose={closeAllPopups}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
