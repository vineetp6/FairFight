export const networks = [
    {
        name: "Hardhat",
        chainid: 31337,
        rpc: 'http://localhost:8545',
        currency: 'ETH',
        explorer: 'https://etherscan.io',
        contractAddress: '0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9',
        charactersAddress: '0xa513E6E4b8f2a923D98304ec87F64353C4D5C853',
        armorsAddress: '0x2279B7A0a67DB372996a5FaB50D91eAA73d2eBe6',
        bootsAddress: '0x8A791620dd6260079BF849Dc5567aDC3F2FdC318',
        weaponsAddress: '0x610178dA211FEF7D417bC0e6FeD39F05609AD788',
        shopAddress: '0xB7f8BC63BbcaD18155201308C8f3540b07f84F5e',
        lootboxAddress: '0x959922bE3CAee4b8Cd9a407cc3ac1C251C2007B1'
    },
    {
        name: "Ganache",
        chainid: 1337,
        rpc: 'http://localhost:7545',
        currency: 'ETH',
        explorer: '',
        contractAddress: '0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0'
    },
    {
        name: "Goerli",
        chainid: 5,
        rpc: 'https://goerli.infura.io/v3',
        currency: 'ETH',
        explorer: '',
        contractAddress: ''
    },
    {
        name: "Emerald Testnet",
        chainid: 42261,
        rpc: 'https://testnet.emerald.oasis.dev',
        currency: 'ROSE',
        explorer: '',
        contractAddress: '0x231d86b4A0280DcAA9De6282F784B374525e03c3'
    },
    {
        name: "SKALE Network Testnet",
        chainid: 344435,
        rpc: 'https://dev-testnet-v1-0.skalelabs.com',
        currency: 'sFUEL',
        explorer: '',
        contractAddress: ''
    },
    {
        name: "ScaleT",
        chainid: 1351057110,
        rpc: 'https://staging-v3.skalenodes.com/v1/staging-fast-active-bellatrix',
        currency: 'sFUEL',
        explorer: 'https://staging-fast-active-bellatrix.explorer.staging-v3.skalenodes.com',
        contractAddress: '0xB0993755B388c1223Da692A3F9622D7B7111E55e'
    },
    {
        name: "Sapphire Test",
        chainid: 23295,
        rpc: 'https://testnet.sapphire.oasis.dev',
        currency: 'ROSE',
        explorer: '',
        contractAddress: '0x64BB70e1e2f776D95dE00676D8332e6aD5217195'
    },
    {
        name: 'SKALE',
        chainid: 503129905,
        rpc: 'https://staging-v3.skalenodes.com/v1/staging-faint-slimy-achird',
        contractAddress: '0x176DC2E5cB86Ba5d7ee5819478bE1f4FA0931c54',
        charactersAddress: '0xD442C8b30eEeddD4cEf86Fe786D9b55BFAaFa9e6',
        armorsAddress: '0x927ebeff82ecEeaCD9a37014c60210413188f374',
        weaponsAddress: '0x8Aa1F3267da1099D51E461f95dcF32E9525675B7',
        bootsAddress: '0x2c9880C1dCFfa9ce105e0a586E35bf7e71f8ef95',
        shopAddress: '0xBB8072C0B33d919Fc4251B879c02a0538262855a',
        lootboxAddress: '0xBc62529CA6d837179B5a4a1d884698BE58b3FAE8',
        currency: 'sFUEL',
        explorer: 'https://staging-faint-slimy-achird.explorer.staging-v3.skalenodes.com'
    },
    {
        name: "BNB",
        chainid: 56,
        rpc: 'https://bsc-dataseed.binance.org',
        currency: 'BNB',
        explorer: 'https://bscscan.com',
        contractAddress: '0xd136b9EdC06E9d9464B22Efd78DE12b1B3d1C595',
        charactersAddress: '0x5Af0d7aDc8a73334dC82f51C97be2582b845bdC4',
        armorsAddress: '0xe10cd6c65af7637ad8329f0adb161a968101bf86',
        weaponsAddress: '0x03467ad8efe8bb73c0dde0c436b7efafe9fc3e32',
        bootsAddress: '0x2b9e270d12ba5ce62ece2c458db7b7b2939d19ae',
        shopAddress: '0xdf82b488053b2f183d959969141b9896ab8c1efa',
        lootboxAddress: '0xD705227BBd4f5D40b5E542E5d415813825ED72cf'
    },
    {
        name: "opBNB",
        chainid: 204,
        rpc: 'https://opbnb-mainnet-rpc.bnbchain.org',
        currency: 'BNB',
        explorer: 'http://opbnbscan.com',
        contractAddress: '0xd136b9EdC06E9d9464B22Efd78DE12b1B3d1C595',
        charactersAddress: '0x58e29cF81dBBE7bB358CA16ACdd9d1d7EAE92BD2',
        armorsAddress: '0x2784e030B259D6E79D5c33275296d478110129C0',
        weaponsAddress: '0x839B9aBc7d7FBF49C65B84753ff7aF11d22f0586',
        bootsAddress: '0x159d80fcFaC328Cb0400E1265F4c79138C4dD376',
        shopAddress: '0xe3D9c28e22f997eE3956C2fA839EA79cB214A76A',
        lootboxAddress: '0xDf82B488053b2F183D959969141B9896aB8C1efA'
    },
    {
        name: "Polygon",
        chainid: 137,
        rpc: 'https://polygon-rpc.com',
        currency: 'MATIC',
        explorer: 'https://polygonscan.com',
        contractAddress: '0x58e29cF81dBBE7bB358CA16ACdd9d1d7EAE92BD2',
        charactersAddress: '0xe10cd6c65Af7637ad8329f0Adb161A968101bF86',
        armorsAddress: '0x2B9e270d12bA5cE62ECe2c458db7b7B2939D19ae',
        weaponsAddress: '0xDf82B488053b2F183D959969141B9896aB8C1efA',
        bootsAddress: '0x03467ad8Efe8BB73c0Dde0c436b7efAfE9FC3E32',
        shopAddress: '0x685b4bEf612229F3f246Ca08fA7E8a6240c18d2A',
        lootboxAddress: '0xe1174A16c4d4075c512080585E5B132816010c33'
    },
    {
        name: "Bitfinity Testnet",
        chainid: 355113,
        rpc: 'https://testnet.bitfinity.network',
        currency: 'BFT',
        explorer: 'https://explorer.bitfinity.network/',
        contractAddress: '0x178A6106339c4B56ED9BaB7CD2CA55f83aED8137',
        charactersAddress: '0x2784e030B259D6E79D5c33275296d478110129C0',
        armorsAddress: '0x159d80fcFaC328Cb0400E1265F4c79138C4dD376',
        weaponsAddress: '0xe3D9c28e22f997eE3956C2fA839EA79cB214A76A',
        bootsAddress: '0x839B9aBc7d7FBF49C65B84753ff7aF11d22f0586',
        shopAddress: '0x5Af0d7aDc8a73334dC82f51C97be2582b845bdC4',
        lootboxAddress: '0xfa550EF42fb65aEDF52183129Ca9054D3552A77d'
    },
    {
        name: "Emerald",
        chainid: 42262,
        rpc: 'https://emerald.oasis.dev',
        currency: 'ROSE',
        explorer: 'https://explorer.emerald.oasis.dev',
        contractAddress: '0x87b8BAe3f9C64d53167Ebc560FD73D0899215241',
        charactersAddress: '0xe30E4153BcF8420BA7d3FFC28b2772D9Fdb1b82A',
        armorsAddress: '0xC651C073E8D2f3eE28a9d2E1ac96ecbC8a90CcCB',
        weaponsAddress: '0xBcd0534481daB584ae3D458d274FDD65d537cDb7',
        bootsAddress: '0x7E2e1812f8C2414da8D5Bfce9c8476B0C477543E',
        shopAddress: '0xF6bed30A1c8dfFe5a36f42489fd6be8156AdcCd7',
        lootboxAddress: '0x8E4c7cB32b6A454804E27743f119258d6A6D9Ae0'
    },
    {
        name: "Sapphire",
        chainid: 23294,
        rpc: 'https://sapphire.oasis.io',
        currency: 'ROSE',
        explorer: 'https://explorer.sapphire.oasis.io',
        contractAddress: '0x87b8BAe3f9C64d53167Ebc560FD73D0899215241',
        charactersAddress: '0x560Eb55F9f633368d378b059d7Fd32a5f7a914bE',
        armorsAddress: '0x1ee6037Fc30Fb21cf488181e5E4a0FF4803e8C18',
        weaponsAddress: '0x4c04Eb1518Fa7395E954A0d7b6afe1cB226a21c6',
        bootsAddress: '0xFF66c9aBBEE861D82C55658945E38DCC1A4780FC',
        shopAddress: '0xa32fF84560231318896150fa8E5079BE34DBdE90',
        lootboxAddress: '0x8CA15dCcc8d9e94c70dE8D709B9094A051198805'
    }
]