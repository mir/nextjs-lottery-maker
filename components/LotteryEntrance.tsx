import { Button } from "web3uikit";

export default function LotteryEntrance() {    
    return (
        <div>
            <Button onClick={async () => {
                console.log("Button clicked");                
            }} text="Enter lottery"/>
        </div>
    )
}