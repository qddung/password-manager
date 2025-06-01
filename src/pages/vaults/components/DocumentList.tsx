import React from 'react';
import { Card, List, Button, Space, Typography, Tag, Avatar, Divider, Row, Col, Statistic, Input } from 'antd';
import { 
    FileOutlined,
    EyeOutlined,
    DownloadOutlined,
    ShareAltOutlined,
    LockOutlined,
    ClockCircleOutlined
} from '@ant-design/icons';
import { theme } from '@/ultils/theme';

const { Title, Text } = Typography;

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

interface DocumentListProps {
    documents: Document[];
    loading: boolean;
    shareAddress: string;
    onShareAddressChange: (address: string) => void;
    onShareDocument: (docId: string) => void;
}

const DocumentList: React.FC<DocumentListProps> = ({
    documents,
    loading,
    shareAddress,
    onShareAddressChange,
    onShareDocument
}) => {
    const getAccessPolicyColor = (policy: string): string => {
        switch (policy) {
            case 'public': return 'green';
            case 'private': return 'red';
            case 'nft': return 'purple';
            case 'payment': return 'blue';
            default: return 'default';
        }
    };

    const getAccessPolicyIcon = (policy: string): React.ReactNode => {
        switch (policy) {
            case 'public': return <LockOutlined />;
            case 'private': return <LockOutlined />;
            case 'nft': return <LockOutlined />;
            case 'payment': return <LockOutlined />;
            default: return <LockOutlined />;
        }
    };

    return (
        <Card
            style={{
                background: 'rgba(13, 13, 13, 0.8)',
                backdropFilter: 'blur(20px)',
                border: `1px solid ${theme.colors.purple}`,
                borderRadius: theme.borderRadius.small
            }}
            bodyStyle={{ padding: theme.spacing.paddingMed }}
        >
            <Title level={3} style={{ color: theme.colors.white, marginBottom: theme.spacing.gapMed }}>
                <FileOutlined style={{ marginRight: theme.spacing.gapMini }} />
                My Documents ({documents.length})
            </Title>

            <List
                itemLayout="vertical"
                dataSource={documents}
                renderItem={(doc) => (
                    <List.Item
                        style={{
                            background: 'rgba(13, 13, 13, 0.8)',
                            border: `1px solid ${theme.colors.purple}`,
                            borderRadius: theme.borderRadius.small,
                            padding: theme.spacing.paddingMed,
                            marginBottom: theme.spacing.gapMini
                        }}
                        actions={[
                            <Button
                                type="text"
                                icon={<EyeOutlined />}
                                style={{ color: theme.colors.pink }}
                            >
                                View
                            </Button>,
                            <Button
                                type="text"
                                icon={<DownloadOutlined />}
                                style={{ color: theme.colors.cream }}
                            >
                                Download
                            </Button>,
                            <Button
                                type="text"
                                icon={<ShareAltOutlined />}
                                style={{ color: theme.colors.purple }}
                            >
                                Share
                            </Button>
                        ]}
                    >
                        <List.Item.Meta
                            avatar={
                                <Avatar 
                                    size={48}
                                    icon={<FileOutlined />}
                                    style={{ 
                                        background: `linear-gradient(135deg, ${theme.colors.purple} 0%, ${theme.colors.pink} 100%)`
                                    }}
                                />
                            }
                            title={
                                <Space>
                                    <Text strong style={{ color: theme.colors.white, fontSize: '16px' }}>
                                        {doc.name}
                                    </Text>
                                    <Tag 
                                        color={getAccessPolicyColor(doc.accessPolicy)}
                                        icon={getAccessPolicyIcon(doc.accessPolicy)}
                                    >
                                        {doc.accessPolicy.toUpperCase()}
                                    </Tag>
                                    <Tag color={theme.colors.purple} icon={<LockOutlined />}>
                                        ENCRYPTED
                                    </Tag>
                                </Space>
                            }
                            description={
                                <Space direction="vertical" size="small">
                                    <Space>
                                        <Text style={{ color: theme.colors.accessibleDarkGrey }}>
                                            Size: {doc.size}
                                        </Text>
                                        <Divider type="vertical" style={{ borderColor: theme.colors.grey1 }} />
                                        <Text style={{ color: theme.colors.accessibleDarkGrey }}>
                                            <ClockCircleOutlined style={{ marginRight: theme.spacing.gapMini }} />
                                            {doc.uploadDate}
                                        </Text>
                                    </Space>
                                    <Text style={{ color: theme.colors.accessibleDarkGrey, fontSize: '12px' }}>
                                        Walrus: {doc.walrusBlobId}
                                    </Text>
                                </Space>
                            }
                        />

                        <Row gutter={16} style={{ marginTop: theme.spacing.gapMed }}>
                            <Col>
                                <Statistic
                                    title={<Text style={{ color: theme.colors.accessibleDarkGrey }}>Views</Text>}
                                    value={doc.views}
                                    prefix={<EyeOutlined />}
                                    valueStyle={{ color: theme.colors.pink, fontSize: '16px' }}
                                />
                            </Col>
                            <Col>
                                <Statistic
                                    title={<Text style={{ color: theme.colors.accessibleDarkGrey }}>Shares</Text>}
                                    value={doc.shares}
                                    prefix={<ShareAltOutlined />}
                                    valueStyle={{ color: theme.colors.purple, fontSize: '16px' }}
                                />
                            </Col>
                        </Row>

                        <Divider style={{ borderColor: theme.colors.grey1 }} />

                        <Space.Compact style={{ width: '100%' }}>
                            <Input
                                placeholder="Enter Sui address to share with..."
                                value={shareAddress}
                                onChange={(e) => onShareAddressChange(e.target.value)}
                                style={{ 
                                    background: 'rgba(13, 13, 13, 0.8)',
                                    border: `1px solid ${theme.colors.purple}`,
                                    color: theme.colors.white
                                }}
                            />
                            <Button
                                type="primary"
                                onClick={() => onShareDocument(doc.id)}
                                loading={loading}
                                style={{
                                    background: `linear-gradient(90deg, ${theme.colors.cream} 0%, ${theme.colors.pink} 100%)`,
                                    border: 'none'
                                }}
                            >
                                Share
                            </Button>
                        </Space.Compact>
                    </List.Item>
                )}
            />
        </Card>
    );
};

export default DocumentList; 