export type UserRole = 'buyer' | 'seller'

export interface User {
  id: string
  name: string
  handle: string
  avatarColor: string
  rating: number
  deals: number
  verified: boolean
  location: string
  memberSince: string
  role: UserRole
}

export type CarCondition = 'new' | 'like-new' | 'excellent' | 'good' | 'fair'

export type NegotiationMode = 'firm' | 'open' | 'auction'

export type RequestStatus = 'active' | 'negotiating' | 'deal-pending' | 'closed'

export interface CarSpec {
  make: string
  model: string
  yearMin: number
  yearMax: number
  bodyStyle: string
  transmission: 'automatic' | 'manual' | 'any'
  fuel: 'gasoline' | 'hybrid' | 'electric' | 'diesel' | 'any'
  color?: string
  mileageMax?: number
  trims?: string[]
  features?: string[]
  condition: CarCondition
}

export interface CarRequest {
  id: string
  buyerId: string
  title: string
  spec: CarSpec
  priceMin: number
  priceMax: number
  negotiation: NegotiationMode
  status: RequestStatus
  urgency: 'low' | 'medium' | 'high'
  location: string
  radiusMiles: number
  createdAt: string
  expiresAt: string
  views: number
  offerCount: number
  matchScore?: number
  referenceImage: string
  notes?: string
  pinned?: boolean
  boosted?: boolean
  tradeIn?: {
    make: string
    model: string
    year: number
    value: number
  }
}

export type OfferStatus = 'pending' | 'countered' | 'accepted' | 'declined' | 'withdrawn'

export interface Offer {
  id: string
  requestId: string
  sellerId: string
  price: number
  vehicle: {
    year: number
    make: string
    model: string
    trim: string
    mileage: number
    color: string
    vin: string
    images: string[]
  }
  message: string
  includes: string[]
  status: OfferStatus
  createdAt: string
  expiresAt: string
  counterHistory?: { price: number; by: 'buyer' | 'seller'; at: string }[]
}

export interface Message {
  id: string
  threadId: string
  senderId: string
  text?: string
  kind: 'text' | 'offer' | 'counter' | 'system' | 'photo'
  offerPrice?: number
  photoUrl?: string
  createdAt: string
  read: boolean
}

export interface Thread {
  id: string
  requestId: string
  buyerId: string
  sellerId: string
  lastMessage: Message
  unread: number
  pinned?: boolean
  typing?: boolean
}
