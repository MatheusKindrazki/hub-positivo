function setReleaseId(releaseId: string): void {
  window.newrelic?.addRelease('@hub', releaseId)
}

export default setReleaseId
