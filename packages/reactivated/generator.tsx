import fs from "fs";
import * as generated from "./generated";

// Must be above the compile import as get-stdin used by
// json-schema-to-typescript messes up the descriptor even if unused.
const stdinBuffer = fs.readFileSync(0);

import {compile} from "json-schema-to-typescript";
import {
    Project,
    SourceFile,
    StructureKind,
    SyntaxKind,
    VariableDeclarationKind,
    Scope,
    WriterFunction,
    Writers,
} from "ts-morph";

const schema = JSON.parse(stdinBuffer.toString("utf8"));
const {urls: possibleEmptyUrls, templates, interfaces, types, rpc: untypedRpc, values} = schema;

const rpc: generated.Types["RPCSchema"] = untypedRpc;

const urls: generated.Types["URLSchema"] = {
    ...possibleEmptyUrls,
    __reactivated_do_not_use: {
        route: "__reactivated_do_not_use",
        args: {},
    },
    __reactivated_do_not_use_args: {
        route: "__reactivated_do_not_use_args",
        args: {
            _: "string",
        },
    },
};

const project = new Project();

const sourceFile = project.createSourceFile("");

const classDeclaration = sourceFile.addClass({
   name: "RPC",
   isExported: true,
 });

 classDeclaration.addConstructor({
     parameters: [
         {name: "fetcher", type: "typeof fetch", scope: Scope.Private},
     ],
 })

 for (const name of Object.keys(rpc)) {
     const {url, input, output, instance} = rpc[name];
     const functionDeclaration = classDeclaration.addMethod({
         name,
     })

     if (instance != null) {
        functionDeclaration.addParameter({name: "instance", type: `string | number`});
        functionDeclaration.setBodyText(`return rpcUtils.rpcCall("${url}", input, instance)`);
     }
     else {
        functionDeclaration.setBodyText(`return rpcUtils.rpcCall("${url}", input)`);
     }

     functionDeclaration.addParameter({name: "input", type: `forms.FormOrFormSetValues<_Types["${input}"]>`});
     functionDeclaration.setReturnType(`Promise<rpcUtils.Result<_Types["${output}"], forms.FormOrFormSetErrors<_Types["${input}"]>>>`);
     functionDeclaration.setIsAsync(true);
 }

if (Object.keys(urls).length !== 0) {
    sourceFile.addVariableStatement({
        declarationKind: VariableDeclarationKind.Const,
        declarations: [
            {
                name: "urls",
                initializer: JSON.stringify(urls),
            },
        ],
    });

    const urlMap = sourceFile.addInterface({
        name: "URLMap",
    });
    urlMap.setIsExported(true);

    const withArguments = [""];
    const withoutArguments = [""];

    for (const name of Object.keys(urls)) {
        const properties = urls[name as keyof typeof urls].args;
        const normalizedName = name.replace(/[^\w]/g, "_");

        const urlInterface = sourceFile.addInterface({
            name: normalizedName,
            properties: [{name: "name", type: `'${name}'`}],
        });
        const argsInterface = sourceFile.addInterface({
            name: `${normalizedName}_args`,
        });

        for (const propertyName of Object.keys(properties)) {
            argsInterface.addProperty({
                name: propertyName,
                type: properties[propertyName as keyof typeof properties],
            });
        }
        urlInterface.addProperty({
            name: "args",
            type: `${normalizedName}_args`,
        });

        urlMap.addProperty({
            name: normalizedName,
            type: normalizedName,
        });

        if (Object.keys(properties).length === 0) {
            withoutArguments.push(normalizedName);
        } else {
            withArguments.push(normalizedName);
        }
    }
    sourceFile.addTypeAlias({name: "WithArguments", type: withArguments.join("|")});
    sourceFile.addTypeAlias({
        name: "WithoutArguments",
        type: withoutArguments.join("|"),
    });
    sourceFile.addStatements(`
    export const rpc = new RPC(typeof window != "undefined" ? fetch : null as any);
    type All = WithArguments|WithoutArguments;
    export function reverse<T extends WithoutArguments['name']>(name: T): string;
    export function reverse<T extends WithArguments['name']>(name: T, args: Extract<WithArguments, {name: T}>['args']): string;
    export function reverse<T extends All['name']>(name: T, args?: Extract<WithArguments, {name: T}>['args']): string {
        let route = urls[name].route;

        if (args != null) {
            for (const token of Object.keys(args)) {
                route = route.replace(new RegExp('<(.+?:)' + token + '>'), (args as any)[token]);
            }
        }
        return route;
    }`);
}

sourceFile.addStatements(`
import React from "react"
import createContext from "reactivated/context";
import * as forms from "reactivated/forms";
import * as rpcUtils from "reactivated/rpc";
import * as generated from "reactivated/generated";

// Note: this needs strict function types to behave correctly with excess properties etc.
export type Checker<P, U extends (React.FunctionComponent<P> | React.ComponentClass<P>)> = {};

export const {Context, Provider, getServerData} = createContext<_Types["Context"]>();

export const getTemplate = ({template_name}: {template_name: string}) => {
    // This require needs to be *inside* the function to avoid circular dependencies with esbuild.
    const { default: templates, filenames } = require('../../client/templates/**/*');
    const templatePath = "../../client/templates/" + template_name + ".tsx";
    const possibleTemplate: {default: React.ComponentType<any>} | null = templates.find((t: any, index: number) => filenames[index] === templatePath);

    if (possibleTemplate == null) {
        throw new Error("Template " + template_name + ".tsx not found");
    }
    return possibleTemplate.default;
}

export const CSRFToken = forms.createCSRFToken(Context);

export const {createRenderer, Iterator} = forms.bindWidgetType<_Types["globals"]["Widget"]>();
export type FieldHandler = forms.FieldHandler<_Types["globals"]["Widget"]>;

export const {Form, FormSet, Widget} = forms;
`);

// tslint:disable-next-line
compile(types, "_Types").then((ts) => {
    process.stdout.write("/* eslint-disable */\n");
    process.stdout.write(ts);

    for (const name of Object.keys(templates)) {
        const propsName = templates[name];
        sourceFile.addStatements(`

import ${name}Implementation from "@client/templates/${name}"
export type ${name}Check = Checker<_Types["${propsName}"], typeof ${name}Implementation>;

export namespace templates {
    export type ${name} = _Types["${propsName}"];
}


        `);
    }

    for (const name of Object.keys(interfaces)) {
        const propsName = interfaces[name];
        sourceFile.addStatements(`

export namespace interfaces {
    export type ${name} = _Types["${propsName}"];
}


        `);
    }

    process.stdout.write(sourceFile.getText());
});
