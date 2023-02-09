import { useLayoutEffect, useEffect, EffectCallback, DependencyList } from 'react';

const useIsomorphicLayoutEffect: (effect: EffectCallback, deps?: DependencyList) => void = typeof window !== 'undefined' ? useLayoutEffect : useEffect

export default useIsomorphicLayoutEffect