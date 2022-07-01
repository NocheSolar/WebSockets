const socket = io();

const msgsForm = document.querySelector('#msgsForm');
const usernameInput = document.querySelector('#usernameInput');
const msgsInput = document.querySelector('#msgsInput');
const msgsPool = document.querySelector('#msgsPool');


const productsForm = document.querySelector('#productsForm');
const nameInput = document.querySelector('#nameInput');
const priceInput = document.querySelector('#priceInput');
const imgInput = document.querySelector('#imgInput');

function sendMsgs (messagesInfo) {
    socket.emit('client:msg', messagesInfo);
}
function renderMsgs (messagesInfo) {
    const html = messagesInfo.map(messageInfo => {
        return(`<div>
        <span class="msgsPool-user">${messageInfo.username}</span>
        [<span class="msgsPool-date">${messageInfo.time}<span>]: 
        <span class="msgsPool-msg">${messageInfo.message}</span>
        </div>`)
    }).join(" ");
    msgsPool.innerHTML = html;
}
function submitHandlerMsg (event) {
    event.preventDefault();
    const time = new Date();
    const fechayhora = time.toLocaleString("fr-FR");
    const message = { username: usernameInput.value, time: fechayhora, message: msgsInput.value };
    sendMsgs(message);
}

function sendProduct (productInf) {
    socket.emit('client:product', productInf)
};
function renderProducts(product) {
    const table = document.querySelector("/partials/products.ejs")
    table.innerHTML += `<tr>
    <td>${product.title}</td>
    <td><img alt="product img" src="${product.img}"/></td>
    <td>$${product.price} Arg</td>
</tr>`
}
function submitHandlerProduct (event) {
    event.preventDefault();
    const productInf = { url: nameInput.value, price: priceInput.value, description: imgInput.value };
    sendProduct(productInf);
};

msgsForm.addEventListener('submit', submitHandlerMsg);
socket.on('server:msgs', renderMsgs);

productsForm.addEventListener('submit', submitHandlerProduct)
socket.on('server:products', renderProducts);