let groceryList = [];  // In-memory data structure to hold items

function addItem() {
    const itemInput = document.getElementById("grocery-item");
    const amountInput = document.getElementById("amount");
    const itemText = itemInput.value.trim();
    const amount = parseFloat(amountInput.value.trim());

    if (itemText === "" || isNaN(amount) || amount <= 0) return; // Check if item or amount is valid

    const item = { text: itemText, bought: false, amount: amount };
    groceryList.push(item);  // Add the item to the in-memory list

    itemInput.value = "";
    amountInput.value = "";
    renderList();
}

function renderList() {
    const list = document.getElementById("grocery-list");
    list.innerHTML = "";
    let total = 0;

    groceryList.forEach((item, index) => {
        const li = document.createElement("li");
        li.textContent = `${item.text} - $${item.amount.toFixed(2)}`;

        if (item.bought) li.classList.add("checked");

        li.onclick = () => toggleItem(index);

        // Add a remove button to each item
        const removeBtn = document.createElement("button");
        removeBtn.textContent = "Remove";
        removeBtn.classList.add("remove-btn");
        removeBtn.onclick = (e) => {
            e.stopPropagation(); // Prevent triggering the item click event
            removeItem(index);
        };

        li.appendChild(removeBtn);
        list.appendChild(li);
        total += item.amount;
    });

    // Update the total
    const totalDisplay = document.getElementById("total");
    totalDisplay.textContent = `Total: $${total.toFixed(2)}`;
}

function toggleItem(index) {
    groceryList[index].bought = !groceryList[index].bought;
    renderList();
}

function clearList() {
    groceryList = [];  // Clear the in-memory list
    renderList();
}

// New function to remove an item
function removeItem(index) {
    groceryList.splice(index, 1);  // Remove item at the given index
    renderList();  // Re-render the list
}
