class BinarySearchTree {
    // создание пустого корня в конструктора
    constructor() {
        this._root = null;
    }
    // получение корня
    get root() {
        return this._root;
    }
    // Добавление узла
    insertNodeBinaryTree(data, key) {
        const treeNodeAdd = {
            data: data,
            key: key,
            left: null,
            right: null,
            level: 0,
            position: 30
        };
        if (!this._root) {
            this._root = treeNodeAdd;
        }
        else {
            this.addedTreeNode(this._root, treeNodeAdd);
        }
    }
    // Рекурсивное добавление узлав в дерево
    addedTreeNode(currentTreeNode, addedNodeTree) {
        if (addedNodeTree["key"] === currentTreeNode["key"]) {
            currentTreeNode["data"] = addedNodeTree["data"];
        }
        if (addedNodeTree["key"] < currentTreeNode["key"]) {
            if (!currentTreeNode["left"]) {
                currentTreeNode["left"] = addedNodeTree;
            }
            addedNodeTree["level"]++;
            this.addedTreeNode(currentTreeNode["left"], addedNodeTree);
        }
        if (addedNodeTree["key"] > currentTreeNode["key"]) {
            if (!currentTreeNode["right"]) {
                currentTreeNode["right"] = addedNodeTree;
            }
            addedNodeTree["level"]++;
            this.addedTreeNode(currentTreeNode["right"], addedNodeTree);
        }
    }
    // Поиск узла по ключу
    containsNodeByKey(searchKey) {
        if (this._root == null) {
            return { error: "Дерево пустое" };
        }
        return this.findTreeNode(searchKey, this._root);
    }
    // поиск узла по ключу в ветви
    findTreeNode(key, currentTreeNode) {
        if (key === currentTreeNode["key"]) {
            return currentTreeNode;
        }
        if (key < currentTreeNode["key"]) {
            return this.findTreeNode(key, currentTreeNode["left"]);
        }
        if (key > currentTreeNode["key"]) {
            return this.findTreeNode(key, currentTreeNode["right"]);
        }
    }
    // поиск родителя узла по ключу
    findParentTreeNode(key, currentTreeNode, parent) {
        if (key === currentTreeNode["key"]) {
            return parent;
        }
        if (key < currentTreeNode["key"]) {
            return this.findParentTreeNode(key, currentTreeNode["left"], currentTreeNode);
        }
        if (key > currentTreeNode["key"]) {
            return this.findParentTreeNode(key, currentTreeNode["right"], currentTreeNode);
        }
    }
    // Удаление узла по ключу
    removeNodeByKey(keyDelete) {
        this.removeNode(keyDelete, this._root);
    }
    // рекурсивное удаление узла по ключу из ветви дерева
    removeNode(key, currentNode) {
        if (key === currentNode["key"]) {
            if (currentNode["left"] == null && currentNode["right"] == null) {
                const parent = this.findParentTreeNode(currentNode["key"], this._root);
                if (currentNode["key"] > parent["key"]) {
                    parent["right"] = null;
                }
                else {
                    parent["left"] = null;
                }
            }
            if (currentNode["left"] == null || currentNode["right"] == null) {
                if (currentNode["left"] != null) {
                    currentNode["key"] = currentNode["left"]["key"];
                    currentNode["data"] = currentNode["left"]["data"];
                    currentNode["right"] = currentNode["left"]["right"];
                    currentNode["left"] = currentNode["left"]["left"];
                }
                if (currentNode["right"] != null) {
                    currentNode["key"] = currentNode["right"]["key"];
                    currentNode["data"] = currentNode["right"]["data"];
                    currentNode["left"] = currentNode["right"]["left"];
                    currentNode["right"] = currentNode["right"]["right"];
                }
            }
            if (currentNode["left"] != null && currentNode["right"] != null) {
                if (currentNode["right"]["left"] == null) {
                    currentNode["key"] = currentNode["right"]["key"];
                    currentNode["data"] = currentNode["right"]["data"];
                    currentNode["right"] = currentNode["right"]["right"];
                }
                else {
                    const endLeftNode = this.findLeftNode(currentNode["right"]);
                    currentNode["key"] = endLeftNode["key"];
                    currentNode["data"] = endLeftNode["data"];
                    endLeftNode["key"] += 0.3;
                    this.removeNode(endLeftNode["key"], currentNode);
                }
            }
        }
        else if (key > currentNode["key"]) {
            return this.removeNode(key, currentNode["right"]);
        }
        else {
            return this.removeNode(key, currentNode["left"]);
        }
    }
    // Отрисока и добавления элемента в дереов и select
    addElement(data, key, left, top) {
        const div = document.createElement("div");
        div.innerHTML = String(key);
        div.id = String(key);
        div.style.cssText = "position: absolute; margin-top: " + top + "%; margin-left: " + left + "%;";
        document.getElementById("tree").append(div);
        document.getElementById("select").innerHTML += "<option value= " + String(key) + ">" +
            "Ключ: " + String(key) + "</option>";
    }
    // Поиск левого листового элемента
    findLeftNode(current) {
        if (current["left"] == null) {
            return current;
        }
        return this.findLeftNode(current["left"]);
    }
    // Отрисовка дерева
    drawTree(node) {
        let top = 0;
        if (node["level"] === 0) {
            document.getElementById("tree").innerHTML = "";
            document.getElementById("select").innerHTML = "";
            document.getElementById("findElement").innerHTML = "";
            this.addElement(node["data"], node["key"], node["position"], top);
        }
        if (node["left"]) {
            node["left"]["position"] = node["position"] - (40 / node["left"]["level"] / 2);
            top = node["left"]["level"] * 5;
            this.addElement(node["left"]["data"], node["left"]["key"], node["left"]["position"], top);
            this.drawTree(node["left"]);
        }
        if (node["right"]) {
            node["right"]["position"] = node["position"] + (40 / node["right"]["level"] / 2);
            top = node["right"]["level"] * 5;
            this.addElement(node["right"]["data"], node["right"]["key"], node["right"]["position"], top);
            this.drawTree(node["right"]);
        }
    }
}
const binarySearchTree = new BinarySearchTree();
const arrKey = [18, 22, 7, 2, 63, 21, 11, 3, 23, 1, 68];
const arrData = ["one", "two", "some", "heroes", "souls", "horse", "lucky", "dance", "war", "rock", "trip"];
for (let i = 0; i < arrKey.length; i++) {
    binarySearchTree.insertNodeBinaryTree(arrData[i], arrKey[i]);
}
binarySearchTree.drawTree(binarySearchTree.root);
function find() {
    const key = document.getElementById("select")["value"];
    const element = binarySearchTree.containsNodeByKey(+key);
    document.getElementById("findElement").innerHTML = "Значение с ключем " + key + ": " + element["data"];
}
function add() {
    const key = document.getElementById("valueKey")["value"];
    const value = document.getElementById("valueText")["value"];
    document.getElementById("valueKey")["value"] = "";
    document.getElementById("valueText")["value"] = "";
    binarySearchTree.insertNodeBinaryTree(value, +key);
    binarySearchTree.drawTree(binarySearchTree.root);
}
function remove() {
    const key = document.getElementById("select")["value"];
    binarySearchTree.removeNodeByKey(+key);
    binarySearchTree.drawTree(binarySearchTree.root);
}
