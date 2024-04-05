import { createReducer, on } from '@ngrx/store';
import { setError, setToken } from './auth.actions';

export interface AuthState {
  token: string;
  error: any;
}

export const initialState: AuthState = {
  token: '',
  error: null
}

export const authReducer = createReducer(
  initialState,
  on(setToken, (state: AuthState = initialState, { token }) => ({ ...state, token })),
  on(setError, (state: AuthState = initialState, { error }) => ({ ...state, error })),
)
