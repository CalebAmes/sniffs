export const body1 = () => {
  const body = document.getElementById('body');
  body.classList.add('body1');
  body.classList.remove('body2');
}

export const body2 = () => {
  const body = document.getElementById('body');
  body.classList.add('body2');
  body.classList.remove('body1');
}

