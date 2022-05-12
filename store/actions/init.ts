export const INIT_APP = "INIT_APP";

export const initApp = () => {
  return async (reduxDispatch:Function) =>{
    reduxDispatch({
        type:INIT_APP,
        initialized:true
    })
  }
};
