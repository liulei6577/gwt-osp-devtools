import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'
import zipPack from 'vite-plugin-zip-pack'
import path from 'path'

export default defineConfig({
    base: './',
    plugins: [
        react(),
        zipPack({
            inDir: path.resolve(__dirname, 'dist'),
            outDir: path.resolve(__dirname),
            outFileName: "gwt-osp-devtools.zip",
        })
    ],
    root: path.resolve(__dirname, 'src'),
    publicDir: path.resolve(__dirname, 'public'),
    build: {
        outDir: path.resolve(__dirname, 'dist'),
        rollupOptions: {
            input: {
                background: path.resolve(__dirname, 'src/background/index.ts'),
                devtools: path.resolve(__dirname, 'src/devtools.html'),
            },
            output: {
                chunkFileNames: 'js/[name].js',
                entryFileNames: 'js/[name].js',
                assetFileNames: '[ext]/[name].[ext]'
            }
        }
    }
})
