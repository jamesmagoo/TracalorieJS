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
        logState : () => {return state } 
    };

})();

// UI Controller Module
const UICtrl = (function(){
    // Use UI selectors for more efficient code
    const UISelectors = {
        itemList : "item-list"
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
        }

        
    };

})();

// App Controller Module
const App = (function(ItemCtrl, UICtrl){

    // Public Methods
    // Initialise App
    return {
        init : () => {
            // Get the items from state
            const items = ItemCtrl.getItems();
            // Pass items to UICtrl to display
            UICtrl.populateItemList(items);
        }
    }

})(ItemCtrl, UICtrl);

App.init();

