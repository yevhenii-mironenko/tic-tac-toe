export function useBoard() {
  function handleClick(number: number) {
    console.log("click" + number);
  }

  return {
    operations: {
      handleClick,
    },
  };
}
