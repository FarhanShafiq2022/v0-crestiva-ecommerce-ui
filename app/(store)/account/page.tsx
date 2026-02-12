'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ChevronRight, User, Package, Heart, Settings, LogOut } from 'lucide-react'
import { cn } from '@/lib/utils'

type Tab = 'profile' | 'orders' | 'wishlist' | 'settings'

export default function AccountPage() {
  const [activeTab, setActiveTab] = useState<Tab>('profile')
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  if (!isLoggedIn) {
    return (
      <div className="pt-32 lg:pt-36 pb-20">
        <div className="mx-auto max-w-md px-4 lg:px-8">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs text-muted-foreground mb-8">
            <Link href="/" className="hover:text-foreground transition-colors">
              Home
            </Link>
            <ChevronRight size={12} />
            <span className="text-foreground">Account</span>
          </nav>

          <div className="text-center mb-10">
            <h1 className="font-serif text-3xl text-foreground mb-3">
              Welcome Back
            </h1>
            <p className="text-sm text-muted-foreground">
              Sign in to access your account, orders, and wishlist.
            </p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-xs text-muted-foreground mb-2">
                Email Address
              </label>
              <input
                type="email"
                className="w-full px-4 py-3 bg-background border border-border text-sm focus:outline-none focus:border-gold transition-colors text-foreground"
                placeholder="your@email.com"
              />
            </div>
            <div>
              <label className="block text-xs text-muted-foreground mb-2">
                Password
              </label>
              <input
                type="password"
                className="w-full px-4 py-3 bg-background border border-border text-sm focus:outline-none focus:border-gold transition-colors text-foreground"
                placeholder="Enter your password"
              />
            </div>
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 text-sm text-muted-foreground cursor-pointer">
                <input type="checkbox" className="rounded border-border" />
                Remember me
              </label>
              <button className="text-xs text-gold hover:underline">
                Forgot password?
              </button>
            </div>
            <button
              onClick={() => setIsLoggedIn(true)}
              className="w-full py-4 bg-foreground text-background text-xs tracking-[0.2em] uppercase font-medium hover:bg-foreground/90 transition-colors"
            >
              Sign In
            </button>
            <p className="text-center text-sm text-muted-foreground">
              Don{"'"}t have an account?{' '}
              <button
                onClick={() => setIsLoggedIn(true)}
                className="text-gold hover:underline"
              >
                Create one
              </button>
            </p>
          </div>
        </div>
      </div>
    )
  }

  const tabs: { key: Tab; label: string; icon: typeof User }[] = [
    { key: 'profile', label: 'Profile', icon: User },
    { key: 'orders', label: 'Orders', icon: Package },
    { key: 'wishlist', label: 'Wishlist', icon: Heart },
    { key: 'settings', label: 'Settings', icon: Settings },
  ]

  return (
    <div className="pt-32 lg:pt-36 pb-20">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-muted-foreground mb-8">
          <Link href="/" className="hover:text-foreground transition-colors">
            Home
          </Link>
          <ChevronRight size={12} />
          <span className="text-foreground">Account</span>
        </nav>

        <h1 className="font-serif text-3xl lg:text-4xl text-foreground mb-10">
          My Account
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Sidebar */}
          <aside className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-8 pb-6 border-b border-border">
              <div className="w-12 h-12 bg-gold/10 rounded-full flex items-center justify-center">
                <User size={20} className="text-gold" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">
                  Alexandra Smith
                </p>
                <p className="text-xs text-muted-foreground">
                  Member since 2024
                </p>
              </div>
            </div>
            <nav className="flex flex-row lg:flex-col gap-1 overflow-x-auto lg:overflow-visible">
              {tabs.map(({ key, label, icon: Icon }) => (
                <button
                  key={key}
                  onClick={() => setActiveTab(key)}
                  className={cn(
                    'flex items-center gap-3 px-4 py-3 text-sm rounded-sm transition-colors whitespace-nowrap',
                    activeTab === key
                      ? 'bg-gold/10 text-foreground font-medium'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                  )}
                >
                  <Icon size={16} />
                  {label}
                </button>
              ))}
              <button
                onClick={() => setIsLoggedIn(false)}
                className="flex items-center gap-3 px-4 py-3 text-sm text-muted-foreground hover:text-destructive rounded-sm transition-colors whitespace-nowrap mt-4 lg:mt-4"
              >
                <LogOut size={16} />
                Sign Out
              </button>
            </nav>
          </aside>

          {/* Content */}
          <div className="lg:col-span-3">
            {activeTab === 'profile' && (
              <div className="animate-fade-in">
                <h2 className="text-xs tracking-[0.2em] uppercase text-foreground font-medium mb-6">
                  Profile Information
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-2xl">
                  <div>
                    <label className="block text-xs text-muted-foreground mb-2">
                      First Name
                    </label>
                    <input
                      type="text"
                      defaultValue="Alexandra"
                      className="w-full px-4 py-3 bg-background border border-border text-sm focus:outline-none focus:border-gold transition-colors text-foreground"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-muted-foreground mb-2">
                      Last Name
                    </label>
                    <input
                      type="text"
                      defaultValue="Smith"
                      className="w-full px-4 py-3 bg-background border border-border text-sm focus:outline-none focus:border-gold transition-colors text-foreground"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-xs text-muted-foreground mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      defaultValue="alexandra@example.com"
                      className="w-full px-4 py-3 bg-background border border-border text-sm focus:outline-none focus:border-gold transition-colors text-foreground"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-xs text-muted-foreground mb-2">
                      Phone
                    </label>
                    <input
                      type="tel"
                      defaultValue="+1 (555) 234-5678"
                      className="w-full px-4 py-3 bg-background border border-border text-sm focus:outline-none focus:border-gold transition-colors text-foreground"
                    />
                  </div>
                </div>
                <button className="mt-6 px-8 py-3 bg-foreground text-background text-xs tracking-[0.2em] uppercase font-medium hover:bg-foreground/90 transition-colors">
                  Save Changes
                </button>
              </div>
            )}

            {activeTab === 'orders' && (
              <div className="animate-fade-in">
                <h2 className="text-xs tracking-[0.2em] uppercase text-foreground font-medium mb-6">
                  Order History
                </h2>
                <div className="border border-border rounded-sm overflow-hidden">
                  {[
                    {
                      id: 'CRV-A3F2K8',
                      date: 'Jan 28, 2026',
                      status: 'Delivered',
                      total: '$428.00',
                      items: 2,
                    },
                    {
                      id: 'CRV-B7J1M4',
                      date: 'Dec 15, 2025',
                      status: 'Delivered',
                      total: '$249.00',
                      items: 1,
                    },
                  ].map((order, i) => (
                    <div
                      key={order.id}
                      className={cn(
                        'flex flex-col sm:flex-row items-start sm:items-center justify-between p-5',
                        i > 0 && 'border-t border-border'
                      )}
                    >
                      <div>
                        <p className="text-sm font-medium text-foreground">
                          #{order.id}
                        </p>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          {order.date} &middot; {order.items}{' '}
                          {order.items === 1 ? 'item' : 'items'}
                        </p>
                      </div>
                      <div className="flex items-center gap-4 mt-2 sm:mt-0">
                        <span className="px-2.5 py-1 bg-gold/10 text-gold text-[10px] tracking-[0.1em] uppercase font-medium rounded-sm">
                          {order.status}
                        </span>
                        <span className="text-sm font-medium text-foreground">
                          {order.total}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'wishlist' && (
              <div className="animate-fade-in">
                <h2 className="text-xs tracking-[0.2em] uppercase text-foreground font-medium mb-6">
                  Saved Items
                </h2>
                <p className="text-sm text-muted-foreground">
                  Visit your{' '}
                  <Link href="/wishlist" className="text-gold hover:underline">
                    wishlist page
                  </Link>{' '}
                  to view and manage your saved items.
                </p>
              </div>
            )}

            {activeTab === 'settings' && (
              <div className="animate-fade-in">
                <h2 className="text-xs tracking-[0.2em] uppercase text-foreground font-medium mb-6">
                  Account Settings
                </h2>
                <div className="space-y-6 max-w-2xl">
                  <div className="flex items-center justify-between py-4 border-b border-border">
                    <div>
                      <p className="text-sm font-medium text-foreground">
                        Email Notifications
                      </p>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        Receive updates about new collections and offers
                      </p>
                    </div>
                    <button className="w-10 h-6 bg-gold rounded-full relative">
                      <span className="absolute right-0.5 top-0.5 w-5 h-5 bg-accent-foreground rounded-full transition-all" />
                    </button>
                  </div>
                  <div className="flex items-center justify-between py-4 border-b border-border">
                    <div>
                      <p className="text-sm font-medium text-foreground">
                        Order Updates
                      </p>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        SMS and email notifications for order status
                      </p>
                    </div>
                    <button className="w-10 h-6 bg-gold rounded-full relative">
                      <span className="absolute right-0.5 top-0.5 w-5 h-5 bg-accent-foreground rounded-full transition-all" />
                    </button>
                  </div>
                  <div className="pt-4">
                    <button className="text-xs text-destructive hover:underline">
                      Delete Account
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
