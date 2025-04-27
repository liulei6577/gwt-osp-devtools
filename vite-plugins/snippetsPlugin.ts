import {PluginOption} from 'vite';
import fs from 'fs-extra';

export interface Options {
    jsTplFile: string;
    snippetsFile: string;
    out: string;
}

const plugin = (options: Options): PluginOption => {
    return {
        name: 'snippets-plugin',
        apply: 'build',
        buildEnd() {
            const tpl = fs.readFileSync(options.jsTplFile, {encoding: 'utf-8'});
            const snippets = fs.readFileSync(options.snippetsFile, {encoding: 'utf-8'});
            const snippetsReplaced = snippets.replace(/\\/gi, '\\\\')
                // eslint-disable-next-line
                .replace(/\'/gi, '\\\'')
                .replace(/\n/gi, '\\n')
                .replace(/\r/gi, '')
                // eslint-disable-next-line
                .replace(/    /gi, '\t');
            const result = tpl.replace('{snippets}', snippetsReplaced);
            fs.writeFileSync(options.out, result);
            console.log('\x1b[36m%s\x1b[0m', '\nsnippets处理完成');
        }
    };
};

export default plugin;