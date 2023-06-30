export default function Card({card, onCardClick}) {
  return (
    <div className="photo">
        <button className="photo__trash" type="button" aria-label="Удалить фото" />
        <img
          className="photo__item"
          src={card.link}
          alt={card.name}
          onClick={() => onCardClick({link: card.link, name: card.name})}
        />
        <div className="photo__info">
          <h3 className="photo__description">{card.name}</h3>
          <div className="photo__like-container">
            <button className="photo__like" type="button" aria-label="Лайк" />
            <h4 className="photo__like-counter">&nbsp;</h4>
          </div>
        </div>
    </div>
  )
}