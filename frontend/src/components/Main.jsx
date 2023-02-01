import {useContext} from "react";
import Card from "./Card";
import {currentUserContext} from "../contexts/currentUserContext";

const Main = ({cards, onCardDelete, onCardLike, onAddPlace, onEditProfile ,onEditAvatar, onCardClick}) => {
  const {name, about, avatar} = useContext(currentUserContext);

  return (
    <main className="content page__content">
      <section className="profile content__profile">
        <div className='profile__avatar-container'>
          <img src={avatar} alt='Картинка профиля' className="profile__avatar"/>
          <button onClick={onEditAvatar} type='button' className='btn profile__avatar-edit'></button>
        </div>

        <div className="profile__info">
          <h1 className="profile__name">{name}</h1>
          <button onClick={onEditProfile} type="button" className="btn profile__button-edit"></button>
          <p className="profile__description">{about}</p>
        </div>

        <button onClick={onAddPlace} type="button" className="btn profile__button-add"></button>
      </section>

      <section className="elements content__photo-grid">
        <ul className="card-list">
          {cards.map((data) => {
            return <Card
              card={data}
              onCardClick={onCardClick}
              onCardLike={onCardLike}
              onCardDelete={onCardDelete}
              key={data._id}
            />
          })}
        </ul>
      </section>
    </main>
  );
};

export default Main;
