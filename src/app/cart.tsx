import { useState } from "react";
import { View, Text, ScrollView, Alert, Linking } from "react-native";
import { useNavigation } from "expo-router";
import { Feather } from "@expo/vector-icons";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import { Button } from "@/components/button";
import { Header } from "@/components/header";
import { Input } from "@/components/input";
import { LinkButton } from "@/components/link-button";
import { Product } from "@/components/products";

import { createOrder } from "@/services/orders";
import { productCartProps, useCartStore } from "@/stores/cart-store";
import { formatCurrency } from "@/utils/functions/format-currency";

const PHONE_NUMBER = "5519997418514";

export default function Cart() {
  const [address, setAddress] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const cartStore = useCartStore();
  const navigation = useNavigation();

  const totalPrice = cartStore.products.reduce(
    (total, product) => total + product.price * product.quantity,
    0
  );
  const total = formatCurrency(totalPrice);

  function handleProductRemove(product: productCartProps) {
    Alert.alert("Remover", `Deseja remover ${product.title} do carrinho?`, [
      {
        text: "Cancelar",
      },
      {
        text: "Remover",
        onPress: () => cartStore.remove(product.id),
      },
    ]);
  }

  async function handleOder() {
    if (address.trim().length === 0) {
      return Alert.alert("Atenção", "Informe o endereço de entrega.");
    }

    if (cartStore.products.length === 0) {
      return Alert.alert("Atenção", "Adicione produtos ao carrinho.");
    }

    const products = cartStore.products
      .map((product) => `\n ${product.quantity} ${product.title}`)
      .join("");

    const message = `
    🍔 NOVO PEDIDO
    \n Entregar em ${address.trim()}
    
    ${products}
    
    \n Valor total: ${total}`;

    try {
      setIsSubmitting(true);

      await createOrder({
        address: address.trim(),
        products: cartStore.products,
        totalPrice,
      });

      await Linking.openURL(
        `http://api.whatsapp.com/send?phone=${PHONE_NUMBER}&text=${encodeURIComponent(
          message
        )}`
      );

      cartStore.clear();
      navigation.goBack();
    } catch (error) {
      Alert.alert(
        "Erro ao enviar pedido",
        error instanceof Error
          ? error.message
          : "Não foi possível salvar o pedido no Supabase."
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <View className="flex-1 pt-8">
      <KeyboardAwareScrollView
        showsHorizontalScrollIndicator={false}
        extraHeight={100}
      >
        <Header title="Seu Carrinho" />
        <ScrollView>
          <View className="p-5 flex-1">
            {cartStore.products.length > 0 ? (
              <View className="border-b border-slate-700">
                {cartStore.products.map((product) => (
                  <Product
                    key={product.id}
                    data={product}
                    onPress={() => handleProductRemove(product)}
                  />
                ))}
              </View>
            ) : (
              <Text className="font-body text-slate-400 text-center my-8">
                Seu carrinho está vazio
              </Text>
            )}

            <View className="flex-row gap-2 items-center mt-5 mb-4">
              <Text className="text-white text-xl font-subtitle">Total</Text>
              <Text className="text-lime-400 text-2xl font-heading">
                {total}
              </Text>
            </View>

            <Input
              placeholder="Informe o endereço de entrega com rua, bairro, CEP, número e complemento"
              onChangeText={setAddress}
              onSubmitEditing={handleOder}
              submitBehavior="blurAndSubmit"
              returnKeyType="next"
            />
          </View>
        </ScrollView>
      </KeyboardAwareScrollView>

      <View className="p-5 gap-5">
        <Button onPress={handleOder} disabled={isSubmitting}>
          <Button.Text>
            {isSubmitting ? "Enviando pedido..." : "Enviar pedido"}
          </Button.Text>
          <Button.Icon>
            <Feather name="arrow-right-circle" size={20} />
          </Button.Icon>
        </Button>

        <LinkButton title="Voltar ao cardápio" href={"/"} />
      </View>
    </View>
  );
}
