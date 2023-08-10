import { ERC20 } from "../contract.js"
import { addressMaker, compareID, getMap, timeConverter } from "./utils/utils.js"

export const pastFightsFunc = async (address, contract, network, signer) => {
    let pastFights = await contract.getPlayerFullFights(address, 30).then(fights => fights).catch(err => [])
    pastFights = pastFights.filter(v => v.owner != ethers.constants.AddressZero && v.finishTime != 0)
    pastFights = [...pastFights].sort(compareID)
    let pastgames = document.getElementById("pastgames")
    let pastGamesList = document.getElementById('pastgames-list')
    for (let i = 0; i < pastFights.length; i++) {
        await addToPastFights(pastFights[i], network, signer, address, '')
    }
    if (pastGamesList.children.length == 1) {
      document.getElementById("pastgames_empty").style.display = ''
      pastgames.classList.add("empty")

    } else {
      document.getElementById("pastgames_empty").style.display = 'none'
      pastgames.classList.remove("empty")
      pastgames.appendChild(pastGamesList)
    }
}

export const addToPastFights = async (fight, network, signer, address, from) => {
    let queryGameProps = new URLSearchParams();
    queryGameProps.append("gameid", fight.ID.toString())
    queryGameProps.append("chainid", network.chainid)
    let mapID = await fetch('/getgamesprops?' + queryGameProps).then(async (res) => (await res.json()).map).catch(err => {
      console.log(err)
      return 0
    })
    const mapProperties = getMap(mapID)
    let pastGamesList = document.getElementById('pastgames-list')
    let finishTime = fight.finishTime
    if (from === 'fromOpenFights') {
        finishTime = Math.floor((new Date()).getTime() / 1000)
        const lastAddedID = pastGamesList.children.item(0).getAttribute('value')
        if (lastAddedID === fight.ID.toString()) {
            return
        }
    }
    let token = network.currency
    let decimals = 18
    if (fight.token != ethers.constants.AddressZero) {
        const currentTokenContract = new ethers.Contract(fight.token, ERC20, signer)
        token = await currentTokenContract.symbol()
        decimals = await currentTokenContract.decimals()
    }
    let li = document.createElement('div')
    li.className = 'games__row'
    li.setAttribute('value', fight.ID.toString())
    const headerDiv = document.createElement('div')
    const rounds = fight.rounds
    headerDiv.className = 'games__item'
    const pID = document.createElement('p')
    const pIDData = document.createElement('span')
    pID.textContent = 'id: '
    pIDData.textContent = `${fight.ID.toString()}`
    pID.appendChild(pIDData)
    const pStatus = document.createElement('p')
    const pStatusData = document.createElement('span')
    pStatus.textContent = 'Status: '
    pStatusData.textContent = `Game over`
    pStatusData.className = 'active'
    pStatus.appendChild(pStatusData)
    const pDate = document.createElement('p')
    const pDateData = document.createElement('span')
    pDate.textContent = 'Date: '
    pDateData.textContent = `${timeConverter(finishTime)}`
    pDate.appendChild(pDateData)
    headerDiv.appendChild(pID)
    headerDiv.appendChild(pStatus)
    headerDiv.appendChild(pDate)
    let roundsElem = document.createElement('p')
    roundsElem.className = 'right'
    headerDiv.appendChild(roundsElem)
    const middleDiv = document.createElement('div')
    middleDiv.className = 'games__item'
    const betPerRoundP = document.createElement('p')
    const betPerRound = document.createElement('span')
    betPerRoundP.textContent = 'Bet per round: '
    betPerRound.textContent = `${fight.amountPerRound / 10**decimals} ${token}`
    betPerRoundP.appendChild(betPerRound)
    const yourdepositP = document.createElement('p')
    const yourdeposit = document.createElement('span')
    yourdepositP.textContent = 'Your deposit: '
    yourdeposit.textContent = `${fight.baseAmount / 10**decimals} ${token}`
    yourdepositP.appendChild(yourdeposit)
    const mapP = document.createElement('p')
    const map = document.createElement('span')
    mapP.textContent = 'Map: '
    mapP.className = 'right'
    map.textContent = mapProperties.name
    map.className = 'active map-show'
    const mapHiddenModal = document.querySelector('#modal__map')
    map.addEventListener("mouseover", (event) => {
      mapHiddenModal.src = mapProperties.image
      mapHiddenModal.classList.add('active')
    });
    map.addEventListener("mouseleave", (event) => {
      mapHiddenModal.classList.remove('active')
    });
    mapP.appendChild(map)
    middleDiv.appendChild(betPerRoundP)
    middleDiv.appendChild(yourdepositP)
    middleDiv.appendChild(mapP)
    const bottomDiv = document.createElement('div')
    const bottomDivText = document.createElement('p')
    bottomDivText.textContent = 'Players & stats:'
    bottomDiv.className = 'games__item'
    bottomDiv.appendChild(bottomDivText)
    const players_stats = document.createElement('div')
    players_stats.className = "games__item games__item__footer"
    const youStats = document.createElement('div')
    youStats.className = 'opengames__col'
    const youStatsWinLose = document.createElement('div')
    youStatsWinLose.className = 'opengames__col'
    const enemyStats = document.createElement('div')
    enemyStats.className = 'opengames__col'
    const enemyStatsWinLose = document.createElement('div')
    enemyStatsWinLose.className = 'opengames__col'
    players_stats.appendChild(youStats)
    players_stats.appendChild(youStatsWinLose)
    players_stats.appendChild(enemyStats)
    players_stats.appendChild(enemyStatsWinLose)
    let queryStatsPlayer1 = new URLSearchParams();
    queryStatsPlayer1.append("gameID", fight.ID)
    queryStatsPlayer1.append("chainid", network.chainid)
    fetch('/statistics?' + queryStatsPlayer1.toString())
        .then(async (res) => {
            const stats = await res.json()
            const player1Stats = stats.find(s => s.player == address)
            const player2Stats = stats.find(s => s.player != address)
            const addressPlayer1 = addressMaker(address)
            const addressPlayer2 = addressMaker(player2Stats.player)  
            roundsElem.textContent = ` Round: ${parseInt(rounds) - parseInt(player1Stats.remainingrounds)}/${parseInt(rounds)}`
            //PLAYER 1 (YOU)
            const amount1 = BigInt(player1Stats.amount.toString())
            const amount2 = BigInt(player2Stats.amount.toString())
            const amountLose1 = BigInt(fight.baseAmount.toString()) - amount1
            const amountLose2 = BigInt(fight.baseAmount.toString()) - amount2
            let winLoseText = '';
            let classNameWinLose = 'green'
            if (amount1 < amount2) {
                winLoseText = `Lose: ${(amountLose1).toString() / (10**decimals).toString()} ${token}`
                classNameWinLose = "red"
            } else if (amount1 > amount2) {
                winLoseText = `Win: ${(amountLose1 * BigInt(-1)).toString() / (10**decimals).toString()} ${token}`
            } else {
                winLoseText = `Win: 0 ${token}`
                classNameWinLose = `active`
            }
            const addressP = document.createElement('p')
            addressP.textContent = `${addressPlayer1} (you)`
            const killsDeaths = document.createElement('p')
            killsDeaths.textContent = `${player1Stats.kills} kills, ${player1Stats.deaths} deaths`
            const winLose = document.createElement('p')
            winLose.textContent = winLoseText
            winLose.className = classNameWinLose
            youStats.appendChild(addressP)
            youStats.appendChild(killsDeaths)
            youStatsWinLose.appendChild(winLose)
            //PLAYER 2 (ENEMY)
            let classNameWinLose2 = 'green'
            let winLoseText2;
            if (amount2 < amount1) {
                winLoseText2 = `Lose: ${(amountLose2).toString() / (10**decimals).toString()} ${token}`
                classNameWinLose2 = "red"
            } else if (amount2 > amount1) {
                winLoseText2 = `Win: ${(amountLose2 * BigInt(-1)).toString() / (10**decimals).toString()} ${token}`
            } else {
                winLoseText2 = `Win: 0 ${token}`
                classNameWinLose2 = `active`
            }
            const addressP2 = document.createElement('p')
            addressP2.textContent = `${addressPlayer2} (enemy)`
            const killsDeaths2 = document.createElement('p')
            killsDeaths2.textContent = `${player2Stats.kills} kills, ${player2Stats.deaths} deaths`
            const winLose2 = document.createElement('p')
            winLose2.textContent = winLoseText2
            winLose2.className = classNameWinLose2
            enemyStats.appendChild(addressP2)
            enemyStats.appendChild(killsDeaths2)
            enemyStatsWinLose.appendChild(winLose2)
        })
        .catch(err => console.error(err))
    li.appendChild(headerDiv)
    li.appendChild(middleDiv)
    li.appendChild(bottomDiv)
    li.appendChild(players_stats)
    pastGamesList.insertBefore(li, pastGamesList.firstChild)
}