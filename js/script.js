/*
Treehouse Techdegree:
FSJS Project 2 - Data Pagination and Filtering
*/

/**
 * Creates and inserts/appends the elements need to display a page of 9 students
 *
 * @param {data} list -data pulled from data.js
 * @param {number} page - the page number in which the elements will be displayed
 */
function showPage(list, page) {
  const startIndex = page * 9 - 9;
  const endIndex = page * 9;
  const ul = document.querySelector('.student-list');
  ul.innerHTML = '';

  for (let i = 0; i < list.length; i++) {
    if (i >= startIndex && i < endIndex) {
      const cardHTML = `
        <li class="student-item cf">
        <div class="student-details">
          <img class="avatar" src="${
            data[i].picture.large
          }" alt="Profile Picture">
          <h3>${
            data[i].name.title +
            ' ' +
            data[i].name.first +
            ' ' +
            data[i].name.last
          }</h3>
          <span class="email">${data[i].email}</span>
        </div>
        <div class="joined-details">
          <span class="date">Joined ${data[i].registered.date}</span>
        </div>
      </li>
      `;
      ul.insertAdjacentHTML('beforeend', cardHTML);
    }
  }
}

/**
 * Creates and inserts/appends pagination buttons
 *
 * @param {data} list - data pulled from data.js
 */
function addPagination(list) {
  const paginationBtns = Math.ceil(list.length / 9);
  const ul = document.querySelector('.link-list');
  ul.innerHTML = '';

  for (let i = 0; i < paginationBtns; i++) {
    const buttonHTML = `
      <li>
        <button type="button">${i + 1}</button>
      </li>
    `;
    ul.insertAdjacentHTML('beforeend', buttonHTML);
  }

  const firstButton = document.querySelector('button');
  firstButton.className = 'active';

  ul.addEventListener('click', e => {
    const activeButton = document.querySelector('.active');
    const clickedButton = e.target;
    activeButton.className = '';
    clickedButton.className = 'active';
    showPage(data, clickedButton.textContent);
  });
}

showPage(data, 1);
addPagination(data);
