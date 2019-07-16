var shiyubi123 = {
    chunk: function chunk (array, size = 1) {
                var  newary = []
                for (var i = 0;i + size - 1 < array.length;i += size) {
                    newary.push(array.slice(i,i + size))
                }
                newary.push(array.slice(i))
                return newary
            },
    compact: function (array) {
        var newary = []
        for (var i = 0;i < array.length;i++) {
            if (array[i] != false && array[i] != null) {
                newary.push(array[i])
            }
        }
        return newary
    },
    concat: function (array, values) {
        var newary = []
        for (var i = 0;i < arguments.length - 1;i++) {
            newary.push(...arguments[i])
        }
        return newary
    },
    difference: function (array, values) {
        var dif = []
        var map = {}
        for(var i = 0;i < values.length;i++) {
            map[values[i]] = 1
        }
        for(var i = 0;i < array.length;i++) {
            if(！(array[i] map)) {
                dif.push(array[i])
            }
        }
        return dif
    },
}