import React, { useState, useEffect } from 'react';
import { Layout, Tabs, notification, Space } from 'antd';
import { 
    UploadOutlined,
    FileOutlined,
    UserOutlined
} from '@ant-design/icons';
import { theme } from '@/ultils/theme';

// Components
import WalletConnect from './components/WalletConnect';
import Header from './components/Header';
import UploadSection from './components/UploadSection';
import DocumentList from './components/DocumentList';
import SharedDocuments from './components/SharedDocuments';
import WalrusApi from '@/ultils/walrus';

const { Content } = Layout;
const { TabPane } = Tabs;

// TypeScript interfaces
interface Document {
    id: string;
    name: string;
    size: string;
    uploadDate: string;
    walrusBlobId: string;
    encryptionStatus: 'encrypted' | 'unencrypted';
    accessPolicy: 'public' | 'private' | 'nft' | 'payment';
    shares: number;
    views: number;
}

const SecureDocumentPlatform: React.FC = () => {
    const [walletConnected, setWalletConnected] = useState<boolean>(false);
    const [userAddress, setUserAddress] = useState<string>('');
    const [documents, setDocuments] = useState<Document[]>([]);
    const [activeTab, setActiveTab] = useState<string>('upload');
    const [loading, setLoading] = useState<boolean>(false);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [accessPolicy, setAccessPolicy] = useState<'public' | 'private' | 'nft' | 'payment'>('public');
    const [shareAddress, setShareAddress] = useState<string>('');

    // Mock data for demonstration
    const mockDocuments: Document[] = [
        {
            id: 'doc1',
            name: 'Confidential_Report.pdf',
            size: '2.4 MB',
            uploadDate: '2025-05-30',
            walrusBlobId: '0x1a2b3c...',
            encryptionStatus: 'encrypted',
            accessPolicy: 'private',
            shares: 3,
            views: 12
        },
        {
            id: 'doc2', 
            name: 'Public_Whitepaper.pdf',
            size: '1.8 MB',
            uploadDate: '2025-05-29',
            walrusBlobId: '0x4d5e6f...',
            encryptionStatus: 'encrypted',
            accessPolicy: 'public',
            shares: 15,
            views: 47
        }
    ];

    useEffect(() => {
        if (walletConnected) {
            setDocuments(mockDocuments);
        }
    }, [walletConnected]);

    const showNotification = (message: string, type: 'success' | 'error' | 'info' = 'info'): void => {
        notification[type]({
            message: 'SecureShare',
            description: message,
            placement: 'topRight',
            duration: 4
        });
    };

    const connectWallet = async (): Promise<void> => {
        setLoading(true);
        try {
            // Simulate Nautilus wallet connection
            await new Promise(resolve => setTimeout(resolve, 2000));
            setWalletConnected(true);
            setUserAddress('0xabcd1234...ef56789a');
            showNotification('Nautilus wallet connected successfully!', 'success');
        } catch (error) {
            showNotification('Failed to connect wallet. Please try again.', 'error');
        }
        setLoading(false);
    };

    const handleFileUpload = (file: File): boolean => {
        if (file.size > 10 * 1024 * 1024) { // 10MB limit
            showNotification('File size must be less than 10MB', 'error');
            return false;
        }
        setSelectedFile(file);
        showNotification(`Selected: ${file.name}`, 'info');
        return false; // Prevent default upload
    };

    const uploadDocument = async (): Promise<void> => {
        if (!selectedFile) {
            showNotification('Please select a file first', 'error');
            return;
        }
        WalrusApi
        setLoading(true);
        try {
            // Step 1: Encrypt with SEAL
            showNotification('Encrypting document with SEAL...', 'info');
            await new Promise(resolve => setTimeout(resolve, 2000));

            // Step 2: Upload to Walrus
            showNotification('Uploading to Walrus storage...', 'info');
            await new Promise(resolve => setTimeout(resolve, 2000));

            // Step 3: Create Sui smart contract
            showNotification('Creating access control contract...', 'info');
            await new Promise(resolve => setTimeout(resolve, 1500));

            const newDoc: Document = {
                id: `doc${Date.now()}`,
                name: selectedFile.name,
                size: `${(selectedFile.size / 1024 / 1024).toFixed(1)} MB`,
                uploadDate: new Date().toISOString().split('T')[0],
                walrusBlobId: `0x${Math.random().toString(16).substr(2, 8)}...`,
                encryptionStatus: 'encrypted',
                accessPolicy: accessPolicy,
                shares: 0,
                views: 0
            };

            setDocuments(prev => [newDoc, ...prev]);
            setSelectedFile(null);
            setActiveTab('documents');
            showNotification('Document uploaded and secured successfully!', 'success');
        } catch (error) {
            showNotification('Upload failed. Please try again.', 'error');
        }
        setLoading(false);
    };

    const shareDocument = async (docId: string): Promise<void> => {
        if (!shareAddress.trim()) {
            showNotification('Please enter a valid Sui address', 'error');
            return;
        }

        setLoading(true);
        try {
            showNotification('Creating share link via Sui smart contract...', 'info');
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            setDocuments(prev => 
                prev.map(doc => 
                    doc.id === docId 
                        ? { ...doc, shares: doc.shares + 1 }
                        : doc
                )
            );
            
            setShareAddress('');
            showNotification('Document shared successfully!', 'success');
        } catch (error) {
            showNotification('Failed to share document', 'error');
        }
        setLoading(false);
    };

    // Wallet connection screen
    if (!walletConnected) {
        return <WalletConnect loading={loading} onConnect={connectWallet} />;
    }

    return (
        <Layout style={{ 
            minHeight: '100vh', 
            background: theme.colors.bg
        }}>
            <Header userAddress={userAddress} />

            <Content style={{ padding: theme.spacing.paddingMed }}>
                <div style={{ maxWidth: 1200, margin: '0 auto' }}>
                    <Tabs 
                        activeKey={activeTab} 
                        onChange={setActiveTab}
                        size="large"
                        style={{ marginBottom: theme.spacing.gapMed }}
                    >
                        <TabPane 
                            tab={
                                <Space style={{color: theme.colors.white}}>
                                    <UploadOutlined />
                                    Upload
                                </Space>
                            } 
                            key="upload"
                        >
                            <UploadSection
                                selectedFile={selectedFile}
                                accessPolicy={accessPolicy}
                                loading={loading}
                                onFileSelect={handleFileUpload}
                                onAccessPolicyChange={setAccessPolicy}
                                onUpload={uploadDocument}
                            />
                        </TabPane>

                        <TabPane 
                            tab={
                                <Space style={{color: theme.colors.white}}>
                                    <FileOutlined />
                                    My Documents ({documents.length})
                                </Space>
                            } 
                            key="documents"
                        >
                            <DocumentList
                                documents={documents}
                                loading={loading}
                                shareAddress={shareAddress}
                                onShareAddressChange={setShareAddress}
                                onShareDocument={shareDocument}
                            />
                        </TabPane>

                        <TabPane 
                            tab={
                                <Space style={{color: theme.colors.white}}>
                                    <UserOutlined />
                                    Shared with Me
                                </Space>
                            } 
                            key="shared"
                        >
                            <SharedDocuments />
                        </TabPane>
                    </Tabs>
                </div>
            </Content>
        </Layout>
    );
};

export default SecureDocumentPlatform;