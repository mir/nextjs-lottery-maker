export interface LotteryItem {
    lotteryID: number,
    state: string,
    next_state: string,
    players: Array<string>,
    winner: string | undefined,
    bank: number
}

const useLotteryItems = () => {
    const lotteries: Array<LotteryItem> = [{
        lotteryID: 1,
        state: "opened",
        next_state: "stop",
        players: ["0x1B75f6c15E34eEfE458FD713fD016C6d515436AA","0x1B75f6c15E34eEfE458FD713fD016C6d515436AB"],
        winner: "",
        bank: 0.7,
      },
      {
          lotteryID: 2,
          state: "money transferred",
          next_state: "",
          players: ["0x1B75f6c15E34eEfE458FD713fD016C6d515436AA","0x1B75f6c15E34eEfE458FD713fD016C6d515436AB"],
          winner: "0x1B75f6c15E34eEfE458FD713fD016C6d515436AC",
          bank: 0.8,
      }];

    return [lotteries];
}

export default useLotteryItems;