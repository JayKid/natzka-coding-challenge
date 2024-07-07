import { TreeViewBaseItem } from "@mui/x-tree-view"

type TreeInput = string[]

type Tree = { level: number, value: string, childNodes: Tree[] } | undefined

const createMUIStructureFromTree = (pathsTree: Tree): TreeViewBaseItem | undefined => {
    // console.log("entering MUI mapper")
    // console.log({ pathsTree })
    if (pathsTree?.value) {
        const children: TreeViewBaseItem[] = [];
        pathsTree.childNodes.forEach(childNode => {
            const mappedChild = createMUIStructureFromTree(childNode);
            if (mappedChild) {
                children.push(mappedChild)
            }
        })
        return { id: pathsTree.value, label: pathsTree.value, children: children }
    }
}

const createTree = (paths: string[], level: number): Tree | undefined => {
    // console.log({ paths, level });
    if (paths.length !== 0) {
        return { level: level, value: paths[0], childNodes: [createTree(paths.slice(1), level + 1)] }
    }
    return undefined
}

export const mapTreeInputToMUIRichTreeFormat = (treeInput: TreeInput): TreeViewBaseItem[] => {
    // console.log(treeInput)
    if (treeInput.length === 0) {
        return []
    }

    const result: TreeViewBaseItem[] = [];

    let pathsTree: Tree[] = [];

    treeInput.forEach(path => {
        const nestedDirectories = path.split('/').filter(p => p !== '');

        pathsTree = [createTree(nestedDirectories, 0)];
        // console.log(JSON.stringify(pathsTree))

        result.push(createMUIStructureFromTree(pathsTree[0])!)
    })

    return result;
}
