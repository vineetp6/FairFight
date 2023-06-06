import express from 'express'
const server = express()
import path from 'path'
import pg from "pg"
import dotenv from 'dotenv'
dotenv.config()
import redis from "redis"
import ethers from "ethers"
import cors from "cors"
import cron from "node-cron"
import fetch from "node-fetch"
import { fileURLToPath } from 'url';
import { contractAbi, shopAbi, nftAbi, networks } from "./contract/contract.js"
import { airdropAddress, airdropAbi } from "./contract/airdrop.js"

// const provider = new ethers.providers.JsonRpcProvider("https://emerald.oasis.dev")
// const signer = new ethers.Wallet(process.env.PRIVATE_KEY_EMERALD, provider)
// const provider = new ethers.providers.JsonRpcProvider("http://127.0.0.1:8545/")
// const signer = new ethers.Wallet(process.env.PRIVATE_KEY_TEST, provider)
// const contract = new ethers.Contract(contractAddress, contractAbi, signer)
// const airdropContract = new ethers.Contract(airdropAddress, airdropAbi, signer)
const secondsInADay = 86400
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const redisClient = redis.createClient({
   socket: {
       host: 'localhost',
       port: 6379
   }
})

const pgClient = new pg.Client({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB
  })


const checkIfAddressIsNotNew = async (address) => {
    let timestamps = []
    let providerEthereum = new ethers.providers.EtherscanProvider("homestead")
    let providerOptimism = new ethers.providers.EtherscanProvider("optimism")
    let historyEthereum = await providerEthereum.getHistory(address)
    let historyOptimism = await providerOptimism.getHistory(address)
    timestamps.push(historyEthereum[0] !== undefined ? historyEthereum[0].timestamp: 0)
    timestamps.push(historyOptimism[0] !== undefined ? historyOptimism[0].timestamp: 0)
    let historyBinance = await fetch(
                `https://api.bscscan.com/api?module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&page=1&offset=10&sort=asc&apikey=${process.env.BSCSCAN_API_KEY}`
            ).then(res => res.json()).catch(err => {return {result: []}})
    let historyPolygon = await fetch(
                `https://api.polygonscan.com/api?module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&page=1&offset=10&sort=asc&apikey=${process.env.POLYGONSCAN_API_KEY}`
            ).then(res => res.json()).catch(err => {return {result: []}})
    timestamps = [
        ...timestamps, 
        ...historyBinance.result.map(v => parseInt(v.timeStamp)), 
        ...historyPolygon.result.map(v => parseInt(v.timeStamp))
    ]
    const timestamp = Math.min.apply(null, timestamps.filter(Boolean))
    if (timestamp !== Infinity) {
        const dateNow = Math.floor(Date.now() / 1000)
        return timestamp < (dateNow - 86400 * 30) //check if older than month
    } else {
        return false
    }
}

async function getAirDropSignature(address,typeOfWithdraw) {
    try {
        const isNotNew = await checkIfAddressIsNotNew(address)
        if (isNotNew) {
            const hashMessage = ethers.utils.solidityKeccak256(["uint160","uint160","string"], [airdropAddress, address, typeOfWithdraw])
            const sign = await signer.signMessage(ethers.utils.arrayify(hashMessage));
            const r = sign.substr(0, 66)
            const s = '0x' + sign.substr(66, 64);
            const v = parseInt("0x" + sign.substr(130,2));
            return {r, v, s}
        } else {
            return {r:'',v:'',s:''}
        }
    } catch (error) {
        console.error(error)
        return {r:'',v:'',s:''}
    }
}

async function sendTokensFirstTime(req, res) {
    try {
        const alreadyGetFirstTokens = await airdropContract.alreadyGetFirstTokens(req.query.address)
        if (alreadyGetFirstTokens === false) {
            const sign = await getAirDropSignature(req.query.address, 'first')
            if (sign.r === '', sign.v === '', sign.s === '') {
                res.status(403).send('Insufficient wallet tx history')
            } else {
                await airdropContract.withdrawFirstTime(req.query.address, sign.r, sign.v, sign.s)
                    .then((tx) => tx.wait())
                    .then(() => {res.status(200).send('Success')})
                    .catch((err) => {
                        console.log(err)
                        res.status(500).send('Not success')
                    })
            }
        } else {
            res.status(403).send('Already get first tokens')
        }
    } catch (error) {
        console.log(error)
    }
}

async function sendTokensSecondTime(req, res) {
    try {
        const alreadyGetPrizeTokens = await airdropContract.alreadyGetTokens(req.query.address)
        if (alreadyGetPrizeTokens === false) {
            const sign = await getAirDropSignature(req.query.address, 'second')
            if (sign.r === '', sign.v === '', sign.s === '') {
                res.status(403).send('Insufficient wallet tx history')
            } else {
                await airdropContract.withdraw(req.query.address, sign.r, sign.v, sign.s)
                    .then((tx) => tx.wait())
                    .then(() => {res.status(200).send('Success')})
                    .catch((err) => {
                        console.log(err)
                        if (err.error.reason && err.error.reason.includes('Not enough battles')) {
                            res.status(403).send('Not enough battles')
                        } else {
                            res.status(500).send('Not success')
                        }
                    })
            }
        } else {
            res.status(403).send('Already get prize tokens')
        }
    } catch (error) {
        console.log(error)
    }
}

// cron.schedule("6 6 6 * * *", async () => {
//     await createLeaderboard()
// }, {
//     timezone: 'Europe/Moscow'
// })

async function createLeaderboard() {
    try {
        console.log('Start creating leaderboard')
        await pgClient.query('DELETE FROM leaderboard')
        let lastID = 0
        const resID = await pgClient.query(
            'SELECT MAX(gameid) FROM statistics'
        )
        if (resID.rows.length === 0) {
            return;
        } else {
            lastID = resID.rows[0].max
        }
        const chunkSize = 10
        let allBattlesWeek = []
        let allBattlesMonth = []
        const unixDateNow = Math.floor(Date.now() / 1000)
        const unixDateLastWeek = unixDateNow - 7*secondsInADay
        const unixDateLastMonth = unixDateNow - 30*secondsInADay
        for (let i = 0; i < (lastID / chunkSize); i++) {
            try {
                const chunk = await contract.getChunkFinishedBattles(i, chunkSize)
                allBattlesWeek = [...allBattlesWeek, ...(chunk.filter(v => parseInt(v.finishTime) > unixDateLastWeek))]
                allBattlesMonth = [...allBattlesMonth, ...(chunk.filter(v => parseInt(v.finishTime) > unixDateLastMonth))]
            } catch (error) {
                console.log(error)
            }
        }
        for (let i = 0; i < allBattlesWeek.length; i++) {
            const battle = allBattlesWeek[i]
            try {
                let winAmount = 0
                let isWin = 0;
                if (BigInt(battle.player1Amount) > BigInt(battle.player2Amount)) {
                    winAmount = parseFloat(ethers.utils.formatEther((BigInt(battle.player1Amount) - BigInt(battle.player2Amount)).toString()))
                    isWin = 1;
                }
                await pgClient.query(
                    "UPDATE leaderboard SET games=games+1, wins=wins+$1, amountwon=amountwon+$2 WHERE address=$3 AND period=$4",
                    [isWin, winAmount, battle.player1, 0]
                )
                await pgClient.query(
                    "INSERT INTO leaderboard (address, games, wins, amountwon, period) SELECT $1,$2, $3, $4, $5 WHERE NOT EXISTS (SELECT 1 FROM leaderboard WHERE address=$1 AND period=$5)",
                    [battle.player1, 1, isWin, winAmount, 0]
                )
            } catch (error) {
                console.log(error)
            }
            try {
                let winAmount = 0
                let isWin = 0;
                if (BigInt(battle.player2Amount) > BigInt(battle.player1Amount)) {
                    winAmount = parseFloat(ethers.utils.formatEther((BigInt(battle.player2Amount) - BigInt(battle.player2Amount)).toString()))
                    isWin = 1;
                }
                await pgClient.query(
                    "UPDATE leaderboard SET games=games+1, wins=wins+$1, amountwon=amountwon+$2 WHERE address=$3 AND period=$4",
                    [isWin, winAmount, battle.player2, 0]
                )
                await pgClient.query(
                    "INSERT INTO leaderboard (address, games, wins, amountwon, period) SELECT $1,$2, $3, $4, $5 WHERE NOT EXISTS (SELECT 1 FROM leaderboard WHERE address=$1 AND period=$5)",
                    [battle.player2, 1, isWin, winAmount, 0]
                )
            } catch (error) {
                console.log(error)
            }
        }
        for (let i = 0; i < allBattlesMonth.length; i++) {
            const battle = allBattlesMonth[i]
            try {
                let winAmount = 0
                let isWin = 0;
                if (BigInt(battle.player1Amount) > BigInt(battle.player2Amount)) {
                    winAmount = parseFloat(ethers.utils.formatEther((BigInt(battle.player1Amount) - BigInt(battle.player2Amount)).toString()))
                    isWin = 1;
                }
                await pgClient.query(
                    "UPDATE leaderboard SET games=games+1, wins=wins+$1, amountwon=amountwon+$2 WHERE address=$3 AND period=$4",
                    [isWin, winAmount, battle.player1, 1]
                )
                await pgClient.query(
                    "INSERT INTO leaderboard (address, games, wins, amountwon, period) SELECT $1,$2, $3, $4, $5 WHERE NOT EXISTS (SELECT 1 FROM leaderboard WHERE address=$1 AND period=$5)",
                    [battle.player1, 1, isWin, winAmount, 1]
                )
            } catch (error) {
                console.log(error)
            }
            try {
                let winAmount = 0
                let isWin = 0;
                if (BigInt(battle.player2Amount) > BigInt(battle.player1Amount)) {
                    winAmount = parseFloat(ethers.utils.formatEther((BigInt(battle.player2Amount) - BigInt(battle.player2Amount)).toString()))
                    isWin = 1;
                }
                await pgClient.query(
                    "UPDATE leaderboard SET games=games+1, wins=wins+$1, amountwon=amountwon+$2 WHERE address=$3 AND period=$4",
                    [isWin, winAmount, battle.player2, 1]
                )
                await pgClient.query(
                    "INSERT INTO leaderboard (address, games, wins, amountwon, period) SELECT $1,$2, $3, $4, $5 WHERE NOT EXISTS (SELECT 1 FROM leaderboard WHERE address=$1 AND period=$5)",
                    [battle.player2, 1, isWin, winAmount, 1]
                )
            } catch (error) {
                console.log(error)
            }
        }
        console.log(`LeaderBoard updated`)
    } catch (error) {
        console.error(error)
    } 
}

async function getLeaderboard(res) {
    try {
        const leaderboard = await pgClient.query("SELECT * FROM leaderboard")
        res.status(200).json({leaderboard: leaderboard.rows})
    } catch (error) {
        res.status(500).send('Something wen wrong')
    }
}

async function getSignature(gameID, address, chainid) {
    try {
        const res = await pgClient.query(
            'SELECT * FROM signatures WHERE player=$1 AND gameid=$2 AND chainid=$3',
            [address, gameID, chainid]
        )
        if (res.rows.length === 0) {
            return {
                player: '',
                gameid: '',
                token: '',
                amount: '',
                chainid: '',
                contract: '',
                v: '',
                r: '',
                s: '' 
            }
        }
        return {
            player: res.rows[0].player,
            amount: res.rows[0].amount,
            gameid: res.rows[0].gameid,
            token: res.rows[0].token,
            contract: res.rows[0].contract,
            chainid,
            v: res.rows[0].v,
            r: res.rows[0].r,
            s: res.rows[0].s
        }
    } catch (error) {
        console.error(error)
    }
}

async function getCurrentInGameStatistics(gameID, address, chainid) {
    try {
        const remainingRounds = await redisClient.get(`ID=${gameID}&network=${chainid}`)
        const kills = await redisClient.get(`${address}_${gameID}_${chainid}_kills`)
        const deaths = await redisClient.get(`${address}_${gameID}_${chainid}_deaths`)
        const balance = await redisClient.get(`${address}_${gameID}_${chainid}_amount`)
        if (
            remainingRounds == null 
            || 
            kills == null 
            || 
            deaths == null 
        ) {
            const res = await pgClient.query(
                "SELECT * FROM statistics WHERE gameid=$1 AND chainid=$2 AND player=$3",
                [gameID, chainid, address]
            )
            if (res.rows.length != 0) {
                const stats = res.rows[0]
                return {
                    gameid: stats.gameid,
                    address: stats.player,
                    token: stats.token,
                    chainid,
                    contract: stats.contract,
                    amount: stats.amount,
                    kills: stats.kills,
                    deaths: stats.deaths,
                    remainingRounds: remainingRounds == null ? stats.remainingrounds : remainingRounds,
                    balance
                }
            } else {
                return {
                    gameid: gameID,
                    address: address,
                    chainid
                }
            }
        } else {
            return {
                gameid: gameID,
                address,
                chainid,
                contract: networks.find(n => n.chainid == chainid).contractAddress,
                amount: 0,
                kills,
                deaths,
                remainingRounds,
                balance
            }
        }
    } catch (error) {
        
    }
}

async function getStatistics(gameID, address, chainid) {
    try {
        const res = await pgClient.query(
            "SELECT * FROM statistics WHERE gameid=$1 AND chainid=$2",
            [gameID, chainid]
        )
        if (res.rows.length === 0) {
            return []
        }
        return res.rows
    } catch (error) {
        console.error(error)
    }
}

async function setCharacter(req, response) {
    try {
        const address = req.body.address
        const chainid = req.body.chainid
        const characterid = req.body.characterid
        const { characters, contract } = blockchainConfig(chainid)
        const busy = await contract.currentlyBusy(address)
        if (!busy) {
            const exist = await characters.propertyToken(address, characterid == 0 ? characterid : characterid-1)
            if (characterid === 0 || exist.toString() !== '0') {
                await pgClient.query(
                    "UPDATE inventory SET characterid=$3 WHERE player=$1 AND chainid=$2",
                    [address, chainid, characterid]
                )
                response.status(200).send()
            } else {
                response.status(401).send('Not exist')
            }
        } else {
            response.status(400).send('Busy')
        }
    } catch (error) {
        console.log(error)
        response.status(500).send()
    }
}
async function setArmor(req, response) {
    try {
        const address = req.body.address
        const chainid = req.body.chainid
        const armor = req.body.armor
        const { armors, contract } = blockchainConfig(chainid)
        const busy = await contract.currentlyBusy(address)
        console.log(armor)
        if (!busy) {
            let exist
            if (armor !== null) {
                exist = await armors.propertyToken(address, armor)
            }
            if (armor === null || exist.toString() !== '0') {
                await pgClient.query(
                    "UPDATE inventory SET armor=$3 WHERE player=$1 AND chainid=$2",
                    [address, chainid, armor]
                )
                response.status(200).send()
            } else {
                response.status(401).send('Not exist')
            }
        } else {
            response.status(400).send('Busy')
        }
    } catch (error) {
        console.log(error)
        response.status(500).send()
    }
}
async function setWeapon(req, response) {
    try {
        const address = req.body.address
        const chainid = req.body.chainid
        const weapon = req.body.weapon
        const { weapons, contract } = blockchainConfig(chainid)
        const busy = await contract.currentlyBusy(address)
        if (!busy) {
            let exist
            if (weapon !== null) {
                exist = await weapons.propertyToken(address, weapon)
            }
            if (weapon === null || exist.toString() !== '0') {
                await pgClient.query(
                    "UPDATE inventory SET weapon=$3 WHERE player=$1 AND chainid=$2",
                    [address, chainid, weapon]
                )
                response.status(200).send()
            } else {
                response.status(401).send('Not exist')
            }
        } else {
            response.status(400).send('Busy')
        }
    } catch (error) {
        console.log(error)
        response.status(500).send()
    }
}
async function setBoots(req, response) {
    try {
        const address = req.body.address
        const chainid = req.body.chainid
        const boot = req.body.boots
        const { boots, contract } = blockchainConfig(chainid)
        const busy = await contract.currentlyBusy(address)
        if (!busy) {
            let exist
            if (boot !== null) {
                exist = await boots.propertyToken(address, boot)
            }
            if (boot === null || exist.toString() !== '0') {
                await pgClient.query(
                    "UPDATE inventory SET boots=$3 WHERE player=$1 AND chainid=$2",
                    [address, chainid, boot]
                )
                response.status(200).send()
            } else {
                response.status(401).send('Not exist')
            }
        } else {
            response.status(400).send('Busy')
        }
    } catch (error) {
        console.log(error)
        response.status(500).send()
    }
}

function blockchainConfig(chainid) {
    const network = networks.find(n => n.chainid == chainid)
    const provider = new ethers.providers.JsonRpcProvider(network.rpc)
    const signer = new ethers.Wallet(network.privateKey, provider)
    const _contract = new ethers.Contract(network.contractAddress, contractAbi, signer)
    let shop
    let characters
    let armors
    let weapons
    let boots
    if (network.shopAddress != undefined) {
        shop = new ethers.Contract(network.shopAddress, shopAbi, signer)
        characters = new ethers.Contract(network.charactersAddress, nftAbi, signer)
        armors = new ethers.Contract(network.armorsAddress, nftAbi, signer)
        weapons = new ethers.Contract(network.weaponsAddress, nftAbi, signer)
        boots = new ethers.Contract(network.bootsAddress, nftAbi, signer)
    } 
    return {contract: _contract, signer, shop, characters, armors, weapons, boots};
}

async function getInventory(req, response) {
    try {
        const address = req.body.address
        const chainid = req.body.chainid
        //TODO: добавить проверку chain'a (существует ли)
        const res = await pgClient.query(
            `
            SELECT 
                inventory.characterid, 
                inventory.armor, 
                inventory.weapon, 
                inventory.boots,
                armor_bonuses.health as health_bonus, 
                weapon_bonuses.damage, 
                weapon_bonuses.bullets as bullets_bonus,
                boots_bonuses.speed as speed_bonus,
                boots_bonuses.jump as jump_bonus
                FROM inventory 
                LEFT JOIN armor_bonuses ON inventory.armor=armor_bonuses.id 
                LEFT JOIN weapon_bonuses ON inventory.weapon=weapon_bonuses.id 
                LEFT JOIN boots_bonuses ON inventory.boots=boots_bonuses.id 
                WHERE player=$1 AND chainid=$2
            `,
            [address, chainid]
        )
        if (res.rows.length === 0) {
            await pgClient.query(
                "INSERT INTO inventory (player, chainid, characterid) VALUES($1, $2, $3)",
                [address, chainid, 0]
            )
            response.status(200).json({
                address, chainid, characterid:0
            })
        }
        response.status(200).json(res.rows[0])
    } catch (error) {
        console.log(error)
        response.status(500).json({})
    }
}

async function setGamesProperties(req, response) {
    try {
        const gameid = req.body.gameid
        const chainid = req.body.chainid
        const map = req.body.map
        await pgClient.query(
            "INSERT INTO gamesproperties (gameid, chainid, map) VALUES($1, $2, $3)",
            [gameid, chainid, map]
        )
        response.status(200).send()
    } catch (error) {
        response.status(500).send()
    }
}

async function getGamesProperties(req, response) {
    try {
        const gameid = req.query.gameid
        const chainid = req.query.chainid
        const res = await pgClient.query('SELECT map FROM gamesproperties WHERE gameid=$1 AND chainid=$2', [gameid, chainid])
        if (res.rows.length === 0) {
            response.status(404).json({map: 0})
        } else {
            response.status(200).json(res.rows[0])
        }
    } catch (error) {
        response.status(500).json({map: 0})
    }
}

server.use(cors({
    'allowedHeaders': ['sessionId', 'Content-Type'],
    'exposedHeaders': ['sessionId'],
    'origin': [
        'http://localhost:5000',
        'https://fairfight.fairprotocol.solutions/'
    ],
    'methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
    'preflightContinue': false
}));
server.use(express.urlencoded({extended: true}))
server.use(express.json());
server.use(express.static(path.join(__dirname,'/lib')))
const maintenance = false
server.use('/', express.static(path.join(__dirname,'/public')));
server.use('/maintenance', express.static(path.join(__dirname,'/public')));
server.get('/', (req, res) => {
    maintenance
    ?
    res.redirect('/maintenance')
    :
    res.sendFile(__dirname+'/public/index.html')
})

server.get('/game', (req, res) => {
    maintenance
    ?
    res.redirect('/maintenance')
    :
    res.sendFile(__dirname+'/public/game.html')
})

server.get('/sign', async (req, res) => {
    maintenance
    ?
    res.redirect('/maintenance')
    :
    res.json(await getSignature(req.query.gameID, req.query.address, req.query.chainid))
})

server.get('/statistics', async (req, res) => {
    maintenance
    ?
    res.redirect('/maintenance')
    :
    res.json(await getStatistics(req.query.gameID, req.query.address, req.query.chainid))
})

server.get('/balance', async (req, res) => {
    maintenance
    ?
    res.redirect('/maintenance')
    :
    res.json(await getCurrentInGameStatistics(req.query.gameID, req.query.address, req.query.chainid))
})

server.get('/leaderboard', async (req, res) => {
    maintenance
    ?
    res.redirect('/maintenance')
    :
    await getLeaderboard(res)
})

server.get('/createleaderboard', async (req, res) => {
    maintenance
    ?
    res.redirect('/maintenance')
    :
    // await createLeaderboard()
    res.status(200).redirect('/')
})

server.post('/airdrop_first_sign', async (req, res) => {
    maintenance
    ?
    res.redirect('/maintenance')
    :
    await sendTokensFirstTime(req, res)
})

server.post('/airdrop_second_sign', async (req, res) => {
    maintenance
    ?
    res.redirect('/maintenance')
    :
    await sendTokensSecondTime(req, res)
})

server.get('/maintenance', async (req, res) => {
    !maintenance
    ?
    res.redirect('/')
    :
    res.sendFile(__dirname+'/public/maintenance.html')
})

server.post('/setcharacter', async (req, res) => {
    maintenance
    ?
    res.redirect('/maintenance')
    :
    await setCharacter(req, res)
})
server.post('/setarmor', async (req, res) => {
    maintenance
    ?
    res.redirect('/maintenance')
    :
    await setArmor(req, res)
})
server.post('/setweapon', async (req, res) => {
    maintenance
    ?
    res.redirect('/maintenance')
    :
    await setWeapon(req, res)
})
server.post('/setboots', async (req, res) => {
    maintenance
    ?
    res.redirect('/maintenance')
    :
    await setBoots(req, res)
})

server.post('/getinventory', async (req, res) => {
    maintenance
    ?
    res.redirect('/maintenance')
    :
    await getInventory(req, res)
})

server.post('/setgamesprops', async (req, res) => {
    maintenance
    ?
    res.redirect('/maintenance')
    :
    await setGamesProperties(req, res)
})

server.get('/getgamesprops', async (req, res) => {
    maintenance
    ?
    res.redirect('/maintenance')
    :
    await getGamesProperties(req, res)
})

server.listen(5000, async () => {
    await pgClient.connect()
    await redisClient.connect()
    // await createLeaderboard()
    console.log(`Server started on port 5000`)
})

