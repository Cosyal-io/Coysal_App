"use client"
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupLabel, SidebarGroupContent,  SidebarMenu, SidebarMenuItem, SidebarMenuButton  } from "s/components/ui/sidebar"
import { Home, Stamp } from "lucide-react"
import {supabaseClient} from "src/utils/supabase_db"
import { useEffect, useState } from "react"

const client_items = [
    {
        title: "Buying_NFT_Certs",
        url: "/client/market",
        icon: Home,
    },
    {
        title: "statistics",
        url: "/client/stats",
        icon: Stamp,

    }
]

const admin_items = [
{
    title: "UploadNFT",
    url: "/admin/onboard",
    icon: Home,
},
{
    title: "Statistics",
    url:  "/admin/onboard",
    icon: Stamp
}
]
export function SideBarApp() {
  const [items, setItems] = useState([])  
  
  return (
      <Sidebar>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Application</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {client_items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <a href={item.url}>
                        <item.icon />
                        <span>{item.title}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
    )
  }