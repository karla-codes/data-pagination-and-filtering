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
            list[i].picture.large
          }" alt="Profile Picture">
          <h3>${
            list[i].name.title +
            ' ' +
            list[i].name.first +
            ' ' +
            list[i].name.last
          }</h3>
          <span class="email">${list[i].email}</span>
        </div>
        <div class="joined-details">
          <span class="date">Joined ${list[i].registered.date}</span>
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
    showPage(list, clickedButton.textContent);
  });
}

// create search component
function addSearchBar() {
  const header = document.querySelector('.header');
  const searchBar = `
  <label for="search" class="student-search">
    <span>Search by name</span>
    <input id="search" placeholder="Search by name...">
    <button type="button"><img src="img/icn-search.svg" alt="Search icon"></button>
  </label>

  `;
  header.insertAdjacentHTML('beforeend', searchBar);

  const searchButton = document.querySelector('.student-search button');
  searchButton.addEventListener('click', e => {
    searchNames();
  });
}

// function that executes search
function searchNames() {
  const searchBar = document.querySelector('.student-search input');
  const inputValue = searchBar.value.toLowerCase();
  const matchingStudents = [];

  for (let i = 0; i < data.length; i++) {
    const name = Object.values(data[i].name).join(' ').toLowerCase();

    if (inputValue !== 0 && name.includes(inputValue)) {
      matchingStudents.push(data[i]);
      showPage(matchingStudents, 1);
      addPagination(matchingStudents);
    }
  }

  if (matchingStudents.length === 0) {
    const header = document.querySelector('.header label');
    const message = document.createElement('h3');
    message.className = 'message';
    message.textContent = 'No results found';
    header.insertAdjacentElement('beforebegin', message);
    showPage(data, 1);
    addPagination(data);
  } else {
    const message = document.querySelector('.message');
    message.textContent = '';
  }
}

showPage(data, 1);
addPagination(data);
addSearchBar();
