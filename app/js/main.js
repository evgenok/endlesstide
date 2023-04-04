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
      pageYOffset = window.pageYOffset;
      isModalOpen = true;
      // document.addEventListener('scroll', onScroll);
   })
});

closePopupBtn.addEventListener('click', () => {
   popupBg.classList.remove('active');
   popup.classList.remove('active');
   isModalOpen = false;
});

document.addEventListener('click', (event) => {
   if (event.target === popupBg) {
      popupBg.classList.remove('active');
      popup.classList.remove('active');
   }
});

// -------обработка формы

document.addEventListener('DOMContentLoaded', function () {
   const form = document.getElementById('form');

   form.addEventListener('submit', formSend);

   async function formSend(e) {
      e.preventDefault();

      let error = formValidate(form);
      let formData = new FormData(form);

      if (error === 0) {
         form.classList.add('_sending');
         let response = await fetch('sendmail.php', {
            method: 'POST',
            body: formData
         });
         if (response.ok) {
            alert(result.message);
            formPreview.innerHTML = '';
            form.reset();
            form.classList.remove('_sending');
         } else {
            alert('ОШИБКА');
            form.classList.remove('_sending');
         }
      } else {
         alert('Введите корректный Email')
      }
   }

   function formValidate(form) {
      let error = 0;
      let formReq = document.querySelectorAll('._req');

      for (let index = 0; index < formReq.length; index++) {
         const input = formReq[index];
         formRemoveError(input);

         if (input.classList.contains('_email')) {
            if (emailTest(input)) {
               formAddError(input);
               error++;
            }
         }
      }
      return error;
   }
   function formAddError(input) {
      input.parentElement.classList.add('_error');
      input.classList.add('_error');
   }
   function formRemoveError(input) {
      input.parentElement.classList.remove('_error');
      input.classList.remove('_error');
   }
   function emailTest(input) {
      return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value);
   }
});