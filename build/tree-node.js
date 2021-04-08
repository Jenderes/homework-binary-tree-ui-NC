class BinarySearchTree {
    // создание пустого корня в конструктора
    constructor() {
        this._count = 0;
        this._root = null;
    }
    get root() {
        return this._root;
    }
    insertNodeBinaryTree(data, key) {
        const treeNodeAdd = {
            data: data,
            key: key,
            left: null,
            right: null,
            level: 0,
            position: 30
        };
        let currentTreeNode;
        if (!this._root) {
            this._root = treeNodeAdd;
            currentTreeNode = this._root;
        }
        else {
            treeNodeAdd["level"]++;
            currentTreeNode = this._root;
            while (true) {
                // Если добовляемый ключ равен ключу узла дерава
                if (key === currentTreeNode["key"]) {
                    currentTreeNode["data"] = data;
                    break;
                }
                // если добовляемый ключ меньше ключа узла дерева
                if (key < currentTreeNode["key"]) {
                    if (!currentTreeNode["left"]) {
                        currentTreeNode["left"] = treeNodeAdd;
                        break;
                    }
                    treeNodeAdd["level"]++;
                    currentTreeNode = currentTreeNode["left"];
                    // если добовляемый ключ больше ключа узла дерева
                }
                else {
                    if (!currentTreeNode["right"]) {
                        currentTreeNode["right"] = treeNodeAdd;
                        break;
                    }
                    treeNodeAdd["level"]++;
                    currentTreeNode = currentTreeNode["right"];
                }
            }
        }
        this._count++;
    }
    containsNodeByKey(searchKey) {
        let currentTreeNode = this._root;
        let parent;
        if (this._root == null) {
            return { error: "Дерево пустое" };
        }
        for (let i = 0; i < this._count + 1; i++) {
            if (searchKey === currentTreeNode["key"]) {
                return [currentTreeNode, parent];
            }
            if (searchKey < currentTreeNode["key"]) {
                parent = currentTreeNode;
                currentTreeNode = currentTreeNode["left"];
            }
            else {
                parent = currentTreeNode;
                currentTreeNode = currentTreeNode["right"];
            }
        }
        return { error: "Элемент не найден" };
    }
    removeNodeByKey(keyDelete) {
        if (this._root == null) {
            return { error: "Дерево пустое" };
        }
        let treeNodeReturn;
        let currentTreeNode = this._root;
        while (true) {
            if (keyDelete === currentTreeNode["key"]) {
                if (currentTreeNode["left"] == null && currentTreeNode["right"] == null) {
                    treeNodeReturn = currentTreeNode;
                    const parent = this.containsNodeByKey(currentTreeNode["key"])[1];
                    if (currentTreeNode["key"] > parent["key"]) {
                        parent["right"] = null;
                    }
                    else {
                        parent["left"] = null;
                    }
                    return treeNodeReturn;
                }
                if (currentTreeNode["left"] == null || currentTreeNode["right"] == null) {
                    if (currentTreeNode["left"] != null) {
                        treeNodeReturn = currentTreeNode;
                        currentTreeNode["key"] = currentTreeNode["left"]["key"];
                        currentTreeNode["data"] = currentTreeNode["left"]["data"];
                        currentTreeNode["right"] = currentTreeNode["left"]["right"];
                        currentTreeNode["left"] = currentTreeNode["left"]["left"];
                        return treeNodeReturn;
                    }
                    if (currentTreeNode["right"] != null) {
                        treeNodeReturn = currentTreeNode;
                        currentTreeNode["key"] = currentTreeNode["right"]["key"];
                        currentTreeNode["data"] = currentTreeNode["right"]["data"];
                        currentTreeNode["left"] = currentTreeNode["right"]["left"];
                        currentTreeNode["right"] = currentTreeNode["right"]["right"];
                        return treeNodeReturn;
                    }
                }
                if (currentTreeNode["left"] != null && currentTreeNode["right"] != null) {
                    if (currentTreeNode["right"]["left"] == null) {
                        treeNodeReturn = currentTreeNode;
                        currentTreeNode["key"] = currentTreeNode["right"]["key"];
                        currentTreeNode["data"] = currentTreeNode["right"]["data"];
                        currentTreeNode["right"] = currentTreeNode["right"]["right"];
                        return treeNodeReturn;
                    }
                    let endLeftNode;
                    let currentTreeNodeLeft = currentTreeNode["right"]["left"];
                    while (true) {
                        if (currentTreeNodeLeft["left"] == null) {
                            endLeftNode = currentTreeNodeLeft;
                            break;
                        }
                        currentTreeNodeLeft = currentTreeNodeLeft["left"];
                    }
                    treeNodeReturn = currentTreeNode;
                    currentTreeNode["key"] = endLeftNode["key"];
                    currentTreeNode["data"] = endLeftNode["data"];
                    endLeftNode["key"] += 0.1;
                    this.removeNodeByKey(endLeftNode["key"]);
                    return treeNodeReturn;
                }
            }
            else if (keyDelete > currentTreeNode["key"]) {
                currentTreeNode = currentTreeNode["right"];
            }
            else {
                currentTreeNode = currentTreeNode["left"];
            }
        }
    }
    addElement(value, left, top) {
        const div = document.createElement("div");
        div.innerHTML = String(value);
        div.id = String(value);
        div.style.cssText = "position: absolute; margin-top: " + top + "%; margin-left: " + left + "%;";
        document.getElementById("tree").append(div);
        document.getElementById("select").innerHTML += "<option value= " + String(value) + ">" + String(value) + "</option>";
    }
    drawTree(node) {
        let top = 0;
        if (node["level"] === 0) {
            document.getElementById("tree").innerHTML = "";
            document.getElementById("select").innerHTML = "";
            document.getElementById("findedElement").innerHTML = "";
            this.addElement(node["key"], node["position"], top);
        }
        if (node["left"]) {
            node["left"]["position"] = node["position"] - (30 / node["left"]["level"] / 2);
            top = node["left"]["level"] * 5;
            this.addElement(node["left"]["key"], node["left"]["position"], top);
            this.drawTree(node["left"]);
        }
        if (node["right"]) {
            node["right"]["position"] = node["position"] + (30 / node["right"]["level"] / 2);
            top = node["right"]["level"] * 5;
            this.addElement(node["right"]["key"], node["right"]["position"], top);
            this.drawTree(node["right"]);
        }
    }
}
const BSTtest = new BinarySearchTree();
const arrKey = [18, 22, 7, 2, 63, 21, 11, 3, 23, 1, 68];
for (let i = 0; i < arrKey.length; i++) {
    BSTtest.insertNodeBinaryTree(i + 1, arrKey[i]);
}
BSTtest.drawTree(BSTtest.root);
function find() {
    const key = document.getElementById("select")["value"];
    const element = BSTtest.containsNodeByKey(+key);
    const str = "Значение элементам с ключом " + key + ": " + element[0]["data"];
    document.getElementById("findedElement").innerHTML = str;
}
function add() {
    const key = document.getElementById("insertValueKey")["value"];
    const value = document.getElementById("insertValueText")["value"];
    BSTtest.insertNodeBinaryTree(value, +key);
    BSTtest.drawTree(BSTtest.root);
}
function remove() {
    const key = document.getElementById("select")["value"];
    BSTtest.removeNodeByKey(+key);
    BSTtest.drawTree(BSTtest.root);
}
