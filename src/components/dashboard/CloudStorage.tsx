'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { 
  MoreHorizontal, 
  FileText, 
  Image as ImageIcon, 
  FilePlus2, 
  FolderPlus, 
  Folder, 
  Music, 
  Video,
  Upload,
  Download,
  Trash2,
  Share2,
  Star,
  Info,
  AlertCircle,
  Search,
  Grid,
  List,
  Users,
  Lock,
  Clock,
  CheckCircle2,
  XCircle,
  Eye,
  EyeOff,
  Link as LinkIcon,
  Copy,
  ExternalLink,
  ChevronRight,
  Filter,
  SortAsc,
  SortDesc,
  RefreshCw,
  Cloud,
  HardDrive,
  Zap,
  Shield,
  History,
  Settings,
  Plus,
  Check,
  X,
  FileIcon,
  FolderIcon,
  ChevronDown,
  ChevronUp,
  Calendar,
  LayoutGrid,
  LayoutList,
  Menu,
  UserPlus,
  Key,
  Timer,
  Mail,
  Image,
  FileVideo2,
  Presentation,
  Table2,
  FileText as FileDocument,
  AudioLines,
  File,
  FileCode2,
  FileJson2,
  Archive,
  ChevronLeft,
  GripVertical,
  CloudIcon,
  UploadCloud,
  Box,
  Apple,
  Chrome,
  FolderSync,
  Settings2,
  GraduationCap
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuCheckboxItem,
  DropdownMenuLabel,
  DropdownMenuGroup,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from '@/components/ui/dropdown-menu';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';

const getFileIcon = (fileName: string, type: string) => {
  const extension = fileName.split('.').pop()?.toLowerCase();
  
  // Document types
  if (extension === 'pdf') return File;
  if (extension === 'doc' || extension === 'docx') return FileDocument;
  if (extension === 'xls' || extension === 'xlsx') return Table2;
  if (extension === 'ppt' || extension === 'pptx') return Presentation;
  if (extension === 'txt') return FileText;
  
  // Image types
  if (['jpg', 'jpeg', 'png', 'gif', 'svg', 'webp'].includes(extension || '')) return Image;
  
  // Video types
  if (['mp4', 'mov', 'avi', 'webm'].includes(extension || '')) return FileVideo2;
  
  // Audio types
  if (['mp3', 'wav', 'ogg', 'm4a'].includes(extension || '')) return AudioLines;
  
  // Code and data types
  if (['json', 'xml', 'yaml', 'yml'].includes(extension || '')) return FileJson2;
  if (['js', 'ts', 'jsx', 'tsx', 'html', 'css', 'py', 'java'].includes(extension || '')) return FileCode2;
  
  // Archive types
  if (['zip', 'rar', '7z', 'tar', 'gz'].includes(extension || '')) return Archive;
  
  // Folder
  if (type === 'folder') return Folder;
  
  // Default
  return FileText;
};

const FileTypeIcon = ({ fileName, fileType, size = "small" }: { fileName: string; fileType: string; size?: "small" | "large" }) => {
  const IconComponent = getFileIcon(fileName, fileType);
  return (
    <div className={`flex items-center justify-center ${size === "small" ? "h-5 w-5" : "h-8 w-8"}`}>
      <IconComponent className="w-full h-full text-primary" />
    </div>
  );
};

// Mock data for files
const mockFiles = [
  {
    id: '1',
    name: 'Project Presentation.pptx',
    type: 'document',
    size: '5.2 MB',
    modified: '2023-04-10T14:48:00',
    starred: true,
    shared: true,
    sharedWith: ['Sarah Johnson', 'Michael Chen'],
    version: '2.0',
    thumbnail: 'https://via.placeholder.com/40',
  },
  {
    id: '2',
    name: 'Product Photos',
    type: 'folder',
    size: '32 files',
    modified: '2023-04-09T10:30:00',
    starred: false,
    shared: true,
    sharedWith: ['Design Team'],
    version: null,
    thumbnail: null,
  },
  {
    id: '3',
    name: 'Screenshot.png',
    type: 'image',
    size: '1.8 MB',
    modified: '2023-04-08T21:15:00',
    starred: false,
    shared: false,
    sharedWith: [],
    version: '1.0',
    thumbnail: 'https://via.placeholder.com/40',
  },
  {
    id: '4',
    name: 'Client Feedback.mp3',
    type: 'audio',
    size: '4.3 MB',
    modified: '2023-04-07T16:22:00',
    starred: true,
    shared: false,
    sharedWith: [],
    version: '1.0',
    thumbnail: null,
  },
  {
    id: '5',
    name: 'App Demo.mp4',
    type: 'video',
    size: '24.8 MB',
    modified: '2023-04-06T09:10:00',
    starred: false,
    shared: true,
    sharedWith: ['Marketing Team'],
    version: '3.0',
    thumbnail: 'https://via.placeholder.com/40',
  },
  {
    id: '6',
    name: 'Design Assets',
    type: 'folder',
    size: '18 files',
    modified: '2023-04-05T11:45:00',
    starred: false,
    shared: false,
    sharedWith: [],
    version: null,
    thumbnail: null,
  },
  {
    id: '7',
    name: 'Budget Plan.xlsx',
    type: 'document',
    size: '2.1 MB',
    modified: '2023-04-04T15:30:00',
    starred: false,
    shared: false,
    sharedWith: [],
    version: '1.0',
    thumbnail: null,
  },
];

// File category buttons data
const categories = [
  { name: 'All Files', icon: FileText },
  { name: 'Folders', icon: Folder },
  { name: 'Documents', icon: FileText },
  { name: 'Images', icon: ImageIcon },
  { name: 'Videos', icon: Video },
  { name: 'Audio', icon: Music },
  { name: 'Recent', icon: Clock },
  { name: 'Starred', icon: Star },
  { name: 'Shared', icon: Share2 },
  { name: 'Trash', icon: Trash2 },
];

// Mock data for recent activity
const recentActivity = [
  {
    id: '1',
    action: 'edited',
    file: 'Project Presentation.pptx',
    user: 'Sarah Johnson',
    timestamp: '2023-04-10T14:48:00',
    avatar: 'https://i.pravatar.cc/150?img=1',
  },
  {
    id: '2',
    action: 'shared',
    file: 'Product Photos',
    user: 'Michael Chen',
    timestamp: '2023-04-09T10:30:00',
    avatar: 'https://i.pravatar.cc/150?img=2',
  },
  {
    id: '3',
    action: 'uploaded',
    file: 'Screenshot.png',
    user: 'You',
    timestamp: '2023-04-08T21:15:00',
    avatar: 'https://i.pravatar.cc/150?img=3',
  },
  {
    id: '4',
    action: 'commented',
    file: 'App Demo.mp4',
    user: 'Marketing Team',
    timestamp: '2023-04-06T09:10:00',
    avatar: 'https://i.pravatar.cc/150?img=4',
  },
];

// Mock data for storage plans
const storagePlans = [
  {
    id: 'basic',
    name: 'Basic',
    storage: '1TB',
    price: '$9.99/month',
    features: ['1TB Storage', 'Basic Sharing', 'File Versioning'],
    current: false,
  },
  {
    id: 'pro',
    name: 'Professional',
    storage: '5TB',
    price: '$19.99/month',
    features: ['5TB Storage', 'Advanced Sharing', 'File Versioning', 'Password Protection'],
    current: true,
  },
  {
    id: 'business',
    name: 'Business',
    storage: '10TB',
    price: '$49.99/month',
    features: ['10TB Storage', 'Team Collaboration', 'Admin Controls', 'Advanced Security'],
    current: false,
  },
];

const CloudStorage = () => {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState('All Files');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFiles, setSelectedFiles] = useState<string[]>([]);
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');
  const [sortBy, setSortBy] = useState<'name' | 'date' | 'size'>('date');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [showStoragePlans, setShowStoragePlans] = useState(false);
  const [showShareDialog, setShowShareDialog] = useState(false);
  const [showUploadDialog, setShowUploadDialog] = useState(false);
  const [showNewFolderDialog, setShowNewFolderDialog] = useState(false);
  const [newFolderName, setNewFolderName] = useState('');
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFileForShare, setSelectedFileForShare] = useState<string | null>(null);
  const [shareLink, setShareLink] = useState('');
  const [sharePermissions, setSharePermissions] = useState<'view' | 'edit'>('view');
  const [shareExpiry, setShareExpiry] = useState<'1day' | '7days' | '30days' | 'never'>('7days');
  const [sharePassword, setSharePassword] = useState('');
  const [sharePasswordEnabled, setSharePasswordEnabled] = useState(false);
  const { toast } = useToast();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [moveDialogOpen, setMoveDialogOpen] = useState(false);
  const [selectedFolderForMove, setSelectedFolderForMove] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [draggedFiles, setDraggedFiles] = useState<string[]>([]);
  const [copyDialogOpen, setCopyDialogOpen] = useState(false);
  const [dragOperation, setDragOperation] = useState<'copy' | 'move' | null>(null);
  const [dragOverFolderId, setDragOverFolderId] = useState<string | null>(null);
  const [syncDialogOpen, setSyncDialogOpen] = useState(false);
  const [selectedStorageService, setSelectedStorageService] = useState<string | null>(null);
  const [syncInProgress, setSyncInProgress] = useState(false);
  const [lastSynced, setLastSynced] = useState<string | null>(null);
  const [files, setFiles] = useState(mockFiles);

  // Calculate storage usage
  const totalStorage = 5120; // 5TB in GB
  const usedStorage = 256; // 256GB
  const usagePercentage = (usedStorage / totalStorage) * 100;
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    }).format(date);
  };

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    
    if (diffInSeconds < 60) return 'just now';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
    if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)}d ago`;
    return formatDate(dateString);
  };

  const handleUpload = () => {
    setShowUploadDialog(true);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files?.length) return;

    // Simulate upload progress
    setUploadProgress(0);
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setShowUploadDialog(false);
    toast({
            title: "Upload Complete",
            description: `${files.length} file(s) uploaded successfully`,
          });
          return 0;
        }
        return prev + 10;
      });
    }, 500);
  };

  const handleCreateFolder = () => {
    if (!newFolderName.trim()) return;

    // Simulate folder creation
    toast({
      title: "Folder Created",
      description: `Folder "${newFolderName}" created successfully`,
    });

    setNewFolderName('');
    setShowNewFolderDialog(false);
  };

  const handleDownload = (fileName: string) => {
    toast({
      title: "Download Started",
      description: `Downloading ${fileName}...`,
    });
  };

  const handleShare = (fileId: string) => {
    setSelectedFileForShare(fileId);
    setShareLink(`https://smartpc.com/share/${fileId}`);
    setShowShareDialog(true);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareLink);
    toast({
      title: "Link Copied",
      description: "Share link copied to clipboard",
    });
  };

  const handleDelete = (fileId: string) => {
    // Remove the file from state
    setFiles(prevFiles => prevFiles.filter(file => file.id !== fileId));
    
    // Show success toast
    toast({
      title: "File Deleted",
      description: "The selected file has been moved to trash",
      variant: "destructive",
    });
    
    // If the deleted file was in selectedFiles, remove it from there too
    setSelectedFiles(prev => prev.filter(id => id !== fileId));
  };

  // Add a new function to handle deletion of selected files
  const handleDeleteSelected = () => {
    if (selectedFiles.length === 0) return;
    
    // Remove all selected files from state
    setFiles(prevFiles => prevFiles.filter(file => !selectedFiles.includes(file.id)));
    
    // Show success toast
    toast({
      title: `${selectedFiles.length} Files Deleted`,
      description: "The selected files have been moved to trash",
      variant: "destructive",
    });
    
    // Clear selected files
    setSelectedFiles([]);
  };

  const handleStar = (fileId: string) => {
    toast({
      title: "File Starred",
      description: "File added to your starred items",
    });
  };

  const handleViewDetails = (fileId: string) => {
    router.push(`/dashboard/files/${fileId}`);
  };

  const handleSort = (value: string) => {
    const sort = value as 'name' | 'date' | 'size';
    if (sort === sortBy) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(sort);
      setSortOrder('asc');
    }
  };

  // Filter files based on search and category
  const filteredFiles = files.filter(file => {
    const matchesSearch = file.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = 
      selectedCategory === 'All Files' || 
      (selectedCategory === 'Folders' && file.type === 'folder') ||
      (selectedCategory === 'Documents' && file.type === 'document') ||
      (selectedCategory === 'Images' && file.type === 'image') ||
      (selectedCategory === 'Videos' && file.type === 'video') ||
      (selectedCategory === 'Audio' && file.type === 'audio');
    return matchesSearch && matchesCategory;
  });

  // Sort files based on selected criteria
  const sortedFiles = [...filteredFiles].sort((a, b) => {
    // Always put folders on top
    if (a.type === 'folder' && b.type !== 'folder') return -1;
    if (a.type !== 'folder' && b.type === 'folder') return 1;
    
    // If both are folders or both are files, sort by selected criteria
    if (sortBy === 'name') {
      return sortOrder === 'asc' 
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name);
    } else if (sortBy === 'date') {
      return sortOrder === 'asc'
        ? new Date(a.modified).getTime() - new Date(b.modified).getTime()
        : new Date(b.modified).getTime() - new Date(a.modified).getTime();
    } else if (sortBy === 'size') {
      // For folders, compare by number of files
      if (a.type === 'folder' && b.type === 'folder') {
        const aSize = parseInt(a.size);
        const bSize = parseInt(b.size);
        return sortOrder === 'asc' ? aSize - bSize : bSize - aSize;
      }
      // For files, compare by file size
      const aSize = parseInt(a.size);
      const bSize = parseInt(b.size);
      return sortOrder === 'asc'
        ? aSize - bSize
        : bSize - aSize;
    }
    return 0;
  });

  // Paginate files
  const totalPages = Math.ceil(sortedFiles.length / itemsPerPage);
  const paginatedFiles = sortedFiles.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Handle file selection
  const handleFileSelect = (fileId: string) => {
    setSelectedFiles(prev => {
      if (prev.includes(fileId)) {
        return prev.filter(id => id !== fileId);
      } else {
        return [...prev, fileId];
      }
    });
  };

  // Handle select all in current page
  const handleSelectAllInPage = (checked: boolean) => {
    if (checked) {
      const pageFileIds = paginatedFiles.map(file => file.id);
      setSelectedFiles(prev => {
        const otherPages = prev.filter(id => !paginatedFiles.find(file => file.id === id));
        return [...otherPages, ...pageFileIds];
      });
    } else {
      setSelectedFiles(prev => 
        prev.filter(id => !paginatedFiles.find(file => file.id === id))
      );
    }
  };

  // Check if all files in current page are selected
  const areAllCurrentPageFilesSelected = paginatedFiles.every(file => 
    selectedFiles.includes(file.id)
  );

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Get file for sharing
  const fileToShare = selectedFileForShare ? files.find(f => f.id === selectedFileForShare) : null;

  // Handle file drop for upload
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    // Handle external file drops (upload)
    if (e.dataTransfer.types.includes('Files')) {
      const files = Array.from(e.dataTransfer.files);
      if (files.length > 0) {
        toast({
          title: "Files Uploading",
          description: `Uploading ${files.length} file(s)...`,
        });
      }
      return;
    }
  };

  // Handle drag over
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.types.includes('Files')) {
      setIsDragging(true);
    }
  };

  // Handle drag leave
  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    setDragOverFolderId(null);
  };

  // Handle internal file/folder drag start
  const handleItemDragStart = (e: React.DragEvent, fileId: string) => {
    // Set drag data
    e.dataTransfer.setData('application/json', JSON.stringify({
      fileIds: selectedFiles.includes(fileId) ? selectedFiles : [fileId],
      operation: e.ctrlKey ? 'copy' : 'move'
    }));
    
    // Set drag effect
    e.dataTransfer.effectAllowed = e.ctrlKey ? 'copy' : 'move';
    
    // Update state
    setDragOperation(e.ctrlKey ? 'copy' : 'move');
    if (selectedFiles.includes(fileId)) {
      setDraggedFiles(selectedFiles);
    } else {
      setDraggedFiles([fileId]);
    }
  };

  // Handle folder drag over
  const handleFolderDragOver = (e: React.DragEvent, folderId: string) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Don't allow dropping on itself or if dragging external files
    if (draggedFiles.includes(folderId) || e.dataTransfer.types.includes('Files')) {
      e.dataTransfer.dropEffect = 'none';
      return;
    }

    // Set drop effect based on operation
    e.dataTransfer.dropEffect = dragOperation || (e.ctrlKey ? 'copy' : 'move');
    setDragOverFolderId(folderId);
  };

  // Handle folder drag leave
  const handleFolderDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragOverFolderId(null);
  };

  // Handle drop on folder
  const handleFolderDrop = (e: React.DragEvent, folderId: string) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Don't allow dropping on itself
    if (draggedFiles.includes(folderId)) {
      return;
    }

    try {
      const dragData = JSON.parse(e.dataTransfer.getData('application/json'));
      const operation = dragData.operation || 'move';
      const fileIds = dragData.fileIds || [];

      if (fileIds.length > 0) {
        toast({
          title: `Files ${operation === 'copy' ? 'Copied' : 'Moved'}`,
          description: `${fileIds.length} file(s) ${operation === 'copy' ? 'copied' : 'moved'} successfully`,
        });

        // Clear selection and drag state
        setSelectedFiles([]);
        setDraggedFiles([]);
        setDragOverFolderId(null);
        setDragOperation(null);
      }
    } catch (error) {
      console.error('Error processing drop:', error);
    }
  };

  // Storage services configuration
  const storageServices = [
    {
      id: 'dropbox',
      name: 'Dropbox',
      icon: Box,
      connected: false,
      lastSync: null,
    },
    {
      id: 'icloud',
      name: 'iCloud',
      icon: Apple,
      connected: false,
      lastSync: null,
    },
    {
      id: 'gdrive',
      name: 'Google Drive',
      icon: Chrome,
      connected: false,
      lastSync: null,
    },
    {
      id: 'local',
      name: 'Local Machine',
      icon: HardDrive,
      connected: false,
      lastSync: null,
    }
  ];

  // Handle storage service connection
  const handleConnectStorage = (serviceId: string) => {
    router.push(`/dashboard/storage/${serviceId}`);
  };

  // Handle sync start
  const handleSync = (serviceId: string) => {
    setSyncInProgress(true);
    setSelectedStorageService(serviceId);

    // Simulate sync process
    setTimeout(() => {
      setSyncInProgress(false);
      setLastSynced(new Date().toISOString());
      toast({
        title: "Sync Complete",
        description: "Files synchronized successfully",
      });
    }, 2000);
  };

  return (
    <>
    <Card className="relative">
        <CardHeader className="pb-2">
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Smart Storage</CardTitle>
        <CardDescription>Manage your files and folders</CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={() => setSyncDialogOpen(true)}>
                <FolderSync className="h-4 w-4 mr-2" />
                Sync Storage
              </Button>
              <Button variant="outline" size="sm" onClick={() => setShowStoragePlans(true)}>
                <HardDrive className="h-4 w-4 mr-2" />
                Storage Plans
              </Button>
            </div>
          </div>
      </CardHeader>
      <CardContent className="p-0">
          <div 
            className={`flex flex-col md:flex-row min-h-[600px] relative ${
              isDragging ? 'bg-muted/50' : ''
            }`}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
          >
            {isDragging && (
              <div className="absolute inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm z-50">
                <div className="text-center">
                  <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                  <h3 className="text-lg font-medium mb-2">Drop files here</h3>
                  <p className="text-sm text-muted-foreground">
                    Drop files to upload them to this folder
                  </p>
                </div>
              </div>
            )}
            
          <div className="w-full md:w-64 p-4 md:border-r border-border">
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">Storage</span>
                    <span className="text-xs">{usedStorage}GB / {totalStorage}GB</span>
              </div>
                  <Progress 
                    value={usagePercentage} 
                    className={`h-2 ${usagePercentage > 90 ? 'bg-red-200' : ''}`}
                  />
                  {usagePercentage > 90 && (
                    <div className="flex items-center gap-2 mt-2 text-xs text-red-500">
                      <AlertCircle className="h-4 w-4" />
                      <span>Storage almost full</span>
                </div>
                  )}
              
              <div className="grid grid-cols-2 gap-2 mt-4">
                    <Button size="sm" variant="default" className="w-full" onClick={handleUpload}>
                      <Upload className="h-4 w-4 mr-2" />
                  Upload
                </Button>
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="w-full" 
                  onClick={() => setShowNewFolderDialog(true)}
                >
                      <FolderPlus className="h-4 w-4 mr-2" />
                    New
                </Button>
              </div>
            </div>
            
            <div>
              <h3 className="text-sm font-medium mb-3">Categories</h3>
                  <ScrollArea className="h-[400px] pr-2">
                <div className="space-y-1">
                  {categories.map((category) => (
                    <Button
                      key={category.name}
                      variant={selectedCategory === category.name ? "secondary" : "ghost"}
                      className="w-full justify-start"
                      onClick={() => setSelectedCategory(category.name)}
                    >
                      <category.icon className="h-4 w-4 mr-2" />
                      {category.name}
                    </Button>
                  ))}
                </div>
              </ScrollArea>
            </div>
          </div>
          
              <div className="flex-1 overflow-hidden flex flex-col">
                <div className="border-b border-border p-4 flex flex-col md:flex-row gap-4 items-center justify-between">
                  <div className="flex items-center gap-4 w-full md:w-auto">
              <h3 className="text-lg font-medium">{selectedCategory}</h3>
                    <div className="flex-1 md:w-64">
                      <div className="relative">
                        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                          placeholder="Search files..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="pl-8"
                        />
                      </div>
                    </div>
                  </div>
              <div className="flex gap-2">
                  {selectedFiles.length > 0 && (
                    <>
                      <Button 
                        variant="outline" 
                        onClick={() => setCopyDialogOpen(true)}
                      >
                        <Copy className="h-4 w-4 mr-2" />
                        Copy
                      </Button>
                      <Button 
                        variant="outline"
                        onClick={() => setMoveDialogOpen(true)}
                      >
                        <FolderIcon className="h-4 w-4 mr-2" />
                        Move
                      </Button>
                    </>
                  )}
                <Button 
                  size="sm" 
                  variant="ghost"
                  onClick={() => setShowNewFolderDialog(true)}
                >
                  <FolderPlus className="h-4 w-4 mr-2" />
                  New
                </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button size="sm" variant="ghost">
                          <Filter className="h-4 w-4 mr-2" />
                          Filter
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                        <DropdownMenuCheckboxItem checked>Starred</DropdownMenuCheckboxItem>
                        <DropdownMenuCheckboxItem checked>Shared</DropdownMenuCheckboxItem>
                        <DropdownMenuCheckboxItem>Modified today</DropdownMenuCheckboxItem>
                        <DropdownMenuCheckboxItem>Modified this week</DropdownMenuCheckboxItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button size="sm" variant="ghost">
                          {sortOrder === 'asc' ? <SortAsc className="h-4 w-4 mr-2" /> : <SortDesc className="h-4 w-4 mr-2" />}
                          Sort
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Sort by</DropdownMenuLabel>
                        <DropdownMenuRadioGroup value={sortBy} onValueChange={handleSort}>
                          <DropdownMenuRadioItem value="name">Name</DropdownMenuRadioItem>
                          <DropdownMenuRadioItem value="date">Date</DropdownMenuRadioItem>
                          <DropdownMenuRadioItem value="size">Size</DropdownMenuRadioItem>
                        </DropdownMenuRadioGroup>
                      </DropdownMenuContent>
                    </DropdownMenu>
                    <Button 
                      size="sm" 
                      variant="ghost" 
                      onClick={() => setViewMode(viewMode === 'list' ? 'grid' : 'list')}
                    >
                      {viewMode === 'list' ? <Grid className="h-4 w-4" /> : <List className="h-4 w-4" />}
                    </Button>
                    <Button size="sm" variant="ghost">
                      <RefreshCw className="h-4 w-4" />
                  </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button size="sm" variant="ghost">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                      <Info className="h-4 w-4 mr-2" />
                      View Details
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Share2 className="h-4 w-4 mr-2" />
                      Share
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-destructive" onClick={handleDeleteSelected}>
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete Selected
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
            
                <Tabs defaultValue="files" className="flex-1 flex flex-col">
                  <TabsList className="border-b px-4">
                    <TabsTrigger value="files">Files</TabsTrigger>
                    <TabsTrigger value="recent">Recent Activity</TabsTrigger>
                    <TabsTrigger value="shared">Shared with Me</TabsTrigger>
                  </TabsList>
                  
                  <div className="flex-1 overflow-hidden">
                    <TabsContent value="files" className="h-full m-0 p-0 data-[state=active]:flex flex-col">
                      <ScrollArea className="flex-1">
                        {sortedFiles.length === 0 ? (
                          <div className="flex flex-col items-center justify-center h-[400px] text-center p-4">
                            <FileText className="h-8 w-8 text-muted-foreground mb-4" />
                            <h3 className="font-medium mb-2">No files found</h3>
                            <p className="text-sm text-muted-foreground mb-6">
                              {searchQuery 
                                ? "Try adjusting your search query" 
                                : "Upload files or create a new folder to get started"}
                            </p>
                            {!searchQuery && (
                              <div className="flex gap-4">
                                <Button onClick={handleUpload}>
                                  <Upload className="h-4 w-4 mr-2" />
                                  Upload Files
                                </Button>
                                <Button variant="outline" asChild>
                                  <Link href="/dashboard/tutorials">
                                    <GraduationCap className="h-4 w-4 mr-2" />
                                    View Tutorials
                                  </Link>
                                </Button>
                              </div>
                            )}
                          </div>
                        ) : viewMode === 'list' ? (
                          <div className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                      <TableHead className="w-[40px]">
                        <Checkbox 
                          checked={areAllCurrentPageFilesSelected}
                          onCheckedChange={handleSelectAllInPage}
                        />
                      </TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Size</TableHead>
                    <TableHead>Modified</TableHead>
                      <TableHead>Status</TableHead>
                    <TableHead></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                            {paginatedFiles.map((file) => (
                  <TableRow 
                    key={file.id} 
                    className={`hover:bg-muted/50 ${
                      dragOverFolderId === file.id ? 'bg-muted ring-2 ring-primary' : ''
                    }`}
                    draggable={true}
                    onDragStart={(e) => handleItemDragStart(e, file.id)}
                    onDragOver={(e) => file.type === 'folder' ? handleFolderDragOver(e, file.id) : undefined}
                    onDragLeave={(e) => file.type === 'folder' ? handleFolderDragLeave(e) : undefined}
                    onDrop={(e) => file.type === 'folder' ? handleFolderDrop(e, file.id) : undefined}
                  >
                      <TableCell>
                        <div className="flex items-center gap-2">
                        <GripVertical className="h-4 w-4 text-muted-foreground cursor-move" />
                        <Checkbox 
                          checked={selectedFiles.includes(file.id)}
                          onCheckedChange={() => handleFileSelect(file.id)}
                        />
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="h-8 w-8 flex items-center justify-center">
                          <FileTypeIcon fileName={file.name} fileType={file.type} size="small" />
                        </div>
                        <div>
                          <div className="flex items-center gap-1">
                          <span>{file.name}</span>
                            {file.starred && <Star className="h-3 w-3 text-yellow-500 fill-yellow-500" />}
                          </div>
                          {file.shared && (
                            <div className="flex items-center gap-1 text-xs text-muted-foreground">
                              <Share2 className="h-3 w-3" />
                              <span>Shared with {file.sharedWith.length} people</span>
                            </div>
                          )}
                        </div>
                        </div>
                      </TableCell>
                      <TableCell>{file.size}</TableCell>
                      <TableCell>{formatDate(file.modified)}</TableCell>
                    <TableCell>
                      {file.shared ? (
                        <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/20">
                          <Share2 className="h-3 w-3 mr-1" />
                          Shared
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="bg-gray-500/10 text-gray-500 border-gray-500/20">
                          Private
                        </Badge>
                      )}
                    </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            {file.type !== 'folder' && (
                            <DropdownMenuItem onClick={() => handleDownload(file.name)}>
                                <Download className="h-4 w-4 mr-2" />
                                Download
                              </DropdownMenuItem>
                            )}
                          <DropdownMenuItem onClick={() => handleShare(file.id)}>
                              <Share2 className="h-4 w-4 mr-2" />
                              Share
                            </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleStar(file.id)}>
                              <Star className="h-4 w-4 mr-2" />
                            {file.starred ? 'Unstar' : 'Star'}
                            </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleViewDetails(file.id)}>
                              <Info className="h-4 w-4 mr-2" />
                            View Details
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                          {selectedFiles.length > 0 && (
                            <DropdownMenuItem onClick={() => setMoveDialogOpen(true)}>
                              <FolderIcon className="h-4 w-4 mr-2" />
                              Move Selected
                            </DropdownMenuItem>
                          )}
                          <DropdownMenuItem 
                            className="text-destructive"
                            onClick={() => handleDelete(file.id)}
                          >
                              <Trash2 className="h-4 w-4 mr-2" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            <div className="flex items-center justify-between px-4 py-4 border-t">
              <div className="text-sm text-muted-foreground">
                Showing {Math.min((currentPage - 1) * itemsPerPage + 1, sortedFiles.length)} to{" "}
                {Math.min(currentPage * itemsPerPage, sortedFiles.length)} of {sortedFiles.length} files
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  <ChevronLeft className="h-4 w-4" />
                  Previous
                </Button>
                <div className="flex items-center space-x-1">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <Button
                      key={page}
                      variant={currentPage === page ? "default" : "outline"}
                      size="sm"
                      onClick={() => handlePageChange(page)}
                      className="w-8"
                    >
                      {page}
                    </Button>
                  ))}
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  Next
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </div>
            </div>
                      </div>
                    ) : (
                      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
                        {paginatedFiles.map((file) => (
                          <div 
                            key={file.id} 
                            className={`group relative p-4 rounded-lg border border-border hover:bg-muted/50 transition-colors ${
                              dragOverFolderId === file.id ? 'bg-muted ring-2 ring-primary' : ''
                            }`}
                            draggable={true}
                            onDragStart={(e) => handleItemDragStart(e, file.id)}
                            onDragOver={(e) => file.type === 'folder' ? handleFolderDragOver(e, file.id) : undefined}
                            onDragLeave={(e) => file.type === 'folder' ? handleFolderDragLeave(e) : undefined}
                            onDrop={(e) => file.type === 'folder' ? handleFolderDrop(e, file.id) : undefined}
                          >
                            <div className="absolute top-2 left-2 flex items-center gap-2">
                              <GripVertical className="h-4 w-4 text-muted-foreground cursor-move" />
                              <Checkbox 
                                checked={selectedFiles.includes(file.id)}
                                onCheckedChange={() => handleFileSelect(file.id)}
                              />
                            </div>
                            <div className="flex flex-col items-center text-center mb-3">
                              <div className="h-12 w-12 mb-2">
                                <FileTypeIcon fileName={file.name} fileType={file.type} size="large" />
                              </div>
                              <div className="w-full">
                                <div className="font-medium truncate text-sm">{file.name}</div>
                                <div className="text-xs text-muted-foreground mt-1">{file.size}</div>
                              </div>
                            </div>
                            
                            <div className="flex items-center justify-between text-xs text-muted-foreground">
                              <span>{formatDate(file.modified)}</span>
                              <div className="flex items-center gap-1">
                                {file.shared && (
                                  <TooltipProvider>
                                    <Tooltip>
                                      <TooltipTrigger>
                                        <Share2 className="h-3.5 w-3.5 text-green-500" />
                                      </TooltipTrigger>
                                      <TooltipContent>
                                        Shared with {file.sharedWith.length} people
                                      </TooltipContent>
                                    </Tooltip>
                                  </TooltipProvider>
                                )}
                                {file.starred && (
                                  <TooltipProvider>
                                    <Tooltip>
                                      <TooltipTrigger>
                                        <Star className="h-3.5 w-3.5 text-yellow-500 fill-yellow-500" />
                                      </TooltipTrigger>
                                      <TooltipContent>
                                        Starred
                                      </TooltipContent>
                                    </Tooltip>
                                  </TooltipProvider>
                                )}
                  </div>
                            </div>

                            <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="icon" className="h-8 w-8">
                                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  {file.type !== 'folder' && (
                                    <DropdownMenuItem onClick={() => handleDownload(file.name)}>
                                      <Download className="h-4 w-4 mr-2" />
                                      Download
                                    </DropdownMenuItem>
                                  )}
                                  <DropdownMenuItem onClick={() => handleShare(file.id)}>
                                    <Share2 className="h-4 w-4 mr-2" />
                                    Share
                                  </DropdownMenuItem>
                                  <DropdownMenuItem onClick={() => handleStar(file.id)}>
                                    <Star className="h-4 w-4 mr-2" />
                                    {file.starred ? 'Unstar' : 'Star'}
                                  </DropdownMenuItem>
                                  <DropdownMenuItem onClick={() => handleViewDetails(file.id)}>
                                    <Info className="h-4 w-4 mr-2" />
                                    View Details
                                  </DropdownMenuItem>
                                  <DropdownMenuSeparator />
                                  {selectedFiles.length > 0 && (
                                    <DropdownMenuItem onClick={() => setMoveDialogOpen(true)}>
                                      <FolderIcon className="h-4 w-4 mr-2" />
                                      Move Selected
                                    </DropdownMenuItem>
                                  )}
                                  <DropdownMenuItem 
                                    className="text-destructive"
                                    onClick={() => handleDelete(file.id)}
                                  >
                                    <Trash2 className="h-4 w-4 mr-2" />
                                    Delete
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>
                          </div>
                        ))}
                        <div className="col-span-full flex items-center justify-between px-4 py-4 border-t">
                          <div className="text-sm text-muted-foreground">
                            Showing {Math.min((currentPage - 1) * itemsPerPage + 1, sortedFiles.length)} to{" "}
                            {Math.min(currentPage * itemsPerPage, sortedFiles.length)} of {sortedFiles.length} files
                          </div>
                          <div className="flex items-center space-x-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handlePageChange(currentPage - 1)}
                              disabled={currentPage === 1}
                            >
                              <ChevronLeft className="h-4 w-4" />
                              Previous
                            </Button>
                            <div className="flex items-center space-x-1">
                              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                                <Button
                                  key={page}
                                  variant={currentPage === page ? "default" : "outline"}
                                  size="sm"
                                  onClick={() => handlePageChange(page)}
                                  className="w-8"
                                >
                                  {page}
                                </Button>
                              ))}
                            </div>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handlePageChange(currentPage + 1)}
                              disabled={currentPage === totalPages}
                            >
                              Next
                              <ChevronRight className="h-4 w-4 ml-1" />
                            </Button>
                          </div>
                        </div>
                </div>
              )}
                  </ScrollArea>
                </TabsContent>
                
                <TabsContent value="recent" className="h-full m-0 p-0 data-[state=active]:flex flex-col">
                  <ScrollArea className="flex-1">
                    <div className="p-4 space-y-4">
                      {recentActivity.map((activity) => (
                        <div key={activity.id} className="flex items-start gap-4 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                          <Avatar className="h-10 w-10 flex-shrink-0">
                            <AvatarImage src={activity.avatar} />
                            <AvatarFallback>{activity.user.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="font-medium">{activity.user}</span>
                              <span className="text-muted-foreground">
                                {activity.action === 'edited' && 'edited'}
                                {activity.action === 'shared' && 'shared'}
                                {activity.action === 'uploaded' && 'uploaded'}
                                {activity.action === 'commented' && 'commented on'}
                              </span>
                              <span className="font-medium truncate">{activity.file}</span>
            </div>
                            <div className="text-xs text-muted-foreground mt-1">
                              {formatTimeAgo(activity.timestamp)}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </TabsContent>
                
                <TabsContent value="shared" className="h-full m-0 p-0 data-[state=active]:flex flex-col">
                  <ScrollArea className="flex-1">
                    <div className="flex flex-col items-center justify-center h-[400px] text-center p-4">
                      <Users className="h-8 w-8 text-muted-foreground mb-4" />
                      <h3 className="font-medium mb-2">No shared files</h3>
                      <p className="text-sm text-muted-foreground">
                        Files shared with you will appear here
                      </p>
                    </div>
                  </ScrollArea>
                </TabsContent>
              </div>
            </Tabs>
          </div>
        </div>
      </CardContent>
    </Card>

    {/* Storage Plans Dialog */}
    <Dialog open={showStoragePlans} onOpenChange={setShowStoragePlans}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Storage Plans</DialogTitle>
          <DialogDescription>
            Choose a plan that fits your storage needs
          </DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-4">
          {storagePlans.map((plan) => (
            <div 
              key={plan.id} 
              className={`p-4 rounded-lg border ${plan.current ? 'border-primary' : 'border-border'}`}
            >
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-medium">{plan.name}</h3>
                {plan.current && (
                  <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                    Current
                  </Badge>
                )}
              </div>
              <div className="text-2xl font-bold mb-2">{plan.storage}</div>
              <div className="text-sm text-muted-foreground mb-4">{plan.price}</div>
              <ul className="space-y-2 mb-4">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-2 text-sm">
                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                    {feature}
                  </li>
                ))}
              </ul>
              <Button 
                variant={plan.current ? "outline" : "default"} 
                className="w-full"
                disabled={plan.current}
              >
                {plan.current ? "Current Plan" : "Upgrade"}
              </Button>
            </div>
          ))}
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setShowStoragePlans(false)}>
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>

    {/* Share Dialog */}
    <Dialog open={showShareDialog} onOpenChange={setShowShareDialog}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Share {fileToShare?.name}</DialogTitle>
          <DialogDescription>
            Create a link to share this file with others
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="flex items-center gap-2">
            <Input value={shareLink} readOnly className="flex-1" />
            <Button variant="outline" onClick={handleCopyLink}>
              <Copy className="h-4 w-4 mr-2" />
              Copy
            </Button>
          </div>
          
          <div className="space-y-2">
            <Label>Permissions</Label>
            <div className="flex items-center space-x-2">
              <RadioGroup 
                value={sharePermissions} 
                onValueChange={(value: 'view' | 'edit') => setSharePermissions(value)}
                className="flex"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="view" id="view" />
                  <Label htmlFor="view">View only</Label>
                </div>
                <div className="flex items-center space-x-2 ml-4">
                  <RadioGroupItem value="edit" id="edit" />
                  <Label htmlFor="edit">Can edit</Label>
                </div>
              </RadioGroup>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label>Link expires</Label>
            <Select 
              value={shareExpiry} 
              onValueChange={(value: '1day' | '7days' | '30days' | 'never') => setShareExpiry(value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select expiry" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1day">1 day</SelectItem>
                <SelectItem value="7days">7 days</SelectItem>
                <SelectItem value="30days">30 days</SelectItem>
                <SelectItem value="never">Never</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Password protection</Label>
              <Switch 
                id="password" 
                checked={sharePasswordEnabled} 
                onCheckedChange={setSharePasswordEnabled} 
              />
            </div>
            {sharePasswordEnabled && (
              <Input 
                placeholder="Enter password" 
                value={sharePassword} 
                onChange={(e) => setSharePassword(e.target.value)}
              />
            )}
          </div>
          
          <div className="space-y-2">
            <Label>Share with specific people</Label>
            <div className="flex items-center gap-2">
              <Input placeholder="Enter email addresses" />
              <Button variant="outline">
                <Plus className="h-4 w-4 mr-2" />
                Add
              </Button>
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setShowShareDialog(false)}>
            Cancel
          </Button>
          <Button onClick={() => {
            toast({
              title: "Link Shared",
              description: "Your file has been shared successfully",
            });
            setShowShareDialog(false);
          }}>
            Share
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>

    {/* Move Files Dialog */}
    <Dialog open={moveDialogOpen} onOpenChange={setMoveDialogOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Move {selectedFiles.length} file(s)</DialogTitle>
          <DialogDescription>
            Select a destination folder to move the selected files
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <div className="space-y-2">
            {files
              .filter(file => file.type === 'folder')
              .map(folder => (
                <div
                  key={folder.id}
                  className={`flex items-center gap-2 p-2 rounded-lg cursor-pointer hover:bg-muted/50 ${
                    selectedFolderForMove === folder.id ? 'bg-muted' : ''
                  }`}
                  onClick={() => setSelectedFolderForMove(folder.id)}
                >
                  <Folder className="h-4 w-4" />
                  <span>{folder.name}</span>
                </div>
              ))}
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setMoveDialogOpen(false)}>
            Cancel
          </Button>
          <Button 
            onClick={() => {
              if (!selectedFolderForMove) return;
              toast({
                title: "Files Moved",
                description: `${selectedFiles.length} file(s) moved successfully`,
              });
              setSelectedFiles([]);
              setMoveDialogOpen(false);
              setSelectedFolderForMove(null);
            }}
            disabled={!selectedFolderForMove || selectedFiles.length === 0}
          >
            Move Files
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>

    {/* Copy Files Dialog */}
    <Dialog open={copyDialogOpen} onOpenChange={setCopyDialogOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Copy {selectedFiles.length} file(s)</DialogTitle>
          <DialogDescription>
            Select a destination folder to copy the selected files
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <div className="space-y-2">
            {files
              .filter(file => file.type === 'folder')
              .map(folder => (
                <div
                  key={folder.id}
                  className={`flex items-center gap-2 p-2 rounded-lg cursor-pointer hover:bg-muted/50 ${
                    selectedFolderForMove === folder.id ? 'bg-muted' : ''
                  }`}
                  onClick={() => setSelectedFolderForMove(folder.id)}
                >
                  <Folder className="h-4 w-4" />
                  <span>{folder.name}</span>
                </div>
              ))}
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setCopyDialogOpen(false)}>
            Cancel
          </Button>
          <Button 
            onClick={() => {
              if (!selectedFolderForMove) return;
              toast({
                title: "Files Copied",
                description: `${selectedFiles.length} file(s) copied successfully`,
              });
              setSelectedFiles([]);
              setCopyDialogOpen(false);
              setSelectedFolderForMove(null);
            }}
            disabled={!selectedFolderForMove || selectedFiles.length === 0}
          >
            Copy Files
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>

    {/* Storage Sync Dialog */}
    <Dialog open={syncDialogOpen} onOpenChange={setSyncDialogOpen}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Storage Integration</DialogTitle>
          <DialogDescription>
            Connect and sync your files from other storage services
          </DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
          {storageServices.map((service) => (
            <div
              key={service.id}
              className={`p-4 rounded-lg border ${
                service.connected ? 'border-primary' : 'border-border'
              } hover:bg-muted/50 transition-colors`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <service.icon className="h-6 w-6 text-primary" />
                  <div>
                    <h4 className="font-medium">{service.name}</h4>
                    <p className="text-sm text-muted-foreground">
                      {service.connected ? 'Connected' : 'Not connected'}
                    </p>
                  </div>
                </div>
                {service.connected ? (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleSync(service.id)}
                    disabled={syncInProgress && selectedStorageService === service.id}
                  >
                    {syncInProgress && selectedStorageService === service.id ? (
                      <>
                        <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                        Syncing...
                      </>
                    ) : (
                      <>
                        <FolderSync className="h-4 w-4 mr-2" />
                        Sync Now
                      </>
                    )}
                  </Button>
                ) : (
                  <Button
                    variant="default"
                    size="sm"
                    onClick={() => handleConnectStorage(service.id)}
                  >
                    <UploadCloud className="h-4 w-4 mr-2" />
                    Connect
                  </Button>
                )}
              </div>
              {service.connected && service.lastSync && (
                <p className="text-xs text-muted-foreground">
                  Last synced: {formatTimeAgo(service.lastSync)}
                </p>
              )}
              {service.id === 'local' && (
                <div className="mt-2">
                  <Input
                    type="file"
                    className="hidden"
                    id="local-folder-input"
                    // @ts-ignore
                    webkitdirectory=""
                    directory=""
                    multiple
                  />
                  <Label
                    htmlFor="local-folder-input"
                    className="text-sm text-muted-foreground hover:text-foreground cursor-pointer"
                  >
                    Select folders to sync
                  </Label>
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="flex flex-col gap-2 mt-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Settings2 className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">Sync Settings</span>
            </div>
            <Switch id="auto-sync" />
          </div>
          <Label htmlFor="auto-sync" className="text-sm text-muted-foreground">
            Enable automatic synchronization
          </Label>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setSyncDialogOpen(false)}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>

    {/* Storage Sync Dialog */}
    <Dialog open={showUploadDialog} onOpenChange={setShowUploadDialog}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Upload Files</DialogTitle>
          <DialogDescription>
            Select files from your computer to upload
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <div className="space-y-4">
            <div className="flex items-center justify-center w-full">
              <label
                htmlFor="file-upload"
                className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-muted/50 hover:bg-muted"
              >
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <Upload className="h-8 w-8 mb-2 text-muted-foreground" />
                  <p className="mb-2 text-sm text-muted-foreground">
                    <span className="font-semibold">Click to upload</span> or drag and drop
                  </p>
                  <p className="text-xs text-muted-foreground">Any file type up to 10MB</p>
                </div>
                <input
                  id="file-upload"
                  type="file"
                  className="hidden"
                  multiple
                  ref={fileInputRef}
                  onChange={handleFileUpload}
                />
              </label>
            </div>
            {uploadProgress > 0 && (
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>Uploading...</span>
                  <span>{uploadProgress}%</span>
                </div>
                <Progress value={uploadProgress} className="h-2" />
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>

    {/* New Folder Dialog */}
    <Dialog open={showNewFolderDialog} onOpenChange={setShowNewFolderDialog}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create New Folder</DialogTitle>
          <DialogDescription>
            Enter a name for your new folder
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="folder-name">Folder Name</Label>
              <Input
                id="folder-name"
                placeholder="Enter folder name"
                value={newFolderName}
                onChange={(e) => setNewFolderName(e.target.value)}
              />
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setShowNewFolderDialog(false)}>
            Cancel
          </Button>
          <Button onClick={handleCreateFolder} disabled={!newFolderName.trim()}>
            Create Folder
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
    </>
  );
};

export default CloudStorage;
