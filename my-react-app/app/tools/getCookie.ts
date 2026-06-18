const getCookie = (cookieStr: string, cookieName: string): string | undefined =>{
    const cookies = cookieStr.split(";");
    // console.log(cookies)
    const requestedCookie = cookies.find(ele=>ele.split("=")[0] === cookieName)



    if (!requestedCookie)
        return
    if (requestedCookie.split("=").length !== 2)
        return;
    return requestedCookie.split("=")[1]
}


export {getCookie}