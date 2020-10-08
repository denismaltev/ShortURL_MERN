export const useMessage = () => {
  return (text) => {
    if (text && window.M) {
      window.M.toast({ html: text });
    }
  };
};
