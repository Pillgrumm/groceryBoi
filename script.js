document.addEventListener("DOMContentLoaded", loadItems);

function addItem() {
    const input = document.getElementById("grocery-item");  // Ensure the id matches
    const itemText = input.value.trim();
    
    if (itemText === "") {
        console.log("Input is empty, nothing to add.");
        return;  // If input is empty, do nothing
    }

    console.log("Adding item:", itemText);
    
    const item = { text: itemText, bought: false };
    saveItem(item);
    
    input.value = "";  // Clear the input field after adding
    renderList();
}

function saveItem(item) {
    let items = JSON.parse(localStorage.getItem("groceryList")) || [];
    items.push(item);
    localStorage.setItem("groceryList", JSON.stringify(items));
    console.log("Saved items:", items);  // Log saved items for debugging
}

function loadItems() {
    console.log("Loading items...");
    renderList();
}

function renderList() {
    const list = document.getElementById("grocery-list");  // Ensure the id matches
    list.innerHTML = "";
    const items = JSON.parse(localStorage.getItem("groceryList")) || [];
    
    items.forEach((item, index) => {
        const li = document.createElement("li");
        li.textContent = item.text;
        if (item.bought) li.classList.add("checked");

        li.onclick = () => toggleItem(index);
        
        list.appendChild(li);
    });
    console.log("Rendered list:", items);  // Log rendered items for debugging
}

function toggleItem(index) {
    let items = JSON.parse(localStorage.getItem("groceryList"));
    items[index].bought = !items[index].bought;
    localStorage.setItem("groceryList", JSON.stringify(items));
    renderList();
}

function clearList() {
    localStorage.removeItem("groceryList");
    renderList();
}
