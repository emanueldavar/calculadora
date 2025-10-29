import { create } from 'zustand'

export interface PricingInput {
  // SaaS Pricing
  monthlyRecurringRevenue: number
  numberOfCustomers: number
  averageContractLength: number
  
  // One-off Project
  projectRevenue: number
  projectQuantity: number
  
  // Costs
  fixedCosts: number
  variableCosts: number
  customerAcquisitionCost: number
  
  // Type
  calculationType: 'saas' | 'project'
}

export interface CalculatedMetrics {
  revenue: number
  totalCosts: number
  grossProfit: number
  margin: number
  markup: number
  roi: number
  ltv: number
  cac: number
  breakEven: number
  reinvestmentAmount: number
}

export interface Snapshot {
  id: string
  name: string
  timestamp: number
  input: PricingInput
  metrics: CalculatedMetrics
}

export interface Goal {
  id: string
  name: string
  targetRevenue: number
  targetQuantity: number
  achieved: boolean
}

interface PricingStore {
  input: PricingInput
  snapshots: Snapshot[]
  goals: Goal[]
  
  updateInput: (field: keyof PricingInput, value: number | string) => void
  calculateMetrics: () => CalculatedMetrics
  addSnapshot: (name: string) => void
  deleteSnapshot: (id: string) => void
  addGoal: (name: string, targetRevenue: number, targetQuantity: number) => void
  updateGoal: (id: string, achieved: boolean) => void
  deleteGoal: (id: string) => void
  loadSnapshot: (id: string) => void
}

const defaultInput: PricingInput = {
  monthlyRecurringRevenue: 10000,
  numberOfCustomers: 100,
  averageContractLength: 12,
  projectRevenue: 5000,
  projectQuantity: 10,
  fixedCosts: 20000,
  variableCosts: 5000,
  customerAcquisitionCost: 500,
  calculationType: 'saas'
}

export const usePricingStore = create<PricingStore>((set, get) => ({
  input: defaultInput,
  snapshots: [],
  goals: [],
  
  updateInput: (field, value) => {
    set((state) => ({
      input: { ...state.input, [field]: value }
    }))
  },
  
  calculateMetrics: () => {
    const { input } = get()
    
    let revenue = 0
    if (input.calculationType === 'saas') {
      revenue = input.monthlyRecurringRevenue * input.numberOfCustomers
    } else {
      revenue = input.projectRevenue * input.projectQuantity
    }
    
    const totalCosts = input.fixedCosts + input.variableCosts
    const grossProfit = revenue - totalCosts
    const margin = revenue > 0 ? (grossProfit / revenue) * 100 : 0
    const markup = totalCosts > 0 ? (grossProfit / totalCosts) * 100 : 0
    const roi = totalCosts > 0 ? (grossProfit / totalCosts) * 100 : 0
    
    // LTV (Lifetime Value) for SaaS
    const ltv = input.calculationType === 'saas' 
      ? input.monthlyRecurringRevenue * input.averageContractLength 
      : input.projectRevenue
    
    const cac = input.customerAcquisitionCost
    
    // Break-even analysis (months or projects needed)
    const contributionMargin = revenue - input.variableCosts
    const breakEven = contributionMargin > 0 
      ? input.fixedCosts / contributionMargin 
      : 0
    
    // Reinvestment (30% of profit)
    const reinvestmentAmount = grossProfit > 0 ? grossProfit * 0.3 : 0
    
    return {
      revenue,
      totalCosts,
      grossProfit,
      margin,
      markup,
      roi,
      ltv,
      cac,
      breakEven,
      reinvestmentAmount
    }
  },
  
  addSnapshot: (name) => {
    const { input } = get()
    const metrics = get().calculateMetrics()
    const snapshot: Snapshot = {
      id: Date.now().toString(),
      name,
      timestamp: Date.now(),
      input: { ...input },
      metrics
    }
    set((state) => ({
      snapshots: [...state.snapshots, snapshot]
    }))
  },
  
  deleteSnapshot: (id) => {
    set((state) => ({
      snapshots: state.snapshots.filter(s => s.id !== id)
    }))
  },
  
  addGoal: (name, targetRevenue, targetQuantity) => {
    const goal: Goal = {
      id: Date.now().toString(),
      name,
      targetRevenue,
      targetQuantity,
      achieved: false
    }
    set((state) => ({
      goals: [...state.goals, goal]
    }))
  },
  
  updateGoal: (id, achieved) => {
    set((state) => ({
      goals: state.goals.map(g => 
        g.id === id ? { ...g, achieved } : g
      )
    }))
  },
  
  deleteGoal: (id) => {
    set((state) => ({
      goals: state.goals.filter(g => g.id !== id)
    }))
  },
  
  loadSnapshot: (id) => {
    const { snapshots } = get()
    const snapshot = snapshots.find(s => s.id === id)
    if (snapshot) {
      set({ input: { ...snapshot.input } })
    }
  }
}))
