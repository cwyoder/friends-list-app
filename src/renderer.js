const axios = require('axios');

const render = (friends) => {
  const friendsList = document.querySelector('#friends-list');
  const listHTML = friends.map(friend => {
    return `
      <li class='friend' data-id='${friend.id}'>
        <h2>${friend.name}</h2>
        <span>${friend.rating}</span>
        <button class='add-rating'>+</button>
        <button class='minus-rating'>-</button>
        <button class='delete'>x</button>
      </li>
    `
  }).join('');
  friendsList.innerHTML = listHTML;
};

module.exports = {
  render
};
