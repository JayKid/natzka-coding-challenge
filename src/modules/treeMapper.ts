import { TreeViewBaseItem } from "@mui/x-tree-view"

type DisplayOptions = {
    showSlashes: boolean
}

class Tree {
    level: number;
    value: string;
    childNodes: Tree[]

    constructor(paths: string[], level: number) {
        if (paths.length === 0) {
            throw new Error("paths cannot be empty!")
        }
        this.level = level
        this.value = paths[0]
        try {
            this.childNodes = [new Tree(paths.slice(1), level + 1)]
        } catch (err) {
            this.childNodes = []
        }
    }
   
    insertChild(child: Tree): void {
        this.childNodes.push(child);
    }
}

function isTree(tree: Tree | boolean): tree is Tree {
    return (tree as Tree)?.level !== undefined;
}

const createMUIStructureFromTree = (pathsTree: Tree): TreeViewBaseItem | undefined => {
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

export const mapTreeInputToMUIRichTreeFormat = (directoryPaths: string[], options?: DisplayOptions): TreeViewBaseItem[] => {
    // Input validation
    if (directoryPaths.length === 0) {
        return []
    }

    // Initialize variables
    const muiPathsStructure: TreeViewBaseItem[] = [];
    let pathsTrees: Tree[] = [];

    // Process each directory path
    directoryPaths.forEach(path => {
        let nestedDirectories = path.split('/').filter(p => p !== '');

        // Display options
        if (options?.showSlashes) {
            nestedDirectories = nestedDirectories.map(path => {
                return `/${path}`
            })
        }

        // Find if there is already a tree for a part/all of this path
        let currentLevel = 0;

        let foundExistingTreeForDirectory: Tree | boolean = true;
        let nextFoundTreeForDirectory = pathsTrees.find( tree => tree?.value === nestedDirectories[currentLevel]);

        // Check subsequent child paths until there is no match
        while (foundExistingTreeForDirectory && nextFoundTreeForDirectory) {
            currentLevel = currentLevel + 1
            foundExistingTreeForDirectory = nextFoundTreeForDirectory
            nextFoundTreeForDirectory = pathsTrees.find( tree => tree?.value === nestedDirectories[currentLevel]);
        }

        // If there was a partial match, insert the child node where appropriate
        if (isTree(foundExistingTreeForDirectory)) {
            // Create the childNode and
            const leafNode = new Tree(nestedDirectories.slice(currentLevel), currentLevel);

            // Insert in the right place in the existing tree
            foundExistingTreeForDirectory?.insertChild(leafNode)
        }

        // If there was no partial match, create a new Tree for this path
        else {
            pathsTrees = [...pathsTrees, new Tree(nestedDirectories, 0)];
        }
    })
    pathsTrees.forEach(pathTree => {
        const muiStructureFromPathTree = createMUIStructureFromTree(pathTree)
        
        if (muiStructureFromPathTree) {
            muiPathsStructure.push(muiStructureFromPathTree)
        }
    })

    return muiPathsStructure;
}