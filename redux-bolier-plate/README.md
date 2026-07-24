# Redux Toolkit Step-by-Step Guide (React + TypeScript) 🚀

Yeh guide aapko step-by-step sikhayegi ke kis tarah aap is boilerplate project mein **Redux Toolkit** setup aur use kar sakte hain.

---

## 🛠️ steps to Setup Redux Toolkit

### Step 1: Installation (Packages Install Karna)
Sabse pehle aapko required packages install karne hote hain:
```bash
npm install @reduxjs/toolkit react-redux
```

---

### Step 2: Redux Store Create Karna
Hamein ek central store banana hota hai jahan hamara poora application state store hoga.
- File: [src/store/index.ts](file:///c:/Users/abdul/OneDrive/Desktop/x%20components/redux-bolier-plate/src/store/index.ts)

```typescript
import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './slices/cartSlice'; // Apne reducers import karein

export const store = configureStore({
  reducer: {
    cart: cartReducer, // Apne slices yahan register karein
  },
});

// TypeScript Types ko export karna taake components mein type-safety rahe
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
```

---

### Step 3: TypeScript Typed Hooks Setup Karna
TypeScript mein standard `useDispatch` aur `useSelector` ke bajaye custom typed hooks use karna recommended hai taake types automatic detect ho sakein.
- File: [src/store/hooks.ts](file:///c:/Users/abdul/OneDrive/Desktop/x%20components/redux-bolier-plate/src/store/hooks.ts)

```typescript
import { useDispatch, useSelector } from 'react-redux';
import type { TypedUseSelectorHook } from 'react-redux';
import type { RootState, AppDispatch } from './index';

// In hooks ko pure app mein use karein standard hooks ke bajaye
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
```

---

### Step 4: Redux Slice Create Karna (State, Actions & Reducers)
Slice ke andar hum state ki initial value, actions aur state change karne wale reducers likhte hain.
- Example File: [src/store/slices/cartSlice.ts](file:///c:/Users/abdul/OneDrive/Desktop/x%20components/redux-bolier-plate/src/store/slices/cartSlice.ts)

```typescript
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

// 1. State ki Type define karein
export interface CartItem {
  id: number;
  title: string;
  price: number;
  quantity: number;
}

export interface CartState {
  items: CartItem[];
  isOpen: boolean;
}

// 2. Initial State define karein
const initialState: CartState = {
  items: [],
  isOpen: false,
};

// 3. Slice create karein
const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    // Action 1: Cart mein item add karne ke liye
    addItem: (state, action: PayloadAction<Omit<CartItem, 'quantity'>>) => {
      const existingItem = state.items.find((item) => item.id === action.payload.id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
    },
    // Action 2: Item remove karne ke liye
    removeItem: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    // Action 3: Cart open/close toggle karne ke liye
    toggleCart: (state) => {
      state.isOpen = !state.isOpen;
    },
  },
});

// Actions aur Reducer ko export karein
export const { addItem, removeItem, toggleCart } = cartSlice.actions;
export default cartSlice.reducer;
```

---

### Step 5: Reducer ko Store (`store/index.ts`) mein add karna
Jab bhi naya slice banayein, use `src/store/index.ts` ke andar `reducer` object mein lazmi register karein (Jaise Step 2 mein kiya gaya hai).

---

### Step 6: React App ko Store ke sath Wrap Karna
React application ko Redux store access dene ke liye `Provider` component ka use kiya jata hai.
- File: [src/main.tsx](file:///c:/Users/abdul/OneDrive/Desktop/x%20components/redux-bolier-plate/src/main.tsx)

```tsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './store'; // Redux Store import kiya
import App from './App.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}> {/* Pure app ko Provider se wrap kiya */}
      <App />
    </Provider>
  </StrictMode>
);
```

---

### Step 7: Components mein State Read aur Actions Dispatch karna
Kisi bhi component mein Redux state ko read karne aur state modify karne ke liye custom hooks (`useAppSelector` aur `useAppDispatch`) ka use karein.

- Example Usage:
```tsx
import React from 'react';
import { useAppDispatch, useAppSelector } from './store/hooks';
import { addItem, toggleCart } from './store/slices/cartSlice';

const ProductComponent = () => {
  const dispatch = useAppDispatch();
  
  // State read karne ke liye useAppSelector
  const cartItems = useAppSelector((state) => state.cart.items);
  const isCartOpen = useAppSelector((state) => state.cart.isOpen);

  const product = { id: 1, title: 'Awesome T-Shirt', price: 999 };

  return (
    <div>
      <h3>Products</h3>
      <button onClick={() => dispatch(addItem(product))}>
        Add to Cart
      </button>

      <button onClick={() => dispatch(toggleCart())}>
        {isCartOpen ? 'Close Cart' : 'Open Cart'}
      </button>

      <div>
        <h4>Cart Items Count: {cartItems.length}</h4>
      </div>
    </div>
  );
};

export default ProductComponent;
```

---

## ⚡ Summary Checklist
1. `npm install @reduxjs/toolkit react-redux`
2. `src/store/index.ts` mein store configure karein.
3. `src/store/hooks.ts` mein types hooks banayein.
4. `src/store/slices/` mein slices banayein (state & reducers).
5. Slices ko store ke main reducer mein register karein.
6. `main.tsx` mein `<Provider store={store}>` wrap karein.
7. Components mein `useAppSelector` aur `useAppDispatch` use karein.
