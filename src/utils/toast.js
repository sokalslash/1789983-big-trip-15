const SHOW_TIME = 5000;

const linkElement = document.createElement('link');
linkElement.rel = 'stylesheet';
linkElement.href = './css/style-toast.css';
document.querySelector('head').append(linkElement);

const toastContainer = document.createElement('div');
toastContainer.classList.add('toast-conteiner');
document.querySelector('.page-body__page-main').prepend(toastContainer);

const toast = (message) => {
  const toastItem = document.createElement('div');
  toastItem.textContent = message;
  toastItem.classList.add('toast-item');

  toastContainer.append(toastItem);

  setTimeout(() => {
    toastItem.remove();
  }, SHOW_TIME);
};

export {toast};
