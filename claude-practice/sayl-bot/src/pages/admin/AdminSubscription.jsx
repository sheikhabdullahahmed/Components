import Icon from '../../components/Icon'
import AdminLayout from '../../components/admin/AdminLayout'
import AdminTopBar from '../../components/admin/AdminTopBar'
import PlanCard from '../../components/admin/PlanCard'

const plans = [
  {
    name: 'Basic',
    price: '2,000PKR',
    subscribers: '2,845',
    features: ['3 Bots', '1,000 Messages/month', 'Email Support', 'Basic Analytics', 'Advanced Analytics', 'User Behavior Insights', 'Predictive Analytics'],
  },
  {
    name: 'Standard',
    price: '5,000PKR',
    subscribers: '5,845',
    features: ['5 Bots', '5,000 Messages/month', 'Priority Email Support', 'Advanced Analytics', 'Customer Feedback Tools', 'User Behavior Tracking', 'Monthly Reports'],
  },
  {
    name: 'Premium',
    price: '10,000PKR',
    subscribers: '10,845',
    features: ['Unlimited Bots', 'Unlimited Messages/month', '24/7 Chat Support', 'Comprehensive Analytics', 'Dedicated Account Manager', 'Real-time Data Integration', 'Quarterly Reviews'],
  },
]

const subscriptions = [
  { user: 'Jhondeo@example.com', plan: 'Pro', activated: 'Jan 20, 2024', renewal: 'Feb 20, 2024' },
  { user: 'KarenT@example.com', plan: 'Basic', activated: 'Apr 10, 2024', renewal: 'May 10, 2024' },
  { user: 'VictorZ@example.com', plan: 'Premium', activated: 'Jan 30, 2024', renewal: 'Feb 28, 2024' },
  { user: 'NicolasH@example.com', plan: 'Premium', activated: 'Jan 25, 2024', renewal: 'Feb 25, 2024' },
  { user: 'TessaJ@example.com', plan: 'Pro', activated: '', renewal: '' },
]

function AdminSubscription() {
  return (
    <AdminLayout active="subscription">
      <AdminTopBar title="Subscription" subtitle="Quickly Create and manage your existing bots" />

      <section className="flex flex-col gap-5 rounded-xl bg-white p-4">
        <div className="flex items-center justify-between">
          <span className="text-base leading-[14px] text-text">Plan</span>
          <button type="button" className="flex h-9 w-[136px] items-center justify-center gap-[10px] rounded-md bg-primary text-sm leading-[13px] text-white">
            <Icon name="card-add" size={16} />
            Create a Plan
          </button>
        </div>
        <div className="flex justify-between">
          {plans.map((plan) => (
            <PlanCard key={plan.name} {...plan} />
          ))}
        </div>
      </section>

      <section className="flex flex-col gap-5 rounded-[10px] bg-white p-4">
        <h2 className="text-base leading-[25px] font-medium text-text">Active Subscriptions</h2>
        <div className="grid grid-cols-[318px_318px_318px_1fr] items-center rounded-[5px] bg-table-head px-3 py-1 text-sm leading-[21px] text-text">
          <span>User</span>
          <span>Plane</span>
          <span>Actication Date</span>
          <span className="text-right">Renewal Date</span>
        </div>
        <div className="flex flex-col gap-2">
          {subscriptions.map((row, index) => (
            <div
              key={index}
              className={`grid h-[45px] grid-cols-[318px_318px_318px_1fr] items-center text-sm leading-[21px] text-muted ${
                index < subscriptions.length - 1 ? 'border-b-[0.5px] border-line' : ''
              }`}
            >
              <span>{row.user}</span>
              <span className="inline-flex h-[25px] w-[80px] items-center justify-center rounded-full bg-page text-sm text-primary">{row.plan}</span>
              <span>{row.activated}</span>
              <span className="text-right">{row.renewal}</span>
            </div>
          ))}
        </div>
      </section>
    </AdminLayout>
  )
}

export default AdminSubscription
