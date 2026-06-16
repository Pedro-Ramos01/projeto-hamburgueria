import { ProductProps } from "@/utils/data/products";

import { productCartProps } from "@/stores/cart-store";
import { add, remove } from "@/stores/helpers/cart-in-memory";

const product: ProductProps = {
  id: "1",
  title: "X-React",
  price: 24.9,
  description: "Hamburguer de teste",
  cover: 1,
  thumbnail: 1,
  ingredients: ["Pao", "Carne", "Queijo"],
};

const secondProduct: ProductProps = {
  id: "2",
  title: "X-JavaScript",
  price: 34.9,
  description: "Outro hamburguer de teste",
  cover: 2,
  thumbnail: 2,
  ingredients: ["Pao", "Carne", "Molho"],
};

describe("cartInMemory", () => {
  it("deve adicionar um produto novo com quantidade 1", () => {
    const cart = add([], product);

    expect(cart).toHaveLength(1);
    expect(cart[0]).toMatchObject({
      id: product.id,
      title: product.title,
      quantity: 1,
    });
  });

  it("deve aumentar a quantidade quando o produto ja existe", () => {
    const cart = add([{ ...product, quantity: 1 }], product);

    expect(cart).toHaveLength(1);
    expect(cart[0].quantity).toBe(2);
  });

  it("deve manter os outros produtos ao adicionar um item repetido", () => {
    const products: productCartProps[] = [
      { ...product, quantity: 1 },
      { ...secondProduct, quantity: 1 },
    ];

    const cart = add(products, product);

    expect(cart).toHaveLength(2);
    expect(cart.find((item) => item.id === product.id)?.quantity).toBe(2);
    expect(cart.find((item) => item.id === secondProduct.id)?.quantity).toBe(1);
  });

  it("deve diminuir a quantidade ao remover um produto com mais de uma unidade", () => {
    const cart = remove([{ ...product, quantity: 2 }], product.id);

    expect(cart).toHaveLength(1);
    expect(cart[0].quantity).toBe(1);
  });

  it("deve remover o produto do carrinho quando a quantidade chega a zero", () => {
    const cart = remove([{ ...product, quantity: 1 }], product.id);

    expect(cart).toHaveLength(0);
  });

  it("deve manter o carrinho igual ao tentar remover um produto que nao existe", () => {
    const products: productCartProps[] = [{ ...product, quantity: 1 }];

    const cart = remove(products, "produto-inexistente");

    expect(cart).toEqual(products);
  });
});
