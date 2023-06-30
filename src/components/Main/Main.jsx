import {useEffect, useState} from "react";
import api from "../../utils/api";
import Card from "../Card/Card";


export default function Main({onEditProfile, onEditAvatar, onAddPlace, onCardClick}) {
  const [cards, setCards] = useState([])
  const [user, setUser] = useState({})

  useEffect(() => {
    Promise.all([api.getUserProfile(), api.getInitialCards()])
      .then(([profile, cards]) => {
        setUser({
          userName: profile.name,
          userDescription: profile.about,
          userAvatar: profile.avatar
        })

        cards.forEach(l => l._id === profile._id)
        setCards(cards)
      });
  },[])

  return (
    <main className="content">
      <section className="profile">
        <button
          className="profile__avatar-button"
          type="button"
          aria-label="Редактировать"
          onClick={onEditAvatar}
        >
          <img className="avatar" src={user.userAvatar} alt="Фото профиля"/>
        </button>
        <div className="profile__info">
          <h1 className="profile__name">{user.userName}</h1>
          <button
            className="profile__button-edit"
            type="button"
            aria-label="Редактировать"
            onClick={onEditProfile}
          />
          <p className="profile__about">{user.userDescription}</p>
        </div>
        <button
          className="profile__button-add"
          type="button"
          aria-label="Добавить"
          onClick={onAddPlace}
        />
      </section>
      <section className="photos">
          {cards.map(data => {
            return (
              <div key={data._id}>
                <Card card={data} onCardClick={() => onCardClick(data)}/>
              </div>
            )
          })}
      </section>
    </main>
  )
}