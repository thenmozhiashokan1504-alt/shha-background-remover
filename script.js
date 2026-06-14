const API_KEY = "sHLj991byotuHxaHi276F3VF";

const uploadBtn = document.getElementById("uploadBtn");
const fileInput = document.getElementById("fileInput");

uploadBtn.onclick = () => {
    fileInput.click();
};

fileInput.onchange = async () => {

    const file = fileInput.files[0];

    if (!file) return;

    uploadBtn.innerText = "Removing...";

    const formData = new FormData();
    formData.append("image_file", file);
    formData.append("size", "auto");

    try {

        const response = await fetch(
            "https://api.remove.bg/v1.0/removebg",
            {
                method: "POST",
                headers: {
                    "X-Api-Key": API_KEY
                },
                body: formData
            }
        );

        if (!response.ok) {
            throw new Error("API Error");
        }

        const blob = await response.blob();

        const reader = new FileReader();

        reader.onload = function () {

            localStorage.setItem(
                "resultImage",
                reader.result
            );

            window.location.href = "page2.html";
        };

        reader.readAsDataURL(blob);

    } catch (error) {

        alert("Background removal failed");

        console.log(error);

    }

};