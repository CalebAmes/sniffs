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

export const footer1 = () => {
  const footer = document.getElementById('footer');
  footer.classList.add('footerDiv2');
  footer.classList.remove('footerDiv1');
}

export const footer2 = () => {
  const footer = document.getElementById('footer');
  footer.classList.add('footerDiv1');
  footer.classList.remove('footerDiv2');
}
