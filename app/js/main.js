"use strict"

// -------------форма---------------

let popupBg = document.querySelector('.popup__bg');
let popup = document.querySelector('.popup');
let openPopupButton = document.querySelectorAll('.open-popup');
let closePopupBtn = document.querySelector('.close-popup ');

openPopupButton.forEach((button) => {
   button.addEventListener('click', (event) => {
      event.preventDefault();
      popupBg.classList.add('active');
      popup.classList.add('active');
   })
});

closePopupBtn.addEventListener('click', () => {
   popupBg.classList.remove('active');
   popup.classList.remove('active');
});

document.addEventListener('click', (event) => {
   if (event.target === popupBg) {
      popupBg.classList.remove('active');
      popup.classList.remove('active');
   }
});

// -------обработка формы

window.onload = function () {

   // const openFormBtn = document.querySelector('#openFormBtn');
   const orderForm = document.querySelector('#orderForm');
   const submitFormBtn = document.querySelector('#submitFormBtn');


   orderForm.addEventListener('submit', function (e) {
      e.preventDefault();

      const formData = new FormData(orderForm);

      submitFormBtn.setAttribute('disabled', true);
      submitFormBtn.innerText = ('Заявка отправляется...');

      orderForm.querySelectorAll('input, textarea').forEach(function (input) {
         input.setAttribute('disabled', true);
      })

      fetchData();

      async function fetchData() {

         let url = checkOnUrl(document.location.href);

         function checkOnUrl(url) {
            let urlArrayDot = url.split('.');

            if (urlArrayDot[urlArrayDot.length - 1] === 'html') {
               urlArrayDot.pop();
               let newUrl = urlArrayDot.join('.')
               let urlArraySlash = newUrl.split('/');
               urlArraySlash.pop();
               newUrl = urlArraySlash.join('/') + '/';
               return newUrl;
            }
            return url;
         }

         const response = await fetch(url + 'mail.php', {
            method: 'POST',
            headers: {
               'Content-Type': 'application/json;charset=utf-8',
            },
            body: JSON.stringify({
               form: {
                  name: formData.get('name'),
                  email: formData.get('email'),
                  phone: formData.get('phone'),
                  textarea: formData.get('textarea'),
               },
            })
         });


         const result = await response.text();
         console.log(result);

         submitFormBtn.removeAttribute('disabled', true);
         submitFormBtn.innerText = 'Отправить';

         orderForm.querySelectorAll('input, textarea').forEach((input) => {
            input.removeAttribute('disabled', true);
         });

         // Очищаем поля формы
         orderForm.reset();
         orderForm.classList.add('none');

      }

   })
}
