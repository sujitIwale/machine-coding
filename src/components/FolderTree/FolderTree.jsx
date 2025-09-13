import { useState } from "react";
import { folderTreeData } from "./data";
import "./FolderTree.css";
import { deleteNode, getNode } from "./util";
import TreeNode from "./TreeNode";

const FolderTree = () => {
  const [data, setData] = useState(folderTreeData);

  const addItem = (
    currentId,
    payload
  ) => {
    const node = getNode(data, currentId);

    if (node) {
      if (!node.childs) {
        node.childs = [];
      }

      node.childs = [...node.childs];
      node.childs.push({
        ...payload,
        id: Date.now(),
      });
    }

    setData(data);
  };

  const deleteItem = (nodeId) => {
    console.log({ data });
    const updatedData = deleteNode(data, nodeId);
    setData(updatedData);
  };

  console.log({ data });

  return (
    <div className="folder-tree">
      {data.map((item) => {
        return (
          <TreeNode
            node={item}
            key={item.id}
            addItem={addItem}
            deleteItem={deleteItem}
          />
        );
      })}
    </div>
  );
};

export default FolderTree;
