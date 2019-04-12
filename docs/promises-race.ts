const promise = (time, name) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => resolve (time + ' ' + name) , time);
    })
}

const promises = [
    promise(100, 'opa'),
    promise(200, 'opaaa')
]

Promise.race(promises).then( e => console.log(e)).catch(e => console.log('catch ' + e));