import { formatCurrency } from "@/utils/functions/format-currency";

describe("formatCurrency", () => {
  it("deve formatar um valor em reais", () => {
    expect(formatCurrency(24.9)).toBe("R$\u00a024,90");
  });

  it("deve manter duas casas decimais", () => {
    expect(formatCurrency(10)).toBe("R$\u00a010,00");
  });

  it("deve lidar com zero", () => {
    expect(formatCurrency(0)).toBe("R$\u00a00,00");
  });

  it("deve lidar com valores quebrados", () => {
    expect(formatCurrency(24.99)).toBe("R$\u00a024,99");
  });

  it("deve lidar com valores maiores", () => {
    expect(formatCurrency(1500.5)).toBe("R$\u00a01.500,50");
  });
});
