import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './ItemCounter.tsx';
import carrinhoReducer, { EstadoCarrinho } from './CartItems.tsx';

export const store = configureStore({
  reducer: {
    contador: counterReducer,
    carrinho: carrinhoReducer
  },
})

store.subscribe(() => {
  const cartState: EstadoCarrinho = store.getState().carrinho;
  localStorage.setItem('cartState', JSON.stringify(cartState));
});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

