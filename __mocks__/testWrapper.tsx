import React, { PropsWithChildren } from 'react';
import { configureStore, PreloadedState } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { NextRouter } from 'next/router';
import { RouterContext } from 'next/dist/shared/lib/router-context';
import { render, RenderOptions } from '@testing-library/react';

import { createMockRouter } from './createMockRouter';

import { combinedReducer, RootState } from '../src/redux/store';

const setupStore = (preloadedState?: PreloadedState<RootState>) => {
  return configureStore({
    reducer: combinedReducer,
    preloadedState,
  });
};

interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
  preloadedState?: PreloadedState<RootState>;
  store?: ReturnType<typeof setupStore>;
}

const renderWithProviders = (
  ui: React.ReactElement,
  {
    preloadedState = {},
    store = setupStore(preloadedState),
    ...renderOptions
  }: ExtendedRenderOptions = {},
  router: Partial<NextRouter> = {}
) => {
  const Wrapper = ({ children }: PropsWithChildren<{}>): JSX.Element => {
    return (
      <Provider store={store}>
        <RouterContext.Provider value={createMockRouter(router)}>
          {children}
        </RouterContext.Provider>
      </Provider>
    );
  };
  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
};

export { renderWithProviders };
