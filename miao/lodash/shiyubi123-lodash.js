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
        debugger
        var newary = []
        for (var i = 0;i < array.length;i++) {
            if (array[i] != false && array[i] != null) {
                newary.push(array[i])
            }
        }
        return newary
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
    
    differenceBy: function differenceBy (array, ...values,comparator) {
        debugger
        var dif = []
        var map = {}
        for(var i = 0;i < values.length;i++) {
            for(var j = 0;j < values[i].length;j++){
                map[comparator(values[i][i])] = 1
            }
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

    dropRightWhile: function dropRightWhile(users,f) {
        for(key in users){
            if(f(users[key])){
                delete users.key
            } else {
                break
            }
        }
        return users
    },
    
    dropWhile: function dropWhile(users,f) {
        for(key in users){
            if(f(users[key])){
                delete users.key
            } else {
                break
            }
        }
        return users
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

    flatten: function(array) {
        var result = []
        for(item of array){
            if(Array.isArray(item)){
                for(val of item) {
                    result.push(val)
                }
            } else {
                result.push(item)
            }
        }
    },
    //return

    







    identity: function identity(value){
                return arguments[0]
            },
        
}