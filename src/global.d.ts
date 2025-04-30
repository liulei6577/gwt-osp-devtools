interface Window {
    ace: any;
    manager_0: object;
    contentWindow: object;
    prettier: any;
    showAlert: any;
}

interface HTMLElement {
    contentWindow: any;
}

interface FormComponent {
    group: string;
    type: string;
    id: string;
    name: string;
}

interface FormDesigner {
    [key: string]: FormComponent[];

    modelComps: FormComponent[];
    actionComps: FormComponent[];
    serverScriptComps: FormComponent[];
    uiComps: FormComponent[];
}

interface Completion {
    caption: string;
    value: string | undefined;
    snippet: string | undefined;
    meta: string;
    score: number;
    docHTML: string;
}

type CompletionCallback = (error: Error | null, completions: Completion[]) => void;

interface FromCompInfo {
    clazz: string;
    method: FromCompMethod[];
}

interface FromCompMethod {
    methodName: string;
    argCount: number;
    description?: string | undefined;
}