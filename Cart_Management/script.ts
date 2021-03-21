class Product {
    name: string;
    quantity: number;
    eachPrice: number;
    totalPrice: string;
}

function addToCart(): void {
    let item: Product = itemInfo();
    storeInSession(item);
    updateCartTotal();
}

function itemInfo(): Product {
    let obj = new Product();
    let el = event.target as Element;
    let closestCard = el.closest('div');
    obj.name = closestCard.getElementsByTagName('h5')[0].innerHTML;
    let selected = closestCard.getElementsByClassName('quantity')[0] as HTMLInputElement;
    obj.quantity = eval(selected.value);
    let price = closestCard.getElementsByClassName('price')[0].innerHTML;
    obj.eachPrice = eval(price.replace("$", "").replace(",", ""));
    obj.totalPrice = (obj.eachPrice * obj.quantity).toFixed(2);
    return obj;
}

function storeInSession(item: Product): void {
    let key = item.name;
    if (!sessionStorage[key]) {
        sessionStorage.setItem(key, JSON.stringify(item));
    } else {
        let obj: Product = JSON.parse(sessionStorage.getItem(key));
        obj.quantity += item.quantity;
        obj.totalPrice = (obj.quantity * obj.eachPrice).toFixed(2);
        sessionStorage.setItem(key, JSON.stringify(obj));
    }
}

function updateCartTotal(): void {
    let cartTotal = 0;
    for (let i = 0; i < sessionStorage.length; i++) {
        let key = sessionStorage.key(i);
        let value: Product = JSON.parse(sessionStorage.getItem(key));
        cartTotal += value.quantity;
    }
    document.getElementById("cartSize").innerHTML = `Cart: ${cartTotal}`;
}

function removeFromCart(): void {
    let item: Product = itemInfo();
    if (sessionStorage[item.name]) {
        sessionStorage.removeItem(item.name);
    }
    updateCartTotal();
}

function loadCart(): void {
    let total: number = 0;
    for (let i = 0; i < sessionStorage.length; i++) {
        let key = sessionStorage.key(i);
        let value: Product = JSON.parse(sessionStorage.getItem(key));
        total += eval(value.totalPrice);
        insertNewRecord(value);
    }
    document.getElementById("totalPrice").innerHTML = `Total Price: $${total.toFixed(2)}`;
}

function insertNewRecord(data: Product): void {
    let table = document.getElementById("cart");
    let body = table.getElementsByTagName("tbody")[0];
    let newRow = body.insertRow();

    let cell1 = newRow.insertCell(0);
    cell1.innerHTML = data.name;

    let cell2 = newRow.insertCell(1);
    cell2.innerHTML = `$${Number(data.eachPrice).toFixed(2)}`;

    let cell3 = newRow.insertCell(2);
    cell3.innerHTML = data.quantity.toString();

    let cell4 = newRow.insertCell(3);
    cell4.innerHTML = `$${Number(data.totalPrice).toFixed(2)}`;
}