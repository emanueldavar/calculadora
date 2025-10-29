import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { Button } from './ui/button'
import { usePricingStore } from '@/store/pricingStore'

export const CalculatorForm: React.FC = () => {
  const { input, updateInput, addSnapshot } = usePricingStore()
  const [snapshotName, setSnapshotName] = React.useState('')
  
  const handleSaveSnapshot = () => {
    if (snapshotName.trim()) {
      addSnapshot(snapshotName)
      setSnapshotName('')
    }
  }
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Calculator Inputs</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label>Calculation Type</Label>
          <div className="flex gap-2">
            <Button
              variant={input.calculationType === 'saas' ? 'default' : 'outline'}
              onClick={() => updateInput('calculationType', 'saas')}
              className="flex-1"
            >
              SaaS
            </Button>
            <Button
              variant={input.calculationType === 'project' ? 'default' : 'outline'}
              onClick={() => updateInput('calculationType', 'project')}
              className="flex-1"
            >
              One-off Project
            </Button>
          </div>
        </div>
        
        {input.calculationType === 'saas' ? (
          <>
            <div className="space-y-2">
              <Label htmlFor="mrr">Monthly Recurring Revenue (per customer)</Label>
              <Input
                id="mrr"
                type="number"
                value={input.monthlyRecurringRevenue}
                onChange={(e) => updateInput('monthlyRecurringRevenue', parseFloat(e.target.value) || 0)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="customers">Number of Customers</Label>
              <Input
                id="customers"
                type="number"
                value={input.numberOfCustomers}
                onChange={(e) => updateInput('numberOfCustomers', parseFloat(e.target.value) || 0)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="contractLength">Average Contract Length (months)</Label>
              <Input
                id="contractLength"
                type="number"
                value={input.averageContractLength}
                onChange={(e) => updateInput('averageContractLength', parseFloat(e.target.value) || 0)}
              />
            </div>
          </>
        ) : (
          <>
            <div className="space-y-2">
              <Label htmlFor="projectRevenue">Project Revenue (per project)</Label>
              <Input
                id="projectRevenue"
                type="number"
                value={input.projectRevenue}
                onChange={(e) => updateInput('projectRevenue', parseFloat(e.target.value) || 0)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="projectQuantity">Number of Projects</Label>
              <Input
                id="projectQuantity"
                type="number"
                value={input.projectQuantity}
                onChange={(e) => updateInput('projectQuantity', parseFloat(e.target.value) || 0)}
              />
            </div>
          </>
        )}
        
        <div className="space-y-2">
          <Label htmlFor="fixedCosts">Fixed Costs</Label>
          <Input
            id="fixedCosts"
            type="number"
            value={input.fixedCosts}
            onChange={(e) => updateInput('fixedCosts', parseFloat(e.target.value) || 0)}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="variableCosts">Variable Costs</Label>
          <Input
            id="variableCosts"
            type="number"
            value={input.variableCosts}
            onChange={(e) => updateInput('variableCosts', parseFloat(e.target.value) || 0)}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="cac">Customer Acquisition Cost</Label>
          <Input
            id="cac"
            type="number"
            value={input.customerAcquisitionCost}
            onChange={(e) => updateInput('customerAcquisitionCost', parseFloat(e.target.value) || 0)}
          />
        </div>
        
        <div className="pt-4 border-t space-y-2">
          <Label htmlFor="snapshotName">Save Snapshot</Label>
          <div className="flex gap-2">
            <Input
              id="snapshotName"
              placeholder="Snapshot name..."
              value={snapshotName}
              onChange={(e) => setSnapshotName(e.target.value)}
            />
            <Button onClick={handleSaveSnapshot}>Save</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
