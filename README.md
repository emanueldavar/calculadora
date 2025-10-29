# SaaS Pricing Lab

Real-time calculator for SaaS and one-off project pricing, showing comprehensive financial metrics and analytics.

![Calculator View](https://github.com/user-attachments/assets/ecdc0612-5a04-472e-acc6-49da9769218c)

## Features

### 📊 Real-time Calculations
- **Revenue Metrics**: Calculate total revenue based on MRR, customers, or project pricing
- **Cost Analysis**: Track fixed costs, variable costs, and customer acquisition costs
- **Profitability Metrics**: Gross profit, margin, markup, and ROI calculations
- **SaaS Metrics**: LTV (Lifetime Value), CAC (Customer Acquisition Cost), and break-even analysis
- **Reinvestment Planning**: Automatic 30% profit reinvestment calculation

### 💼 Dual Pricing Models
- **SaaS Pricing**: Monthly recurring revenue model with customer count and contract length
- **One-off Projects**: Project-based pricing with quantity calculations

### 📸 Snapshots
Save and compare different pricing scenarios over time. Load historical snapshots to review past calculations.

![Snapshots](https://github.com/user-attachments/assets/b47eefaf-51e5-4d83-8b19-8ee6060a0d28)

### 🎯 Goals Management
Set revenue and quantity targets with visual progress tracking. Monitor achievement of financial goals.

![Goals](https://github.com/user-attachments/assets/5b9d1d25-edee-42bd-afe3-bb76a3bad9db)

### 📈 Dashboard with Charts
Interactive visualizations using Recharts:
- Revenue vs Costs vs Profit comparison
- Cost breakdown pie chart
- Key metrics bar chart
- Historical trends line chart
- Margin trend analysis

![Dashboard](https://github.com/user-attachments/assets/0f9f0b4f-796d-4b7a-9af6-d623e41e1409)

## Tech Stack

- **Frontend Framework**: React 18 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS + shadcn/ui components
- **State Management**: Zustand
- **Charts**: Recharts
- **Backend**: Supabase (configured but optional)
- **Icons**: Lucide React

## Getting Started

### Prerequisites
- Node.js 18+ and npm

### Installation

1. Clone the repository:
```bash
git clone https://github.com/emanueldavar/calculadora.git
cd calculadora
```

2. Install dependencies:
```bash
npm install
```

3. (Optional) Configure Supabase:
```bash
cp .env.example .env
# Edit .env and add your Supabase credentials
```

4. Start the development server:
```bash
npm run dev
```

5. Open your browser and navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## Usage

### Calculator Tab
1. Select your pricing model (SaaS or One-off Project)
2. Input your revenue parameters
3. Enter your costs (fixed, variable, and CAC)
4. View real-time calculated metrics
5. Save snapshots for comparison

### Dashboard Tab
- View visual representations of your financial data
- Analyze revenue vs costs
- Review cost breakdown
- Track historical trends (requires saved snapshots)

### Snapshots Tab
- View all saved pricing scenarios
- Load previous snapshots to restore calculator state
- Delete outdated snapshots
- Compare different scenarios

### Goals Tab
- Create financial goals with revenue and quantity targets
- Track progress with visual progress bars
- Mark goals as achieved
- Calculate total goal amounts (revenue × quantity)

## Calculated Metrics

- **Revenue**: Total revenue based on pricing model
- **Total Costs**: Sum of fixed and variable costs
- **Gross Profit**: Revenue minus total costs
- **Margin**: (Gross Profit / Revenue) × 100%
- **Markup**: (Gross Profit / Total Costs) × 100%
- **ROI**: Return on Investment percentage
- **LTV**: Lifetime Value (for SaaS: MRR × Contract Length)
- **CAC**: Customer Acquisition Cost
- **Break-even**: Number of months/projects to break even
- **Reinvestment**: 30% of gross profit for reinvestment

## Project Structure

```
calculadora/
├── src/
│   ├── components/
│   │   ├── ui/              # shadcn/ui components
│   │   ├── CalculatorForm.tsx
│   │   ├── MetricsDisplay.tsx
│   │   ├── Dashboard.tsx
│   │   ├── SnapshotsList.tsx
│   │   └── GoalsManager.tsx
│   ├── store/
│   │   └── pricingStore.ts  # Zustand state management
│   ├── lib/
│   │   ├── utils.ts         # Utility functions
│   │   └── supabase.ts      # Supabase client
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── public/
├── package.json
└── vite.config.ts
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the MIT License.

## Author

Emanuel Davar

---

Built with React, TypeScript, Tailwind CSS, and shadcn/ui
