import React, { useState, useEffect } from 'react';
import mockAPI from '@/ultils/walrus';
import { theme } from '@/ultils/theme';
import {
    Layout,
    Upload,
    Button,
    Card,
    List,
    Modal,
    Form,
    Input,
    Select,
    Space,
    Typography,
    Tag,
    Avatar,
    Tooltip,
    Progress,
    notification,
    Spin,
    Alert,
    Divider,
    Badge
} from 'antd';
import {
    UploadOutlined,
    FileOutlined,
    ShareAltOutlined,
    LockOutlined,
    UnlockOutlined,
    EyeOutlined,
    DownloadOutlined,
    DeleteOutlined,
    SafetyOutlined,
    CloudUploadOutlined,
    KeyOutlined
} from '@ant-design/icons';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

const { Header, Content, Sider } = Layout;
const { Title, Text, Paragraph } = Typography;
const { Option } = Select;

// Mock API functions (replace with actual blockchain integrations)


interface Document {
    id: string;
    name: string;
    size: number;
    uploadDate: string;
    walrusHash: string;
    encryptedId: string;
    contractAddress: string;
    isEncrypted: boolean;
    accessLevel: 'public' | 'private' | 'restricted';
    sharedWith: string[];
    owner: string;
}

const DecentralizedDocumentPlatform: React.FC = () => {
    const [documents, setDocuments] = useState<Document[]>([]);
    const [selectedDoc, setSelectedDoc] = useState<Document | null>(null);
    const [uploadModalVisible, setUploadModalVisible] = useState(false);
    const [shareModalVisible, setShareModalVisible] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [currentUser] = useState('0x1234...5678'); // Mock user address
    const [uploadProgress, setUploadProgress] = useState(0);

    const queryClient = useQueryClient();

    // Mock documents data
    useEffect(() => {
        const mockDocs: Document[] = [
            {
                id: '1',
                name: 'Confidential Report.pdf',
                size: 2048000,
                uploadDate: '2024-03-15',
                walrusHash: '0xabc123...',
                encryptedId: 'seal_encrypted_1',
                contractAddress: '0xdef456...',
                isEncrypted: true,
                accessLevel: 'private',
                sharedWith: ['0x9876...1234'],
                owner: currentUser
            },
            {
                id: '2',
                name: 'Public Whitepaper.pdf',
                size: 1024000,
                uploadDate: '2024-03-14',
                walrusHash: '0x789xyz...',
                encryptedId: 'seal_encrypted_2',
                contractAddress: '0x123abc...',
                isEncrypted: false,
                accessLevel: 'public',
                sharedWith: [],
                owner: currentUser
            }
        ];
        setDocuments(mockDocs);
    }, [currentUser]);

    const uploadMutation = useMutation({
        mutationFn: async (file: File) => {
            setUploadProgress(10);

            // Step 1: Upload to Walrus
            const walrusResult = await mockAPI.uploadToWalrus(file);
            setUploadProgress(40);

            // Step 2: Encrypt with Seal
            const sealResult = await mockAPI.encryptWithSeal(walrusResult.id);
            setUploadProgress(70);

            // Step 3: Deploy to Sui
            const suiResult = await mockAPI.deployToSui(sealResult.encryptedId, {
                accessLevel: 'private',
                owner: currentUser
            });
            setUploadProgress(100);

            return {
                ...walrusResult,
                ...sealResult,
                ...suiResult,
                file
            };
        },
        onSuccess: (result) => {
            const newDoc: Document = {
                id: result.id,
                name: result.file.name,
                size: result.file.size,
                uploadDate: new Date().toISOString().split('T')[0],
                walrusHash: result.hash,
                encryptedId: result.encryptedId,
                contractAddress: result.contractAddress,
                isEncrypted: true,
                accessLevel: 'private',
                sharedWith: [],
                owner: currentUser
            };

            setDocuments(prev => [...prev, newDoc]);
            notification.success({
                message: 'Upload Successful',
                description: 'Document has been securely uploaded and encrypted!'
            });
            setUploadModalVisible(false);
            setUploadProgress(0);
        },
        onError: () => {
            notification.error({
                message: 'Upload Failed',
                description: 'Failed to upload document. Please try again.'
            });
            setUploadProgress(0);
        }
    });

    const verifyAccessMutation = useMutation({
        mutationFn: async (doc: Document) => {
            return await mockAPI.verifyWithNautilus(doc.contractAddress, currentUser);
        },
        onSuccess: (hasAccess, doc) => {
            if (hasAccess) {
                notification.success({
                    message: 'Access Verified',
                    description: 'You have permission to access this document.'
                });
                // Simulate document download/view
            } else {
                notification.error({
                    message: 'Access Denied',
                    description: 'You do not have permission to access this document.'
                });
            }
        }
    });

    const handleUpload = async (file: File) => {
        setUploading(true);
        try {
            await uploadMutation.mutateAsync(file);
        } finally {
            setUploading(false);
        }
    };

    const handleShare = (doc: Document, addresses: string[]) => {
        const updatedDoc = { ...doc, sharedWith: addresses };
        setDocuments(prev => prev.map(d => d.id === doc.id ? updatedDoc : d));
        notification.success({
            message: 'Document Shared',
            description: `Document shared with ${addresses.length} address(es)`
        });
        setShareModalVisible(false);
    };

    const formatFileSize = (bytes: number) => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    };

    const getAccessLevelColor = (level: string) => {
        switch (level) {
            case 'public': return 'green';
            case 'private': return 'red';
            case 'restricted': return 'orange';
            default: return 'default';
        }
    };

    const listNoti = [
        {
            name: "Walrus Storage",
            desc: "Decentralized file storage",
            icon: <CloudUploadOutlined style={{ color: theme.colors.pink, fontSize: '20px' }} />
        },
        {
            name: "Seal Encryption",
            desc: "End-to-end encryption",
            icon: <LockOutlined style={{ color: theme.colors.purple, fontSize: '20px' }} />
        },
        {
            name: "Sui Contracts",
            desc: "Smart contract sharing",
            icon: <ShareAltOutlined style={{ color: theme.colors.cream, fontSize: '20px' }} />
        },
        {
            name: "Nautilus Verify",
            desc: "Access verification",
            icon: <KeyOutlined style={{ color: theme.colors.pink, fontSize: '20px' }} />
        }
    ];

    return (
        <Layout style={{ minHeight: '100vh', background: theme.colors.bg }}>
            <Header style={{
                background: 'rgba(13, 13, 13, 0.8)',
                backdropFilter: 'blur(10px)',
                border: 'none',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
            }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Title level={3} style={{ color: theme.colors.white, margin: 0 }}>
                        <SafetyOutlined style={{ marginRight: theme.spacing.gapMini, color: theme.colors.pink }} />
                        SecureVault
                    </Title>
                    <Space>
                        <Button
                            type="primary"
                            icon={<UploadOutlined />}
                            onClick={() => setUploadModalVisible(true)}
                            style={{
                                background: theme.colors.purple,
                                border: 'none',
                                backdropFilter: 'blur(10px)'
                            }}
                        >
                            Upload Document
                        </Button>
                        <Avatar style={{ backgroundColor: theme.colors.pink }}>
                            {currentUser.slice(2, 4).toUpperCase()}
                        </Avatar>
                    </Space>
                </div>
            </Header>

            <Layout>
                <Sider
                    width={300}
                    style={{
                        background: 'rgba(13, 13, 13, 0.8)',
                        backdropFilter: 'blur(10px)',
                        borderRight: `1px solid ${theme.colors.purple}`
                    }}
                >
                    <div style={{ padding: theme.spacing.paddingMed }}>
                        <Title level={4} style={{ color: theme.colors.white, marginBottom: theme.spacing.gapMed }}>
                            Platform Features
                        </Title>
                        <Space direction="vertical" size="middle" style={{ width: '100%' }}>
                            {listNoti.map(i => (
                                <Card key={i.name} size="small"
                                    style={{ 
                                        background: 'rgba(120, 44, 218, 0.08)', 
                                        border: `1px solid ${theme.colors.purple}`,
                                        borderRadius: theme.borderRadius.small
                                    }}>
                                    <Space>
                                        {i.icon}
                                        <div>
                                            <Text strong style={{ color: theme.colors.white }}>{i.name}</Text>
                                            <br />
                                            <Text style={{ color: theme.colors.accessibleDarkGrey, fontSize: '12px' }}>
                                                {i.desc}
                                            </Text>
                                        </div>
                                    </Space>
                                </Card>
                            ))}
                        </Space>
                    </div>
                </Sider>

                <Content style={{ padding: theme.spacing.paddingMed, background: theme.colors.grey1 }}>
                    <Card
                        title={
                            <Space>
                                <FileOutlined style={{ color: theme.colors.pink }} />
                                <span style={{ color: theme.colors.white }}>My Documents</span>
                                <Badge count={documents.length} style={{ backgroundColor: theme.colors.purple }} />
                            </Space>
                        }
                        style={{
                            background: 'rgba(13, 13, 13, 0.8)',
                            backdropFilter: 'blur(10px)',
                            borderRadius: theme.borderRadius.small,
                            border: `1px solid ${theme.colors.purple}`,
                            boxShadow: '0 8px 32px rgba(0,0,0,0.1)'
                        }}
                    >
                        <List
                            itemLayout="horizontal"
                            dataSource={documents}
                            renderItem={(doc) => (
                                <List.Item
                                    actions={[
                                        <Tooltip title="View Document">
                                            <Button
                                                type="text"
                                                icon={<EyeOutlined style={{ color: theme.colors.pink }} />}
                                                onClick={() => verifyAccessMutation.mutate(doc)}
                                                loading={verifyAccessMutation.isPending}
                                            />
                                        </Tooltip>,
                                        <Tooltip title="Share Document">
                                            <Button
                                                type="text"
                                                icon={<ShareAltOutlined style={{ color: theme.colors.purple }} />}
                                                onClick={() => {
                                                    setSelectedDoc(doc);
                                                    setShareModalVisible(true);
                                                }}
                                            />
                                        </Tooltip>,
                                        <Tooltip title="Download">
                                            <Button 
                                                type="text" 
                                                icon={<DownloadOutlined style={{ color: theme.colors.cream }} />} 
                                            />
                                        </Tooltip>
                                    ]}
                                    style={{
                                        padding: theme.spacing.paddingSmall,
                                        marginBottom: theme.spacing.gapMini,
                                        background: doc.isEncrypted ? 'rgba(120, 44, 218, 0.08)' : 'rgba(255, 151, 213, 0.08)',
                                        borderRadius: theme.borderRadius.small,
                                        border: `1px solid ${doc.isEncrypted ? theme.colors.purple : theme.colors.pink}`
                                    }}
                                >
                                    <List.Item.Meta
                                        avatar={
                                            <Avatar
                                                icon={doc.isEncrypted ? <LockOutlined /> : <UnlockOutlined />}
                                                style={{
                                                    backgroundColor: doc.isEncrypted ? theme.colors.purple : theme.colors.pink
                                                }}
                                            />
                                        }
                                        title={
                                            <Space>
                                                <Text strong style={{ color: theme.colors.white }}>{doc.name}</Text>
                                                <Tag color={getAccessLevelColor(doc.accessLevel)}>
                                                    {doc.accessLevel.toUpperCase()}
                                                </Tag>
                                                {doc.isEncrypted && <Tag color={theme.colors.purple}>ENCRYPTED</Tag>}
                                            </Space>
                                        }
                                        description={
                                            <Space direction="vertical" size="small">
                                                <Text style={{ color: theme.colors.accessibleDarkGrey }}>
                                                    Size: {formatFileSize(doc.size)} • Uploaded: {doc.uploadDate}
                                                </Text>
                                                <Text style={{ color: theme.colors.accessibleDarkGrey, fontSize: '12px' }}>
                                                    Walrus: {doc.walrusHash} • Contract: {doc.contractAddress}
                                                </Text>
                                                {doc.sharedWith.length > 0 && (
                                                    <Text style={{ color: theme.colors.accessibleDarkGrey }}>
                                                        Shared with {doc.sharedWith.length} address(es)
                                                    </Text>
                                                )}
                                            </Space>
                                        }
                                    />
                                </List.Item>
                            )}
                        />
                    </Card>
                </Content>
            </Layout>

            {/* Upload Modal */}
            <Modal
                title="Upload Secure Document"
                open={uploadModalVisible}
                onCancel={() => setUploadModalVisible(false)}
                footer={null}
                width={500}
                style={{ 
                    background: theme.colors.black,
                    borderRadius: theme.borderRadius.small
                }}
            >
                <Space direction="vertical" size="large" style={{ width: '100%' }}>
                    <Alert
                        message="Secure Upload Process"
                        description="Your document will be uploaded to Walrus, encrypted with Seal, and deployed as a Sui smart contract for secure sharing."
                        type="info"
                        showIcon
                        style={{
                            background: 'rgba(120, 44, 218, 0.08)',
                            border: `1px solid ${theme.colors.purple}`
                        }}
                    />

                    <Upload.Dragger
                        multiple={false}
                        beforeUpload={(file) => {
                            handleUpload(file);
                            return false;
                        }}
                        disabled={uploading}
                        style={{
                            background: 'rgba(13, 13, 13, 0.8)',
                            border: `1px solid ${theme.colors.purple}`
                        }}
                    >
                        <p className="ant-upload-drag-icon">
                            <CloudUploadOutlined style={{ color: theme.colors.pink, fontSize: '24px' }} />
                        </p>
                        <p className="ant-upload-text" style={{ color: theme.colors.white }}>
                            Click or drag file to this area to upload
                        </p>
                        <p className="ant-upload-hint" style={{ color: theme.colors.accessibleDarkGrey }}>
                            Files will be automatically encrypted and stored securely
                        </p>
                    </Upload.Dragger>

                    {uploading && (
                        <Space direction="vertical" style={{ width: '100%' }}>
                            <Progress
                                percent={uploadProgress}
                                status={uploadProgress === 100 ? "success" : "active"}
                                strokeColor={{
                                    '0%': theme.colors.purple,
                                    '100%': theme.colors.pink,
                                }}
                            />
                            <Text style={{ color: theme.colors.accessibleDarkGrey }}>
                                {uploadProgress < 40 && "Uploading to Walrus..."}
                                {uploadProgress >= 40 && uploadProgress < 70 && "Encrypting with Seal..."}
                                {uploadProgress >= 70 && uploadProgress < 100 && "Deploying to Sui..."}
                                {uploadProgress === 100 && "Upload complete!"}
                            </Text>
                        </Space>
                    )}
                </Space>
            </Modal>

            {/* Share Modal */}
            <Modal
                title="Share Document"
                open={shareModalVisible}
                onCancel={() => setShareModalVisible(false)}
                onOk={() => {
                    setShareModalVisible(false);
                }}
                style={{ 
                    background: theme.colors.black,
                    borderRadius: theme.borderRadius.small
                }}
            >
                {selectedDoc && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: theme.spacing.gapMed }}>
                        <div>
                            <Text strong style={{ display: 'block', marginBottom: theme.spacing.gapMini, color: theme.colors.white }}>
                                Document:
                            </Text>
                            <Text style={{ color: theme.colors.accessibleDarkGrey }}>{selectedDoc.name}</Text>
                        </div>

                        <div>
                            <Text strong style={{ display: 'block', marginBottom: theme.spacing.gapMini, color: theme.colors.white }}>
                                Share with addresses:
                            </Text>
                            <Select
                                mode="tags"
                                placeholder="Enter wallet addresses"
                                style={{ width: '100%' }}
                                onChange={(values) => {
                                    // Handle address selection
                                }}
                            >
                                <Option value="0x1234567890abcdef">0x1234567890abcdef</Option>
                                <Option value="0xfedcba0987654321">0xfedcba0987654321</Option>
                            </Select>
                        </div>

                        <div>
                            <Text strong style={{ display: 'block', marginBottom: theme.spacing.gapMini, color: theme.colors.white }}>
                                Access Level:
                            </Text>
                            <Select defaultValue={selectedDoc.accessLevel} style={{ width: '100%' }}>
                                <Option value="public">Public</Option>
                                <Option value="private">Private</Option>
                                <Option value="restricted">Restricted</Option>
                            </Select>
                        </div>
                    </div>
                )}
            </Modal>
        </Layout>
    );
};

export default DecentralizedDocumentPlatform;