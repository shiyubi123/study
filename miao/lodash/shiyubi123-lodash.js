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
    
    differenceBy: function differenceBy (array, values,comparator) {
        debugger
        var dif = []
        var map = {}
        for(var i = 0;i < values.length;i++) {
            map[comparator(array[i],i,array)] = 1
        }
        for(var i = 0;i < array.length;i++) {
            if(!(comparator(array[i]) in map)) {
                dif.push(array[i])
            }
        }
        return dif
    },
    
    drop: (array, n = 1) => array.slice(n),
    
    dropRight: (array, n = 1) => array.length > n ? array.slice(0,array.length - n) : [],

    dropRightWhile: function dropRightWhile(array,predicate = identity()) {
        for(var i = array.length - 1;i >= 0;i--){
            if(predicate(array[i])){
                array.splice(i,1)
            } else {
                break
            }
        }
        return array
    },
    
    dropWhile: function dropWhile(array,predicate = identity()) {
        for(key in array){
            if(predicate(array[i])){
                array.splice(i,1)
            } else {
                break
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
    
    findIndex: function findIndex(array, predicate = identity(value), fromIndex = 0){
                for(var i = fromIndex;i < array.length;i++) {
                    if (predicate(array[i],i,array)){
                        return i
                    }
                }
            },
    
    findLastIndex: function findLastIndex(array, predicate = identity(value), fromIndex = array.length-1){
                    for(var i = fromIndex;i >= 0;i--) {
                        if (predicate(array[i],i,array)){
                            return i
                        }
                    }   
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
            if(isArray(array[i])){
                var falttedItem = flattenDeep(array[i])
                result.push(...falttedItem)
            } else {
                result.push(array[i])
            }
        }
        return result

        function isArray (value) {
            if(typeof(value) == 'object'){
                return true
            } else {
                return false
            }
        }
    },
    
    

    flattenDepth: function flattenDepth (array,depth = 1){
        debugger
        var result = []
        if(depth == 0){
            return array.slice()
        } else {
            for(var i = 0;i < array.length;i++) {
                if(isArray(array[i])){
                    var falttedItem = flattenDepth(array[i],depth - 1)
                    result.push(...falttedItem)
                } else {
                    result.push(array[i])
                } 
            }
        }
        return result

        function isArray (value) {
            if(typeof(value) == 'object'){
                return true
            } else {
                return false
            }
        }
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
    
    join: (array, separator = ',') => array.reduce((a,b) => a + separator + b),
    
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
        if(typeof(value) == 'object'){
            return true
        } else {
            return false
        }
    },

    reverse: function reverse(array) {
        var len = array.length - 1
        var halflen = Math.floor(array.length / 2)
        for(var i = 0;i < halflen;i++){
                var buffer = array[i]
                array[i] = array[len - i]
                array[len - i] = buffer
            }
        }
    
    sortedIndex: function sortedIndex(array, value){
        var low = 0
        var high = array.length - 1
        var mid = Math.floor((low + high) / 2)

        while(low < high) {
            if(array[mid] == value){
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

    identity: function identity(value){
                return arguments[0]
            },
        
}