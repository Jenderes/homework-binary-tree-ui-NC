interface TreeNode<T> {
    data: T;
    key: number | null;
    left: object;
    right: object;
    level: number;
    position: number;
}

class BinarySearchTree {
    private _root: object;

    // создание пустого корня в конструктора
    constructor() {
        this._root = null;
    }

    // получение корня
    get root(): object {
        return this._root;
    }

    // Добавление узла
    public insertNodeBinaryTree<T>(data: T, key: number): void {
        const treeNodeAdd: TreeNode<T> = {
            data: data,
            key: key,
            left: null,
            right: null,
            level: 0,
            position: 30
        };
        if (!this._root) {
            this._root = treeNodeAdd;
        } else {
            this.addedTreeNode(this._root, treeNodeAdd);
        }
    }

    // Рекурсивное добавление узлав в дерево
    private addedTreeNode(currentTreeNode: object, addedNodeTree: object): void {
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
    public containsNodeByKey(searchKey: number): object {
        if (this._root == null) {
            return {error: "Дерево пустое"};
        }
        return this.findTreeNode(searchKey, this._root);
    }

    // поиск узла по ключу в ветви
    private findTreeNode(key: number, currentTreeNode: object): object {
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
    private findParentTreeNode(key: number, currentTreeNode: object, parent?: object): object {
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
    public removeNodeByKey(keyDelete: number): void {
        this.removeNode(keyDelete, this._root);
    }

    // рекурсивное удаление узла по ключу из ветви дерева
    private removeNode(key: number, currentNode: object): void {
        if (key === currentNode["key"]) {
            if (currentNode["left"] == null && currentNode["right"] == null) {
                const parent: object = this.findParentTreeNode(currentNode["key"], this._root);
                if (currentNode["key"] > parent["key"]) {
                    parent["right"] = null;
                } else {
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
                } else {
                    const endLeftNode: object = this.findLeftNode(currentNode["right"]);
                    currentNode["key"] = endLeftNode["key"];
                    currentNode["data"] = endLeftNode["data"];
                    endLeftNode["key"] += 0.3;
                    this.removeNode(endLeftNode["key"], currentNode);
                }
            }
        } else if (key > currentNode["key"]) {
            return this.removeNode(key, currentNode["right"]);
        } else {
            return this.removeNode(key, currentNode["left"]);
        }
    }

    // Отрисока и добавления элемента в дереов и select
    public addElement<T>(data: T, key: number, left: number, top: number): void {
        const div = document.createElement("div");
        div.innerHTML = String(key);
        div.id = String(key);
        div.style.cssText = "position: absolute; margin-top: " + top + "%; margin-left: " + left + "%;";
        document.getElementById("tree").append(div);
        document.getElementById("select").innerHTML += "<option value= " + String(key) + ">" +
            "Ключ: " + String(key) + "</option>";
    }

    // Поиск левого листового элемента
    private findLeftNode(current: object): object {
        if (current["left"] == null) {
            return current;
        }
        return this.findLeftNode(current["left"]);
    }

    // Отрисовка дерева
    public drawTree(): void {
        this.draw(this._root);
    }
    // Рекурсия отрисовки дерева
    private draw(node: object): void {
        let top: number = 0;
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
            this.draw(node["left"]);
        }
        if (node["right"]) {
            node["right"]["position"] = node["position"] + (40 / node["right"]["level"] / 2);
            top = node["right"]["level"] * 5;
            this.addElement(node["right"]["data"], node["right"]["key"], node["right"]["position"], top);
            this.draw(node["right"]);
        }
    }
    // Вывод дерева в консоль
    public printTree(): void {
        console.log(JSON.stringify(this._root));
    }
}

const binarySearchTree = new BinarySearchTree();
const arrKey = [18, 22, 7, 2, 63, 21, 11, 3, 23, 1, 68];
const arrData = ["one", "two", "some", "heroes", "souls", "horse", "lucky", "dance", "war", "rock", "trip"];
for (let i = 0; i < arrKey.length; i++) {
    binarySearchTree.insertNodeBinaryTree(arrData[i], arrKey[i]);
}
binarySearchTree.drawTree();
binarySearchTree.printTree();

function find(): void {
    const key = document.getElementById("select")["value"];
    const element = binarySearchTree.containsNodeByKey(+key);
    document.getElementById("findElement").innerHTML = "Значение с ключем " + key + ": " + element["data"];
}

function add(): void {
    const key = document.getElementById("valueKey")["value"];
    const value = document.getElementById("valueText")["value"];
    document.getElementById("valueKey")["value"] = "";
    document.getElementById("valueText")["value"] = "";
    binarySearchTree.insertNodeBinaryTree(value, +key);
    binarySearchTree.drawTree();
}

function remove(): void {
    const key = document.getElementById("select")["value"];
    binarySearchTree.removeNodeByKey(+key);
    binarySearchTree.drawTree();
}
