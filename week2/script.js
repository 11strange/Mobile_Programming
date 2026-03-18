function calculate_results()
{
    let m1 = Number(document.getElementById("m1").value)
    let m2 = Number(document.getElementById("m2").value)
    let m3 = Number(document.getElementById("m3").value)
    let m4 = Number(document.getElementById("m4").value)
    let m5 = Number(document.getElementById("m5").value)
    let m6 = Number(document.getElementById("m6").value)
    let m7 = Number(document.getElementById("m7").value)
    let m8 = Number(document.getElementById("m8").value)

    let totalMarks = m1+m2+m3+m4+m5+m6+m7+m8;

    let totalText = document.getElementById("total");
    let resultText = document.getElementById("result")

    totalText.innerHTML = "Total marks" + totalMarks + "/800"
    if (totalMarks>=700)
    {
        resultText.innerHTML("Distinction")
        resultText.style.color("green")
    }
    else if (totalMarks>=600 & totalMarks<=700)
    {
        resultText.innerHTML("first division")
        resultText.style.color("blue")
    }

    else if (totalMarks>=500 & totalMarks<=600)
    {
        resultText.innerHTML("first division")
        resultText.style.color("blue")
    }

    else if (totalMarks>=400 & totalMarks<=500)
    {
        resultText.innerHTML("first division")
        resultText.style.color("blue")
    }

    else{
        resultText.innerHTML("Fail")
        resultText.style.color("red")
    }

}