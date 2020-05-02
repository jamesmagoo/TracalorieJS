// Storage Controller Module

// Item Controller Module
const ItemCtrl = (function(){
    // Item Constructor
    const Item = function(id, name, calories){
        this.id = id;
        this.name = name;
        this.calories = calories;
    }

    // Create Data Structure (similar to State)
    const state = {
        items : [
            // Dummy data
            // {id : 0, name : 'Steak', calories : 350},
            // {id : 1, name : 'BP Coffee', calories : 110},
            // {id : 2, name : 'Omelete', calories : 500}
        ],
        currentItem : null,
        totalCalories : 0
    }
    // Public Methods
    return {
        getItems : () => {return state.items },
        addItem : (name, calories) => {
            // Generate ID's automatically
            let ID ;
            if (state.items.length > 0){
                ID = state.items[state.items.length - 1].id + 1 ;
            } else {
                ID = 0 ;
            }

            // Calories to number
            calories = parseInt(calories);

            // Create New Item Object
            const newItem = new Item(ID, name, calories) ;

            // Push to Data Structure (Items Array)
            state.items.push(newItem);

            return newItem ;
        },
        updateItem : (name, calories) => {

            calories = parseInt(calories);

            let found = null ;

            state.items.forEach((item)=>{
                if(item.id === state.currentItem.id){
                    item.name = name ;
                    item.calories = calories ;
                    found = item ;
                }
            })
            return found ;
        },
        deleteItem : (item) => {

            // Get ids
            const ids = state.items.map(x => {return x.id ;})

            // Get index 
            const index = ids.indexOf(item.id)

            // Remove item
            state.items.splice(index, 1);

        },
        clearAllItems : () => {
            state.items = [];
        },

        getItemById : (id) =>{
        
            let found = null;

            state.items.forEach(function(item){

                if(item.id === id){
                    found = item ;
                }
            })
            return found ;

        },
        setCurrentItem : (x)=>{
            state.currentItem = x ;
        },
        getCurrentItem : () => {
            return state.currentItem ;
        },
        getTotalCalories : () => {
            let total = 0

            state.items.forEach(function(x){
                total += x.calories
            })

            state.totalCalories = total ;

            return state.totalCalories ;
        },

        logState : () => {return state } 
         
    };

})();

// UI Controller Module
const UICtrl = (function(){
    // Use UI selectors for more efficient code
    const UISelectors = {
        itemList : "#item-list",
        listItems : "#item-list li",
        addBtn : '.add-btn',
        deleteBtn : '.delete-btn',
        clearBtn : '.clear-btn',
        backBtn : '.back-btn',
        updateBtn : '.update-btn',
        itemNameInput : '#item-name',
        itemCalInput : '#item-calories',
        totalCalories : '.total-calories'
    }


    // Public Methods
    return {
        populateItemList : (items) => {
            let html = '' ;
            items.forEach(function(item){
                html += `
                <li class="collection-item" id="${item.id}">
                <strong>${item.name}: </strong> <em>${item.calories} Calories</em>
                <a href="#" class="secondary-content">
                  <i class="edit-item fa fa-pencil"></i>
                </a>
              </li>`
            })

            document.querySelector(UISelectors.itemList).innerHTML = html ;
        },

        addListItem : (item) =>{
            // Show the list
            document.querySelector(UISelectors.itemList).style.display = 'block' ;
            // Create li element to insert to DOM
            const li = document.createElement('li');
            // Add class
            li.className = 'collection-item';
            // Add dynamic element id
            li.id = `item-${item.id}`;
            // Add HTML
            li.innerHTML = `<strong>${item.name}: </strong> <em>${item.calories} Calories</em>
            <a href="#" class="secondary-content">
              <i class="edit-item fa fa-pencil"></i>
            </a>`

            // Insert to DOM
            document.querySelector(UISelectors.itemList).insertAdjacentElement('beforeend', li);
        },

        updateListItem : (item) => {
            // Get all the list items from the DOM to loop through
            let listItems = document.querySelectorAll(UISelectors.listItems) ;
            
            // Convert into an array as this is a Node List
            listItems = Array.from(listItems);


            listItems.forEach(function(listItem){
                const itemID = listItem.getAttribute('id');

                if(itemID === `item-${item.id}`){
                    // Update name & calories
                    document.querySelector(`#item-${item.id}`).innerHTML = `<strong>${item.name}: </strong> <em>${item.calories} Calories</em>
                    <a href="#" class="secondary-content">
                      <i class="edit-item fa fa-pencil"></i>
                    </a>`;
                    
                }
            })

        },
        deleteListItem : (item) => {
            const itemToDelete = document.querySelector(`#item-${item.id}`);

            itemToDelete.remove();
            
        },

        hideList : () => {
            document.querySelector(UISelectors.itemList).style.display = 'none' ;
        },

        getUISelectors : () => {return UISelectors},

        clearInput : () => {
            document.querySelector(UISelectors.itemCalInput).value = '' ;
            document.querySelector(UISelectors.itemNameInput).value = '' ;
        },

        removeItems: () => {
            let listItems = document.querySelectorAll(UISelectors.listItems);

            // Turn node list into array 
            listItems = Array.from(listItems);

            listItems.forEach(function(item){
                item.remove();
            })

        },

        addItemToForm : () => {
            document.querySelector(UISelectors.itemNameInput).value = ItemCtrl.getCurrentItem().name ; 
            document.querySelector(UISelectors.itemCalInput).value = ItemCtrl.getCurrentItem().calories ; 
            UICtrl.showEditState();

        },

        showTotalCalories : (total) => {
            document.querySelector(UISelectors.totalCalories).innerHTML = total ;
        },

        getItemInput : () => { 
            return {
                name : document.querySelector(UISelectors.itemNameInput).value ,
                calories : document.querySelector(UISelectors.itemCalInput).value,
            }
        },

        initEditState : () => {
            UICtrl.clearInput();
            document.querySelector(UISelectors.updateBtn).style.display = 'none';
            document.querySelector(UISelectors.deleteBtn).style.display = 'none';
            document.querySelector(UISelectors.backBtn).style.display = 'none';
            document.querySelector(UISelectors.addBtn).style.display = 'inline';
        },

        showEditState : () => {
            document.querySelector(UISelectors.updateBtn).style.display = 'inline';
            document.querySelector(UISelectors.deleteBtn).style.display = 'inline';
            document.querySelector(UISelectors.backBtn).style.display = 'inline';
            document.querySelector(UISelectors.addBtn).style.display = 'none';
        }
        
    };

})();

// App Controller Module
const App = (function(ItemCtrl, UICtrl){
    
    // Load Event Listeners
    const loadEventListeners = function(){
        
        // Get UI Selectors
        const UISelector = UICtrl.getUISelectors() ;

        // Disable Submit By Enter Keypress
        document.addEventListener('keypress', function(e){
            
            if(e.keyCode === 13 || e.which === 13){
                e.preventDefault();
                return false ;
            }
        })
       
        // Add Item Event
        document.querySelector(UISelector.addBtn).addEventListener('click', itemAddSubmit) ;

        // Edit Item Event 
        document.querySelector(UISelector.itemList).addEventListener('click', itemEditClick) ;

        // Update Item Event 
        document.querySelector(UISelector.updateBtn).addEventListener('click', itemUpdateSubmit) ;
        
        // Back Button Event 
        document.querySelector(UISelector.backBtn).addEventListener('click', UICtrl.initEditState) ;
        
        // Delete Button Event 
        document.querySelector(UISelector.deleteBtn).addEventListener('click', itemDeleteSubmit) ;
        
        // Clear Button Event 
        document.querySelector(UISelector.clearBtn).addEventListener('click', clearItemsSubmit) ;
    }

    // addItemSubmit Method
    const itemAddSubmit = function(e){

        // Get from data from UI controller
        const input = UICtrl.getItemInput() ;

        if(input.name !== '' && input.calories !== ''){

            // Add item to ItemCtrl data structure
            const newItem = ItemCtrl.addItem(input.name, input.calories);

            // Add item to UI list
            UICtrl.addListItem(newItem) ;

            // Get total calories
            const totalCalories = ItemCtrl.getTotalCalories();
            
            // Add total calories to UI
            UICtrl.showTotalCalories(totalCalories) ;

            // Clear Input
            UICtrl.clearInput();
        }

        e.preventDefault();

    };

    // Click Edit Method
    const itemEditClick = function(e){

        if (e.target.classList.contains('edit-item')) {
            // Get List Item ID
            const listId = e.target.parentNode.parentNode.id ;

            // Break String into Array using split() method to get id number
            const listIdArr = listId.split('-');

            // Get index 1 of array which will always be the id number
            const id = parseInt(listIdArr[1]);

            // Pass to ItemCtrl to get the item
            const itemToEdit = ItemCtrl.getItemById(id) ;

            console.log(itemToEdit);

            // Set item as current item
            ItemCtrl.setCurrentItem(itemToEdit);

            // Add Item to form UI
            UICtrl.addItemToForm();

            }
        };

    // Item Update Submit Event
    const itemUpdateSubmit = function(e) {
        
        // Get from data from UI controller
        const update = UICtrl.getItemInput() ;

        if(update.name !== '' && update.calories !== ''){

            // Update item to ItemCtrl data structure in same position
            const updatedItem = ItemCtrl.updateItem(update.name, update.calories);

            console.log(updatedItem);

            // Add item to UI list
            UICtrl.updateListItem(updatedItem) ;

            // Get total calories
            const totalCalories = ItemCtrl.getTotalCalories();
            
            // Add total calories to UI
            UICtrl.showTotalCalories(totalCalories) ;

            // Clear Edit state
            UICtrl.initEditState();

            //UICtrl.clearInput();
        }

        e.preventDefault();

    };

    //  Delete Item Event 
    const itemDeleteSubmit = function(e){

        // Get current item i.e item to be deleted
        const itemToDelete = ItemCtrl.getCurrentItem();

        // Remove from data structure
        ItemCtrl.deleteItem(itemToDelete);

        // Update List
        UICtrl.deleteListItem(itemToDelete);

        // Reset edit state 
        UICtrl.initEditState();

        // Get total calories
        const totalCalories = ItemCtrl.getTotalCalories();
            
        // Add total calories to UI
        UICtrl.showTotalCalories(totalCalories) ;

        // // Get the items from state
        // const items = ItemCtrl.getItems();

        // // Refresh UI with new items list
        // if(items.length === 0){
        //     // Hide the list
        //     UICtrl.hideList();
        // } else {
        //     // Pass items to UICtrl to display
        //     UICtrl.populateItemList(items);
        // }

        e.preventDefault();
    };

    // Clear items event
    const clearItemsSubmit = function(){

        // Delete from data structure 
        ItemCtrl.clearAllItems();

        // Delete from UI
        UICtrl.removeItems();

        // Get total calories
        const totalCalories = ItemCtrl.getTotalCalories();
            
        // Add total calories to UI
        UICtrl.showTotalCalories(totalCalories) ;
    }

    // Public Methods
    // Initialise App
    return {
        init : () => {
            // Initial Edit state
            UICtrl.initEditState();

            // Get the items from state
            const items = ItemCtrl.getItems();

            // Check if any items
            if(items.length === 0){
                // Hide the list
                UICtrl.hideList();
            } else {
                // Pass items to UICtrl to display
                UICtrl.populateItemList(items);
            }

            // Get total calories
            const totalCalories = ItemCtrl.getTotalCalories();
            
            // Add total calories to UI
            UICtrl.showTotalCalories(totalCalories) ;
            
            // Load Event Listeners 
            loadEventListeners(); 
        }
        
    }

})(ItemCtrl, UICtrl);

App.init();


