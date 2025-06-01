import React from 'react';
import { Layout, Space, Typography, Badge } from 'antd';
import { SafetyCertificateOutlined } from '@ant-design/icons';
import { theme } from '@/ultils/theme';
import { ConnectButton } from '@mysten/dapp-kit';

const { Header: AntHeader } = Layout;
const { Title, Text } = Typography;

interface HeaderProps {
    userAddress: string;
}

const Header: React.FC<HeaderProps> = ({ userAddress }) => {
    return (
        <AntHeader style={{
            background: 'rgba(13, 13, 13, 0.8)',
            backdropFilter: 'blur(20px)',
            border: 'none',
            borderBottom: `1px solid ${theme.colors.purple}`
        }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Space>
                    <SafetyCertificateOutlined style={{ fontSize: '32px', color: theme.colors.pink }} />
                    <Title level={3} style={{ color: theme.colors.white, margin: 0 }}>
                        SecureShare
                    </Title>
                </Space>
                <Space>
                    <Text style={{ color: theme.colors.accessibleDarkGrey }}>
                        Connected: {userAddress}
                    </Text>
                    <Badge status="processing" />
                    
                    <ConnectButton />
                </Space>
            </div>
        </AntHeader>
    );
};

export default Header; 