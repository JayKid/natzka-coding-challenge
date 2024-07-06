import { TreeViewBaseItem } from '@mui/x-tree-view/models';
import { RichTreeView } from '@mui/x-tree-view/RichTreeView';

const MUI_X_PRODUCTS: TreeViewBaseItem[] = [
    {
        id: 'grid',
        label: 'Data Grid',
        children: [
            {
                id: 'grid-community', label: '@mui/x-data-grid', children: [{
                    id: "sub-child-item", label: "The nested child item"
                }]
            },
            { id: 'grid-pro', label: '@mui/x-data-grid-pro' },
            { id: 'grid-premium', label: '@mui/x-data-grid-premium' },
        ],
    },
]

// TO-DO: Use treeMapper to convert string array input to MUI Rich Tree format

function TreeViewer() {
    return (
        <RichTreeView items={MUI_X_PRODUCTS} />
    )
}

export default TreeViewer