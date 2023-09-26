import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from "path"


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  // 还需要去tsconfig中配置
  resolve:{
    alias:{
      "@":path.resolve(__dirname,"./src"),
    }
  }
  
})
