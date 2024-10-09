import {HoverCard, HoverCardTrigger, HoverCardContent} from "s/components/ui/hover-card"
import { Button } from "s/components/ui/button";
const Footer = () => (
    <>
    <footer className="flex justify-between p-4">
      {/* <HoverCard>
      <HoverCardTrigger asChild> */}
      <Button variant="link">2024 Coysal Project</Button> {/* Company Name */}
      {/* </HoverCardTrigger> */}
      {/* <HoverCardContent>
        <p>
          Coysal is a platform that allows investors to invest in projects that have a positive impact on society and the environment.
        </p>
      </HoverCardContent>

      </HoverCard> */}
    </footer> 
    </>
  );

  export default Footer;