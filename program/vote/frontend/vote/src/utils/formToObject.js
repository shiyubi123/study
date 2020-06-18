function formToObject(content){
    return content.split('&').reduce((pre,cur)=>{
        var key = cur.split('=')[0]
        var value = cur.split('=')[1]
        pre[`${key}`] = value
        return pre
    },{})
}

export default formToObject