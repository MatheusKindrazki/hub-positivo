export default function gsc() {
  let script = document.createElement('script');

  script.async = true

  script.type = 'text/javascript'

  script.src = process.env.REACT_APP_GSC

  document.head.appendChild(script);

  script.addEventListener('load', () => {
    window.gsc = window.gsc || function () { (gsc.q = gsc.q || []).push(arguments) };
  });
}

export function removeGsc() {
  window.gsc = undefined

  const scripts = document.querySelectorAll('script')

  scripts.forEach(script => {
    const gsc = 'getsitecontrol';

    if(script.src.includes(gsc)) {
      script.remove()
    }
  })
}
