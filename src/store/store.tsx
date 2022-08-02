import React, { createContext, Dispatch, useContext, useMemo, useReducer, useState } from 'react';
import { IListItem, IStoreState } from './data';

type Action = 
| { type: 'saveState', payload: any }
| { type: 'changeResize', payload: any }

const reducer = (state: IStoreState, action: Action) => {
  switch (action.type) {
    case 'saveState':
      return action.payload;
    case 'changeResize':
    return action.payload;
    default:
      return state;
  }
};

const initialState: IStoreState = { byId: {}, allIds: [],resize:0 };

const StoreContext = createContext<{ state: IStoreState,  dispatch?: Dispatch<Action> }>({
  state: initialState,
});

export const useStoreState = () => {
  const { state } = useContext(StoreContext);

  const list = useMemo(() => {
    const { byId, allIds } = state;
    return allIds.map(id => byId[id]).filter(i => i) as NonNullable<IListItem[]>;
  }, [state]);

  return { list };
}

export const useStoreActions = () => {
  const { dispatch } = useContext(StoreContext);

  if (dispatch === undefined) {
    throw new Error('error information');
  }

  // const onAdd = useCallback(async (item: IListItem) => {
  //   // send async request;
  //   dispatch({ type: 'addItem', payload: item });
  // }, [dispatch]);

  // const onRemove = useCallback(async (id: number) => {
  //   // send async request
  //   dispatch({ type: 'removeItem', payload: { id } });
  // }, [dispatch]);

  // const onUpdata = useCallback(async (id: number) => {
  //   // send async request
  //   dispatch({ type: 'updata', payload: { id } });
  // }, [dispatch]);
  // return { onAdd, onRemove,onUpdata };
};

const Store: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  // const [loading, setLoading] = useState(false);
  
  // useEffect(() => {
  //   let didCancel = false;
  //   (async () => {
  //     setLoading(true);
    
  //     const res =[{id:'1',name:'123'}]
  //     if (res && !didCancel) {
  //       dispatch({ type: 'saveState', payload: res });
  //       setLoading(false);
  //     }
  //   })();
  //   return () => {
  //     didCancel = true;
  //   };
  // }, []);

  return (
    <StoreContext.Provider value={{ state, dispatch }}>{children}</StoreContext.Provider>
  );
};

export default Store;