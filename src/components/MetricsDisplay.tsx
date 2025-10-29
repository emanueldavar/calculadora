import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { usePricingStore } from '@/store/pricingStore'

export const MetricsDisplay: React.FC = () => {
  const calculateMetrics = usePricingStore((state) => state.calculateMetrics)
  const metrics = calculateMetrics()
  
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value)
  }
  
  const formatPercent = (value: number) => {
    return `${value.toFixed(2)}%`
  }
  
  const metricCards = [
    { label: 'Revenue', value: formatCurrency(metrics.revenue), color: 'text-blue-600' },
    { label: 'Total Costs', value: formatCurrency(metrics.totalCosts), color: 'text-red-600' },
    { label: 'Gross Profit', value: formatCurrency(metrics.grossProfit), color: metrics.grossProfit >= 0 ? 'text-green-600' : 'text-red-600' },
    { label: 'Margin', value: formatPercent(metrics.margin), color: metrics.margin >= 0 ? 'text-green-600' : 'text-red-600' },
    { label: 'Markup', value: formatPercent(metrics.markup), color: 'text-purple-600' },
    { label: 'ROI', value: formatPercent(metrics.roi), color: metrics.roi >= 0 ? 'text-green-600' : 'text-red-600' },
    { label: 'LTV', value: formatCurrency(metrics.ltv), color: 'text-indigo-600' },
    { label: 'CAC', value: formatCurrency(metrics.cac), color: 'text-orange-600' },
    { label: 'Break-even', value: metrics.breakEven.toFixed(2), color: 'text-yellow-600' },
    { label: 'Reinvestment (30%)', value: formatCurrency(metrics.reinvestmentAmount), color: 'text-teal-600' }
  ]
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Calculated Metrics</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {metricCards.map((metric) => (
            <div key={metric.label} className="space-y-1">
              <p className="text-sm text-muted-foreground">{metric.label}</p>
              <p className={`text-2xl font-bold ${metric.color}`}>{metric.value}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
