import { useState } from 'react'
import { CalculatorForm } from './components/CalculatorForm'
import { MetricsDisplay } from './components/MetricsDisplay'
import { SnapshotsList } from './components/SnapshotsList'
import { GoalsManager } from './components/GoalsManager'
import { Dashboard } from './components/Dashboard'
import { Tabs, TabsList, TabsTrigger, TabsContent } from './components/ui/tabs'
import { Calculator, BarChart3, Target, Camera } from 'lucide-react'

function App() {
  const [activeTab, setActiveTab] = useState('calculator')

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-4xl font-bold text-primary">SaaS Pricing Lab</h1>
          <p className="text-muted-foreground mt-2">
            Real-time calculator for SaaS and one-off project pricing
          </p>
        </div>
      </header>
      
      <main className="container mx-auto px-4 py-8">
        <Tabs className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-6">
            <TabsTrigger
              active={activeTab === 'calculator'}
              onClick={() => setActiveTab('calculator')}
            >
              <Calculator className="h-4 w-4 mr-2" />
              Calculator
            </TabsTrigger>
            <TabsTrigger
              active={activeTab === 'dashboard'}
              onClick={() => setActiveTab('dashboard')}
            >
              <BarChart3 className="h-4 w-4 mr-2" />
              Dashboard
            </TabsTrigger>
            <TabsTrigger
              active={activeTab === 'snapshots'}
              onClick={() => setActiveTab('snapshots')}
            >
              <Camera className="h-4 w-4 mr-2" />
              Snapshots
            </TabsTrigger>
            <TabsTrigger
              active={activeTab === 'goals'}
              onClick={() => setActiveTab('goals')}
            >
              <Target className="h-4 w-4 mr-2" />
              Goals
            </TabsTrigger>
          </TabsList>
          
          {activeTab === 'calculator' && (
            <TabsContent>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-1">
                  <CalculatorForm />
                </div>
                <div className="lg:col-span-2">
                  <MetricsDisplay />
                </div>
              </div>
            </TabsContent>
          )}
          
          {activeTab === 'dashboard' && (
            <TabsContent>
              <Dashboard />
            </TabsContent>
          )}
          
          {activeTab === 'snapshots' && (
            <TabsContent>
              <SnapshotsList />
            </TabsContent>
          )}
          
          {activeTab === 'goals' && (
            <TabsContent>
              <GoalsManager />
            </TabsContent>
          )}
        </Tabs>
      </main>
      
      <footer className="border-t mt-12">
        <div className="container mx-auto px-4 py-6 text-center text-muted-foreground">
          <p>© 2024 SaaS Pricing Lab - Built with React, TypeScript, Tailwind, and shadcn/ui</p>
        </div>
      </footer>
    </div>
  )
}

export default App
