'use strict';

const list = document.querySelector('.list');
const form = document.querySelector('.new-form');
const input = document.querySelector('.footer__input');
const addBtn = document.querySelector('.footer__button');
let itemList = [];

form.addEventListener('submit', (e) => {
  e.preventDefault();
  onAdd();
});

function createItem(text) {
  let id = itemList.indexOf(text);
  const itemRow = document.createElement('li');
  itemRow.setAttribute('class', 'item__row');
  itemRow.setAttribute('data-id', id);
  itemRow.innerHTML = `
  <div class="item">
    <span class="item__name">${text}</span>
    <button class="item__remove">
      <img data-id=${id} src="./img/circle-minus-solid_colored.png"></img>
    </button>
  </div>
  <div class="item__divider"></div>
  `;
  return itemRow;
}
// 원래 list style로 번호 매기려 했는데 스타일 적용이 어려워서 뺌.
// 그 다음엔 innerText에 인덱스+1 넣어서 숫자 뜨게 만드려고 했는데
// 같은 이름을 입력하면 첫번째 인덱스를 찾기 때문에 실패. 일단 없애는 걸로

function onAdd() {
  const text = input.value;
  if (text === '') {
    input.focus();
    return;
  }
  // item.isListed = false;
  itemList.push(text);
  const item = createItem(text);
  list.appendChild(item);
  item.scrollIntoView({ block: 'center' });
  input.value = '';
  input.focus();
}

list.addEventListener('click', (e) => {
  const id = e.target.dataset.id;
  if (id) {
    const toBeDeleted = document.querySelector(`.item__row[data-id="${id}"]`);
    toBeDeleted.remove();
    itemList.splice(id);
  }
});

// TODO 여기에 querySelector로 한번 가져오니까 나중에 추가한 애들은 지워지지가 않음.

// function removeItem(index, parent) {
//   itemList.splice(index);
//   parent.remove();
// }

// let removeBtn = document.querySelectorAll('.item__remove');
// removeBtn.forEach((item) => {
//   item.addEventListener('click', (e) => {
//     let index = itemList.indexOf(item);
//     let target = e.target;
//     let parent = target.parentElement;
//     removeItem(index, parent);
//   });
// });
