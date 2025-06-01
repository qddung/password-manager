import React from 'react';
import { Card, Typography, Empty } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { theme } from '@/ultils/theme';

const { Title, Text } = Typography;

const SharedDocuments: React.FC = () => {
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
                <UserOutlined style={{ marginRight: theme.spacing.gapMini }} />
                Shared with Me
            </Title>
            
            <Empty
                image={<UserOutlined style={{ fontSize: '64px', color: theme.colors.grey1 }} />}
                description={
                    <Text style={{ color: theme.colors.accessibleDarkGrey }}>
                        No documents have been shared with you yet.
                    </Text>
                }
            />
        </Card>
    );
};

export default SharedDocuments; 