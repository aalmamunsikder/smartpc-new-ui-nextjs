import React, { useState, useEffect } from 'react';
import { 
  Bell, 
  Search, 
  ChevronDown,
  Settings,
  User,
  LogOut,
  HelpCircle,
  Wallet,
  LifeBuoy
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Link from 'next/link';
import { ThemeToggle } from '@/components/theme-toggle';
import { cn } from "@/lib/utils";

const DashboardHeader = () => {
  const [notifications] = useState([
    {
      id: 1,
      title: 'Storage space running low',
      message: 'Your cloud storage is nearly full. Consider upgrading your plan.',
      time: '10m ago',
      unread: true
    },
    {
      id: 2,
      title: 'Weekly report available',
      message: 'Your weekly usage report is now available.',
      time: '2h ago',
      unread: true
    },
    {
      id: 3,
      title: 'System maintenance',
      message: 'Scheduled maintenance in 48 hours. Your PC may be unavailable for 30 minutes.',
      time: '1d ago',
      unread: false
    }
  ]);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [balance, setBalance] = useState(100.00); // Example balance

  const unreadCount = notifications.filter(n => n.unread).length;

  useEffect(() => {
    const handleSidebarCollapse = (event: CustomEvent) => {
      setSidebarCollapsed(event.detail.collapsed);
    };

    window.addEventListener('sidebarCollapse', handleSidebarCollapse as EventListener);
    return () => {
      window.removeEventListener('sidebarCollapse', handleSidebarCollapse as EventListener);
    };
  }, []);
  
  // Get balance color based on amount
  const getBalanceColor = () => {
    if (balance >= 50) return 'bg-green-500/10 text-green-500 hover:bg-green-500/20';
    if (balance > 10) return 'bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20';
    return 'bg-red-500/10 text-red-500 hover:bg-red-500/20';
  };

  return (
    <header className="sticky top-0 z-40 h-16 border-b border-border flex items-center justify-between px-4 bg-card/50 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="md:hidden w-10"></div>
      
      {sidebarCollapsed && (
        <Link href="/" className="flex items-center">
          <span className="font-bold gradient-text text-lg">SmartPC</span>
        </Link>
      )}
      
      <div className="flex-1"></div>
      
      <div className="flex items-center gap-4">
        <Link href="/dashboard/billing">
          <Button
            variant="ghost"
            size="sm"
            className={cn(
              "flex items-center gap-2 rounded-lg px-3 py-1.5 text-sm transition-colors",
              getBalanceColor()
            )}
          >
            <Wallet className="h-4 w-4" />
            ${balance.toFixed(2)}
          </Button>
        </Link>
        <ThemeToggle />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-primary text-[10px] font-medium flex items-center justify-center text-primary-foreground">
                  {unreadCount}
                </span>
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80">
            <DropdownMenuLabel>Notifications</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {notifications.map(notification => (
              <DropdownMenuItem key={notification.id} className="flex flex-col items-start gap-1 p-4">
                <div className="flex items-center gap-2">
                  <span className="font-medium">{notification.title}</span>
                  {notification.unread && (
                    <span className="h-2 w-2 rounded-full bg-primary" />
                  )}
                </div>
                <span className="text-sm text-muted-foreground">{notification.message}</span>
                <span className="text-xs text-muted-foreground">{notification.time}</span>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex items-center gap-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src="/avatar-placeholder.jpg" alt="User" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <div className="hidden md:block text-left">
                <p className="text-sm">John Doe</p>
                <p className="text-xs text-muted-foreground">john@example.com</p>
              </div>
              <ChevronDown className="h-4 w-4 hidden md:block" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href="/dashboard/profile">
                <User className="mr-2 h-4 w-4" />
                Profile
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/dashboard/support">
                <LifeBuoy className="mr-2 h-4 w-4" />
                Support
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-red-600" asChild>
              <Link href="/auth">
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default DashboardHeader;
