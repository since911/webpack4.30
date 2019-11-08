import { createApp } from './app'

export default context => {
  return new Promise((resolve, reject) => {
    const { app, router } = createApp()
    router.push(context.url)
    router.onReady(() => {
      const matchedComponents = router.getMatchedComponents()
      console.log(matchedComponents)
      if (!matchedComponents.length) {
        return reject({ code: 222 })
      }
      resolve(app)
    }, reject)
  })
}