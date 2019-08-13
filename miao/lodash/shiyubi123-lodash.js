var shiyubi123 = {
    chunk: function chunk (array, size = 1) {
                var  newary = []
                for (var i = 0;i + size - 1 < array.length;i += size) {
                    newary.push(array.slice(i,i + size))
                }
                if(i < array.length){
                    newary.push(array.slice(i))
                }
                return newary
            },
    
    compact: function compact(array) {
        return array.filter(it => it)
    },
    
    concat: function concat (array, values) {
        debugger
        var newary = []
        for (var i = 0;i < arguments.length;i++) {
            if(typeof(arguments[i]) == 'object'){
                newary.push(...arguments[i])
            } else {
                newary.push(arguments[i])
            }
        }
        return newary
    },
    
    difference: function difference (array, ...values) {
        debugger
        var dif = []
        var map = {}
        for(var i = 0;i < values.length;i++) {
            for(var j = 0;j < values[i].length;j++){
                map[values[i][j]] = 1
            }
        }
        for(var i = 0;i < array.length;i++) {
            if(!(array[i] in map)) {
                dif.push(array[i])
            }
        }
        return dif
    },
    
    differenceBy: function differenceBy (array, values,predicate = identity) {
        debugger
        var newary = []
        predicate = iteratee(predicate)
        for(key in values){
            if(predicate(array[key]) != predicate(values[key])){
                    newary.push(array[key])
            }
        }
        return newary
    },
    
    drop: (array, n = 1) => array.slice(n),
    
    dropRight: (array, n = 1) => array.length > n ? array.slice(0,array.length - n) : [],

    dropRightWhile: function dropRightWhile(array,predicate = identity()) {
        debugger
        predicate = iteratee(predicate)
        for(var i = array.length - 1;i >= 0;i--){
            if(predicate(array[i])){
                array = array.slice(0,i)
            }else {
                break
            }
        }
        return array
    },
    
    dropWhile: function dropWhile(array,predicate = identity()) {
        predicate = iteratee(predicate)
        for(var i = 0;i < array.length;i++){
            if(predicate(array[i])){
                array = array.slice(1)
            }
        }
        return array
    },

    fill: function fill(array, value, start = 0, end = array.length){
            for(var i = start;i < end;i++) {
                array[i] = value
            }
            return array
        },
    
    findIndex: function findIndex(array, predicate = identity(), fromIndex = 0){
                predicate = iteratee(predicate)
                for(var i = fromIndex;i < array.length;i++) {
                    if (predicate(array[i])){
                        return i
                    }
                }
                return -1
            },
    
    findLastIndex: function findLastIndex(array, predicate = identity(value), fromIndex = array.length-1){
                    for(var i = fromIndex;i >= 0;i--) {
                        if (predicate(array[i])){
                            return i
                        }
                    }
                    return -1
                },

    flatten: function flatten (array) {
        var result = []
        for(item of array){
            if(Array.isArray(item)){
                for(val of item) {
                    result.push(val)
                }//result.push(...item)
            } else {
                result.push(item)
            }
        }
        return result
    },

    flattenDeep: function flattenDeep (array){
        debugger
        var result = []
        for(var i = 0;i < array.length;i++) {
            if(Array.isArray(array[i])){
                var falttedItem = flattenDeep(array[i])
                result.push(...falttedItem)
            } else {
                result.push(array[i])
            }
        }
        return result
    },
    
    

    flattenDepth: function flattenDepth (array,depth = 1){
        debugger
        var result = []
        if(depth == 0){
            return array.slice()
        } else {
            for(var i = 0;i < array.length;i++) {
                if(Array.isArray(array[i])){
                    var falttedItem = flattenDepth(array[i],depth - 1)
                    result.push(...falttedItem)
                } else {
                    result.push(array[i])
                } 
            }
        }
        return result
    },
    
    fromPairs: function fromPairs(pairs) {
        var result = {}
        for(var i = 0;i < pairs.length;i++) {
            result[pairs[i][0]] = pairs[i][1]
        }
        return result
    },

    head: array => array[0], 
    
    indexOf : function indexOf(array, value, fromIndex = 0){
            for(var i = fromIndex;i < array.length;i++) {
                if(array[i] == value){
                    return i
                }
            }
            return -1
        },

    initial: array => array.slice(0,array.length - 1),

    intersection: function intersection(...arrays) {
            debugger
            var result = []
            var map = {}
            for(var i = 0;i < arrays.length;i++) {
                for(var j = 0;j < arrays[i].length;j++){
                    if(!(arrays[i][j] in map)){
                        map[arrays[i][j]] = 1
                    } else {
                        map[arrays[i][j]]++
                    }
                }
            }
            for(key in map) {
                if(map[key] >= 2){
                    result.push(+key)
                }
            }
            return result
        },
    
    join: (array, separator = ',') => array.reduce((a,b) => a + '' + separator + '' + b),
    
    last: array => array[array.length - 1],

    lastIndexOf: function lastIndexOf(array, value, fromIndex = array.length-1){
                for(var i = fromIndex;i >= 0;i--){
                    if(array[i] == value){
                        return i
                    }
                }
                return -1
            },

    pull: function pull(array, ...values){
        var map = {}
            for(var i = 0;i < values.length;i++) {
                map[values[i]] = 1
            }
        return array.filter((a,values) => !(a in map))
    },
    
    isArray: function isArray (value) {
        return Object.prototype.toString.apply(value) == 'object Array'
    },

    reverse: function reverse(array) {
            var len = array.length - 1
            var halflen = Math.floor(array.length / 2)
            for(var i = 0;i < halflen;i++){
                var buffer = array[i]
                array[i] = array[len - i]
                array[len - i] = buffer
            }
            return array
        },
    
    sortedIndex: function sortedIndex(array, value){
        var low = 0
        var high = array.length - 1
        var mid = Math.floor((low + high) / 2)

        while(low < high) {
            if(array[mid] == value){
                while(array[mid - 1] == value){
                    mid--
                }
                return mid
            } else if(array[mid] > value){
                high = mid - 1
                mid = Math.floor((low + high) / 2)
            } else {
                low = mid + 1
                mid = Math.floor((low + high) / 2)
            }
        }
        return mid
    },

    union:function union(arrays){
        var newary = []
        var map = {}
        for(var i = 0;i < arrays.length;i++){
            var len = arrays[i].length
            for(var j = 0;j < len;j++){
                if(!(arrays[i][j] in map)){
                    newary.push(arrays[i][j])
                    map[arrays[i][j]] = 1
                }
            }
        }
        return newary
    },

    unionBy: function unionBy(...args){
        var predicate = iteratee(args[args.length - 1])
        var newary = []
        var store = new Map()
        for(var i = 0;i < args.length - 1;i++){
            var len = args[i].length
            for(var j = 0;j < len;j++){
                var res = predicate(args[i][j])
                if(!store.has(res)){
                    newary.push(args[i][j])
                    store.set(res,1)
                }
            }
        }
        return newary
    },

    bind: function bind(f,thisArgs,...fixedArgs){
        return function(...args){
            var actualArgs = [...fixedArgs]
            for(var i = 0;i < actualArgs.length;i++){
                if(actualArgs[i] === window){
                    actualArgs[i] = args.shift()
                }
            }
            actualArgs.push(...args)
            return f.apply(thisArgs,actualArgs)
        }
    },

    isMatch: function isMatch(obj,src){
        if(obj === src){
            return true
        }
        for(var key in src){
            if(typeof src[key] == 'object'){
                if(!isMatch(obj[key],src[key])){
                    return false
                }
            }else if(src[key] != obj[key]){
                return false
            }
        }
        return true
    },

    matches: function matches(src){
        return bind(isMatch,null,window,src)
    },

    toPath:function toPath(path){
        return path.split(/\.|\[|\]./g)
    },

    get: function get(obj,path,defaultVal = false){
        var path = toPath(path)
        for(var i = 0;i < path.length;i++){
            if(obj === undefined){
                return defaultVal
            }
            obj = obj[path[i]]
        }
        return obj
    },//也可以用递归，每次obj[path[0]]，然后调path.slice(1),但是前提是要先toPath
    
    //function get(obj,path,defaultVal){
        //var path = toPath(path)
        //return path.reduce(obj,propName) => {
            //return obj[propName]
        //},obj)
    //}

    matchesProperty: function matchesProperty(path,value){
        return function (obj){
            return isEqual(get(obj,path),value)
        }
    }, 

    identity: function identity(value){
                return arguments[0]
    },
    
    property: function property(path){
        return bind(get,null,window,path)
    },

    isEqual: function isEqual(value, other){
        debugger
        if(typeof value == 'object' || typeof value == 'array'){
            if(Object.keys(value).length != Object.keys(other).length){
                return false
            }
            for(key in value){
                if(!isEqual(value[key],other[key])){
                    return false
                }
            }
        }else if(typeof value == "number" || typeof value == 'string'){
            return value === other   
        }else if(typeof value == 'boolean'){
            return value == other
        }
        return true
    },

    iteratee: function iteratee(value){
        if(typeof value == 'string') {
            return property(value)
        }
        if(typeof Array.isArray(value) == true){
            return matchesProperty(value[0],value[1])
        }
        if(typeof value == 'object') {
            return matches(value)
        }
        return value
    },//这个iteratee方法的任务就是把一个数组，一个对象，或者一个字符串变成一个有效的function来遍历数组或对象找到符合要求的属性
    
}