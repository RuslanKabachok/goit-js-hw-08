import throttle from 'lodash.throttle';

const refs = {
  formEl: document.querySelector('form'),
  email: document.querySelector('input[name="email"]'),
  message: document.querySelector('textarea'),
};

let formData = {};

onLoad();

refs.formEl.addEventListener('input', throttle(onFormInput, 500));
refs.formEl.addEventListener('submit', onFormSubmit);

function onFormSubmit(e) {
  e.preventDefault();
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

  if (savedData) {
    refs.email.value = savedData.email || '';
    refs.message.value = savedData.message || '';
    formData.email = savedData.email || '';
    formData.message = savedData.message || '';
  }
}
