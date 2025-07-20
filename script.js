document.getElementById("enter").addEventListener("click", function () {
    fetch("https://factorial-api.onrender.com/calc?q=" + document.getElementById("input").value)
        .then(function (response) {
            var type = response.headers.get("Content-Type")
            if (type.includes("application/json")) {
                return response.json()
            }
            else if (type.includes("text/html")) {
                return response.text()
            } else {
                throw new Error("Unknow callback type!")
            }
        })
        .then(function (retutnContent) {
            if (retutnContent.toString().includes("<!doctype html>")) {
                var temp = document.createElement("div")
                temp.innerHTML = retutnContent
                var ErrorMessage = temp.innerText
                throw new Error(ErrorMessage)
            } else {
                return retutnContent
            }
        })
        .then(function (data) {
            console.log(data)
            if (data.error) {
                throw new Error(data.error)
            } else {
                document.getElementById("display").value = "";
                document.getElementById("display").value = data.result
                document.getElementById("display").style.height = "100px"
                document.getElementById("display").style.height = document.getElementById("display").scrollHeight + "px"
            }
        })
        .catch(function (error) {
            console.error(error)
            alert(error);
        })
})
document.getElementById("copy").addEventListener("click", function () {
    document.getElementById("display").select();
    navigator.clipboard.writeText(document.getElementById("display").value)
})
window.onload = function () {
    fetch("https://573f616c-2f33-4a25-8dd3-eab903401ca9-00-15qkzj0ppjof8.spock.replit.dev/calc?q=6")
        .then(function (responde) {
            console.log("Server is running");
        })
        .catch(function (error) {
            throw new Error("Server might be in sleep mode or stopped running");
        })
        .catch(function (error) {
            alert(error)
        })
    if (window.location.search) {
        var input = new URLSearchParams(window.location.search)
        document.getElementById("input").value = input.get("q")
        document.getElementById("enter").click()
    }
}
