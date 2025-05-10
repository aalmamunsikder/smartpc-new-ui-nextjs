'use client'

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Cpu, HardDrive, MonitorPlay, Globe, MemoryStick } from 'lucide-react';
import Navbar from '@/components/Navbar';

interface Option {
  value: string;
  label: string;
  pricePerHour?: number;
}

const osOptions: Option[] = [
  { value: 'windows11', label: 'Windows 11' },
  { value: 'windows11pro', label: 'Windows 11 Pro' },
  { value: 'windows10', label: 'Windows 10' },
  { value: 'windows10pro', label: 'Windows 10 Pro' }
];

const cpuOptions: Option[] = [
  { value: '2', label: '2 Core', pricePerHour: 0.25 },
  { value: '4', label: '4 Core', pricePerHour: 0.50 },
  { value: '8', label: '8 Core', pricePerHour: 1.00 },
  { value: '12', label: '12 Core', pricePerHour: 1.50 }
];

const memoryOptions: Option[] = [
  { value: '4', label: '4 GB RAM', pricePerHour: 0.10 },
  { value: '8', label: '8 GB RAM', pricePerHour: 0.20 },
  { value: '16', label: '16 GB RAM', pricePerHour: 0.40 },
  { value: '32', label: '32 GB RAM', pricePerHour: 0.80 }
];

const storageOptions: Option[] = [
  { value: '120', label: '120 GB', pricePerHour: 0.05 },
  { value: '256', label: '256 GB', pricePerHour: 0.10 },
  { value: '512', label: '512 GB', pricePerHour: 0.20 },
  { value: '1024', label: '1 TB', pricePerHour: 0.40 }
];

const locationOptions: Option[] = [
  { value: 'us-east', label: 'US East (New York)' },
  { value: 'us-west', label: 'US West (San Francisco)' },
  { value: 'eu-central', label: 'EU Central (Frankfurt)' },
  { value: 'ap-southeast', label: 'Asia Pacific (Singapore)' }
];

export default function BuildSmartPCPage() {
  const router = useRouter();
  const { toast } = useToast();
  
  const [pcName, setPCName] = useState('');
  const [selectedOS, setSelectedOS] = useState(osOptions[0].value);
  const [selectedCPU, setSelectedCPU] = useState(cpuOptions[0].value);
  const [selectedMemory, setSelectedMemory] = useState(memoryOptions[0].value);
  const [selectedStorage, setSelectedStorage] = useState(storageOptions[0].value);
  const [selectedRegion, setSelectedRegion] = useState(locationOptions[0].value);
  const [estimatedCost, setEstimatedCost] = useState(0);

  const calculateHourlyCost = () => {
    const cpuCost = cpuOptions.find(cpu => cpu.value === selectedCPU)?.pricePerHour || 0;
    const memoryCost = memoryOptions.find(memory => memory.value === selectedMemory)?.pricePerHour || 0;
    const storageCost = storageOptions.find(storage => storage.value === selectedStorage)?.pricePerHour || 0;
    return cpuCost + memoryCost + storageCost;
  };

  useEffect(() => {
    setEstimatedCost(calculateHourlyCost());
  }, [selectedCPU, selectedMemory, selectedStorage]);

  const handleCreatePC = () => {
    if (!pcName) {
      toast({
        title: "Error",
        description: "Please enter a name for your SmartPC.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Authentication Required",
      description: "Please sign in to create your SmartPC."
    });
    router.push('/login');
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0A0A1B]">
      <Navbar />
      <div className="min-h-screen pt-20 pb-16">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="text-center mb-12">
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-4xl font-bold mb-4"
              >
                Build Your <span className="gradient-text">SmartPC</span>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-lg text-muted-foreground"
              >
                Configure your perfect cloud PC in minutes
              </motion.p>
            </div>

            {/* Configuration Form */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="grid gap-8"
            >
              {/* Basic Info */}
              <Card>
                <CardHeader>
                  <CardTitle>Basic Information</CardTitle>
                  <CardDescription>Name your SmartPC and choose an operating system</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="pcName">PC Name</Label>
                    <Input
                      id="pcName"
                      placeholder="Enter a name for your SmartPC"
                      value={pcName}
                      onChange={(e) => setPCName(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Operating System</Label>
                    <Select value={selectedOS} onValueChange={setSelectedOS}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Operating System" />
                      </SelectTrigger>
                      <SelectContent>
                        {osOptions.map(os => (
                          <SelectItem key={os.value} value={os.value}>
                            <div className="flex items-center gap-2">
                              <MonitorPlay className="h-4 w-4" />
                              {os.label}
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>

              {/* Hardware Configuration */}
              <Card>
                <CardHeader>
                  <CardTitle>Hardware Configuration</CardTitle>
                  <CardDescription>Choose your computing resources</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>CPU</Label>
                    <Select value={selectedCPU} onValueChange={setSelectedCPU}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select CPU" />
                      </SelectTrigger>
                      <SelectContent>
                        {cpuOptions.map(cpu => (
                          <SelectItem key={cpu.value} value={cpu.value}>
                            <div className="flex items-center gap-2">
                              <Cpu className="h-4 w-4" />
                              {cpu.label} (${cpu.pricePerHour}/hour)
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Memory</Label>
                    <Select value={selectedMemory} onValueChange={setSelectedMemory}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Memory" />
                      </SelectTrigger>
                      <SelectContent>
                        {memoryOptions.map(memory => (
                          <SelectItem key={memory.value} value={memory.value}>
                            <div className="flex items-center gap-2">
                              <MemoryStick className="h-4 w-4" />
                              {memory.label} (${memory.pricePerHour}/hour)
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Storage</Label>
                    <Select value={selectedStorage} onValueChange={setSelectedStorage}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Storage" />
                      </SelectTrigger>
                      <SelectContent>
                        {storageOptions.map(storage => (
                          <SelectItem key={storage.value} value={storage.value}>
                            <div className="flex items-center gap-2">
                              <HardDrive className="h-4 w-4" />
                              {storage.label} (${storage.pricePerHour}/hour)
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>

              {/* Location */}
              <Card>
                <CardHeader>
                  <CardTitle>Location</CardTitle>
                  <CardDescription>Choose the datacenter closest to you for optimal performance</CardDescription>
                </CardHeader>
                <CardContent>
                  <Select value={selectedRegion} onValueChange={setSelectedRegion}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Location" />
                    </SelectTrigger>
                    <SelectContent>
                      {locationOptions.map(location => (
                        <SelectItem key={location.value} value={location.value}>
                          <div className="flex items-center gap-2">
                            <Globe className="h-4 w-4" />
                            {location.label}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </CardContent>
              </Card>

              {/* Cost Summary */}
              <Card>
                <CardHeader>
                  <CardTitle>Cost Summary</CardTitle>
                  <CardDescription>Estimated costs for your SmartPC</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Hourly Cost</span>
                    <span className="text-2xl font-bold">${estimatedCost.toFixed(2)}/hour</span>
                  </div>
                  <div className="flex justify-between items-center text-sm text-muted-foreground">
                    <span>Monthly Estimate</span>
                    <span>${(estimatedCost * 24 * 30).toFixed(2)}/month</span>
                  </div>
                  <Button 
                    className="w-full mt-4" 
                    size="lg"
                    onClick={handleCreatePC}
                  >
                    Create SmartPC
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
} 