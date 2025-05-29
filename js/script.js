document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('pedidoForm');
    if (form) {
        form.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
            checkbox.addEventListener('change', () => {
                const quantidadeInput = checkbox.parentElement.querySelector('.quantidade');
                if (checkbox.checked) {
                    quantidadeInput.style.display = 'inline-block';
                } else {
                    quantidadeInput.style.display = 'none';
                }
            });
        });

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const selecionados = [];

            form.querySelectorAll('input[name="item"]:checked').forEach(checkbox => {
                const item = JSON.parse(checkbox.value);
                const quantidade = parseInt(checkbox.parentElement.querySelector('.quantidade').value);
                item.quantidade = quantidade;
                item.subtotal = item.preco * quantidade;
                selecionados.push(item);
            });

            localStorage.setItem('pedido', JSON.stringify(selecionados));
            window.location.href = 'confirmacao.html';
        });
    }

    const listaPedido = document.getElementById('listaPedido');
    if (listaPedido) {
        const pedido = JSON.parse(localStorage.getItem('pedido'));
        let total = 0;

        if (pedido && pedido.length > 0) {
            pedido.forEach(item => {
                const li = document.createElement('li');
                li.textContent = `${item.nome} (x${item.quantidade}) - R$${item.subtotal.toFixed(2)}`;
                listaPedido.appendChild(li);
                total += item.subtotal;
            });

            const liTotal = document.createElement('li');
            liTotal.style.fontWeight = 'bold';
            liTotal.textContent = `Total: R$${total.toFixed(2)}`;
            listaPedido.appendChild(liTotal);
        } else {
            listaPedido.innerHTML = '<li>Nenhum item selecionado.</li>';
        }
    }

    const btnConfirmar = document.getElementById('btnConfirmar');
    if (btnConfirmar) {
        btnConfirmar.addEventListener('click', () => {
            document.getElementById('pedidoSection').style.display = 'none';
            const agradecimento = document.getElementById('agradecimento');
            agradecimento.style.display = 'block';
            const qr = document.createElement('img');
        });
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const btnJaEscaneei = document.getElementById('btnJaEscaneei');
    const btnConfirmar = document.getElementById('btnConfirmar');

    if (btnJaEscaneei && btnConfirmar) {
        btnJaEscaneei.addEventListener('click', () => {
            btnConfirmar.disabled = false;
            btnJaEscaneei.style.display = 'none';
        });
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const produtos = [
        { nome: "Cheddar Bacon", preco: 22.00, img: "./img/cheddar.png" },
        { nome: "Smash Burger", preco: 19.00, img: "./img/smash.png" },
        { nome: "Batata Frita", preco: 12.00, img: "./img/batata.png" },
        { nome: "Coca-Cola Lata 350ml", preco: 7.00, img: "./img/refrigerante.png" },
        { nome: "Milkshake", preco: 12.00, img: "./img/milkshake.png" }
    ];

    let indiceAtual = 0;

    const imgEl = document.getElementById('imagemProduto');
    const nomeEl = document.getElementById('nomeProduto');
    const precoEl = document.getElementById('precoProduto');

    function mostrarProduto(indice) {
        const produto = produtos[indice];
        imgEl.src = produto.img;
        imgEl.alt = produto.nome;
        nomeEl.textContent = produto.nome;
        precoEl.textContent = `R$ ${produto.preco.toFixed(2)}`;
    }

    document.getElementById('btnAnterior').addEventListener('click', () => {
        indiceAtual--;
        if (indiceAtual < 0) indiceAtual = produtos.length - 1;
        mostrarProduto(indiceAtual);
    });

    document.getElementById('btnProximo').addEventListener('click', () => {
        indiceAtual++;
        if (indiceAtual >= produtos.length) indiceAtual = 0;
        mostrarProduto(indiceAtual);
    });

    mostrarProduto(indiceAtual);
});


