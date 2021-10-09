function copyCookie(copyDomainReg, postDomin, postPort) {
  const copyCookies = [];
  chrome.cookies.getAll({}, function (cookie) {
    console.log(cookie.length);
    for (i = 0; i < cookie.length; i++) {
      const c = cookie[i];
      if (copyDomainReg.test(c.domain)) {
        copyCookies.push(c);
      }
    }
    const promiseSetCookislist = [];
    copyCookies.forEach((item) => {
      const setCookiesObj = {
        domain: postDomin,
        name: item.name,
        url: postPort
          ? `http://${postDomin}`
          : `http://${postDomin}:${postPort}`,
        value: item.value,
      };
      console.log(setCookiesObj);
      promiseSetCookislist.push(chrome.cookies.set(setCookiesObj));
    });

    Promise.all(promiseSetCookislist)
      .then(() => {
        alert(`cookies copy success ~_~`);
        // window.location.reload();
      })
      .catch((error) => {
        alert(`cookies copy fail`);
      });
  });

  // chrome.cookies.getAllCookieStores(function (cookiestores){
  //  for(i=0;i<cookiestores.length;i++){
  //   console.log(JSON.stringify(cookiestores[i]));
  //  }
  // });
  //   chrome.cookies.set(
  //     {
  //       name: "Sample1",
  //       url: "http://developer.chrome.com/extensions/cookies.html",
  //       value: "Dummy Data",
  //     },
  //     function (cookie) {
  //       console.log(JSON.stringify(cookie));
  //       console.log(chrome.extension.lastError);
  //       console.log(chrome.runtime.lastError);
  //     }
  //   );
  /*chrome.cookies.onChanged.addListener(function (changeInfo){ 
     console.log(JSON.stringify(changeInfo)); 
    });*/
}
// window.onload = cookieinfo;

function main() {
  const copyButton = document.querySelector("#copy_button");
  const copyDomainRegInput = document.querySelector("#copy_domain_reg");
  const postDomainPortInput = document.querySelector("#post_domain_port");
  copyButton.onclick = function () {
    let copyDomainReg = new RegExp(copyDomainRegInput.value);
    let postDomainPort = postDomainPortInput.value;
    let splitDomainPort = postDomainPort.split(":");
    let postDomin = splitDomainPort[0];
    let postPort = splitDomainPort[1];
    copyCookie(copyDomainReg, postDomin, postPort);
  };
}

window.onload = main;
