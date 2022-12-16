import type { TypedUseSelectorHook } from 'react-redux';
import type { RootState } from '../redux/store';
import { useSelector } from 'react-redux';
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
