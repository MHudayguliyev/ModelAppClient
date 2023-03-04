import { configureStore } from '@reduxjs/toolkit'
import { getDefaultMiddleware } from '@reduxjs/toolkit';
import CartReducer from './reducers/CartReducer'
import UploadReducer from './reducers/UploadReducer'
import ModelsReducer from './reducers/ModelReducer';
import AdminReducer from './reducers/AdminReducer';

const store = configureStore({
    reducer: {
        cartReducer: CartReducer,
        uploadReducer: UploadReducer,
        modelsReducer: ModelsReducer,
        adminReducer: AdminReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false, immutableCheck: false}),
})

export default store

export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {themeReducer: ThemeReducer }
export type AppDispatch = typeof store.dispatch;