class Carrinho {
    constructor() {
        this.itens = [];
        this.total = 0;
    }

    adicionarItem(nome, preco) {
        this.itens.push({ nome, preco });
        this.total += preco;
        this.atualizarCarrinho();
        this.mostrarNotificacao(`${nome} foi adicionado ao carrinho!`);
    }

    removerItem(index) {
        const itemRemovido = this.itens.splice(index, 1)[0];
        this.total -= itemRemovido.preco;
        this.atualizarCarrinho();
        this.mostrarNotificacao(`${itemRemovido.nome} foi removido do carrinho!`);
    }

    atualizarCarrinho() {
        const carrinhoItems = document.getElementById('carrinho-items');
        const carrinhoTotal = document.getElementById('carrinho-total');
        const cartCount = document.getElementById('cart-count');

        carrinhoItems.innerHTML = '';

        this.itens.forEach((item, index) => {
            const itemElement = document.createElement('li');
            itemElement.className = 'list-group-item d-flex justify-content-between align-items-center';
            itemElement.innerHTML = `
                <span>${item.nome} - R$ ${item.preco.toFixed(2)}</span>
                <button class="btn btn-danger btn-sm" data-index="${index}">Remover</button>
            `;
            carrinhoItems.appendChild(itemElement);
        });

        carrinhoTotal.textContent = this.total.toFixed(2);
        cartCount.textContent = this.itens.length;
    }

    finalizarCompra() {
        if (this.itens.length === 0) {
            this.mostrarNotificacao('Seu carrinho está vazio!', 'warning');
            return;
        }

        const modal = new bootstrap.Modal(document.getElementById('confirmacaoCompraModal'));
        modal.show();

        this.itens = [];
        this.total = 0;
        this.atualizarCarrinho();
    }

    mostrarNotificacao(mensagem, tipo = 'success') {
        Swal.fire({
            icon: tipo,
            title: mensagem,
            toast: true,
            position: 'top',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
        });
    }
}

const carrinho = new Carrinho();

document.getElementById('produtos-container').addEventListener('click', (event) => {
    if (event.target.classList.contains('btn-primary')) {
        const card = event.target.closest('.card');
        const nome = card.querySelector('.card-title').textContent;
        const preco = parseFloat(card.querySelector('.card-text').textContent.replace('R$ ', '').replace('.', '').replace(',', '.'));
        carrinho.adicionarItem(nome, preco);
    }
});

document.getElementById('carrinho-items').addEventListener('click', (event) => {
    if (event.target.classList.contains('btn-danger')) {
        const index = event.target.dataset.index;
        carrinho.removerItem(index);
    }
});

document.querySelector('.btn-success').addEventListener('click', () => {
    carrinho.finalizarCompra();
});

document.getElementById('btn-topo').addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

window.addEventListener('scroll', () => {
    const btnTopo = document.getElementById('btn-topo');
    if (window.scrollY > 300) {
        btnTopo.style.display = 'flex';
    } else {
        btnTopo.style.display = 'none';
    }
});