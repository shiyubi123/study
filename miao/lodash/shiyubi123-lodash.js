var shiyubi123 = function () {
    function chunk (array, size = 1) {
                var  newary = []
                for (var i = 0;i + size - 1 < array.length;i += size) {
                    newary.push(array.slice(i,i + size))
                }
                if(i < array.length){
                    newary.push(array.slice(i))
                }
                return newary
            }
    
    compact: function compact(array) {
        return array.filter(it => it)
    }
    
    function concat (array, values) {
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
    }
    
    function difference (array, ...values) {
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
    }
    
    function differenceBy (array, ...args) {
        debugger       
        if(!Array.isArray(args[args.length - 1]) || typeof args[args.length - 1][0] != 'number'){
            var newary = array.slice()
            var predicate = iteratee(args.pop())
            var values = flatten(args)
            newary.filter(function hasit(it) {
                return !values.map(it2 => predicate(it2)).includes(predicate(it))
            })
        }else {
            return difference (array, ...args)
        }
        return newary
    }
    
    function drop (array, n = 1) {return array.slice(n)} 
    
    function dropRight (array, n = 1) {return array.length > n ? array.slice(0,array.length - n) : []} 

    function dropRightWhile(array,predicate = identity()) {
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
    }
    
    function dropWhile(array,predicate = identity()) {
        predicate = iteratee(predicate)
        for(var i = 0;i < array.length;i++){
            if(predicate(array[i])){
                array = array.slice(1)
            }else {
                break
            }
        }
        return array
    }

    function fill(array, value, start = 0, end = array.length){
            for(var i = start;i < end;i++) {
                array[i] = value
            }
            return array
        }
    
    function findIndex(array, predicate = identity(), fromIndex = 0){
        debugger
        predicate = iteratee(predicate)
        for(var i = fromIndex;i < array.length;i++) {
            if (predicate(array[i])){
                return i
            }
        }
        return -1
    }
    
    function findLastIndex(array, predicate = identity(value), fromIndex = array.length-1){
        for(var i = fromIndex;i >= 0;i--) {
            if (predicate(array[i])){
                return i
            }
        }
        return -1
    }

    function flatten (array) {
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
    }

    function flattenDeep (array){
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
    }

    function flattenDepth (array,depth = 1){
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
    }
    
    function fromPairs(pairs) {
        var result = {}
        for(var i = 0;i < pairs.length;i++) {
            result[pairs[i][0]] = pairs[i][1]
        }
        return result
    }

    function head (array) {return array[0]} 
    
    function indexOf(array, value, fromIndex = 0){
            for(var i = fromIndex;i < array.length;i++) {
                if(array[i] == value){
                    return i
                }
            }
            return -1
        }

    function initial (array) {return array.slice(0,array.length - 1)} 

    function intersection(...arrays) {
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
        }
    
    function join (array, separator = ',') {return array.reduce((a,b) => a + '' + separator + '' + b)}
    
    function last (array) {return array[array.length - 1]} 

    function lastIndexOf(array, value, fromIndex = array.length-1){
                for(var i = fromIndex;i >= 0;i--){
                    if(array[i] == value){
                        return i
                    }
                }
                return -1
            }

    function pull(array, ...values){
        var map = {}
            for(var i = 0;i < values.length;i++) {
                map[values[i]] = 1
            }
        return array.filter((a,values) => !(a in map))
    }
    
    function isArray (value) {
        return Object.prototype.toString.call(value) == 'object Array'
    }

    function reverse(array) {
            var len = array.length - 1
            var halflen = Math.floor(array.length / 2)
            for(var i = 0;i < halflen;i++){
                var buffer = array[i]
                array[i] = array[len - i]
                array[len - i] = buffer
            }
            return array
        }
    
    function sortedIndex(array, value){
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
    }

    function union(...arrays){
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
    }

    function unionBy(...args){
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
    }

    function bind(f,thisArgs,...fixedArgs){
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
    }

    function isMatch(obj,src){
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
    }

    function matches(src){
        return bind(isMatch,null,window,src)
    }

    function toPath(path){
        return path.split(/\.|\[|\]./g)
    }

    function get(obj,path,defaultVal = false){
        var path = toPath(path)
        for(var i = 0;i < path.length;i++){
            if(obj === undefined){
                return defaultVal
            }
            obj = obj[path[i]]
        }
        return obj
    }//也可以用递归，每次obj[path[0]]，然后调path.slice(1),但是前提是要先toPath
    
    //function get(obj,path,defaultVal){
        //var path = toPath(path)
        //return path.reduce(obj,propName) => {
            //return obj[propName]
        //},obj)
    //}

    function matchesProperty(path,value){
        return function (obj){
            return isEqual(get(obj,path),value)
        }
    }

    function identity(value){
                return arguments[0]
    }
    
    function property(path){
        return bind(get,null,window,path)
    }

    function isEqual(value, other){
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
    }

    function iteratee(value){
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
    }//这个iteratee方法的任务就是把一个数组，一个对象，或者一个字符串变成一个有效的function来遍历数组或对象找到符合要求的属性

    function includes(collection, value, fromIndex = 0){
        if(Array.isArray(collection)){
            return indexOf(collection, value, fromIndex) > -1
        }
        if(typeof collection == 'string'){
            var reg = new RegExp('' + value + '','gi')
            return reg.test(collection)
        } else {
            for(key in collection){
                if(collection[key] == value){
                    return true
                }
            }
        }
        return false
    }

    function filter(collection,predicate = identity){
        var res = []
        predicate = iteratee(predicate)
        for(key in collection){
            if(predicate(collection[key])){
                res.push(collection[key])
            }
        }
        return res
    }

    return {
        chunk,
        compact,
        difference,
        differenceBy,
        drop,
        dropRight,
        dropRightWhile,
        dropWhile,
        fill,
        findIndex,
        findLastIndex,
        flatten,
        flattenDeep,
        flattenDepth,
        fromPairs,
        head,
        indexOf,
        initial,
        intersection,
        join,
        last,
        lastIndexOf,
        pull,
        reverse,
        sortedIndex,
        union,
        unionBy,
        isArray,
        isEqual,
        isMatch,
        get,
        toPath,
        identity,
        matches,
        property,
        includes,
    }
}()