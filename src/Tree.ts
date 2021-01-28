import { rootCertificates } from "tls";


export class TreeNode {
    name: string;
    childs: TreeNode[] = [];
    visible: boolean = true;

    constructor(name: string) {
        this.name = name;
    }
}

export function makeVisibleRecursive(node: TreeNode) {
    node.visible = true;
    node.childs.forEach(makeVisibleRecursive);
}

export function makeInvisibleRecursive(node: TreeNode) {
    node.visible = false;
    node.childs.forEach(makeInvisibleRecursive);
}

export function searchTree(node: TreeNode, value: string) {
    if (node.name.includes(value)) {
        node.visible = true;
        node.childs.forEach((childNode) => searchTree(childNode, value));
    } else {
        makeInvisibleRecursive(node);
    }
}
