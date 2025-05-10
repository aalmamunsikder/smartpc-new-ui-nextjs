'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  Cpu,
  MemoryStick,
  HardDrive,
  Clock,
  Globe,
  DollarSign,
  Activity,
  Calendar,
  Moon,
  BarChart
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from '@/components/ui/progress';

interface DetailedCloudPC {
  id: string;
  name: string;
  template: string;
  status: 'running' | 'stopped' | 'starting' | 'stopping' | 'idle';
  uptime: number;
  cpuUsage: number;
  memoryUsage: number;
  diskUsage: number;
  region: string;
  cost: number;
  createdAt: Date;
  idleTimeout: number;
  schedule?: {
    start: string;
    end: string;
    days: string[];
  };
  specs: {
    cpu: string;
    ram: string;
    storage: string;
    gpu: string;
    os: string;
  };
  networkStats: {
    download: number;
    upload: number;
    latency: number;
  };
  costBreakdown: {
    compute: number;
    storage: number;
    network: number;
  };
}

const CloudPCDetailsPage = () => {
  const params = useParams();
  const id = params?.id as string;
  const [pc, setPc] = useState<DetailedCloudPC | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching PC details
    const fetchPCDetails = () => {
      // Mock data for demonstration
      const mockPC: DetailedCloudPC = {
        id: id,
        name: 'Development PC',
        template: 'performance',
        status: 'running',
        uptime: 86400, // 24 hours in seconds
        cpuUsage: 45,
        memoryUsage: 60,
        diskUsage: 75,
        region: 'us-east',
        cost: 48.00,
        createdAt: new Date('2024-01-01'),
        idleTimeout: 30,
        schedule: {
          start: '09:00',
          end: '17:00',
          days: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday']
        },
        specs: {
          cpu: '8 Core Intel Xeon',
          ram: '16GB DDR4',
          storage: '512GB NVMe SSD',
          gpu: 'NVIDIA RTX 3060',
          os: 'Windows 11 Pro'
        },
        networkStats: {
          download: 250, // Mbps
          upload: 100, // Mbps
          latency: 15 // ms
        },
        costBreakdown: {
          compute: 30.00,
          storage: 10.00,
          network: 8.00
        }
      };

      setPc(mockPC);
      setLoading(false);
    };

    if (id) {
      fetchPCDetails();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="h-8 w-8 border-4 border-t-primary border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!pc) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-lg text-muted-foreground">Cloud PC not found</p>
      </div>
    );
  }

  const formatUptime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return `${hours}h ${minutes}m`;
  };

  const formatBytes = (bytes: number) => {
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    if (bytes === 0) return '0 Byte';
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return `${Math.round(bytes / Math.pow(1024, i))} ${sizes[i]}`;
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between"
        >
          <div>
            <h1 className="text-3xl font-bold mb-2">{pc.name}</h1>
            <p className="text-muted-foreground">ID: {pc.id}</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className={`h-3 w-3 rounded-full ${
                pc.status === 'running' ? 'bg-green-500' :
                pc.status === 'stopped' ? 'bg-red-500' :
                pc.status === 'idle' ? 'bg-blue-500' :
                'bg-yellow-500'
              } animate-pulse`}></div>
              <span className="capitalize">{pc.status}</span>
            </div>
            <Button variant="outline">Connect</Button>
          </div>
        </motion.div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* System Specifications */}
        <Card>
          <CardHeader>
            <CardTitle>System Specifications</CardTitle>
            <CardDescription>Hardware and software details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-3">
              <Cpu className="h-5 w-5 text-primary" />
              <div>
                <p className="text-sm font-medium">CPU</p>
                <p className="text-sm text-muted-foreground">{pc.specs.cpu}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <MemoryStick className="h-5 w-5 text-primary" />
              <div>
                <p className="text-sm font-medium">Memory</p>
                <p className="text-sm text-muted-foreground">{pc.specs.ram}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <HardDrive className="h-5 w-5 text-primary" />
              <div>
                <p className="text-sm font-medium">Storage</p>
                <p className="text-sm text-muted-foreground">{pc.specs.storage}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CloudPCDetailsPage; 