console.clear();

const userElement = document.querySelector(".user");
const errorElement = document.querySelector(".error");

async function fetchUserData(url) {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    return { error: error.message };
  }
}

document.querySelectorAll("button[data-url]").forEach((button) => {
  button.addEventListener("click", async (event) => {
    const url = event.target.dataset.url;
    if (!url.includes("api")) {
      errorElement.textContent = "";
      userElement.textContent = "User info will appear here.";
      return;
    }

    const result = await fetchUserData(url);

    if (result.error) {
      errorElement.textContent = result.error;
      userElement.innerHTML = "No user data available.";
    } else {
      const user = result.data;
      userElement.innerHTML = `
        <h2>${user.first_name} ${user.last_name}</h2>
        <img alt="${user.first_name} ${user.last_name}" src="${user.avatar}" style="width: 100px; height: auto;"/>
      `;
      errorElement.textContent = ""; // Clear any previous error message
    }
  });
});
