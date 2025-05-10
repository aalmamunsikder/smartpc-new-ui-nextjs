'use client';

import React, { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge'; // Updated import
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { 
  Search, 
  MessageSquare, 
  LifeBuoy,
  HelpCircle, 
  FileText, 
  ExternalLink,
  Clock,
  CheckCircle2,
  AlertCircle,
  User
} from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { useRouter } from 'next/navigation';

const SupportPage = () => {
  const { toast } = useToast();
  const [query, setQuery] = useState('');
  const router = useRouter();
  
  const tickets = [
    { 
      id: 'TK-001', 
      subject: 'Cloud PC not starting', 
      date: 'Apr 10, 2025', 
      status: 'Open',
      priority: 'High',
      lastUpdate: '2 hours ago',
      accountId: 'ACC-12345',
      email: 'john.doe@example.com'
    },
    { 
      id: 'TK-002', 
      subject: 'Storage upgrade issue', 
      date: 'Apr 6, 2025', 
      status: 'In Progress',
      priority: 'Medium',
      lastUpdate: '1 day ago',
      accountId: 'ACC-67890',
      email: 'jane.smith@example.com'
    },
    { 
      id: 'TK-003', 
      subject: 'Billing question', 
      date: 'Mar 28, 2025', 
      status: 'Closed',
      priority: 'Low',
      lastUpdate: '1 week ago',
      accountId: 'ACC-54321',
      email: 'robert.johnson@example.com'
    },
  ];

  const faqItems = [
    {
      question: 'How do I reset my Cloud PC?',
      answer: 'To reset your Cloud PC, navigate to Cloud PC in the dashboard, select the PC you want to reset, click the "..." menu, and choose "Reset PC". Note that this will erase all data on the PC that has not been backed up.'
    },
    {
      question: 'What happens if I exceed my storage limit?',
      answer: 'If you exceed your storage limit, you will not be able to upload new files until you either free up space or upgrade your plan. Your existing files will remain accessible.'
    },
    {
      question: 'How do I upgrade my subscription?',
      answer: 'To upgrade your subscription, go to the Billing page in your dashboard, click on "Change Plan" and select the plan you wish to upgrade to. The price difference will be prorated for the remainder of your billing cycle.'
    },
    {
      question: 'Can I access my Cloud PC from multiple devices?',
      answer: 'Yes, you can access your Cloud PC from any device with a web browser. Your session will be available across all your devices. For the best experience, we recommend using a modern browser like Chrome, Firefox, or Edge.'
    },
    {
      question: 'How secure is my data?',
      answer: 'Your data is protected with enterprise-grade encryption both during transit and at rest. We employ multi-factor authentication, regular security audits, and follow industry best practices to ensure the highest level of security for your data.'
    }
  ];

  const handleNewTicket = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Support ticket created",
      description: "We've received your request and will respond shortly.",
    });
  };

  const filterTickets = (ticket: typeof tickets[0]) => {
    if (!query) return true;
    
    return (
      ticket.subject.toLowerCase().includes(query.toLowerCase()) ||
      ticket.id.toLowerCase().includes(query.toLowerCase()) ||
      ticket.accountId.toLowerCase().includes(query.toLowerCase()) ||
      ticket.email.toLowerCase().includes(query.toLowerCase())
    );
  };

  const handleTicketClick = (ticketId: string) => {
    router.push(`/dashboard/support/ticket/${ticketId}`);
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Support Center</h1>
      
      <Tabs defaultValue="tickets" className="w-full">
        <TabsList className="grid w-full md:w-auto grid-cols-3">
          <TabsTrigger value="tickets">My Tickets</TabsTrigger>
          <TabsTrigger value="new-ticket">New Ticket</TabsTrigger>
          <TabsTrigger value="faq">FAQ</TabsTrigger>
        </TabsList>
        
        <TabsContent value="tickets" className="space-y-6 mt-6">
          <div className="flex justify-between items-center">
            <div className="relative max-w-sm">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search tickets..."
                className="pl-8 w-full"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>
            <Button>
              <MessageSquare className="mr-2 h-4 w-4" />
              New Ticket
            </Button>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Support Tickets</CardTitle>
              <CardDescription>Manage and track your support requests</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <div className="grid grid-cols-1 md:grid-cols-8 p-4 font-medium border-b bg-muted/50">
                  <div className="md:col-span-3">Subject</div>
                  <div className="hidden md:block md:col-span-2">Account / Email</div>
                  <div className="hidden md:block">Date</div>
                  <div className="hidden md:block">Status</div>
                  <div className="hidden md:block">Last Update</div>
                </div>
                <div className="divide-y">
                  {tickets.filter(filterTickets).length > 0 ? (
                    tickets.filter(filterTickets).map((ticket) => (
                      <div 
                        key={ticket.id} 
                        className="grid grid-cols-1 md:grid-cols-8 p-4 hover:bg-muted/50 transition-colors cursor-pointer"
                        onClick={() => handleTicketClick(ticket.id)}
                      >
                        <div className="md:col-span-3 flex flex-col md:flex-row md:items-center gap-2">
                          <div className="flex items-center gap-2">
                            <Badge 
                              variant={
                                ticket.status === 'Open' 
                                  ? 'default' 
                                  : ticket.status === 'In Progress' 
                                    ? 'outline' 
                                    : 'secondary'
                              }
                              className="w-2 h-2 p-0 rounded-full"
                            />
                            <span className="font-medium">{ticket.subject}</span>
                          </div>
                          <Badge variant="outline" className="md:ml-2 w-fit">{ticket.id}</Badge>
                        </div>
                        <div className="mt-2 md:mt-0 md:col-span-2 flex items-center gap-1 text-sm text-muted-foreground md:text-foreground">
                          <User className="h-3 w-3 text-muted-foreground" />
                          <div className="flex flex-col">
                            <span>{ticket.accountId}</span>
                            <span className="text-xs text-muted-foreground">{ticket.email}</span>
                          </div>
                        </div>
                        <div className="mt-2 md:mt-0 text-sm text-muted-foreground md:text-foreground">
                          {ticket.date}
                        </div>
                        <div className="mt-1 md:mt-0">
                          <Badge 
                            variant={
                              ticket.status === 'Open' 
                                ? 'default' 
                                : ticket.status === 'In Progress' 
                                  ? 'outline' 
                                  : 'secondary'
                            }
                            className="w-fit"
                          >
                            {ticket.status}
                          </Badge>
                        </div>
                        <div className="mt-1 md:mt-0 flex items-center text-sm text-muted-foreground">
                          <Clock className="mr-1 h-3 w-3" />
                          {ticket.lastUpdate}
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="p-8 text-center text-muted-foreground">
                      No tickets found matching your search.
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="new-ticket" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Create New Support Ticket</CardTitle>
              <CardDescription>
                Our support team will respond to your ticket as soon as possible
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleNewTicket} className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="subject" className="text-sm font-medium">
                    Subject
                  </label>
                  <Input id="subject" placeholder="Brief description of your issue" required />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="category" className="text-sm font-medium">
                      Category
                    </label>
                    <Select defaultValue="technical">
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="technical">Technical Issue</SelectItem>
                        <SelectItem value="billing">Billing Question</SelectItem>
                        <SelectItem value="account">Account Management</SelectItem>
                        <SelectItem value="feedback">Feedback</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="priority" className="text-sm font-medium">
                      Priority
                    </label>
                    <Select defaultValue="medium">
                      <SelectTrigger>
                        <SelectValue placeholder="Select priority" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Low</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="description" className="text-sm font-medium">
                    Description
                  </label>
                  <Textarea 
                    id="description" 
                    placeholder="Please provide as much detail as possible" 
                    className="min-h-[150px]"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">
                    Attachments (optional)
                  </label>
                  <div className="border border-dashed rounded-md p-6 text-center cursor-pointer hover:bg-muted/50 transition-colors">
                    <p className="text-muted-foreground text-sm">
                      Drop files here or click to upload
                    </p>
                    <input type="file" className="hidden" multiple />
                  </div>
                </div>
              </form>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">Cancel</Button>
              <Button onClick={handleNewTicket}>Submit Ticket</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="faq" className="space-y-6 mt-6">
          <div className="relative max-w-2xl mx-auto mb-8">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search for answers..."
              className="pl-8 w-full"
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <Card className="bg-primary/5 border-primary/10 hover:border-primary/30 transition-colors">
              <CardHeader className="flex flex-row items-start space-x-4 pb-2">
                <FileText className="h-6 w-6 text-primary" />
                <div>
                  <CardTitle>Documentation</CardTitle>
                  <CardDescription>
                    Browse our detailed documentation
                  </CardDescription>
                </div>
              </CardHeader>
              <CardContent>
                <Button variant="link" className="px-0">
                  View Documentation <ExternalLink className="ml-1 h-3 w-3" />
                </Button>
              </CardContent>
            </Card>
            
            <Card className="bg-primary/5 border-primary/10 hover:border-primary/30 transition-colors">
              <CardHeader className="flex flex-row items-start space-x-4 pb-2">
                <LifeBuoy className="h-6 w-6 text-primary" />
                <div>
                  <CardTitle>Live Chat</CardTitle>
                  <CardDescription>
                    Chat with our support team
                  </CardDescription>
                </div>
              </CardHeader>
              <CardContent>
                <Button variant="link" className="px-0">
                  Start Chat <ExternalLink className="ml-1 h-3 w-3" />
                </Button>
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Frequently Asked Questions</CardTitle>
              <CardDescription>Find quick answers to common questions</CardDescription>
            </CardHeader>
            <CardContent className="divide-y">
              {faqItems.map((item, index) => (
                <details key={index} className="group py-4 first:pt-0 last:pb-0">
                  <summary className="flex cursor-pointer items-center justify-between font-medium marker:content-none">
                    <div className="flex items-center gap-2">
                      <HelpCircle className="h-4 w-4 text-muted-foreground" />
                      {item.question}
                    </div>
                    <div>
                      <ChevronIcon className="h-4 w-4 transition-all group-open:rotate-180" />
                    </div>
                  </summary>
                  <div className="mt-4 pl-6 text-muted-foreground">
                    {item.answer}
                  </div>
                </details>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

const ChevronIcon = ({ className }: { className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="m6 9 6 6 6-6" />
  </svg>
);

export default SupportPage;
