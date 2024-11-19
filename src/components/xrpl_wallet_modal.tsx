import { IProvider } from '@web3auth/base';
import { convertStringToHex, Payment, xrpToDrops } from 'xrpl';
import {HoverCard, HoverCardContent, HoverCardTrigger} from "s/components/ui/hover-card"


export default function WalletLogin(): JSX.Element  {

return(
<HoverCard>
  <HoverCardTrigger>
    <button className='bg-slate-900 text-white rounded-md p-2'>SignUp</button>
  </HoverCardTrigger>
  <HoverCardContent>
    <div className='bg-slate-900 text-white p-2'>
      <p>Connect your XRPL wallet to the platform</p>
    </div>
  </HoverCardContent>
</HoverCard>
)

}