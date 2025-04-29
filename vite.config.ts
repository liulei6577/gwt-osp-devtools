import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';
import zipPack from 'vite-plugin-zip-pack';
import snippetsPlugin from './vite-plugins/snippetsPlugin';
import markdownToHtml from './vite-plugins/markdownToHtml';
import path from 'path';
import {version} from './package.json';

export default defineConfig({
    base: './',
    plugins: [
        react(),
        markdownToHtml({
            markdownFile: path.resolve(__dirname, 'README.md'),
            out: path.resolve(__dirname, 'dist/readme.html'),
        }),
        snippetsPlugin({
            jsTplFile: path.resolve(__dirname, 'ace-editor/snippets/javascript.js.tpl'),
            snippetsFile: path.resolve(__dirname, 'ace-editor/snippets/javascript.snippets'),
            out: path.resolve(__dirname, 'dist/redirect/javascript.js')
        }),
        zipPack({
            inDir: path.resolve(__dirname, 'dist'),
            outDir: path.resolve(__dirname),
            outFileName: 'gwt-osp-devtools-' + version + '.zip',
        })
    ],
    root: path.resolve(__dirname, 'src'),
    publicDir: path.resolve(__dirname, 'public'),
    build: {
        minify: true,
        outDir: path.resolve(__dirname, 'dist'),
        rollupOptions: {
            input: {
                background: path.resolve(__dirname, 'src/background/index.ts'),
                content: path.resolve(__dirname, 'src/content/index.ts'),
                completion: path.resolve(__dirname, 'src/injected/completion.ts'),
                devtools: path.resolve(__dirname, 'src/devtools.html'),
                popup: path.resolve(__dirname, 'src/popup.html'),
            },
            output: {
                chunkFileNames: 'js/[name].js',
                entryFileNames: 'js/[name].js',
                assetFileNames: '[ext]/[name].[ext]'
            }
        }
    }
});
