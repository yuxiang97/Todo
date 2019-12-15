
import jQuery from 'jquery'
console.log(jQuery)
console.log(jQuery('div'))

import {$, $$, myAjax} from './tools'

let deleteBtn
const getList = () => {
  myAjax({
    url: 'http://localhost:3000/todo',
    method: 'GET',
  }).then(res => {
    const { data } = res
    $('.list .list-group').innerHTML = ''
    data.map(item => {
      const {id, title} = item
      $('.list .list-group').innerHTML += `
      <li class="list-group-item">
        <a href=show.html?objectId=${id}">${title}</a>
        <i data-id="${id}" class="fa fa-close"></i>
      </li>
      `
    })

    deleteBtn = $$('.list-group-item i')
    deleteBtn.forEach(item => {
      item.addEventListener('click', function () {
        if (window.confirm('确定要删除此项吗？')) {
          const objectId = this.getAttribute('data-id')
          myAjax({
            url: `http://localhost:3000/todo/${objectId}`,
            method: 'DELETE',
          }).then(() => getList())
        }
      })
    })
  })
}

getList()
let content = document.querySelector('.form-control')
const todoInput = $('.form-todo input[type=text]')
$('#create-todo').addEventListener('click', function () {
    // console.log(content.value)
  if (content.value !== '') {
    myAjax({
      url: 'http://localhost:3000/todo',
      method: 'POST',
      data: {
        title: todoInput.value
      }
    }).then(() => {
      todoInput.value = ''
      getList()
    }).catch(e => console.log(e))
  } else {
    alert('便签名不能为空')
  }
})





