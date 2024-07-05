import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface EstadoCarrinho {
  items: ItemCarrinho[];
  total: number;
  modifiers: Modifier[];
}

export interface Modifier {
  id: number;
  name: string;
  price: number;
}

export interface ItemCarrinho {
  id: number;
  name: string;
  preco: number;
  quantidade: number;
  modifiers: Modifier[];
}

const initialState: EstadoCarrinho = (() => {
  const savedState: string | null = localStorage.getItem('cartState');
  return savedState ? JSON.parse(savedState) : { items: [], total: 0, modifiers: [] };
})();

const carrinhoSlice = createSlice({
  name: 'carrinho',
  initialState,
  reducers: {
    aumentar(state, action: PayloadAction<number>) {
      const item = state.items.find(item => item.id === action.payload);
      if (item) {
        item.quantidade += 1;
        state.total += item.preco;
      }
      localStorage.setItem('cartState', JSON.stringify(state));
    },
    diminuir(state, action: PayloadAction<number>) {
      const item = state.items.find(item => item.id === action.payload);
      if (item && item.quantidade > 0) {
        item.quantidade -= 1;
        state.total -= item.preco;
        if (item.quantidade === 0) {
          state.items = state.items.filter(remover => remover.id !== item.id);
        }
      }
      if (state.total < 0) state.total = 0;
      localStorage.setItem('cartState', JSON.stringify(state));
    },
    adicionarcarrinho(state, action: PayloadAction<ItemCarrinho>) {
      const itemExistente = state.items.find(item => item.id === action.payload.id);
      if (itemExistente) {
        itemExistente.quantidade += action.payload.quantidade;
      } else {
        state.items.push(action.payload);
      }
      state.total += action.payload.preco * action.payload.quantidade;
      localStorage.setItem('cartState', JSON.stringify(state));
    },
  },
});

export const { adicionarcarrinho, aumentar, diminuir } = carrinhoSlice.actions;
export default carrinhoSlice.reducer;
