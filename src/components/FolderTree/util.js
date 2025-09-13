export const getNode = (tree,nodeId) => {
    let result = null

    tree.forEach(node => {
        if(node.id === nodeId) result = node
        else if(node.childs?.length){
            result = getNode(node.childs,nodeId)
        }
    })

    return result
}

export const deleteNode = (tree,nodeId) => {
    console.log({tree})
    return tree.filter((node) => {
        if(node.id === nodeId) {
            return false
        } else if(node.childs?.length) {
            node.childs = deleteNode(node.childs,nodeId)
        }

        return true
    })
}