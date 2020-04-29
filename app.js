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
            {id : 0, name : 'Steak', calories : 350},
            {id : 1, name : 'BP Coffee', calories : 110},
            {id : 2, name : 'Omelete', calories : 500}
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
        logState : () => {return state } 
         
    };

})();

// UI Controller Module
const UICtrl = (function(){
    // Use UI selectors for more efficient code
    const UISelectors = {
        itemList : "item-list",
        addBtn : '.add-btn',
        itemNameInput : '#item-name',
        itemCalInput : '#item-calories',
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
                  <i class="fa fa-pencil"></i>
                </a>
              </li>`
            })

            document.getElementById(UISelectors.itemList).innerHTML = html ;
        },

        getUISelectors : () => {return UISelectors},

        getItemInput : () => { 
            return {
                name : document.querySelector(UISelectors.itemNameInput).value ,
                calories : document.querySelector(UISelectors.itemCalInput).value,
            }
        }

        
    };

})();

// App Controller Module
const App = (function(ItemCtrl, UICtrl){
    
    // Load Event Listeners
    const loadEventListeners = function(){
        
        // Get UI Selectors
        const UISelector = UICtrl.getUISelectors() ;
       
        // Add Item Event
        document.querySelector(UISelector.addBtn).addEventListener('click', itemAddSubmit) ;

    }

    // addItemSubmit Method

    const itemAddSubmit = function(e){

        // Get from data from UI controller
        const input = UICtrl.getItemInput() ;


        if(input.name !== '' && input.calories !== ''){
            //Proceed and add item to ItemCtrl
            const addItem = ItemCtrl.addItem(input.name, input.calories);
        }

        e.preventDefault();

    }

    // Public Methods
    // Initialise App
    return {
        init : () => {
            // Get the items from state
            const items = ItemCtrl.getItems();
            
            // Pass items to UICtrl to display
            UICtrl.populateItemList(items);

            // Load Event Listeners 
            loadEventListeners(); 
        }
        
    }

})(ItemCtrl, UICtrl);

App.init();


