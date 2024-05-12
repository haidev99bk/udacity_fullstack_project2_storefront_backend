import { ProductsStore } from "../../models/products";

const productStore = new ProductsStore();

const mockProduct = {
  name: "Product1",
  price: 2000,
};

describe("Products model", () => {
  it("should create a new product", async () => {
    const result = await productStore.create(
      mockProduct.name,
      mockProduct.price
    );

    expect((result as any)?.price).toBe(2000);
  });

  it("should get the product", async () => {
    const products = await productStore.getAll();
    const result = await productStore.get(Number(products[0].id));

    expect((result as any).price).toBe(2000);
  });

  it("should update the product", async () => {
    const products = await productStore.getAll();
    const result = await productStore.update(Number(products[0].id), {
      ...mockProduct,
      price: 3000,
    });

    expect((result as any).price).toBe(3000);
  });

  it("should get all products", async () => {
    const result = await productStore.getAll();

    expect((result as any).length).toBe(1);
  });

  it("should delete product", async () => {
    const products = await productStore.getAll();

    const result = await productStore.deleteProduct(Number(products[0].id));

    expect((result as any)?.first_name).toBeUndefined();
  });
});
