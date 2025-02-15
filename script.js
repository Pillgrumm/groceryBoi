document.addEventListener("DOMContentLoaded", loadItems);

function addItem() {
    const input = document.getElementById("itemInput");
    const itemText = input.value.trim();
    
    if (itemText === "") return;
    
    const item = { text: itemText, bought: false };
    saveItem(item);
    
    input.value = "";
    renderList();
}

function saveItem(item) {
    let items = JSON.parse(localStorage.getItem("groceryList")) || [];
    items.push(item);
    localStorage.setItem("groceryList", JSON.stringify(items));
}

function loadItems() {
    renderList();
}

function renderList() {
    const list = document.getElementById("groceryList");
    list.innerHTML = "";
    const items = JSON.parse(localStorage.getItem("groceryList")) || [];
    
    items.forEach((item, index) => {
        const li = document.createElement("li");
        li.textContent = item.text;
        if (item.bought) li.classList.add("checked");

        li.onclick = () => toggleItem(index);
        
        list.appendChild(li);
    });
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
