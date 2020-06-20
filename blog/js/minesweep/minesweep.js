//扫雷
import mineStatus from './mineStatus.js'

//雷区
class mineContainer {
    constructor(number){
        this.Minenumber = number
        this.mineLeft = number
    }

    createMineContainer(Minenumber){
        createContainer(Minenumber)
        setMine(Minenumber)
        setMineNote()
        setMinecontainer()
    }

    createContainer(Minenumber){
        let containerInfo = getcontainerSize(Minenumber)
        let randomResult = getRandomResult(containerInfo)
        let resultIndex = 0

        let container = []

        for(i = 0; i < containerInfo.row; i++){
            let row = []
            for(j = 0; j < containerInfo.colunm; j++){
                let item = 
                resultIndex++
            }
        }
    }

    setMine(Minenumber)
    setMineNote()
    setMinecontainer()

    getcontainerSize(Minenumber){
        let containerInfo = {
            row:null,
            colunm:null,
            total:null
        }

        switch(Minenumber){
            case 10:
                containerInfo.row = 8
                containerInfo.colunm = 8
                containerInfo.total = 64
            case 50:
                containerInfo.row = 16
                containerInfo.colunm = 16
                containerInfo.total = 256
            case 99:
                containerInfo.row = 16
                containerInfo.colunm = 30
                containerInfo.total = 480
        }

        return containerInfo
    }

    getRandomResult(Minenumber,containerInfo){
        let mineString = ''
        let sageString = ''
        let safeNumber = containerInfo.total - Minenumber
        for(var i = 0;i < safeNumber;i++){
            sageString += '0'
        }

        for(var i = 0;i < containerInfo;i++){
            mineString += '1'
        }

        let layoutString = mineString + sageString

        let randonResult = random(layoutString)

        return randonResult
    }

    createMineContainer(Minenumber)

}

function gameStartEventBind(){
    $('.gamestart').click((e) => {
        let number = Number(e.target.text())
        new mineContainer(number)
    })
}
gameStartEventBind()