document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('pedidoForm');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const selecionados = [];
            document.querySelectorAll('input[name="item"]:checked').forEach(item => {
                selecionados.push(JSON.parse(item.value)); // agora parse do JSON
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
                li.textContent = `${item.nome} - R$${item.preco.toFixed(2)}`;
                listaPedido.appendChild(li);
                total += item.preco;
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
            document.getElementById('agradecimento').style.display = 'block';
            localStorage.removeItem('pedido');
        });
    }
});
