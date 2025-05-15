const currentFile = document.body.id;

if(currentFile == "linkPage"){
    document.addEventListener("DOMContentLoaded", function() {
      const bookLinkBtn = document.getElementById("bookLinkBtn");
      if (bookLinkBtn) {
          bookLinkBtn.addEventListener("click", redirect);
      }
    });
  }
else if(currentFile == "log"||"sign"){
  document.getElementById("showHideBtn").addEventListener("click", function () {
    const passwordField = document.getElementById("password");
    const type = passwordField.type === "password" ? "text" : "password";
    passwordField.type = type;

    this.textContent = type === "password" ? "show" : "hide";
  });  
}


function redirect() {
  let link = localStorage.getItem("link");
  window.open(link);
}





  