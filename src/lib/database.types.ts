export interface Database {
  public: {
    Tables: {
      listings: {
        Row: {
          id: string
          title: string
          description: string
          images: string[]
          specifications: Json
          features: string[]
          location: string
          created_at: string
          price: number | null
          status: 'available' | 'pending' | 'sold'
        }
        Insert: {
          id?: string
          title: string
          description: string
          images: string[]
          specifications: Json
          features: string[]
          location: string
          created_at?: string
          price?: number | null
          status?: 'available' | 'pending' | 'sold'
        }
        Update: {
          id?: string
          title?: string
          description?: string
          images?: string[]
          specifications?: Json
          features?: string[]
          location?: string
          created_at?: string
          price?: number | null
          status?: 'available' | 'pending' | 'sold'
        }
      }
      leads: {
        Row: {
          id: string
          created_at: string
          full_name: string
          phone_number: string
          email: string | null
          message: string | null
          listing_id?: string // Made optional
        }
        Insert: {
          id?: string
          created_at?: string
          full_name: string
          phone_number: string
          email?: string | null
          message?: string | null
          listing_id?: string // Made optional
        }
        Update: {
          id?: string
          created_at?: string
          full_name?: string
          phone_number?: string
          email?: string | null
          message?: string | null
          listing_id?: string // Made optional
        }
      }
    }
  }
}