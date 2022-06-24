let usuario = null
let sockect = null

const validarJWT = async () => {
    let token = localStorage.getItem('token')
    if (token.length <= 10) {
        console.log('No hay token')
        return
    }

    const resp = await fetch('http://localhost:8081/api/v1/auth/validToken', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json', 'x-token': token },
    })
    const { usuario: userResp, token: tokenResp } = await resp.json()
    console.log(userResp, tokenResp)
    localStorage.setItem('token', tokenResp)
    localStorage.setItem('user', JSON.stringify(userResp))
    document.title = userResp.nombre
    conectarSocket()
}

const conectarSocket = async () => {
    const socket = io({
        extraHeaders: {
            'x-token': localStorage.getItem('token'),
        },
    })
}

const main = async () => {
    await validarJWT()
}

main()

const form = document.querySelector('form')

form.addEventListener('submit', (e) => {
    e.preventDefault()
    const formData = {}
    for (let el of form.elements) {
        if (el.name.length > 0) {
            formData[el.name] = el.value
        }
    }

    fetch('http://localhost:8081/api/v1/auth/login', {
        method: 'POST',
        body: JSON.stringify(formData),
        headers: { 'Content-Type': 'application/json' },
    })
        .then((resp) => resp.json())
        .then((data) => {
            console.log(data.token)
            localStorage.setItem('token', data.token)
            validarJWT()
        })
        .catch((err) => console.log(err))
})
