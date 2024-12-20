export class Card {
 constructor({item, currentUser, handleCardClick, handleDeleteCard, handleLikeCard}, cardTemplateSelector) {
    this._cardId = item._id;
    this._name = item.name;
    this._link = item.link;
    this._likes = item.likes;
    this._ownerId = item.owner._id;
    this._cardElement = cardTemplateSelector;
    this._handleCardClick = handleCardClick;
    this._handleDeleteCard = handleDeleteCard;
    this._handleLikeCard = handleLikeCard;
    this._currentUser = currentUser;
  }

 _getCardTemplate() {
    return document.querySelector(this._cardElement).content.querySelector('li').cloneNode(true);
  }

 updateLikes(likes, mode) {
    likes.length !== 0
      ? this._cardLikeCounter.textContent = likes.length
      : this._cardLikeCounter.textContent = '0';

    mode === "setLike"
      ? this._cardLikeButton.classList.add('photo-card__like-button_active')
      : "deleteLike"
        ? this._cardLikeButton.classList.remove('photo-card__like-button_active')
        : null

    likes.some(user => user._id === this._currentUser)
      ? this._cardLikeButton.classList.add('photo-card__like-button_active')
      : null;
  }

 _setEventListeners() {
    this._cardLikeButton.addEventListener('click', () => {
      if (!this._cardLikeButton.classList.contains('photo-card__like-button_active')) {
        this._handleLikeCard.handleSetLike(this._cardId, this._cardItem);
      } else {
        this._handleLikeCard.handleDeleteLike(this._cardId, this._cardItem);
      }
    });
    if (this._ownerId === this._currentUser) {
      this._cardDeleteButton.addEventListener('click', () => this._handleDeleteCard(this._cardId, this._cardItem));
    }
    this._cardImage.addEventListener('click', () => this._handleCardClick());
  }

  deleteCard() {
    this._cardItem.remove();
    this._cardItem = null;
  }

 createCard() {
    this._cardItem = this._getCardTemplate();
    this._cardImage = this._cardItem.querySelector('.photo-card__image');
    this._cardLikeButton = this._cardItem.querySelector('.photo-card__like-button');
    this._cardLikeCounter = this._cardItem.querySelector('.photo-card__like-counter');
    this._cardDeleteButton = this._cardItem.querySelector('.photo-card__delete');
    this._cardItem.querySelector('.photo-card__title').textContent = this._name;
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    if (this._ownerId !== this._currentUser) {
      this._cardDeleteButton.remove();
    }
    this.updateLikes(this._likes, "");
    this._setEventListeners();
    return this._cardItem;
  }
}
