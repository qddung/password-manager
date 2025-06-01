import React from 'react';
import { Card, Button, Space, Typography } from 'antd';
import { 
    SafetyCertificateOutlined,
    CloudUploadOutlined,
    LockOutlined,
    ShareAltOutlined,
    CheckCircleOutlined,
    WalletOutlined
} from '@ant-design/icons';
import { theme } from '@/ultils/theme';

const { Title, Paragraph } = Typography;

interface WalletConnectProps {
    loading: boolean;
    onConnect: () => void;
}

const WalletConnect: React.FC<WalletConnectProps> = ({ loading, onConnect }) => {
    return (
        <div style={{ 
            minHeight: '100vh', 
            background: theme.colors.bg,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: theme.spacing.paddingMed
        }}>
            <Card
                style={{ 
                    maxWidth: 480,
                    width: '100%',
                    background: 'rgba(13, 13, 13, 0.8)',
                    backdropFilter: 'blur(20px)',
                    border: `1px solid ${theme.colors.purple}`,
                    borderRadius: theme.borderRadius.medium
                }}
                bodyStyle={{ padding: theme.spacing.paddingLarge, textAlign: 'center' }}
            >
                <div style={{
                    width: 80,
                    height: 80,
                    background: `linear-gradient(135deg, ${theme.colors.purple} 0%, ${theme.colors.pink} 100%)`,
                    borderRadius: theme.borderRadius.small,
                    margin: '0 auto 24px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    <SafetyCertificateOutlined style={{ fontSize: '40px', color: theme.colors.white }} />
                </div>
                
                <Title level={2} style={{ color: theme.colors.white, marginBottom: theme.spacing.gapMini }}>
                    SecureShare
                </Title>
                <Paragraph style={{ color: theme.colors.accessibleDarkGrey, fontSize: '16px', marginBottom: theme.spacing.gapLarge }}>
                    Decentralized document storage with end-to-end encryption
                </Paragraph>
                
                <Space direction="vertical" size="large" style={{ width: '100%', marginBottom: theme.spacing.gapLarge }}>
                    <div style={{ display: 'flex', alignItems: 'center', color: theme.colors.white }}>
                        <CloudUploadOutlined style={{ fontSize: '20px', color: theme.colors.pink, marginRight: theme.spacing.gapMini }} />
                        <span>Upload to Walrus storage</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', color: theme.colors.white }}>
                        <LockOutlined style={{ fontSize: '20px', color: theme.colors.purple, marginRight: theme.spacing.gapMini }} />
                        <span>Encrypt with SEAL</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', color: theme.colors.white }}>
                        <ShareAltOutlined style={{ fontSize: '20px', color: theme.colors.cream, marginRight: theme.spacing.gapMini }} />
                        <span>Share via Sui smart contracts</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', color: theme.colors.white }}>
                        <CheckCircleOutlined style={{ fontSize: '20px', color: theme.colors.pink, marginRight: theme.spacing.gapMini }} />
                        <span>Verify access with Nautilus</span>
                    </div>
                </Space>

                <Button
                    type="primary"
                    size="large"
                    icon={<WalletOutlined />}
                    onClick={onConnect}
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
                    Connect Nautilus Wallet
                </Button>
            </Card>
        </div>
    );
};

export default WalletConnect; 