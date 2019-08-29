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
    
    function compact(array) {
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
            var predicate = iteratee(args.pop())
            var values = flatten(args)
            var newary = filter(array,function hasit(it) {
                return !values.map(it2 => predicate(it2)).includes(predicate(it))
            })
        }else {
            return difference (array, ...args)
        }
        return newary
    }
    
    function differenceWith(array, values, comparator){
        var res = []
        for(var i = 0;i < array.length;i++){
            if(comparator(array[i],values)){
                res.push(array[i])
            }
        }
        return res
    }

    function drop (array, n = 1) {return array.slice(n)} 
    
    function dropRight (array, n = 1) {return array.length > n ? array.slice(0,array.length - n) : []} 

    function dropRightWhile(array,predicate = identity()) {
        debugger
        predicate = iteratee(predicate)
        for(var i = array.length - 1;i >= 0;i--){
            if(predicate(array[i])){
                array.pop()
            }else {
                break
            }
        }
        return array
    }
    
    function dropWhile(array,predicate = identity()) {
        predicate = iteratee(predicate)
        var newary = array.slice()
        for(var i = 0;i < array.length;i++){
            if(predicate(array[i])){
                newary.shift()
            }else {
                break
            }
        }
        return newary
    }

    function fill(array, value, start = 0, end = array.length){
            for(var i = start;i < end;i++) {
                array[i] = value
            }
            return array
        }
    
    function findIndex(array, predicate = identity(value), fromIndex = 0){
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
        predicate = iteratee(predicate)
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
            fromIndex = fromIndex < 0 ? fromIndex + array.length : fromIndex
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
    
    function intersectionBy(arrays, predicate=identity){
        predicate = iteratee(predicate)
        var result = []
            var map = {}
            for(var i = 0;i < arrays.length;i++) {
                for(var j = 0;j < arrays[i].length;j++){
                    if(!(predicate(arrays[i][j]) in map)){
                        map[predicate(arrays[i][j])] = arrays[i][j]
                    } else {
                        map[predicate(arrays[i][j])] = -1
                    }
                }
            }
            for(key in map) {
                if(map[key] != -1){
                    result.push(map[key])
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
    
    function uniq(array){
        return Array.from(new Set(array))
    }
    
    function uniqBy(array, predicate =_.identity){
        predicate = iteratee(predicate)
        var newary = []
        var store = new Map()
        for(var i = 0;i < array.length;i++){
            if(!store.has(predicate(array[i]))){
                newary.push(array[i])
                store.set(predicate(array[i]))
            }
        }
        return newary
    }
    
    function unzip(array){
        var newary = []
        var len = array[0].length
        for(var i = 0;i < len;i++){
            newary[i] = []
        }
        for(var i = 0;i < len;i++){
            for(var j = 0;j < array.length;j++){
                newary[i].push(array[j][i])
            }
        }
        return newary
    }
    
    function zip(...arrays){
        var len = -1
        var newary = []
        for(var i = 0;i < arrays.length;i++){
            if(len < arrays[i].length){
                len = arrays[i].length
            }
        }
        for(var i = 0;i < len;i++){
            newary[i] = []
        }
        for(var i = 0;i < len;i++){
            for(var j = 0;j < arrays.length;j++){
                newary[i].push(arrays[j][i])
            }
        }
        return newary
    }
    
    function countBy(collection,predicate = identity){
        predicate = iteratee(predicate)
        var res = {}
        collection.forEach(element => {
            if(!(predicate(element) in res)){
                res[predicate(element)] = 1
            }else {
                res[predicate(element)]++
            }
        });
        return res
    }

    function every (collection, predicate=_.identity){
        predicate = iteratee(predicate)
        for(key in collection){
            if(!predicate(collection[key])){
                return false
            }
        }
        return true
    }

    function find (collection,predicate = identity,fromIndex = 0){
        predicate = iteratee(predicate)
        for(var i = fromIndex;i < collection.length;i++){
            if(predicate(collection[i])){
                return collection[i]
            }   
        }
    }

    function flatMap (collection, predicate = identity){
        predicate = iteratee(predicate)
        var res = []
        for(key in collection){
            res.push(...flatten(predicate(collection[key])))
        }
        return res
    }

    function flatMapDepth(collection, predicate = identity, depth = 1){
        predicate = iteratee(predicate)
        var res = []
        for(key in collection){
            res.push(...flattenDepth(predicate(collection[key],depth - 1)))
        }
        return res
    }

    function forEach(collection, predicate = identity){
        predicate = iteratee(predicate)
        for(key in collection){
            predicate(collection[key],key,collection)
        }
        return collection
    }

    function groupBy(collection, predicate=identity){
        predicate = iteratee(predicate)
        var res = {}
        for(key in collection){
            if(!(predicate(collection[key]) in res)){
                res[predicate(collection[key])] = []
            }
            res[predicate(collection[key])].push(collection[key])
        }
        return res
    }

    function keyBy(collection, predicate = identity){
        predicate = iteratee(predicate)
        var res = {}
        for(key in collection){
            if(!(predicate(collection[key]) in res)){
                res[predicate(collection[key])] = collection[key]
            }
        }
        return res
    }

    function map(collection, predicate = identity){
        predicate = iteratee(predicate)
        var res = []
        for(key in collection){
            res.push(predicate(collection[key],+key,collection))
        }
        return res
    }

    function orderBy(collection, predicates=identity, orders){
        var res = collection.slice()
        for(var i = predicates.length - 1;i >= 0 ;i--){
            debugger
            mergeSort(res,predicates[i])
            if(orders[i] == 'desc'){
                res = res.reverse()
            }
        }
        return res
    }

    function mergeSort(ary,num){
        if(ary.length < 2){
        return ary.slice()
        }
        var mid = ary.length >> 1
        var left = ary.slice(0,mid)
        var right = ary.slice(mid)
    
        mergeSort(left,num)
        mergeSort(right,num)
    
        var i = 0
        var j = 0
        var k = 0
    
        while(i < left.length && j < right.length){
            if(left[i][num] <= right[j][num]) {
                ary[k++] = left[i++]
            } else {
                ary[k++] = right[j++]
            }
        }
        while(i < left.length) {
            ary[k++] = left[i++]
        }
        while(j < right.length) {
            ary[k++] = right[j++]
        }
        return ary
    }

    function partition(collection, predicate = identity){
        predicate = iteratee(predicate)
        var res = [[],[]]
        var count = 0
        for(key in collection){
            if(predicate(collection[key])){
                res[0].push(collection[key])
            }else {
                res[1].push(collection[key])
            }
        }
        return res
    }

    function reduce(collection, predicate = identity, accumulator){
        predicate = iteratee(predicate)
        for(key in collection){        
            if(accumulator == undefined){
                accumulator = collection[key]
            } else {
                accumulator = predicate(accumulator,collection[key],key,collection)
            }
        }
        return accumulator
    }

    function reduceRight(collection, predicate = identity, accumulator){
        var buffer = []
        for(key in collection){
            buffer.push(collection[key])
        }
        buffer.reverse()
        for(key in buffer){        
            if(accumulator == undefined){
                accumulator = buffer[key]
            } else {
                accumulator = predicate(accumulator,buffer[key],key,buffer)
            }
        }
        return accumulator
    }

    function reject(collection,predicate = identity){
        predicate = iteratee(predicate)
        var res = []
        for(key in collection){
            if(!predicate(collection[key])){
                res.push(collection[key])
            }
        }
        return res
    }

    function sample(collection){
        return collection[Math.floor(Math.random() * collection.length)]
    }

    function sampleSize(collection, n = 1){
        n = n > collection.length ? collection.length : n
        var res = []
        var map = {}
        while(res.length < n){
            var sam = collection[Math.floor(Math.random() * collection.length)]
            if(!(sam in map)){
                res.push(sam)
                map[sam] = 1
            }
        }
        return res
    }

    function shuffle(collection){
        var len = collection.length
        var buffer = []
        var res = []
        for(var i = 0;i < len;i++){
            buffer[i] = i
        }
        for(var i = 0;i < len;i++){
            var index = Math.floor(Math.random() * buffer.length)
            res[buffer[index]] = collection[i]
            buffer.splice(index,1)
        }
        return res
    }

    function size(collection){
        if(Object.prototype.toString.call(collection) == "[object Object]"){
            var count = 0
            for(key in collection){
                count++
            }
            return count
        }
        return collection.length
    }

    function some(collection, predicate = identity){
        predicate = iteratee(predicate)
        for(key in collection){
            if(predicate(collection[key])){
                return true
            }
        }
        return false
    }

    function sortBy(collection, predicates=identity){
        return orderBy(collection, predicates=identity)
    }

    function defer(func, ...args){
        return setTimeout(func(...args),1)
    }

    function delay(func, wait, ...args){
        return setTimeout(func(...args),wait)
    }

    function isArguments(value){
        return typeof value.callee == 'function'
    }

    function isArray (value) {
        return Object.prototype.toString.call(value) == '[object Array]'
    }

    function isBoolean(value){
        return typeof value == 'boolean'
    }

    function isDate(value){
        return value instanceof Date
    }

    function isElement(value){
        return value instanceof Node
    }

    function isEmpty(value){
        if(typeof value != 'object'){
            return true 
        } else {
            for(var i in value){
                return false
            }
            return true
        }
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

    function isError(value){
        return value instanceof Error
    }

    function isFinite(value){
        if(typeof value != 'number'){
            return false
        }else {
            return value != Infinity
        }
    }

    function isFunction(value){
        return typeof value == 'function'
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
    function isNaN(value){
        return (typeof value == 'number') && (value + '' == 'NaN') || value == null
    }

    function isNil(value){
        return (value === null) || (value === undefined)
    }

    function isNull(value){
        return value === null
    }

    function without(array,...args){
        debugger
        return filter(array,it => !includes(args,it))
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


    function matches(src){
        return bind(isMatch,null,window,src)
    }

    function toPath(path){
        if(Array.isArray(path)){
            return path
        }
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


    function iteratee(value){
        if(typeof value == 'string') {
            return property(value)
        }
        if(Array.isArray(value) == true){
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
        concat,
        difference,
        differenceBy,
        differenceWith,
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
        intersectionBy,
        join,
        last,
        lastIndexOf,
        pull,
        reverse,
        sortedIndex,
        union,
        unionBy,
        uniq,
        uniqBy,
        unzip,
        zip,
        countBy,
        every,
        find,
        flatMap,
        flatMapDepth,
        forEach,
        groupBy,
        keyBy,
        map,
        orderBy,
        partition,
        reduce,
        reduceRight,
        reject,
        sample,
        sampleSize,
        shuffle,
        size,
        some,
        sortBy,
        defer,
        delay,
        isArguments,
        without,
        isArray,
        isBoolean,
        isDate,
        isElement,
        isEmpty,
        isError,
        isFinite,
        isFunction,
        isNaN,
        isNil,
        isNull,
        isEqual,
        isMatch,
        get,
        toPath,
        identity,
        matches,
        property,
        includes,
        filter,
        mergeSort,
    }
}()