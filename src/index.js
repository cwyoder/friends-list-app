const axios = require('axios');
const { render } = require('./renderer');

const init = async() => {
  const response = await axios.get('/api/friends');
  const friends = response.data;
  render(friends);
}

init();

document.querySelector('ul').addEventListener('click', async(event) => {
  if (event.target.tagName === 'BUTTON'){
    const buttonCategory = event.target.className;
    const id = event.target.parentNode.getAttribute('data-id');
    if (buttonCategory === 'add-rating'){
      //console.log('plus');
      await axios.put(`/api/friends/${id}`, {
        method: 'plus'
      })
    } else if (buttonCategory === 'minus-rating') {
      // console.log('minus');
      await axios.put(`/api/friends/${id}`, {
        method: 'minus'
      })
    } else if (buttonCategory === 'delete') {
      //console.log('delete');
      await axios.delete(`/api/friends/${id}`, {});
    }
    init();
  }
})
