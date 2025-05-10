'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Play, 
  Power, 
  Cpu, 
  MemoryStick, 
  HardDrive, 
  MonitorPlay, 
  Plus,
  Settings, 
  MoreHorizontal,
  ExternalLink,
  Calendar,
  Timer,
  Trash2,
  Edit,
  Copy,
  Activity,
  Shield,
  Clock,
  BarChart,
  CalendarClock,
  Moon,
  LayoutGrid,
  List,
  MoreVertical,
  StopCircle,
  AlertCircle,
  ChevronUp,
  ChevronDown,
  Search,
  Circle,
  PlayCircle,
  PauseCircle,
  Loader2,
  PowerOff,
  Users,
  X,
  Monitor,
  GraduationCap
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// PC Templates data
const pcTemplates = [
  {
    id: 'basic',
    name: 'Basic PC',
    cpu: '2 Core',
    ram: '4GB',
    storage: '128GB SSD',
    gpu: 'Integrated',
    os: 'Windows 11',
    description: 'Perfect for basic productivity tasks',
    pricePerHour: 0.50
  },
  {
    id: 'standard',
    name: 'Standard PC',
    cpu: '4 Core',
    ram: '8GB',
    storage: '256GB SSD',
    gpu: 'NVIDIA RTX 2060',
    os: 'Windows 11 Pro',
    description: 'Great for multitasking and light gaming',
    pricePerHour: 1.00
  },
  {
    id: 'performance',
    name: 'Performance PC',
    cpu: '8 Core',
    ram: '16GB',
    storage: '512GB SSD',
    gpu: 'NVIDIA RTX 3060',
    os: 'Windows 11 Pro',
    description: 'Ideal for demanding applications',
    pricePerHour: 2.00
  },
  {
    id: 'ultimate',
    name: 'Ultimate PC',
    cpu: '12 Core',
    ram: '32GB',
    storage: '1TB SSD',
    gpu: 'NVIDIA RTX 3080',
    os: 'Windows 11 Pro',
    description: 'For high-end workloads',
    pricePerHour: 4.00
  }
];

interface AssignedUser {
  id: number;
  name: string;
  email: string;
  avatarUrl?: string;
}

interface CloudPC {
  id: string;
  name: string;
  template: string;
  status: 'building' | 'running' | 'starting' | 'stopping' | 'stopped' | 'idle' | 'not_running';
  uptime: number;
  cpuUsage: number;
  memoryUsage: number;
  region: string;
  cost: number;
  createdAt: Date;
  idleTimeout: number; // minutes until PC goes to sleep
  schedule?: {
    timeZone: string;
    frequency: string;
    start: string | null;
    end: string | null;
    days: string[];
    customDateRange?: {
      startDate: string;
      endDate: string;
    };
  };
  description: string;
  idleTime: string;
  specs: {
    cpu: string;
    ram: string;
    storage: string;
    gpu: string;
    os: string;
  };
  assignedUsers: AssignedUser[];
}

// Update the PC Templates data
const cpuOptions = [
  { value: '2', label: '2 Core', pricePerHour: 0.25 },
  { value: '4', label: '4 Core', pricePerHour: 0.50 },
  { value: '8', label: '8 Core', pricePerHour: 1.00 },
  { value: '12', label: '12 Core', pricePerHour: 1.50 }
];

const osOptions = [
  { value: 'windows11', label: 'Windows 11' },
  { value: 'windows11pro', label: 'Windows 11 Pro' },
  { value: 'windows10', label: 'Windows 10' },
  { value: 'windows10pro', label: 'Windows 10 Pro' }
];

const storageOptions = [
  { value: '120', label: '120 GB', pricePerHour: 0.05 },
  { value: '256', label: '256 GB', pricePerHour: 0.10 },
  { value: '512', label: '512 GB', pricePerHour: 0.20 },
  { value: '1024', label: '1 TB', pricePerHour: 0.40 }
];

const locationOptions = [
  { value: 'us-east', label: 'US East (New York)' },
  { value: 'us-west', label: 'US West (San Francisco)' },
  { value: 'eu-central', label: 'EU Central (Frankfurt)' },
  { value: 'ap-southeast', label: 'Asia Pacific (Singapore)' }
];

const mockUsers: AssignedUser[] = [
  { id: 1, name: 'John Doe', email: 'john.doe@example.com' },
  { id: 2, name: 'Jane Smith', email: 'jane.smith@example.com' },
  { id: 3, name: 'Alice Johnson', email: 'alice@example.com' },
];

const CloudPCPage = () => {
  const [cloudPCs, setCloudPCs] = useState<CloudPC[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredPCs, setFilteredPCs] = useState<CloudPC[]>([]);
  const [showNewPCDialog, setShowNewPCDialog] = useState(false);
  const [newPCName, setNewPCName] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState('standard');
  const [selectedRegion, setSelectedRegion] = useState('us-east');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const { toast } = useToast();
  const [selectedOS, setSelectedOS] = useState(osOptions[0].value);
  const [selectedCPU, setSelectedCPU] = useState(cpuOptions[0].value);
  const [selectedStorage, setSelectedStorage] = useState('120');
  const [estimatedCost, setEstimatedCost] = useState(0);
  const [selectedPCs, setSelectedPCs] = useState<string[]>([]);
  const [showDetails, setShowDetails] = useState(true);
  const [showScheduleDialog, setShowScheduleDialog] = useState(false);
  const [showIdleDialog, setShowIdleDialog] = useState(false);
  const [editingPC, setEditingPC] = useState<CloudPC | null>(null);
  const [showAssignUserDialog, setShowAssignUserDialog] = useState(false);
  const [selectedPCForUsers, setSelectedPCForUsers] = useState<CloudPC | null>(null);
  const [selectedIdleTimeout, setSelectedIdleTimeout] = useState<string>("30");
  const [selectedTimeZone, setSelectedTimeZone] = useState("UTC");
  const [scheduleFrequency, setScheduleFrequency] = useState("everyday");
  const [autoStartTime, setAutoStartTime] = useState("");
  const [autoStopTime, setAutoStopTime] = useState("");
  const [customStartDate, setCustomStartDate] = useState("");
  const [customEndDate, setCustomEndDate] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [dateRange, setDateRange] = useState('7d');

  // Simulate fetching cloud PCs with new fields
  useEffect(() => {
    const mockPCs: CloudPC[] = [
      {
        id: '1',
        name: 'DevelopmentPC',
        template: 'performance',
        status: 'running',
        uptime: 86400,
        cpuUsage: 45,
        memoryUsage: 60,
        region: 'us-east',
        cost: 2.50,
        createdAt: new Date(),
        idleTimeout: 0,
        description: 'Development environment',
        idleTime: 'None',
        specs: {
          cpu: '8 Core',
          ram: '16GB',
          storage: '512GB SSD',
          gpu: 'NVIDIA RTX 3060',
          os: 'Windows 11 Pro'
        },
        assignedUsers: [mockUsers[0], mockUsers[1]]
      },
      {
        id: '2',
        name: 'GamingPC',
        template: 'ultimate',
        status: 'building',
        uptime: 0,
        cpuUsage: 0,
        memoryUsage: 0,
        region: 'us-west',
        cost: 96.00,
        createdAt: new Date('2024-02-01'),
        idleTimeout: 0,
        description: 'For high-end workloads',
        idleTime: 'None',
        specs: {
          cpu: '12 Core Intel Xeon',
          ram: '32GB DDR4',
          storage: '1TB NVMe SSD',
          gpu: 'NVIDIA RTX 3080',
          os: 'Windows 11 Pro'
        },
        assignedUsers: []
      }
    ];
    setCloudPCs(mockPCs);
    setFilteredPCs(mockPCs);
  }, []);

  // Add search filter effect
  useEffect(() => {
    const filtered = cloudPCs.filter(pc => 
      pc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pc.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pc.region.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredPCs(filtered);
  }, [searchQuery, cloudPCs]);

  // Add cost calculation function
  const calculateHourlyCost = () => {
    const cpuCost = cpuOptions.find(cpu => cpu.value === selectedCPU)?.pricePerHour || 0;
    const storageCost = storageOptions.find(storage => storage.value === selectedStorage)?.pricePerHour || 0;
    return cpuCost + storageCost;
  };

  // Update cost when configuration changes
  useEffect(() => {
    setEstimatedCost(calculateHourlyCost());
  }, [selectedCPU, selectedStorage]);

  const handleCreatePC = () => {
    const template = pcTemplates.find(t => t.id === selectedTemplate);
    const newPC: CloudPC = {
      id: Math.random().toString(36).substr(2, 9),
      name: newPCName,
      template: selectedTemplate,
      status: 'building',
      uptime: 0,
      cpuUsage: 0,
      memoryUsage: 0,
      region: selectedRegion,
      cost: estimatedCost * 24 * 30, // Monthly cost estimate
      createdAt: new Date(),
      idleTimeout: 30, // Default idle timeout
      description: template?.description || '',
      idleTime: '30m',
      specs: {
        cpu: selectedCPU,
        ram: selectedStorage,
        storage: selectedStorage,
        gpu: selectedTemplate,
        os: selectedOS,
      },
      assignedUsers: []
    };

    setCloudPCs([...cloudPCs, newPC]);
    setShowNewPCDialog(false);
    setNewPCName('');
    
      toast({
      title: "Cloud PC Created",
      description: `${newPCName} is being built.`
    });

    // Simulate PC building process
    setTimeout(() => {
      const updatedPCs = cloudPCs.map(p => {
        if (p.id === newPC.id) {
          return { ...p, status: 'stopped' as const };
        }
        return p;
      });
      setCloudPCs(updatedPCs);
      
      toast({
        title: "Cloud PC Ready",
        description: `${newPCName} has been built successfully.`
      });
    }, 5000);
  };

  const handleStartPC = (pc: CloudPC) => {
    const updatedPCs = cloudPCs.map(p => {
      if (p.id === pc.id) {
        return { ...p, status: 'starting' as const };
      }
      return p;
    });
    setCloudPCs(updatedPCs);

    // Simulate PC starting
      setTimeout(() => {
      const startedPCs = cloudPCs.map(p => {
        if (p.id === pc.id) {
          return { ...p, status: 'running' as const };
        }
        return p;
      });
      setCloudPCs(startedPCs);
      
        toast({
        title: "Cloud PC Started",
        description: `${pc.name} is now running.`
        });
      }, 3000);
  };

  const handleStopPC = (pc: CloudPC) => {
    const updatedPCs = cloudPCs.map(p => {
      if (p.id === pc.id) {
        return { ...p, status: 'stopping' as const };
      }
      return p;
    });
    setCloudPCs(updatedPCs);

    // Simulate PC stopping
    setTimeout(() => {
      const stoppedPCs = cloudPCs.map(p => {
        if (p.id === pc.id) {
          return { ...p, status: 'stopped' as const };
        }
        return p;
      });
      setCloudPCs(stoppedPCs);
      
    toast({
        title: "Cloud PC Stopped",
        description: `${pc.name} has been stopped.`
    });
    }, 2000);
  };

  const handleDeletePC = (pc: CloudPC) => {
    setCloudPCs(cloudPCs.filter(p => p.id !== pc.id));
      toast({
      title: "Cloud PC Deleted",
      description: `${pc.name} has been deleted.`,
        variant: "destructive"
      });
  };

  const formatUptime = (seconds: number): string => {
    if (seconds === 0) return 'Not running';
    const days = Math.floor(seconds / 86400);
    const hours = Math.floor((seconds % 86400) / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    
    if (days > 0) return `${days}d ${hours}h`;
    if (hours > 0) return `${hours}h ${minutes}m`;
    return `${minutes}m`;
  };

  const getStatusColor = (status: CloudPC['status']): string => {
    switch (status) {
      case 'building': return 'bg-purple-500';
      case 'running': return 'bg-green-500';
      case 'stopped': return 'bg-red-500';
      case 'starting': return 'bg-yellow-500';
      case 'stopping': return 'bg-orange-500';
      case 'idle': return 'bg-blue-500';
      case 'not_running': return 'bg-gray-500';
      default: return 'bg-gray-500';
    }
  };

  const handlePCSelection = (pcId: string) => {
    setSelectedPCs(prev => {
      if (prev.includes(pcId)) {
        return prev.filter(id => id !== pcId);
      }
      return [...prev, pcId];
    });
  };
  
  const handleSelectAll = () => {
    if (selectedPCs.length === filteredPCs.length) {
      setSelectedPCs([]);
    } else {
      setSelectedPCs(filteredPCs.map(pc => pc.id));
    }
  };

  const handleScheduleSettings = (pc: CloudPC) => {
    setEditingPC(pc);
    setSelectedTimeZone(pc.schedule?.timeZone || "UTC");
    setScheduleFrequency(pc.schedule?.frequency || "everyday");
    setAutoStartTime(pc.schedule?.start || "");
    setAutoStopTime(pc.schedule?.end || "");
    setCustomStartDate("");
    setCustomEndDate("");
    setShowScheduleDialog(true);
  };

  const handleIdleSettings = (pc: CloudPC) => {
    setEditingPC(pc);
    setSelectedIdleTimeout(String(pc.idleTimeout || "30"));
    setShowIdleDialog(true);
  };
  
  const getStatusIcon = (status: CloudPC['status']) => {
    switch (status) {
      case 'building': return <Loader2 className="h-4 w-4 animate-spin" />;
      case 'running': return <PlayCircle className="h-4 w-4" />;
      case 'stopped': return <PowerOff className="h-4 w-4" />;
      case 'starting': return <Loader2 className="h-4 w-4 animate-spin" />;
      case 'stopping': return <Loader2 className="h-4 w-4 animate-spin" />;
      case 'idle': return <PauseCircle className="h-4 w-4" />;
      case 'not_running': return <StopCircle className="h-4 w-4" />;
      default: return <Circle className="h-4 w-4" />;
    }
  };

  const getStatusText = (status: CloudPC['status']): string => {
    switch (status) {
      case 'building': return 'Building';
      case 'running': return 'Running';
      case 'stopped': return 'Stopped';
      case 'starting': return 'Starting';
      case 'stopping': return 'Stopping';
      case 'idle': return 'Idle';
      case 'not_running': return 'Not Running';
      default: return status;
    }
  };

  const handleAssignUser = (pc: CloudPC) => {
    setSelectedPCForUsers(pc);
    setShowAssignUserDialog(true);
  };
  
  const handleSaveIdleSettings = () => {
    if (!editingPC) return;
    
    const timeout = selectedIdleTimeout === 'none' ? 0 : parseInt(selectedIdleTimeout);
    const updatedPCs = cloudPCs.map(pc => {
      if (pc.id === editingPC.id) {
        return {
          ...pc,
          idleTimeout: timeout,
          idleTime: timeout === 0 ? 'Never' : timeout >= 60 ? `${timeout / 60}h` : `${timeout}m`
        };
      }
      return pc;
    });
    
    setCloudPCs(updatedPCs);
    setShowIdleDialog(false);
    
    toast({
      title: "Idle Settings Updated",
      description: `Idle timeout for ${editingPC.name} has been ${timeout === 0 ? 'disabled' : `set to ${selectedIdleTimeout} minutes`}.`
    });
  };

  const handleSaveSchedule = () => {
    if (!editingPC) return;

    const updatedPCs = cloudPCs.map(pc => {
      if (pc.id === editingPC.id) {
        return {
          ...pc,
          schedule: {
            timeZone: selectedTimeZone,
            frequency: scheduleFrequency,
            start: autoStartTime || null,
            end: autoStopTime || null,
            days: scheduleFrequency === 'custom' 
              ? [] // For custom, we don't use days
              : getDaysFromFrequency(scheduleFrequency),
            customDateRange: scheduleFrequency === 'custom' 
              ? {
                  startDate: customStartDate,
                  endDate: customEndDate
                }
              : undefined
          }
        };
      }
      return pc;
    });

    setCloudPCs(updatedPCs);
    setShowScheduleDialog(false);

    toast({
      title: "Schedule Updated",
      description: scheduleFrequency === 'custom'
        ? `Schedule for ${editingPC.name} has been set for ${customStartDate} to ${customEndDate}`
        : `Schedule for ${editingPC.name} has been updated successfully.`
    });
  };

  const getDaysFromFrequency = (frequency: string): string[] => {
    switch (frequency) {
      case 'everyday':
        return ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
      case 'weekdays':
        return ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'];
      case 'weekends':
        return ['saturday', 'sunday'];
      default:
        return [];
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleFileDownload = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    // ... rest of the download logic
  };

  const handleDateRangeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setDateRange(event.target.value);
  };

  const handleCustomDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.name === 'startDate') {
      setCustomStartDate(event.target.value);
    } else {
      setCustomEndDate(event.target.value);
    }
  };
  
  return (
    <div className="flex flex-col h-full">
      <div className="flex flex-col gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold">SmartPCs</h1>
          <p className="text-muted-foreground">Manage your virtual machines</p>
              </div>
        <div className="flex items-center gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search PCs by name, description, or region..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex items-center border rounded-lg">
              <Button 
              variant={viewMode === 'grid' ? 'secondary' : 'ghost'}
                size="sm" 
              className="rounded-r-none"
              onClick={() => setViewMode('grid')}
            >
              <LayoutGrid className="h-4 w-4" />
            </Button>
            <Button 
              variant={viewMode === 'list' ? 'secondary' : 'ghost'}
              size="sm" 
              className="rounded-l-none"
              onClick={() => setViewMode('list')}
            >
              <List className="h-4 w-4" />
              </Button>
            </div>
          <Button onClick={() => setShowNewPCDialog(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Build SmartPC
          </Button>
              </div>
            </div>

      <div className="flex-1 flex flex-col">
        {/* Empty State */}
        {filteredPCs.length === 0 && (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="rounded-full bg-primary/10 p-4 mb-4">
              <Monitor className="h-8 w-8 text-primary" />
              </div>
            <h3 className="text-lg font-semibold mb-2">No SmartPCs Found</h3>
            <p className="text-muted-foreground mb-6 max-w-md">
              {searchQuery 
                ? "No SmartPCs match your search criteria. Try adjusting your search terms."
                : "Get started by building your first SmartPC. Check out our tutorials to learn more about SmartPC features."}
            </p>
            <div className="flex gap-4">
              <Button onClick={() => setShowNewPCDialog(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Build SmartPC
              </Button>
              {!searchQuery && (
                <Button variant="outline" asChild>
                  <Link href="/dashboard/tutorials">
                    <GraduationCap className="h-4 w-4 mr-2" />
                    View Tutorials
                  </Link>
                </Button>
              )}
            </div>
      </div>
        )}

        {viewMode === 'list' ? (
          <div className="bg-card rounded-lg border border-border">
            <div className="p-4">
              <div className="flex items-center gap-4 mb-4">
                <Checkbox 
                  checked={selectedPCs.length === filteredPCs.length}
                  onCheckedChange={handleSelectAll}
                />
                <span className="text-sm text-muted-foreground">
                  {selectedPCs.length} selected
                </span>
              </div>

              <div className="space-y-1">
                {filteredPCs.map((pc) => (
                  <div
                    key={pc.id}
                    className={`p-3 rounded-lg border cursor-pointer ${
                      selectedPCs.includes(pc.id) ? 'border-primary bg-primary/5' : 'border-border'
                    }`}
                    onClick={(event) => {
                      event.stopPropagation();
                      handlePCSelection(pc.id);
                    }}
                  >
            <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Checkbox 
                          checked={selectedPCs.includes(pc.id)}
                          onCheckedChange={(checked: boolean) => {
                            handlePCSelection(pc.id);
                          }}
                        />
                        <div>
                          <div className="flex items-center gap-3">
                            <span className="font-medium">{pc.name}</span>
                            <div className={`px-2 py-0.5 rounded-md flex items-center gap-1.5 ${
                              pc.status === 'running' ? 'bg-green-500/10 text-green-500' :
                              pc.status === 'stopped' ? 'bg-red-500/10 text-red-500' :
                              pc.status === 'building' ? 'bg-purple-500/10 text-purple-500' :
                              pc.status === 'starting' ? 'bg-yellow-500/10 text-yellow-500' :
                              pc.status === 'stopping' ? 'bg-orange-500/10 text-orange-500' :
                              pc.status === 'idle' ? 'bg-blue-500/10 text-blue-500' :
                              'bg-gray-500/10 text-gray-500'
                            }`}>
                              {getStatusIcon(pc.status)}
                              <span className="text-xs font-medium">{getStatusText(pc.status)}</span>
              </div>
            </div>
                          <span className="text-xs text-muted-foreground">{pc.description}</span>
      </div>
                      </div>
                      <div className="flex items-center gap-2">
              <Button
                size="sm" 
                          variant="default"
                          onClick={(e) => {
                            e.stopPropagation();
                            const path = `/pc-viewer?name=${encodeURIComponent(pc.name)}`;
                            // Try to open in new tab first
                            const newWindow = window.open(path, '_blank');
                            // If popup is blocked, navigate in same window
                            if (!newWindow) {
                              window.location.href = path;
                            }
                          }}
                          disabled={pc.status !== 'running'}
                          className="h-8"
                        >
                          <ExternalLink className="h-4 w-4 mr-1.5" />
                          {pc.status === 'running' ? 'Connect' : 'Launch'}
              </Button>
                        {pc.status === 'running' ? (
              <Button
                            size="sm"
                variant="outline"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleStopPC(pc);
                            }}
                            className="h-8"
                          >
                            <StopCircle className="h-4 w-4 mr-1.5" />
                            Stop
              </Button>
                        ) : (
              <Button
                            size="sm"
                variant="outline"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleStartPC(pc);
                            }}
                            className="h-8"
                          >
                            <Play className="h-4 w-4 mr-1.5" />
                    Start
              </Button>
                )}
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                            <Button variant="ghost" size="icon">
                              <MoreVertical className="h-4 w-4" />
              </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={(e) => {
                              e.stopPropagation();
                              handleScheduleSettings(pc);
                            }}>
                              <CalendarClock className="h-4 w-4 mr-2" />
                              Schedule
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={(e) => {
                              e.stopPropagation();
                              handleIdleSettings(pc);
                            }}>
                              <Moon className="h-4 w-4 mr-2" />
                              Idle Settings
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={(e) => {
                              e.stopPropagation();
                              handleAssignUser(pc);
                            }}>
                              <Plus className="h-4 w-4 mr-2" />
                              Assign User
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem 
                              className="text-destructive"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDeletePC(pc);
                              }}
                            >
                              <Trash2 className="h-4 w-4 mr-2" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
            </div>
              </div>
            </div>
                ))}
              </div>
            </div>
      </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredPCs.map((pc) => (
              <Card 
                key={pc.id} 
                className={`relative ${selectedPCs.includes(pc.id) ? 'border-primary' : ''}`}
                onClick={(event) => {
                  event.stopPropagation();
                  handlePCSelection(pc.id);
                }}
              >
          <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      <Checkbox 
                        checked={selectedPCs.includes(pc.id)}
                        onCheckedChange={(checked: boolean) => {
                          handlePCSelection(pc.id);
                        }}
                        className="mt-1"
                      />
                      <div>
                        <CardTitle className="mb-2">{pc.name}</CardTitle>
                        <div className={`px-2 py-1 rounded-md inline-flex items-center gap-2 ${
                          pc.status === 'running' ? 'bg-green-500/10 text-green-500' :
                          pc.status === 'stopped' ? 'bg-red-500/10 text-red-500' :
                          pc.status === 'building' ? 'bg-purple-500/10 text-purple-500' :
                          pc.status === 'starting' ? 'bg-yellow-500/10 text-yellow-500' :
                          pc.status === 'stopping' ? 'bg-orange-500/10 text-orange-500' :
                          pc.status === 'idle' ? 'bg-blue-500/10 text-blue-500' :
                          'bg-gray-500/10 text-gray-500'
                        }`}>
                          {getStatusIcon(pc.status)}
                          <span className="text-sm font-medium">{getStatusText(pc.status)}</span>
                        </div>
                        <CardDescription className="mt-2">{pc.description}</CardDescription>
                      </div>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={(e) => {
                          e.stopPropagation();
                          handleScheduleSettings(pc);
                        }}>
                          <CalendarClock className="h-4 w-4 mr-2" />
                          Schedule
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={(e) => {
                          e.stopPropagation();
                          handleIdleSettings(pc);
                        }}>
                          <Moon className="h-4 w-4 mr-2" />
                          Idle Settings
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={(e) => {
                          e.stopPropagation();
                          handleAssignUser(pc);
                        }}>
                          <Plus className="h-4 w-4 mr-2" />
                          Assign User
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem 
                          className="text-destructive"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeletePC(pc);
                          }}
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span>{formatUptime(pc.uptime)}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Shield className="h-4 w-4 text-muted-foreground" />
                        <span>{pc.region}</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <CalendarClock className="h-4 w-4" />
                        <span>
                          {pc.schedule 
                            ? `${pc.schedule.start}-${pc.schedule.end}`
                            : 'No schedule'
                          }
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Clock className="h-4 w-4" />
                        <span>Idle: {pc.idleTime}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between border-t pt-4 mt-2">
                      <div className="flex items-center gap-2">
                        <AlertCircle className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">${pc.cost.toFixed(2)} this month</span>
                      </div>
                      <div className="flex items-center gap-4">
              <Button
                          size="sm"
                          variant="default"
                          onClick={(e) => {
                            e.stopPropagation();
                            const path = `/pc-viewer?name=${encodeURIComponent(pc.name)}`;
                            // Try to open in new tab first
                            const newWindow = window.open(path, '_blank');
                            // If popup is blocked, navigate in same window
                            if (!newWindow) {
                              window.location.href = path;
                            }
                          }}
                          disabled={pc.status !== 'running'}
                          className="h-8"
                        >
                          <ExternalLink className="h-4 w-4 mr-1.5" />
                          {pc.status === 'running' ? 'Connect' : 'Launch'}
                        </Button>
                        {pc.status === 'running' ? (
                          <Button
                            size="sm"
                variant="outline"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleStopPC(pc);
                            }}
                            className="h-8"
                          >
                            <StopCircle className="h-4 w-4 mr-1.5" />
                            Stop
              </Button>
                        ) : (
              <Button
                            size="sm"
                variant="outline"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleStartPC(pc);
                            }}
                            className="h-8"
                          >
                            <Play className="h-4 w-4 mr-1.5" />
                            Start
              </Button>
                        )}
                      </div>
                    </div>
            </div>
          </CardContent>
        </Card>
            ))}
          </div>
        )}

        {/* Details Panel */}
        {selectedPCs.length > 0 && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: 'auto' }}
            exit={{ height: 0 }}
            className="mt-4 bg-card rounded-lg border border-border overflow-hidden"
          >
            <div className="p-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold">Instance Details</h3>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setShowDetails(!showDetails)}
                >
                  {showDetails ? (
                    <ChevronDown className="h-4 w-4" />
                  ) : (
                    <ChevronUp className="h-4 w-4" />
                  )}
                </Button>
              </div>

              {showDetails && selectedPCs.length === 1 && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {cloudPCs.filter(pc => pc.id === selectedPCs[0]).map(pc => (
                    <React.Fragment key={pc.id}>
                    <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <Cpu className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm font-medium">CPU Usage</span>
                          </div>
                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                          <div
                            className="h-full bg-primary"
                            style={{ width: `${pc.cpuUsage}%` }}
                          />
                          </div>
                        <span className="text-sm text-muted-foreground">{pc.cpuUsage}%</span>
                          </div>

                    <div className="space-y-2">
                          <div className="flex items-center gap-2">
                          <MemoryStick className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm font-medium">Memory Usage</span>
                          </div>
                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                          <div
                            className="h-full bg-primary"
                            style={{ width: `${pc.memoryUsage}%` }}
                          />
                        </div>
                        <span className="text-sm text-muted-foreground">{pc.memoryUsage}%</span>
                    </div>

                    <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Shield className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm font-medium">Region</span>
                </div>
                        <span className="text-sm text-muted-foreground">{pc.region}</span>
                    </div>

                    <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <CalendarClock className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm font-medium">Schedule</span>
                    </div>
                        <span className="text-sm text-muted-foreground">{pc.schedule ? `${pc.schedule.start}-${pc.schedule.end}` : 'No schedule'}</span>
                    </div>

                    <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm font-medium">Idle Time</span>
                    </div>
                        <span className="text-sm text-muted-foreground">{pc.idleTime}</span>
                    </div>

                    <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <MonitorPlay className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm font-medium">Uptime</span>
                    </div>
                        <span className="text-sm text-muted-foreground">{formatUptime(pc.uptime)}</span>
                  </div>
                  
                    <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <AlertCircle className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm font-medium">Cost</span>
                    </div>
                        <span className="text-sm text-muted-foreground">${pc.cost.toFixed(2)} this month</span>
                  </div>
                  
                    <div className="col-span-full mt-4 border-t pt-4">
                      <h4 className="text-sm font-medium mb-3">Specifications</h4>
                      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <Cpu className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm font-medium">CPU</span>
                    </div>
                          <span className="text-sm text-muted-foreground">{pc.specs.cpu}</span>
                  </div>
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <MemoryStick className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm font-medium">RAM</span>
                </div>
                          <span className="text-sm text-muted-foreground">{pc.specs.ram}</span>
                </div>
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <HardDrive className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm font-medium">Storage</span>
                    </div>
                          <span className="text-sm text-muted-foreground">{pc.specs.storage}</span>
                    </div>
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <Activity className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm font-medium">GPU</span>
                    </div>
                          <span className="text-sm text-muted-foreground">{pc.specs.gpu}</span>
                  </div>
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <Settings className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm font-medium">OS</span>
                    </div>
                          <span className="text-sm text-muted-foreground">{pc.specs.os}</span>
                        </div>
                </div>
                
                    {/* Assigned Users Section */}
                    <div className="col-span-full mt-4 border-t pt-4">
                      <div className="flex items-center gap-3 mb-3">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        <h4 className="text-sm font-medium">Assigned Users ({pc.assignedUsers.length})</h4>
                        <div className="flex-1 border-b border-border/50" />
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleAssignUser(pc);
                          }}
                          className="h-7 px-2 text-xs hover:bg-primary/5 hover:text-primary"
                        >
                          <Plus className="h-3 w-3 mr-1" />
                          Assign
                        </Button>
                    </div>

                      {pc.assignedUsers.length > 0 ? (
                        <div className="flex flex-wrap gap-2">
                          {pc.assignedUsers.map((user) => (
                            <div 
                              key={user.id} 
                              className="group flex items-center gap-2 bg-muted/30 hover:bg-muted/50 px-2 py-1 rounded-md"
                            >
                              <Avatar className="h-6 w-6">
                                <AvatarFallback className="text-xs bg-primary/10 text-primary">
                                  {user.name.charAt(0)}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="text-xs font-medium leading-none">{user.name}</p>
                                <p className="text-xs text-muted-foreground mt-0.5">{user.email}</p>
                              </div>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  const updatedPC = {
                                    ...pc,
                                    assignedUsers: pc.assignedUsers.filter(u => u.id !== user.id)
                                  };
                                  setCloudPCs(cloudPCs.map(p => p.id === pc.id ? updatedPC : p));
                                  toast({
                                    title: "User Removed",
                                    description: `${user.name} has been removed from ${pc.name}`,
                                  });
                                }}
                                className="opacity-0 group-hover:opacity-100 h-6 w-6 ml-1"
                              >
                                <X className="h-3 w-3 text-muted-foreground hover:text-destructive" />
                              </Button>
                            </div>
                      ))}
                    </div>
                      ) : (
                        <div className="flex items-center justify-center gap-2 py-3 text-xs text-muted-foreground">
                          <Users className="h-4 w-4" />
                          No assigned users
                    </div>
                      )}
                  </div>
                    </div>
                    </React.Fragment>
                      ))}
                    </div>
              )}

              {showDetails && selectedPCs.length > 1 && (
                <div className="text-center py-4 text-muted-foreground">
                  Select a single instance to view details
                    </div>
              )}
                  </div>
          </motion.div>
        )}
                </div>

      <Dialog open={showNewPCDialog} onOpenChange={setShowNewPCDialog}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Choose Your SmartPC Configurations</DialogTitle>
            <DialogDescription>
              Configure your custom cloud PC
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-6 py-4">
                  <div className="space-y-2">
              <Label>Select Operating System (OS)</Label>
              <Select value={selectedOS} onValueChange={setSelectedOS}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Operating System" />
                </SelectTrigger>
                <SelectContent>
                  {osOptions.map(os => (
                    <SelectItem key={os.value} value={os.value}>
                      {os.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
                    </div>

            <div className="space-y-2">
              <Label>Name of the computer</Label>
              <Input
                placeholder="Enter a name for your computer"
                value={newPCName}
                onChange={(e) => setNewPCName(e.target.value)}
              />
              <div className="flex items-center gap-2 mt-1.5">
                <AlertCircle className="h-4 w-4 text-yellow-600 dark:text-yellow-500" />
                <p className="text-sm text-yellow-600 dark:text-yellow-500">
                  No spaces or special characters allowed. Maximum 20 characters.
                </p>
                    </div>
                    </div>

            <div className="space-y-4">
              <h3 className="text-sm font-medium">Select Configuration</h3>
              
              <div className="space-y-2">
                <Label>CPU (Core)</Label>
                <Select value={selectedCPU} onValueChange={setSelectedCPU}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select CPU size" />
                  </SelectTrigger>
                  <SelectContent>
                    {cpuOptions.map(cpu => (
                      <SelectItem key={cpu.value} value={cpu.value}>
                        {cpu.label} (${cpu.pricePerHour}/hour)
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                    </div>
                  
                  <div className="space-y-2">
                <Label>Storage</Label>
                <Select value={selectedStorage} onValueChange={setSelectedStorage}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select storage size" />
                  </SelectTrigger>
                  <SelectContent>
                    {storageOptions.map(storage => (
                      <SelectItem key={storage.value} value={storage.value}>
                        {storage.label} (${storage.pricePerHour}/hour)
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                    </div>

              <div className="space-y-2">
                <Label>Location</Label>
                <Select value={selectedRegion} onValueChange={setSelectedRegion}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select nearest datacenter" />
                  </SelectTrigger>
                  <SelectContent>
                    {locationOptions.map(location => (
                      <SelectItem key={location.value} value={location.value}>
                        {location.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                    </div>
                    </div>

            <div className="rounded-lg border p-4 space-y-3">
              <div className="flex justify-between items-center">
                <span className="font-medium">Estimated Hourly Cost:</span>
                <span className="text-lg font-bold">${estimatedCost.toFixed(2)}/hour</span>
                    </div>
              <div className="flex justify-between items-center text-sm text-muted-foreground">
                <span>Estimated Monthly Cost:</span>
                <span>${(estimatedCost * 24 * 30).toFixed(2)}/month</span>
                    </div>
                    </div>
                    </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowNewPCDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleCreatePC} disabled={!newPCName || !selectedOS || !selectedCPU || !selectedStorage}>
              Build
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add Schedule Dialog */}
      <Dialog open={showScheduleDialog} onOpenChange={setShowScheduleDialog}>
        <DialogContent className="sm:max-w-[400px]">
          <DialogHeader>
            <DialogTitle>Schedule Your SmartPC</DialogTitle>
            <DialogDescription>
              Schedule your PC to auto start/stop to increase efficiency and save costs.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
                  <div className="space-y-2">
              <Label>Select Time Zone</Label>
              <Select value={selectedTimeZone} onValueChange={setSelectedTimeZone}>
                <SelectTrigger>
                  <SelectValue placeholder="Select timezone" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="UTC">UTC</SelectItem>
                  <SelectItem value="EST">Eastern Time (EST)</SelectItem>
                  <SelectItem value="CST">Central Time (CST)</SelectItem>
                  <SelectItem value="PST">Pacific Time (PST)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Schedule Frequency</Label>
              <Select value={scheduleFrequency} onValueChange={setScheduleFrequency}>
                <SelectTrigger>
                  <SelectValue placeholder="Everyday" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="everyday">Everyday</SelectItem>
                  <SelectItem value="weekdays">Weekdays</SelectItem>
                  <SelectItem value="weekends">Weekends</SelectItem>
                  <SelectItem value="custom">Custom Date Range</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {scheduleFrequency === 'custom' && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Select Custom Date Range</Label>
                  <div className="grid gap-4">
                    <div className="relative">
                      <Input
                        type="text"
                        placeholder="mm/dd/yyyy"
                        className="w-full pl-3 pr-10"
                        value={customStartDate}
                        onChange={(e) => setCustomStartDate(e.target.value)}
                        onClick={(e) => {
                          const input = e.target as HTMLInputElement;
                          input.type = 'date';
                          input.showPicker();
                        }}
                      />
                      <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                      </div>
                    </div>
                    <div className="relative">
                      <Input
                        type="text"
                        placeholder="mm/dd/yyyy"
                        className="w-full pl-3 pr-10"
                        value={customEndDate}
                        onChange={(e) => setCustomEndDate(e.target.value)}
                        onClick={(e) => {
                          const input = e.target as HTMLInputElement;
                          input.type = 'date';
                          input.showPicker();
                        }}
                      />
                      <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="space-y-2">
              <Label>Auto Start Time (Optional)</Label>
              <div className="relative">
                <Input
                  type="text"
                  placeholder="--:--"
                  className="w-full pl-3 pr-10"
                  value={autoStartTime}
                  onChange={(e) => setAutoStartTime(e.target.value)}
                  onClick={(e) => {
                    const input = e.target as HTMLInputElement;
                    input.type = 'time';
                    input.showPicker();
                  }}
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Auto Stop Time (Optional)</Label>
              <div className="relative">
                <Input
                  type="text"
                  placeholder="--:--"
                  className="w-full pl-3 pr-10"
                  value={autoStopTime}
                  onChange={(e) => setAutoStopTime(e.target.value)}
                  onClick={(e) => {
                    const input = e.target as HTMLInputElement;
                    input.type = 'time';
                    input.showPicker();
                  }}
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                </div>
              </div>
            </div>
                </div>
          
          <DialogFooter>
            <Button className="w-full" onClick={handleSaveSchedule}>
              Save Schedule
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add Idle Settings Dialog */}
      <Dialog open={showIdleDialog} onOpenChange={setShowIdleDialog}>
        <DialogContent className="sm:max-w-[400px]">
          <DialogHeader>
            <DialogTitle>Configure Idle Settings</DialogTitle>
            <DialogDescription>
              Set the idle timeout duration for {editingPC?.name}. The PC will be suspended after being idle for the specified duration.
            </DialogDescription>
          </DialogHeader>
            <div className="space-y-2">
              <Label>Idle Timeout (minutes)</Label>
            <Select value={selectedIdleTimeout} onValueChange={setSelectedIdleTimeout}>
                <SelectTrigger>
                  <SelectValue placeholder="Select timeout duration" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">None (Always On)</SelectItem>
                  <SelectItem value="15">15 minutes</SelectItem>
                  <SelectItem value="30">30 minutes</SelectItem>
                  <SelectItem value="45">45 minutes</SelectItem>
                  <SelectItem value="60">1 hour</SelectItem>
                  <SelectItem value="120">2 hours</SelectItem>
                  <SelectItem value="180">3 hours</SelectItem>
                  <SelectItem value="240">4 hours</SelectItem>
                </SelectContent>
              </Select>
                    </div>
          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={() => setShowIdleDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveIdleSettings}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Assign User Dialog */}
      <Dialog open={showAssignUserDialog} onOpenChange={setShowAssignUserDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Assign Users to {selectedPCForUsers?.name}</DialogTitle>
            <DialogDescription>
              Select users to assign to this SmartPC.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            {mockUsers.map((user) => (
              <div key={user.id} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{user.name}</p>
                    <p className="text-sm text-muted-foreground">{user.email}</p>
                  </div>
            </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    if (selectedPCForUsers) {
                      const isAssigned = selectedPCForUsers.assignedUsers.some(u => u.id === user.id);
                      if (!isAssigned) {
                        selectedPCForUsers.assignedUsers.push(user);
                        setCloudPCs([...cloudPCs]);
                        toast({
                          title: "User Assigned",
                          description: `${user.name} has been assigned to ${selectedPCForUsers.name}`,
                        });
                      }
                    }
                    setShowAssignUserDialog(false);
                  }}
                >
                  Assign
                </Button>
      </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CloudPCPage;
