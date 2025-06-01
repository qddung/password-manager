import React from 'react';
import { Card, Upload, Button, Space, Typography, Select, Row, Col } from 'antd';
import { 
    UploadOutlined,
    KeyOutlined,
    LockOutlined,
    SafetyCertificateOutlined,
    CheckCircleOutlined
} from '@ant-design/icons';
import { theme } from '@/ultils/theme';

const { Title, Text } = Typography;
const { Option } = Select;
const { Dragger } = Upload;

interface UploadSectionProps {
    selectedFile: File | null;
    accessPolicy: 'public' | 'private' | 'nft' | 'payment';
    loading: boolean;
    onFileSelect: (file: File) => boolean;
    onAccessPolicyChange: (policy: 'public' | 'private' | 'nft' | 'payment') => void;
    onUpload: () => void;
}

const UploadSection: React.FC<UploadSectionProps> = ({
    selectedFile,
    accessPolicy,
    loading,
    onFileSelect,
    onAccessPolicyChange,
    onUpload
}) => {
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
                <UploadOutlined style={{ marginRight: theme.spacing.gapMini }} />
                Upload & Encrypt Document
            </Title>

            <Row gutter={[32, 32]}>
                <Col xs={24} md={12}>
                    <Space direction="vertical" size="large" style={{ width: '100%' }}>
                        <Dragger
                            beforeUpload={onFileSelect}
                            showUploadList={false}
                            accept=".pdf,.doc,.docx,.txt,.jpg,.png"
                            style={{
                                background: 'rgba(13, 13, 13, 0.8)',
                                border: `2px dashed ${theme.colors.purple}`,
                                borderRadius: theme.borderRadius.small
                            }}
                        >
                            <p className="ant-upload-drag-icon">
                                <UploadOutlined style={{ color: theme.colors.pink }} />
                            </p>
                            <p style={{ color: theme.colors.white, fontSize: '16px', margin: '8px 0' }}>
                                {selectedFile ? selectedFile.name : 'Click or drag file to upload'}
                            </p>
                            <p style={{ color: theme.colors.accessibleDarkGrey, fontSize: '14px' }}>
                                PDF, DOC, TXT, Images (Max 10MB)
                            </p>
                        </Dragger>

                        <div>
                            <Text style={{ color: theme.colors.white, display: 'block', marginBottom: theme.spacing.gapMini }}>
                                Access Policy
                            </Text>
                            <Select
                                value={accessPolicy}
                                onChange={onAccessPolicyChange}
                                style={{ width: '100%' }}
                                size="large"
                            >
                                <Option value="public">
                                    <Space>
                                        <LockOutlined />
                                        Public (Anyone can access)
                                    </Space>
                                </Option>
                                <Option value="private">
                                    <Space>
                                        <LockOutlined />
                                        Private (Only you)
                                    </Space>
                                </Option>
                                <Option value="nft">
                                    <Space>
                                        <SafetyCertificateOutlined />
                                        NFT Holders Only
                                    </Space>
                                </Option>
                                <Option value="payment">
                                    <Space>
                                        <KeyOutlined />
                                        Payment Required
                                    </Space>
                                </Option>
                            </Select>
                        </div>
                    </Space>
                </Col>

                <Col xs={24} md={12}>
                    <Space direction="vertical" size="large" style={{ width: '100%' }}>
                        <Card
                            size="small"
                            style={{
                                background: 'rgba(13, 13, 13, 0.8)',
                                border: `1px solid ${theme.colors.purple}`
                            }}
                        >
                            <Title level={5} style={{ color: theme.colors.white, marginBottom: theme.spacing.gapMed }}>
                                <KeyOutlined style={{ marginRight: theme.spacing.gapMini }} />
                                Security Features
                            </Title>
                            <Space direction="vertical" size="middle">
                                <div style={{ display: 'flex', alignItems: 'center', color: theme.colors.white }}>
                                    <LockOutlined style={{ color: theme.colors.purple, marginRight: theme.spacing.gapMini }} />
                                    <span>Client-side SEAL encryption</span>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', color: theme.colors.white }}>
                                    <SafetyCertificateOutlined style={{ color: theme.colors.pink, marginRight: theme.spacing.gapMini }} />
                                    <span>Threshold key management</span>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', color: theme.colors.white }}>
                                    <CheckCircleOutlined style={{ color: theme.colors.cream, marginRight: theme.spacing.gapMini }} />
                                    <span>Sui blockchain access control</span>
                                </div>
                            </Space>
                        </Card>

                        <Button
                            type="primary"
                            size="large"
                            icon={<SafetyCertificateOutlined />}
                            onClick={onUpload}
                            disabled={!selectedFile}
                            loading={loading}
                            style={{
                                width: '100%',
                                height: '48px',
                                background: `linear-gradient(135deg, ${theme.colors.purple} 0%, ${theme.colors.pink} 100%)`,
                                border: 'none',
                                borderRadius: theme.borderRadius.small,
                                fontSize: '16px',
                                fontWeight: theme.fontWeight.bold
                            }}
                        >
                            Encrypt & Upload
                        </Button>
                    </Space>
                </Col>
            </Row>
        </Card>
    );
};

export default UploadSection; 