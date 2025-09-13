import { useRef, useState } from "react";

const TreeNode = ({ node, addItem, deleteItem }) => {
  const [expanded, setExpanded] = useState(true);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [addState, setAddState] = useState({
    isFolder: false,
    visible: false,
  });

  console.log({ addState });

  const handleAdd = (e) => {
    e.stopPropagation();
    const isFolder = e.currentTarget?.["name"] === "folder";

    setAddState({
      ...addState,
      isFolder,
      visible: true,
    });
  };

  const handleAddItem = () => {
    console.log("adding item");
    const inputValue = inputRef.current?.value;

    if (inputValue) {
      addItem(node.id, {
        name: inputValue,
        isFolder: addState.isFolder,
      });

      setAddState({ visible: false, isFolder: false });
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleAddItem();
    }
  };

  const handleDelete = () => deleteItem(node.id);

  return (
    <div className="node">
      {node.isFolder ? (
        <>
          <div className="folder-item" onClick={() => setExpanded(!expanded)}>
            <span>📁 {node.name}</span>
            <div>
              <button onClick={handleAdd} name="file">
                +📄
              </button>
              <button name="folder" onClick={handleAdd}>
                +📁
              </button>
              <button onClick={handleDelete}>delete</button>
            </div>
          </div>
          {addState.visible ? (
            <div>
              <input
                type="text"
                autoFocus
                ref={inputRef}
                onKeyDown={handleKeyDown}
                onBlur={() => setAddState({ isFolder: false, visible: false })}
              />
            </div>
          ) : null}

          {node.childs?.length ? (
            <div style={{ display: expanded ? "block" : "none" }}>
              {node.childs.map((item) => (
                <TreeNode
                  node={item}
                  key={item.id}
                  addItem={addItem}
                  deleteItem={deleteItem}
                />
              ))}
            </div>
          ) : null}
        </>
      ) : (
        <div className="folder-item">
          <span>📄 {node.name}</span>
          <button onClick={handleDelete}>delete</button>
        </div>
      )}
    </div>
  );
};

export default TreeNode;
