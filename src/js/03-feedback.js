import throttle from 'lodash.throttle';

const formEl = document.querySelector('form');
let formData = {};

onLoad();

formEl.addEventListener('input', throttle(onFormInput, 500));
formEl.addEventListener('submit', onFormSubmit);

function onFormSubmit(e) {
  e.preventDefault();
  const savedData = JSON.parse(localStorage.getItem('feedback-form-state'));
  formData.email = savedData.email;
  formData.message = savedData.message;
  console.log(formData);
  e.target.reset();
  localStorage.removeItem('feedback-form-state');
}

function onFormInput(e) {
  formData[e.target.name] = e.target.value;
  localStorage.setItem('feedback-form-state', JSON.stringify(formData));
}

function onLoad() {
  const savedData = JSON.parse(localStorage.getItem('feedback-form-state'));
  const email = document.querySelector('input[name="email"]');
  const message = document.querySelector('textarea');

  if (savedData) {
    email.value = savedData.email;
    message.value = savedData.message;
  }
}
