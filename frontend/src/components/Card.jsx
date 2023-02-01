import {useContext} from "react";
import {currentUserContext} from "../contexts/currentUserContext";

const Card = ({card, onCardClick, onCardLike, onCardDelete}) => {
  const currentUser = useContext(currentUserContext);
  const isOwner = currentUser._id === card.owner._id;
  const isLiked = card.likes.some(like => like._id === currentUser._id);
  const likeButtonClassName = `btn card-list__button-like ${isLiked ? 'card-list__button-like_state_active' : ''}`;

  const handleClick = () => {
    onCardClick(card);
  }

  function handleLikeCard() {
    console.log(card);
    console.log(likeButtonClassName);
    onCardLike(card);
  }

  const handleDeleteCard = (evt) => {
    evt.stopPropagation();
    onCardDelete(card);
  }

  return (
    <li className="card-list__item">
      <div onClick={handleClick} className="card-list__overlay">
        {isOwner && <button className="btn card-list__trash" onClick={(evt) => handleDeleteCard(evt)}></button>}
        <img src={card.link} alt={card.name} className="card-list__image"/>
      </div>
      <div className="card-list__description">
        <h2 className="card-list__place">{card.name}</h2>
        <div className="card-list__likes-container">
          <button type="button" onClick={handleLikeCard} className={likeButtonClassName}></button>
          <span className="card-list__likes">{card.likes.length}</span>
        </div>
      </div>
    </li>
  );
};

export default Card;
