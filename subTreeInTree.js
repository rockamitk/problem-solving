//Take input from console
const readline = require('readline');
const prompt = readline.createInterface(process.stdin, process.stdout);
//Print tree format
const util = require('util');

/**
 * Node structure
 */
class Node { 
    constructor(id) { 
        this.id = id;
        this.left = null; 
        this.right = null;  
    } 
}

/**
 * Traverse each node , return node when node.id = id
 * This method is applicable for Binary & Binary Search Tree
 */
function getKeyRoot(T, key)  { 
    if (T == null) 
        return null; 
    if (T.id == key)  
        return T; 
    return getKeyRoot(T.left, key) || getKeyRoot(T.right, key); 
}

/**
 * Tree has buil as BST
 * Search: O(logN)
 * For Binary tree
 * Search : O(N)
 */
class BinarySearchTree { 
    constructor() { 
        this.root = null; //init root as null
    }
    getRoot() { 
        return this.root; //return root ref
    } 
    add(id){ 
        if(this.root === null) 
            this.root = new Node(id);//first node in the tree 
        else 
            this.insertChild(this.root, new Node(id));//search proper location 
    }
    //add child to balanced position
    insertChild(root, node) { 
        if(node.id < root.id) { 
            if(root.left === null) 
                root.left = node; 
            else
                this.insertChild(root.left, node);  
        }else{ 
            if(root.right === null) 
                root.right = node; 
            else
                this.insertChild(root.right,node); 
        } 
    }
}
/**
 * Take 2 Inputs from console
 * Line1 : list of ids seprated by ' '
 * Line2 : id to search, sub tree 
 * 
    Sample   7 9 10 13 15 17 22 25 27 
//          15 
//         /  \ 
//        10   25 
//       / \   / \ 
//      7  13 22  27 
//     / \    / 
//    5   9  17  
    Sample 4 2 5 1 3 7
             4
           /   \
         2       5
        /  \       \
      1     3       7
*/

prompt.question("Enter enter ids seprated by space , then press Enter\n", function(input){
    const BST = new BinarySearchTree();
    console.log("Line ", input);
    let array = input.split(" ");
    array.forEach(elment =>{
        BST.add(elment);
    });
    let root = BST.getRoot(); 
    console.log("\nTree Structure");
    console.log(util.inspect(root, {showHidden: false, depth: null}));

    prompt.question("\nEnter id to search: ", function(input){
        /**
         * Traverse preorder to search id
         * Preorder traversal could work for both Binary Tree & BinarySearchTree Also.
         */
        let subTreeRoot = getKeyRoot(root, input);

        if(subTreeRoot){
            console.log(util.inspect(subTreeRoot, {showHidden: false, depth: null}))
        }else{
            console.log(`${input} id does not exist.`);
        }
        console.log("\n -------------END------------");
        process.exit();
    });
});
