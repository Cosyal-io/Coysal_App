export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      Admin_status: {
        Row: {
          contact_email: string
          Entity_name: string
          id: number
          issuer_address: string
          listed_project_ids: string[] | null
        }
        Insert: {
          contact_email: string
          Entity_name: string
          id?: number
          issuer_address: string
          listed_project_ids?: string[] | null
        }
        Update: {
          contact_email?: string
          Entity_name?: string
          id?: number
          issuer_address?: string
          listed_project_ids?: string[] | null
        }
        Relationships: []
      }
      "Auctioning market": {
        Row: {
          auction_created_at: string
          highest_bidding_amount: string | null
          market_id: string
          nft_id: number
        }
        Insert: {
          auction_created_at?: string
          highest_bidding_amount?: string | null
          market_id: string
          nft_id: number
        }
        Update: {
          auction_created_at?: string
          highest_bidding_amount?: string | null
          market_id?: string
          nft_id?: number
        }
        Relationships: []
      }
      Clients: {
        Row: {
          client_name: string
          id: number
        }
        Insert: {
          client_name: string
          id?: number
        }
        Update: {
          client_name?: string
          id?: number
        }
        Relationships: []
      }
      NFT_certs: {
        Row: {
          created_at: string
          id: number
          nft_id: string
          owner: string
          value_credits: number | null
          whitelisted_transferrable_addresses: string[] | null
        }
        Insert: {
          created_at?: string
          id?: number
          nft_id: string
          owner: string
          value_credits?: number | null
          whitelisted_transferrable_addresses?: string[] | null
        }
        Update: {
          created_at?: string
          id?: number
          nft_id?: string
          owner?: string
          value_credits?: number | null
          whitelisted_transferrable_addresses?: string[] | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never
