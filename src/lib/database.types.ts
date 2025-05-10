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
      blogposts: {
        Row: {
          author: string
          content: string | null
          date: string
          excerpt: string | null
          id: string
          image: string | null
          status: Database["public"]["Enums"]["post_status"]
          title: string
        }
        Insert: {
          author: string
          content?: string | null
          date?: string
          excerpt?: string | null
          id?: string
          image?: string | null
          status?: Database["public"]["Enums"]["post_status"]
          title: string
        }
        Update: {
          author?: string
          content?: string | null
          date?: string
          excerpt?: string | null
          id?: string
          image?: string | null
          status?: Database["public"]["Enums"]["post_status"]
          title?: string
        }
        Relationships: []
      }
      orders: {
        Row: {
          customer: string
          date: string
          id: string
          items: Json | null
          payment_method: string
          recipient_name: string | null
          shipping_address: Json | null
          status: string
          total: number
        }
        Insert: {
          customer: string
          date?: string
          id?: string
          items?: Json | null
          payment_method?: string
          recipient_name?: string | null
          shipping_address?: Json | null
          status?: string
          total: number
        }
        Update: {
          customer?: string
          date?: string
          id?: string
          items?: Json | null
          payment_method?: string
          recipient_name?: string | null
          shipping_address?: Json | null
          status?: string
          total?: number
        }
        Relationships: []
      }
      products: {
        Row: {
          category: string
          description: string | null
          id: string
          image_url: string | null
          name: string
          price: number
          stock: number | null
        }
        Insert: {
          category: string
          description?: string | null
          id?: string
          image_url?: string | null
          name: string
          price: number
          stock?: number | null
        }
        Update: {
          category?: string
          description?: string | null
          id?: string
          image_url?: string | null
          name?: string
          price?: number
          stock?: number | null
        }
        Relationships: []
      }
      reviews: {
        Row: {
          author: string
          date: string | null
          id: string
          post_id: string | null
          rating: number
          status: string | null
          text: string | null
        }
        Insert: {
          author: string
          date?: string | null
          id?: string
          post_id?: string | null
          rating: number
          status?: string | null
          text?: string | null
        }
        Update: {
          author?: string
          date?: string | null
          id?: string
          post_id?: string | null
          rating?: number
          status?: string | null
          text?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_reviews_blogpost"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "blogposts"
            referencedColumns: ["id"]
          },
        ]
      }
      user_profiles: {
        Row: {
          created_at: string | null
          email: string | null
          first_name: string | null
          last_name: string | null
          phone: string | null
          role: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          email?: string | null
          first_name?: string | null
          last_name?: string | null
          phone?: string | null
          role?: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          email?: string | null
          first_name?: string | null
          last_name?: string | null
          phone?: string | null
          role?: string
          updated_at?: string | null
          user_id?: string
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
      post_status: "Opublikowany" | "Szkic"
      PostStatus: "Szkic" | "Opublikowany"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      post_status: ["Opublikowany", "Szkic"],
      PostStatus: ["Szkic", "Opublikowany"],
    },
  },
} as const
