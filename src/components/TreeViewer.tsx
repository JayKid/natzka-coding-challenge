import { RichTreeView } from '@mui/x-tree-view/RichTreeView';
import { mapFilesystemPathsToMUIRichTreeFormat } from '../modules/treeMapper';

const exampleInput = ['/root/test', '/dev/null', '/root/something/somewhere'];

const treeStructuredData = mapFilesystemPathsToMUIRichTreeFormat(exampleInput, {
    showSlashes: true,
});

function TreeViewer() {
    return (
        <section>
            <header>
                <h2>Filesystem representation</h2>
            </header>
            <div className="section-content">
                <RichTreeView items={treeStructuredData} />
            </div>
        </section>
    );
}

export default TreeViewer;
