export type User = {
  id: number
  type: 'friend' | 'member' | 'admin'
  name: string
  email: string
  payments?: PersonalPayment[]
  tasks?: Task[]
  projects?: Project[]
  events?: Event[]
}

export type Project = {
  owners: User['id'][]
  tasks: Taskp['id']
  dueDate: Date
  progress: number
  budget: number
}

export type Task = {
  owner: User['id']
  description: string
  dueDate: Date
}

export type Payment = {
  amount: number
  type: 'credit' | 'cash' | 'transfer' | 'crypto'
  currency: 'USD' | 'EUR' | 'BTC' | 'ETH' | 'USDC'
}

export type PersonalPayment = {
  from: User['id']
  to: User['id']
  payment: Payment['id']
  walletAddress?: string
  dueDate: Date
}

export type Events = {
  date: Date
  organizer: User['id']
  suggestedby?: User['id']
  description: string
  price: number
}


type Profile = {
  id: number;
  principal: string;
  username: string;
  bio: string;
};
