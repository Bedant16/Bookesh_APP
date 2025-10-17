export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      event_bookings: {
        Row: {
          booking_status: Database["public"]["Enums"]["booking_status"] | null
          created_at: string | null
          event_id: string
          id: string
          quantity: number
          total_price: number
          user_id: string
        }
        Insert: {
          booking_status?: Database["public"]["Enums"]["booking_status"] | null
          created_at?: string | null
          event_id: string
          id?: string
          quantity?: number
          total_price: number
          user_id: string
        }
        Update: {
          booking_status?: Database["public"]["Enums"]["booking_status"] | null
          created_at?: string | null
          event_id?: string
          id?: string
          quantity?: number
          total_price?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "event_bookings_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
        ]
      }
      events: {
        Row: {
          created_at: string | null
          description: string | null
          event_date: string
          event_type: string
          id: string
          image_url: string | null
          price: number
          title: string
          venue: string
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          event_date: string
          event_type: string
          id?: string
          image_url?: string | null
          price: number
          title: string
          venue: string
        }
        Update: {
          created_at?: string | null
          description?: string | null
          event_date?: string
          event_type?: string
          id?: string
          image_url?: string | null
          price?: number
          title?: string
          venue?: string
        }
        Relationships: []
      }
      food_items: {
        Row: {
          category: string
          created_at: string | null
          description: string | null
          id: string
          image_url: string | null
          is_available: boolean | null
          name: string
          price: number
          restaurant_id: string | null
        }
        Insert: {
          category: string
          created_at?: string | null
          description?: string | null
          id?: string
          image_url?: string | null
          is_available?: boolean | null
          name: string
          price: number
          restaurant_id?: string | null
        }
        Update: {
          category?: string
          created_at?: string | null
          description?: string | null
          id?: string
          image_url?: string | null
          is_available?: boolean | null
          name?: string
          price?: number
          restaurant_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "food_items_restaurant_id_fkey"
            columns: ["restaurant_id"]
            isOneToOne: false
            referencedRelation: "restaurants"
            referencedColumns: ["id"]
          },
        ]
      }
      food_order_items: {
        Row: {
          created_at: string | null
          food_item_id: string
          id: string
          order_id: string
          price: number
          quantity: number
        }
        Insert: {
          created_at?: string | null
          food_item_id: string
          id?: string
          order_id: string
          price: number
          quantity?: number
        }
        Update: {
          created_at?: string | null
          food_item_id?: string
          id?: string
          order_id?: string
          price?: number
          quantity?: number
        }
        Relationships: [
          {
            foreignKeyName: "food_order_items_food_item_id_fkey"
            columns: ["food_item_id"]
            isOneToOne: false
            referencedRelation: "food_items"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "food_order_items_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "food_orders"
            referencedColumns: ["id"]
          },
        ]
      }
      food_orders: {
        Row: {
          created_at: string | null
          delivery_address: string | null
          delivery_type: string
          id: string
          order_status: Database["public"]["Enums"]["order_status"] | null
          restaurant_id: string
          total_price: number
          user_id: string
        }
        Insert: {
          created_at?: string | null
          delivery_address?: string | null
          delivery_type: string
          id?: string
          order_status?: Database["public"]["Enums"]["order_status"] | null
          restaurant_id: string
          total_price: number
          user_id: string
        }
        Update: {
          created_at?: string | null
          delivery_address?: string | null
          delivery_type?: string
          id?: string
          order_status?: Database["public"]["Enums"]["order_status"] | null
          restaurant_id?: string
          total_price?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "food_orders_restaurant_id_fkey"
            columns: ["restaurant_id"]
            isOneToOne: false
            referencedRelation: "restaurants"
            referencedColumns: ["id"]
          },
        ]
      }
      movie_bookings: {
        Row: {
          booking_date: string
          booking_status: Database["public"]["Enums"]["booking_status"] | null
          created_at: string | null
          id: string
          movie_id: string
          seat_numbers: string[]
          seat_type: Database["public"]["Enums"]["seat_type"]
          show_time: string
          total_price: number
          user_id: string
        }
        Insert: {
          booking_date: string
          booking_status?: Database["public"]["Enums"]["booking_status"] | null
          created_at?: string | null
          id?: string
          movie_id: string
          seat_numbers: string[]
          seat_type: Database["public"]["Enums"]["seat_type"]
          show_time: string
          total_price: number
          user_id: string
        }
        Update: {
          booking_date?: string
          booking_status?: Database["public"]["Enums"]["booking_status"] | null
          created_at?: string | null
          id?: string
          movie_id?: string
          seat_numbers?: string[]
          seat_type?: Database["public"]["Enums"]["seat_type"]
          show_time?: string
          total_price?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "movie_bookings_movie_id_fkey"
            columns: ["movie_id"]
            isOneToOne: false
            referencedRelation: "movies"
            referencedColumns: ["id"]
          },
        ]
      }
      movies: {
        Row: {
          created_at: string | null
          description: string | null
          duration: number
          genre: string
          id: string
          image_url: string | null
          rating: number | null
          release_date: string | null
          title: string
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          duration: number
          genre: string
          id?: string
          image_url?: string | null
          rating?: number | null
          release_date?: string | null
          title: string
        }
        Update: {
          created_at?: string | null
          description?: string | null
          duration?: number
          genre?: string
          id?: string
          image_url?: string | null
          rating?: number | null
          release_date?: string | null
          title?: string
        }
        Relationships: []
      }
      payments: {
        Row: {
          amount: number
          booking_id: string
          booking_type: string
          created_at: string | null
          currency: string | null
          id: string
          razorpay_order_id: string
          razorpay_payment_id: string | null
          razorpay_signature: string | null
          status: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          amount: number
          booking_id: string
          booking_type: string
          created_at?: string | null
          currency?: string | null
          id?: string
          razorpay_order_id: string
          razorpay_payment_id?: string | null
          razorpay_signature?: string | null
          status?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          amount?: number
          booking_id?: string
          booking_type?: string
          created_at?: string | null
          currency?: string | null
          id?: string
          razorpay_order_id?: string
          razorpay_payment_id?: string | null
          razorpay_signature?: string | null
          status?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          created_at: string | null
          email: string | null
          full_name: string | null
          id: string
          phone: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          email?: string | null
          full_name?: string | null
          id: string
          phone?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string | null
          full_name?: string | null
          id?: string
          phone?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      restaurants: {
        Row: {
          created_at: string | null
          cuisine: string
          delivery_time: string | null
          id: string
          image_url: string | null
          is_cinema_vendor: boolean | null
          name: string
          rating: number | null
        }
        Insert: {
          created_at?: string | null
          cuisine: string
          delivery_time?: string | null
          id?: string
          image_url?: string | null
          is_cinema_vendor?: boolean | null
          name: string
          rating?: number | null
        }
        Update: {
          created_at?: string | null
          cuisine?: string
          delivery_time?: string | null
          id?: string
          image_url?: string | null
          is_cinema_vendor?: boolean | null
          name?: string
          rating?: number | null
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
      booking_status: "pending" | "confirmed" | "cancelled"
      order_status: "pending" | "processing" | "completed" | "cancelled"
      seat_type: "standard" | "premium" | "vip"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      booking_status: ["pending", "confirmed", "cancelled"],
      order_status: ["pending", "processing", "completed", "cancelled"],
      seat_type: ["standard", "premium", "vip"],
    },
  },
} as const
