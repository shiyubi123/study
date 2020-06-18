
//添加Item事件绑定
addItemEventBind()

function addItemEventBind (){
    $('.add').click(additem)
}

//添加item
function additem(e){
    $("<div/>")
    .mousedown(moveItem)
    .appendTo(".drag-container")
}

//初始Item点击事件绑定
$('.drag-container div').mousedown(moveItem)

//移动item
function moveItem(moveEvent){
    let target = this
    let isMoving = false
    let moveCheck
    let spaceItem

    let ItemPosition = mousedownItem(target,moveEvent)

    window.addEventListener("mousemove", mousemoveItem)
    window.addEventListener("mouseup", mouseupItem)

    function mousemoveItem(e){
        let {newLeft,newTop} = calculateNewPosition(e,ItemPosition)

        // item移动设置
        ItemMovingSet(newLeft,newTop)
    }

    function getItemIndex(target){
        let positionIndex = $(target).index('.drag-container div')
        return positionIndex
    }
    
    function getItemPosition(target,e){
        let ItemPosition = {}
        ItemPosition.ItemIndex = getItemIndex(target)
        ItemPosition.left = $(target).position().left; ItemPosition.top = $(target).position().top
        ItemPosition.X = e.pageX; ItemPosition.Y = e.pageY
        return ItemPosition
    }

    function mousedownItem(target,e){
        //获取位置
        let ItemPosition = getItemPosition(target,e)
        
        //摘出拖拽元素
        litOutDragItem(target)
        
        //原处添加占位元素
        layoutContainer(ItemPosition.X - 50,ItemPosition.Y - 50)

        return ItemPosition
    }
    
    function mouseupItem(e){
        
        let {newLeft,newTop} = calculateNewPosition(e,ItemPosition)

        //删除判断
        judgeDelete(newLeft,newTop)

        //替换站位元素
        exchangeSpaceItem(target)

        //清除绑定事件以及多余站位元素
        window.removeEventListener("mousemove", mousemoveItem)
        window.removeEventListener("mouseup", mouseupItem)
    }

    function layoutContainer(newLeft,newTop){
        clearOldSpaceItem()
        let PositionIndex = calculatePositionIndex(newLeft,newTop)
        addSpaceItem(PositionIndex)
    }

    function calculatePositionIndex(left,top){
        left += 50; top += 50
        let index
        let rowrank = getRank(left,'left')
        let colunmrank = getRank(top,'top')
        if(rowrank === -1 || colunmrank === -1){
            index = -1
        } else {
            index = (rowrank + (colunmrank - 1) * 3) - 1
        }
        return index
    }

    function getRank(position,direction) {
        let rank = Math.ceil(position / 100)
        let rest = position % 100
        let max = direction === 'left' ? 300 : (Math.ceil(($('.drag-container').children().length - 1) / 3) + 1) * 100
        let min = -50

        console.log(max,position)

        if(5 < rest < 95 && position > min && position < max){
            return rank
        } else {
            return -1
        }
    }

    function addSpaceItem(PositionIndex){
        
        spaceItem = $("<div/>")
        .css({
            flex:'0 0 90px',
            width: '90px',
            height: '90px',
            margin: '5px',
            ['box-sizing']: 'border-box',
            ['background-color']: 'rgb(153,153,153)',
        })

        if(PositionIndex > ($('.drag-container').children().length - 1)){
            $('.drag-container').append(spaceItem)
        }else if(PositionIndex !== -1){
            $('.drag-container').children(`:eq(${PositionIndex})`).before(spaceItem)
        }
    }

    function clearOldSpaceItem() {
        if(spaceItem){
            spaceItem.remove()
        }
    }

    function judgeDelete(newLeft,newTop) {
        if(newLeft > 250 || newLeft < -50 || newTop < -50 || newTop > (Math.ceil($('.drag-container').children().length/3) * 100 - 50)){
            $(target).remove()
        }
    }

    function exchangeSpaceItem(target){
        if(isMoving){
            setTimeout(()=>{
                exchangeItem(target)
            },50)
        }

        exchangeItem(target)
    }

    function calculateNewPosition(e,ItemPosition){
        let addX = e.pageX - ItemPosition.X
        let addY = e.pageY - ItemPosition.Y 
        let newLeft = ItemPosition.left + addX
        let newTop = ItemPosition.top + addY

        return {newLeft,newTop}
    }

    function ItemMovingSet(newLeft,newTop){
        $(target).css({
            ['z-index']:1,
            position:'absolute',
            left:newLeft,
            top:newTop,
            background:'rgba(84,84,84,0.8)',
        })

        isMoving = true
        if(isMoving){
            clearTimeout(moveCheck)
            moveCheck = setTimeout(()=>{
                layoutContainer(newLeft,newTop)
            },50)
        }
    }

    function litOutDragItem(target){
        $(target).css({
            ['z-index']:1,
            position:'absolute',
        }).prependTo('body')
    }

    function exchangeItem(target){
        $(target)
        .css({
            ['z-index']:'initial',
            position:'static',
            background:'rgb(84,84,84)',
        })
        .replaceAll(spaceItem)
    }
}


