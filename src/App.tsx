import React from 'react';
import './App.css';
import { TreeNode, searchTree } from './Tree'
import { cloneDeep } from 'lodash';
import { nodeModuleNameResolver } from 'typescript';


type TreeState = {
    root: TreeNode;
    searchValue: string;
}

function TreeRenderer(props: { node: TreeNode }) {
    return (
        <li style={{ display: props.node.visible ? 'list-item' : 'none' }}>
            {props.node.name}
            <ul>
                {props.node.childs.map((child) => {
                    return <TreeRenderer node={child} />
                })}
            </ul>
        </li>
    )
}

class Tree extends React.Component<{}, TreeState> {
    constructor(props: {}) {
        super(props);
        this.handleChange = this.handleChange.bind(this);

        let root = new TreeNode('abcd');

        let c = new TreeNode('abc');
        root.childs.push(c);
        let c1 = new TreeNode('bc');
        c.childs.push(c1);
        let c2 = new TreeNode('c');
        c.childs.push(c2);

        let d = new TreeNode('bcd');
        root.childs.push(d);

        this.state = { root, searchValue: '' };
    }


    handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        let root = cloneDeep(this.state.root);
        searchTree(root, event.target.value);
        this.setState({ root, searchValue: event.target.value });
        console.log(root)
    }

    render() {
        return <div>
            <input value={this.state.searchValue} onChange={this.handleChange} />
            <ul>
                <TreeRenderer node={this.state.root} />
            </ul>
        </div>
    }
}

function App() {
    return (
        <div className="App">
            <h1>test1</h1>
            <Tree />
        </div>
    );
}

export default App;
