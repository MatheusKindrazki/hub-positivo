type CBProps = (id: number, data: any) => void

export default function onSubmitGsc(cb: CBProps): void {
  if (window.gsc) {
    window?.gsc('onSubmit', cb)
  }
}
