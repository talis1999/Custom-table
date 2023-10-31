const getSelectedColumnsCounter = (
  selectedColumnsLength: number = 0
): string => {
  return selectedColumnsLength === 1
    ? `${selectedColumnsLength} column selected`
    : `${selectedColumnsLength} columns selected`;
};

export default getSelectedColumnsCounter;
