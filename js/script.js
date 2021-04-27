/*
Treehouse Techdegree:
FSJS Project 2 - Data Pagination and Filtering
*/

/*
For assistance:
   Check out the "Project Resources" section of the Instructions tab: https://teamtreehouse.com/projects/data-pagination-and-filtering#instructions
   Reach out in your Slack community: https://treehouse-fsjs-102.slack.com/app_redirect?channel=unit-2
*/

/*
Create the `showPage` function
This function will create and insert/append the elements needed to display a "page" of nine students
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

/*
Create the `addPagination` function
This function will create and insert/append the elements needed for the pagination buttons
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
// Call functions
addPagination(data);
