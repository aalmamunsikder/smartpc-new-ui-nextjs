'use client';

import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/components/ui/use-toast';
import {
  ChevronLeft,
  Paperclip,
  Send,
  User,
  Clock,
  Mail,
  MessageSquare,
  FileText,
  Download,
  Tag,
  ArrowRightLeft,
  CheckCircle2,
} from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

type TicketStatus = 'Open' | 'In Progress' | 'Closed';
type TicketPriority = 'Low' | 'Medium' | 'High';

interface Message {
  id: string;
  senderId: string;
  senderName: string;
  senderType: 'customer' | 'support';
  message: string;
  attachments?: { name: string; size: string; type: string }[];
  timestamp: string;
}

const TicketDetailPage = () => {
  const params = useParams();
  const router = useRouter();
  const { toast } = useToast();
  const [reply, setReply] = useState('');
  const [ticketStatus, setTicketStatus] = useState<TicketStatus>('Open');
  const [ticketPriority, setTicketPriority] = useState<TicketPriority>('Medium');
  const [activeTab, setActiveTab] = useState('conversation');

  // In a real application, you would fetch this data from an API
  const ticketId = params.id as string;
  const ticket = {
    id: ticketId,
    subject: ticketId === 'TK-001' ? 'Cloud PC not starting' : 
             ticketId === 'TK-002' ? 'Storage upgrade issue' : 'Billing question',
    date: ticketId === 'TK-001' ? 'Apr 10, 2025' : 
          ticketId === 'TK-002' ? 'Apr 6, 2025' : 'Mar 28, 2025',
    status: ticketId === 'TK-001' ? 'Open' : 
            ticketId === 'TK-002' ? 'In Progress' : 'Closed' as TicketStatus,
    priority: ticketId === 'TK-001' ? 'High' : 
              ticketId === 'TK-002' ? 'Medium' : 'Low' as TicketPriority,
    accountId: ticketId === 'TK-001' ? 'ACC-12345' : 
               ticketId === 'TK-002' ? 'ACC-67890' : 'ACC-54321',
    email: ticketId === 'TK-001' ? 'john.doe@example.com' : 
           ticketId === 'TK-002' ? 'jane.smith@example.com' : 'robert.johnson@example.com',
    category: ticketId === 'TK-001' ? 'Technical Issue' : 
              ticketId === 'TK-002' ? 'Technical Issue' : 'Billing Question',
    lastUpdate: ticketId === 'TK-001' ? '2 hours ago' : 
                ticketId === 'TK-002' ? '1 day ago' : '1 week ago',
  };

  // Initialize state values with ticket data
  React.useEffect(() => {
    setTicketStatus(ticket.status);
    setTicketPriority(ticket.priority);
  }, [ticket.status, ticket.priority]);

  // Message history for this ticket
  const messageHistory: Message[] = [
    {
      id: '1',
      senderId: ticket.accountId,
      senderName: ticket.email.split('@')[0],
      senderType: 'customer',
      message: ticketId === 'TK-001' 
        ? "I'm having trouble starting my Cloud PC. When I try to launch it, I get an error message saying 'Connection failed'. I've tried refreshing the page and using a different browser but nothing works."
        : ticketId === 'TK-002'
        ? "I upgraded my storage plan yesterday, but the new storage space is not showing up in my account. I was expecting to have 500GB but it still shows 100GB available."
        : "I was charged twice for my subscription this month. Can you please check my billing history and issue a refund for the duplicate charge?",
      timestamp: '2 days ago',
    },
    {
      id: '2',
      senderId: 'STAFF-001',
      senderName: 'Support Team',
      senderType: 'support',
      message: ticketId === 'TK-001'
        ? "Hello, thank you for reporting this issue. I'd like to check a few things to help diagnose the problem. Could you please let me know what time you tried to access the Cloud PC, and if you received any specific error code with the message?"
        : ticketId === 'TK-002'
        ? "Hi there, thank you for reaching out about your storage upgrade. I can see that your payment has been processed successfully, but there might be a delay in updating your storage allocation. I'll check our system and get this resolved for you."
        : "Hello, I apologize for the inconvenience. I can confirm that there was a duplicate charge on your account. I've initiated a refund for the second charge, which should be processed within 3-5 business days. Please let me know if you have any other questions.",
      timestamp: '1 day ago',
      attachments: ticketId === 'TK-001' ? [
        { name: 'troubleshooting-guide.pdf', size: '1.2 MB', type: 'application/pdf' }
      ] : undefined,
    },
  ];

  if (ticketId === 'TK-001' || ticketId === 'TK-002') {
    messageHistory.push({
      id: '3',
      senderId: ticket.accountId,
      senderName: ticket.email.split('@')[0],
      senderType: 'customer',
      message: ticketId === 'TK-001'
        ? "I tried to access it around 3 PM EST yesterday. The error code was ERR_CONNECTION_REFUSED. I also noticed that the status indicator for my PC showed 'Offline' even though I hadn't shut it down."
        : "Thanks for checking. I've been waiting for about 24 hours now. My payment confirmation shows the upgrade to 500GB Premium Storage Plan. Let me know if you need any additional information from my end.",
      timestamp: '12 hours ago',
    });
  }

  const handleReplySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!reply.trim()) return;
    
    // In a real application, you would send this to an API
    toast({
      title: "Reply sent",
      description: "Your response has been sent to the customer.",
    });
    
    // Simulate adding the new message to the conversation
    const newMessage: Message = {
      id: `message-${Date.now()}`,
      senderId: 'STAFF-001',
      senderName: 'Support Team',
      senderType: 'support',
      message: reply,
      timestamp: 'Just now',
    };
    
    // In a real application, you would update the state with the new message
    // For this example, we'll just clear the reply input
    setReply('');
  };

  const handleStatusChange = (value: string) => {
    setTicketStatus(value as TicketStatus);
    
    toast({
      title: "Status updated",
      description: `Ticket status changed to ${value}.`,
    });
  };

  const handlePriorityChange = (value: string) => {
    setTicketPriority(value as TicketPriority);
    
    toast({
      title: "Priority updated",
      description: `Ticket priority changed to ${value}.`,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => router.push('/dashboard/support')}
          className="gap-1"
        >
          <ChevronLeft className="h-4 w-4" />
          Back to Support
        </Button>
      </div>
      
      <div className="flex flex-col md:flex-row gap-6">
        {/* Main content */}
        <div className="flex-1 space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Badge
                      variant={
                        ticketStatus === 'Open'
                          ? 'default'
                          : ticketStatus === 'In Progress'
                            ? 'outline'
                            : 'secondary'
                      }
                    >
                      {ticketStatus}
                    </Badge>
                    <Badge
                      variant={
                        ticketPriority === 'High'
                          ? 'destructive'
                          : ticketPriority === 'Medium'
                            ? 'default'
                            : 'outline'
                      }
                    >
                      {ticketPriority} Priority
                    </Badge>
                    <Badge variant="outline">{ticket.category}</Badge>
                  </div>
                  <CardTitle className="text-xl">{ticket.subject}</CardTitle>
                  <CardDescription className="flex items-center gap-2 mt-1">
                    <span className="flex items-center gap-1">
                      <MessageSquare className="h-3 w-3" /> 
                      Ticket {ticket.id}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" /> 
                      Opened {ticket.date}
                    </span>
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
          </Card>
          
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full md:w-auto grid-cols-2">
              <TabsTrigger value="conversation">Conversation</TabsTrigger>
              <TabsTrigger value="details">Ticket Details</TabsTrigger>
            </TabsList>
            
            <TabsContent value="conversation" className="space-y-6 mt-6">
              <div className="space-y-6">
                {messageHistory.map((message) => (
                  <Card key={message.id} className={message.senderType === 'support' ? 'border-primary/20' : ''}>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <div className="flex items-center gap-2">
                          <Avatar className="h-8 w-8">
                            <AvatarFallback className={message.senderType === 'support' ? 'bg-primary text-primary-foreground' : ''}>
                              {message.senderType === 'support' ? 'ST' : message.senderName.substring(0, 2).toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium flex items-center gap-1">
                              {message.senderName}
                              {message.senderType === 'support' && (
                                <Badge variant="outline" className="text-xs">Staff</Badge>
                              )}
                            </div>
                            <div className="text-xs text-muted-foreground">{message.timestamp}</div>
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <p className="text-sm whitespace-pre-line">{message.message}</p>
                        
                        {message.attachments && message.attachments.length > 0 && (
                          <div className="pt-2">
                            <div className="text-sm font-medium mb-2">Attachments:</div>
                            <div className="space-y-2">
                              {message.attachments.map((attachment, index) => (
                                <div key={index} className="flex items-center gap-2 p-2 rounded-md border">
                                  <FileText className="h-4 w-4 text-muted-foreground" />
                                  <div className="flex-1 min-w-0">
                                    <div className="text-sm font-medium truncate">{attachment.name}</div>
                                    <div className="text-xs text-muted-foreground">{attachment.size}</div>
                                  </div>
                                  <Button variant="ghost" size="sm">
                                    <Download className="h-4 w-4" />
                                  </Button>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              
              {ticketStatus !== 'Closed' && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Reply to Customer</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleReplySubmit} className="space-y-4">
                      <Textarea
                        placeholder="Type your reply here..."
                        className="min-h-[150px]"
                        value={reply}
                        onChange={(e) => setReply(e.target.value)}
                      />
                      
                      <div className="flex items-center gap-2">
                        <Button variant="outline" type="button" className="gap-1">
                          <Paperclip className="h-4 w-4" />
                          Attach Files
                        </Button>
                        <div className="flex-1" />
                        <Button variant="outline" type="button">Save as Draft</Button>
                        <Button type="submit" disabled={!reply.trim()} className="gap-1">
                          <Send className="h-4 w-4" />
                          Send Reply
                        </Button>
                      </div>
                    </form>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
            
            <TabsContent value="details" className="space-y-6 mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Ticket Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <div className="text-sm font-medium text-muted-foreground mb-1">Customer</div>
                        <div className="flex items-center gap-2">
                          <Avatar className="h-6 w-6">
                            <AvatarFallback>
                              {ticket.email.substring(0, 2).toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">{ticket.email.split('@')[0]}</div>
                            <div className="text-sm text-muted-foreground">{ticket.email}</div>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <div className="text-sm font-medium text-muted-foreground mb-1">Account ID</div>
                        <div className="flex items-center gap-2">
                          <User className="h-4 w-4 text-muted-foreground" />
                          <span>{ticket.accountId}</span>
                        </div>
                      </div>
                      
                      <div>
                        <div className="text-sm font-medium text-muted-foreground mb-1">Category</div>
                        <div className="flex items-center gap-2">
                          <Tag className="h-4 w-4 text-muted-foreground" />
                          <span>{ticket.category}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div>
                        <div className="text-sm font-medium text-muted-foreground mb-1">Created</div>
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span>{ticket.date}</span>
                        </div>
                      </div>
                      
                      <div>
                        <div className="text-sm font-medium text-muted-foreground mb-1">Last Updated</div>
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span>{ticket.lastUpdate}</span>
                        </div>
                      </div>
                      
                      <div>
                        <div className="text-sm font-medium text-muted-foreground mb-1">Response Time</div>
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span>4 hours</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Customer Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <div className="text-sm font-medium text-muted-foreground mb-1">Email</div>
                        <div className="flex items-center gap-2">
                          <Mail className="h-4 w-4 text-muted-foreground" />
                          <span>{ticket.email}</span>
                        </div>
                      </div>
                      
                      <div>
                        <div className="text-sm font-medium text-muted-foreground mb-1">Account ID</div>
                        <div className="flex items-center gap-2">
                          <User className="h-4 w-4 text-muted-foreground" />
                          <span>{ticket.accountId}</span>
                        </div>
                      </div>
                    </div>
                    
                    <Button variant="outline" className="gap-1 w-full md:w-auto">
                      <User className="h-4 w-4" />
                      View Customer Profile
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
        
        {/* Sidebar */}
        <div className="w-full md:w-80 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Ticket Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="text-sm font-medium">Status</div>
                <Select value={ticketStatus} onValueChange={handleStatusChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Open">Open</SelectItem>
                    <SelectItem value="In Progress">In Progress</SelectItem>
                    <SelectItem value="Closed">Closed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <div className="text-sm font-medium">Priority</div>
                <Select value={ticketPriority} onValueChange={handlePriorityChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Low">Low</SelectItem>
                    <SelectItem value="Medium">Medium</SelectItem>
                    <SelectItem value="High">High</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <div className="text-sm font-medium">Assign To</div>
                <Select defaultValue="me">
                  <SelectTrigger>
                    <SelectValue placeholder="Select agent" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="me">Me</SelectItem>
                    <SelectItem value="team-lead">Team Lead</SelectItem>
                    <SelectItem value="billing">Billing Specialist</SelectItem>
                    <SelectItem value="tech">Technical Support</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-2">
              <Button variant="outline" className="w-full gap-1">
                <ArrowRightLeft className="h-4 w-4" />
                Transfer Ticket
              </Button>
              <Button variant="outline" className="w-full gap-1">
                <CheckCircle2 className="h-4 w-4" />
                Mark as Resolved
              </Button>
            </CardFooter>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Canned Responses</CardTitle>
              <CardDescription>Quick reply templates</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button 
                variant="outline" 
                className="w-full justify-start text-left"
                onClick={() => setReply("Thank you for contacting us. We're looking into your issue and will get back to you shortly.")}
              >
                Initial Response
              </Button>
              <Button 
                variant="outline" 
                className="w-full justify-start text-left"
                onClick={() => setReply("I'm checking with our technical team and will provide an update soon. Thank you for your patience.")}
              >
                Transfer to Tech Team
              </Button>
              <Button 
                variant="outline" 
                className="w-full justify-start text-left"
                onClick={() => setReply("Your issue has been resolved. Please let us know if you need any further assistance.")}
              >
                Closing Response
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default TicketDetailPage; 