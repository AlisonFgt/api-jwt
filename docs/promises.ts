let promise1 = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve('A promise 1 foi resolvida!'); }
        , 2000);
})

let promise2 = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve('A promise 2 foi resolvida!'); }
        , 2000);
})

let promise3 = new Promise((resolve, reject) => {
    setTimeout(() => {
        reject('A promise 2 foi rejeitada!'); }
        , 2000);
})

// diversas conexoes no banco de dados
Promise.all([promise1, promise2])
    .then(([resultado1, resultado2]) => {
        console.log('Todas as proximas foram resolvidas!');
        console.log(resultado1);
        console.log(resultado2);
    })
    .catch((error) => {
        console.log('Uma das promises foi rejeitada');
        console.error(error);
    })
    

// promise3.then((resultado) => {
//     console.log('Teste promise 3 rejeitada!')
//     console.log(resultado);
// }).catch((error) => {
//     console.log(error);
// })