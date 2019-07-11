var shiyubi123 = {
    chunk: function (array, [size=1]) {
                var  newary = []
                for (var i = 0;i + size < array.lenght;i += size) {
                    newary.push(array.slice(i,i + size))
                }
                newary.push(array.slice(i))
                return newary
            },
    compact: function (array) {
        var newary = []
        for (var i = 0;i < array.length;i++) {
            if (array[i] != false) {
                newary.push(array[i])
            }
        }
        return newary
    },
    concat: function (array, [values]) {
        var newary = []
        for (var i = 0;i < arguments.length - 1;i++) {
            newary.push(...arguments[i])
        }
        return newary
    },
    difference: function (array, [values]) {
        var dif = []
        for (var i = 0;i < array.length;i++) {
            if (array[i] != values[i]) {
                dif.push(array[i])
            }
        }
        return dif
    },
}