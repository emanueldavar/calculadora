import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { usePricingStore } from '@/store/pricingStore'
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts'

export const Dashboard: React.FC = () => {
  const { snapshots, calculateMetrics } = usePricingStore()
  const currentMetrics = calculateMetrics()
  
  // Prepare data for revenue vs costs chart
  const revenueCostsData = [
    { name: 'Revenue', value: currentMetrics.revenue },
    { name: 'Total Costs', value: currentMetrics.totalCosts },
    { name: 'Gross Profit', value: currentMetrics.grossProfit }
  ]
  
  // Prepare data for metrics breakdown
  const metricsBreakdown = [
    { name: 'LTV', value: currentMetrics.ltv },
    { name: 'CAC', value: currentMetrics.cac },
    { name: 'Reinvestment', value: currentMetrics.reinvestmentAmount }
  ]
  
  // Prepare historical data from snapshots
  const historicalData = snapshots.map((snapshot) => ({
    name: snapshot.name.substring(0, 10),
    revenue: snapshot.metrics.revenue,
    profit: snapshot.metrics.grossProfit,
    margin: snapshot.metrics.margin
  }))
  
  // Add current data to historical
  historicalData.push({
    name: 'Current',
    revenue: currentMetrics.revenue,
    profit: currentMetrics.grossProfit,
    margin: currentMetrics.margin
  })
  
  // Cost breakdown for pie chart
  const costBreakdown = [
    { name: 'Fixed Costs', value: usePricingStore.getState().input.fixedCosts },
    { name: 'Variable Costs', value: usePricingStore.getState().input.variableCosts }
  ]
  
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d']
  
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Revenue vs Costs vs Profit</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={revenueCostsData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
                <Bar dataKey="value" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Cost Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={costBreakdown}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={(entry: { name?: string; percent?: number }) => `${entry.name || ''} ${((entry.percent || 0) * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {costBreakdown.map((_entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Key Metrics</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={metricsBreakdown}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
                <Bar dataKey="value" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        
        {historicalData.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Historical Trends</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={historicalData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="revenue" stroke="#8884d8" name="Revenue" />
                  <Line type="monotone" dataKey="profit" stroke="#82ca9d" name="Profit" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        )}
      </div>
      
      {historicalData.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Margin Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={historicalData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip formatter={(value) => `${Number(value).toFixed(2)}%`} />
                <Line type="monotone" dataKey="margin" stroke="#ff7300" name="Margin %" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
