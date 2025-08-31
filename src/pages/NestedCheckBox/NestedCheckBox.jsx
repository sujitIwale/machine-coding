import "./NestedCheckBox.css";

import { useState, useMemo, useCallback, useRef } from "react";

const DUMMY_DATA = {
  id: "root",
  label: "All Categories",
  children: [
    {
      id: "electronics",
      label: "Electronics",
      children: [
        {
          id: "smartphones",
          label: "Smartphones",
          children: [
            { id: "iphone", label: "iPhone" },
            { id: "samsung", label: "Samsung Galaxy" },
            { id: "pixel", label: "Google Pixel" },
          ],
        },
        {
          id: "laptops",
          label: "Laptops",
          children: [
            { id: "macbook", label: "MacBook" },
            { id: "dell", label: "Dell" },
            { id: "hp", label: "HP" },
          ],
        },
        {
          id: "accessories",
          label: "Accessories",
          children: [
            { id: "headphones", label: "Headphones" },
            { id: "cables", label: "Cables" },
            { id: "cases", label: "Cases" },
          ],
        },
      ],
    },
    {
      id: "clothing",
      label: "Clothing",
      children: [
        {
          id: "mens",
          label: "Men's Clothing",
          children: [
            { id: "mens-shirts", label: "Shirts" },
            { id: "mens-pants", label: "Pants" },
            { id: "mens-shoes", label: "Shoes" },
          ],
        },
        {
          id: "womens",
          label: "Women's Clothing",
          children: [
            { id: "womens-dresses", label: "Dresses" },
            { id: "womens-shoes", label: "Shoes" },
            { id: "womens-bags", label: "Bags" },
          ],
        },
      ],
    },
    {
      id: "home",
      label: "Home & Garden",
      children: [
        {
          id: "furniture",
          label: "Furniture",
          children: [
            { id: "chairs", label: "Chairs" },
            { id: "tables", label: "Tables" },
            { id: "sofas", label: "Sofas" },
          ],
        },
        {
          id: "kitchen",
          label: "Kitchen",
          children: [
            { id: "appliances", label: "Appliances" },
            { id: "cookware", label: "Cookware" },
            { id: "utensils", label: "Utensils" },
          ],
        },
      ],
    },
  ],
};

const NestedCheckboxTree = () => {
  const [checked, setChecked] = useState(new Set());
  const [expanded, setExpanded] = useState(
    new Set(["root", "electronics", "clothing", "home"])
  );
  const [searchTerm, setSearchTerm] = useState("");
  const searchInputRef = useRef(null);

  // Get all nodes in flat structure for efficient operations
  const flatNodes = useMemo(() => {
    const nodes = new Map();
    const traverse = (node, parent = null) => {
      nodes.set(node.id, { ...node, parent });
      if (node.children) {
        node.children.forEach((child) => traverse(child, node.id));
      }
    };
    traverse(DUMMY_DATA);
    return nodes;
  }, []);

  // Get all descendants of a node
  const getDescendants = useCallback(
    (nodeId) => {
      const descendants = new Set();
      const traverse = (id) => {
        const node = flatNodes.get(id);
        if (node?.children) {
          node.children.forEach((child) => {
            descendants.add(child.id);
            traverse(child.id);
          });
        }
      };
      traverse(nodeId);
      return descendants;
    },
    [flatNodes]
  );

  // Get all ancestors of a node
  const getAncestors = useCallback(
    (nodeId) => {
      const ancestors = new Set();
      let current = flatNodes.get(nodeId)?.parent;
      while (current) {
        ancestors.add(current);
        current = flatNodes.get(current)?.parent;
      }
      return ancestors;
    },
    [flatNodes]
  );

  // Calculate checkbox state (checked, unchecked, indeterminate)
  const getCheckboxState = useCallback(
    (nodeId) => {
      const descendants = getDescendants(nodeId);
      if (descendants.size === 0) {
        return checked.has(nodeId) ? "checked" : "unchecked";
      }

      const checkedDescendants = Array.from(descendants).filter((id) =>
        checked.has(id)
      );
      const totalDescendants = descendants.size;

      if (checkedDescendants.length === 0) return "unchecked";
      if (checkedDescendants.length === totalDescendants) return "checked";
      return "indeterminate";
    },
    [checked, getDescendants]
  );

  // Handle checkbox toggle
  const handleToggle = useCallback(
    (nodeId) => {
      const newChecked = new Set(checked);
      const descendants = getDescendants(nodeId);
      const currentState = getCheckboxState(nodeId);

      if (currentState === "checked") {
        // Uncheck node and all descendants
        newChecked.delete(nodeId);
        descendants.forEach((id) => newChecked.delete(id));
      } else {
        // Check node and all descendants
        newChecked.add(nodeId);
        descendants.forEach((id) => newChecked.add(id));
      }

      setChecked(newChecked);
    },
    [checked, getDescendants, getCheckboxState]
  );

  // Handle expand/collapse
  const handleToggleExpand = useCallback(
    (nodeId) => {
      const newExpanded = new Set(expanded);
      if (newExpanded.has(nodeId)) {
        newExpanded.delete(nodeId);
      } else {
        newExpanded.add(nodeId);
      }
      setExpanded(newExpanded);
    },
    [expanded]
  );

  // Filter nodes based on search
  const shouldShowNode = useCallback(
    (node) => {
      if (!searchTerm) return true;

      const matchesSearch = node.label
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      if (matchesSearch) return true;

      // Show if any descendant matches
      const checkDescendants = (nodeId) => {
        const nodeData = flatNodes.get(nodeId);
        if (!nodeData?.children) return false;

        return nodeData.children.some((child) => {
          const childNode = flatNodes.get(child.id);
          return (
            childNode.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
            checkDescendants(child.id)
          );
        });
      };

      return checkDescendants(node.id);
    },
    [searchTerm, flatNodes]
  );

  // Get selected items as pills
  const selectedItems = useMemo(() => {
    return Array.from(checked)
      .map((id) => flatNodes.get(id))
      .filter(Boolean)
      .filter((node) => !node.children) // Only leaf nodes
      .sort((a, b) => a.label.localeCompare(b.label));
  }, [checked, flatNodes]);

  // Remove selected item
  const removeSelectedItem = useCallback(
    (nodeId) => {
      const newChecked = new Set(checked);
      newChecked.delete(nodeId);
      setChecked(newChecked);
    },
    [checked]
  );

  // Tree node component
  const TreeNode = ({ node, level = 0 }) => {
    const hasChildren = node.children && node.children.length > 0;
    const isExpanded = expanded.has(node.id);
    const checkboxState = getCheckboxState(node.id);
    const shouldShow = shouldShowNode(node);

    if (!shouldShow) return null;

    return (
      <div
        className="tree-node"
        role="treeitem"
        aria-expanded={hasChildren ? isExpanded : undefined}
      >
        <div
          className="node-content"
          style={{ paddingLeft: `${level * 20 + 8}px` }}
        >
          {hasChildren && (
            <button
              className="expand-button"
              onClick={() => handleToggleExpand(node.id)}
              aria-label={
                isExpanded ? `Collapse ${node.label}` : `Expand ${node.label}`
              }
            >
              {isExpanded ? "▼" : "▶"}
            </button>
          )}

          <label className="checkbox-label">
            <input
              type="checkbox"
              checked={checkboxState === "checked"}
              ref={
                checkboxState === "indeterminate"
                  ? (el) => {
                      if (el) el.indeterminate = true;
                    }
                  : undefined
              }
              onChange={() => handleToggle(node.id)}
              aria-describedby={hasChildren ? `${node.id}-children` : undefined}
            />
            <span className="checkbox-custom"></span>
            <span className="node-label">{node.label}</span>
          </label>
        </div>

        {hasChildren && isExpanded && (
          <div
            className="node-children"
            id={`${node.id}-children`}
            role="group"
          >
            {node.children.map((child) => (
              <TreeNode key={child.id} node={child} level={level + 1} />
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="checkbox-tree-container">
      <div className="search-section">
        <input
          ref={searchInputRef}
          type="text"
          className="search-input"
          placeholder="Search categories..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          aria-label="Search categories"
        />
      </div>

      {selectedItems.length > 0 && (
        <div className="selected-section">
          <h3>Selected Items ({selectedItems.length})</h3>
          <div className="pills-container">
            {selectedItems.map((item) => (
              <div key={item.id} className="pill">
                <span>{item.label}</span>
                <button
                  className="pill-remove"
                  onClick={() => removeSelectedItem(item.id)}
                  aria-label={`Remove ${item.label}`}
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="tree-section">
        <div className="tree-container" role="tree" aria-label="Category tree">
          <TreeNode node={DUMMY_DATA} />
        </div>
      </div>
    </div>
  );
};

export default NestedCheckboxTree;
