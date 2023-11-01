import {PluginOption} from "vite";
import * as fs from "fs";

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
            fs.readFile(options.jsTplFile, {
                encoding: 'utf-8'
            }, (err, jsTplData) => {
                fs.readFile(options.snippetsFile, {
                    encoding: 'utf-8'
                }, (err, data) => {
                    const sss = data.replace(/\\/gi, '\\\\')
                        .replace(/\'/gi, '\\\'')
                        .replace(/\n/gi, '\\n')
                        .replace(/    /gi, '\t')
                    const s = jsTplData.replace("{snippets}", sss)
                    fs.writeFile(options.out, s, () => {
                    })
                })
            })
            console.log('\x1b[36m%s\x1b[0m', '\nsnippets处理完成');
        }
    }
}

export default plugin