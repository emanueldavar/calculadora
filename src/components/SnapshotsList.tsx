import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { usePricingStore } from '@/store/pricingStore'
import { Trash2, RotateCcw } from 'lucide-react'

export const SnapshotsList: React.FC = () => {
  const { snapshots, deleteSnapshot, loadSnapshot } = usePricingStore()
  
  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleString()
  }
  
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value)
  }
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Snapshots</CardTitle>
      </CardHeader>
      <CardContent>
        {snapshots.length === 0 ? (
          <p className="text-muted-foreground text-center py-4">No snapshots saved yet</p>
        ) : (
          <div className="space-y-3">
            {snapshots.map((snapshot) => (
              <div
                key={snapshot.id}
                className="border rounded-lg p-4 space-y-2"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h4 className="font-semibold">{snapshot.name}</h4>
                    <p className="text-sm text-muted-foreground">{formatDate(snapshot.timestamp)}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      size="icon"
                      variant="outline"
                      onClick={() => loadSnapshot(snapshot.id)}
                      title="Load snapshot"
                    >
                      <RotateCcw className="h-4 w-4" />
                    </Button>
                    <Button
                      size="icon"
                      variant="destructive"
                      onClick={() => deleteSnapshot(snapshot.id)}
                      title="Delete snapshot"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-2 text-sm">
                  <div>
                    <p className="text-muted-foreground">Revenue</p>
                    <p className="font-semibold">{formatCurrency(snapshot.metrics.revenue)}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Profit</p>
                    <p className="font-semibold">{formatCurrency(snapshot.metrics.grossProfit)}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Margin</p>
                    <p className="font-semibold">{snapshot.metrics.margin.toFixed(2)}%</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
