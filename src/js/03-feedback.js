import throttle from 'lodash.throttle';

const refs = {
  form: document.querySelector('form'),
  email: document.querySelector('input[name="email"]'),
  messaage: document.querySelector('textarea'),
};

let formData = {};

function onFormInput() {
  formData.email = refs.email.value;
  formData.messaage = refs.messaage.value;

  throttle(saveData, 1000);
}

function onFormSubmit(e) {
  e.preventDefault();
  console.log(formData);
  e.currentTarget.reset();
}

function loadData() {
  formData = JSON.parse(localStorage.getItem('feedback-form-state'));
}

function saveData() {
  localStorage.setItem('feedback-form-state', JSON.stringify(formData));
}

function onLoad() {
  loadData();
  refs.form.addEventListener('input', onFormInput);
  refs.form.addEventListener('submit', onFormSubmit);
}

onLoad();
