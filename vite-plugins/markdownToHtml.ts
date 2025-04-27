import {PluginOption} from 'vite';
import * as fs from 'fs';
import MarkdownIt from 'markdown-it';

export interface Options {
    markdownFile: string;
    out: string;
}

const md = MarkdownIt();

const plugin = (options: Options): PluginOption => {
    return {
        name: 'markdown-to-html-plugin',
        apply: 'build',
        buildStart() {
            const markdown = fs.readFileSync(options.markdownFile, {encoding: 'utf-8'});
            const content = md.render(markdown);

            const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<link href="css/github-markdown.min.css" rel="stylesheet">
<title>README</title>
</head>
<body class="markdown-body">
${content}
</body>
</html>`;

            this.emitFile({
                type: 'asset',
                fileName: 'readme.html',
                source: html,
            });

            console.log('\x1b[36m%s\x1b[0m', '\n' + options.markdownFile + '生成HTML完成');
        }
    };
};

export default plugin;