import FormCompDict from './form-comp-info';

/**
 * 根据comp获取
 * @param compId
 * @param formDesigner
 */
const getFromCompInfo = (compId: string, formDesigner: FormDesigner): FromCompInfo | undefined => {

    let className: string = '';
    for (const key of Object.keys(formDesigner)) {
        const comps = formDesigner[key].filter(item => item.id === compId);
        if (comps && comps.length !== 0) {
            className = comps[0].type;
            break;
        }
    }

    return FormCompDict[className];
};

/**
 * 根据前缀获取方法
 * @param methodPrefix
 * @param fromCompInfo
 */
const getFromCompMethod = (methodPrefix: string, fromCompInfo: FromCompInfo) => {
    return fromCompInfo.method.filter(item => item.methodName.startsWith(methodPrefix));
};

/**
 * 抽取prefix的组件名和方法名
 * @param prefix
 * @return [组件名,方法名] 组件名和方法名可能都不存在
 */
const extractPrefix = (prefix: string): [string, string] | undefined => {
    if (prefix && prefix.includes('.')) {
        const dotIndex = prefix.lastIndexOf('.');
        const startIndex = prefix.lastIndexOf('.', dotIndex - 1);
        return [prefix.slice(startIndex + 1, dotIndex), prefix.slice(dotIndex + 1)];
    }
};

/**
 * 生成自动完成对象
 * @param prefixPair
 * @param fromCompMethods
 */
const generateCompletions = (prefixPair: [string, string], fromCompMethods: FromCompMethod[]): Completion[] => {
    return fromCompMethods.map(method => {

        const args = Array.from(Array(method.argCount).keys())
            .map(i => '$' + (i + 1))
            .join(', ');

        const snippet = `${prefixPair[0]}.${method.methodName}(${args})$0`;

        return {
            caption: method.methodName,
            value: prefixPair[0] + '.' + method.methodName,
            snippet,
            meta: 'method',
            score: calculateScore(prefixPair[1], method.methodName),
            docHTML: snippet,
        };

    });
};

/**
 * 计算排序评分
 * @param prefix
 * @param value
 */
const calculateScore = (prefix: string, value: string): number => {
    let score = 0;

    const prefixLC = prefix.toLowerCase();
    const valueLC = value.toLowerCase();

    if (valueLC.startsWith(prefixLC)) {
        score += 100;
    } else if (valueLC.includes(prefixLC)) {
        score += 70;
    }

    if (valueLC === prefixLC) {
        score += 30;
    }

    return score;
};

/**
 * 创建方法补全器
 * @param formDesigner
 */
const createMethodCompleter = (formDesigner: FormDesigner) => {
    return {
        id: 'PropertyCompleter',
        // eslint-disable-next-line
        identifierRegexps: [/[a-zA-Z_0-9\.]/],
        getCompletions: (editor: any, session: any, pos: any, prefix: string, callback: CompletionCallback) => {
            const completions: Completion[] = [];

            //根据最后一个.来拆分
            const pair = extractPrefix(prefix);

            if (pair) {

                //取组件信息
                const fromCompInfo = getFromCompInfo(pair[0], formDesigner);
                console.log('fromCompInfo=', fromCompInfo);
                if (fromCompInfo) {
                    //取组件的方法
                    const fromCompMethods = getFromCompMethod(pair[1], fromCompInfo);
                    const c = generateCompletions(pair, fromCompMethods);
                    completions.push(...c);

                    console.log('fromCompMethods=', fromCompMethods);
                    console.log('completions=', completions);
                }

            }

            callback(null, completions);
        }
    };
};

export default createMethodCompleter;