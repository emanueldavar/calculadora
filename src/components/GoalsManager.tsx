import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { usePricingStore } from '@/store/pricingStore'
import { Trash2, CheckCircle2 } from 'lucide-react'

export const GoalsManager: React.FC = () => {
  const { goals, addGoal, updateGoal, deleteGoal, calculateMetrics } = usePricingStore()
  const [goalName, setGoalName] = useState('')
  const [targetRevenue, setTargetRevenue] = useState('')
  const [targetQuantity, setTargetQuantity] = useState('')
  
  const metrics = calculateMetrics()
  
  const handleAddGoal = () => {
    if (goalName.trim() && targetRevenue && targetQuantity) {
      addGoal(goalName, parseFloat(targetRevenue), parseFloat(targetQuantity))
      setGoalName('')
      setTargetRevenue('')
      setTargetQuantity('')
    }
  }
  
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value)
  }
  
  const checkGoalAchieved = (goal: typeof goals[0]) => {
    return metrics.revenue >= goal.targetRevenue
  }
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Goals</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3 border rounded-lg p-4 bg-muted/50">
          <div className="space-y-2">
            <Label htmlFor="goalName">Goal Name</Label>
            <Input
              id="goalName"
              placeholder="e.g., Q1 Revenue Target"
              value={goalName}
              onChange={(e) => setGoalName(e.target.value)}
            />
          </div>
          
          <div className="grid grid-cols-2 gap-2">
            <div className="space-y-2">
              <Label htmlFor="targetRevenue">Target Revenue</Label>
              <Input
                id="targetRevenue"
                type="number"
                placeholder="100000"
                value={targetRevenue}
                onChange={(e) => setTargetRevenue(e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="targetQuantity">Target Quantity</Label>
              <Input
                id="targetQuantity"
                type="number"
                placeholder="100"
                value={targetQuantity}
                onChange={(e) => setTargetQuantity(e.target.value)}
              />
            </div>
          </div>
          
          <Button onClick={handleAddGoal} className="w-full">
            Add Goal
          </Button>
        </div>
        
        {goals.length === 0 ? (
          <p className="text-muted-foreground text-center py-4">No goals set yet</p>
        ) : (
          <div className="space-y-3">
            {goals.map((goal) => {
              const isAchieved = checkGoalAchieved(goal)
              const calculatedRevenue = goal.targetRevenue * goal.targetQuantity
              
              return (
                <div
                  key={goal.id}
                  className={`border rounded-lg p-4 space-y-2 ${
                    isAchieved ? 'bg-green-50 dark:bg-green-950/20 border-green-500' : ''
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className="font-semibold flex items-center gap-2">
                        {goal.name}
                        {isAchieved && <CheckCircle2 className="h-4 w-4 text-green-600" />}
                      </h4>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        size="icon"
                        variant={goal.achieved ? 'default' : 'outline'}
                        onClick={() => updateGoal(goal.id, !goal.achieved)}
                        title="Toggle achievement"
                      >
                        <CheckCircle2 className="h-4 w-4" />
                      </Button>
                      <Button
                        size="icon"
                        variant="destructive"
                        onClick={() => deleteGoal(goal.id)}
                        title="Delete goal"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-sm">
                    <div>
                      <p className="text-muted-foreground">Target Revenue</p>
                      <p className="font-semibold">{formatCurrency(goal.targetRevenue)}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Target Quantity</p>
                      <p className="font-semibold">{goal.targetQuantity}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Total Goal</p>
                      <p className="font-semibold">{formatCurrency(calculatedRevenue)}</p>
                    </div>
                  </div>
                  <div className="pt-2">
                    <div className="flex items-center justify-between text-sm mb-1">
                      <span>Progress</span>
                      <span>{((metrics.revenue / calculatedRevenue) * 100).toFixed(1)}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 dark:bg-gray-700">
                      <div
                        className="bg-blue-600 h-2 rounded-full transition-all"
                        style={{ width: `${Math.min((metrics.revenue / calculatedRevenue) * 100, 100)}%` }}
                      />
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
