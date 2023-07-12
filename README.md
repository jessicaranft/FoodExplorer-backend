# FoodExplorer

🔗 <a href="https://frontend-foodexplorer.netlify.app/" target="_blank">Clique aqui para visualizar a aplicação no ar.</a>

![preview](https://github.com/jessicaranft/FoodExplorer/blob/main/.github/preview.png)

O FoodExplorer é um menu interativo de um restaurante fictício.
<br><br>
Trata-se de uma aplicação construída de ponta a ponta com front-end e back-end, utilizando as tecnologias aprendidas no programa Explorer da Rocketseat.
<br><br>
Possui duas personas: admin e usuário comum.
<br><br>
O admin é a pessoa responsável pelo restaurante. Pode criar, visualizar, editar e apagar um prato a qualquer momento. Cada prato contém uma imagem, um nome, uma categoria, uma breve descrição, os ingredientes e o seu preço. Ao clicar em adicionar prato, o admin recebe uma mensagem de sucesso e é redirecionado para a página principal.
<br><br>
O usuário pode visualizar todos os pratos cadastrados e, quando clica em um prato, é redirecionado para uma nova tela com informações mais detalhadas sobre ele.
<br><br>
<strong>Milhas extras:</strong>
- O usuário pode marcar ou desmarcar um prato como favorito;
- O usuário pode incluir itens no carrinho, e a quantidade é controlada pelos botões + e -;
- Ao clicar em "finalizar pedido" na página de pedidos, o pedido é concluído e entra para o histórico com o status de "preparando";
- O usuário pode ver seu histórico de pedido, com data, status e itens dos pedidos;
- O admin pode visualizar e controlar o status de cada pedido (pendente, preparando ou entregue);
- O layout possui versões dark & light.

## 🎨 Layout
O layout foi construindo seguindo o modelo abaixo:

🔗 <a href="https://www.figma.com/community/file/1196874589259687769/food-explorer-v2" target="_blank">Acessar modelo no Figma.</a>

## 🛠 Tecnologias
- HTML
- CSS
- JavaScript
- React (front-end)
- Node (back-end)

## 🚀 Como rodar a aplicação

<strong>1.</strong> Clone o repositório do projeto completo no seu computador:

```bash
$ git clone git@github.com:jessicaranft/FoodExplorer.git
```

<strong>2.</strong> Execute o back-end:

```bash
# Insira uma porta e gere um código hash para inserir no arquivo .env vazio:
  AUTH_SECRET=
  PORT=

# Navegue até o diretório do back-end:
$ cd api

# Instale as dependências necessárias:
$ npm install

# Inicie o servidor:
$ npm run dev
```

<strong>3.</strong> Execute o front-end:

```bash
# Navegue até o diretório do front-end:
$ cd frontend

# Instale as dependências necessárias:
$ npm install

# Inicie o servidor:
$ npm run dev

# Copie e cole o endereço fornecido no terminal na barra de endereço do seu navegador. O endereço usado na criação do projeto foi:

  http://localhost:5173/
```

## 💻 Visualize a aplicação no ar:
<a href="https://frontend-foodexplorer.netlify.app/">Clique neste link</a> para acessar a aplicação no ar.
<br><br>
Você pode usar os dados abaixo para logar na conta de um usuário que já tem um histórico de pedidos e favoritos:

```bash
  e-mail: test@email.com
  senha: 123456
```

Ou use as credenciais abaixo para logar como administrador:

```bash
  e-mail: admin@exemplo.com
  senha: 12345
```

Fique à vontade também para criar seu próprio usuário comum e testar a aplicação fazendo novos pedidos.

## 📝 License

This project is under the license MIT.

Made with ❤️ by Jessica Ranft.
