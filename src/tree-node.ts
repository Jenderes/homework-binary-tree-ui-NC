interface TreeNode<T> {
    data: T;
    key: number | null;
    left: object;
    right: object;
    // Данные для отрисовки дерево на html страницы
    // level уровень узла
    level: number;
    // Position позиция по горизонтали
    position: number;
}

class BinarySearchTree {
    private _root: object;
    private _count: number = 0;

    // создание пустого корня в конструктора
    constructor() {
        this._root = null;
    }

    get root(): object {
        return this._root;
    }

    insertNodeBinaryTree<T>(data: T, key: number): void {
        const treeNodeAdd: TreeNode<T> = {
            data: data,
            key: key,
            left: null,
            right: null,
            level: 0,
            position: 30
        };
        let currentTreeNode: object;
        if (!this._root) {
            this._root = treeNodeAdd;
            currentTreeNode = this._root;
        } else {
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
                } else {
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

    containsNodeByKey(searchKey: number): object {
        let currentTreeNode = this._root;
        let parent: object;
        if (this._root == null) {
            return {error: "Дерево пустое"};
        }
        for (let i = 0; i < this._count + 1; i++) {
            if (searchKey === currentTreeNode["key"]) {
                return [currentTreeNode, parent];
            }
            if (searchKey < currentTreeNode["key"]) {
                parent = currentTreeNode;
                currentTreeNode = currentTreeNode["left"];
            } else {
                parent = currentTreeNode;
                currentTreeNode = currentTreeNode["right"];
            }
        }
        return {error: "Элемент не найден"};
    }

    removeNodeByKey<T>(keyDelete: number): object {
        if (this._root == null) {
            return {error: "Дерево пустое"};
        }
        let treeNodeReturn: object;
        let currentTreeNode = this._root;
        while (true) {
            if (keyDelete === currentTreeNode["key"]) {
                if (currentTreeNode["left"] == null && currentTreeNode["right"] == null) {
                        treeNodeReturn = currentTreeNode;
                        const parent: object = this.containsNodeByKey(currentTreeNode["key"])[1];
                        if (currentTreeNode["key"] > parent["key"]) {
                            parent["right"] = null;
                        } else {
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
                    let endLeftNode: object;
                    let currentTreeNodeLeft: object = currentTreeNode["right"]["left"];
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
            } else if (keyDelete > currentTreeNode["key"]) {
                currentTreeNode = currentTreeNode["right"];
            } else {
                currentTreeNode = currentTreeNode["left"];
            }
        }
    }

    addElement<T>(value: T, left: number, top: number): void {
        const div = document.createElement("div");
        div.innerHTML = String(value);
        div.id = String(value);
        div.style.cssText = "position: absolute; margin-top: " + top + "%; margin-left: " + left + "%;";
        document.getElementById("tree").append(div);
        document.getElementById("select").innerHTML += "<option value= " + String(value) + ">" + String(value) + "</option>";
    }

    drawTree(node: object): void {
        let top: number = 0;
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
    BSTtest.insertNodeBinaryTree(i + 1 , arrKey[i]);
}
BSTtest.drawTree(BSTtest.root);
function find(): void {
    const key = document.getElementById("select")["value"];
    const element = BSTtest.containsNodeByKey(+key);
    const str = "Значение элементам с ключом " + key + ": " + element[0]["data"];
    document.getElementById("findedElement").innerHTML = str;
}
function add(): void {
    const key = document.getElementById("insertValueKey")["value"];
    const value = document.getElementById("insertValueText")["value"];
    BSTtest.insertNodeBinaryTree(value, +key);
    BSTtest.drawTree(BSTtest.root);
}
function remove(): void {
    const key = document.getElementById("select")["value"];
    BSTtest.removeNodeByKey(+key);
    BSTtest.drawTree(BSTtest.root);
}
