import ComponentLayout from '@/components/app/Layout/ComponentLayout';
import FolderTree from '@/components/FolderTree';
import TreeNodeCode from '@/components/FolderTree/TreeNode?raw';
import FolderTreeCode from '@/components/FolderTree/FolderTree?raw';
import DataCode from '@/components/FolderTree/data.js?raw';
import UtilCode from '@/components/FolderTree/util.js?raw';
import CssCode from '@/components/FolderTree/FolderTree.css?raw';

const config = {
  title: 'Folder Tree',
  files: [
    {
      type: 'js',
      name: 'FolderTree.jsx',
      code: FolderTreeCode,
    },
    {
      type: 'js',
      name: 'TreeNode.jsx',
      code: TreeNodeCode,
    },
    {
      type: 'css',
      name: 'TreeNode.css',
      code: CssCode,
    },
    {
      type: 'js',
      name: 'util.js',
      code: UtilCode,
    },
    {
      type: 'js',
      name: 'data.js',
      code: DataCode,
    },
  ],
};

const FolderTreePage = () => {
  return (
    <ComponentLayout config={config}>
      <FolderTree />
    </ComponentLayout>
  );
};

export default FolderTreePage;
