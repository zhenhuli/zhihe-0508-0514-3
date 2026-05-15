export default defineNuxtConfig({
  devtools: { enabled: true },
  css: [
    'uikit/dist/css/uikit.min.css'
  ],
  app: {
    head: {
      title: 'CSS 关键帧动画实验室',
      link: [
        { rel: 'stylesheet', href: 'https://cdn.jsdelivr.net/npm/uikit@3.21.0/dist/css/uikit.min.css' }
      ],
      script: [
        { src: 'https://cdn.jsdelivr.net/npm/uikit@3.21.0/dist/js/uikit.min.js', body: true },
        { src: 'https://cdn.jsdelivr.net/npm/uikit@3.21.0/dist/js/uikit-icons.min.js', body: true }
      ]
    }
  }
})
