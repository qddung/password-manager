import { WalletOutlined, GoogleOutlined, InfoCircleOutlined, TwitchOutlined } from '@ant-design/icons';
import { Button, Card, Space, Typography } from 'antd';
import styled from 'styled-components';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { theme } from '@/ultils/theme';

const { Title, Text } = Typography;

const Wrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    padding: ${theme.spacing.paddingContainer};
    box-sizing: border-box;
    background-color: ${theme.colors.bg};
`;

const StyledCard = styled(Card)`
    width: 100%;
    max-width: 400px;
    background-color: ${theme.colors.black};
    border-radius: ${theme.borderRadius.small};
    border-color: ${theme.colors.purple};

    .ant-card-body {
        padding: ${theme.spacing.paddingMed};
    }

    .app-title {
        color: ${theme.colors.pink};
        font-weight: ${theme.fontWeight.bold};
    }

    .ant-typography {
        color: ${theme.colors.white};
    }

    .ant-btn-primary {
        background-color: ${theme.colors.purple};
        border-color: ${theme.colors.purple};
        
        &:hover {
            background-color: ${theme.colors.pink};
            border-color: ${theme.colors.pink};
        }
    }

    .ant-btn-circle {
        background-color: ${theme.colors.black};
        border-color: ${theme.colors.purple};
        color: ${theme.colors.white};

        &:hover {
            background-color: ${theme.colors.purple};
            border-color: ${theme.colors.purple};
            color: ${theme.colors.white};
        }
    }

    a {
        color: ${theme.colors.pink};
        
        &:hover {
            color: ${theme.colors.purple};
        }
    }
`;

export default function Connect() {
    return (
        <Wrapper>
            <StyledCard className="connect-card">
                <Space direction="vertical" size="large" align="center" style={{ width: '100%' }}>
                    {/* Replace with your logo or app title */}
                    <Title level={2} className="app-title">Tusky</Title>

                    <Title level={4}>Connect</Title>

                    <Button type="primary" size="large" icon={<WalletOutlined />} block>
                        Select Sui wallet
                    </Button>

                    <Text type="secondary">Or connect with</Text>

                    <Space size="middle">
                        {/* Google Connect Button - requires GoogleOAuthProvider setup */}
                         <GoogleOAuthProvider clientId="<your_client_id>">
                            <Button shape="circle" size="large" icon={<GoogleOutlined />} />
                         </GoogleOAuthProvider>
                        {/* Twitch Connect Button - add if needed and set up authentication */}
                         {/* <Button shape="circle" size="large" icon={<TwitchOutlined />} /> */}
                    </Space>

                    <Space align="start" style={{ width: '100%' }}>
                        <InfoCircleOutlined style={{ color: 'rgba(255, 255, 255, 0.5)' }} />
                        <Text type="secondary" style={{ fontSize: '0.8em' }}>
                            By connecting, you agree to our <a href="#">Terms</a> and <a href="#">Privacy Policy</a>
                        </Text>
                    </Space>
                </Space>
            </StyledCard>
        </Wrapper>
    );
}