// Carrinho de Compras - Shopee Style
// Projeto DIO - Node.js

const readline = require("readline-sync");

// catalogo de produtos disponiveis
const catalogo = [
  { id: 1, nome: "Fone de Ouvido Bluetooth", preco: 89.9 },
  { id: 2, nome: "Carregador Turbo USB-C", preco: 45.0 },
  { id: 3, nome: "Capa de Celular", preco: 19.9 },
  { id: 4, nome: "Suporte Veicular", preco: 35.5 },
  { id: 5, nome: "Cabo HDMI 2m", preco: 29.9 },
  { id: 6, nome: "Mouse Sem Fio", preco: 75.0 },
  { id: 7, nome: "Teclado Mecanico", preco: 199.9 },
  { id: 8, nome: "Webcam HD", preco: 120.0 },
];

// carrinho começa vazio
let carrinho = [];

// formata o valor em reais
function formatarPreco(valor) {
  return `R$ ${valor.toFixed(2)}`;
}

// mostra o catalogo de produtos
function exibirCatalogo() {
  console.log("\n🛍️  ===== CATÁLOGO DE PRODUTOS =====");
  catalogo.forEach((p) => {
    console.log(`[${p.id}] ${p.nome} - ${formatarPreco(p.preco)}`);
  });
  console.log("====================================");
}

// mostra o carrinho atual
function exibirCarrinho() {
  console.log("\n🛒 ===== SEU CARRINHO =====");

  if (carrinho.length === 0) {
    console.log("Seu carrinho ta vazio!");
    console.log("==========================");
    return;
  }

  let total = 0;
  let totalItens = 0;

  carrinho.forEach((item, index) => {
    const subtotal = item.preco * item.quantidade;
    total += subtotal;
    totalItens += item.quantidade;
    console.log(
      `${index + 1}. ${item.nome} x${item.quantidade} - ${formatarPreco(subtotal)}`
    );
  });

  console.log("--------------------------");
  console.log(`Total de itens: ${totalItens}`);
  console.log(`Total: ${formatarPreco(total)}`);
  console.log("==========================");
}

// adiciona produto ao carrinho
function adicionarProduto() {
  exibirCatalogo();

  const id = readline.questionInt("\nDigite o ID do produto que quer adicionar: ");
  const produto = catalogo.find((p) => p.id === id);

  if (!produto) {
    console.log("❌ Produto nao encontrado!");
    return;
  }

  const quantidade = readline.questionInt("Quantas unidades? ");

  if (quantidade <= 0) {
    console.log("❌ Quantidade invalida!");
    return;
  }

  // verifica se o produto ja ta no carrinho
  const itemExistente = carrinho.find((item) => item.id === id);

  if (itemExistente) {
    itemExistente.quantidade += quantidade;
    console.log(`✅ Quantidade atualizada! ${produto.nome} agora tem ${itemExistente.quantidade} unidade(s) no carrinho.`);
  } else {
    carrinho.push({ ...produto, quantidade });
    console.log(`✅ ${produto.nome} adicionado ao carrinho!`);
  }
}

// remove produto do carrinho
function removerProduto() {
  exibirCarrinho();

  if (carrinho.length === 0) return;

  const index = readline.questionInt("\nDigite o numero do item pra remover: ") - 1;

  if (index < 0 || index >= carrinho.length) {
    console.log("❌ Item nao encontrado!");
    return;
  }

  const removido = carrinho.splice(index, 1);
  console.log(`✅ ${removido[0].nome} removido do carrinho!`);
}

// altera a quantidade de um produto
function alterarQuantidade() {
  exibirCarrinho();

  if (carrinho.length === 0) return;

  const index = readline.questionInt("\nDigite o numero do item pra alterar: ") - 1;

  if (index < 0 || index >= carrinho.length) {
    console.log("❌ Item nao encontrado!");
    return;
  }

  const novaQtd = readline.questionInt("Nova quantidade (0 pra remover): ");

  if (novaQtd === 0) {
    const removido = carrinho.splice(index, 1);
    console.log(`✅ ${removido[0].nome} removido do carrinho!`);
  } else if (novaQtd < 0) {
    console.log("❌ Quantidade invalida!");
  } else {
    carrinho[index].quantidade = novaQtd;
    console.log(`✅ Quantidade atualizada com sucesso!`);
  }
}

// finaliza a compra
function finalizarCompra() {
  if (carrinho.length === 0) {
    console.log("\n❌ Seu carrinho ta vazio, adicione produtos antes de finalizar!");
    return false;
  }

  exibirCarrinho();

  const confirmar = readline.keyInYNStrict("\nConfirmar a compra?");

  if (confirmar) {
    const total = carrinho.reduce((acc, item) => acc + item.preco * item.quantidade, 0);
    console.log("\n🎉 ==============================");
    console.log("   COMPRA FINALIZADA COM SUCESSO!");
    console.log(`   Total pago: ${formatarPreco(total)}`);
    console.log("   Obrigado por comprar na Shopee!");
    console.log("🎉 ==============================\n");
    carrinho = [];
    return true;
  } else {
    console.log("❌ Compra cancelada, seu carrinho foi mantido.");
    return false;
  }
}

// menu principal
function menu() {
  console.log("\n🧡 ===== SHOPEE - CARRINHO =====");
  console.log("1 - Ver catalogo e adicionar produto");
  console.log("2 - Ver carrinho");
  console.log("3 - Remover produto");
  console.log("4 - Alterar quantidade");
  console.log("5 - Finalizar compra");
  console.log("0 - Sair");
  console.log("================================");

  const opcao = readline.questionInt("Escolha uma opcao: ");
  return opcao;
}

// loop principal do programa
function iniciar() {
  console.log("\n🧡 Bem vindo a Shopee!");
  console.log("Seu carrinho de compras esta pronto pra usar 🛒");

  let rodando = true;

  while (rodando) {
    const opcao = menu();

    switch (opcao) {
      case 1:
        adicionarProduto();
        break;
      case 2:
        exibirCarrinho();
        break;
      case 3:
        removerProduto();
        break;
      case 4:
        alterarQuantidade();
        break;
      case 5:
        finalizarCompra();
        break;
      case 0:
        console.log("\n👋 Ate logo! Volte sempre a Shopee!");
        rodando = false;
        break;
      default:
        console.log("❌ Opcao invalida, tenta de novo!");
    }
  }
}

iniciar();
