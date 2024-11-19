import {SidebarProvider, SidebarTrigger} from "s/components/ui/sidebar"
import {SideBarApp} from "src/components/user-sidebar"

export function Layout({ children }: { children: React.ReactNode }) {
    return (
        <SidebarProvider>
            <SideBarApp/>
        <main>
        <SidebarTrigger />
        {children}
        </main>
        </SidebarProvider>
    );
    }