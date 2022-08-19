import { createSSRApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import cyInput from './view-components/cy-input/cy-input.vue'


export function createApp() {
  const app = createSSRApp(App)
  app.use(createPinia())
  app.component('cy-input', cyInput)

  return {
    app,
  };
}
