var Product = /** @class */ (function () {
    function Product() {
    }
    return Product;
}());
function addToCart() {
    var item = itemInfo();
    storeInSession(item);
    updateCartTotal();
}
function itemInfo() {
    var obj = new Product();
    var el = event.target;
    var closestCard = el.closest('div');
    obj.name = closestCard.getElementsByTagName('h5')[0].innerHTML;
    var selected = closestCard.getElementsByClassName('quantity')[0];
    obj.quantity = eval(selected.value);
    var price = closestCard.getElementsByClassName('price')[0].innerHTML;
    obj.eachPrice = eval(price.replace("$", "").replace(",", ""));
    obj.totalPrice = (obj.eachPrice * obj.quantity).toFixed(2);
    return obj;
}
function storeInSession(item) {
    var key = item.name;
    if (!sessionStorage[key]) {
        sessionStorage.setItem(key, JSON.stringify(item));
    }
    else {
        var obj = JSON.parse(sessionStorage.getItem(key));
        obj.quantity += item.quantity;
        obj.totalPrice = (obj.quantity * obj.eachPrice).toFixed(2);
        sessionStorage.setItem(key, JSON.stringify(obj));
    }
}
function updateCartTotal() {
    var cartTotal = 0;
    for (var i = 0; i < sessionStorage.length; i++) {
        var key = sessionStorage.key(i);
        var value = JSON.parse(sessionStorage.getItem(key));
        cartTotal += value.quantity;
    }
    document.getElementById("cartSize").innerHTML = "Cart: " + cartTotal;
}
function removeFromCart() {
    var item = itemInfo();
    if (sessionStorage[item.name]) {
        sessionStorage.removeItem(item.name);
    }
    updateCartTotal();
}
function loadCart() {
    var total = 0;
    for (var i = 0; i < sessionStorage.length; i++) {
        var key = sessionStorage.key(i);
        var value = JSON.parse(sessionStorage.getItem(key));
        total += eval(value.totalPrice);
        insertNewRecord(value);
    }
    document.getElementById("totalPrice").innerHTML = "Total Price: $" + total.toFixed(2);
}
function insertNewRecord(data) {
    var table = document.getElementById("cart");
    var body = table.getElementsByTagName("tbody")[0];
    var newRow = body.insertRow();
    var cell1 = newRow.insertCell(0);
    cell1.innerHTML = data.name;
    var cell2 = newRow.insertCell(1);
    cell2.innerHTML = "$" + Number(data.eachPrice).toFixed(2);
    var cell3 = newRow.insertCell(2);
    cell3.innerHTML = data.quantity.toString();
    var cell4 = newRow.insertCell(3);
    cell4.innerHTML = "$" + Number(data.totalPrice).toFixed(2);
}
