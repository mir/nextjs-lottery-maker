import { Button } from "web3uikit";
import { enterLottery } from "../contracts/LotteryMakerWrapper";

export default function LotteryEntrance() {    
    return (
        <div>
            <Button onClick={async () => {
                console.log("Button clicked");
                await enterLottery(
                    (error: any) => console.log(error),
                    () => console.log(`success`));
            }} text="Enter lottery"/>
        </div>
    )
}