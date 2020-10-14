export const useMessage = () => {
  let materializeClass;
  return (text, error = null) => {
    // Styling. Message color
    if (error) {
      materializeClass = "red darken-4";
    } else {
      materializeClass = "teal darken-4";
    }

    if (text && window.M) {
      window.M.toast({ html: text, classes: materializeClass });
    }
  };
};
