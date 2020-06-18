import pinyinTransformer from 'pinyin'
import $ from 'jQuery'

function type(characterSpeed = 100,chinseSpeed = 150,dom = $('.type')){
    let str = $('.type').html()
    console.log(dom)

    var pinyin = getPinyin(str)
    var chinese = str.split('')

    console.log(pinyin,chinese)

    let sentence = ''
    let chineseIndex = 0
    typeAll()

    async function typeAll() {
        if(chineseIndex < chinese.length){
            await typePinyin(pinyin[chineseIndex][0],characterSpeed)
            setTimeout(()=>{
                typeAll()
            },chinseSpeed)
        } else {
            return
        }
    }

    function typePinyin(str,time = 150){
        return new Promise((resolve) => {
            let StrIndex = 0
            let singlePinyin = ''
            typeIt(time)
    
            function typeIt(time) {
                if(StrIndex < str.length){
                    singlePinyin += str[StrIndex++]
                    $(dom).html(sentence + singlePinyin)
                    setTimeout(() => {typeIt(time)},time)
                } else {
                    sentence += chinese[chineseIndex++]
                    $(dom).html(sentence)
                    resolve()
                }
            }
        })
    }
    
}

function getPinyin(str){
    var result = pinyinTransformer(str,{
        style: pinyinTransformer.STYLE_NORMAL
    })
    return result
}

type()