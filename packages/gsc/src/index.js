export default function gsc() {
  window.gsc = window.gsc || function () { (gsc.q = gsc.q || []).push(arguments) };
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
