# PRD - App Hamburgueria

## 1. Visao geral

O projeto e um aplicativo mobile de pedidos para uma hamburgueria, desenvolvido com Expo, React Native, Expo Router, NativeWind, Zustand e Supabase. O usuario navega pelo cardapio, consulta detalhes dos produtos, adiciona itens ao carrinho, informa o endereco de entrega e finaliza o pedido. Ao finalizar, o pedido e salvo no Supabase e uma mensagem formatada e aberta no WhatsApp da hamburgueria.

## 2. Objetivo do produto

Permitir que clientes facam pedidos de forma simples e rapida pelo celular, reduzindo atrito na escolha de produtos e padronizando o envio das informacoes essenciais do pedido para a hamburgueria.

## 3. Publico-alvo

Clientes de uma hamburgueria que desejam:

- Consultar o cardapio pelo celular.
- Visualizar preco, descricao e ingredientes dos produtos.
- Montar um carrinho de pedido.
- Enviar o pedido com endereco de entrega via WhatsApp.

## 4. Problema a resolver

Pedidos feitos manualmente por mensagem podem chegar incompletos, sem endereco ou com itens pouco claros. O app organiza o fluxo de compra para garantir que produto, quantidade, endereco e valor total sejam enviados em um formato consistente.

## 5. Escopo atual

### Funcionalidades existentes

- Listagem de categorias do cardapio.
- Listagem de produtos agrupados por categoria.
- Navegacao para detalhe do produto.
- Exibicao de imagem, titulo, preco, descricao e ingredientes.
- Adicao de produtos ao carrinho.
- Incremento de quantidade ao adicionar o mesmo produto novamente.
- Remocao/decremento de itens do carrinho.
- Persistencia local do carrinho com AsyncStorage.
- Calculo e exibicao do total do pedido.
- Validacao de endereco obrigatorio antes do envio.
- Validacao de carrinho vazio antes do envio.
- Criacao do pedido no Supabase.
- Criacao dos itens do pedido no Supabase.
- Rollback do pedido caso a criacao dos itens falhe.
- Abertura do WhatsApp com mensagem do pedido.
- Limpeza do carrinho apos envio bem-sucedido.

### Fora do escopo atual

- Login/cadastro de usuario.
- Pagamento online.
- Rastreamento de entrega.
- Painel administrativo.
- Edicao dinamica do cardapio via backend.
- Cupom de desconto.
- Selecao de adicionais ou observacoes por item.
- Calculo de taxa de entrega.

## 6. Fluxos principais

### 6.1 Consultar cardapio

1. O usuario abre o app.
2. O app exibe categorias horizontais e produtos agrupados.
3. O usuario toca em uma categoria.
4. A lista rola para a secao correspondente.

### 6.2 Ver detalhe do produto

1. O usuario toca em um produto.
2. O app abre a tela de detalhe.
3. O app exibe imagem, nome, preco, descricao e ingredientes.
4. Se o produto nao existir, o app redireciona para o cardapio.

### 6.3 Adicionar produto ao carrinho

1. O usuario toca em "Adicionar ao pedido".
2. O produto e adicionado ao carrinho com quantidade 1.
3. Se o produto ja existir no carrinho, sua quantidade e incrementada.
4. O usuario retorna ao cardapio.

### 6.4 Revisar carrinho

1. O usuario acessa o carrinho.
2. O app exibe os itens, quantidades e total.
3. O usuario pode tocar em um item para confirmar remocao.
4. Ao remover, a quantidade diminui em 1; se chegar a 0, o item sai do carrinho.

### 6.5 Enviar pedido

1. O usuario informa o endereco.
2. O app valida se o endereco foi preenchido.
3. O app valida se existe ao menos um produto no carrinho.
4. O app salva o pedido e seus itens no Supabase.
5. O app abre o WhatsApp com a mensagem do pedido.
6. O app limpa o carrinho e retorna para a tela anterior.

## 7. Requisitos funcionais

| ID | Requisito | Prioridade | Status |
| --- | --- | --- | --- |
| RF01 | Exibir categorias do cardapio | Alta | Implementado |
| RF02 | Exibir produtos por categoria | Alta | Implementado |
| RF03 | Permitir selecionar categoria e rolar ate a secao | Media | Implementado |
| RF04 | Exibir detalhes de um produto | Alta | Implementado |
| RF05 | Redirecionar para o cardapio quando o produto nao existir | Media | Implementado |
| RF06 | Adicionar produto ao carrinho | Alta | Implementado |
| RF07 | Incrementar quantidade de produto repetido | Alta | Implementado |
| RF08 | Remover/decrementar produto do carrinho | Alta | Implementado |
| RF09 | Persistir carrinho localmente | Alta | Implementado |
| RF10 | Calcular total do carrinho | Alta | Implementado |
| RF11 | Validar endereco obrigatorio | Alta | Implementado |
| RF12 | Bloquear envio com carrinho vazio | Alta | Implementado |
| RF13 | Salvar pedido no Supabase | Alta | Implementado |
| RF14 | Salvar itens do pedido no Supabase | Alta | Implementado |
| RF15 | Abrir WhatsApp com resumo do pedido | Alta | Implementado |
| RF16 | Limpar carrinho apos envio com sucesso | Alta | Implementado |

## 8. Requisitos nao funcionais

- O app deve funcionar em ambiente Expo.
- O estado do carrinho deve sobreviver ao fechamento e reabertura do app.
- O envio de pedido deve apresentar estado de carregamento para evitar multiplos envios.
- Erros do Supabase devem ser comunicados ao usuario.
- Valores monetarios devem ser exibidos no formato brasileiro.
- Variaveis sensiveis do Supabase devem vir de `.env`.

## 9. Modelo de dados

### Produto

- `id`: identificador textual.
- `title`: nome do produto.
- `price`: preco unitario.
- `description`: descricao.
- `cover`: imagem de capa.
- `thumbnail`: imagem reduzida.
- `ingredients`: lista de ingredientes.

### Produto no carrinho

- Todos os campos de produto.
- `quantity`: quantidade selecionada.

### Pedido no Supabase

Tabela `orders`:

- `id`
- `address`
- `total_price`
- `created_at`

Tabela `order_items`:

- `id`
- `order_id`
- `product_id`
- `product_title`
- `quantity`
- `price`

## 10. Dependencias externas

- Expo e Expo Router.
- React Native.
- Zustand.
- AsyncStorage.
- Supabase.
- WhatsApp via deep link HTTP.
- NativeWind/Tailwind.
- Jest com preset `jest-expo`.

## 11. Riscos e pontos de atencao

- O cardapio esta estatico no codigo; qualquer alteracao exige deploy.
- O telefone do WhatsApp esta fixo no arquivo do carrinho.
- Se o WhatsApp nao estiver disponivel ou o link falhar, o pedido pode ter sido salvo no Supabase antes da falha.
- As mensagens exibidas no app parecem ter problemas de encoding em alguns textos acentuados.
- A tabela permite leitura anonima de pedidos e itens, o que pode nao ser adequado em producao.
- Nao ha autenticacao ou mecanismo antifraude para criacao de pedidos.

## 12. Possiveis testes unitarios

### Ja existentes

- `formatCurrency`: formata valores em BRL, mantem duas casas, aceita zero e valores maiores.
- `cartInMemory.add`: adiciona produto novo e incrementa quantidade de produto existente.
- `cartInMemory.remove`: decrementa quantidade, remove quando chega a zero e preserva carrinho quando o produto nao existe.

### Sugeridos

| Area | Teste sugerido | Objetivo |
| --- | --- | --- |
| `formatCurrency` | Formatar valores negativos | Garantir comportamento previsivel em descontos ou ajustes futuros. |
| `formatCurrency` | Formatar valores com muitas casas decimais | Confirmar arredondamento no padrao monetario. |
| `cartInMemory.add` | Nao mutar o array original | Garantir imutabilidade para compatibilidade com Zustand/React. |
| `cartInMemory.add` | Adicionar produto diferente ao carrinho existente | Garantir que novos itens sejam anexados sem alterar os demais. |
| `cartInMemory.remove` | Nao mutar o array original | Evitar efeitos colaterais em estado compartilhado. |
| `cartInMemory.remove` | Remover item especifico mantendo outros itens | Garantir que apenas o produto selecionado seja afetado. |
| `cart-store` | `clear` deve esvaziar produtos | Validar acao principal do store. |
| `cart-store` | `add` deve delegar para helper e atualizar estado | Cobrir integracao minima entre Zustand e helper. |
| `cart-store` | `remove` deve delegar para helper e atualizar estado | Cobrir comportamento do store persistido. |
| `orders.createOrder` | Inserir pedido com `address` e `total_price` corretos | Garantir payload correto para Supabase. |
| `orders.createOrder` | Inserir itens com `order_id`, `product_id`, `title`, `quantity` e `price` | Validar transformacao de produtos do carrinho em linhas de pedido. |
| `orders.createOrder` | Lancar erro quando a criacao do pedido falhar | Garantir tratamento de falhas do Supabase. |
| `orders.createOrder` | Fazer rollback do pedido quando inserir itens falhar | Garantir consistencia entre `orders` e `order_items`. |
| `orders.createOrder` | Retornar o pedido criado quando tudo der certo | Garantir contrato da funcao. |
| `supabase.getSupabaseClient` | Lancar erro quando variaveis de ambiente nao existem | Evitar falhas silenciosas de configuracao. |
| `products data` | `PRODUCTS` deve ser o flatten de `MENU` | Garantir consistencia da fonte de dados. |
| `products data` | `CATEGORIES` deve refletir os titulos de `MENU` | Garantir sincronizacao entre categorias e secoes. |

## 13. Possiveis testes de componentes

Embora nao sejam estritamente unitarios, estes testes podem aumentar a confianca da interface:

- `Product`: renderiza titulo, descricao, imagem e quantidade quando informada.
- `CategoryButton`: aplica estado selecionado e dispara `onPress`.
- `Button`: renderiza texto/icone e respeita `disabled`.
- Tela de produto: redireciona quando `id` nao existe.
- Tela de carrinho: mostra mensagem de carrinho vazio.
- Tela de carrinho: exibe total calculado.
- Tela de carrinho: mostra alerta quando endereco esta vazio.
- Tela de carrinho: mostra alerta quando carrinho esta vazio.

## 14. Criterios de aceite

- O usuario consegue navegar pelo cardapio e abrir detalhes de qualquer produto existente.
- O usuario consegue adicionar um ou mais produtos ao carrinho.
- Quantidades de produtos repetidos sao somadas corretamente.
- O usuario consegue remover itens do carrinho.
- O total exibido corresponde a soma de preco vezes quantidade.
- O app nao envia pedido sem endereco.
- O app nao envia pedido sem itens.
- Um pedido valido e salvo no Supabase com seus itens.
- O WhatsApp e aberto com uma mensagem contendo endereco, produtos e valor total.
- Apos envio bem-sucedido, o carrinho e limpo.

## 15. Proximos incrementos recomendados

- Corrigir encoding dos textos acentuados.
- Mover telefone do WhatsApp para variavel de ambiente.
- Adicionar testes unitarios para `createOrder` com mock do Supabase.
- Adicionar testes de componentes para carrinho e produto.
- Rever politicas de RLS antes de usar em producao.
- Criar configuracao de teste sem modo watch para CI, por exemplo `jest --runInBand`.
