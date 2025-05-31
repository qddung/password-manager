import { WalletOutlined, GoogleOutlined, InfoCircleOutlined, TwitchOutlined } from '@ant-design/icons';
import { Button, Card, Space, Typography } from 'antd';
import styled from 'styled-components';
import { GoogleOAuthProvider } from '@react-oauth/google';
// import { SuiClient, getFullnodeUrl } from "@mysten/sui/client";

// import { decodeSuiPrivateKey } from "@mysten/sui/cryptography";
// import { Ed25519Keypair } from "@mysten/sui/keypairs/ed25519";
// import { Transaction } from "@mysten/sui/transactions";
// import {
//     genAddressSeed,
//     generateNonce,
//     generateRandomness,
//     getExtendedEphemeralPublicKey,
//     getZkLoginSignature,
//     jwtToAddress,
// } from "@mysten/zklogin";
// import { NetworkName, makePolymediaUrl, requestSuiFromFaucet, shortenSuiAddress } from "@polymedia/suitcase-core";
// import { LinkExternal, Modal, isLocalhost } from "@polymedia/suitcase-react";
// import { jwtDecode } from "jwt-decode";
// import { useEffect, useRef, useState } from "react";





// const NETWORK: NetworkName = "devnet";
// const MAX_EPOCH = 2; // keep ephemeral keys active for this many Sui epochs from now (1 epoch ~= 24h)

// const suiClient = new SuiClient({
//     url: getFullnodeUrl(NETWORK),
// });

// /* Session storage keys */

// const setupDataKey = "zklogin-demo.setup";
// const accountDataKey = "zklogin-demo.accounts";

// /* Types */

// type OpenIdProvider = "Google";

// type SetupData = {
//     provider: OpenIdProvider;
//     maxEpoch: number;
//     randomness: string;
//     ephemeralPrivateKey: string;
// };

// type AccountData = {
//     provider: OpenIdProvider;
//     userAddr: string;
//     zkProofs: any;
//     ephemeralPrivateKey: string;
//     userSalt: string;
//     sub: string;
//     aud: string;
//     maxEpoch: number;
// };




const { Title, Text } = Typography;

const Wrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    padding: 20px;
    box-sizing: border-box;
`;

const StyledCard = styled(Card)`
    width: 100%;
    max-width: 400px;
    background-color: #282828;
    border-radius: 8px;
    border-color: #404040;

    .ant-card-body {
        padding: 30px;
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